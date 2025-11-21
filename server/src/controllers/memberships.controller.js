const { z } = require('zod');
const { prisma } = require('../config/prisma');

const statusSchema = z.object({
  status: z.enum(['APPROVED', 'REJECTED']),
  note: z.string().max(500).optional(),
});

async function listMembershipRequests(req, res, next) {
  try {
    const { status } = req.query;
    const requests = await prisma.membershipRequest.findMany({
      where: {
        club: { adminId: req.user.id },
        status: status || undefined,
      },
      include: {
        user: { select: { id: true, firstName: true, lastName: true, email: true } },
        club: { select: { id: true, name: true } },
        processedBy: { select: { id: true, firstName: true, lastName: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ data: requests });
  } catch (error) {
    next(error);
  }
}

async function updateMembershipStatus(req, res, next) {
  try {
    const { id } = req.params;
    const payload = statusSchema.parse(req.body);

    const request = await prisma.membershipRequest.findUnique({
      where: { id: Number(id) },
      include: { club: true, user: true },
    });

    if (!request) {
      return res.status(404).json({ message: 'Demande introuvable' });
    }

    if (request.club.adminId !== req.user.id) {
      return res.status(403).json({ message: 'Action réservée à l’admin du club' });
    }

    if (request.status !== 'PENDING') {
      return res.status(400).json({ message: 'La demande est déjà traitée' });
    }

    const updated = await prisma.membershipRequest.update({
      where: { id: request.id },
      data: {
        status: payload.status,
        processedAt: new Date(),
        processedById: req.user.id,
        adminNote: payload.note,
      },
    });

    if (payload.status === 'APPROVED') {
      await prisma.clubMember.upsert({
        where: {
          userId_clubId: {
            userId: request.userId,
            clubId: request.clubId,
          },
        },
        update: {},
        create: {
          userId: request.userId,
          clubId: request.clubId,
        },
      });
    }

    await prisma.notification.create({
      data: {
        userId: request.userId,
        title: payload.status === 'APPROVED' ? 'Demande acceptée' : 'Demande refusée',
        body:
          payload.status === 'APPROVED'
            ? `Vous êtes maintenant membre de ${request.club.name}`
            : `Votre demande pour ${request.club.name} a été refusée`,
        type: 'MEMBERSHIP',
        metadata: { clubId: request.clubId, status: payload.status },
      },
    });

    res.json({ data: updated });
  } catch (error) {
    next(error);
  }
}

module.exports = { listMembershipRequests, updateMembershipStatus };


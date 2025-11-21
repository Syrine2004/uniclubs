const { z } = require('zod');
const { prisma } = require('../config/prisma');

const eventSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  startDate: z.string().transform((val) => new Date(val)),
  location: z.string().min(2),
  tag: z.string().optional(),
});

async function listEvents(req, res, next) {
  try {
    const { clubId } = req.query;
    const events = await prisma.event.findMany({
      where: clubId ? { clubId: Number(clubId) } : undefined,
      include: {
        club: {
          select: { id: true, name: true, logoUrl: true },
        },
      },
      orderBy: { startDate: 'asc' },
    });
    res.json({ data: events });
  } catch (error) {
    next(error);
  }
}

async function createEvent(req, res, next) {
  try {
    const { clubId } = req.params;
    const payload = eventSchema.parse(req.body);
    const club = await prisma.club.findUnique({
      where: { id: Number(clubId) },
    });

    if (!club) {
      return res.status(404).json({ message: 'Club introuvable' });
    }

    if (club.adminId !== req.user.id) {
      return res.status(403).json({ message: 'Seul l’admin du club peut créer un événement' });
    }

    const event = await prisma.event.create({
      data: {
        ...payload,
        startDate: payload.startDate,
        clubId: club.id,
      },
    });

    const members = await prisma.clubMember.findMany({
      where: { clubId: club.id },
      select: { userId: true },
    });

    if (members.length > 0) {
      await prisma.notification.createMany({
        data: members.map((member) => ({
          userId: member.userId,
          title: `Nouvel événement - ${event.title}`,
          body: `Le club ${club.name} a ajouté un événement`,
          type: 'EVENT',
          metadata: { eventId: event.id },
        })),
      });
    }

    res.status(201).json({ data: event });
  } catch (error) {
    next(error);
  }
}

async function updateEvent(req, res, next) {
  try {
    const { id } = req.params;
    const payload = eventSchema.partial().parse(req.body);

    const event = await prisma.event.findUnique({
      where: { id: Number(id) },
      include: { club: true },
    });

    if (!event) {
      return res.status(404).json({ message: 'Événement introuvable' });
    }

    if (event.club.adminId !== req.user.id) {
      return res.status(403).json({ message: 'Action non autorisée' });
    }

    const updated = await prisma.event.update({
      where: { id: event.id },
      data: {
        ...payload,
        startDate: payload.startDate ?? undefined,
      },
    });

    res.json({ data: updated });
  } catch (error) {
    next(error);
  }
}

async function deleteEvent(req, res, next) {
  try {
    const { id } = req.params;
    const event = await prisma.event.findUnique({
      where: { id: Number(id) },
      include: { club: true },
    });

    if (!event) {
      return res.status(404).json({ message: 'Événement introuvable' });
    }

    if (event.club.adminId !== req.user.id) {
      return res.status(403).json({ message: 'Action non autorisée' });
    }

    await prisma.event.delete({ where: { id: event.id } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = { listEvents, createEvent, updateEvent, deleteEvent };


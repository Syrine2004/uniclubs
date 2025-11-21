const { z } = require('zod');
const { prisma } = require('../config/prisma');

const clubCreateSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  category: z.string().min(2),
  bannerUrl: z.string().url().optional(),
  logoUrl: z.string().url().optional(),
});

const clubUpdateSchema = clubCreateSchema.partial();

const photoSchema = z.object({
  photos: z.array(
    z.object({
      url: z.string().url(),
      priority: z.number().int().nonnegative().optional(),
    })
  ),
});

const applicationSchema = z.object({
  message: z.string().max(500).optional(),
});

async function ensureClubAdmin(clubId, userId) {
  const club = await prisma.club.findUnique({
    where: { id: Number(clubId) },
  });

  if (!club) {
    const error = new Error('Club introuvable');
    error.statusCode = 404;
    throw error;
  }

  if (club.adminId !== userId) {
    const error = new Error('Action réservée à l’administrateur du club');
    error.statusCode = 403;
    throw error;
  }

  return club;
}

async function listClubs(req, res, next) {
  try {
    const clubs = await prisma.club.findMany({
      include: {
        admin: { select: { id: true, firstName: true, lastName: true, email: true } },
        photos: { orderBy: { priority: 'asc' } },
        _count: { select: { members: true, events: true } },
      },
    });
    const formatted = clubs.map((club) => {
      const { _count, ...rest } = club;
      return {
        ...rest,
        membersCount: _count.members,
        eventsCount: _count.events,
      };
    });
    res.json({ data: formatted });
  } catch (error) {
    next(error);
  }
}

async function getClubById(req, res, next) {
  try {
    const { id } = req.params;
    const club = await prisma.club.findUnique({
      where: { id: Number(id) },
      include: {
        admin: { select: { id: true, firstName: true, lastName: true, email: true } },
        events: { orderBy: { startDate: 'asc' } },
        photos: { orderBy: { priority: 'asc' } },
        _count: { select: { members: true } },
      },
    });

    if (!club) {
      return res.status(404).json({ message: 'Club introuvable' });
    }

    const { _count, ...rest } = club;
    res.json({
      data: {
        ...rest,
        membersCount: _count.members,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function createClub(req, res, next) {
  try {
    const payload = clubCreateSchema.parse(req.body);
    const club = await prisma.club.create({
      data: {
        ...payload,
        adminId: req.user.id,
      },
    });
    res.status(201).json({ data: club });
  } catch (error) {
    next(error);
  }
}

async function updateClub(req, res, next) {
  try {
    const { id } = req.params;
    await ensureClubAdmin(id, req.user.id);
    const payload = clubUpdateSchema.parse(req.body);
    const club = await prisma.club.update({
      where: { id: Number(id) },
      data: payload,
    });
    res.json({ data: club });
  } catch (error) {
    next(error);
  }
}

async function deleteClub(req, res, next) {
  try {
    const { id } = req.params;
    await ensureClubAdmin(id, req.user.id);
    await prisma.club.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

async function updateClubPhotos(req, res, next) {
  try {
    const { id } = req.params;
    await ensureClubAdmin(id, req.user.id);
    const payload = photoSchema.parse(req.body);

    await prisma.$transaction([
      prisma.clubPhoto.deleteMany({ where: { clubId: Number(id) } }),
      prisma.clubPhoto.createMany({
        data: payload.photos.map((photo, index) => ({
          clubId: Number(id),
          url: photo.url,
          priority: photo.priority ?? index,
        })),
      }),
    ]);

    const photos = await prisma.clubPhoto.findMany({
      where: { clubId: Number(id) },
      orderBy: { priority: 'asc' },
    });

    res.json({ data: photos });
  } catch (error) {
    next(error);
  }
}

async function applyToClub(req, res, next) {
  try {
    const { id } = req.params;
    const payload = applicationSchema.parse(req.body);
    const clubId = Number(id);

    const club = await prisma.club.findUnique({
      where: { id: clubId },
      select: { id: true, adminId: true, name: true },
    });

    if (!club) {
      return res.status(404).json({ message: 'Club introuvable' });
    }

    const existingMembership = await prisma.clubMember.findFirst({
      where: { clubId, userId: req.user.id },
    });
    if (existingMembership) {
      return res.status(409).json({ message: 'Vous êtes déjà membre de ce club' });
    }

    const existingRequest = await prisma.membershipRequest.findFirst({
      where: { clubId, userId: req.user.id, status: 'PENDING' },
    });
    if (existingRequest) {
      return res.status(409).json({ message: 'Une demande est déjà en attente' });
    }

    const membershipRequest = await prisma.membershipRequest.create({
      data: {
        clubId,
        userId: req.user.id,
        message: payload.message,
      },
    });

    if (club.adminId) {
      await prisma.notification.create({
        data: {
          userId: club.adminId,
          title: 'Nouvelle demande d’adhésion',
          body: `${req.user.firstName} souhaite rejoindre ${club.name}`,
          type: 'MEMBERSHIP',
        },
      });
    }

    res.status(201).json({ data: membershipRequest });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listClubs,
  getClubById,
  createClub,
  updateClub,
  deleteClub,
  updateClubPhotos,
  applyToClub,
};


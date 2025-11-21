const { z } = require('zod');
const { prisma } = require('../config/prisma');
const { hashPassword, comparePassword } = require('../utils/password');
const { generateToken } = require('../utils/token');

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  major: z.string().optional(),
  phone: z.string().optional(),
  studentId: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

function sanitizeUser(user) {
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}

async function register(req, res, next) {
  try {
    const payload = registerSchema.parse(req.body);

    const existing = await prisma.user.findUnique({
      where: { email: payload.email },
    });
    if (existing) {
      return res.status(409).json({ message: 'Email déjà utilisé' });
    }

    const passwordHash = await hashPassword(payload.password);

    const user = await prisma.user.create({
      data: {
        email: payload.email,
        passwordHash,
        firstName: payload.firstName,
        lastName: payload.lastName,
        major: payload.major,
        phone: payload.phone,
        studentId: payload.studentId,
        role: 'STUDENT',
      },
    });

    const token = generateToken(user);
    res.status(201).json({ user: sanitizeUser(user), token });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const payload = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (!user) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    const isValid = await comparePassword(payload.password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    const token = generateToken(user);
    res.json({ user: sanitizeUser(user), token });
  } catch (error) {
    next(error);
  }
}

async function me(req, res, next) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Non authentifié' });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        memberships: {
          include: {
            club: true,
          },
        },
      },
    });

    res.json({ user: sanitizeUser(user) });
  } catch (error) {
    next(error);
  }
}

module.exports = { register, login, me };


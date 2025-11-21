const { prisma } = require('../config/prisma');

async function listNotifications(req, res, next) {
  try {
    const { status } = req.query;
    const notifications = await prisma.notification.findMany({
      where: {
        userId: req.user.id,
        status: status || undefined,
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ data: notifications });
  } catch (error) {
    next(error);
  }
}

async function markAsRead(req, res, next) {
  try {
    const { id } = req.params;
    const notification = await prisma.notification.findUnique({
      where: { id: Number(id) },
    });

    if (!notification || notification.userId !== req.user.id) {
      return res.status(404).json({ message: 'Notification introuvable' });
    }

    const updated = await prisma.notification.update({
      where: { id: notification.id },
      data: { status: 'READ', readAt: new Date() },
    });

    res.json({ data: updated });
  } catch (error) {
    next(error);
  }
}

module.exports = { listNotifications, markAsRead };


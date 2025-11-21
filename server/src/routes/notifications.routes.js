const router = require('express').Router();
const {
  listNotifications,
  markAsRead,
} = require('../controllers/notifications.controller');
const { authenticate } = require('../middleware/authMiddleware');

router.use(authenticate);

router.get('/', listNotifications);
router.patch('/:id/read', markAsRead);

module.exports = router;


const router = require('express').Router();
const {
  listEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/events.controller');
const { authenticate, requireRole } = require('../middleware/authMiddleware');

router.get('/', listEvents);
router.post('/club/:clubId', authenticate, requireRole('ADMIN'), createEvent);
router.patch('/:id', authenticate, requireRole('ADMIN'), updateEvent);
router.delete('/:id', authenticate, requireRole('ADMIN'), deleteEvent);

module.exports = router;


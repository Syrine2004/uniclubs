const router = require('express').Router();
const {
  listMembershipRequests,
  updateMembershipStatus,
} = require('../controllers/memberships.controller');
const { authenticate, requireRole } = require('../middleware/authMiddleware');

router.use(authenticate, requireRole('ADMIN'));

router.get('/', listMembershipRequests);
router.patch('/:id/status', updateMembershipStatus);

module.exports = router;


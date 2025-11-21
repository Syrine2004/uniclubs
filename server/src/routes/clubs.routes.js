const router = require('express').Router();
const {
  listClubs,
  getClubById,
  createClub,
  updateClub,
  deleteClub,
  updateClubPhotos,
  applyToClub,
} = require('../controllers/clubs.controller');
const { authenticate, requireRole } = require('../middleware/authMiddleware');

router.get('/', listClubs);
router.get('/:id', getClubById);
router.post('/', authenticate, requireRole('ADMIN'), createClub);
router.patch('/:id', authenticate, requireRole('ADMIN'), updateClub);
router.delete('/:id', authenticate, requireRole('ADMIN'), deleteClub);
router.put('/:id/photos', authenticate, requireRole('ADMIN'), updateClubPhotos);
router.post('/:id/applications', authenticate, requireRole(['STUDENT', 'ADMIN']), applyToClub);

module.exports = router;


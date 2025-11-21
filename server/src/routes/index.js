const router = require('express').Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

router.use('/auth', require('./auth.routes'));
router.use('/clubs', require('./clubs.routes'));
router.use('/events', require('./events.routes'));
router.use('/memberships', require('./memberships.routes'));
router.use('/notifications', require('./notifications.routes'));

module.exports = router;


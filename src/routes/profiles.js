const { Router } = require('express');
const { getProfile } = require('../middleware/getProfile');
const router = Router();

router.get('/', getProfile, async (req, res) => {
  const profile = req.profile;
  res.status(200).json(profile.dataValues);
});

module.exports = router;

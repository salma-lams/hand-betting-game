const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.get('/leaderboard', gameController.getLeaderboard);
router.post('/score', gameController.saveScore);

module.exports = router;

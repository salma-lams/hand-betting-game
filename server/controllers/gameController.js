const gameService = require('../services/gameService');

exports.getLeaderboard = async (req, res) => {
  try {
    const scores = await gameService.getTopScores();
    res.json(scores);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
};

exports.saveScore = async (req, res) => {
  try {
    const { name, score } = req.body;
    if (!name || score === undefined) {
      return res.status(400).json({ error: 'Name and score are required' });
    }
    const savedScore = await gameService.saveScore(name, score);
    res.status(201).json(savedScore);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save score' });
  }
};

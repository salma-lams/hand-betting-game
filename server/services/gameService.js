const Score = require('../models/scoreModel');

exports.getTopScores = async () => {
  return await Score.find().sort({ score: -1 }).limit(5);
};

exports.saveScore = async (name, score) => {
  const newScore = new Score({ name, score });
  return await newScore.save();
};

const Fund = require('../models/Fund');

// @desc    Get all funds for a user
// @route   GET /api/funds
// @access  Private
const getFunds = async (req, res) => {
  try {
    const funds = await Fund.find({ user: req.user.userId });
    res.json(funds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Save a new fund
// @route   POST /api/funds
// @access  Private
const saveFund = async (req, res) => {
  try {
    const { fundId, name, category, nav } = req.body;

    const fund = new Fund({
      fundId,
      name,
      category,
      nav,
      user: req.user.userId,
    });

    const savedFund = await fund.save();
    res.status(201).json(savedFund);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a fund
// @route   DELETE /api/funds/:id
// @access  Private
const deleteFund = async (req, res) => {
  try {
    const fund = await Fund.findById(req.params.id);

    if (!fund) {
      return res.status(404).json({ message: 'Fund not found' });
    }

    // Check if the fund belongs to the user
    if (fund.user.toString() !== req.user.userId) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await fund.remove();
    res.json({ message: 'Fund removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getFunds, saveFund, deleteFund };
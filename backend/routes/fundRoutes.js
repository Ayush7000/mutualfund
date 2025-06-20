const express = require('express');
const router = express.Router();
const { getFunds, saveFund, deleteFund } = require('../controllers/fundController');
const { protect } = require('../middlewares/auth');

router.route('/').get(protect, getFunds).post(protect, saveFund);
router.route('/:id').delete(protect, deleteFund);

module.exports = router;
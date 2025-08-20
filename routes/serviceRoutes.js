const express = require('express');

const {
  createService,
  getServiceById,
  updateServiceStatus,
  getAssignedServiceByUser,
  updateserviceFeedback
} = require('../controllers/serviceController');

const router = express.Router();

router.route('/').post(createService);
router.route('/assigned/:userId').get(getAssignedServiceByUser);
router.route('/:id').get(getServiceById);
router.route('/:id/status').put(updateServiceStatus);
router.route('/:id/feedback').put(updateserviceFeedback)

module.exports = router;

const express = require('express');
const { getSettings, updateSettings, getAuditLogs, createBackup, restoreBackup } = require('../controllers/adminController');
const router = express.Router();

router.route("/settings").get(getSettings).put(updateSettings);
router.route('/logs').get(getAuditLogs);
router.route('/backup').post(createBackup);
router.route('/restore').post(restoreBackup)



module.exports= router;
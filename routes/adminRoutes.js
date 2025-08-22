const express = require('express');
const { createGeneral, updateGeneral, getGeneral, createEmail, updateEmail, getEmail, createSMS, updateSMS, getSMS, createWhatsApp, updateWhatsApp, createSystem, updateSystem, getSystem, getAllSettings, createBackup, restoreBackup, getWhatsApp } = require('../controllers/adminController');
const router = express.Router();

router.route("/general").post(createGeneral).put(updateGeneral).get(getGeneral);
router.route("/email").post(createEmail).put(updateEmail).get(getEmail);
router.route("/sms").post(createSMS).put(updateSMS).get(getSMS);
router.route("/whatsapp").post(createWhatsApp).put(updateWhatsApp).get(getWhatsApp);
router.route("/system").post(createSystem).put(updateSystem).get(getSystem);
router.get("/all", getAllSettings);
router.post("/backup", createBackup);
router.post("/restore", restoreBackup);


module.exports = router;
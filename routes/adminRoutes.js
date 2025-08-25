const express = require("express");
const router = express.Router();
const {
  createGeneral, getGeneral, getGeneralById, updateGeneral, createEmail, getEmail, getEmailById, updateEmail, createSMS, getSMS, getSMSById, updateSMS, createWhatsApp, getWhatsApp, getWhatsAppById, updateWhatsApp, createSecurity, getSecurity, getSecurityById, updateSecurity, createSystem, getSystem, getSystemById, updateSystem, createAudit, getAudit, getAuditById, updateAudit } = require("../controllers/adminController");

router.route("/general").post(createGeneral).get(getGeneral);
router.route("/general/:id").get(getGeneralById).put(updateGeneral);

router.route("/email").post(createEmail).get(getEmail);
router.route("/email/:id").get(getEmailById).put(updateEmail);

router.route("/sms").post(createSMS).get(getSMS);
router.route("/sms/:id").get(getSMSById).put(updateSMS);

router.route("/whatsapp").post(createWhatsApp).get(getWhatsApp);
router.route("/whatsapp/:id").get(getWhatsAppById).put(updateWhatsApp);

router.route("/security").post(createSecurity).get(getSecurity);
router.route("/security/:id").get(getSecurityById).put(updateSecurity);

router.route("/system").post(createSystem).get(getSystem);
router.route("/system/:id").get(getSystemById).put(updateSystem);

router.route("/audit-logs").post(createAudit).get(getAudit);
router.route("/audit-logs/:id").get(getAuditById).put(updateAudit);

module.exports = router;

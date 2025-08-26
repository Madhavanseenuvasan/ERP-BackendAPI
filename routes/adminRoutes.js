const express = require("express");
const router = express.Router();
const { createGeneralSettings, getGeneralSettings, updateGeneralSettings, deleteGeneralSettings, createEmailSettings, getEmailSettings, updateEmailSettings, deleteEmailSettings, createSMSSettings, getSMSSettings, updateSMSSettings, deleteSMSSettings, createWhatsAppSettings, getWhatsAppSettings, updateWhatsAppSettings, deleteWhatsappSettings, createSecuritySettings, getSecuritySettings, updateSecuritySettings, deleteSecuritySettings, createSystemSettings, getSystemSettings, updateSystemSettings, deleteSystemSettings, createAuditLog, getAuditLogs } = require("../controllers/adminController");

router.route("/general").post(createGeneralSettings);
router.route("/general/:id").get(getGeneralSettings);
router.route("/general/:id").put(updateGeneralSettings);
router.route("/general/:id").delete(deleteGeneralSettings);

router.route("/email").post(createEmailSettings);
router.route("/email/:id").get(getEmailSettings);
router.route("/email/:id").put(updateEmailSettings);
router.route("/email/:id").delete(deleteEmailSettings)

router.route("/sms").post(createSMSSettings);
router.route("/sms/:id").get(getSMSSettings);
router.route("/sms/:id").put(updateSMSSettings);
router.route("/sms/:id").delete(deleteSMSSettings)

router.route("/whatsapp").post(createWhatsAppSettings);
router.route("/whatsapp/:id").get(getWhatsAppSettings);
router.route("/whatsapp/:id").put(updateWhatsAppSettings);
router.route("/whatsapp/:id").delete(deleteWhatsappSettings);

router.route("/security").post(createSecuritySettings);
router.route("/security/:id").get(getSecuritySettings);
router.route("/security/:id").put(updateSecuritySettings);
router.route("/security/:id").delete(deleteSecuritySettings);

router.route("/system").post(createSystemSettings);
router.route("/system/:id").get(getSystemSettings);
router.route("/system/:id").put(updateSystemSettings);
router.route("/system/:id").delete(deleteSystemSettings);

router.route("/audit").post(createAuditLog);
router.route("/audit").get(getAuditLogs);

module.exports = router;
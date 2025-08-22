const AdminSettings = require("../models/adminModel");

const getSettingsDoc = async () => {
  let settings = await AdminSettings.findOne();
  if (!settings) {
    settings = await AdminSettings.create({});
  }
  return settings;
};

// ===== GENERAL =====
exports.createGeneral = async (req, res) => {
  const settings = new AdminSettings({
    companyName: req.body.companyName,
    companyAddress: req.body.companyAddress,
    companyPAN: req.body.companyPAN,
    contactPhone: req.body.contactPhone,
    contactEmail: req.body.contactEmail,
    bankAccountNumber: req.body.bankAccountNumber,
    bankName: req.body.bankName,
    bankIFSC: req.body.bankIFSC,
    lastModifiedBy: req.body.lastModifiedBy
  });
  await settings.save();
  res.status(201).json({ message: "General settings created", settings });
}

exports.updateGeneral = async (req, res) => {
  const settings = await getSettingsDoc();
  Object.assign(settings, req.body);
  await settings.save();
  res.status(200).json({ message: "General settings updated", settings });
}
exports.getGeneral = async (req, res) => {
  const settings = await getSettingsDoc();
  const { companyName, companyAddress, companyPAN, contactPhone, contactEmail, bankAccountNumber, bankName, bankIFSC } = settings;
  res.status(200).json({ companyName, companyAddress, companyPAN, contactPhone, contactEmail, bankAccountNumber, bankName, bankIFSC });
}
// ===== EMAIL =====
exports.createEmail = async (req, res) => {
  const settings = new AdminSettings({
    smtpHost: req.body.smtpHost,
    smtpPort: req.body.smtpPort,
    smtpUser: req.body.smtpUser,
    smtpPass: req.body.smtpPass,
    fromName: req.body.fromName,
    fromEmail: req.body.fromEmail,
    lastModifiedBy: req.body.lastModifiedBy
  });
  await settings.save();
  res.status(201).json({ message: "Email settings created", settings });
}
exports.updateEmail = async (req, res) => {
  const settings = await getSettingsDoc();
  Object.assign(settings, req.body);
  await settings.save();
  res.status(200).json({ message: "Email settings updated", settings });
}
exports.getEmail = async (req, res) => {
  const settings = await getSettingsDoc();
  const { smtpHost, smtpPort, smtpUser, smtpPass, fromName, fromEmail } = settings;
  res.status(200).json({ smtpHost, smtpPort, smtpUser, smtpPass, fromName, fromEmail });
}

// ===== SMS =====
exports.createSMS = async (req, res) => {
  const settings = new AdminSettings({
    smsProvider: req.body.smsProvider,
    smsApiKey: req.body.smsApiKey,
    smsSenderId: req.body.smsSenderId,
    lastModifiedBy: req.body.lastModifiedBy
  });
  await settings.save();
  res.status(201).json({ message: "SMS settings created", settings });
}

exports.updateSMS = async (req, res) => {
  const settings = await getSettingsDoc();
  Object.assign(settings, req.body);
  await settings.save();
  res.status(200).json({ message: "SMS settings updated", settings });
}
exports.getSMS = async (req, res) => {
  const settings = await getSettingsDoc();
  const { smsProvider, smsApiKey, smsSenderId } = settings;
  res.status(200).json({ smsProvider, smsApiKey, smsSenderId });
}
// ===== WHATSAPP =====
exports.createWhatsApp = async (req, res) => {
  const settings = new AdminSettings({
    whatsappApiUrl: req.body.whatsappApiUrl,
    whatsappAccessToken: req.body.whatsappAccessToken,
    whatsappPhoneNumberId: req.body.whatsappPhoneNumberId,
    lastModifiedBy: req.body.lastModifiedBy
  });
  await settings.save();
  res.status(201).json({ message: "WhatsApp settings created", settings });
}
exports.updateWhatsApp = async (req, res) => {
  const settings = await getSettingsDoc();
  Object.assign(settings, req.body);
  await settings.save();
  res.status(200).json({ message: "WhatsApp settings updated", settings });
}
exports.getWhatsApp = async (req, res) => {
  const settings = await getSettingsDoc();
  const { whatsappApiUrl, whatsappAccessToken, whatsappPhoneNumberId } = settings;
  res.status(200).json({ whatsappApiUrl, whatsappAccessToken, whatsappPhoneNumberId });
}

// ===== SYSTEM =====
exports.createSystem = async (req, res) => {
  const settings = new AdminSettings({
    timezone: req.body.timezone,
    currency: req.body.currency,
    dateFormat: req.body.dateFormat,
    lastModifiedBy: req.body.lastModifiedBy
  });
  await settings.save();
  res.status(201).json({ message: "System settings created", settings });
}
exports.updateSystem = async (req, res) => {
  const settings = await getSettingsDoc();
  Object.assign(settings, req.body);
  await settings.save();
  res.status(200).json({ message: "System settings updated", settings });
}
exports.getSystem = async (req, res) => {
  const settings = await getSettingsDoc();
  const { timezone, currency, dateFormat } = settings;
  res.status(200).json({ timezone, currency, dateFormat });
}
// ===== GET ALL =====
exports.getAllSettings = async (req, res) => {
  const settings = await getSettingsDoc();
  res.status(200).json(settings);
}

exports.createBackup = async (req, res) => {
  const settings = await AdminSettings.findOne();
  if (!settings) {
    return res.status(404).json({ message: "No settings found to backup" });
  }

  const fs = require("fs");
  const path = require("path");
  const backupDir = path.join(__dirname, "../backup");
  const backupPath = path.join(backupDir, "adminSettingsBackup.json");

  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  fs.writeFileSync(backupPath, JSON.stringify(settings, null, 2));

  res.json({
    message: "Backup created successfully",
    backupPath
  });
}

exports.restoreBackup = async (req, res) => {
  const fs = require("fs");
  const path = require("path");
  const backupPath = path.join(__dirname, "../backup/adminSettingsBackup.json");

  if (!fs.existsSync(backupPath)) {
    return res.status(404).json({ message: "No backup file found" });
  }

  const backupData = JSON.parse(fs.readFileSync(backupPath, "utf-8"));
  const beforeData = await AdminSettings.findOne();

  let restoredSettings;
  if (beforeData) {
    restoredSettings = await AdminSettings.findOneAndUpdate({}, backupData, { new: true });
  } else {
    restoredSettings = await AdminSettings.create(backupData);
  }
  await AuditLog.create({
    action: "RESTORE_BACKUP",
    userId: req.user ? req.user.id : null,
    before: beforeData,
    after: restoredSettings,
    ip: req.ip
  });

  res.json({ message: "Backup restored successfully", data: restoredSettings });
};
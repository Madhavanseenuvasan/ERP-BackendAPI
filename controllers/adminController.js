const AdminSettings = require("../models/adminModel");
const AuditLog = require("../models/auditLog");

exports.getSettings = async (req, res) => {
  const settings = await AdminSettings.findOne();
  if (!settings) {
    return res.status(404).json({ message: "No settings found" });
  }
  res.json(settings);
}; 

exports.updateSettings = async (req, res) => {
  let beforeData = await AdminSettings.findOne();

  let updatedSettings;
  if (beforeData) {
    updatedSettings = await AdminSettings.findOneAndUpdate({}, req.body, {
      new: true,
      runValidators: true
    });
  } else {
    updatedSettings = await AdminSettings.create(req.body);
  }
  await AuditLog.create({
    action: beforeData ? "UPDATE_SETTINGS" : "CREATE_SETTINGS",
    userId: req.user ? req.user.id : null,
    before: beforeData,
    after: updatedSettings,
    ip: req.ip
  });

  res.json({
    message: "Settings saved successfully",
    data: updatedSettings
  });
};
exports.getAuditLogs = async (req, res) => {
  const logs = await AuditLog.find().sort({ createdAt: -1 });
  res.json(logs);
};

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

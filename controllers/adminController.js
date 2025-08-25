const {
  GeneralSettings,
  EmailSettings,
  SMSSettings,
  WhatsAppSettings,
  SecuritySettings,
  SystemSettings,
  AuditLogs
} = require("../models/adminModel");

exports.createGeneral = async (req, res) => {
  try {
    const settings = new GeneralSettings(req.body);
    await settings.save();
    res.status(201).json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getGeneral = async (req, res) => {
  try {
    const settings = await GeneralSettings.find();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getGeneralById = async (req, res) => {
  try {
    const settings = await GeneralSettings.findById(req.params.id);
    if (!settings) return res.status(404).json({ message: "General settings not found" });
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateGeneral = async (req, res) => {
  try {
    const settings = await GeneralSettings.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!settings) return res.status(404).json({ message: "General settings not found" });
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createEmail = async (req, res) => {
  try {
    const settings = new EmailSettings(req.body);
    await settings.save();
    res.status(201).json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getEmail = async (req, res) => {
  try {
    const settings = await EmailSettings.find();
    console.log("hello world");
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getEmailById = async (req, res) => {
  try {
    const settings = await EmailSettings.findById(req.params.id);
    if (!settings) return res.status(404).json({ message: "Email settings not found" });
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateEmail = async (req, res) => {
  try {
    const settings = await EmailSettings.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!settings) return res.status(404).json({ message: "Email settings not found" });
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createSMS = async (req, res) => {
  try {
    const settings = new SMSSettings(req.body);
    await settings.save();
    res.status(201).json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSMS = async (req, res) => {
  try {
    const settings = await SMSSettings.find();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSMSById = async (req, res) => {
  try {
    const settings = await SMSSettings.findById(req.params.id);
    if (!settings) return res.status(404).json({ message: "SMS settings not found" });
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateSMS = async (req, res) => {
  try {
    const settings = await SMSSettings.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!settings) return res.status(404).json({ message: "SMS settings not found" });
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createWhatsApp = async (req, res) => {
  try {
    const settings = new WhatsAppSettings(req.body);
    await settings.save();
    res.status(201).json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getWhatsApp = async (req, res) => {
  try {
    const settings = await WhatsAppSettings.find();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getWhatsAppById = async (req, res) => {
  try {
    const settings = await WhatsAppSettings.findById(req.params.id);
    if (!settings) return res.status(404).json({ message: "WhatsApp settings not found" });
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateWhatsApp = async (req, res) => {
  try {
    const settings = await WhatsAppSettings.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!settings) return res.status(404).json({ message: "WhatsApp settings not found" });
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createSecurity = async (req, res) => {
  try {
    const settings = new SecuritySettings(req.body);
    await settings.save();
    res.status(201).json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSecurity = async (req, res) => {
  try {
    const settings = await SecuritySettings.find();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSecurityById = async (req, res) => {
  try {
    const settings = await SecuritySettings.findById(req.params.id);
    if (!settings) return res.status(404).json({ message: "Security settings not found" });
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateSecurity = async (req, res) => {
  try {
    const settings = await SecuritySettings.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!settings) return res.status(404).json({ message: "Security settings not found" });
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createSystem = async (req, res) => {
  try {
    const settings = new SystemSettings(req.body);
    await settings.save();
    res.status(201).json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSystem = async (req, res) => {
  try {
    const settings = await SystemSettings.find();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSystemById = async (req, res) => {
  try {
    const settings = await SystemSettings.findById(req.params.id);
    if (!settings) return res.status(404).json({ message: "System settings not found" });
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateSystem = async (req, res) => {
  try {
    const settings = await SystemSettings.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!settings) return res.status(404).json({ message: "System settings not found" });
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createAudit = async (req, res) => {
  try {
    const log = new AuditLogs(req.body);
    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAudit = async (req, res) => {
  try {
    const logs = await AuditLogs.find();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAuditById = async (req, res) => {
  try {
    const log = await AuditLogs.findById(req.params.id);
    if (!log) return res.status(404).json({ message: "Audit log not found" });
    res.json(log);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateAudit = async (req, res) => {
  try {
    const log = await AuditLogs.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!log) return res.status(404).json({ message: "Audit log not found" });
    res.json(log);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

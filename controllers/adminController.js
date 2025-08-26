const {
  GeneralSettings,
  EmailSettings,
  SMSSettings,
  WhatsAppSettings,
  SecuritySettings,
  SystemSettings,
  AuditLogs
} = require('../models/adminModel')

const sendResponse = (res, status, success, message, data = null) => {
  res.status(status).json({ success, message, data });
};

exports.createGeneralSettings = async (req, res) => {
  try {
    const general = new GeneralSettings(req.body);
    const saved = await general.save();
    sendResponse(res, 201, true, "General settings created", saved);
  } catch (err) {
    sendResponse(res, 400, false, err.message);
  }
};

exports.getGeneralSettings = async (req, res) => {
  try {
    const general = await GeneralSettings.findById(req.params.id);
    if (!general) return sendResponse(res, 404, false, "Not found");
    sendResponse(res, 200, true, "General settings fetched", general);
  } catch (err) {
    sendResponse(res, 400, false, err.message);
  }
};

exports.updateGeneralSettings = async (req, res) => {
  try {
    const updated = await GeneralSettings.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return sendResponse(res, 404, false, "Not found");
    sendResponse(res, 200, true, "General settings updated", updated);
  } catch (err) {
    sendResponse(res, 400, false, err.message);
  }
};

exports.deleteGeneralSettings = async (req, res) => {
  try {
    const deleted = await GeneralSettings.findByIdAndDelete(req.params.id);
    if (!deleted) return sendResponse(res, 404, false, "Not found");
    sendResponse(res, 200, true, "General settings deleted");
  } catch (err) {
    sendResponse(res, 400, false, err.message);
  }
};

exports.createEmailSettings = async (req, res) => {
  try {
    const email = new EmailSettings(req.body);
    const saved = await email.save();
    sendResponse(res, 201, true, "Email settings created", saved);
  } catch (err) {
    sendResponse(res, 400, false, err.message);
  }
};

exports.getEmailSettings = async (req, res) => {
  try {
    const email = await EmailSettings.findById(req.params.id);
    if (!email) return sendResponse(res, 404, false, "Not found");
    sendResponse(res, 200, true, "Email settings fetched", email);
  } catch (err) {
    sendResponse(res, 400, false, err.message);
  }
};

exports.updateEmailSettings = async (req, res) => {
  try {
    const updated = await EmailSettings.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return sendResponse(res, 404, false, "Not found");
    sendResponse(res, 200, true, "Email settings updated", updated);
  } catch (err) {
    sendResponse(res, 400, false, err.message);
  }
};

exports.deleteEmailSettings = async (req, res) => {
  try {
    const deleted = await EmailSettings.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Email settings deleted" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.createSMSSettings = async (req, res) => {
  try {
    const sms = new SMSSettings(req.body);
    const saved = await sms.save();
    sendResponse(res, 201, true, "SMS settings created", saved);
  } catch (err) {
    sendResponse(res, 400, false, err.message);
  }
};

exports.getSMSSettings = async (req, res) => {
  try {
    const sms = await SMSSettings.findById(req.params.id);
    if (!sms) return sendResponse(res, 404, false, "Not found");
    sendResponse(res, 200, true, "SMS settings fetched", sms);
  } catch (err) {
    sendResponse(res, 400, false, err.message);
  }
};

exports.updateSMSSettings = async (req, res) => {
  try {
    const updated = await SMSSettings.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return sendResponse(res, 404, false, "Not found");
    sendResponse(res, 200, true, "SMS settings updated", updated);
  } catch (err) {
    sendResponse(res, 400, false, err.message);
  }
};

exports.deleteSMSSettings = async (req, res) => {
  try {
    const deleted = await SMSSettings.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "SMS settings deleted" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.createWhatsAppSettings = async (req, res) => {
  try {
    const whatsapp = new WhatsAppSettings(req.body);
    const saved = await whatsapp.save();
    sendResponse(res, 201, true, "WhatsApp settings created", saved);
  } catch (err) {
    sendResponse(res, 400, false, err.message);
  }
};

exports.getWhatsAppSettings = async (req, res) => {
  try {
    const whatsapp = await WhatsAppSettings.findById(req.params.id);
    if (!whatsapp) return sendResponse(res, 404, false, "Not found");
    sendResponse(res, 200, true, "WhatsApp settings fetched", whatsapp);
  } catch (err) {
    sendResponse(res, 400, false, err.message);
  }
};

exports.updateWhatsAppSettings = async (req, res) => {
  try {
    const updated = await WhatsAppSettings.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return sendResponse(res, 404, false, "Not found");
    sendResponse(res, 200, true, "WhatsApp settings updated", updated);
  } catch (err) {
    sendResponse(res, 400, false, err.message);
  }
};

exports.deleteWhatsappSettings = async (req, res) => {
  try {
    const deleted = await WhatsAppSettings.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "WhatsApp settings deleted" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}

exports.createSecuritySettings = async (req, res) => {
  try {
    const security = new SecuritySettings(req.body);
    const saved = await security.save();
    sendResponse(res, 201, true, "Security settings created", saved);
  } catch (err) {
    sendResponse(res, 400, false, err.message);
  }
};

exports.getSecuritySettings = async (req, res) => {
  try {
    const sec = await SecuritySettings.findById(req.params.id);
    if (!sec) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: sec });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}
exports.updateSecuritySettings = async (req, res) => {
  try {
    const updated = await SecuritySettings.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return sendResponse(res, 404, false, "Not found");
    sendResponse(res, 200, true, "Security settings updated", updated);
  } catch (err) {
    sendResponse(res, 400, false, err.message);
  }
};

exports.deleteSecuritySettings =  async (req, res) => {
  try {
    const deleted = await SecuritySettings.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Security settings deleted" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}

exports.createSystemSettings = async (req, res) => {
  try {
    const system = new SystemSettings(req.body);
    const saved = await system.save();
    sendResponse(res, 201, true, "System settings created", saved);
  } catch (err) {
    sendResponse(res, 400, false, err.message);
  }
};

exports.getSystemSettings = async (req, res) => {
  try {
    const sys = await SystemSettings.findById(req.params.id);
    if (!sys) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: sys });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}

exports.updateSystemSettings = async (req, res) => {
  try {
    const updated = await SystemSettings.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return sendResponse(res, 404, false, "Not found");
    sendResponse(res, 200, true, "System settings updated", updated);
  } catch (err) {
    sendResponse(res, 400, false, err.message);
  }
};

exports.deleteSystemSettings = async (req, res) => {
  try {
    const deleted = await SystemSettings.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "System settings deleted" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}

exports.createAuditLog = async (req, res) => {
  try {
    const log = new AuditLogs(req.body);
    const saved = await log.save();
    sendResponse(res, 201, true, "Audit log created", saved);
  } catch (err) {
    sendResponse(res, 400, false, err.message);
  }
};

exports.getAuditLogs = async (req, res) => {
  try {
    const logs = await AuditLogs.find()
      .populate("generalSettings")
      .populate("emailSettings")
      .populate("smsSettings")
      .populate("whatsappSettings")
      .populate("securitySettings")
      .populate("systemSettings");

    sendResponse(res, 200, true, "Audit logs fetched", logs);
  } catch (err) {
    sendResponse(res, 400, false, err.message);
  }
};
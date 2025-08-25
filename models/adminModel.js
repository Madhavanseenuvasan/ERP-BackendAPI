const mongoose = require("mongoose");

const GeneralSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  companyAddress: { type: String, required: true },
  companyPAN: { type: String },
  contactPhone: { type: String },
  contactEmail: { type: String },
  bankAccountNumber: { type: String },
  bankName: { type: String },
  bankIFSC: { type: String }
}, { timestamps: true });
const GeneralSettings = mongoose.model("GeneralSettings", GeneralSchema);

const EmailSchema = new mongoose.Schema({
  smtpHost: { type: String },
  smtpPort: { type: Number, default: 587 },
  smtpUsername: { type: String },
  smtpPassword: { type: String },
  fromName: { type: String },
  fromEmail: { type: String }
}, { timestamps: true });
const EmailSettings = mongoose.model("EmailSettings", EmailSchema);

const SMSSchema = new mongoose.Schema({
  provider: { type: String, enum: ["twilio", "nexmo", "other"], default: "twilio" },
  apiKey: { type: String },
  senderId: { type: String }
}, { timestamps: true });
const SMSSettings = mongoose.model("SMSSettings", SMSSchema);

const WhatsAppSchema = new mongoose.Schema({
  apiUrl: { type: String },
  accessToken: { type: String },
  phoneNumberId: { type: String }
}, { timestamps: true });
const WhatsAppSettings = mongoose.model("WhatsAppSettings", WhatsAppSchema);

const SecuritySchema = new mongoose.Schema({
  apiKeys: [{ name: String, key: String, createdAt: { type: Date, default: Date.now } }],
  webhooks: [{ url: String, event: String }]
}, { timestamps: true });
const SecuritySettings = mongoose.model("SecuritySettings", SecuritySchema);

const SystemSchema = new mongoose.Schema({
  currency: { type: String, default: "USD" },
  dateFormat: { type: String, default: "YYYY-MM-DD" },
  timezone: { type: String, default: "UTC" }
}, { timestamps: true });
const SystemSettings = mongoose.model("SystemSettings", SystemSchema);

const AuditLogSchema = new mongoose.Schema({
  action: String,
  performedBy: String,
  timestamp: { type: Date, default: Date.now }
}, { timestamps: true });
const AuditLogs = mongoose.model("AuditLogs", AuditLogSchema);

module.exports = {
  GeneralSettings,
  EmailSettings,
  SMSSettings,
  WhatsAppSettings,
  SecuritySettings,
  SystemSettings,
  AuditLogs
};

const mongoose = require("mongoose");
const {Schema } = mongoose;

const GeneralSchema = new Schema({
  general: {
    companyName: { type: String, required: true },
    companyAddress: { type: String, required: true },
    companyPAN: { type: String },
    contactPhone: { type: String },
    contactEmail: { type: String, required: true },
    bankDetails: {
      accountNumber: { type: String },
      bankName: { type: String },
      ifscCode: { type: String },
    },
  },
},
  { timestamps: true })
const GeneralSettings = mongoose.model("GeneralSettings", GeneralSchema);

const EmailSchema = new Schema({
  email: {
    smtpHost: { type: String },
    smtpPort: { type: Number, default: 587 },
    smtpUsername: { type: String },
    smtpPassword: { type: String },
    fromName: { type: String },
    fromEmailAddress: { type: String },
  },

}, { timestamps: true });
const EmailSettings = mongoose.model("EmailSettings", EmailSchema);

const SMSSchema = new Schema({
  sms: {
    provider: { type: String, default: "twilio" },
    apiKey: { type: String },
    senderId: { type: String },
  },
}, { timestamps: true });
const SMSSettings = mongoose.model("SMSSettings", SMSSchema);

const WhatsAppSchema = new Schema({
  whatsapp: {
    apiUrl: { type: String },
    accessToken: { type: String },
    phoneNumberId: { type: String },
  },

}, { timestamps: true });
const WhatsAppSettings = mongoose.model("WhatsAppSettings", WhatsAppSchema);

const SecuritySchema = new Schema({
  security: {
    enabled: { type: Boolean, default: false },
    notes: { type: String },
  },
}, { timestamps: true });
const SecuritySettings = mongoose.model("SecuritySettings", SecuritySchema);

const SystemSchema = new Schema({
  system: {
    notes: { type: String },
  },
}, { timestamps: true });
const SystemSettings = mongoose.model("SystemSettings", SystemSchema);

const auditLogs = new Schema({
  generalSettings: {type:Schema.Types.ObjectId, ref:"GeneralSettings", required: true},
  emailSettings:{type:Schema.Types.ObjectId, ref:"EmailSettings", required: true},
  smsSettings:{type:Schema.Types.ObjectId, ref:"SMSSettings", required: true},
  whatsappSettings:{type:Schema.Types.ObjectId, ref:"WhatsAppSettings", required: true},
  securitySettings:{type:Schema.Types.ObjectId, ref:"SecuritySettings", required: true},
  systemSettings:{type:Schema.Types.ObjectId, ref:"SystemSettings", required: true}
});

const AuditLogs=mongoose.model('Audit Logs',auditLogs)



module.exports = {
  GeneralSettings,
  EmailSettings,
  SMSSettings,
  WhatsAppSettings,
  SecuritySettings,
  SystemSettings,
  AuditLogs
};

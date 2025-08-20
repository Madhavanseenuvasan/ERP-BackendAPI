const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  // General
  companyName: { type: String, default: '' },
  companyAddress: { type: String, default: '' },
  companyPAN: { type: String, default: '' },
  contactPhone: { type: String, default: '' },
  contactEmail: { type: String, default: '' },
  bankAccountNumber: { type: String, default: '' },
  bankName: { type: String, default: '' },
  bankIFSC: { type: String, default: '' },

  // Email settings
  smtpHost: { type: String, default: '' },
  smtpPort: { type: Number, default: 587 },
  smtpUser: { type: String, default: '' },
  smtpPass: { type: String, default: '' },
  fromName: { type: String, default: '' },
  fromEmail: { type: String, default: '' },

  // SMS settings
  smsProvider: { type: String, default: '' },
  smsApiKey: { type: String, default: '' },
  smsSenderId: { type: String, default: '' },

  // WhatsApp settings
  whatsappApiUrl: { type: String, default: '' },
  whatsappAccessToken: { type: String, default: '' },
  whatsappPhoneNumberId: { type: String, default: '' },

  // System
  timezone: { type: String, default: '' },
  currency: { type: String, default: '' },
  dateFormat: { type: String, default: '' },

  lastModifiedBy: { type: String }
}, { timestamps: true }); 

const adminModel = mongoose.model('AdminSettings', adminSchema);
module.exports= adminModel;

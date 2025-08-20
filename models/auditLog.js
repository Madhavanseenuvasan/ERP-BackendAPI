const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  action: { type: String, required: true },
  userId: { type: String },
  before: { type: mongoose.Schema.Types.Mixed },
  after: { type: mongoose.Schema.Types.Mixed },
  ip: { type: String },
  meta: { type: mongoose.Schema.Types.Mixed }
}, { timestamps: true });

const auditModel  = mongoose.model('AuditLog', auditLogSchema);
module.exports= auditModel;

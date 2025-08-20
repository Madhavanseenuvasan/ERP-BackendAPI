const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  status: {
    type: String,
    enum: ['Open', 'In-Progress', 'Resolved'],
    default: 'Open'
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  assignedEngineer:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  clientFeedback: String,
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  slaHours: { 
    type: Number 
  },
  slaBreached: { 
  type: Boolean, 
  default: false 
  },
  assignedAt: Date,
  resolvedAt: Date
});

const serviceModel = mongoose.model('ServiceManagement', ServiceSchema);
module.exports = serviceModel;

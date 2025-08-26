const mongoose = require("mongoose");
const { Schema } = mongoose;

const CustomerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  address: { type: String }
}, { timestamps: true });

const TechnicianSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String },
}, { timestamps: true });

const ServiceReportSchema = new Schema({
  ticketId: { type: Schema.Types.ObjectId, ref: "ServiceTicket", required: true },
  workCompleted: { type: String },
  partsUsed: [{ partName: String, quantity: Number }],
  recommendations: { type: String },
  customerFeedback: { type: String },
  serviceQuality: { type: String, enum: ["Poor", "Average", "Good", "Excellent"] },
  customerSatisfaction: { type: Number, min: 1, max: 5 },
  nextVisitRequired: { type: Boolean, default: false },
  photos: [{ type: String }], 
  customerSignature: { type: String },
  technicianSignature: { type: String } 
}, { timestamps: true });

const ServiceTicketSchema = new Schema({
  ticketNumber: { type: String, required: true, unique: true }, 
  customer: { type: Schema.Types.ObjectId, ref: "CustomerModel", required: true },
  product: { type: String },
  
  requestType: { type: String },  
  magiec: { type: String },
  magiecCode: { type: String },
  engineSerialNumber: { type: String },
  vertical: { type: String },
  siteId: { type: String },
  state: { type: String },
  siteLocation: { type: String },

  serviceRequiredDate: { type: Date },
  scheduledDate: { type: Date },
  completedDate: { type: Date },
  invoiceRaised: { type: Boolean, default: false },
  serviceCharge: { type: Number },

  priority: { type: String, enum: ["Low", "Medium", "High", "Critical"], default: "Medium" },
  status: { type: String, enum: ["Open", "In Progress", "Resolved", "Closed", "Cancelled"], default: "Open" },

  assignedTo: { type: Schema.Types.ObjectId, ref: "Technician" },

  report: { type: Schema.Types.ObjectId, ref: "ServiceReport" }
}, { timestamps: true });

const Customer = mongoose.model("CustomerModel", CustomerSchema);
const Technician = mongoose.model("Technician", TechnicianSchema);
const ServiceReport = mongoose.model("ServiceReport", ServiceReportSchema);
const ServiceTicket = mongoose.model("ServiceTicket", ServiceTicketSchema);

module.exports = {
  Customer,
  Technician,
  ServiceReport,
  ServiceTicket
};

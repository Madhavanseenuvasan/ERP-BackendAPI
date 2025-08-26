const mongoose = require('mongoose');


const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  companyName: String,
  email: String,
  phone: String,
  gstNumber: String,
  panNumber: String,
  billToAddress: { type: String, required: true },
  shipToAddress: String,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });


const engineerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  phone: String,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });


const quotationItemSchema = new mongoose.Schema({
  productCode: String,
  productName: String,
  hsnSac: String,
  gst: Number,
  quantity: Number,
  uom: String,
  unitPrice: Number,
  discount: Number,
  total: Number
});


const quotationSchema = new mongoose.Schema({
  quotationNo: { type: String, required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  engineer: { type: mongoose.Schema.Types.ObjectId, ref: 'Engineer' },
  billToAddress: String,
  shipToAddress: String,
  issueDate: { type: Date, default: Date.now },
  validUntil: Date,
  status: { type: String, enum: ['Quotation', 'Converted', 'Expired'], default: 'Quotation' },
  items: [quotationItemSchema],
  notes: String,
  termsConditions: String,
  subtotal: Number,
  totalTax: Number,
  overallDiscount: Number,
  grandTotal: Number,
  convertedInvoice: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' }
}, { timestamps: true });


const invoiceItemSchema = new mongoose.Schema({
  partNo: String,
  productName: String,
  description: String,
  hsnSac: String,
  gst: Number,
  quantity: Number,
  uom: String,
  unitPrice: Number,
  discount: Number,
  total: Number
});


const invoiceSchema = new mongoose.Schema({
  invoiceNo: { type: String, required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  engineer: { type: mongoose.Schema.Types.ObjectId, ref: 'Engineer' },
  billToAddress: String,
  shipToAddress: String,
  issueDate: { type: Date, default: Date.now },
  dueDate: Date,
  status: { 
    type: String, 
    enum: ['Draft', 'Sent', 'Paid', 'Overdue', 'Cancelled', 'Partial'], 
    default: 'Draft' 
  },
  items: [invoiceItemSchema],
  subtotal: Number,
  totalTax: Number,
  overallDiscount: Number,
  grandTotal: Number,
  balanceDue: { type: Number, default: 0 },
  currency: { type: String, default: 'INR' },
  exchangeRate: { type: Number, default: 1 },
  notes: String,
  termsConditions: String
}, { timestamps: true });


const paymentSchema = new mongoose.Schema({
  invoice: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice', required: true },
  amount: { type: Number, required: true },
  method: { type: String, enum: ['Manual', 'Gateway'], default: 'Manual' },
  status: { type: String, enum: ['Paid', 'Partial', 'Failed'], default: 'Paid' },
  referenceNo: String, // UPI/cheque/transaction ID
  notes: String,
  date: { type: Date, default: Date.now }
}, { timestamps: true });


const ledgerSchema = new mongoose.Schema({
  entryDate: { type: Date, default: Date.now },
  module: { type: String, enum: ['billing', 'purchase'], required: true },
  account: { type: String, required: true },
  type: { type: String, enum: ['Debit', 'Credit'], required: true },
  amount: { type: Number, required: true },
  description: String,
  relatedInvoice: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' },
  relatedPayment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' },
  user: String
}, { timestamps: true });

const Customer = mongoose.model('Customer', customerSchema);
const Engineer = mongoose.model('Engineer', engineerSchema);
const Quotation = mongoose.model('Quotation', quotationSchema);
const Invoice = mongoose.model('Invoice', invoiceSchema);
const Payment = mongoose.model('Payment', paymentSchema);
const Ledger = mongoose.model('Ledger', ledgerSchema);

module.exports = { Customer, Engineer, Quotation, Invoice, Payment, Ledger };

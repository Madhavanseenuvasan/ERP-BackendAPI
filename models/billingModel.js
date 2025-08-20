const mongoose = require('mongoose');

const invoiceItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 },
  taxPercent: { type: Number, default: 0 }
}, { _id: false });


const invoiceSchema = new mongoose.Schema({
  type: { type: String, enum: ['purchase', 'sales'], required: true },
  invoiceNo: { type: String, required: true },
  date: { type: Date, default: Date.now },
  vendorOrCustomer: { type: String, required: true },
  items: [invoiceItemSchema],
  totalAmount: { type: Number, required: true },
  gstAmount: { type: Number, default: 0 },
  netAmount: { type: Number, required: true },
  status: { type: String, enum: ['paid', 'unpaid', 'partial'], default: 'unpaid' },
  createdAt: { type: Date, default: Date.now }
});


const paymentSchema = new mongoose.Schema({
  type: { type: String, enum: ['received', 'made'], required: true },
  invoiceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice', required: true },
  amount: { type: Number, required: true, min: 0 },
  method: { 
    type: String, 
    enum: ['cash', 'bank transfer', 'credit card'], 
    required: true 
  },
  date: { type: Date, default: Date.now },
  reference: String
});

const ledgerSchema = new mongoose.Schema({
  entryDate: { type: Date, default: Date.now },
  module: { type: String, enum: ['billing', 'purchase'], required: true },
  account: { type: String, required: true },
  debit: { type: Number, default: 0 },
  credit: { type: Number, default: 0 },
  description: String,
  relatedInvoice: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' },
  relatedPayment: { type: mongoose.Schema.Types.ObjectId, ref: 'InvoicePayment' },
  user: String
}, { timestamps: true });

module.exports = {
  Invoice: mongoose.model('Invoice', invoiceSchema),
  Payment: mongoose.model('InvoicePayment', paymentSchema),
  Ledger: mongoose.model('Ledger', ledgerSchema)
};

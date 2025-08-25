const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  partNumber: String,
  productName: String,
  category: String,
  hsnSac: String,
  gstPercent: Number,
  uom: String,
  unitPrice: Number,
  quantity: Number,
  totalPrice: Number,
  receivedQuantity: { type: Number, default: 0 },
  itemNotes: String
});

const purchaseOrderSchema = new mongoose.Schema({
  poNumber: { type: String, unique: true },
  supplierName: String,
  supplierAddress: String,
  department: String,
  priority: String,
  sourceType: String,
  expectedDeliveryDate: Date,
  createdDate: { type: Date, default: Date.now },
  status: { 
    type: String, 
    enum: ['Draft', 'Confirmed', 'Received', 'Partially Received', 'Cancelled'], 
    default: 'Draft' 
  },
  deliveryStatus: { 
    type: String, 
    enum: ['on time', 'delayed', 'delivered'], 
    default: 'on time' 
  },
  items: [itemSchema],
  notes: String,
  subtotal: Number,
  totalTax: Number,
  grandTotal: Number
});

// Auto-generate PO number + calculate totals
purchaseOrderSchema.pre('save', async function(next) {
  if (!this.poNumber) {
    this.poNumber = `PO-${Date.now()}`;
  }

  this.subtotal = this.items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  this.totalTax = this.items.reduce((sum, item) => sum + ((item.unitPrice * item.quantity) * (item.gstPercent || 0) / 100), 0);
  this.grandTotal = this.subtotal + this.totalTax;

  next();
});


const expenseSchema = new mongoose.Schema({
  category: String,
  description: String,
  amount: Number,
  date: { type: Date, default: Date.now },
  paidTo: String,
  paymentMethod: { type: String, enum: ['cash', 'bank transfer', 'credit card'] },
  gstIncluded: { type: Boolean, default: false }
});


const purchasePaymentSchema = new mongoose.Schema({
  po: { type: mongoose.Schema.Types.ObjectId, ref: 'PurchaseOrder', required: true },
  amount: { type: Number, required: true },
  paymentDate: { type: Date, default: Date.now },
  method: { type: String, enum: ['cash', 'bank transfer', 'credit card'], required: true },
  reference: String
});

const budgetSchema = new mongoose.Schema({
  department: String,
  category: String,
  allocatedAmount: Number,
  spentAmount: { type: Number, default: 0 },
  period: String 
});

const taxSchema = new mongoose.Schema({
  type: { type: String, enum: ['GST', 'VAT'], required: true },
  rate: { type: Number, required: true },
  jurisdiction: String,
  applicableFrom: Date,
  applicableTo: Date
});

exports.PurchaseOrder = mongoose.model('PurchaseOrder', purchaseOrderSchema);
exports.PurchasePayment = mongoose.model('PurchasePayment', purchasePaymentSchema);
exports.Expense = mongoose.model('Expense', expenseSchema);
exports.Budget = mongoose.model('Budget', budgetSchema);
exports.Tax = mongoose.model('Tax', taxSchema);

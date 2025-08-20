const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: String,
  type: String,
  address: String,
  contactPerson: String,
  contactPhone: String,
  rooms: [String],
  racks: [String],
  isActive: Boolean
});

const productSchema = new mongoose.Schema({
  name: String,
  partNo: String,
  category: String,
  brand: String,
  unitPrice: Number,
  uom: String,
  gst: Number,
  gndp: Number,
  hsn: String,
  status: String,
  department: String,
  technicalInfo: String,
  stock: {
    available: Number,
    reserved: Number,
    current: Number
  },
  location: {
    name: String,
    room: String,
    rack: String
  }
}, { timestamps: true });

const transactionSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  type: { type: String, enum: ['inward', 'outward', 'adjustment', 'transfer', 'issue'] },
  previousQty: Number,
  change: Number,
  resultQty: Number,
  reference: String,
  reason: String,
  location: String,
  room: String,
  rack: String,
  user: String,
  date: Date
});

exports.locationModel = mongoose.model('Location', locationSchema);
exports.productModel = mongoose.model('Product', productSchema);
exports.transactionModel=mongoose.model('Transaction',transactionSchema);
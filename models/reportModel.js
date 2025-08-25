const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  reportType: {
    type: String,
    enum: ["Sales", "Inventory", "Finance", "AMC", "Leads", "Engineers", "Custom"],
    required: true,
  },

  title: String,
  description: String,
  createdAt: { type: Date, default: Date.now },

  sales: {
    invoiceNo: String,
    invoiceDate: Date,
    orderNo: String,
    orderDate: Date,
    customerName: String,
    customerCode: String,
    productName: String,
    productCode: String,
    qty: Number,
    rate: Number,
    amount: Number,
    discount: Number,
    tax: Number,
    netAmount: Number,
    paymentMode: String,
    paymentStatus: String,
    salesPerson: String,
    region: String,
  },

  inventory: {
    itemCode: String,
    itemName: String,
    category: String,
    uom: String,
    openingStock: Number,
    purchaseQty: Number,
    salesQty: Number,
    stockInHand: Number,
    reorderLevel: Number,
    supplierName: String,
    warehouseLocation: String,
    lastPurchaseDate: Date,
    lastSalesDate: Date,
  },

  finance: {
    voucherNo: String,
    voucherDate: Date,
    accountHead: String,
    debit: Number,
    credit: Number,
    balance: Number,
    narration: String,
    paymentMode: String,
    transactionRef: String,
    bankName: String,
    chequeNo: String,
    chequeDate: Date,
  },

  amc: {
    contractNo: String,
    contractDate: Date,
    customerName: String,
    customerCode: String,
    startDate: Date,
    endDate: Date,
    contractValue: Number,
    status: { type: String, enum: ["Active", "Expired", "Renewed"] },
    serviceEngineer: String,
    totalVisits: Number,
    completedVisits: Number,
    pendingVisits: Number,
  },

  leads: {
    leadNo: String,
    leadDate: Date,
    leadName: String,
    companyName: String,
    contactPerson: String,
    contactNo: String,
    email: String,
    leadSource: String,
    status: { type: String, enum: ["New", "Contacted", "Qualified", "Lost", "Converted"] },
    assignedTo: String,
    expectedValue: Number,
    followUpDate: Date,
  },

  engineers: {
    engineerCode: String,
    engineerName: String,
    designation: String,
    department: String,
    region: String,
    specialization: String,
    ticketsAssigned: Number,
    ticketsResolved: Number,
    slaBreaches: Number,
    performanceRating: Number,
    lastServiceDate: Date,
  },

  custom: {
    fields: [
      {
        fieldName: String,
        fieldType: { type: String, enum: ["String", "Number", "Date", "Boolean"] },
        value: mongoose.Schema.Types.Mixed
      }
    ],
    filters: mongoose.Schema.Types.Mixed,
    generatedBy: String,
  }

}, { timestamps: true });

module.exports = mongoose.model("Report", reportSchema);

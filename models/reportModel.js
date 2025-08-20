const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  product: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  total: { type: Number, required: true }
});

const serviceSchema = new mongoose.Schema({
  date: Date,
  serviceType: String,
  client: String,
  status: String,
  revenue: Number
});

const inventorySchema = new mongoose.Schema({
  product: { type: String, required: true },
  stock: { type: Number, required: true },
  sold: { type: Number, required: true },
  date: { type: Date, required: true }
});
const transactionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  type: { type: String, enum: ["income", "expense"], required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String }
});

const pnlSchema = new mongoose.Schema({
  period: { type: String, required: true },
  totalIncome: { type: Number, required: true },
  totalExpense: { type: Number, required: true },
  netProfit: { type: Number, required: true }
});

const balanceSheetSchema = new mongoose.Schema({
  period: { type: String, required: true },
  assets: { type: Number, required: true },
  liabilities: { type: Number, required: true },
  equity: { type: Number, required: true }
});

const financeSchema = new mongoose.Schema({
  transactions: [transactionSchema],
  pnl: pnlSchema,
  balanceSheet: balanceSheetSchema
});
const engineerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true }, 
  ticketsCompleted: { type: Number, required: true },
  avgTAT: { type: String, required: true }, 
  slaCompliance: { type: String, required: true },
  customerRating: { type: String, required: true }, 
  performance: { type: String }, 
  initials: { type: String } 
});

const teamPerformanceTrendSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  value: { type: Number, required: true }
});

const engineerPerformanceSchema = new mongoose.Schema({
  reportPeriod: { type: String, required: true }, 
  totalEngineers: { type: Number, required: true },
  avgTicketsPerEngineer: { type: Number, required: true },
  avgResolutionTime: { type: String, required: true }, 
  avgRating: { type: Number, required: true },
  engineers: [engineerSchema],
  teamPerformanceTrend: [teamPerformanceTrendSchema]
});
const widgetSchema = new mongoose.Schema({
  widgetType: { type: String, required: true },
  title: { type: String },
  data: { type: mongoose.Schema.Types.Mixed, required: true },
  options: { type: mongoose.Schema.Types.Mixed }
});

const dashboardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdBy: { type: String },
  createdAt: { type: Date, default: Date.now },
  widgets: [widgetSchema]
});

const salesModel = mongoose.model("Sales", salesSchema);
const serviceModel= mongoose.model("Service", serviceSchema);
const inventoryModel = mongoose.model("Inventory", inventorySchema);
const financeModel = mongoose.model("Finance", financeSchema);
const EngineerPerformance = mongoose.model('EngineerPerformance', engineerPerformanceSchema);
const Dashboard = mongoose.model('Dashboard', dashboardSchema);

module.exports = {salesModel, serviceModel, inventoryModel, financeModel, EngineerPerformance, Dashboard}

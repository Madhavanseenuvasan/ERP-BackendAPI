const mongoose = require("mongoose");
const { Schema } = mongoose;

const revenueSchema = new Schema({
  totalRevenue: Number,
  revenueChangePercent: Number,
  monthlyGrowth: Number,
  revenueTrend: [{ month: String, value: Number }],
  revenueByClientType: [{
    clientType: String,
    value: Number,
    percent: Number
  }],
  topRevenueClients: [{
    name: String,
    clientType: String,
    value: Number
  }]
}, { timestamps: true });


const amcSchema = new Schema({
  amcContractsTotal: Number,
  amcContractsChangePercent: Number,
  activeContracts: Number,
  expiringSoonContracts: Number,
  overdueContracts: Number,
  contractValue: Number,
  contractStatusDistribution: {
    active: Number,
    expiring: Number,
    expired: Number
  },
  monthlyRenewals: [{ month: String, renewals: Number, newContracts: Number }],
  visitComplianceRate: Number
}, { timestamps: true });

const ticketAnalyticsSchema = new Schema({
  totalTickets: Number,
  activeTickets: Number,
  activeTicketsChangePercent: Number,
  closedTickets: Number,
  statusBreakdown: {
    open: Number,
    inProgress: Number,
    resolved: Number,
    closed: Number
  },
  priorityBreakdown: {
    critical: Number,
    high: Number,
    medium: Number,
    low: Number
  },
  averageTAT: Number,
  tatDistribution: [{ range: String, count: Number }],
  slaCompliance: Number,
  slaComplianceChangePercent: Number
}, { timestamps: true });

const inventorySchema = new Schema({
  totalInventoryValue: Number,
  categories: [{ name: String, value: Number }],
  totalItems: Number,
  lowStockItems: Number,
  topMovingItems: [{ name: String, value: Number, units: Number }]
}, { timestamps: true });


const leadSchema = new Schema({
  totalLeads: Number,
  convertedLeads: Number,
  conversionRate: Number,
  topPerformerRate: Number,
  leadSources: {
    website: Number,
    referral: Number,
    coldCall: Number,
    social: Number
  },
  salesPipeline: {
    prospect: Number,
    qualified: Number,
    proposal: Number,
    negotiation: Number,
    closed: Number
  },
  salesTeamPerformance: [{ name: String, conversions: Number, rate: Number }]
}, { timestamps: true });

const engineerPerformanceSchema = new Schema({
  totalEngineers: Number,
  avgTicketsPerEngineer: Number,
  avgResolutionTime: Number,
  avgRating: Number,
  engineerPerformance: [{
    name: String,
    code: String,
    role: String,
    ticketsCompleted: Number,
    avgTat: Number,
    slaCompliance: Number,
    customerRating: Number,
    performance: String
  }],
  teamPerformanceTrend: [{ month: String, productivity: Number, quality: Number }]
}, { timestamps: true });

const reportSchema = new Schema({
  revenue: { type: Schema.Types.ObjectId, ref: "Revenue", required: true },
  amc: { type: Schema.Types.ObjectId, ref: "AMCModel", required: true },
  ticketAnalytics: { type: Schema.Types.ObjectId, ref: "TicketAnalytics", required: true },
  inventory: { type: Schema.Types.ObjectId, ref: "Inventory", required: true },
  leadConversion: { type: Schema.Types.ObjectId, ref: "LeadConversion", required: true },
  engineerPerformance: { type: Schema.Types.ObjectId, ref: "EngineerPerformance", required: true }
}, { timestamps: true });

const revenue = mongoose.model("Revenue", revenueSchema);
const amc = mongoose.model("AMCModel", amcSchema);
const ticketAnalytics = mongoose.model("TicketAnalytics", ticketAnalyticsSchema);
const inventory = mongoose.model("Inventory", inventorySchema);
const leadConversion = mongoose.model("LeadConversion", leadSchema);
const engineerPerformance = mongoose.model("EngineerPerformance", engineerPerformanceSchema);
const report = mongoose.model("Report", reportSchema);

module.exports = {
  revenue, amc, ticketAnalytics, inventory, leadConversion, engineerPerformance, report
};


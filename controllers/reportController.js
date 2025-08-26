const {revenue,amc,ticketAnalytics,inventory,leadConversion,engineerPerformance,report}=require("../models/reportModel")

exports.createRevenue = async (req, res) => {
  try {
    if (typeof req.body.revenueByClientType === "string") {
      req.body.revenueByClientType = JSON.parse(req.body.revenueByClientType);
    }
    if (typeof req.body.topRevenueClients === "string") {
      req.body.topRevenueClients = JSON.parse(req.body.topRevenueClients);
    }
    const newRevenue = await revenue.create(req.body);
    res.status(201).json(newRevenue);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllRevenue = async (req, res) => {
  try {
    const allRevenue = await revenue.find();
    res.status(200).json(allRevenue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getRevenueById = async (req, res) => {
  try {
    const rev = await revenue.findById(req.params.id);
    if (!rev) return res.status(404).json({ message: "Revenue record not found" });
    res.status(200).json(rev);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateRevenue = async (req, res) => {
  try {
    const updated = await revenue.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Revenue record not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteRevenue = async (req, res) => {
  try {
    const deleted = await revenue.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Revenue record not found" });
    res.status(200).json({ message: "Revenue record deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createAMC = async (req, res) => {
  try {
    const newAMC = await amc.create(req.body);
    res.status(201).json(newAMC);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllAMC = async (req, res) => {
  try {
    const allAMC = await amc.find();
    res.status(200).json(allAMC);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAMCById = async (req, res) => {
  try {
    const amcRecord = await amc.findById(req.params.id);
    if (!amcRecord) return res.status(404).json({ message: "AMC record not found" });
    res.status(200).json(amcRecord);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateAMC = async (req, res) => {
  try {
    const updated = await amc.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "AMC record not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteAMC = async (req, res) => {
  try {
    const deleted = await amc.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "AMC record not found" });
    res.status(200).json({ message: "AMC record deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createTicketAnalytics = async (req, res) => {
  try {
    const newTicket = await ticketAnalytics.create(req.body);
    res.status(201).json(newTicket);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllTicketAnalytics = async (req, res) => {
  try {
    const allTickets = await ticketAnalytics.find();
    res.status(200).json(allTickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTicketAnalyticsById = async (req, res) => {
  try {
    const ticket = await ticketAnalytics.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: "Ticket record not found" });
    res.status(200).json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTicketAnalytics = async (req, res) => {
  try {
    const updated = await ticketAnalytics.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Ticket record not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteTicketAnalytics = async (req, res) => {
  try {
    const deleted = await ticketAnalytics.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Ticket record not found" });
    res.status(200).json({ message: "Ticket record deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.createInventory = async (req, res) => {
  try {
    const newInv = await inventory.create(req.body);
    res.status(201).json(newInv);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllInventory = async (req, res) => {
  try {
    const allInv = await inventory.find();
    res.status(200).json(allInv);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getInventoryById = async (req, res) => {
  try {
    const inv = await inventory.findById(req.params.id);
    if (!inv) return res.status(404).json({ message: "Inventory record not found" });
    res.status(200).json(inv);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateInventory = async (req, res) => {
  try {
    const updated = await inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Inventory record not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteInventory = async (req, res) => {
  try {
    const deleted = await inventory.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Inventory record not found" });
    res.status(200).json({ message: "Inventory record deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createLeadConversion = async (req, res) => {
  try {
    const newLead = await leadConversion.create(req.body);
    res.status(201).json(newLead);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllLeadConversion = async (req, res) => {
  try {
    const allLeads = await leadConversion.find();
    res.status(200).json(allLeads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getLeadConversionById = async (req, res) => {
  try {
    const lead = await leadConversion.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead record not found" });
    res.status(200).json(lead);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateLeadConversion = async (req, res) => {
  try {
    const updated = await leadConversion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Lead record not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteLeadConversion = async (req, res) => {
  try {
    const deleted = await leadConversion.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Lead record not found" });
    res.status(200).json({ message: "Lead record deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createEngineerPerformance = async (req, res) => {
  try {
    const newEng = await engineerPerformance.create(req.body);
    res.status(201).json(newEng);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllEngineerPerformance = async (req, res) => {
  try {
    const allEng = await engineerPerformance.find();
    res.status(200).json(allEng);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getEngineerPerformanceById = async (req, res) => {
  try {
    const eng = await engineerPerformance.findById(req.params.id);
    if (!eng) return res.status(404).json({ message: "Engineer record not found" });
    res.status(200).json(eng);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateEngineerPerformance = async (req, res) => {
  try {
    const updated = await engineerPerformance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Engineer record not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteEngineerPerformance = async (req, res) => {
  try {
    const deleted = await engineerPerformance.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Engineer record not found" });
    res.status(200).json({ message: "Engineer record deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createReport = async (req, res) => {
  try {
    const newReport = await report.create(req.body);
    res.status(201).json(newReport);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllReports = async (req, res) => {
  try {
    const reports = await report.find().populate("revenue amc ticketAnalytics inventory leadConversion engineerPerformance");
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const amcModel = require("../models/amcModel");
const { productModel } = require("../models/inventoryModel");
const {revenue,ticketAnalytics,leadConversion,engineerPerformance,report}=require("../models/reportModel")


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

exports.getAllAMC = async (req, res) => {
  try {
    const allAMC = await amcModel.find();
    res.status(200).json(allAMC);
  } catch (err) {
    res.status(500).json({ message: err.message });
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

exports.getAllInventory = async (req, res) => {
  try {
    const allInv = await productModel.find();
    res.status(200).json(allInv);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
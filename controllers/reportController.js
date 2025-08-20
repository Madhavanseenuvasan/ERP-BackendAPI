
const { serviceModel, salesModel, inventoryModel, financeModel, EngineerPerformance, Dashboard } = require('../models/reportModel');

exports.createSales = async (req, res) => {
  const sales = await salesModel.create(req.body);
  res.status(201).json(sales);
}

exports.getSalesReport = async (req, res) => {
  const reports = await salesModel.find();
  res.status(200).json(reports);
}

exports.createInventory = async (req, res) => {
  const inventory = await inventoryModel.create(req.body);
  res.status(201).json(inventory);
}
exports.getInventoryReport = async (req, res) => {
  const reports = await inventoryModel.find();
  res.status(200).json(reports);
}

exports.createFinance = async (req, res) => {
  const finance = await financeModel.create(req.body);
  res.status(201).json(finance);
}
exports.getFinanceReport = async (req, res) => {
  const reports = await financeModel.find();
  res.status(200).json(reports);
}

exports.createCustom = async (req, res) => {
  const service = await serviceModel.create(req.body);
  res.status(201).json(service);
}

exports.getCustomReport = async (req, res) => {
  const filters = req.query.filters ? JSON.parse(req.query.filters) : {};
  const reports = await serviceModel.find(filters);
  res.status(200).json(reports);
}

exports.createEngineerPerformance = async (req, res) => {
  const report = await EngineerPerformance.create(req.body);
  res.status(201).json(report);
}
exports.getAllEngineerPerformance = async (req, res) => {
  const reports = await EngineerPerformance.find();
  res.status(200).json(reports);
}

exports.createDashboard = async (req, res) => {
  const dashboard = await Dashboard.create(req.body);
  res.status(201).json(dashboard);
}

exports.getAllDashboards = async (req, res) => {
  const dashboards = await Dashboard.find();
  res.status(200).json(dashboards);
}



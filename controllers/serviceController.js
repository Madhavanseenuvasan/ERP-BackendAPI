const { Customer, Technician, ServiceReport, ServiceTicket } = require("../models/serviceManagementModel");

exports.createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json(customer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const updated = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Customer not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const deleted = await Customer.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Customer not found" });
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createTechnician = async (req, res) => {
  try {
    const technician = await Technician.create(req.body);
    res.status(201).json(technician);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllTechnicians = async (req, res) => {
  try {
    const technicians = await Technician.find();
    res.status(200).json(technicians);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTechnicianById = async (req, res) => {
  try {
    const technician = await Technician.findById(req.params.id);
    if (!technician) return res.status(404).json({ message: "Technician not found" });
    res.status(200).json(technician);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTechnician = async (req, res) => {
  try {
    const updated = await Technician.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Technician not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteTechnician = async (req, res) => {
  try {
    const deleted = await Technician.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Technician not found" });
    res.status(200).json({ message: "Technician deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createServiceReport = async (req, res) => {
  try {
    const report = await ServiceReport.create(req.body);
    res.status(201).json(report);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllServiceReports = async (req, res) => {
  try {
    const reports = await ServiceReport.find().populate("ticketId");
    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getServiceReportById = async (req, res) => {
  try {
    const report = await ServiceReport.findById(req.params.id).populate("ticketId");
    if (!report) return res.status(404).json({ message: "Service Report not found" });
    res.status(200).json(report);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateServiceReport = async (req, res) => {
  try {
    const updated = await ServiceReport.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Service Report not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteServiceReport = async (req, res) => {
  try {
    const deleted = await ServiceReport.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Service Report not found" });
    res.status(200).json({ message: "Service Report deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createServiceTicket = async (req, res) => {
  try {
    const ticket = await ServiceTicket.create(req.body);
    res.status(201).json(ticket);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllServiceTickets = async (req, res) => {
  try {
    const tickets = await ServiceTicket.find()
      .populate("customer assignedTo report");
    res.status(200).json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getServiceTicketById = async (req, res) => {
  try {
    const ticket = await ServiceTicket.findById(req.params.id)
      .populate("customer assignedTo report");
    if (!ticket) return res.status(404).json({ message: "Service Ticket not found" });
    res.status(200).json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateServiceTicket = async (req, res) => {
  try {
    const updated = await ServiceTicket.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Service Ticket not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteServiceTicket = async (req, res) => {
  try {
    const deleted = await ServiceTicket.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Service Ticket not found" });
    res.status(200).json({ message: "Service Ticket deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

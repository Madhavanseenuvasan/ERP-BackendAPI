const Ticket = require('../models/serviceManagementModel');

exports.createTicket = async (req, res) => {
  try {
    const ticket = new Ticket(req.body);
    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTicketById = async (req, res) => {
  try {
    const id = req.params.id.trim();
    const ticket = await Ticket.findById(id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTicket = async (req, res) => {
  try {
    const id = req.params.id.trim();
    const ticket = await Ticket.findByIdAndUpdate(id, req.body, { new: true });
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteTicket = async (req, res) => {
  try {
    const id = req.params.id.trim();
    const ticket = await Ticket.findByIdAndDelete(id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.json({ message: 'Ticket deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateFeedback = async (req, res) => {
  try {
    const id = req.params.id.trim();
    const { customerFeedback, serviceQuality, customerSatisfaction } = req.body;

    const ticket = await Ticket.findById(id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    ticket.customerFeedback = customerFeedback || ticket.customerFeedback;
    ticket.serviceQuality = serviceQuality || ticket.serviceQuality;
    ticket.customerSatisfaction = customerSatisfaction || ticket.customerSatisfaction;

    await ticket.save();
    res.json({ message: 'Feedback updated successfully', ticket });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const id = req.params.id.trim();
    const { status } = req.body;

    const ticket = await Ticket.findByIdAndUpdate(id, { status }, { new: true });
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    res.json({ message: 'Status updated successfully', ticket });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTicketsByEngineer = async (req, res) => {
  try {
    const userId = req.params.userId.trim();
    const tickets = await Ticket.find({ assignedTo: userId });

    if (!tickets.length) {
      return res.status(404).json({ message: 'No tickets assigned to this engineer' });
    }

    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

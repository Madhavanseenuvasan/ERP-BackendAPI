const mongoose = require('mongoose')
const serviceModel = require('../models/serviceManagementModel')
const isvalidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const createService = async (req, res) => {
  console.log('Submit service: ', req.body);
  const { title, description, status, userId, assignedEngineer, clientFeedback, createdAt, slaHours, slaBreached, assignedAt, resolvedAt } = req.body;
  if (!isvalidObjectId(userId) || !isvalidObjectId(assignedEngineer)) {
    return res.status(400).json({ error: 'Invalid userId or assignedEngineer ObjectId' });
  }

  const service = await serviceModel.create({
    title,
    description,
    status,
    userId: new mongoose.Types.ObjectId(userId),
    assignedEngineer: new mongoose.Types.ObjectId(assignedEngineer),
    clientFeedback,
    createdAt,
    slaHours,
    slaBreached,
    assignedAt,
    resolvedAt
  })
  res.status(201).json({ service });
}
const getServiceById = async (req, res) => {
  const service = await serviceModel.findById(req.params.id);

  res.status(200).json({ service });
}
const updateServiceStatus = async (req, res) => {
  const service = await serviceModel.findByIdAndUpdate(req.params.id);
  if (!service) return res.json({ message: 'Not found' });
  service.status = req.body.status;

  if (req.body.status === 'Resolved') {
    service.resolvedAt = new Date();
    const createdAt = service.createdAt || new Date();
    const slaTimes = service.slaHours * 60 * 60 * 1000;
    const actualDuration = service.resolvedAt - createdAt;
    service.slaBreached = actualDuration > slaTimes;
  }
  await service.save();
  res.status(200).json({ message: '[Status updated', service })
};

const getAssignedServiceByUser = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.params.userId);
  const service = await serviceModel.find({ userId: userId })
  res.status(200).json({ service });
};

const updateserviceFeedback = async (req, res) => {
  const { id } = req.params;
  const { clientFeedback } = req.body;
  const service = await serviceModel.findByIdAndUpdate(id, { clientFeedback }, { new: true })
  if (!service) {
    return res.status(404).json({ message: 'Service not found' });
  }
  res.status(200).json({ message: 'Feedback updated', service: service });
};

module.exports = { createService, getServiceById, updateServiceStatus, getAssignedServiceByUser, updateserviceFeedback }
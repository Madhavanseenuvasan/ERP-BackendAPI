const contractSchema = require("../models/amcModel");

exports.createcontractSchema = async (req, res) => {
  try {
    const contract = new contractSchema(req.body);
    await contract.save();
    res.status(201).json(contract);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllcontractSchemas = async (req, res) => {
  try {
    const contracts = await contractSchema.find();
    res.json(contracts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getcontractSchemaById = async (req, res) => {
  try {
    const contract = await contractSchema.findById(req.params.id);
    if (!contract) {
      return res.status(404).json({ error: 'AMC Contract not found' });
    }
    res.json(contract);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatecontractSchema = async (req, res) => {
  try {
    const contract = await contractSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!contract) {
      return res.status(404).json({ error: 'AMC Contract not found' });
    }
    res.json(contract);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletecontractSchema = async (req, res) => {
  try {
    const contract = await contractSchema.findByIdAndDelete(req.params.id);
    if (!contract) {
      return res.status(404).json({ error: 'AMC Contract not found' });
    }
    res.json({ message: 'AMC Contract deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
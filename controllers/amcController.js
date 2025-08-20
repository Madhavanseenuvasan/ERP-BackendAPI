const { client, equipment, amcModel } = require("../models/amcModel");
const { Parser } = require("json2csv");
const ExcelJS = require("exceljs");

const newContract = async (req, res) => {
  try {
    const contract = new amcModel(req.body);
    await contract.save();
    res.status(201).json({ contract });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getContractById = async (req, res) => {
  try {
    const contract = await amcModel
      .findById(req.params.id)
      .populate("Client Equipment");
    if (!contract) {
      return res.status(404).json({ error: "contract not found" });
    }
    res.status(200).json(contract);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateContractById = async (req, res) => {
  try {
    const contract = await amcModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!contract) {
      return res.status(404).json({ error: error.message });
    }
    res.status(200).json(contract);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const ContractRemainder = async (req, res) => {  //asynchrnous function

  //This function helps you automatically find those contracts that need service within the next 7 days — so you can prepare, schedule, or send reminders.
  try {
    const today = new Date();
    const upcomingContracts = await amcModel
      .find({
        nextServiceDate: {
          $gte: today,
          $lte: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000),
        },
      })
      .populate("Client Equipment");
    res.status(200).json({
      count: upcomingContracts.length,
      upcomingContracts,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const contractHistory = async (req, res) => {
  try {
    const { clientid } = req.params;
    const filter = {
      status: { $in: ["Expired", "Terminated"] },
    };
    if (clientid) filter.client = clientid;

    const contract = await amcModel.find(filter).populate("Client Equipment");

    res.status(200).json({
      count: contract.length,
      contract,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const newClient = async (req, res) => {
  try {
    const Client = await client.create(req.body);
    res.status(201).json(Client);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const newEquipment = async (req, res) => {
  try {
    const Equipment = await equipment.create(req.body);
    res.status(201).json(Equipment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllClients = async (req, res) => {
  const clientS = await client.find();

  res.status(200).json({ clientS });
};

const clientById = async (req, res) => {
  const clientS = await client.findById(req.params.id);
  if (!clientS) {
   return res.status(404).json({ message: "client not found" });
  }
  res.status(200).json({ clientS });
};

const updateClientById = async (req, res) => {
  const clientS = await client.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ clientS });
};

const deleteClientById = async (req, res) => {
  const clientS = await client.findByIdAndDelete(req.params.id);
  res.status(200).json({ clientS });
};

const getAllEquipments = async (req, res) => {
  const equipmentS = await equipment.find();
  res.status(200).json({ equipmentS });
};

const equipmentById = async (req, res) => {
  const equipmentS = await equipment.findById(req.params.id);
  if (!equipmentS) {
    res.status(404).json({ message: "Equipments are not found" });
  }
  res.status(200).json({ equipmentS });
};

const updateEquipmentById = async (req, res) => {
  const equipmentS = await equipment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json({ equipmentS });
};

const deleteEquipmentById = async (req, res) => {
  const equipmentS = await equipment.findByIdAndDelete(req.params.id);
  res.status(200).json({ equipmentS });
};

const getDashboardSummary = async (req, res) => {
  try {
    const { clientId, from, to, status, term, exportType } = req.query;
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const filter = {};
    if (clientId) filter.client = clientId;
    if (status) filter.status = status;
    if (term) filter.term = term;
    if (from && to) {
      filter.startDate = { $gte: new Date(from), $lte: new Date(to) };
    }
    const contracts = await amcModel.find(filter).populate("Client");

    const totalContracts = contracts.length;
    const activeContracts = contracts.filter(
      (c) => c.status === "Active"
    ).length;
    const expiredContracts = contracts.filter(
      (c) => c.status === "Expired"
    ).length;
    const terminatecontracts = contracts.filter(
      (c) => c.status === "Terminated"
    ).length;

    const contractsStartingThisMonth = contracts.filter(c=> {
      const startDate = new Date(c.startDate);
      return startDate >= startOfMonth && startDate <= endOfMonth;
    }).length;

    const contractsExpiringThisMonth = contracts.filter(c => {
      const endDate = new Date(c.endDate);
      return endDate >= startOfMonth && endDate <= endOfMonth;
    }).length;

    const summary = {
      totalContracts,
      activeContracts,
      expiredContracts,
      terminatecontracts,
      contractsStartingThisMonth,
      contractsExpiringThisMonth,
    };

    if (exportType === "csv" || exportType === "'excel") {
      console.log(`Export requested as ${exportType}.`);
    }
    res.status(200).json({summary , contracts})
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  newContract,
  getContractById,
  updateContractById,
  ContractRemainder,
  contractHistory,
  newClient,
  newEquipment,
  getAllClients,
  clientById,
  updateClientById,
  deleteClientById,
  getAllEquipments,
  equipmentById,
  updateEquipmentById,
  deleteEquipmentById,
  getDashboardSummary
};

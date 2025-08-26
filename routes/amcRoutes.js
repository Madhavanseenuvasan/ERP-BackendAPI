const express = require('express')
const router = express.Router();

const {
  newContract,
  getContractById,
  updateContractById,
  ContractRemainder,
  contractHistory,
  newEquipment,
  newClient,
  getAllClients,
  clientById,
  getAllEquipments,
  equipmentById,
  updateClientById,
  deleteClientById,
  updateEquipmentById,
  deleteEquipmentById,
  getDashboardSummary,
  getContracts,
} = require('../controllers/amcController');
const { getDashboardReport } = require("../controllers/amcReportController");



router.route("/contracts").get(getContracts).post(newContract);

router.route("/contracts/:id").put(updateContractById);

router.route("/contracts/:id").get(getContractById);
router.route("/remainders").get(ContractRemainder);
router.route("/history/:clientid").get(contractHistory);

router.route("/clients").post(newClient);
router.route("/equipments").post(newEquipment);

router.route('/allclients').get(getAllClients);
router.route('/client/:id').get(clientById);

router.route('/updateclient/:id').put(updateClientById);

router.route('/deleteclient/:id').delete(deleteClientById);

router.route('/allequipments').get(getAllEquipments);
router.route('/equipment/:id').get(equipmentById);

router.route('/updateequipment/:id').put(updateEquipmentById);

router.route('/deleteequipment/:id').delete(deleteEquipmentById);

router.route('/getdashboardsummary').get(getDashboardSummary)

router.route('/dashboardreport').get(getDashboardReport)

module.exports = router;


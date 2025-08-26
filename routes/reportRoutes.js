const express = require("express");
const router = express.Router();
const { createRevenue, getAllRevenue, getRevenueById, updateRevenue, deleteRevenue, createAMC, getAllAMC, getAMCById, updateAMC, deleteAMC, createTicketAnalytics, getAllTicketAnalytics, getTicketAnalyticsById, updateTicketAnalytics, deleteTicketAnalytics, createLeadConversion, createInventory, getAllInventory, getInventoryById, updateInventory, deleteInventory, getAllLeadConversion, getLeadConversionById, updateLeadConversion, deleteLeadConversion, createEngineerPerformance, getAllEngineerPerformance, getEngineerPerformanceById, updateEngineerPerformance, deleteEngineerPerformance, createReport, getAllReports } = require("../controllers/reportController")

//revenue routes

router.route('/revenue').post(createRevenue);
router.route('/revenue').get(getAllRevenue);
router.route('/revenue/:id').get(getRevenueById);
router.route('/revenue/:id').put(updateRevenue);
router.route('/revenue/:id').delete(deleteRevenue);

//amc routes

router.route('/amc').post(createAMC);
router.route('/amc').get(getAllAMC);
router.route('/amc/:id').get(getAMCById);
router.route('/amc/:id').put(updateAMC);
router.route('/amc/:id').delete(deleteAMC);

//ticket analytics routes

router.route('/ticket').post(createTicketAnalytics);
router.route('/ticket').get(getAllTicketAnalytics);
router.route('/ticket/:id').get(getTicketAnalyticsById);
router.route('/ticket/:id').put(updateTicketAnalytics);
router.route('/ticket/:id').delete(deleteTicketAnalytics);

//inventory routes

router.route('/inventory').post(createInventory);
router.route('/inventory').get(getAllInventory);
router.route('/inventory/:id').get(getInventoryById);
router.route('/inventory/:id').put(updateInventory);
router.route('/inventory/:id').delete(deleteInventory);

//lead routes

router.route('/lead').post(createLeadConversion);
router.route('/lead').get(getAllLeadConversion);
router.route('/lead/:id').get(getLeadConversionById);
router.route('/lead/:id').put(updateLeadConversion);
router.route('/lead/:id').delete(deleteLeadConversion);

//engineer routes

router.route('/engineer').post(createEngineerPerformance);
router.route('/engineer').get(getAllEngineerPerformance);
router.route('/engineer/:id').get(getEngineerPerformanceById);
router.route('/engineer/:id').put(updateEngineerPerformance);
router.route('/engineer/:id').delete(deleteEngineerPerformance);

//report routes

router.route('/report').get(getAllReports);
router.route('/report').post(createReport);

module.exports = router;
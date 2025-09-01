const express = require("express");
const router = express.Router();
const { createRevenue, getAllRevenue, getRevenueById, updateRevenue, deleteRevenue, createAMC, getAllAMC, getAMCById, updateAMC, deleteAMC, createTicketAnalytics, getAllTicketAnalytics, getTicketAnalyticsById, updateTicketAnalytics, deleteTicketAnalytics, createLeadConversion, createInventory, getAllInventory, getInventoryById, updateInventory, deleteInventory, getAllLeadConversion, getLeadConversionById, updateLeadConversion, deleteLeadConversion, createEngineerPerformance, getAllEngineerPerformance, getEngineerPerformanceById, updateEngineerPerformance, deleteEngineerPerformance, createReport, getAllReports } = require("../controllers/reportController")

router.route('/amc').get(getAllAMC);

router.route('/inventory').get(getAllInventory);

module.exports = router;
const express = require('express');
const router = express.Router();
const { createSales, getSalesReport, createInventory,getInventoryReport,createFinance, getFinanceReport,createCustom, getCustomReport, createEngineerPerformance,getAllEngineerPerformance,createDashboard, getAllDashboards } = require('../controllers/reportController')

router.route('/sales').get(getSalesReport).post(createSales);
router.route('/inventory').get(getInventoryReport).post(createInventory);
router.route('/finance').get(getFinanceReport).post(createFinance);
router.route('/custom').get(getCustomReport).post(createCustom);
router.route('/engineers').get(getAllEngineerPerformance).post(createEngineerPerformance);
router.route('/dashboards').get(getAllDashboards).post(createDashboard)


module.exports = router;
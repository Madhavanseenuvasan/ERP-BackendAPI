const express = require('express');
const router = express.Router();

const controllers = require('../controllers/billingController');

router.post('/customers', controllers.createCustomer);
router.get('/customers', controllers.getCustomers);

router.post('/engineers', controllers.createEngineer);
router.get('/engineers', controllers.getEngineers);

router.post('/quotations', controllers.createQuotation);
router.get('/quotations', controllers.getQuotations);

router.post('/invoices', controllers.createInvoice);
router.get('/invoices', controllers.getInvoices);
router.get('/invoices/:id', controllers.getSingleInvoice);
router.put('/invoices/:id', controllers.updateInvoice);
router.delete('/invoices/:id', controllers.deleteInvoice);

router.post('/invoices/:id/payments', controllers.makePayment);

router.get('/ledger', controllers.getLedger);
router.get('/tax-summary', controllers.getTaxSummary);

module.exports = router;
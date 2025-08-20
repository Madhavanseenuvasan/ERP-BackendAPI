const express = require('express');
const router = express.Router();
const {
  getTaxSummary,
  createInvoice,
  getLedger,
  makePayment,
  getInvoices,
  getSingleInvoice,
  updateInvoice,
  deleteInvoice
} = require('../controllers/billingController');

router.route('/invoices').get(getInvoices).post(createInvoice);
router.route('/invoices/:id').get(getSingleInvoice).put(updateInvoice).delete(deleteInvoice);

router.route('/invoices/:id/payments').post(makePayment);

router.route('/tax-summary').get(getTaxSummary);

router.route('/ledger').get(getLedger);

module.exports = router;

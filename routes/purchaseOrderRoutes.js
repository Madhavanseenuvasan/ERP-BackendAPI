const express = require('express');
const router = express.Router();
const { 
  createPurchaseOrder, 
  createExpense, 
  makePayment, 
  getPurchaseOrder, 
  updatePO, 
  deletePO, 
  getSinglePO 
} = require('../controllers/purchaseOrderController');

router.route('/purchase-orders').get(getPurchaseOrder).post(createPurchaseOrder);
router.route('/purchase-orders/:id').get(getSinglePO).put(updatePO).delete(deletePO);

router.route('/purchase-orders/:id/payments').post(makePayment);

router.route('/expenses').post(createExpense);

module.exports = router;
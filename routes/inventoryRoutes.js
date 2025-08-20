const express = require('express');
const {
  getAllItems,
  createItem,
  getSingleItem,
  updateItem,
  deleteItem,
  getStockByItemId,
  adjustStock,
  getLocations,
  createLocation
} = require('../controllers/inventoryController');

const router = express.Router();

router.route('/items').get(getAllItems).post(createItem);      

router.route('/items/:id').get(getSingleItem).put(updateItem).delete(deleteItem);     

router.route('/stock/:itemId').get(getStockByItemId);  

router.route('/stock/adjust').post(adjustStock);

router.route('/location').get(getLocations).post(createLocation);

module.exports = router;
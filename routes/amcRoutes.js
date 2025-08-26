const express = require('express');
const { createcontractSchema, getAllcontractSchemas, updatecontractSchema, deletecontractSchema, getcontractSchemaById } = require('../controllers/amcController');
const router = express.Router();


router.route('/contracts').post(createcontractSchema);
router.route('/contracts').get(getAllcontractSchemas);
router.route('/contracts/:id').get(getcontractSchemaById);
router.route('/contracts/:id').put(updatecontractSchema);
router.route('/contracts/:id').delete(deletecontractSchema);



module.exports=router;
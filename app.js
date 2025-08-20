const express = require('express');
const cors=require('cors')
require('dotenv').config();
const dbConnection = require('./config/db');
const billingRoutes=require('./routes/billingRoutes');
const purchaseOrderRoutes=require('./routes/purchaseOrderRoutes');
const inventoryRoutes=require('./routes/inventoryRoutes');

dbConnection();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/users/", require("./routes/userRoutes"));
app.use('/api/amc',require('./routes/amcRoutes'))

app.use('/api/reports', require('./routes/reportRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

app.use('/api/billing/',billingRoutes);
app.use('/api/purchase/',purchaseOrderRoutes);
app.use('/api/inventory/', inventoryRoutes);

module.exports = app;
const express = require("express");
const router = express.Router();
const { createCustomer, getAllCustomers, getCustomerById, updateCustomer, deleteCustomer, createTechnician, getAllTechnicians, getTechnicianById, updateTechnician, deleteTechnician, createServiceReport, getAllServiceReports, getServiceReportById, updateServiceReport, deleteServiceReport, createServiceTicket, getAllServiceTickets, getServiceTicketById, updateServiceTicket, deleteServiceTicket } = require("../controllers/serviceController");

// Customer routes
router.route("/customers").post(createCustomer);
router.route("/customers").get(getAllCustomers);
router.route("/customers/:id").get(getCustomerById);
router.route("/customers/:id").put(updateCustomer);
router.route("/customers/:id").delete(deleteCustomer);

// Technician routes
router.route("/technicians").post(createTechnician);
router.route("/technicians").get(getAllTechnicians);
router.route("/technicians/:id").get(getTechnicianById);
router.route("/technicians/:id").put(updateTechnician);
router.route("/technicians/:id").delete(deleteTechnician);

// Service Report routes
router.route("/reports") .post(createServiceReport);
router.route("/reports").get(getAllServiceReports);
router.route("/reports/:id").get(getServiceReportById);
router.route("/reports/:id").put(updateServiceReport);
router.route("/reports/:id").delete(deleteServiceReport);

// Service Ticket routes
router.route("/tickets").post(createServiceTicket);
router.route("/tickets").get(getAllServiceTickets);
router.route("/tickets/:id").get(getServiceTicketById);
router.route("/tickets/:id").put(updateServiceTicket);
router.route("/tickets/:id").delete(deleteServiceTicket);

module.exports = router;

const express = require('express');

const { createTicket, getAllTickets, getTicketById, updateTicket, deleteTicket, updateFeedback, updateStatus, getTicketsByEngineer } = require('../controllers/serviceController');

const router = express.Router();

router.route('/').post(createTicket).get(getAllTickets).get(getTicketsByEngineer);
router.route('/:id').get(getTicketById).put(updateTicket).put(updateFeedback).put(updateStatus).delete(deleteTicket);

module.exports = router;

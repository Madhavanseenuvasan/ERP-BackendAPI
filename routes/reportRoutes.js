const express = require("express");
const router = express.Router();
const { getReports, createReport, getReportById, updateReport, deleteReport, getDashboardSummary } = require("../controllers/reportController");

router.route("/").post(createReport).get(getReports);
router.route("/:id").get(getReportById).put(updateReport).delete(deleteReport);
router.route("/dashboard/summary").get(getDashboardSummary);

module.exports = router;

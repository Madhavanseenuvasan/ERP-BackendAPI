const Report = require("../models/reportModel");

exports.createReport = async (req, res) => {
  try {
    const report = new Report(req.body);
    await report.save();
    res.status(201).json({ success: true, data: report });
  } catch (error) {
    console.error("Report create error:", error);
    res.status(400).json({ success: false, message: error.message, error });
  }
};

exports.getReports = async (req, res) => {
  try {
    let { reportType } = req.query;
    if (reportType) {
      reportType = reportType.trim();
    }

    const filter = reportType
      ? { reportType: { $regex: new RegExp(`^${reportType}$`, 'i') } }
      : {};

    console.log("MongoDB filter:", filter);

    const reports = await Report.find(filter).sort({ createdAt: -1 });
    console.log("Reports found:", reports.length);

    res.status(200).json({ success: true, data: reports });
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};



exports.getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ success: false, message: "Report not found" });
    }
    res.status(200).json({ success: true, data: report });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!report) {
      return res.status(404).json({ success: false, message: "Report not found" });
    }
    res.status(200).json({ success: true, data: report });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);
    if (!report) {
      return res.status(404).json({ success: false, message: "Report not found" });
    }
    res.status(200).json({ success: true, message: "Report deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getDashboardSummary = async (req, res) => {
  try {
    const summary = await Report.aggregate([
      { $group: { _id: "$reportType", count: { $sum: 1 } } }
    ]);
    res.status(200).json({ success: true, data: summary });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

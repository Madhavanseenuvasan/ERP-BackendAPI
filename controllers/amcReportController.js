const {amcModel} = require("../models/amcModel");
const {parser} = require("json2csv");

const getDashboardReport = async (req, res) => {
  try {
    const {
      reportType = "summary",
      from,
      to,
      clientId,
      status,
      export: exportType,
      page = 1,
      limit = 50,
      refresh,
    } = req.query;

    let filter = {};

    if (refresh !== "true") {
      if (clientId) {
        filter.client = clientId;
      }

      if (status) {
        filter.status = status;
      }

      if (from && to) {
        const start = new Date(from);
        const end = new Date(to);
        if (!isNaN(start) && !isNaN(end)) {
          filter.startDate = { $gte: start, $lte: end };
        }
      }
    }
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const contracts = await amcModel
      .find(filter)
      .populate("client equipment")
      .skip(skip)
      .limit(parseInt(limit));

    let reportData = [];

    switch (reportType.toLowerCase()) {
      case "summary":
        const totalContracts = contracts.length;
        const activeContracts = contracts.filter(
          (c) => c.status === "Active"
        ).length;
        const totalValue = contracts.reduce(
          (sum, c) => sum + (c.amount || 0),
          0
        );
        const averageValue =
          totalContracts > 0 ? totalValue / totalContracts : 0;

        reportData = [
          {
            totalContracts,
            activeContracts,
            totalValue,
            averageContractValue: averageValue.toFixed(2),
          },
        ];
        break;

      case "revenue":
        reportData = contracts.map((c) => ({
          contractNumber: c.contractNumber || "-",
          clientName: c.client?.name || "-",
          amount: c.amount || 0,
          currency: c.currency || "-",
          startDate: c.startDate?.toISOString().split("T")[0],
          endDate: c.endDate?.toISOString().split("T")[0],
        }));
        break;

      case "visits":
        reportData = contracts.map((c) => ({
          clientName: c.client?.name || "-",
          visitsCompleted: c.visitsCompleted || 0,
          visitsScheduled: c.visitsScheduled || 0,
        }));
        break;

      case "satisfaction":
        reportData = contracts.map((c) => ({
          clientName: c.client?.name || "-",
          ratings: c.customerFeedback?.rating || "N/A",
          comments: c.customerFeedback?.comments || "N/A",
        }));
        break;
      case "expiring":
        const today = new Date();
        const nextMonth = new Date();
        nextMonth.setDate(today.getDate() + 30);

        const expiredContracts = contracts.filter((c) => {
          const end = new Date(c.endDate);
          return end >= today && end <= nextMonth;
        });

        reportData = expiredContracts.map((c) => ({
          contractNumber: c.contractNumber || "-",
          clientName: c.client?.name || "-",
          endDate: c.endDate?.toISOString().split("T")[0],
        }));
        break;
        default:
            return res.status(400).json({message:"Invalid report type provided"});
    }

    if(exportType === 'csv'){
        try {
            const parser = new parser();
            const csv = parser.parse(reportData);
            res.header("content-Type","text/csv");
            return res.attachment(`${reportType}_report.csv`).send(csv)
        } catch (csvErr) {
            return res.status(400).json({error:"csv export failed", details:csvErr.message})
        }
    }
    return res.status(200).json({
        success:true,
        reportType,
        count:reportData.length,
        data:reportData,
    }); 
  } catch (error) {
     console.error("Dashboard report error:", error.message);
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

module.exports = {getDashboardReport};

const { Invoice, Ledger, Payment, Customer, Engineer, Quotation } = require('../models/billingModel');

const ALLOWED_STATUS = ["Draft", "Sent", "Paid", "Overdue", "Cancelled", "Partial"];


exports.createCustomer = async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.createEngineer = async (req, res) => {
  try {
    const engineer = new Engineer(req.body);
    await engineer.save();
    res.status(201).json(engineer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.getEngineers = async (req, res) => {
  try {
    const engineers = await Engineer.find();
    res.json(engineers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.createQuotation = async (req, res) => {
  try {
    const quotation = new Quotation(req.body);
    await quotation.save();
    res.status(201).json(quotation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.getQuotations = async (req, res) => {
  try {
    const quotations = await Quotation.find().populate('customer').populate('engineer');
    res.json(quotations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.createInvoice = async (req, res) => {
  try {
    const {
      invoiceNo,
      customer,
      engineer,
      items,
      issueDate,
      dueDate,
      status = "Draft",
      notes,
      termsConditions
    } = req.body;

    if (!invoiceNo || !customer || !items?.length) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    if (!ALLOWED_STATUS.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    
    let subtotal = 0, totalTax = 0, grandTotal = 0;
    items.forEach(item => {
      const lineTotal = (item.unitPrice * item.quantity) - (item.discount || 0);
      subtotal += lineTotal;
      totalTax += (lineTotal * (item.gst || 0) / 100);
    });
    grandTotal = subtotal + totalTax;

    const invoice = await Invoice.create({
      invoiceNo,
      customer,
      engineer,
      items,
      issueDate,
      dueDate,
      subtotal,
      totalTax,
      grandTotal,
      status,
      notes,
      termsConditions
    });

    await Ledger.create({
      module: "billing",
      account: customer,
      type: "Debit",
      amount: grandTotal,
      description: `Invoice Created: ${invoiceNo}`,
      relatedInvoice: invoice._id
    });

    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getInvoices = async (req, res) => {
  try {
    const { search, status, startDate, endDate, page = 1, limit = 10 } = req.query;
    let filter = {};

    if (search) {
      filter.$or = [
        { invoiceNo: { $regex: search, $options: 'i' } }
      ];
    }
    if (status) filter.status = status;
    if (startDate && endDate) {
      filter.issueDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const invoices = await Invoice.find(filter)
      .populate('customer')
      .populate('engineer')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Invoice.countDocuments(filter);

    res.json({ total, page: Number(page), pages: Math.ceil(total / limit), invoices });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSingleInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate('customer').populate('engineer');
    if (!invoice) return res.status(404).json({ error: 'Not Found' });
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateInvoice = async (req, res) => {
  try {
    if (req.body.status && !ALLOWED_STATUS.includes(req.body.status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }
    const updated = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Invoice not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteInvoice = async (req, res) => {
  try {
    const deleted = await Invoice.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Invoice not found' });
    res.json({ message: 'Invoice deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.makePayment = async (req, res) => {
  try {
    const { amount, method, referenceNo } = req.body;
    const id = req.params.id;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid payment amount' });
    }

    const invoice = await Invoice.findById(id);
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    await Payment.create({
      invoice: invoice._id,
      amount,
      method,
      referenceNo,
      date: new Date()
    });

    const paidAmount = (await Payment.aggregate([
      { $match: { invoice: invoice._id } },
      { $group: { _id: null, totalPaid: { $sum: '$amount' } } }
    ]))[0]?.totalPaid || 0;

    if (paidAmount >= invoice.grandTotal) {
      invoice.status = 'Paid';
      invoice.balanceDue = 0;
    } else if (paidAmount > 0) {
      invoice.status = 'Partial';
      invoice.balanceDue = invoice.grandTotal - paidAmount;
    } else {
      invoice.status = 'Draft';
      invoice.balanceDue = invoice.grandTotal;
    }

    await invoice.save();

    await Ledger.create({
      module: 'billing',
      account: invoice.customer,
      type: 'Credit',
      amount,
      description: `Payment received for Invoice: ${invoice.invoiceNo}`,
      relatedInvoice: invoice._id,
      relatedPayment: invoice._id
    });

    res.status(200).json({ message: 'Payment recorded successfully', paidAmount, status: invoice.status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getTaxSummary = async (req, res) => {
  try {
    const invoices = await Invoice.find({});
    let gstTotal = 0;
    invoices.forEach(inv => {
      inv.items.forEach(item => {
        const lineTotal = (item.unitPrice * item.quantity) - (item.discount || 0);
        gstTotal += (lineTotal * (item.gst || 0) / 100);
      });
    });
    res.json({ GST: gstTotal });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getLedger = async (req, res) => {
  try {
    const { module, startDate, endDate, page = 1, limit = 10 } = req.query;
    let filter = {};
    if (module) filter.module = module;
    if (startDate || endDate) {
      filter.entryDate = {};
      if (startDate) filter.entryDate.$gte = new Date(startDate);
      if (endDate) filter.entryDate.$lte = new Date(endDate);
    }
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const ledgerEntries = await Ledger.find(filter)
      .sort({ entryDate: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    const total = await Ledger.countDocuments(filter);
    res.json({ total, page: Number(page), pages: Math.ceil(total / limit), ledgerEntries });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

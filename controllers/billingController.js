const { Invoice, Ledger, Payment } = require('../models/billingModel');

const ALLOWED_STATUS = ['paid', 'unpaid', 'partial'];

exports.createInvoice = async (req, res) => {
  try {
  const { type, invoiceNo, vendorOrCustomer, items, status = 'unpaid', date } = req.body;

    if (!type || !invoiceNo || !vendorOrCustomer || !items?.length || !date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    if (!['purchase', 'sales'].includes(type)) {
      return res.status(400).json({ error: 'Invalid invoice type' });
    }
    if (!ALLOWED_STATUS.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    let totalAmount = 0;
    let gstAmount = 0;

    items.forEach(item => {
      const qty = Number(item.quantity) || 0;
      const price = Number(item.price) || 0;
      const tax = Number(item.taxPercent) || 0;

      const lineTotal = qty * price;
      const lineTax = lineTotal * (tax / 100);

      totalAmount += lineTotal;
      gstAmount += lineTax;
    });

    const netAmount = totalAmount + gstAmount;

    const invoice = await Invoice.create({
      type,
      invoiceNo,
      vendorOrCustomer,
      items,
      totalAmount,
      gstAmount,
      netAmount,
      status,
      date
    });

    
    await Ledger.create({
      module: 'billing',
      account: vendorOrCustomer,
      debit: netAmount,
      credit: 0,
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
        { invoiceNo: { $regex: search, $options: 'i' } },
        { vendorOrCustomer: { $regex: search, $options: 'i' } },
        { "items.name": { $regex: search, $options: 'i' } }
      ];
    }
    if (status) filter.status = status;
    if (startDate && endDate) {
      filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const invoices = await Invoice.find(filter)
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
    const invoice = await Invoice.findById(req.params.id);
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
    const { amount, method, reference } = req.body;
  const id = req.params.id;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid payment amount' });
    }

    const invoice = await Invoice.findById(id);
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    await Payment.create({
      type: 'received',
      invoiceId: invoice._id,
      amount,
      method,
      reference,
      date: new Date()
    });

    const paidAmount = (await Payment.aggregate([
      { $match: { invoiceId: invoice._id } },
      { $group: { _id: null, totalPaid: { $sum: '$amount' } } }
    ]))[0]?.totalPaid || 0;

    if (paidAmount >= invoice.netAmount) {
      invoice.status = 'paid';
    } else if (paidAmount > 0) {
      invoice.status = 'partial';
    } else {
      invoice.status = 'unpaid';
    }

    await invoice.save();

    await Ledger.create({
      module: 'billing',
      account: invoice.vendorOrCustomer,
      debit: 0,
      credit: amount,
      description: `Payment received for Invoice: ${invoice.invoiceNo}`,
      relatedInvoice: invoice._id
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
        gstTotal += (item.price * item.quantity) * (item.taxPercent / 100);
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

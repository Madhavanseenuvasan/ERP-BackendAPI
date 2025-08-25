const { PurchaseOrder, PurchasePayment, Expense } = require('../models/purchaseOrderModel');
const { Ledger } = require('../models/billingModel');

exports.getPurchaseOrder = async (req, res) => {
  try {
    const { search, status, startDate, endDate, page = 1, limit = 10 } = req.query;
    let filter = {};

    if (search) {
      filter.$or = [
        { supplierName: { $regex: search, $options: 'i' } },
        { "items.productName": { $regex: search, $options: 'i' } },
        { poNumber: { $regex: search, $options: 'i' } }
      ];
    }

    if (status) {
      filter.status = status;
    }

    if (startDate && endDate) {
      filter.expectedDeliveryDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;
    const skip = (pageNumber - 1) * limitNumber;

    
    const totalOrders = await PurchaseOrder.countDocuments(filter);

    const orders = await PurchaseOrder.find(filter)
      .sort({ createdDate: -1 })
      .skip(skip)
      .limit(limitNumber);

    res.json({
      total: totalOrders,
      page: pageNumber,
      totalPages: Math.ceil(totalOrders / limitNumber),
      limit: limitNumber,
      data: orders
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.getSinglePO = async (req, res) => {
  try {
    const purchase = await PurchaseOrder.findById(req.params.id);
    res.json(purchase);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.createPurchaseOrder = async (req, res) => {
  try {
    const {
      supplierName,
      supplierAddress,
      department,
      priority,
      sourceType,
      expectedDeliveryDate,
      items,
      notes,
      status,
      deliveryStatus
    } = req.body;

    const po = await PurchaseOrder.create({
      supplierName,
      supplierAddress,
      department,
      priority,
      sourceType,
      expectedDeliveryDate,
      items,
      notes,
      status,
      deliveryStatus
    });

    // Ledger entry
    await Ledger.create({
      module: 'purchase',
      account: 'Accounts Payable',
      debit: po.grandTotal,
      credit: 0,
      description: `PO Created: ${po.poNumber}`,
      entryDate: new Date(),
      relatedInvoice: po._id
    });

    res.status(201).json(po);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updatePO = async (req, res) => {
  try {
    const po = await PurchaseOrder.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(po);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



exports.deletePO = async (req, res) => {
  try {
    await PurchaseOrder.findByIdAndDelete(req.params.id);
    res.json({ message: 'Purchase Order deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.makePayment = async (req, res) => {
  try {
    const { amount, method, reference } = req.body;
  const id = req.params.id;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid payment amount' });
    }

    const purchase = await PurchaseOrder.findById(id);
    if (!purchase) {
      return res.status(404).json({ error: 'Purchase Order not found' });
    }

    await PurchasePayment.create({
      po: purchase._id,
      amount,
      method,
      reference
    });

    
    const paidAmountResult = await PurchasePayment.aggregate([
      { $match: { po: purchase._id } },
      { $group: { _id: null, totalPaid: { $sum: '$amount' } } }
    ]);
    const paidAmount = paidAmountResult[0]?.totalPaid || 0;

    
    if (paidAmount >= purchase.grandTotal) {
      purchase.status = 'Confirmed';
    } else if (paidAmount > 0) {
      purchase.status = 'Partially Received';
    } else {
      purchase.status = 'Draft';
    }

    await purchase.save();

    // Ledger entry
    await Ledger.create({
      module: 'purchase',
      account: method === 'cash' ? 'Cash' : 'Bank',
      debit: 0,
      credit: amount,
      description: `Payment made for PO ${purchase.poNumber}`,
      entryDate: new Date(),
      relatedPayment: purchase._id
    });

    res.status(200).json({
      message: 'Purchase order payment recorded successfully',
      paidAmount,
      status: purchase.status
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Create expense
exports.createExpense = async (req, res) => {
  try {
    const { description, category, amount, date, paidTo, paymentMethod, gstIncluded } = req.body;
    const expense = await Expense.create({ description, category, amount, date, paidTo, paymentMethod, gstIncluded });

    await Ledger.create({
      module: 'purchase',
      account: category,
      debit: amount,
      credit: 0,
      description: `Expense: ${description}`,
      entryDate: new Date()
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const CashierCenterModel = require('../models/center_cashier');

// Create a new cashier center
async function createCashierCenter(req, res) {
  const cashierCenter = new CashierCenterModel(req.body);
  try {
    await cashierCenter.save();
    res.status(201).send(cashierCenter);
  } catch (err) {
    res.status(500).send(err);
  }
}

// Get all cashier centers
async function getAllCashierCenters(req, res) {
  const cashierCenters = await CashierCenterModel.find();
  res.status(200).send(cashierCenters);
}

// Get a single cashier center by id
async function getCashierCenterById(req, res) {
  // console.log('-- getCashierCenterById red.body', req.params)
  const cashierCenter = await CashierCenterModel.findById(req.params.cashierCenterId);
  res.status(200).send(cashierCenter);
}

// Update a cashier center by id
async function updateCashierCenterById(req, res) {
  const cashierCenter = await CashierCenterModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).send(cashierCenter);
}

// Delete a cashier center by id
async function deleteCashierCenterById(req, res) {
  await CashierCenterModel.findByIdAndRemove(req.params.id);
  res.status(200).send();
}

// Get cashier centers by query
async function getCashierCentersByQuery(req, res) {
  // console.log('-- getCashierCentersByQuery red.body', req.body)
  const query = req.body;
  const cashierCenters = await CashierCenterModel.find(query);

  res.status(200).send(cashierCenters);
}

module.exports = {
  createCashierCenter,
  getAllCashierCenters,
  getCashierCenterById,
  updateCashierCenterById,
  deleteCashierCenterById,
  getCashierCentersByQuery
};
const router = require("express").Router();
const cashierCenterController = require('../controllers/cashierCenterController');

router.get('/list', cashierCenterController.getAllCashierCenters);

router.post('/', cashierCenterController.createCashierCenter);

router.post('/list', cashierCenterController.getCashierCentersByQuery);

router.get('/:cashierCenterId', cashierCenterController.getCashierCenterById);

router.patch('/:id', cashierCenterController.updateCashierCenterById);

router.delete('/:id', cashierCenterController.deleteCashierCenterById);

module.exports = router;
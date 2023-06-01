const router = require("express").Router();
const invoiceController = require("../controllers/invoiceController");

// Routes start with /auth
router.post("/create-pdf", invoiceController.generateInvoice);
router.get("/fetch-pdf/:invoice_seq", invoiceController.getInvoice);

module.exports = router;
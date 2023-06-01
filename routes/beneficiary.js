const router = require("express").Router();
const beneficiaryController = require("../controllers/beneficiaryController");

// Routes start with /auth
router.post("/", beneficiaryController.addBeneficiary);
router.get("/list", beneficiaryController.getBeneficiaries);
router.get("/list/:parent_id", beneficiaryController.getBeneficiariesByParentId);
router.get("/:id", beneficiaryController.getBeneficiaryById);
router.delete("/:id", beneficiaryController.deleteBeneficiaryById);
router.patch("/", beneficiaryController.editBeneficiaryById);

module.exports = router;
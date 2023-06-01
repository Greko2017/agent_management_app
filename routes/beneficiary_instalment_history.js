const router = require("express").Router();
const beneficiaryInstalmentHistoryController = require("../controllers/beneficiaryInstalmentHistory");

// Routes start with /auth
router.post("/", beneficiaryInstalmentHistoryController.addBeneficiaryInstalmentHistory);
router.get("/list", beneficiaryInstalmentHistoryController.getBeneficiaryInstalmentHistories);
router.get("/list/:beneficiary_id", beneficiaryInstalmentHistoryController.getBeneficiaryInstalmentHistoryByBeneficiaryId);
router.get("/:id", beneficiaryInstalmentHistoryController.getBeneficiaryInstalmentHistoryById);
router.patch("/", beneficiaryInstalmentHistoryController.editBeneficiaryInstalmentHistoryById);
router.delete("/:id", beneficiaryInstalmentHistoryController.deleteBeneficiaryInstalmentHistoryById);

module.exports = router;
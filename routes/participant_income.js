const router = require("express").Router();
const participantIncomeController = require("../controllers/participantIncomeController");

// Routes start with /auth
router.post("/", participantIncomeController.addParticipantIncome);
router.get("/list", participantIncomeController.getParticipantIncomes);
router.get("/:id", participantIncomeController.getParticipantIncomeById);
router.patch("/", participantIncomeController.editParticipantIncomeById);
router.delete("/:id", participantIncomeController.deleteParticipantIncomeById);

module.exports = router;
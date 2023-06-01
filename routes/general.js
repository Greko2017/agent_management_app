const router = require("express").Router();
const generalRoutes = require("../controllers/generalController");

// Routes start with /auth
// router.post("/", generalRoutes.addGeneral);
router.get("/list", generalRoutes.getGenerals);
router.patch("/", generalRoutes.editGenerals);
router.post("/list", generalRoutes.getGeneralsGeneric);
router.post("/instalment/list", generalRoutes.getGeneralInstallments);
router.post("/participant_income/list", generalRoutes.getGeneralParticipantIncomes);
router.post("/campaign_participant/list", generalRoutes.getGeneralCampaignParticipants);
router.post("/instalment_line/list", generalRoutes.getGeneralInstallments);
// router.get("/:id", generalRoutes.getGeneralById);
router.patch("/instalment_line", generalRoutes.editGeneralInstalmentLines);
router.patch("/instalment", generalRoutes.editGeneralInstallments);
router.get("/statistic/participant_incomes_history/:participant_id", generalRoutes.getParticipantIncomesHistory);
// router.delete("/:id", generalRoutes.deleteGeneralById);

module.exports = router;
const router = require("express").Router();
const campaignParticipantController = require("../controllers/campaignParticipantController");

// Routes start with /auth
router.post("/", campaignParticipantController.addCampaignParticipant);
router.get("/list", campaignParticipantController.getCampaignParticipants);
router.get("/list/:campaign_id", campaignParticipantController.getCampaignParticipantByCampaignId);
router.get("/:id", campaignParticipantController.getCampaignParticipantById);
router.patch("/", campaignParticipantController.editCampaignParticipantById);
router.delete("/:id", campaignParticipantController.deleteCampaignParticipantById);

module.exports = router;
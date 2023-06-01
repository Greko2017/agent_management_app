const router = require("express").Router();
const campaignController = require("../controllers/campaignController");

// Routes campaign
router.post("/", campaignController.addCampaign);
// router.get("/list", campaignController.getCampaigns);
router.post("/list", campaignController.getCampaigns);
router.get("/:id", campaignController.getCampaignById);
router.patch("/", campaignController.editCampaignById);
router.delete("/:id", campaignController.deleteCampaignById);

module.exports = router;
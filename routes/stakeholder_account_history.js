const router = require("express").Router();
const stakeholderAccountHistoryController = require("../controllers/stakeholderAccountHistoryController");

// Routes start with /auth
router.post("/", stakeholderAccountHistoryController.addStakeholderAccountHistory);
router.post('/list',stakeholderAccountHistoryController.getStakeholderAccountHistoriesQuery)
router.get("/list", stakeholderAccountHistoryController.getStakeholderAccountHistories);
router.get("/list/:stakeholder_id", stakeholderAccountHistoryController.getHistoryByStakeholderId);
router.get("/:id", stakeholderAccountHistoryController.getStakeholderAccountHistoryById);
router.patch("/", stakeholderAccountHistoryController.editStakeholderAccountHistoryById);
router.delete("/:id", stakeholderAccountHistoryController.deleteStakeholderAccountHistoryById);

module.exports = router;
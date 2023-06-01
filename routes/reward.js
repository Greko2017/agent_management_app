const router = require("express").Router();
const rewardController = require("../controllers/rewardController");

// Routes start with /auth
router.post("/", rewardController.addReward);
router.get("/list", rewardController.getRewards);
router.get("/:id", rewardController.getRewardById);
router.patch("/", rewardController.editRewardById);
router.delete("/:id", rewardController.deleteRewardById);

module.exports = router;
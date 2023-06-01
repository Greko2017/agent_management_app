const router = require("express").Router();
const rewardLineController = require("../controllers/rewardLineController");

// Routes start with /auth
router.post("/", rewardLineController.addRewardLine);
router.get("/list", rewardLineController.getRewardLines);
router.get("/list/:id", rewardLineController.getRewardLinesByParentId);
router.get("/:id", rewardLineController.getRewardLineById);
router.patch("/", rewardLineController.editRewardLineById);
router.delete("/:id", rewardLineController.deleteRewardLineById);

module.exports = router;
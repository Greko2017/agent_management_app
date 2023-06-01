const router = require("express").Router();
const centerController = require("../controllers/centerController");

// Routes start with /auth
router.post("/", centerController.addCenter);
router.post("/list", centerController.getQueryCenters);
router.get("/list", centerController.getCenters);
router.get("/:id", centerController.getCenterById);
router.patch("/", centerController.editCenterById);
router.delete("/:id", centerController.deleteCenterById);

module.exports = router;
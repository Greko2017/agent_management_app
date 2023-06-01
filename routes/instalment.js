const router = require("express").Router();
const instalmentController = require("../controllers/instalmentController");

// Routes start with /auth
router.post("/", instalmentController.addInstalment);
router.get("/list", instalmentController.getInstallments);
router.get("/:id", instalmentController.getInstalmentById);
router.patch("/", instalmentController.editInstalmentById);
router.delete("/:id", instalmentController.deleteInstalmentById);

module.exports = router;
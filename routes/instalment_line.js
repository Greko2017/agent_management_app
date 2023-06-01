const router = require("express").Router();
const instalmentLineController = require("../controllers/instalmentLineController");

// Routes start with /auth
router.post("/", instalmentLineController.addInstalmentLine);
router.get("/list", instalmentLineController.getInstalmentLines);
router.get("/list/:parent_id", instalmentLineController.getInstalmentLinesByInstalmentId);
router.get("/:id", instalmentLineController.getInstalmentLineById);
router.patch("/", instalmentLineController.editInstalmentLineById);
router.delete("/:id", instalmentLineController.deleteInstalmentLineById);

module.exports = router;
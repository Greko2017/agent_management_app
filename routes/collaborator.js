const router = require("express").Router();
const collaboratorController = require("../controllers/collaboratorController");

// Routes start with /auth
router.post("/", collaboratorController.addCollaborator);
router.get("/list", collaboratorController.getCollaborators);
router.get("/list/:parent_id", collaboratorController.getCollaboratorsByParentId);
router.get("/:id", collaboratorController.getCollaboratorById);

module.exports = router;
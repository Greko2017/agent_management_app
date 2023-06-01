const router = require("express").Router();
const participantAccountRoutes = require("../controllers/participantAccountController");

// Routes start with /auth
router.post("/", participantAccountRoutes.addParticipantAccount);
router.post("/list", participantAccountRoutes.getParticipantAccount);
router.patch("/", participantAccountRoutes.editParticipantAccount);
router.delete("/:id", participantAccountRoutes.deleteParticipantAccountById);

module.exports = router;
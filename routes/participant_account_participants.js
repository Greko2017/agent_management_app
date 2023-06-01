const router = require("express").Router();
const participantAccountParticipantsController = require("../controllers/participantAccountParticipantsController");

// Routes start with /auth
router.post("/", participantAccountParticipantsController.addParticipantAccountParticipant);
router.get("/list", participantAccountParticipantsController.getParticipantAccountParticipants);
router.get("/list/:account_id", participantAccountParticipantsController.getParticipantByAccountId);
router.get("/:id", participantAccountParticipantsController.getParticipantAccountParticipantById);
router.patch("/", participantAccountParticipantsController.editParticipantAccountParticipantById);
router.delete("/:id", participantAccountParticipantsController.deleteParticipantAccountParticipantById);
router.post("/list", participantAccountParticipantsController.getParticipantAccountParticipantsWithQuery);
module.exports = router;
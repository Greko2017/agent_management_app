const router = require("express").Router();
const headController = require("../controllers/headController");

// Routes start with /auth
router.post("/", headController.addHead);
router.get("/list", headController.getHeads);
router.get("/:id", headController.getHeadById);
router.patch("/", headController.editHeadById);
router.patch("/update_password", headController.updatePassword);
router.delete("/:id", headController.deleteHeadById);

module.exports = router;
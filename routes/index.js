const router = require("express").Router();
const authRoutes = require("./auth");
const headRoutes = require("./head");
const collaboratorRoutes = require("./collaborator");
const beneficiaryRoutes = require("./beneficiary");
const centerRoutes = require("./center");
const instalmentRoutes = require("./instalment");
const instalmentLineRoutes = require("./instalment_line");
const beneficiaryInstalmentHistoryRoutes = require('./beneficiary_instalment_history')
const generalRoutes = require('./general')
const invoiceRoutes = require("./invoice");
const campaignRoutes = require("./campaign");
const rewardRoutes = require("./reward");
const rewardLineRoutes = require("./reward_line");
const campaignParticipantRoutes = require("./campaign_participant");
const participantIncomeRoutes = require("./participant_income");
const participantAccountRoutes = require("./participant_account");
const participantAccountParticipantRoutes = require("./participant_account_participants");
const stakeholderTransactionHistoryRoutes = require("./stakeholder_account_history");
const cashierCenterRoutes = require("./cashier_center");

const roleRouter  = require("./roleRouter");
const permissionRouter  = require("./permissionRouter");

const path = require("path");


router.get('/health', (req, res) => {
    res.json({status: 'alive'});
  });

// Routes for authentication
router.use("/auth", authRoutes);
router.use("/campaign", campaignRoutes);
router.use("/cashier_center", cashierCenterRoutes);
router.use("/participant_account_participant", participantAccountParticipantRoutes);
router.use("/stakeholder_transaction_history", stakeholderTransactionHistoryRoutes);
router.use("/user_role", roleRouter);
router.use("/permission", permissionRouter)
router.use("/participant_income", participantIncomeRoutes);
router.use("/participant_account", participantAccountRoutes);
router.use("/campaign_participant", campaignParticipantRoutes);
router.use("/reward", rewardRoutes);
router.use("/invoice", invoiceRoutes);
router.use("/head", headRoutes);
router.use("/collaborator", collaboratorRoutes);
router.use("/beneficiary", beneficiaryRoutes);
router.use("/center", centerRoutes);
router.use("/instalment", instalmentRoutes);
router.use("/instalment_line", instalmentLineRoutes);
router.use("/beneficiary_instalment_history", beneficiaryInstalmentHistoryRoutes);
router.use("/reward_line", rewardLineRoutes);
router.use("/general", generalRoutes);


// If no API routes are hit, send the React app
router.use("*", (req, res) => res.sendFile(path.join(__dirname, "../client/build/index.html")));

module.exports = router;
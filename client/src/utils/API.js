import axios from "axios";
import { Types } from "mongoose";

export default {
    // API request to server side 
    register(data) {
        return axios.post("/auth/register", data)
    },
    login(data) {
        return axios.post("/auth/login", data)
    },
    loadUser(headers) {
        return axios.get("/auth/user", headers)
    },
    // head APIs
    addHeadApi(data, headers){
        return axios.post("/head", data, headers)
    },
    getHeadsApi(headers) {
        return axios.get("/head/list", headers)
    },
    getHeadByIdApi(id, headers) {
        return axios.get(`/head/${id}`, headers)
    },
    editHeadApi(data, headers){
        return axios.patch(`/head`, data, headers)
    },
    deleteHeadByIdApi(id, headers) {
        return axios.delete(`/head/${id}`, headers)
    },
    // Collaborator API
    addCollaboratorApi(data, headers){
        return axios.post("/collaborator", data, headers)
    },
    getCollaboratorsByIParentApi(id, headers) {
        return axios.get(`/collaborator/list/${id}`, headers)
    },
    getCollaboratorsApi(headers) {
        return axios.get(`/collaborator/list`, headers)
    },
    getCollaboratorByIdApi(id, headers) {
        return axios.get(`/collaborator/${id}`, headers)
    },
    getBeneficiariesByParentIdApi(parent_id, headers) {
        return axios.get(`/beneficiary/list/${parent_id}`, headers)
    },

    // Beneficiary API
    getBeneficiariesApi(headers) {
        return axios.get(`/beneficiary/list`, headers)
    },
    addBeneficiaryApi(data, headers){
        return axios.post("/beneficiary", data, headers)
    },
    deleteBeneficiaryByIdApi(id, headers) {
        return axios.delete(`/beneficiary/${id}`, headers)
    },
    getBeneficiaryByIdApi(id, headers) {
        return axios.get(`/beneficiary/${id}`, headers)
    },
    editBeneficiaryApi(data, headers){
        return axios.patch(`/beneficiary`, data, headers)
    },

    // center APIs
    addCenterApi(data, headers){
        return axios.post("/center", data, headers)
    },
    getCentersApi(headers) {
        return axios.get("/center/list", headers)
    },
    getQueryCentersApi(query, headers) {
        return axios.post("/center/list", query, headers)
    },
    getCenterByIdApi(id, headers) {
        return axios.get(`/center/${id}`, headers)
    },
    editCenterApi(data, headers){
        return axios.patch(`/center`, data, headers)
    },
    deleteCenterByIdApi(id, headers) {
        return axios.delete(`/center/${id}`, headers)
    },
    // instalment APIs
    addInstalmentApi(data, headers){
        return axios.post("/instalment", data, headers)
    },
    getInstallmentsApi(headers) {
        return axios.get("/instalment/list", headers)
    },
    getInstalmentByIdApi(id, headers) {
        return axios.get(`/instalment/${id}`, headers)
    },
    editInstalmentApi(data, headers){
        return axios.patch(`/instalment`, data, headers)
    },
    deleteInstalmentByIdApi(id, headers) {
        return axios.delete(`/instalment/${id}`, headers)
    },
    // instalment lines API
    getInstalmentLinesByInstalmentIdApi(id, headers) {
        return axios.get(`/instalment_line/list/${id}`, headers)
    },
    getInstalmentLinesApi(id, headers) {
        return axios.get(`/instalment_line/list`, headers)
    },
    addInstalmentLineApi(data, headers){
        return axios.post("/instalment_line", data, headers)
    },    
    editInstalmentLineApi(data, headers){
        return axios.patch(`/instalment_line`, data, headers)
    },
    deleteInstalmentLineByIdApi(id, headers) {
        return axios.delete(`/instalment_line/${id}`, headers)
    },
    getInstalmentLineByIdApi(id, headers) {
        return axios.get(`/instalment_line/${id}`, headers)
    },
    
    // Beneficiary instalment History API
    getBeneficiaryInstalmentHistoriesApi(headers) {
        return axios.get("/beneficiary_instalment_history/list", headers)
    },
    addBeneficiaryInstalmentHistoryApi(data, headers){
        return axios.post("/beneficiary_instalment_history", data, headers)
    },
    deleteBeneficiaryInstalmentHistoryByIdApi(id, headers) {
        return axios.delete(`/beneficiary_instalment_history/${id}`, headers)
    },
    getBeneficiaryInstalmentHistoryByIdApi(id, headers) {
        return axios.get(`/beneficiary_instalment_history/${id}`, headers)
    },
    getBeneficiaryInstalmentHistoryByBeneficiaryIdApi(id, headers) {
        return axios.get(`/beneficiary_instalment_history/list/${id}`, headers)
    },
    editBeneficiaryInstalmentHistoryApi(data, headers){
        return axios.patch(`/beneficiary_instalment_history`, data, headers)
    },

    // General API
    loadGenerals(headers) {
        return axios.get("/general/list", headers)
    },
    getGeneralsApis(data, headers) {
        return axios.post("/general/list",data, headers)
    },
    editGeneralsGenericApis(data, headers) {
        return axios.patch("/general",data, headers)
    },

    // Campaign APIs
    addCampaignApi(data, headers){
        return axios.post("/campaign", data, headers)
    },
    getCampaignsApi(query, headers) {
        return axios.post("/campaign/list", query, headers)
    },
    getCampaignByIdApi(id, headers) {
        return axios.get(`/campaign/${id}`, headers)
    },
    editCampaignApi(data, headers){
        return axios.patch(`/campaign`, data, headers)
    },
    deleteCampaignByIdApi(id, headers) {
        return axios.delete(`/campaign/${id}`, headers)
    },
    
    // Reward APIs
    addRewardApi(data, headers){
        return axios.post("/reward", data, headers)
    },
    getRewardsApi(headers) {
        return axios.get("/reward/list", headers)
    },
    getRewardByIdApi(id, headers) {
        return axios.get(`/reward/${id}`, headers)
    },
    editRewardApi(data, headers){
        return axios.patch(`/reward`, data, headers)
    },
    deleteRewardByIdApi(id, headers) {
        return axios.delete(`/reward/${id}`, headers)
    },
    
    // RewardLine APIs
    addRewardLineApi(data, headers){
        return axios.post("/reward_line", data, headers)
    },
    getRewardLinesApi(headers) {
        return axios.get("/reward_line/list", headers)
    },
    getRewardLineByIdApi(id, headers) {
        return axios.get(`/reward_line/${id}`, headers)
    },
    editRewardLineApi(data, headers){
        return axios.patch(`/reward_line`, data, headers)
    },
    deleteRewardLineByIdApi(id, headers) {
        return axios.delete(`/reward_line/${id}`, headers)
    },
    getRewardLinesByParentIdApi(id, headers) {
        return axios.get(`/reward_line/list/${id}`, headers)
    },

    // Campaign Participant APIs
    addCampaignParticipantApi(data, headers){
        return axios.post("/campaign_participant", data, headers)
    },
    getCampaignParticipantsApi(headers) {
        return axios.get("/campaign_participant/list", headers)
    },
    getCampaignParticipantByIdApi(id, headers) {
        return axios.get(`/campaign_participant/${id}`, headers)
    },
    editCampaignParticipantApi(data, headers){
        return axios.patch(`/campaign_participant`, data, headers)
    },
    deleteCampaignParticipantByIdApi(id, headers) {
        return axios.delete(`/campaign_participant/${id}`, headers)
    },
    getCampaignParticipantsByCampaignIdApi(id, headers) {
        return axios.get(`/campaign_participant/list/${id}`, headers)
    },

    
    // user_role APIs
    addUserRoleApi(data, headers){
        return axios.post("/user_role", data, headers)
    },
    getUserRolesApi(headers) {
        return axios.get("/user_role/list", headers)
    },
    getUserRoleByIdApi(id, headers) {
        return axios.get(`/user_role/${id}`, headers)
    },
    editUserRoleApi(data, headers){
        return axios.patch(`/user_role`, data, headers)
    },
    deleteUserRoleByIdApi(id, headers) {
        return axios.delete(`/user_role/${id}`, headers)
    },

    
    // user_role_permission APIs
    addUserRolePermissionApi(data, headers){
        return axios.post("/permission", data, headers)
    },
    getUserRolePermissionsApi(headers) {
        return axios.get("/permission/list", headers)
    },
    getUserRolePermissionByIdApi(id, headers) {
        return axios.get(`/permission/${id}`, headers)
    },
    editUserRolePermissionApi(data, headers){
        return axios.patch(`/permission`, data, headers)
    },
    deleteUserRolePermissionByIdApi(id, headers) {
        return axios.delete(`/permission/${id}`, headers)
    },
    getUserRolePermissionByRoleIdApi(id, headers) {
        return axios.get(`/permission/list/${id}`, headers)
    },
    
    // ParticipantAccount APIs
    addParticipantAccountApi(data, headers){
        return axios.post("/participant_account", data, headers)
    },
    getParticipantAccountsApi(body, headers) {
        return axios.post("/participant_account/list", body, headers)
    },
    getParticipantAccountByIdApi(id, headers) {
        return axios.post("/participant_account/list", {_id:Types.ObjectId(id)}, headers)
    },
    editParticipantAccountApi(data, headers){
        return axios.patch(`/participant_account`, data, headers)
    },
    deleteParticipantAccountByIdApi(id, headers) {
        return axios.delete(`/participant_account/${id}`, headers)
    },
    // getParticipantsByParticipantAccountIdApi(id, headers) {
    //     return axios.post("/participant_account/list", {query: {_id:id}}, headers)
    // },

    // Participant Account Participant APIs
    addParticipantAccountParticipantApi(data, headers){
        return axios.post("/participant_account_participant", data, headers)
    },
    getAllAccountsOfParticipantByParticipantIdApi(data, headers){
        return axios.post("/participant_account_participant/list", data, headers)
    },
    getParticipantAccountParticipantsApi(headers) {
        return axios.get("/participant_account_participant/list", headers)
    },
    getParticipantAccountParticipantByIdApi(id, headers) {
        return axios.get(`/participant_account_participant/${id}`, headers)
    },
    editParticipantAccountParticipantApi(data, headers){
        return axios.patch(`/participant_account_participant`, data, headers)
    },
    deleteParticipantAccountParticipantByIdApi(id, headers) {
        return axios.delete(`/participant_account_participant/${id}`, headers)
    },
    getParticipantAccountParticipantsByAccountIdApi(id, headers) {
        return axios.get(`/participant_account_participant/list/${id}`, headers)
    },

    
    // Account stakeholder APIs
    addAccountStakeholderApi(data, headers){
        return axios.post("/participant_account_participant", data, headers)
    },
    getAccountStakeholdersApi(headers) {
        return axios.get("/participant_account_participant/list", headers)
    },
    getAccountStakeholderByIdApi(id, headers) {
        return axios.get(`/participant_account_participant/${id}`, headers)
    },
    editAccountStakeholderApi(data, headers){
        return axios.patch(`/participant_account_participant`, data, headers)
    },
    deleteAccountStakeholderByIdApi(id, headers) {
        return axios.delete(`/participant_account_participant/${id}`, headers)
    },
    getAccountStakeholdersByAccountIdApi(id, headers) {
        return axios.get(`/participant_account_participant/list/${id}`, headers)
    },

    
    // Stakeholder Transaction History APIs
    addStakeholderTransactionHistoryApi(data, headers){
        return axios.post("/stakeholder_transaction_history", data, headers)
    },
    getStakeholderTransactionHistoriesApi(headers) {
        return axios.get("/stakeholder_transaction_history/list", headers)
    },
    getStakeholderTransactionHistoryByIdApi(id, headers) {
        return axios.get(`/stakeholder_transaction_history/${id}`, headers)
    },
    editStakeholderTransactionHistoryApi(data, headers){
        return axios.patch(`/stakeholder_transaction_history`, data, headers)
    },
    deleteStakeholderTransactionHistoryByIdApi(id, headers) {
        return axios.delete(`/stakeholder_transaction_history/${id}`, headers)
    },
    getStakeholderTransactionHistoriesByStakeholderIdApi(id, headers) {
        return axios.get(`/stakeholder_transaction_history/list/${id}`, headers)
    },
    getStakeholderAccountHistoriesQueryApi(query, headers) {
        return axios.post(`/stakeholder_transaction_history/list`, query, headers)
    },

    // Cashier Center
    createCashierCenterApi(data, headers){
        return axios.post('/cashier_center', data, headers);
    },    
    getCashierCentersByQueryApi(query, headers){
        return axios.post('/cashier_center/list', query, headers);
    },    
    getCashierCenterByIdApi(id, headers){
        return axios.get(`/cashier_center/${id}`, headers);
    },    
    updateCashierCenterApi(data, id, headers){
        return axios.patch(`/cashier_center/${id}`, data, headers);
    },    
    deleteCashierCenterByIdApi(id, headers){
        return axios.delete(`/cashier_center/${id}`, headers);
    },
}
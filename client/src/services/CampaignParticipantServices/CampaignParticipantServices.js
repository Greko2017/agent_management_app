import { getErrors, getTokenInfo } from "../../actions/authActions";
import history from "../../history";
import API from "../../utils/API";

export const editCampaignParticipant = (formData, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to login user
        const response = await API.editCampaignParticipantApi(formData, headers);
        // dispatch to reducer
        dispatch({
            type: 'EDIT_CAMPAIGN_PARTICIPANT_SUCCESS',
            payload: response.data
        });
        // redirect to page
        setErrorMessage(null)
        setSuccessMessage(`The Campaign Participant ${formData.name} successfully edited !!`)
        setIsLoading(false)
        // history.push("/campaign_participants");
        return response

    } catch (err) {
        console.error('In error editCampaignParticipant', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'EDIT_CAMPAIGN_PARTICIPANT_FAIL'
        });
        setIsLoading(false)
    }
}

export const addCampaignParticipant = (formData, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to login user
        const response = await API.addCampaignParticipantApi(formData, headers);
        // dispatch to reducer
        dispatch({
            type: 'ADD_CAMPAIGN_PARTICIPANT_SUCCESS',
            payload: response.data
        });
        // redirect to page
        history.push(`/campaigns/${formData.campaign?._id}`);
        setErrorMessage(null)
        setSuccessMessage(`The Campaign Participant ${formData.name} successfully created !!, his password is sent to his email address`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error addCampaignParticipant', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'ADD_CAMPAIGN_PARTICIPANT_FAIL'
        });
        setIsLoading(false)
    }
}


export const getCampaignParticipants = (setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get campaign_participants
        const response = await API.getCampaignParticipantsApi(headers);
        // dispatch to reducer
        dispatch({
            type: 'GET_CAMPAIGN_PARTICIPANTS_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`CampaignParticipants Fetched !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error getCampaignParticipants', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'GET_CAMPAIGN_PARTICIPANTS_FAIL'
        });
        setIsLoading(false)
    }
}

export const getCampaignParticipantById =  (campaign_id, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get campaign_participants
        const response = await API.getCampaignParticipantByIdApi(campaign_id, headers);
        // dispatch to reducer
        dispatch({
            type: 'GET_CAMPAIGN_PARTICIPANT_BY_ID_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`CampaignParticipant Fetched !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error getCampaignParticipantById', err)
        // dispatch get error Action
        const { message } = err
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(err))
        // dispatch login fail
        dispatch({
            type: 'GET_CAMPAIGN_PARTICIPANT_BY_ID_FAIL'
        });
        setIsLoading(false)
    }
}

export const getCampaignParticipantsByCampaignId =  (campaign_participant_id, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get campaign_participants
        const response = await API.getCampaignParticipantsByCampaignIdApi(campaign_participant_id, headers);
        // dispatch to reducer
        dispatch({
            type: 'GET_CAMPAIGN_PARTICIPANT_BY_ID_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`CampaignParticipant Fetched !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error getCampaignParticipantByCampaignId', err)
        // dispatch get error Action
        const { message } = err
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(err))
        // dispatch login fail
        dispatch({
            type: 'GET_CAMPAIGN_PARTICIPANT_BY_ID_FAIL'
        });
        setIsLoading(false)
    }
}
export const deleteCampaignParticipant = (campaign_participant_id, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get campaign_participants
        const response = await API.deleteCampaignParticipantByIdApi(campaign_participant_id, headers);
        // dispatch to reducer
        dispatch({
            type: 'DELETE_CAMPAIGN_PARTICIPANT_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`CampaignParticipants deleted !!`)
        setIsLoading(false)
        history.push(`/campaigns`);

    } catch (err) {
        console.error('In error deleteCampaignParticipant', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'DELETE_CAMPAIGN_PARTICIPANT_FAIL'
        });
        setIsLoading(false)
    }
}
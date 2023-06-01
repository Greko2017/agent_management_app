import { getErrors, getTokenInfo } from "../../actions/authActions";
import history from "../../history";
import API from "../../utils/API";

export const editParticipantAccountParticipant = (formData, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to login user
        const response = await API.editParticipantAccountParticipantApi(formData, headers);
        // dispatch to reducer
        dispatch({
            type: 'EDIT_PARTICIPANT_ACCOUNT_PARTICIPANTS_SUCCESS',
            payload: response.data
        });
        // redirect to page
        setErrorMessage(null)
        setSuccessMessage(`The Account Participants ${formData.name} successfully edited !!`)
        setIsLoading(false)
        // history.push("/campaign_participants");
        return response

    } catch (err) {
        console.error('In error editParticipantAccountParticipant', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'EDIT_PARTICIPANT_ACCOUNT_PARTICIPANTS_FAIL'
        });
        setIsLoading(false)
    }
}
export const getAllAccountsOfParticipantByParticipantId = (formData, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to login user
        const response = await API.getAllAccountsOfParticipantByParticipantIdApi(formData, headers);
        // dispatch to reducer
        dispatch({
            type: 'GET_PARTICIPANT_ACCOUNT_PARTICIPANTS_WITH_QUERY_SUCCESS',
            payload: response.data
        });
        // redirect to page
        setErrorMessage(null)
        setSuccessMessage(`The Account Participants ${formData.name} successfully created !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error getAllAccountsOfParticipantByParticipantId', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'GET_PARTICIPANT_ACCOUNT_PARTICIPANTS_WITH_QUERY_FAIL'
        });
        setIsLoading(false)
    }
}


export const addParticipantAccountParticipant = (formData, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to login user
        const response = await API.addParticipantAccountParticipantApi(formData, headers);
        // dispatch to reducer
        dispatch({
            type: 'ADD_PARTICIPANT_ACCOUNT_PARTICIPANTS_SUCCESS',
            payload: response.data
        });
        // redirect to page
        history.push(`/campaigns/${formData.campaign?._id}`);
        setErrorMessage(null)
        setSuccessMessage(`The Account Participants ${formData.name} successfully created !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error addParticipantAccountParticipant', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'ADD_PARTICIPANT_ACCOUNT_PARTICIPANTS_FAIL'
        });
        setIsLoading(false)
    }
}


export const getParticipantAccountParticipants = (setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get campaign_participants
        const response = await API.getParticipantAccountParticipantsApi(headers);
        // dispatch to reducer
        dispatch({
            type: 'GET_CAMPAIGN_PARTICIPANTS_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`ParticipantAccountParticipants Fetched !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error getParticipantAccountParticipants', err)
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

export const getParticipantAccountParticipantById =  (campaign_id, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get campaign_participants
        const response = await API.getParticipantAccountParticipantByIdApi(campaign_id, headers);
        // dispatch to reducer
        dispatch({
            type: 'GET_PARTICIPANT_ACCOUNT_PARTICIPANTS_BY_ID_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`ParticipantAccountParticipant Fetched !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error getParticipantAccountParticipantById', err)
        // dispatch get error Action
        const { message } = err
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(err))
        // dispatch login fail
        dispatch({
            type: 'GET_PARTICIPANT_ACCOUNT_PARTICIPANTS_BY_ID_FAIL'
        });
        setIsLoading(false)
    }
}

export const getParticipantAccountParticipantsByAccountId =  (campaign_participant_id, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get campaign_participants
        const response = await API.getParticipantAccountParticipantsByAccountIdApi(campaign_participant_id, headers);
        // dispatch to reducer
        dispatch({
            type: 'GET_PARTICIPANT_ACCOUNT_PARTICIPANTS_BY_ID_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`ParticipantAccountParticipant Fetched !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error getParticipantAccountParticipantByAccountId', err)
        // dispatch get error Action
        const { message } = err
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(err))
        // dispatch login fail
        dispatch({
            type: 'GET_PARTICIPANT_ACCOUNT_PARTICIPANTS_BY_ID_FAIL'
        });
        setIsLoading(false)
    }
}
export const deleteParticipantAccountParticipant = (campaign_participant_id, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get campaign_participants
        const response = await API.deleteParticipantAccountParticipantByIdApi(campaign_participant_id, headers);
        // dispatch to reducer
        dispatch({
            type: 'DELETE_PARTICIPANT_ACCOUNT_PARTICIPANTS_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`ParticipantAccountParticipants deleted !!`)
        setIsLoading(false)
        history.push(`/campaigns`);

    } catch (err) {
        console.error('In error deleteParticipantAccountParticipant', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'DELETE_PARTICIPANT_ACCOUNT_PARTICIPANTS_FAIL'
        });
        setIsLoading(false)
    }
}
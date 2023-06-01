import { getErrors, getTokenInfo } from "../../actions/authActions";
import history from "../../history";
import API from "../../utils/API";

export const editParticipantAccount = (formData, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to login user
        const response = await API.editParticipantAccountApi(formData, headers);
        // dispatch to reducer
        dispatch({
            type: 'EDIT_PARTICIPANT_ACCOUNT_SUCCESS',
            payload: response.data
        });
        // redirect to page
        setErrorMessage(null)
        setSuccessMessage(`The Campaign Participant ${formData.name} successfully edited !!`)
        setIsLoading(false)
        // history.push("/participant_account_participants");
        return response

    } catch (err) {
        console.error('In error editParticipantAccount', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'EDIT_PARTICIPANT_ACCOUNT_FAIL'
        });
        setIsLoading(false)
    }
}

export const addParticipantAccount = (formData, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to login user
        const response = await API.addParticipantAccountApi(formData, headers);
        // dispatch to reducer
        dispatch({
            type: 'ADD_PARTICIPANT_ACCOUNT_SUCCESS',
            payload: response.data
        });
        // redirect to page
        history.push(`/participant_accounts`);
        setErrorMessage(null)
        setSuccessMessage(`The Campaign Participant ${formData.name} successfully created !!, his password is sent to his email address`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error addParticipantAccount', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'ADD_PARTICIPANT_ACCOUNT_FAIL'
        });
        setIsLoading(false)
    }
}


export const getParticipantAccounts = (body, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get participant_account_participants
        const response = await API.getParticipantAccountsApi(body, headers);
        // dispatch to reducer
        dispatch({
            type: 'GET_CAMPAIGN_PARTICIPANTS_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`ParticipantAccounts Fetched !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error getParticipantAccounts', err)
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

export const getParticipantAccountById =  (participant_account_id, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        // console.log('-- getParticipantAccountById participant_account_id', participant_account_id)
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get participant_account_participants
        const response = await API.getParticipantAccountByIdApi(participant_account_id, headers);
        // dispatch to reducer
        dispatch({
            type: 'GET_PARTICIPANT_ACCOUNT_BY_ID_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`ParticipantAccount Fetched !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error getParticipantAccountById', err)
        // dispatch get error Action
        const { message } = err
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(err))
        // dispatch login fail
        dispatch({
            type: 'GET_PARTICIPANT_ACCOUNT_BY_ID_FAIL'
        });
        setIsLoading(false)
    }
}

export const getParticipantAccountsByCampaignId =  (participant_account_id, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get participant_account_participants
        const response = await API.getParticipantAccountsByCampaignIdApi(participant_account_id, headers);
        // dispatch to reducer
        dispatch({
            type: 'GET_PARTICIPANT_ACCOUNT_BY_ID_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`ParticipantAccount Fetched !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error getParticipantAccountByCampaignId', err)
        // dispatch get error Action
        const { message } = err
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(err))
        // dispatch login fail
        dispatch({
            type: 'GET_PARTICIPANT_ACCOUNT_BY_ID_FAIL'
        });
        setIsLoading(false)
    }
}
export const deleteParticipantAccount = (participant_account_id, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get participant_account_participants
        const response = await API.deleteParticipantAccountByIdApi(participant_account_id, headers);
        // dispatch to reducer
        dispatch({
            type: 'DELETE_PARTICIPANT_ACCOUNT_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`ParticipantAccounts deleted !!`)
        setIsLoading(false)
        history.push(`/participant_accounts`);

    } catch (err) {
        console.error('In error deleteParticipantAccount', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'DELETE_PARTICIPANT_ACCOUNT_FAIL'
        });
        setIsLoading(false)
    }
}

export const getParticipantsByParticipantAccountId =(participant_account_id, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        const response = await API.getParticipantAccountByIdApi(participant_account_id, headers);
        // dispatch to reducer
        dispatch({
            type: 'GET_PARTICIPANT_ACCOUNT_BY_PRT_ACC_ID_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error getParticipantsByParticipantAccountId', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'GET_PARTICIPANT_ACCOUNT_BY_PRT_ACC_ID_FAIL'
        });
        setIsLoading(false)
    }
}
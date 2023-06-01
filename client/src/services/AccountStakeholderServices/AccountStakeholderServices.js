import { getErrors, getTokenInfo } from "../../actions/authActions";
import history from "../../history";
import API from "../../utils/API";

export const editAccountStakeholder = (formData, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to login user
        const response = await API.editAccountStakeholderApi(formData, headers);
        // dispatch to reducer
        dispatch({
            type: 'EDIT_ACCOUNT_STAKEHOLDER_SUCCESS',
            payload: response.data
        });
        // redirect to page
        setErrorMessage(null)
        setSuccessMessage(`The Account Stakeholder ${formData.name} successfully edited !!`)
        setIsLoading(false)
        // history.push("/campaign_participants");
        return response

    } catch (err) {
        console.error('In error editAccountStakeholder', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'EDIT_ACCOUNT_STAKEHOLDER_FAIL'
        });
        setIsLoading(false)
    }
}

export const addAccountStakeholder = (formData, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to login user
        const response = await API.addAccountStakeholderApi(formData, headers);
        // dispatch to reducer
        dispatch({
            type: 'ADD_ACCOUNT_STAKEHOLDER_SUCCESS',
            payload: response.data
        });
        // redirect to page
        history.push(`/participant_accounts/${formData.participant_account?._id}`);
        setErrorMessage(null)
        setSuccessMessage(`The Account Stakeholder ${formData.name} successfully created !!, his password is sent to his email address`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error addAccountStakeholder', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'ADD_ACCOUNT_STAKEHOLDER_FAIL'
        });
        setIsLoading(false)
    }
}


export const getAccountStakeholders = (setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get campaign_participants
        const response = await API.getAccountStakeholdersApi(headers);
        // dispatch to reducer
        dispatch({
            type: 'GET_CAMPAIGN_PARTICIPANTS_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`AccountStakeholders Fetched !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error getAccountStakeholders', err)
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

export const getAccountStakeholderById =  (campaign_id, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get campaign_participants
        const response = await API.getAccountStakeholderByIdApi(campaign_id, headers);
        // dispatch to reducer
        dispatch({
            type: 'GET_ACCOUNT_STAKEHOLDER_BY_ID_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`AccountStakeholder Fetched !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error getAccountStakeholderById', err)
        // dispatch get error Action
        const { message } = err
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(err))
        // dispatch login fail
        dispatch({
            type: 'GET_ACCOUNT_STAKEHOLDER_BY_ID_FAIL'
        });
        setIsLoading(false)
    }
}

export const getAccountStakeholdersByAccountId =  (account_stakeholder_id, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get campaign_participants
        const response = await API.getAccountStakeholdersByAccountIdApi(account_stakeholder_id, headers);
        // dispatch to reducer
        dispatch({
            type: 'GET_ACCOUNT_STAKEHOLDER_BY_ID_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`AccountStakeholder Fetched !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error getAccountStakeholderByAccountId', err)
        // dispatch get error Action
        const { message } = err
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(err))
        // dispatch login fail
        dispatch({
            type: 'GET_ACCOUNT_STAKEHOLDER_BY_ID_FAIL'
        });
        setIsLoading(false)
    }
}
export const deleteAccountStakeholder = (account_stakeholder, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    const {_id: account_stakeholder_id, participant_account} = account_stakeholder
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get campaign_participants
        const response = await API.deleteAccountStakeholderByIdApi(account_stakeholder_id, headers);
        // dispatch to reducer
        dispatch({
            type: 'DELETE_ACCOUNT_STAKEHOLDER_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`AccountStakeholders deleted !!`)
        setIsLoading(false)
        history.push(`/participant_accounts/${participant_account?._id}`);

    } catch (err) {
        console.error('In error deleteAccountStakeholder', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'DELETE_ACCOUNT_STAKEHOLDER_FAIL'
        });
        setIsLoading(false)
    }
}
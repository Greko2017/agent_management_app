import { getErrors, getTokenInfo } from "../../actions/authActions";
import history from "../../history";
import API from "../../utils/API";

export const editStakeholderTransactionHistory = (formData, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to login user
        const response = await API.editStakeholderTransactionHistoryApi(formData, headers);
        // dispatch to reducer
        dispatch({
            type: 'EDIT_STAKEHOLDER_TRX_HISTORY_SUCCESS',
            payload: response.data
        });
        // redirect to page
        setErrorMessage(null)
        setSuccessMessage(`The Campaign Participant ${formData.name} successfully edited !!`)
        setIsLoading(false)
        // history.push("/stakeholder_transaction_historys");
        return response

    } catch (err) {
        console.error('In error editStakeholderTransactionHistory', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'EDIT_STAKEHOLDER_TRX_HISTORY_FAIL'
        });
        setIsLoading(false)
    }
}

export const addStakeholderTransactionHistory = (formData, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to login user
        const response = await API.addStakeholderTransactionHistoryApi(formData, headers);
        // dispatch to reducer
        dispatch({
            type: 'ADD_STAKEHOLDER_TRX_HISTORY_SUCCESS',
            payload: response.data
        });
        // redirect to page
        // history.push(`/stakeholder_transaction_history/${formData.participant_account_participant?.account_id}`);
        setErrorMessage(null)
        setSuccessMessage(`The Campaign Participant ${formData.name} successfully created !!, his password is sent to his email address`)
        setIsLoading(false)
        // return response

    } catch (err) {
        console.error('In error addStakeholderTransactionHistory', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'ADD_STAKEHOLDER_TRX_HISTORY_FAIL'
        });
        setIsLoading(false)
    }
}

export const getStakeholderTransactionHistories = (setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get stakeholder_transaction_historys
        const response = await API.getStakeholderTransactionHistoriesApi(headers);
        // dispatch to reducer
        dispatch({
            type: 'GET_CAMPAIGN_PARTICIPANTS_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`StakeholderTransactionHistories Fetched !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error getStakeholderTransactionHistories', err)
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

export const getStakeholderTransactionHistoryById =  (stakeholder_transaction_history_id, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get stakeholder_transaction_historys
        const response = await API.getStakeholderTransactionHistoryByIdApi(stakeholder_transaction_history_id, headers);
        // dispatch to reducer
        dispatch({
            type: 'GET_STAKEHOLDER_TRX_HISTORY_BY_ID_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`StakeholderTransactionHistory Fetched !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error getStakeholderTransactionHistoryById', err)
        // dispatch get error Action
        const { message } = err
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(err))
        // dispatch login fail
        dispatch({
            type: 'GET_STAKEHOLDER_TRX_HISTORY_BY_ID_FAIL'
        });
        setIsLoading(false)
    }
}

export const getStakeholderTransactionHistoriesByStakeholderId =  (stakeholder_id, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get stakeholders
        const response = await API.getStakeholderTransactionHistoriesByStakeholderIdApi(stakeholder_id, headers);
        // dispatch to reducer
        dispatch({
            type: 'GET_STAKEHOLDER_TRX_HISTORY_BY_ID_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`StakeholderTransactionHistory Fetched !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error getStakeholderTransactionHistoryByStakeholderId', err)
        // dispatch get error Action
        const { message } = err
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(err))
        // dispatch login fail
        dispatch({
            type: 'GET_STAKEHOLDER_TRX_HISTORY_BY_ID_FAIL'
        });
        setIsLoading(false)
    }
}
export const deleteStakeholderTransactionHistory = (stakeholder_transaction_history, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    const { participant_account_participant, _id: stakeholder_transaction_history_id } = stakeholder_transaction_history;
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get stakeholder_transaction_historys
        const response = await API.deleteStakeholderTransactionHistoryByIdApi(stakeholder_transaction_history_id, headers);
        // dispatch to reducer
        dispatch({
            type: 'DELETE_STAKEHOLDER_TRX_HISTORY_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`StakeholderTransactionHistories deleted !!`)
        setIsLoading(false)
        history.push(`/participant_accounts/${participant_account_participant?.account_id}`);

    } catch (err) {
        console.error('In error deleteStakeholderTransactionHistory', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'DELETE_STAKEHOLDER_TRX_HISTORY_FAIL'
        });
        setIsLoading(false)
    }
}


export const getStakeholderAccountHistoriesByQuery =  (query, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    console.log('-- getStakeholderAccountHistoriesByQuery query ', query)
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get stakeholders
        const response = await API.getStakeholderAccountHistoriesQueryApi(query, headers);
        // dispatch to reducer
        dispatch({
            type: 'GET_STAKEHOLDER_TRX_HISTORY_BY_QUERY_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`getStakeholderAccountHistoriesQuery Fetched !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error getStakeholderAccountHistoriesByQuery', err)
        // dispatch get error Action
        const { message } = err
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(err))
        // dispatch login fail
        dispatch({
            type: 'GET_STAKEHOLDER_TRX_HISTORY_BY_QUERY_FAIL'
        });
        setIsLoading(false)
    }
}
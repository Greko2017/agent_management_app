import { getErrors, getTokenInfo } from "../../actions/authActions";
import history from "../../history";
import API from "../../utils/API";

export const editBeneficiaryInstalmentHistory = (formData, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to login user
        const response = await API.editBeneficiaryInstalmentHistoryApi(formData, headers);
        // dispatch to reducer
        dispatch({
            type: 'EDIT_BENEFICIARY_INSTALMENT_HISTORY_SUCCESS',
            payload: response.data
        });
        // redirect to page
        setErrorMessage(null)
        setSuccessMessage(`The lead ${formData.first_name} successfully edited !!`)
        setIsLoading(false)
        // history.push(`/beneficiaries`);
        return response

    } catch (err) {
        console.error('In error editBeneficiaryInstalmentHistory', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'EDIT_BENEFICIARY_INSTALMENT_HISTORY_FAIL'
        });
        setIsLoading(false)
    }
}

export const addBeneficiaryInstalmentHistory = (formData, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to login user
        const response = await API.addBeneficiaryInstalmentHistoryApi(formData, headers);
        // dispatch to reducer
        dispatch({
            type: 'ADD_BENEFICIARY_INSTALMENT_HISTORY_SUCCESS',
            payload: response.data
        });
        // redirect to page
        history.push(`/beneficiaries/${formData.beneficiary._id}`);
        setErrorMessage(null)
        setSuccessMessage(`The lead ${formData.first_name} successfully created !!, his password is sent to his email address`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error addBeneficiaryInstalmentHistory', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'ADD_BENEFICIARY_INSTALMENT_HISTORY_FAIL'
        });
        setIsLoading(false)
    }
}


export const getBeneficiaryInstalmentHistories = (setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get 
        const response = await API.getBeneficiaryInstalmentHistoriesApi(headers);
        // dispatch to reducer
        dispatch({
            type: 'GET_BENEFICIARIES_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`Beneficiaries Fetched !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error getBeneficiaries', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'GET_BENEFICIARIES_FAIL'
        });
        setIsLoading(false)
    }
}

export const getBeneficiaryInstalmentHistoryById =  (beneficiary_instalment_history_id, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get 
        const response = await API.getBeneficiaryInstalmentHistoryByIdApi(beneficiary_instalment_history_id, headers);
        // dispatch to reducer
        dispatch({
            type: 'GET_BENEFICIARY_INSTALMENT_HISTORY_BY_ID_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`BeneficiaryInstalmentHistory Fetched !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error getBeneficiaryInstalmentHistoryById', err)
        // dispatch get error Action
        const { message } = err
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(err))
        // dispatch login fail
        dispatch({
            type: 'GET_BENEFICIARY_INSTALMENT_HISTORY_BY_ID_FAIL'
        });
        setIsLoading(false)
    }
}

export const getBeneficiaryInstalmentHistoriesByBeneficiaryId =  (beneficiary_id, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get 
        const response = await API.getBeneficiaryInstalmentHistoryByBeneficiaryIdApi(beneficiary_id, headers);
        // dispatch to reducer
        dispatch({
            type: 'GET_BENEFICIARY_INSTALMENT_HISTORY_BY_BENEFICIARY_ID_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`BeneficiaryInstalmentHistory Fetched !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error getBeneficiaryInstalmentHistoryById', err)
        // dispatch get error Action
        const { message } = err
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(err))
        // dispatch login fail
        dispatch({
            type: 'GET_BENEFICIARY_INSTALMENT_HISTORY_BY_BENEFICIARY_ID_FAIL'
        });
        setIsLoading(false)
    }
}

export const deleteBeneficiaryInstalmentHistory = (beneficiary_instalment_history_id, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get 
        const response = await API.deleteBeneficiaryInstalmentHistoryByIdApi(beneficiary_instalment_history_id, headers);
        // dispatch to reducer
        dispatch({
            type: 'DELETE_BENEFICIARY_INSTALMENT_HISTORY_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`Beneficiaries deleted !!`)
        setIsLoading(false)
        history.push(`/beneficiaries`);

    } catch (err) {
        console.error('In error deleteBeneficiaryInstalmentHistory', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'DELETE_BENEFICIARY_INSTALMENT_HISTORY_FAIL'
        });
        setIsLoading(false)
    }
}
import { getErrors, getTokenInfo } from "../../actions/authActions";
import history from "../../history";
import API from "../../utils/API";


export const getBeneficiaries = (setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        const response = await API.getBeneficiariesApi(headers);
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
        const { message } = err
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(err))
        // dispatch login fail
        dispatch({
            type: 'GET_BENEFICIARIES_FAIL'
        });
        setIsLoading(false)
    }
}

export const getBeneficiariesByParentId =  (parent_id, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get heads
        const response = await API.getBeneficiariesByParentIdApi(parent_id, headers);
        // dispatch to reducer
        dispatch({
            type: 'GET_BENEFICIARIES_BY_PARENT_ID_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`Beneficiaries Fetched !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error getBeneficiariesByParentId', err)
        // dispatch get error Action
        const { message } = err
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(err))
        // dispatch login fail
        dispatch({
            type: 'GET_BENEFICIARIES_BY_PARENT_ID_FAIL'
        });
        setIsLoading(false)
    }
}


export const getBeneficiaryById =  (beneficiary_id, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get centers
        const response = await API.getBeneficiaryByIdApi(beneficiary_id, headers);
        // dispatch to reducer
        dispatch({
            type: 'GET_BENEFICIARY_BY_ID_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`Beneficiary Fetched !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error getBeneficiaryById', err)
        // dispatch get error Action
        const { message } = err
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(err))
        // dispatch login fail
        dispatch({
            type: 'GET_BENEFICIARY_BY_ID_FAIL'
        });
        setIsLoading(false)
    }
}

export const addBeneficiary = (formData, setErrorMessage, setSuccessMessage, setIsLoading, in_collaborator_page) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to login user
        const response = await API.addBeneficiaryApi(formData, headers);
        // dispatch to reducer
        dispatch({
            type: 'ADD_BENEFICIARY_SUCCESS',
            payload: response.data
        });
        // redirect to page
        if (in_collaborator_page) {
            history.push(`/collaborators/${formData.parent_id}`);
        }else {
            history.push(`/beneficiaries/${response.data?._id || ''}`);
        }
        setErrorMessage(null)
        setSuccessMessage(`The Beneficiary ${formData.first_name} successfully created !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error addBeneficiary', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'ADD_BENEFICIARY_FAIL'
        });
        setIsLoading(false)
    }
}

export const editBeneficiary = (formData, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to login user
        const response = await API.editBeneficiaryApi(formData, headers);
        // dispatch to reducer
        dispatch({
            type: 'EDIT_BENEFICIARY_SUCCESS',
            payload: response.data
        });
        // redirect to page
        setErrorMessage(null)
        setSuccessMessage(`The Beneficiary ${formData.first_name} successfully edited !!`)
        setIsLoading(false)
        // history.push("/heads");
        return response

    } catch (err) {
        console.error('In error editBeneficiary', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'EDIT_BENEFICIARY_FAIL'
        });
        setIsLoading(false)
    }
}


export const deleteBeneficiary = (beneficiary_id, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get centers
        const response = await API.deleteBeneficiaryByIdApi(beneficiary_id, headers);
        // dispatch to reducer
        dispatch({
            type: 'DELETE_BENEFICIARY_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`Beneficiary deleted !!`)
        setIsLoading(false)
        history.push("/centers");

    } catch (err) {
        console.error('In error deleteBeneficiary', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'DELETE_BENEFICIARY_FAIL'
        });
        setIsLoading(false)
    }
}
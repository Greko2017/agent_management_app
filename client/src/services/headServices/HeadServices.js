import { getErrors, getTokenInfo } from "../../actions/authActions";
import history from "../../history";
import API from "../../utils/API";

export const editHead = (formData, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to login user
        const response = await API.editHeadApi(formData, headers);
        // dispatch to reducer
        dispatch({
            type: 'EDIT_HEAD_SUCCESS',
            payload: response.data
        });
        // redirect to page
        setErrorMessage(null)
        setSuccessMessage(`The lead ${formData.first_name} successfully edited !!`)
        setIsLoading(false)
        // history.push("/heads");
        return response

    } catch (err) {
        console.error('In error editHead', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'EDIT_HEAD_FAIL'
        });
        setIsLoading(false)
    }
}

export const addHead = (formData, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to login user
        const response = await API.addHeadApi(formData, headers);
        // dispatch to reducer
        dispatch({
            type: 'ADD_HEAD_SUCCESS',
            payload: response.data
        });
        // redirect to page
        history.push("/heads");
        setErrorMessage(null)
        setSuccessMessage(`The lead ${formData.first_name} successfully created !!, his password is sent to his email address`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error addHead', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'ADD_HEAD_FAIL'
        });
        setIsLoading(false)
    }
}


export const getHeads = (setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get heads
        const response = await API.getHeadsApi(headers);
        // dispatch to reducer
        dispatch({
            type: 'GET_HEADS_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`Leads Fetched !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error getHeads', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'GET_HEADS_FAIL'
        });
        setIsLoading(false)
    }
}

export const getHeadById =  (head_id, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get heads
        const response = await API.getHeadByIdApi(head_id, headers);
        // dispatch to reducer
        dispatch({
            type: 'GET_HEAD_BY_ID_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`Lead Fetched !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error getHeadById', err)
        // dispatch get error Action
        const { message } = err
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(err))
        // dispatch login fail
        dispatch({
            type: 'GET_HEAD_BY_ID_FAIL'
        });
        setIsLoading(false)
    }
}

export const deleteHead = (head_id, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get heads
        const response = await API.deleteHeadByIdApi(head_id, headers);
        // dispatch to reducer
        dispatch({
            type: 'DELETE_HEAD_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`Leads deleted !!`)
        setIsLoading(false)
        history.push("/heads");

    } catch (err) {
        console.error('In error deleteHead', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'DELETE_HEAD_FAIL'
        });
        setIsLoading(false)
    }
}
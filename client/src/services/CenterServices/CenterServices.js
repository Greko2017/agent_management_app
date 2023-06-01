import { getErrors, getTokenInfo } from "../../actions/authActions";
import history from "../../history";
import API from "../../utils/API";

export const editCenter = (formData, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to login user
        const response = await API.editCenterApi(formData, headers);
        // dispatch to reducer
        dispatch({
            type: 'EDIT_CENTER_SUCCESS',
            payload: response.data
        });
        // redirect to page
        setErrorMessage(null)
        setSuccessMessage(`The lead ${formData.first_name} successfully edited !!`)
        setIsLoading(false)
        // history.push("/centers");
        return response

    } catch (err) {
        console.error('In error editCenter', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'EDIT_CENTER_FAIL'
        });
        setIsLoading(false)
    }
}

export const addCenter = (formData, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to login user
        const response = await API.addCenterApi(formData, headers);
        // dispatch to reducer
        dispatch({
            type: 'ADD_CENTER_SUCCESS',
            payload: response.data
        });
        // redirect to page
        history.push("/centers");
        setErrorMessage(null)
        setSuccessMessage(`The lead ${formData.first_name} successfully created !!, his password is sent to his email address`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error addCenter', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'ADD_CENTER_FAIL'
        });
        setIsLoading(false)
    }
}

export const getQueryCenters = (query, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get centers
        const response = await API.getQueryCentersApi(query, headers);
        // dispatch to reducer
        dispatch({
            type: 'GET_CENTERS_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`Centers Fetched !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error getCenters', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'GET_CENTERS_FAIL'
        });
        setIsLoading(false)
    }
}


export const getCenters = (setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get centers
        const response = await API.getCentersApi(headers);
        // dispatch to reducer
        dispatch({
            type: 'GET_CENTERS_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`Centers Fetched !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error getCenters', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'GET_CENTERS_FAIL'
        });
        setIsLoading(false)
    }
}

export const getCenterById =  (center_id, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get centers
        const response = await API.getCenterByIdApi(center_id, headers);
        // dispatch to reducer
        dispatch({
            type: 'GET_CENTER_BY_ID_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`Center Fetched !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error getCenterById', err)
        // dispatch get error Action
        const { message } = err
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(err))
        // dispatch login fail
        dispatch({
            type: 'GET_CENTER_BY_ID_FAIL'
        });
        setIsLoading(false)
    }
}

export const deleteCenter = (center_id, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get centers
        const response = await API.deleteCenterByIdApi(center_id, headers);
        // dispatch to reducer
        dispatch({
            type: 'DELETE_CENTER_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`Centers deleted !!`)
        setIsLoading(false)
        history.push("/centers");

    } catch (err) {
        console.error('In error deleteCenter', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'DELETE_CENTER_FAIL'
        });
        setIsLoading(false)
    }
}
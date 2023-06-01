import { getErrors, getTokenInfo } from "../../actions/authActions";
import history from "../../history";
import API from "../../utils/API";

export const editInstalment = (formData, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to login user
        const response = await API.editInstalmentApi(formData, headers);
        // dispatch to reducer
        dispatch({
            type: 'EDIT_INSTALMENT_SUCCESS',
            payload: response.data
        });
        // redirect to page
        setErrorMessage(null)
        setSuccessMessage(`The lead ${formData.first_name} successfully edited !!`)
        setIsLoading(false)
        // history.push("/installments");
        return response

    } catch (err) {
        console.error('In error editInstalment', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'EDIT_INSTALMENT_FAIL'
        });
        setIsLoading(false)
    }
}

export const addInstalment = (formData, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to login user
        const response = await API.addInstalmentApi(formData, headers);
        // dispatch to reducer
        dispatch({
            type: 'ADD_INSTALMENT_SUCCESS',
            payload: response.data
        });
        // redirect to page
        history.push("/installments");
        setErrorMessage(null)
        setSuccessMessage(`instalment ${formData.name} successfully created !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error addInstalment', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'ADD_INSTALMENT_FAIL'
        });
        setIsLoading(false)
    }
}


export const getInstallments = (setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get installments
        const response = await API.getInstallmentsApi(headers);
        // dispatch to reducer
        dispatch({
            type: 'GET_CENTERS_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`Instalments Fetched !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error getInstalments', err)
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

export const getInstalmentById =  (instalment_id, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get installments
        const response = await API.getInstalmentByIdApi(instalment_id, headers);
        // dispatch to reducer
        dispatch({
            type: 'GET_INSTALMENT_BY_ID_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`Instalment Fetched !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error getInstalmentById', err)
        // dispatch get error Action
        const { message } = err
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(err))
        // dispatch login fail
        dispatch({
            type: 'GET_INSTALMENT_BY_ID_FAIL'
        });
        setIsLoading(false)
    }
}

export const deleteInstalment = (instalment_id, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get installments
        const response = await API.deleteInstalmentByIdApi(instalment_id, headers);
        // dispatch to reducer
        dispatch({
            type: 'DELETE_INSTALMENT_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`Instalments deleted !!`)
        setIsLoading(false)
        history.push("/installments");

    } catch (err) {
        console.error('In error deleteInstalment', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'DELETE_INSTALMENT_FAIL'
        });
        setIsLoading(false)
    }
}


export const getInstalmentLinesByInstalmentId =  (parent_id, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get heads
        const response = await API.getInstalmentLinesByInstalmentIdApi(parent_id, headers);
        // dispatch to reducer
        dispatch({
            type: 'GET_COLLABORATORS_BY_PARENT_ID_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`Collaborators Fetched !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error getInstalmentLinesByInstalmentId', err)
        // dispatch get error Action
        const { message } = err
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(err))
        // dispatch login fail
        dispatch({
            type: 'GET_COLLABORATORS_BY_PARENT_ID_FAIL'
        });
        setIsLoading(false)
    }
}

export const getInstalmentLines = (setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get installments
        const response = await API.getInstalmentLinesApi(headers);
        // dispatch to reducer
        dispatch({
            type: 'GET_INSTALMENT_LINES_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`Instalments Fetched !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error getInstalmentLines', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'GET_INSTALMENT_LINES_FAIL'
        });
        setIsLoading(false)
    }
}



export const editInstalmentLine = (formData, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to login user
        const response = await API.editInstalmentLineApi(formData, headers);
        // dispatch to reducer
        dispatch({
            type: 'EDIT_INSTALMENT_LINE_SUCCESS',
            payload: response.data
        });
        // redirect to page
        setErrorMessage(null)
        setSuccessMessage(`The lead ${formData.name} successfully edited !!`)
        setIsLoading(false)
        // history.push("/installments");
        return response

    } catch (err) {
        console.error('In error editInstalmentLine', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'EDIT_INSTALMENT_LINE_FAIL'
        });
        setIsLoading(false)
    }
}

export const addInstalmentLine = (formData, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to login user
        const response = await API.addInstalmentLineApi(formData, headers);
        // dispatch to reducer
        dispatch({
            type: 'ADD_INSTALMENT_LINE_SUCCESS',
            payload: response.data
        });
        // redirect to page
        history.push(`/installments/${formData.parent._id}`);
        setErrorMessage(null)
        setSuccessMessage(`instalment ${formData.name} successfully created !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error addInstalmentLine', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'ADD_INSTALMENT_LINE_FAIL'
        });
        setIsLoading(false)
    }
}

export const getInstalmentLineById =  (instalment_id, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get installments
        const response = await API.getInstalmentLineByIdApi(instalment_id, headers);
        // dispatch to reducer
        dispatch({
            type: 'GET_INSTALMENT_LINE_BY_ID_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`Instalment Line Fetched !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error getInstalmentLineById', err)
        // dispatch get error Action
        const { message } = err
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(err))
        // dispatch login fail
        dispatch({
            type: 'GET_INSTALMENT_LINE_BY_ID_FAIL'
        });
        setIsLoading(false)
    }
}

export const deleteInstalmentLine = (instalment_id, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get installments
        const response = await API.deleteInstalmentLineByIdApi(instalment_id, headers);
        // dispatch to reducer
        dispatch({
            type: 'DELETE_INSTALMENT_LINE_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`Instalments deleted !!`)
        setIsLoading(false)
        history.push("/instalment_lines");

    } catch (err) {
        console.error('In error deleteInstalmentLine', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'DELETE_INSTALMENT_LINE_FAIL'
        });
        setIsLoading(false)
    }
}
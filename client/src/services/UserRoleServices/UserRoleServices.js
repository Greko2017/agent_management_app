import { getErrors, getTokenInfo } from "../../actions/authActions";
import history from "../../history";
import API from "../../utils/API";

export const editUserRole = (formData, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to login user
        const response = await API.editUserRoleApi(formData, headers);
        // dispatch to reducer
        dispatch({
            type: 'EDIT_USER_ROLE_SUCCESS',
            payload: response.data
        });
        // redirect to page
        setErrorMessage(null)
        setSuccessMessage(`The lead ${formData.first_name} successfully edited !!`)
        setIsLoading(false)
        // history.push("/user_roles");
        return response

    } catch (err) {
        console.error('In error editUserRole', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'EDIT_USER_ROLE_FAIL'
        });
        setIsLoading(false)
    }
}

export const addUserRole = (formData, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to login user
        const response = await API.addUserRoleApi(formData, headers);
        // dispatch to reducer
        dispatch({
            type: 'ADD_USER_ROLE_SUCCESS',
            payload: response.data
        });
        // redirect to page
        history.push("/user_roles");
        setErrorMessage(null)
        setSuccessMessage(`The lead ${formData.first_name} successfully created !!, his password is sent to his email address`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error addUserRole', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'ADD_USER_ROLE_FAIL'
        });
        setIsLoading(false)
    }
}


export const getUserRoles = (setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get user_roles
        const response = await API.getUserRolesApi(headers);
        // dispatch to reducer
        dispatch({
            type: 'GET_CENTERS_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`UserRoles Fetched !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error getUserRoles', err)
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

export const getUserRoleById =  (user_role_id, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get user_roles
        const response = await API.getUserRoleByIdApi(user_role_id, headers);
        // dispatch to reducer
        dispatch({
            type: 'GET_USER_ROLE_BY_ID_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`UserRole Fetched !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error getUserRoleById', err)
        // dispatch get error Action
        const { message } = err
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(err))
        // dispatch login fail
        dispatch({
            type: 'GET_USER_ROLE_BY_ID_FAIL'
        });
        setIsLoading(false)
    }
}

export const deleteUserRole = (user_role_id, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get user_roles
        const response = await API.deleteUserRoleByIdApi(user_role_id, headers);
        // dispatch to reducer
        dispatch({
            type: 'DELETE_USER_ROLE_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`UserRoles deleted !!`)
        setIsLoading(false)
        history.push("/user_roles");

    } catch (err) {
        console.error('In error deleteUserRole', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'DELETE_USER_ROLE_FAIL'
        });
        setIsLoading(false)
    }
}
import { getErrors, getTokenInfo } from "../../actions/authActions";
import history from "../../history";
import API from "../../utils/API";

export const editUserRolePermission = (formData, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to login user
        const response = await API.editUserRolePermissionApi(formData, headers);
        // dispatch to reducer
        dispatch({
            type: 'EDIT_USER_ROLE_PERMISSION_SUCCESS',
            payload: response.data
        });
        // redirect to page
        setErrorMessage(null)
        setSuccessMessage(`The lead ${formData.first_name} successfully edited !!`)
        setIsLoading(false)
        // history.push("/user_roles");
        return response

    } catch (err) {
        console.error('In error editUserRolePermission', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'EDIT_USER_ROLE_PERMISSION_FAIL'
        });
        setIsLoading(false)
    }
}

export const addUserRolePermission = (formData, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to login user
        const response = await API.addUserRolePermissionApi(formData, headers);
        // dispatch to reducer
        dispatch({
            type: 'ADD_USER_ROLE_PERMISSION_SUCCESS',
            payload: response.data
        });
        // redirect to page
        // history.push(`/user_roles/${formData.role_id}`);
        setErrorMessage(null)
        setSuccessMessage(`The lead ${formData.first_name} successfully created !!, his password is sent to his email address`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error addUserRolePermission', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'ADD_USER_ROLE_PERMISSION_FAIL'
        });
        setIsLoading(false)
    }
}


export const getUserRolePermissions = (setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get user_roles
        const response = await API.getUserRolePermissionsApi(headers);
        // dispatch to reducer
        dispatch({
            type: 'GET_USER_ROLE_PERMISSION_PERMISSIONS_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`UserRolePermissions Fetched !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error getUserRolePermissions', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'GET_USER_ROLE_PERMISSION_PERMISSIONS_FAIL'
        });
        setIsLoading(false)
    }
}

export const getUserRolePermissionById =  (user_role_id, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get user_roles
        const response = await API.getUserRolePermissionByIdApi(user_role_id, headers);
        // dispatch to reducer
        dispatch({
            type: 'GET_USER_ROLE_PERMISSION_BY_ID_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`UserRolePermission Fetched !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error getUserRolePermissionById', err)
        // dispatch get error Action
        const { message } = err
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(err))
        // dispatch login fail
        dispatch({
            type: 'GET_USER_ROLE_PERMISSION_BY_ID_FAIL'
        });
        setIsLoading(false)
    }
}


export const getUserRolePermissionByRoleId =  (user_role_id, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get user_roles
        const response = await API.getUserRolePermissionByRoleIdApi(user_role_id, headers);
        // dispatch to reducer
        dispatch({
            type: 'GET_USER_ROLE_PERMISSION_BY_ROLE_ID_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`UserRolePermission Fetched !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error getUserRolePermissionById', err)
        // dispatch get error Action
        const { message } = err
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(err))
        // dispatch login fail
        dispatch({
            type: 'GET_USER_ROLE_PERMISSION_BY_ROLE_ID_FAIL'
        });
        setIsLoading(false)
    }
}

export const deleteUserRolePermission = (user_role_id, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get user_roles
        const response = await API.deleteUserRolePermissionByIdApi(user_role_id, headers);
        // dispatch to reducer
        dispatch({
            type: 'DELETE_USER_ROLE_PERMISSION_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`UserRolePermissions deleted !!`)
        setIsLoading(false)
        history.push("/user_roles");

    } catch (err) {
        console.error('In error deleteUserRolePermission', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'DELETE_USER_ROLE_PERMISSION_FAIL'
        });
        setIsLoading(false)
    }
}
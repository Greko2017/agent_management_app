import { getErrors, getTokenInfo } from "../../actions/authActions";
import history from "../../history";
import API from "../../utils/API";

export const editCollaborator = (formData, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to login user
        const response = await API.editCollaboratorApi(formData, headers);
        // dispatch to reducer
        dispatch({
            type: 'EDIT_COLLABORATOR_SUCCESS',
            payload: response.data
        });
        // redirect to page
        setErrorMessage(null)
        setSuccessMessage(`The collaborator ${formData.first_name} successfully edited !!`)
        setIsLoading(false)
        // history.push("/heads");
        return response

    } catch (err) {
        console.error('In error editCollaborator', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'EDIT_COLLABORATOR_FAIL'
        });
        setIsLoading(false)
    }
}

export const addCollaborator = (formData, setErrorMessage, setSuccessMessage, setIsLoading, in_collaborator_page) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to login user
        const response = await API.addCollaboratorApi(formData, headers);
        // dispatch to reducer
        dispatch({
            type: 'ADD_COLLABORATOR_SUCCESS',
            payload: response.data
        });
        // redirect to page
        if (in_collaborator_page) {
            history.push(`/collaborators`);
        }else {
            history.push(`/heads/${formData.parent_id}`);
        }
        setErrorMessage(null)
        setSuccessMessage(`The Collaborator ${formData.first_name} successfully created !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error addCollaborator', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'ADD_COLLABORATOR_FAIL'
        });
        setIsLoading(false)
    }
}


export const getCollaborators = (setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get heads
        const response = await API.getCollaboratorsApi(headers);
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
        console.error('In error getCollaborators', err)
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

export const getCollaboratorsByParentId =  (parent_id, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get heads
        const response = await API.getCollaboratorsByIParentApi(parent_id, headers);
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
        console.error('In error getCollaboratorsByParentId', err)
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

export const deleteCollaborator = (collaborator_id, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get heads
        const response = await API.deleteCollaboratorByIdApi(collaborator_id, headers);
        // dispatch to reducer
        dispatch({
            type: 'DELETE_COLLABORATOR_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`Leads deleted !!`)
        setIsLoading(false)
        history.push(`/collaborators`);

    } catch (err) {
        console.error('In error deleteCollaborator', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'DELETE_COLLABORATOR_FAIL'
        });
        setIsLoading(false)
    }
}

export const getCollaboratorById =  (collaborator_id, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get heads
        const response = await API.getCollaboratorByIdApi(collaborator_id, headers);
        // dispatch to reducer
        dispatch({
            type: 'GET_COLLABORATOR_BY_ID_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`Lead Fetched !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error getCollaboratorById', err)
        // dispatch get error Action
        const { message } = err
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(err))
        // dispatch login fail
        dispatch({
            type: 'GET_COLLABORATOR_BY_ID_FAIL'
        });
        setIsLoading(false)
    }
}
import { getErrors, getTokenInfo } from "../../actions/authActions";
import history from "../../history";
import API from "../../utils/API";

export const editRewardLine = (formData, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to login user
        const response = await API.editRewardLineApi(formData, headers);
        // dispatch to reducer
        dispatch({
            type: 'EDIT_REWARD_LINE_SUCCESS',
            payload: response.data
        });
        // redirect to page
        setErrorMessage(null)
        setSuccessMessage(`The lead ${formData.name} successfully edited !!`)
        setIsLoading(false)
        // history.push("/reward_lines");
        return response

    } catch (err) {
        console.error('In error editRewardLine', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'EDIT_REWARD_LINE_FAIL'
        });
        setIsLoading(false)
    }
}

export const addRewardLine = (formData, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to login user
        const response = await API.addRewardLineApi(formData, headers);
        // dispatch to reducer
        dispatch({
            type: 'ADD_REWARD_LINE_SUCCESS',
            payload: response.data
        });
        // redirect to page
        setErrorMessage(null)
        setSuccessMessage(`The lead ${formData.name} successfully created !!`)
        setIsLoading(false)
        history.push(`/rewards/${formData.parent?._id}`);
        return response

    } catch (err) {
        console.error('In error addRewardLine', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'ADD_REWARD_LINE_FAIL'
        });
        setIsLoading(false)
    }
}


export const getRewardLines = (setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get reward_lines
        const response = await API.getRewardLinesApi(headers);
        // dispatch to reducer
        dispatch({
            type: 'GET_CENTERS_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`RewardLines Fetched !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error getRewardLines', err)
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

export const getRewardLineById =  (reward_line_id, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get reward_lines
        const response = await API.getRewardLineByIdApi(reward_line_id, headers);
        // dispatch to reducer
        dispatch({
            type: 'GET_REWARD_LINE_BY_ID_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`RewardLine Fetched !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error getRewardLineById', err)
        // dispatch get error Action
        const { message } = err
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(err))
        // dispatch login fail
        dispatch({
            type: 'GET_REWARD_LINE_BY_ID_FAIL'
        });
        setIsLoading(false)
    }
}

export const deleteRewardLine = (reward_line, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    const { _id: reward_line_id, parent} = reward_line
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get reward_lines
        const response = await API.deleteRewardLineByIdApi(reward_line_id, headers);
        // dispatch to reducer
        dispatch({
            type: 'DELETE_REWARD_LINE_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`RewardLines deleted !!`)
        setIsLoading(false)
        history.push(`/rewards/${parent._id}`);

    } catch (err) {
        console.error('In error deleteRewardLine', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'DELETE_REWARD_LINE_FAIL'
        });
        setIsLoading(false)
    }
}

export const getRewardLinesByParentId = (parent_id, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get heads
        const response = await API.getRewardLinesByParentIdApi(parent_id, headers);
        // dispatch to reducer
        dispatch({
            type: 'GET_REWARD_LINE_BY_PARENT_ID_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`RewardLines Fetched !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error getRewardLinesByParentId', err)
        // dispatch get error Action
        const { message } = err
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(err))
        // dispatch login fail
        dispatch({
            type: 'GET_REWARD_LINE_BY_PARENT_ID_FAIL'
        });
        setIsLoading(false)
    }
}
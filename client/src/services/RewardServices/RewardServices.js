import { getErrors, getTokenInfo } from "../../actions/authActions";
import history from "../../history";
import API from "../../utils/API";

export const editReward = (formData, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to login user
        const response = await API.editRewardApi(formData, headers);
        // dispatch to reducer
        dispatch({
            type: 'EDIT_REWARD_SUCCESS',
            payload: response.data
        });
        // redirect to page
        setErrorMessage(null)
        setSuccessMessage(`The lead ${formData.name} successfully edited !!`)
        setIsLoading(false)
        // history.push("/rewards");
        return response

    } catch (err) {
        console.error('In error editReward', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'EDIT_REWARD_FAIL'
        });
        setIsLoading(false)
    }
}

export const addReward = (formData, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to login user
        const response = await API.addRewardApi(formData, headers);
        // dispatch to reducer
        dispatch({
            type: 'ADD_REWARD_SUCCESS',
            payload: response.data
        });
        // redirect to page
        setErrorMessage(null)
        setSuccessMessage(`The lead ${formData.name} successfully created !!`)
        setIsLoading(false)
        history.push("/rewards");
        return response

    } catch (err) {
        console.error('In error addReward', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'ADD_REWARD_FAIL'
        });
        setIsLoading(false)
    }
}


export const getRewards = (setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get rewards
        const response = await API.getRewardsApi(headers);
        // dispatch to reducer
        dispatch({
            type: 'GET_CENTERS_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`Rewards Fetched !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error getRewards', err)
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

export const getRewardById =  (reward_id, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get rewards
        const response = await API.getRewardByIdApi(reward_id, headers);
        // dispatch to reducer
        dispatch({
            type: 'GET_REWARD_BY_ID_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`Reward Fetched !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error getRewardById', err)
        // dispatch get error Action
        const { message } = err
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(err))
        // dispatch login fail
        dispatch({
            type: 'GET_REWARD_BY_ID_FAIL'
        });
        setIsLoading(false)
    }
}

export const deleteReward = (reward_id, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get rewards
        const response = await API.deleteRewardByIdApi(reward_id, headers);
        // dispatch to reducer
        dispatch({
            type: 'DELETE_REWARD_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`Rewards deleted !!`)
        setIsLoading(false)
        history.push("/rewards");

    } catch (err) {
        console.error('In error deleteReward', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'DELETE_REWARD_FAIL'
        });
        setIsLoading(false)
    }
}
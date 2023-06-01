import { getErrors, getTokenInfo } from "../../actions/authActions";
import history from "../../history";
import API from "../../utils/API";

export const editCampaign = (formData, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to login user
        const response = await API.editCampaignApi(formData, headers);
        // dispatch to reducer
        dispatch({
            type: 'EDIT_CAMPAIGN_SUCCESS',
            payload: response.data
        });
        // redirect to page
        setErrorMessage(null)
        setSuccessMessage(`The lead ${formData.first_name} successfully edited !!`)
        setIsLoading(false)
        // history.push("/campaigns");
        return response

    } catch (err) {
        console.error('In error editCampaign', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'EDIT_CAMPAIGN_FAIL'
        });
        setIsLoading(false)
    }
}

export const addCampaign = (formData, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to login user
        const response = await API.addCampaignApi(formData, headers);
        // dispatch to reducer
        dispatch({
            type: 'ADD_CAMPAIGN_SUCCESS',
            payload: response.data
        });
        // redirect to page
        history.push("/campaigns");
        setErrorMessage(null)
        setSuccessMessage(`The lead ${formData.first_name} successfully created !!, his password is sent to his email address`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error addCampaign', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'ADD_CAMPAIGN_FAIL'
        });
        setIsLoading(false)
    }
}


export const getCampaigns = (query, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get campaigns
        const response = await API.getCampaignsApi(query, headers);
        // dispatch to reducer
        dispatch({
            type: 'GET_CENTERS_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`Campaigns Fetched !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error getCampaigns', err)
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

export const getCampaignById =  (campaign_id, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get campaigns
        const response = await API.getCampaignByIdApi(campaign_id, headers);
        // dispatch to reducer
        dispatch({
            type: 'GET_CAMPAIGN_BY_ID_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`Campaign Fetched !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error getCampaignById', err)
        // dispatch get error Action
        const { message } = err
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(err))
        // dispatch login fail
        dispatch({
            type: 'GET_CAMPAIGN_BY_ID_FAIL'
        });
        setIsLoading(false)
    }
}

export const deleteCampaign = (campaign_id, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get campaigns
        const response = await API.deleteCampaignByIdApi(campaign_id, headers);
        // dispatch to reducer
        dispatch({
            type: 'DELETE_CAMPAIGN_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`Campaigns deleted !!`)
        setIsLoading(false)
        history.push("/campaigns");

    } catch (err) {
        console.error('In error deleteCampaign', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'DELETE_CAMPAIGN_FAIL'
        });
        setIsLoading(false)
    }
}
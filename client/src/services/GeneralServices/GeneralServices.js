import { getErrors, getTokenInfo } from "../../actions/authActions";
import API from "../../utils/API";


// Action to load current user
export const getGenerals = () => async (dispatch, getState) => {

    try {
        // call getTokenImfo funtion and store content (geader information) to headers
        const headers = getTokenInfo(getState);
        // send request to server side and pass token information in headers to verify token
        const res = await API.loadGenerals(headers);
        // console.log('--- getGenerals res', res)
        return res

    } catch (err) {
        // dispatch Auth error
        dispatch(getErrors(err.response.data))
        dispatch({
            type: 'GENERALS_LOADING_ERROR'
        })
    }
}


export const getGeneralsGeneric = (query) => async (dispatch, getState) => {

    try {
        // call getTokenImfo funtion and store content (geader information) to headers
        const headers = getTokenInfo(getState);
        // send request to server side and pass token information in headers to verify token
        const res = await API.getGeneralsApis({query}, headers);
        // console.log('--- getGenerals res', res)
        return res

    } catch (err) {
        // dispatch Auth error
        dispatch(getErrors(err.response.data))
        dispatch({
            type: 'GENERALS_LOADING_ERROR'
        })
    }
}

export const editGeneralsGeneric = (body) => async (dispatch, getState) => {

    try {
        // call getTokenImfo funtion and store content (geader information) to headers
        const headers = getTokenInfo(getState);
        // send request to server side and pass token information in headers to verify token
        const res = await API.editGeneralsGenericApis(body, headers);
        // console.log('--- getGenerals res', res)
        return res

    } catch (err) {
        // dispatch Auth error
        dispatch(getErrors(err.response.data))
        dispatch({
            type: 'GENERALS_EDITING_ERROR'
        })
    }
}
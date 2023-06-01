import { getErrors, getTokenInfo } from "../../actions/authActions";
import history from "../../history";
import API from "../../utils/API";

export const getCashierCenters = (query, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get cashier centers
        const response = await API.getCashierCentersByQueryApi(query, headers);
        // dispatch to reducer
        dispatch({
            type: 'GET_CASHIER_CENTERS_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`Cashier Centers Fetched !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error getCashierCenters', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'GET_CASHIER_CENTERS_FAIL'
        });
        setIsLoading(false)
    }
}

export const getCashierCenterById =  (cashier_center_id, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to get cashier centers
        const response = await API.getCashierCenterByIdApi(cashier_center_id, headers);
        // dispatch to reducer
        dispatch({
            type: 'GET_CASHIER_CENTER_BY_ID_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`Cashier Center Fetched !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error getCashierCenterById', err)
        // dispatch get error Action
        const { message } = err
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(err))
        // dispatch login fail
        dispatch({
            type: 'GET_CASHIER_CENTER_BY_ID_FAIL'
        });
        setIsLoading(false)
    }
}

export const createCashierCenter = (formData, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);
        // send request to server side to create cashier center
        const response = await API.createCashierCenterApi(formData, headers);
        // dispatch to reducer
        dispatch({
            type: 'CREATE_CASHIER_CENTER_SUCCESS',
            payload: response.data
        });
        setErrorMessage(null)
        setSuccessMessage(`Cashier Center created !!`)
        setIsLoading(false)
        return response

    } catch (err) {
        console.error('In error createCashierCenter', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'CREATE_CASHIER_CENTER_FAIL'
        });
        setIsLoading(false)
    }
}

export const updateCashierCenter = (formData, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    const {_id : cashier_center_id} = formData;
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);

        // Check if the cashier center id is valid
        if (!cashier_center_id) {
            setErrorMessage("Cashier center id is not valid");
            setIsLoading(false);
            return;
        }

        // Update the cashier center in the database
        const response = await API.updateCashierCenterApi(formData, cashier_center_id, headers);

        // Dispatch a `UPDATE_CASHIER_CENTER_SUCCESS` action to the reducer
        dispatch({
            type: 'UPDATE_CASHIER_CENTER_SUCCESS',
            payload: response.data
        });

        // Set the `setErrorMessage` to `null` and the `setSuccessMessage` to `Cashier Center updated`
        setErrorMessage(null);
        setSuccessMessage(`Cashier Center updated`);
        setIsLoading(false);

    } catch (err) {
        console.error('In error updateCashierCenter', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'UPDATE_CASHIER_CENTER_FAIL'
        });
        setIsLoading(false)
    }
}
export const deleteCashierCenter = (cashier_center_id, setErrorMessage, setSuccessMessage, setIsLoading) => async (dispatch, getState) => {
    try {
        setIsLoading(true)
        const headers = getTokenInfo(getState);

        // Check if the cashier center id is valid
        if (!cashier_center_id) {
            setErrorMessage("Cashier center id is not valid");
            setIsLoading(false);
            return;
        }

        // Delete the cashier center from the database
        const response = await API.deleteCashierCenterByIdApi(cashier_center_id, headers);

        // Dispatch a `DELETE_CASHIER_CENTER_SUCCESS` action to the reducer
        dispatch({
            type: 'DELETE_CASHIER_CENTER_SUCCESS',
            payload: response.data
        });

        // Set the `setErrorMessage` to `null` and the `setSuccessMessage` to `Cashier Center deleted`
        setErrorMessage(null);
        setSuccessMessage(`Cashier Center deleted`);
        setIsLoading(false);

    } catch (err) {
        console.error('In error deleteCashierCenter', err)
        // dispatch get error Action
        const { message } = err.response.data
        setSuccessMessage(null)
        setErrorMessage(message)
        dispatch(getErrors(message))
        // dispatch login fail
        dispatch({
            type: 'DELETE_CASHIER_CENTER_FAIL'
        });
        setIsLoading(false)
    }
};
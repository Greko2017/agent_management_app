import {
    PERMISSIONS_PROCESS_FAIL,
    PERMISSIONS_PROCESS_SUCCESS,
    USER_LOADED,
    LOGOUT_SUCCESS,
    LOGIN_SUCCESS
} from "../actions/types";

const initialState = {
    role: null,
    permissions: [],
}

export default (state = initialState, action) => {

    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                permissions: action.payload.permissions,
                role: action.payload.role,
            };
        case PERMISSIONS_PROCESS_FAIL:
        case USER_LOADED:
            return {
                ...state,
                permissions: action.payload.permissions,
                role: action.payload.role,
            };
        case LOGOUT_SUCCESS:
            return {
                role: null,
                permissions: [],
            };
        case PERMISSIONS_PROCESS_SUCCESS:
        default:
            return state
    }
}
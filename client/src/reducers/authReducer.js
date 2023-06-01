import {
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    REGISTER_FAIL,
    LOGIN_FAIL,
    AUTH_ERROR,
    USER_LOADED,
    LOGOUT_SUCCESS
} from "../actions/types";

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    currentUser: null,
    permissions: [],
    role: null
}
// reducer to handle auth Actions
export default (state = initialState, action) => {

    switch (action.type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem("token", action.payload.token)
            return {
                ...state,
                token: action.payload.token,
                currentUser: { email: action.payload.email, _id: action.payload._id, parent_id: action.payload.parent_id },
                isAuthenticated: true,
                permissions: action.payload.permissions,
                role: action.payload.role,
            };
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case LOGOUT_SUCCESS:
            localStorage.removeItem("token")
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                currentUser: null,
                permissions: [],
                role: null,
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                currentUser: action.payload,                
                permissions: action.payload.permissions,
                role: action.payload.role,
            }
        default:
            return state
    }
}


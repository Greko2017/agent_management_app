import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import permissionReducer from "./permissionReducer";

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    permission: permissionReducer,
    form: formReducer
})
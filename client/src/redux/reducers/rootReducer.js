import {combineReducers} from 'redux'
import profileReducer from "./profileReducer";
import authReducer from "./authReducer";

export const rootReducer = combineReducers({
    profile: profileReducer,
    auth: authReducer
})

import {UPDATE_UID} from "../types";

const defaultState = {
    loggedIn: false,
    uid: undefined,
    isLoading: false
}

export default function authReducer(state = defaultState, action){
    switch (action.type){
        default:
            return state
    }
}
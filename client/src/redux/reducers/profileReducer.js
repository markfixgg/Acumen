import {UPDATE_UID, UPDATE_USER_PROFILE} from "../types";

const defaultState = {
    uid: null,
    displayName: null,
    notifications: [],
    bio: {
        age: null,
        location: null,
        occupation: null,
        gender: null
    },
    isFetching: true
}

export default function profileReducer(state = defaultState, action) {
    switch (action.type){
        case UPDATE_UID:
            return {
                ...state,
                uid: action.payload.uid
            }
        case UPDATE_USER_PROFILE:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}
import {UPDATE_UID} from "../types";

export const update_uid = (uid) => {
    return {
        type: UPDATE_UID,
        payload: {uid}
    }
}

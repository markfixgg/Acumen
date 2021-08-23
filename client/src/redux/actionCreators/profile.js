import firebase from "../../firebase/firebase";
import {instance} from "../../helpers/Utils";
import {updateUserProfile} from "../actions/profileActions";

export const fetchUserProfile = async (uid, dispatch) => {
    const JWT = await firebase.auth().currentUser.getIdToken();
    if (!JWT) return console.log({success: false, error: `Can't get jwt token`})

    const response = await instance.get(`/users/${uid}`, {
        headers: {
            Authorization: `Bearer ${JWT}`
        }
    })

    if (!response.data.user) return console.log({success: false, error: "No information about user", response})

    dispatch(updateUserProfile({
        ...response.data.user,
        displayName: response.data.user.firstName + " " + response.data.user.lastName
    }));
}

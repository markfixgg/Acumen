import {createContext, useEffect, useState} from "react";
import firebase from '../firebase/firebase'
import {useDispatch} from "react-redux";
import {fetchUserProfile} from "../redux/actionCreators/profile";

export const UserContext = createContext({user: null});

const UserProvider = ({children}) => {
    const [userState, setUserState] = useState({})
    const dispatch = useDispatch()

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (userAuth) => {
            if (userAuth?.uid) {
                await fetchUserProfile(userAuth?.uid, dispatch)
            }

            setUserState({
                user: userAuth
            })
        });
    }, [])

    return (
        <UserContext.Provider value={userState.user}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider

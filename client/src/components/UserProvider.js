import {createContext, useEffect, useState} from "react";
import firebase from '../firebase/firebase'
export const UserContext = createContext({ user: null });

const UserProvider = ({children}) => {
        const [userState, setUserState] = useState({})

        useEffect(()=> {
            firebase.auth().onAuthStateChanged((userAuth) => {
                console.log(userAuth)
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
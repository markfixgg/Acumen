import {createContext, useEffect, useState} from "react";
import firebase from '../firebase/firebase'
import {update_uid} from "../redux/actions/authActions";
import {useDispatch} from "react-redux";
import axios from "axios";
import {instance} from "../helpers/Utils";
export const UserContext = createContext({ user: null });

const UserProvider = ({children}) => {
        const [userState, setUserState] = useState({})
        const dispatch = useDispatch()

        useEffect(()=> {
            firebase.auth().onAuthStateChanged(async (userAuth) => {
                if(userAuth?.uid) dispatch(update_uid(userAuth.uid))
                console.log(userAuth)
                // await instance.get('')

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
import {useContext, useEffect, useState} from "react";
import LoadScreen from "./LoadScreen";
import {UserContext} from "./UserProvider";
import {Redirect} from 'react-router-dom'
const PrivateRoute = ({Component}) => {
    const [loading, setLoading] = useState(true)
    const user = useContext(UserContext)

    useEffect(()=> {
        setTimeout(()=>{
            setLoading(false)
        }, 1000)
    })

    if(loading) return <LoadScreen />;
    // TODO: Check if user logged in
    if(!user) return <Redirect to='/login'/>

    return (
        <Component/>
    )
}

export default PrivateRoute
import {Link, Redirect} from 'react-router-dom'
import {useContext} from "react";
import {UserContext} from "../UserProvider";
import LoadScreen from "../LoadScreen";
import {makeStyles} from "@material-ui/core/styles";
import Header from "../Header";

const useStyles = makeStyles(theme => ({
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
        fontSize: '24px',
        fontWeight: 'bold'
    },
    return: {
        display: 'flex',
        justifyContent: 'center',
        fontSize: '22px'
    }
}))



const NotFound = () => {
    const user = useContext(UserContext);
    const styles = useStyles()

    if(!user) return <LoadScreen/>
    return (
        <div>
            <Header/>
            <p className={styles.wrapper}>Page not found!</p>
            <Link className={styles.return} to={user.uid ? '/home' : '/'}>{user.uid ? "Return to home page": "Return to landing page"}</Link>
        </div>
    )
}

export default NotFound
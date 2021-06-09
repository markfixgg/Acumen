import Header from '../../components/Header'
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    text: {
        color: 'red'
    }
}))

const Profile = () => {
    const classes = useStyles()
    return (
        <div>
            <Header/>
            <h1 className={classes.text}>Profile page</h1>
        </div>
    )
}

export default Profile
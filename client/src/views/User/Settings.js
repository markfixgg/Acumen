import Header from '../../components/Header'
import {makeStyles} from "@material-ui/core/styles";
import {Button, Container, Switch, TextField} from "@material-ui/core";
import firebase from "../../firebase/firebase";
import {useState} from "react";

const useStyles = makeStyles((theme) => ({
    block: {
        marginTop: '15px',
        width: '100%',
        backgroundColor: 'whitesmoke',
        borderRadius: '15px'
    },
    container: {
        maxWidth: '1500px',
        paddingBottom: '25px'
    },
    wrapper: {
        display: 'flex',
        justifyContent: 'center'
    },
    title: {
        '& h1': {
            padding: theme.spacing(3, 5, 0)
        }
    },
    controls: {
        margin: 0,
        padding: theme.spacing(0, 5, 3),
        '& p': {
            margin: '0',
            padding: '0',
            '& div': {
                paddingRight: '50px'
            }
        }
    },
    input: {
        marginTop: '20px'
    }
}))

const Settings = () => {
    const classes = useStyles()
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const changePassword = async (e) => {
        e.preventDefault()
        if(!password && !password2) return window.alert("One of fields is empty!");
        if(password !== password2) return window.alert('Password\'s not the same')
        await firebase.auth().currentUser.updatePassword(password)
            .then(res => {
                window.alert('Password changed!');
                window.location.reload()
            })
            .catch(err => {
                window.alert(err.message)
            })
    }

    return (
        <div>
            <Header/>
            <Container className={classes.container}>
                <div className={classes.block}>
                    <div className={classes.title}>
                        <h1>Settings</h1>
                    </div>

                    <div className={classes.controls}>
                        <h2 style={{marginBottom: '0'}}>Profile data</h2>
                        <div className={classes.input}>
                            <TextField InputLabelProps={{shrink: true }} id="standard-basic" label="Display Name" value={'Example value'}/>
                        </div>

                            <div className={classes.input}>
                            <TextField InputLabelProps={{shrink: true }} id="standard-basic" label="Age" value={'Example value'}/>
                        </div>

                        <div className={classes.input}>
                            <TextField InputLabelProps={{shrink: true }} id="standard-basic" label="Location" value={'Example value'}/>
                        </div>

                        <div className={classes.input}>
                            <TextField InputLabelProps={{shrink: true }} id="standard-basic" label="Occupation" value={'Example value'}/>
                        </div>

                        <Button style={{marginTop: '15px'}} variant="outlined" color="primary">
                            Update
                        </Button>

                        <h2 style={{marginTop: "15px", marginBottom: '0'}}>Change password</h2>
                        <p>
                            <TextField onChange={e => setPassword(e.target.value)} id="password" label="New password" />
                            <TextField onChange={e => setPassword2(e.target.value)} id="password2" label="Repeat password" />
                            <Button onClick={changePassword} style={{marginTop: '15px'}} variant="outlined" color="primary">
                                Change password
                            </Button>
                        </p>

                        <h2 style={{marginTop: '15px'}}>Sliders</h2>
                        <p>Push notifications:
                            <Switch
                            checked={true}
                            color="primary"
                            name="checkedB"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        </p>

                        <p>Option 2:
                            <Switch
                            color="primary"
                            name="checkedB"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        </p>

                        <p>Option 3:
                            <Switch
                            color="primary"
                            name="checkedB"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        </p>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Settings
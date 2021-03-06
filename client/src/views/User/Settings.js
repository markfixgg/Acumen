import Header from '../../components/Header'
import {makeStyles} from "@material-ui/core/styles";
import {Avatar, Box, Button, Container, Tab, Tabs, TextField, Typography} from "@material-ui/core";
import firebase from "../../firebase/firebase";
import {useContext, useEffect, useRef, useState} from "react";
import LoadScreen from "../../components/LoadScreen";
import {getInitials, instance} from "../../helpers/Utils";
import {UserContext} from "../../components/UserProvider";
import {useDispatch, useSelector} from "react-redux";
import {deepOrange} from "@material-ui/core/colors";
import {fetchUserProfile} from "../../redux/actionCreators/profile";

const useStyles = makeStyles((theme) => ({
    block: {
        marginTop: '15px',
        width: '100%',
        position: 'relative',
        backgroundColor: 'whitesmoke',
        borderRadius: '15px',
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;"

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
        borderBottom: `2px solid ${theme.palette.divider}`,
        marginBottom: '5px',
        '& h1': {
            padding: theme.spacing(3, 3, 0, 5)
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
        // marginTop: '20px'
    },
    root: {
        // flexGrow: 1,
        // backgroundColor: theme.palette.background.paper,
        display: 'flex',
        maxHeight: '1000px'
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        paddingBottom: '15px'

    },
    tab_container: {
        display: 'flex',
        '& button': {
            maxHeight: '35px',
            margin: theme.spacing(2, 1)
        }
    },
    group: {
        display: 'flex',
        '& div': {
            marginRight: '10px'
        }
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        alignText: 'center',
        backgroundColor: deepOrange[500],
    },
}))

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const Settings = () => {
    const classes = useStyles()
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [profileImage, setProfileImage] = useState();
    const [file, setFile] = useState(null);

    const [data, setData] = useState({loading: true})
    const [value, setValue] = useState(0);
    const store = useSelector((state) => state);

    const dispatch = useDispatch();
    const user = useContext(UserContext);

    const fileRef = useRef(null)

    const changePassword = async (e) => {
        e.preventDefault()
        if (!password && !password2) return window.alert("One of fields is empty!");
        if (password !== password2) return window.alert('Password\'s not the same')
        await firebase.auth().currentUser.updatePassword(password)
            .then(res => {
                window.alert('Password changed!');
                window.location.reload()
            })
            .catch(err => {
                window.alert(err.message)
            })
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const updateName = async (e) => {
        e.preventDefault();
        const token = await firebase.auth().currentUser.getIdToken();

        const response = await instance.patch(`/users`, {
            query: {
                firstName: data.firstName,
                lastName: data.lastName
            }
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const {error} = response.data;
        if (error) return alert(error);

        await fetchUserProfile(user.uid, dispatch);
    }

    const deleteImage = async (e) => {
        if (!window.confirm('Are u sure to delete profile image?')) return;

        const token = await firebase.auth().currentUser.getIdToken();
        const response = await instance.delete(`/users/image`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const {error} = response.data;
        if (error) return alert(error);

        await fetchUserProfile(user.uid, dispatch);
    }

    const saveNewImage = async (e) => {
        e.preventDefault();
        if (!file) return alert("File not loaded!");

        const token = await firebase.auth().currentUser.getIdToken();

        const formData = new FormData();
        formData.append('file', file);

        const response = await instance.post(`/users/image`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        });

        const {success, error} = response.data;

        if (error) return window.alert(error);

        await fetchUserProfile(user.uid, dispatch);
        setFile(null);
        
        window.alert('Image successfully changed!');
    }

    useEffect(() => {
        const fetch = async () => {
            setData(store.profile);
            setProfileImage(store.profile.image);
        }

        fetch()
    }, [store])

    if (data?.loading) return <LoadScreen/>

    return (
        <div>
            <Header/>
            <Container className={classes.container}>
                <div className={classes.block}>

                    <div className={classes.title}>
                        <h1>Settings</h1>
                    </div>
                    <div className={classes.root}>
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            onChange={handleChange}
                            aria-label="Settings tabs"
                            className={classes.tabs}
                        >
                            <Tab label="Profile Data" {...a11yProps(0)} />
                            <Tab label="Social Networks" {...a11yProps(1)} />
                            <Tab label="Confidence" {...a11yProps(2)} />
                            <Tab label="Security" {...a11yProps(3)} />
                            <Tab label="Payments" {...a11yProps(4)} />
                        </Tabs>

                        {/*Profile Data*/}
                        <TabPanel value={value} index={0}>
                            <div>
                                <div className={classes.tab_container}>
                                    <Avatar
                                        className={classes.orange}
                                        src={file ? URL.createObjectURL(file) : profileImage ? `data:${profileImage.type};base64,${Buffer.from(profileImage.data).toString('base64')}` : ''}
                                        style={{
                                            width: '75px',
                                            height: '75px',
                                            marginBottom: '25px'
                                        }}>{data?.displayName ? getInitials(data.displayName) : ""}</Avatar>

                                    <Button disabled={!profileImage} onClick={deleteImage} variant="contained"
                                            color="primary">
                                        Delete image
                                    </Button>

                                    <input type='file' id='file' accept="image/png, image/jpeg" ref={fileRef}
                                           onChange={e => setFile(e.target.files[0])} style={{display: 'none'}}/>

                                    <Button onClick={e => fileRef.current.click()} variant="contained" color="primary">
                                        Upload new image
                                    </Button>

                                    <Button variant="contained" color="primary" disabled={!file} onClick={saveNewImage}>
                                        Save
                                    </Button>
                                </div>
                                <div className={classes.group}>
                                    <TextField
                                        onChange={e => setData({...data, firstName: e.target.value})}
                                        autoComplete="off"
                                        id="standard-basic" label="First Name"
                                        value={data?.uid ? data.firstName : 'Loading...'}
                                    />
                                    <TextField
                                        onChange={e => {
                                            e.preventDefault()
                                            setData({...data, lastName: e.target.value})
                                        }}
                                        id="standard-basic" label="Last Name"
                                        autoComplete="off"
                                        value={data?.uid ? data.lastName : 'Loading...'}
                                    />
                                </div>

                                <Button onClick={updateName} style={{marginTop: '15px'}} variant="contained"
                                        color="primary">
                                    Save changes!
                                </Button>
                            </div>
                        </TabPanel>
                        {/*Security*/}
                        <TabPanel value={value} index={1}>
                            <div style={{display: 'block'}}>

                            </div>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <h2 style={{marginTop: "0px", marginBottom: '0'}}>Change password</h2>

                            <div className={classes.tab_container}>
                                <div className={classes.group}>
                                    <TextField onChange={e => setPassword(e.target.value)} id="password"
                                               label="New password"/>
                                    <TextField onChange={e => setPassword2(e.target.value)} id="password2"
                                               label="Repeat password"/>
                                </div>
                                <Button onClick={changePassword} style={{marginTop: '15px'}} variant="contained"
                                        color="primary">
                                    Change password
                                </Button>
                            </div>
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                            ?? ????????????????????!
                        </TabPanel>
                        <TabPanel value={value} index={4}>
                            ?? ????????????????????!
                        </TabPanel>
                        <TabPanel value={value} index={5}>
                            ?? ????????????????????!
                        </TabPanel>
                        <TabPanel value={value} index={6}>
                            ?? ????????????????????!
                        </TabPanel>
                        <TabPanel value={value} index={7}>
                            ?? ????????????????????!
                        </TabPanel>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Settings

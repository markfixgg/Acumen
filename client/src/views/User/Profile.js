import Header from '../../components/Header'
import {makeStyles} from "@material-ui/core/styles";
import {useContext} from "react";
import {UserContext} from "../../components/UserProvider";
import {Container, TextField} from "@material-ui/core";
import {Avatar} from "@material-ui/core";
import {Image} from "antd";

const useStyles = makeStyles((theme) => ({
    block: {
        marginTop: '15px',
        width: '100%',
        backgroundColor: 'whitesmoke',
        borderRadius: '15px'
    },
    container: {
        maxWidth: '1500px'
    },
    avatar: {
        width: '150px',
        height: '150px',
        border: '2px solid gray',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px;',
        "@media (max-width: 1280px)": {
            width: '100px',
            height: '100px',
        }
    },
    avatar_wrapper: {
        padding: theme.spacing(3, 5),
        display: 'flex',
        "@media (max-width: 1280px)": {
            padding: theme.spacing(2, 0, 2, 4)
        }
    },
    profile: {
        padding: theme.spacing(1, 5),
        '& p': {
            margin: '0 3px'
        },
        '& h1': {
            margin: '0'
        },
        "@media (max-width: 1280px)": {
            padding: theme.spacing(0, 2)
        }
    },
    wrapper: {
        display: 'flex',
        justifyContent: 'center'
    },
    posts_container: {
        padding: theme.spacing(2, 5, 10)
    },
    post_title: {
        padding: theme.spacing(2, 3, 0)
    },
    post_subtitle: {
        padding: theme.spacing(0, 4, 3)
    },
    post_media: {
        borderTop: '1px solid whitesmoke'
    },
    new_post_input: {
        margin: theme.spacing(0, 5),
        "& input": {
            maxWidth: '500px'
        }
    }
}))

const Post = ({data, id}) => {
    const classes = useStyles()
    const user = useContext(UserContext)
    return (
        <div key={id} className={classes.block} style={{'backgroundColor': 'white'}}>
            <div style={{display: 'flex'}}>

                <div>
                    <Avatar style={{width: '60px', height: '60px', margin: '20px 0px 0px 20px'}} src={user.photoURL}></Avatar> {/* TODO: link to profile */}
                </div>

                <div>
                    <div className={classes.post_title}>
                        <h2>{data.title}</h2>
                    </div>
                    <div className={classes.post_subtitle}>
                        <span>{data.sub_title}</span>
                    </div>
                </div>
            </div>

            <div className={classes.post_media}>
                {data.media.photo.map((item, id) => {
                    return <Image style={{maxWidth: '70px', maxHeight: '70px', borderRadius: "150px", margin: '5px 15px'}} src={item}></Image>
                })}
            </div>
        </div>
    )
}

const posts = [
    {
        title: "Hello there! Example post",
        sub_title: "Some text in post",
        media: {
            video: [],
            photo: ['https://picsum.photos/id/1/500/500', 'https://picsum.photos/id/1/500/500'],
        },
        activity: {
            likes: 999,
            reposts: 11,
        }
    },
    {
        title: "Second post!",
        sub_title: "Hello everyone!",
        media: {
            video: [],
            photo: ['https://picsum.photos/id/1/500/500', 'https://picsum.photos/id/1/500/500'],
        },
        activity: {
            likes: 999,
            reposts: 11,
        }
    }
]

const Profile = () => {
    const classes = useStyles()
    const user = useContext(UserContext)

    return (
        <div>
            <Header/>
                <Container className={classes.container}>
                    <div className={classes.block}>
                        <div className={classes.avatar_wrapper}>
                            <div>
                                <Avatar className={classes.avatar} src={user.photoURL}></Avatar>
                            </div>

                            <div className={classes.profile}>
                                <div>
                                    <h1>{user.displayName}</h1>
                                </div>
                                <div>
                                        <p><b>Age:</b> {"16"}</p>
                                        <p><b>Gender:</b> {"male"}</p>
                                        <p><b>Location:</b> {"International or Domestic"}</p>
                                        <p><b>Occupation:</b> {"Amaetuer"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>

            <Container className={classes.container} style={{paddingBottom: '25px'}}>
                <div className={classes.block}>
                    <div className={classes.wrapper}>
                        <h1>Feed</h1>
                    </div>
                    <div className={classes.new_post_input}>
                        <TextField size={'small'} id="outlined-basic" label="New post" variant="outlined" style={{"backgroundColor": "white"}}/>
                    </div>

                    <div className={classes.posts_container}>
                            {posts.map((item, id) => {
                                return <Post data={item} id={id}/>
                            })}
                    </div>
                </div>
            </Container>

        </div>
    )
}

export default Profile
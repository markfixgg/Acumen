import firebase from "firebase";
import "firebase/auth";
// import serviceAccount from './keys/acumen-77836-firebase-adminsdk-961cd-7ae01318de.json'

const firebaseConfig = {
    apiKey: 'AIzaSyBf7SCTfUnxexu-5ZeHQ4IkxBnirnQO8D0\n',
    authDomain: 'acumen-77836.firebaseapp.com',
    projectId: 'acumen-77836',
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    appId: "103393958716502833771"
};

firebase.initializeApp(firebaseConfig);

export default firebase
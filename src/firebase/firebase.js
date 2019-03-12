import firebase from 'firebase/app';
import 'firebase/database';

var config = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    databaseURL:process.env.REACT_APP_FIREBASE_DATABASE_URL,
    // || "https://condue-re.firebaseio.com",
    projectId: process.env.REACT_APP_FIREBASE_PID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SID
};

firebase.initializeApp(config);

const database = firebase.database();

export default database;
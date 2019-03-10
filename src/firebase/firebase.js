import firebase from 'firebase/app';
import 'firebase/database';

var config = {
    apiKey: "AIzaSyC-YE6n2WEBnrkPcZWA7aHeg_xqh9J3eLU",
    authDomain: "condue-re.firebaseapp.com",
    databaseURL: "https://condue-re.firebaseio.com",
    projectId: "condue-re",
    storageBucket: "condue-re.appspot.com",
    messagingSenderId: "256143981552"
};

firebase.initializeApp(config);

const database = firebase.database();

export default database;
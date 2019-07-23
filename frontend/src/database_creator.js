import firebase from 'firebase';

// const config = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
//   storageBucket: "",
//   messagingSenderId: process.env.REACT_APP_FIREBASE_API_ID
// };

var config = {
    apiKey: "AIzaSyCoJ63dYMOjZ9Inr-HIU68cYJ_WvlS3jV0",
    authDomain: "messagingapi-cdc82.firebaseapp.com",
    databaseURL: "https://messagingapi-cdc82.firebaseio.com",
    projectId: "messagingapi-cdc82",
    storageBucket: "messagingapi-cdc82.appspot.com",
    messagingSenderId: "200465510738"
  };

firebase.initializeApp(config);
const database = firebase.database();

export default database;



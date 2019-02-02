import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCX2z11FI1uO3TYEkU0HvyuGK9iYRP1nkE",
    authDomain: "legal-matrix.firebaseapp.com",
    databaseURL: "https://legal-matrix.firebaseio.com",
    projectId: "legal-matrix",
    storageBucket: "legal-matrix.appspot.com",
    messagingSenderId: "824258842950"
};

firebase.initializeApp(config);

export default firebase;
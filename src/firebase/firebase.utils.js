import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyB0k1_tin0luulYrMLRVvmGPOxYmsPUB9A",
    authDomain: "crwn-db-6e547.firebaseapp.com",
    databaseURL: "https://crwn-db-6e547-default-rtdb.firebaseio.com",
    projectId: "crwn-db-6e547",
    storageBucket: "crwn-db-6e547.appspot.com",
    messagingSenderId: "1084449573133",
    appId: "1:1084449573133:web:7b463f59d77b9caa378844",
    measurementId: "G-7819NMFLLT"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
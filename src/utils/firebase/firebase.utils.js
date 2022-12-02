import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAG42z2MBTX7KpnTJnpEheeIj7y3GBWd-Q",
  authDomain: "crown-e-shop-7ebe1.firebaseapp.com",
  projectId: "crown-e-shop-7ebe1",
  storageBucket: "crown-e-shop-7ebe1.appspot.com",
  messagingSenderId: "276469379098",
  appId: "1:276469379098:web:f4ba756e0bd2b1b54ea1a3",
};

const firebaseApp = initializeApp(firebaseConfig);

// Initialize provider instance
const provider = new GoogleAuthProvider();

// Set custom parameters
provider.setCustomParameters({
  prompt: "select_account",
});
// Set instance of auth
export const auth = getAuth();

// Sign in with popup
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Create Db
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapShot = await getDoc(userDocRef);

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  return userDocRef;
};

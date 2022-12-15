import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  getDocs,
  query,
} from "firebase/firestore";

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
const googleProvider = new GoogleAuthProvider();

// Set custom parameters
googleProvider.setCustomParameters({
  prompt: "select_account",
});
// Set instance of auth
export const auth = getAuth();

// Sign in with Google Popup
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

// SignIn with Google Redirect
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// Create Db
export const db = getFirestore();

// Ajouter une collection
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

// query collection db
export const getCategoriesAndDocuments = async () => {
  // const to init collectionRef with collection method()
  const collectionRef = collection(db, "categories");

  // aim the collectionRef
  const q = query(collectionRef);

  // call getDocs method on q
  const querySnapshot = await getDocs(q);

  // return document with object
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

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
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  return userDocRef;
};

// create user with email & password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!password || !email) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

// sign in with email & password
export const signInAuthWithEmailAndPassword = async (email, password) => {
  if (!password || !email) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

// util signOut user
export const signOutUser = async () => await signOut(auth);

// observer change
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

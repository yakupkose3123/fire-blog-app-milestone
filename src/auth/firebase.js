import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

//* https://firebase.google.com/docs/auth/web/start
//* https://console.firebase.google.com/ => project settings
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain ,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export const createUser = async (email, password, navigate, displayName) => {
  try {
    let userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(auth.currentUser, {
      displayName: displayName
    })
    navigate("/");
    console.log(userCredential);
  } catch (err) {
    alert(err.message);
  }
};

export const signIn = async (email, password, navigate) => {
  try {
    let userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    navigate("/");
    console.log(userCredential);
  } catch (err) {
    alert(err.message);
  }
};

export const logOut = () => {
  signOut(auth);
  // alert("logged out successfully")
};

export const userObserver = (setCurrentUser)=>{
  onAuthStateChanged(auth, (curretUser) => {
    if (curretUser) {
      setCurrentUser(curretUser)
    } else {
      // User is signed out
      setCurrentUser(false)
    }
  });
};


//! for continiu with Google

export const signUpProvider = (navigate) => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
  .then((result) => {
   navigate("/")
  }).catch((error) => {
    console.log(error);    
  });

}

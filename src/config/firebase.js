// firebaseConfig.js
import { initializeApp, getApps } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your Firebase Web App config (from Firebase console)
const firebaseConfig = {
  apiKey: "AIzaSyDe2iS_pKZxP_gaRx4JrbVyJAzxZyHP5OY",
  authDomain: "kisanai-950b1.firebaseapp.com",
  projectId: "kisanai-950b1",
  storageBucket: "kisanai-950b1.appspot.com",
  messagingSenderId: "567611905012",
  appId: "1:567611905012:web:3c4991286b34d11d5a5fa1",
};

// Initialize Firebase app
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Auth safely
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (e) {
  auth = getAuth(app);
  console.log("Auth already initialized, using existing instance");
}

export { auth, app };
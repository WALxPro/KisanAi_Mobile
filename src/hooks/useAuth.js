import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { get, post } from "../api/apiClient";

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendOtpAPI = async ({ email }) => {
    setError(null);
    setLoading(true);
    try {
      const response = await post("farmers/send-signup-otp", { email });
      return response;
    } catch (err) {
      const message =
        err?.response?.data?.detail?.email ||
        err?.response?.data?.detail?.general ||
        err.message ||
        "Failed to send OTP";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const verifyOtpAPI = async ({ email, otp }) => {
    setError(null);
    try {
      setLoading(true);
      const response = await post("farmers/verify-otp", { email, otp }); // ensure 'farmers' not 'farmer'
      setLoading(false);
      return response;
    } catch (err) {
      setLoading(false);
      const message = err.response?.data?.detail || "Failed to verify OTP";
      setError(message);
      throw message;
    }
  };

  const signup = async (data) => {
    const { email, password } = data;
    setError(null);
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      try {
        const response = await post("farmers/signup", data);
        console.log(response, "Signup success");
      } catch (err) {
        await userCredential.user.delete();
        throw new Error(err.response?.data?.detail || "Database save failed");
      }
      return userCredential.user;
    } catch (error) {
      if (error.code) {
        switch (error.code) {
          case "auth/email-already-in-use":
            setError("Email already registered");
            break;
          case "auth/invalid-email":
            setError("Invalid email address");
            break;
          case "auth/weak-password":
            setError("Password is too weak (min 6 characters)");
            break;
          default:
            setError(error.message || "Signup failed");
        }
      } else {
        setError(error.message || "Signup failed");
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

const signin = async ({ email, password }) => {
  setError(null);
  setLoading(true);

  try {
    await signInWithEmailAndPassword(auth, email, password);
    const encodedEmail = encodeURIComponent(email);
    const response = await get(`farmers/login/${encodedEmail}`);
    return response;
  } catch (error) {
     console.log("ERROR FULL:", error);
  console.log("RESPONSE:", error?.response);
  console.log("REQUEST:", error?.request);
  console.log("MESSAGE:", error.message);
    if (error.code) {
      
      switch (error.code) {
        case "auth/user-not-found":
          setError("User not found");
          break;
        case "auth/wrong-password":
          setError("Incorrect password");
          break;
        case "auth/invalid-email":
          setError("Invalid email");
          break;
        default:
          setError("Login failed");
      }
    } else {
      setError(error?.response?.data?.detail || "Login failed");
    }

    throw error;
  } finally {
    setLoading(false);
  }
};


const farmerInfo = async ({ email }) => {
  setError(null);
  setLoading(true);
  try {
    // Encode email for URL
    const encodedEmail = encodeURIComponent(email);
    const response = await get(`farmers/get-by-email/${encodedEmail}`);
    return response;
  } catch (err) {
    const message =
      err?.response?.data?.detail?.email ||
      err?.response?.data?.detail?.general ||
      err.message ||
      "Failed to fetch farmer info";
    setError(message);
    throw err;
  } finally {
    setLoading(false);
  }
};

const logout = async () => {
  setError(null);
  setLoading(true);
  try {
    await signOut(auth);
  } catch (err) {
    setError(err.message);
    throw err;
  } finally {
    setLoading(false);
  }
};

  return {
    loading,
    error,
    sendOtpAPI,
    verifyOtpAPI,
    signup,
    signin,
    farmerInfo,
    logout
  };
};

export default useAuth;


// const handleSendResetEmail = async ({ email }) => {  // <- receive email from component
//   setError(null);
//   setLoading(true);

//   try {
//     await sendPasswordResetEmail(auth, email);
//     console.log("Password reset email sent:", email);
//   } catch (err) {
//     console.error("Error sending reset email:", err);
//     if (err.code === "auth/user-not-found") {
//       setError("This email is not registered.");
//     } else if (err.code === "auth/invalid-email") {
//       setError("Invalid email address.");
//     } else {
//       setError("Failed to send reset email. Try again later.");
//     }
//     throw err; // optionally throw for component-level handling
//   } finally {
//     setLoading(false);
//   }
// };

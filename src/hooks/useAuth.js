import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { post, get } from "../api/apiClient";

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
  // =========================
  // SIGNUP
  // =========================
  const signup = async (data) => {
    setLoading(true);
    setError(null);

    const { email, password } = data;

    try {
      // 1. Firebase user create
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // 2. Save user in backend (NO password)
      const response = await post("farmers/signup", {
        fullname: data.fullname,
        email: data.email,
        phone: data.phone,
        profilePicture: data.profilePicture || null,
        cropDetail: data.cropDetail || null,
      });

      return response;

    } catch (err) {
      setError(err.message || "Signup failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // SIGNIN
  // =========================
  const signin = async ({ email, password }) => {
    setLoading(true);
    setError(null);

    try {
      // 1. Firebase login
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // 2. Get Firebase ID token
      const token = await userCredential.user.getIdToken();

      // 3. Call backend with token
      const response = await get("farmers/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response;

    } catch (err) {
      setError(err.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // GET CURRENT USER
  // =========================
  const getMe = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = await auth.currentUser?.getIdToken();

      const response = await get("farmers/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response;

    } catch (err) {
      setError(err.message || "Failed to fetch user");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOGOUT
  // =========================
  const logout = async () => {
    setLoading(true);
    setError(null);

    try {
      await signOut(auth);
    } catch (err) {
      setError(err.message || "Logout failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    signup,
    signin,
    logout,
    getMe,
    loading,
    error,
    sendOtpAPI,
    verifyOtpAPI,
  };
};

export default useAuth;
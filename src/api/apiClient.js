import axios from "axios";
// import { API_URL } from "@env";

// const baseUrl = API_URL;
// if (!baseUrl) throw new Error("VITE_API_URL not defined!");

// const baseUrl = "https://noncommendatory-josef-semiandrogenous.ngrok-free.dev";
const baseUrl = "http://192.168.100.16:8000";
export const API_BASE_URL = baseUrl;
export const WS_BASE_URL = baseUrl.replace(/^http/i, "ws");

// Common error handler
const handleError = (error) => error.response?.data || { message: error.message };

// GET request
export const get = async (endpoint, params) => {
  try {
    const res = await axios.get(`${baseUrl}/${endpoint}`, { params });
    return res.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const post = async (endpoint, body, config = {}) => {
  try {
    console.log("POST Request:", baseUrl + "/" + endpoint);
    console.log("Payload:", body);

    const isFormData = body instanceof FormData;

    const res = await axios.post(
      `${baseUrl}/${endpoint}`,
      body,
      {
        ...config,
        headers: {
          ...(isFormData ? {} : { "Content-Type": "application/json" }),
          ...(config.headers || {}),
        },
      }
    );

    console.log("Response Status:", res.status);
    console.log("Response Data:", res.data);

    return res.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};

// PUT request
export const put = async (endpoint, body, config = {}) => {
  try {
    const res = await axios.put(`${baseUrl}/${endpoint}`, body, config);
    return res.data;
  } catch (error) {
    throw handleError(error);
  }
};

// DELETE request
export const del = async (endpoint, config = {}) => {
  try {
    const res = await axios.delete(`${baseUrl}/${endpoint}`, config);
    return res.data;
  } catch (error) {
    throw handleError(error);
  }
};

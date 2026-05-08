import axios from "axios";
import { auth } from "../config/firebase";

const baseUrl = "http://192.168.100.5:8000";

export const API_BASE_URL = baseUrl;
export const WS_BASE_URL = baseUrl.replace(/^http/i, "ws");

// ======================
// SAFE TOKEN FETCH
// ======================
const getToken = async () => {
  const user = auth.currentUser;
  if (!user) return null;

  try {
    return await user.getIdToken();
  } catch {
    return null;
  }
};

// ======================
// HEADERS BUILDER
// ======================
const getHeaders = async (isFormData = false, extraHeaders = {}) => {
  const token = await getToken();

  return {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extraHeaders,
  };
};

// ======================
// ERROR HANDLER
// ======================
const handleError = (error) => {
  return error.response?.data || { message: error.message };
};

// ======================
// SAFE URL BUILDER
// ======================
const buildUrl = (endpoint) => {
  return `${baseUrl}/${endpoint}`.replace(/([^:]\/)\/+/g, "$1");
};

// ======================
// GET
// ======================
export const get = async (endpoint, params = {}, config = {}) => {
  try {
    const res = await axios.get(buildUrl(endpoint), {
      params,
      ...config,
      headers: await getHeaders(false, config.headers),
    });

    return res.data;
  } catch (error) {
    throw handleError(error);
  }
};

// ======================
// POST
// ======================
export const post = async (endpoint, body, config = {}) => {
  try {
    const isFormData = body instanceof FormData;

    const res = await axios.post(buildUrl(endpoint), body, {
      ...config,
      headers: await getHeaders(isFormData, config.headers),
    });

    return res.data;
  } catch (error) {
    throw handleError(error);
  }
};

// ======================
// PUT
// ======================
export const put = async (endpoint, body, config = {}) => {
  try {
    const isFormData = body instanceof FormData;

    const res = await axios.put(buildUrl(endpoint), body, {
      ...config,
      headers: await getHeaders(isFormData, config.headers),
    });

    return res.data;
  } catch (error) {
    throw handleError(error);
  }
};

// ======================
// DELETE
// ======================
export const del = async (endpoint, config = {}) => {
  try {
    const res = await axios.delete(buildUrl(endpoint), {
      ...config,
      headers: await getHeaders(false, config.headers),
    });

    return res.data;
  } catch (error) {
    throw handleError(error);
  }
};
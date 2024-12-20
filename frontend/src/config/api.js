import axios from "axios";
import { getCookie } from "../utils/cookies";

// Get access token from cookies
const accessToken = getCookie("accessToken");

// Log environment variables for debugging (only in development)
if (process.env.REACT_APP_ENV === "development") {
  console.log("Environment:", process.env.REACT_APP_ENV);
  console.log("Access Token:", accessToken);
}

// Set the API host based on the environment (development or production)
const HOST = process.env.REACT_APP_API_URL;

// API Version
export const VERSION = "v1";

// Combine the host and version into the base URL for the API
export const BASE_URL = `${HOST}/api/${VERSION}`;

// Create an Axios instance
export const api = axios.create({
  baseURL: BASE_URL // Set the base URL for your API
});

// Request interceptor to include the access token in the Authorization header
api.interceptors.request.use(
  (config) => {
    // If the access token exists, set it in the Authorization header
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    // Log the error for debugging
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor to only return JSON data
api.interceptors.response.use(
  (response) => {
    // If the response is successful, return only the data (not the full response)
    return response.data;
  },
  (error) => {
    // Log errors more verbosely for easier debugging
    console.error("Response error:", error.response || error);
    return Promise.reject(error); // Propagate the error to the calling function
  }
);

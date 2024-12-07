import axios from 'axios';

export const HOST = 'http://localhost:5000';
export const VERSION = 'v1';
export const BASE_URL  = `${HOST}/api/${VERSION}`;

// Create an Axios instance
export const api = axios.create({
  baseURL: BASE_URL // Replace with your API's base URL
});

// Add response interceptor to return only JSON data
api.interceptors.response.use(
  (response) => response.data, // Extract the data
  (error) => Promise.reject(error) // Forward errors
);
import axios from 'axios';
import { getCookie } from '../utils/cookies';

const accessToken = getCookie('accessToken');
console.log(process.env );
// const isDevelopment = process.env.REACT_APP_ENV  === 'development';
export const HOST = "https://wanderlustvoyagesservice.vercel.app";

export const VERSION = 'v1';
export const BASE_URL  = `${HOST}/api/${VERSION}`;

// Create an Axios instance
export const api = axios.create({
  baseURL: BASE_URL // Replace with your API's base URL
});

api.interceptors.request.use(
  (config) => {
    // If the access token exists, set it in the Authorization header
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to return only JSON data
api.interceptors.response.use(
  (response) => response.data, // Extract the data
  (error) => Promise.reject(error) // Forward errors
);
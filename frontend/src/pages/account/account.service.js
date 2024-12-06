import axios from "axios";
import { BASE_URL } from "../../config/api";

export const AccountServiceAPI = {
  createAccount(data) {
    return axios.post(`${BASE_URL}/signup`, data);
  },
  verifyOtp(data) {
    return axios.post(`${BASE_URL}/verify`, data);
  },
  login(data) {
    return axios.post(`${BASE_URL}/signin`, data);
  },
  forgotPassword(data) {
    return axios.post(`${BASE_URL}/forgot-password`, data);
  },
  changePassword(data) {
    return axios.post(`${BASE_URL}/change-password`, data);
  }
};

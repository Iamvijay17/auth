import axios from "axios";
import { BASE_URL } from "../../config/api";

export const AccountServiceAPI = {
  createAccount(data) {
    return axios.post(`${BASE_URL}/signup`, data);
  },
  verifyOtp(data) {
    return axios.post(`${BASE_URL}/verify/${data}`);
  },
};

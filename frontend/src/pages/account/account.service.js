import { api } from "../../config/api";

export const AccountServiceAPI = {
  createAccount(data) {
    return api.post(`/signup`, data);
  },
  verifyOtp(data) {
    return api.post(`/verify`, data);
  },
  login(data) {
    return api.post(`/signin`, data);
  },
  forgotPassword(data) {
    return api.post(`/forgot-password`, data);
  },
  changePassword(data) {
    return api.post(`/change-password`, data);
  }
};

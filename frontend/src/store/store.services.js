import { api } from "../config/api";

export const storeServicesAPI = {
  getAllUsers(data) {
    return api.get(`/users`, data);
  },
  getUserById(userId) {
    return api.get(`/user/${userId}`);
  }
};
import { api } from "../config/api";

export const storeServicesAPI = {
  getAllUsers(data) {
    return api.get("/users", data);
  },
  getUserById(userId) {
    return api.get(`/user/${userId}`);
  },

  getAllBookings(data) {
    return api.get("/bookings", data);
  },
  getAllDiscounts(data) {
    return api.get("/discount", data);
  }
};
import { api } from "../../config/api";

export const AdminServiceAPI = {
  createDiscount(data) {
    return api.post("/discount/create", data);
  },

  getStatistics() {
    return api.get("/admin/stats");
  },

  getAllBookings() {
    return api.get("/admin/bookings");
  }
};

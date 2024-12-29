import { api } from "../../config/api";

export const AdminServiceAPI = {
  createDiscount(data) {
    return api.post("/discount/create", data);
  }
};

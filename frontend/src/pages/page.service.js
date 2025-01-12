import { api } from "../config/api";

export const PageServiceAPI = {
  getDesignations(data) {
    return api.get(`/destinations/${data}`);
  }
};

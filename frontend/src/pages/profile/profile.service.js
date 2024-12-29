import { api } from "../../config/api";

export const ProfileServiceAPI = {
  // Fetch the user's current avatar
  getAvatar(config) {
    return api.get("/upload/avatars", config);
  },

  // Update the user's avatar
  updateAvatar(data) {
    return api.post("/upload/upload-avatar", data);
  }
};

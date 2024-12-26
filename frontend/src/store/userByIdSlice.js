import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { storeServicesAPI } from "./store.services";
import { getCookie } from "../utils/cookies";


export const fetchUserById = createAsyncThunk("user/fetchById", async(id) => {
  const userId = getCookie("userId");
  const response = await storeServicesAPI.getUserById(id ? id : userId);
  return response;
});


const userByIdSlice = createSlice({
  name: "userById",
  initialState: {
    data: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default userByIdSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { storeServicesAPI } from "./store.service";


export const fetchAllDestinations = createAsyncThunk("destinations/fetchAllDestinations", async() => {
  const response = await storeServicesAPI.getAllDestinations();
  return response;
  
});

const destinationsSlice = createSlice({
  name: "destinations",
  initialState: {
    data: [],
    filteredData: [],
    searchQuery: "",
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDestinations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllDestinations.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.filteredData = action.payload;
      })
      .addCase(fetchAllDestinations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});


export default destinationsSlice.reducer;

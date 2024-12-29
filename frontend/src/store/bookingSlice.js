import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { storeServicesAPI } from "./store.service";


export const fetchAllBookings = createAsyncThunk("bookings/fetchAllBookings", async() => {
  const response = await storeServicesAPI.getAllBookings();
  return response;
});

const BookingSlice = createSlice({
  name: "bookings",
  initialState: {
    data: [],
    filteredData: [],
    searchQuery: "",
    loading: false,
    error: null
  },
  reducers: {
    setSearchQuery: (state, action) => {
      const searchQuery = action.payload;

      if (typeof searchQuery === "string") {
        state.searchQuery = searchQuery;
        state.filteredData = state.data.filter((booking) =>
          booking.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          booking.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          booking.role.toLowerCase().includes(searchQuery.toLowerCase())
        );
      } else {
        console.error("Search query must be a string");
        state.filteredData = state.data;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.filteredData = action.payload;
      })
      .addCase(fetchAllBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { setSearchQuery } = BookingSlice.actions;

export default BookingSlice.reducer;

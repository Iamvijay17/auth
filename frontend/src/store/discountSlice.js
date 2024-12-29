import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { storeServicesAPI } from "./store.service";


export const fetchAllDiscounts = createAsyncThunk("discount/fetchAllBookings", async() => {
  const response = await storeServicesAPI.getAllDiscounts();
  return response;
});

const DiscountSlice = createSlice({
  name: "discount",
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
        state.filteredData = state.data.filter((discount) =>
          discount.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          discount.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          discount.role.toLowerCase().includes(searchQuery.toLowerCase())
        );
      } else {
        console.error("Search query must be a string");
        state.filteredData = state.data;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDiscounts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllDiscounts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.discounts;
        state.filteredData = action.payload.discounts;
      })
      .addCase(fetchAllDiscounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { setSearchQuery } = DiscountSlice.actions;

export default DiscountSlice.reducer;

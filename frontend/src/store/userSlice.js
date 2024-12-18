import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { storeServicesAPI } from './store.services';

// Async action to fetch all users
export const fetchAllUsers = createAsyncThunk('users/fetchAllUsers', async() => {
  const response = await storeServicesAPI.getAllUsers(); // Await API call
  return response; // API endpoint to get users
  
});

// Create a slice of the Redux store for managing users
const usersSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    filteredData: [], // Filtered user data for search
    searchQuery: '', // Current search query
    loading: false,
    error: null
  },
  reducers: {
  // Reducer for handling search functionality
    setSearchQuery: (state, action) => {
      const searchQuery = action.payload;

    // Check if the searchQuery is a string
      if (typeof searchQuery === "string") {
        state.searchQuery = searchQuery;
        state.filteredData = state.data.filter((user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
      } else {
      // Handle the case where the payload is not a string
        console.error("Search query must be a string");
      // Optionally, you can reset the filtered data or handle it differently
        state.filteredData = state.data;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;  // Populate users state with API data
        state.filteredData = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { setSearchQuery } = usersSlice.actions;

export default usersSlice.reducer;

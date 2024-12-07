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
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;  // Populate users state with API data
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default usersSlice.reducer;

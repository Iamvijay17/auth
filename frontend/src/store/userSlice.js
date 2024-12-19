import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { storeServicesAPI } from './store.services';


export const fetchAllUsers = createAsyncThunk('users/fetchAllUsers', async() => {
  const response = await storeServicesAPI.getAllUsers();
  return response;
  
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    filteredData: [],
    searchQuery: '',
    loading: false,
    error: null
  },
  reducers: {
    setSearchQuery: (state, action) => {
      const searchQuery = action.payload;

      if (typeof searchQuery === "string") {
        state.searchQuery = searchQuery;
        state.filteredData = state.data.filter((user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.role.toLowerCase().includes(searchQuery.toLowerCase())
        );
      } else {
        console.error("Search query must be a string");
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
        state.data = action.payload;
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

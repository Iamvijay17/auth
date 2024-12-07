import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './userSlice';
import userByIdReducer from './userByIdSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    userById: userByIdReducer
  }
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./userSlice";
import userByIdReducer from "./userByIdSlice";
import bookingReducer from "./bookingSlice";
import discountReducer from "./discountSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    userById: userByIdReducer,
    bookings: bookingReducer,
    discounts: discountReducer
  }
});

export default store;

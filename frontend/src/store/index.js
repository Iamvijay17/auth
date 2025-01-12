import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./userSlice";
import userByIdReducer from "./userByIdSlice";
import bookingReducer from "./bookingSlice";
import discountReducer from "./discountSlice";
import destinationsReducer from "./destinationSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    userById: userByIdReducer,
    bookings: bookingReducer,
    discounts: discountReducer,
    designations: destinationsReducer
  }
});

export default store;

import React from "react";
import Home from "./pages/website/home";
import Destination from "./pages/website/destination";
import Stories from "./pages/website/stories";
import Reviews from "./pages/website/reviews";
import MainLayout from "./layouts";
import AllUsers from "./pages/admin/users";
import CommonLayout from "./layouts/commonLayout";
import Settings from "./pages/settings";
import ProfilePage from "./pages/profile";
import AllBookings from "./pages/admin/booking";
import Discount from "./pages/admin/discount";
import ChatAdminPage from "./pages/admin/chat";
import PlaceViewPage from "./pages/components/PlaceViewPage";
import Booking from "./pages/booking";
import Payment from "./pages/payment";
import Dashboard from "./pages/admin/dashboard";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/destination", element: <Destination /> },
  { path: "/destination/:designationId", element: <PlaceViewPage /> },
  { path: "/destination/book-now/:designationId", element: <Booking /> },
  { path: "/destination/book-now/:designationId/checkout", element: <Payment /> },
  { path: "/stories", element: <Stories /> },
  { path: "/reviews", element: <Reviews /> },
  { path: "/profile", element: <ProfilePage /> },
  {
    path: "/admin",
    element: <MainLayout />,
    children: [
      { path: "users", element: <AllUsers /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "chat", element: <ChatAdminPage /> },
      { path: "bookings", element: <AllBookings /> },
      { path: "discounts", element: <Discount /> }
    ]
  },
  {
    path: "/settings",
    element: <CommonLayout />,
    children: [
      { path: "", element: <Settings /> },
      { path: "notifications", element: <div>Notifications Settings</div> },
      { path: "security", element: <Settings /> }
    ]
  }
];

export default routes;

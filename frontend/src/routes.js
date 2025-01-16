import { Routes, Route } from "react-router-dom";
import { Button, Result } from "antd";
import React from "react";
import MainLayout from "./layouts";
import CommonLayout from "./layouts/commonLayout";
import AllBookings from "./pages/admin/booking";
import ChatAdminPage from "./pages/admin/chat";
import Dashboard from "./pages/admin/dashboard";
import Discount from "./pages/admin/discount";
import TravelAdminDashboard from "./pages/admin/travel/dashboard";
import AllUsers from "./pages/admin/users";
import Booking from "./pages/booking";
import PlaceViewPage from "./pages/components/PlaceViewPage";
import Payment from "./pages/payment";
import ProfilePage from "./pages/profile";
import Settings from "./pages/settings";
import Destination from "./pages/website/destination";
import Home from "./pages/website/home";
import Reviews from "./pages/website/reviews";
import Stories from "./pages/website/stories";
import TravelAdminPackages from "./pages/admin/travel/packages";
import AdminTravelLayout from "./pages/admin/travel";
import Vehicles from "./pages/admin/travel/vehicles";
import Packages from "./pages/admin/packages";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/destination" element={<Destination />} />
    <Route path="/destination/:designationId" element={<PlaceViewPage />} />
    <Route path="/destination/book-now/:designationId" element={<Booking />} />
    <Route path="/destination/book-now/:designationId/checkout" element={<Payment />} />
    <Route path="/stories" element={<Stories />} />
    <Route path="/reviews" element={<Reviews />} />
    <Route path="/profile" element={<ProfilePage />} />
    
    <Route path="/admin" element={<MainLayout />}>
      <Route path="users" element={<AllUsers />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="chat" element={<ChatAdminPage />} />
      <Route path="bookings" element={<AllBookings />} />
      <Route path="discounts" element={<Discount />} />
      <Route path="packages" element={<Packages />} />
      
      <Route path="travel" element={<AdminTravelLayout />}>
        <Route path="dashboard" element={<TravelAdminDashboard />} />
        <Route path="vehicles" element={<Vehicles />} />
        <Route path="packages" element={<TravelAdminPackages />} />
      </Route>
    </Route>
    
    <Route path="/settings" element={<CommonLayout />}>
      <Route index element={<Settings />} />
      <Route path="notifications" element={<div>Notifications Settings</div>} />
      <Route path="security" element={<Settings />} />
    </Route>








    
    
    <Route
      path="*"
      element={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
          }}
        >
          <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={
              <Button type="primary" onClick={() => window.history.back()}>
                Go Back
              </Button>
            }
          />
        </div>
      }
    />
  </Routes>
);

export default AppRoutes;

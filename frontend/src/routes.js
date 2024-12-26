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

const routes = [
  { path: "/", element: <Home /> },
  { path: "/destination", element: <Destination /> },
  { path: "/stories", element: <Stories /> },
  { path: "/reviews", element: <Reviews /> },
  {path: "/profile", element: <ProfilePage />},
  {
    path: "/admin",
    element: <MainLayout />,
    children: [
      { path: "users", element: <AllUsers /> },
      { path: "dashboard", element: <div>dashboard</div> },
      { path: "chat", element: <div>chat</div> }
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

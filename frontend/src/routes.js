// src/routes.js
import React from 'react';
import Home from './pages/website/home';
import Destination from './pages/website/destination';
import Stories from './pages/website/stories';
import Reviews from './pages/website/reviews';
import MainLayout from './layouts';
import AllUsers from './pages/admin/users';

const routes = [
  { path: '/', element: <Home /> },
  { path: '/destination', element: <Destination /> },
  { path: '/stories', element: <Stories /> },
  { path: '/reviews', element: <Reviews /> },
  {
    path: '/admin',
    element: <MainLayout />,
    children: [
      { path: 'users', element: <AllUsers /> },
      { path: 'dashboard', element: <div>dashboard</div> },
      { path: 'chat', element: <div>chat</div> }
    ]
  }
];

export default routes;

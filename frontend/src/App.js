import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './layouts/navbar';
import heroBg from './assets/hero/background.jpg';
import Home from './pages/website/home';
import Destination from './pages/website/destination';
import Stories from './pages/website/stories';
import Reviews from './pages/website/reviews';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <div className="relative w-full h-screen ">
        {location.pathname === '/' &&
        <img src={heroBg} alt='' className="absolute top-0 left-0 w-full h-full object-cover"/>
        }

        <div className="sticky top-0 z-20 bg-opacity-80 backdrop-blur-sm bg-white">
          <Navbar />
        </div>

        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<Home   />} />
            <Route path="/destination" element={<Destination />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/reviews" element={<Reviews />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;

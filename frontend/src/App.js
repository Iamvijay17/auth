import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./layouts/navbar";
import heroBg from "./assets/hero/background.jpg";
import routes from "./routes"; // Import the routes from routes.js
import { AuthProvider } from "./context/AuthContext"; // Ensure AuthProvider is imported

function App() {
  const location = useLocation();
  const isAdminPath = location.pathname.includes("admin");

  return (
    <AuthProvider> {/* Wrap the entire app in AuthProvider */}
      <div className="App">
        <div className="relative w-full h-screen">
          {location.pathname === "/" && (
            <img
              src={heroBg}
              alt=""
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          )}

          {!isAdminPath && (
            <div className="sticky top-0 z-20 bg-opacity-80 backdrop-blur-sm bg-white">
              <Navbar />
            </div>
          )}

          <div className="relative z-10">
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element}>
                  {route.children &&
                    route.children.map((child, childIndex) => (
                      <Route
                        key={childIndex}
                        path={child.path}
                        element={child.element}
                      />
                    ))}
                </Route>
              ))}
            </Routes>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;

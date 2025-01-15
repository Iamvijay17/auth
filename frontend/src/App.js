import { Layout } from "antd";
import React from "react";
import { useLocation } from "react-router-dom";
import "./App.css";
import heroBg from "./assets/hero/background.jpg";
import { AuthProvider } from "./context/AuthContext"; // Ensure AuthProvider is imported
import Navbar from "./layouts/navbar";
import AppRoutes from "./routes"; // Import the routes from routes.js

const { Footer } = Layout;

function App() {
  const location = useLocation();

  // Define paths where Navbar and Footer should be hidden
  const hideNavbarPaths = ["/admin", "/vendor", "/settings"];
  const shouldHideNavbar = hideNavbarPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <AuthProvider> {/* Wrap the entire app in AuthProvider */}
      <div className="App">
        <div className="relative w-full h-screen">
          {/* Hero Background Image */}
          {location.pathname === "/" && (
            <img
              src={heroBg}
              alt="Hero Background"
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          )}

          {/* Navbar */}
          {!shouldHideNavbar && (
            <div className="sticky top-0 z-20 bg-opacity-80 backdrop-blur-sm bg-white">
              <Navbar />
            </div>
          )}

          {/* Main Content */}
          <div className="relative z-10">
            <AppRoutes />
          </div>

          {/* Footer */}
          {!shouldHideNavbar && (
            <Footer
              style={{
                textAlign: "center",
                background: "#001529",
                color: "#fff"
              }}
            >
              © 2025 Wanderlust Voyages. All rights reserved.
            </Footer>
          )}
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;

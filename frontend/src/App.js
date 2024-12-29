import { Layout } from "antd";
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import heroBg from "./assets/hero/background.jpg";
import { AuthProvider } from "./context/AuthContext"; // Ensure AuthProvider is imported
import Navbar from "./layouts/navbar";
import routes from "./routes"; // Import the routes from routes.js

const { Footer } = Layout;

function App() {
  const location = useLocation();

  const hideNavbarPaths = ["admin", "vendor", "settings"];

  const shouldHideNavbar = hideNavbarPaths.some((path) => location.pathname.includes(path));



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

          {!shouldHideNavbar && (
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

          {/* Footer */}
          {!shouldHideNavbar && <Footer
            style={{
              textAlign: "center",
              background: "#001529",
              color: "#fff"
            }}
          >
            © 2024 Wanderlust Voyages. All rights reserved.
          </Footer>
          }

        </div>
      </div>
    </AuthProvider>
  );
}

export default App;

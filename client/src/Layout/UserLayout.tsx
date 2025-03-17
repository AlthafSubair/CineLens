import React, { useEffect, useState, useCallback } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Loader from "../pages/Loader";
import Profile from "../components/Profile";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const UserLayout: React.FC = () => {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState<boolean>(true); // Initially set to true for smooth transition


  // Use useCallback to memoize the function
  const startLoading = useCallback(() => {
    setLoading(true);
    window.scrollTo(0, 0);
  }, []);

  const stopLoading = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    startLoading(); // Trigger loading on path change

    // Simulate content load and stop loading after 500ms
    const timer = setTimeout(stopLoading, 500);

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, [pathname, startLoading, stopLoading]);

  const [profile, setProfile] = useState<boolean>(false);

  useEffect(() => {
    // Disable scrolling when profile modal is active
    if (profile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [profile]);

  
  const {token} = useSelector((state: RootState) => state.auth)





  return (
    <div className="dark:bg-[#161616] bg-slate-100 min-h-screen flex flex-col relative">




      {/* Navigation Bar */}
    <NavBar setProfile={setProfile} profile={profile} />

      {/* Profile Modal */}
      {profile && token && (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          {/* Background Blur */}
          <div
            className="absolute inset-0 dark:bg-black dark:bg-opacity-75 backdrop-blur-sm w-full"
            onClick={() => setProfile(false)} // Close on background click
          ></div>

          {/* Profile Component */}
          <div className="absolute z-50 top-0 right-0">
            <Profile setProfile={setProfile}  />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main
        className={`flex-grow pt-20 transition-opacity duration-300 ${
          profile ? "opacity-20 pointer-events-none" : "opacity-100"
        }`}
      >
        
        {loading ? <Loader /> : <Outlet />}
      </main>

      {/* Footer */}
      <Footer />
      
    </div>
  );
};

export default UserLayout;

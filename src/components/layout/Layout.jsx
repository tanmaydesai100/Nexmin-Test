import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function Layout() {
  const location = useLocation();
  const [showLoader, setShowLoader] = useState(false);
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    // Skip loader on initial load (when prevPathRef matches current path)
    if (prevPathRef.current === location.pathname) {
      return;
    }

    // Show loader when route changes
    setShowLoader(true);
    prevPathRef.current = location.pathname;
    
    // Hide loader after 1.5 seconds
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main 
          className="flex-1 p-4 md:p-6 relative" 
          style={{ 
            backgroundColor: '#f0e6ff',
            filter: showLoader ? 'blur(4px)' : 'none',
            transition: 'filter 0.3s ease',
            marginTop: '0',
          }}
        >
          {showLoader && (
            <div 
              className="absolute inset-0 flex items-center justify-center z-50"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
              }}
            >
              <BeatLoader 
                color="#5B32B4" 
                loading={showLoader} 
                size={15}
                margin={4}
              />
            </div>
          )}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
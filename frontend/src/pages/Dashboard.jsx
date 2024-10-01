import React, { useState } from 'react';
import {  Outlet } from 'react-router-dom';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import FilterButton from '../components/DropdownFilter';
import backDrop from '../assets/backdrop.webp'
import backDropligt from '../assets/Backdrop_ligth.webp'
import { useThemeProvider } from "../utils/ThemeContext";
import useTokenCheck from '../hooks/useTokenCheck';

function Dashboard() {
  useTokenCheck();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentTheme } = useThemeProvider()


  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main 
          className="grow"
          style={{
            backgroundImage: currentTheme === 'light' 
              ? `url(${backDropligt})` 
              : `url(${backDrop})`,
              backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.8
          }}
        >
        {/* <main className="grow" > */}
          <div className="px-4 sm:px-6 lg:px-8 w-full max-w-9xl mx-auto">
          </div>
          <div className="px-4 sm:px-6 lg:px-8 py-2 w-full max-w-9xl mx-auto">
          <Outlet className="h-full" /> {/* Este componente renderiza las rutas anidadas */}
        </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
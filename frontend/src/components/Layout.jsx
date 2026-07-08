import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();
  
  // Do not show the main sidebar/header on the Builder page
  if (location.pathname === '/builder') {
    return <Outlet />;
  }

  return (
    <div className="app-layout">
      <aside className="app-sidebar">
        <NavLink to="/" className="sidebar-logo">
          ✨ AI Builder
        </NavLink>
        
        <nav className="sidebar-nav">
          <NavLink to="/dashboard" className={({isActive}) => "sidebar-link " + (isActive ? 'active' : '')}>
            Dashboard
          </NavLink>
          <NavLink to="/templates" className={({isActive}) => "sidebar-link " + (isActive ? 'active' : '')}>
            Templates
          </NavLink>
          <NavLink to="/settings" className={({isActive}) => "sidebar-link " + (isActive ? 'active' : '')}>
            Settings
          </NavLink>
        </nav>
      </aside>

      <main className="app-main">
        <header className="app-header">
          <div className="header-user">
            <span>Ideal</span>
            <div className="avatar">I</div>
          </div>
        </header>

        <div className="app-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

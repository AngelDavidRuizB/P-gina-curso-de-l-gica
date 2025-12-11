import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children, activeSection, onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans">
      <Sidebar activeSection={activeSection} onNavigate={onNavigate} />
      <main className="ml-64 min-h-screen transition-all duration-300">
        {children}
      </main>
    </div>
  );
};

export default Layout;

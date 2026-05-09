import React, { useContext, useRef } from 'react'
import { UserContext } from '../../context/userContext';
import Navbar from './Navbar';
import { useFadeSlideIn } from '../../animations/useGSAPAnimations';
import AmbientBackground from '../AmbientBackground';

/**
 * DashboardLayout — Root layout for all authenticated pages.
 * Dark mode is controlled globally via <html class="dark"> set by ThemeContext.
 * This layout does NOT need any dark: hardcoded classes; it inherits CSS variables.
 */
export default function DashboardLayout({ activeMenu, children }) {
  const { user } = useContext(UserContext);
  const contentRef = useRef(null);
  useFadeSlideIn(contentRef, [user]);

  return (
    <div className="relative min-h-screen z-0 transition-colors duration-500" style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-body)' }}>
      <AmbientBackground />
      <Navbar activeMenu={activeMenu} />
      {user && (
        <div ref={contentRef} className="container mx-auto pt-8 pb-4 px-4 relative z-10">
          {children}
        </div>
      )}
    </div>
  );
}

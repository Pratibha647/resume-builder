import ProfileInfoCard from "../Cards/ProfileInfoCard";
import { Link } from "react-router-dom";
import { useRef } from 'react';
import { useSlideDown } from "../../animations/useGSAPAnimations";
import { useTheme } from "../../context/ThemeContext";
import { LuSun, LuMoon } from "react-icons/lu";

export default function Navbar() {
  const navRef = useRef(null);
  const { isDark, toggleTheme } = useTheme();
  useSlideDown(navRef);

  return (
    <div
      ref={navRef}
      className="h-16 sticky top-0 z-50 glassmorphism"
      style={{ borderBottom: '1px solid var(--border-light)' }}
    >
      <div className="container mx-auto flex items-center justify-between gap-5 h-full px-4">
        <Link to="/dashboard">
          <h2 className="text-[17px] font-bold tracking-tight leading-5" style={{ color: 'var(--text-heading)' }}>
            Resume Builder
          </h2>
        </Link>

        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-all hover:scale-110"
            style={{
              color: 'var(--text-muted)',
              backgroundColor: 'var(--bg-muted)',
            }}
            aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark
              ? <LuSun className="text-[18px]" />
              : <LuMoon className="text-[18px]" />
            }
          </button>

          <ProfileInfoCard />
        </div>
      </div>
    </div>
  );
}

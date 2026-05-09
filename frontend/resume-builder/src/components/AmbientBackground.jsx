import React, { useRef } from 'react';
import { useFloatingElements } from '../animations/useGSAPAnimations';
import { LuScanLine, LuFileText } from "react-icons/lu";

/**
 * AmbientBackground — Decorative ambient layer for the Dashboard.
 * Uses CSS variables so dark/light mode is fully automatic.
 * No hardcoded dark: Tailwind classes needed here.
 */
export default function AmbientBackground() {
  const containerRef = useRef(null);
  useFloatingElements(containerRef, '.floating-ui');

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden"
      style={{ backgroundColor: 'var(--bg-base)' }}
    >
      {/* ── Mesh Gradient Orbs ── */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-60 ambient-shape"
           style={{ background: 'radial-gradient(circle, rgba(147,40,231,0.15) 0%, transparent 70%)' }} />
      <div className="absolute bottom-[-10%] right-[10%] w-[700px] h-[700px] rounded-full blur-[140px] opacity-50 ambient-shape"
           style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)' }} />
      <div className="absolute top-[30%] right-[-5%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-40 ambient-shape"
           style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)' }} />
      <div className="absolute bottom-[20%] left-[20%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-40 ambient-shape"
           style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)' }} />

      {/* ── Floating UI Elements ── */}

      {/* Large Blurred Resume Document */}
      <div
        className="floating-ui absolute top-[25%] right-[5%] w-[320px] h-[450px] rounded-2xl backdrop-blur-md opacity-70 transform rotate-6 flex flex-col p-6 gap-6"
        style={{ backgroundColor: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(59,130,246,0.1)' }}>
            <LuUserIcon className="text-3xl" style={{ color: 'var(--text-muted)' }} />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="w-2/3 h-3 rounded" style={{ backgroundColor: 'var(--border-medium)' }}></div>
            <div className="w-1/2 h-2 rounded" style={{ backgroundColor: 'var(--border-light)' }}></div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="w-full h-2.5 rounded-sm" style={{ backgroundColor: 'var(--border-medium)' }}></div>
          <div className="w-[90%] h-2.5 rounded-sm" style={{ backgroundColor: 'var(--border-medium)' }}></div>
          <div className="w-[80%] h-2.5 rounded-sm" style={{ backgroundColor: 'var(--border-medium)' }}></div>
        </div>
        <div className="flex flex-col gap-3 mt-4">
          <div className="w-1/3 h-3 mb-1 rounded-sm" style={{ backgroundColor: 'rgba(59,130,246,0.2)' }}></div>
          <div className="w-full h-2.5 rounded-sm" style={{ backgroundColor: 'var(--border-medium)' }}></div>
          <div className="w-[85%] h-2.5 rounded-sm" style={{ backgroundColor: 'var(--border-light)' }}></div>
        </div>
      </div>

      {/* Skills Widget */}
      <div
        className="floating-ui absolute bottom-[15%] left-[5%] glassmorphism p-4 rounded-2xl flex flex-col gap-3 w-64 opacity-90 transform -rotate-3"
      >
        <div className="text-[12px] font-bold ml-1" style={{ color: 'var(--text-body)' }}>Skills</div>
        <div className="flex flex-wrap gap-2">
          <span className="text-[11px] font-semibold px-3 py-1.5 rounded-lg" style={{ backgroundColor: 'rgba(147,40,231,0.1)', color: '#9333ea' }}>UI/UX</span>
          <span className="text-[11px] font-semibold px-3 py-1.5 rounded-lg" style={{ backgroundColor: 'rgba(59,130,246,0.1)', color: '#3b82f6' }}>Figma</span>
          <span className="text-[11px] font-semibold px-3 py-1.5 rounded-lg" style={{ backgroundColor: 'rgba(99,102,241,0.1)', color: '#6366f1' }}>React</span>
          <span className="text-[11px] font-semibold px-3 py-1.5 rounded-lg" style={{ backgroundColor: 'rgba(236,72,153,0.1)', color: '#ec4899' }}>Node.js</span>
        </div>
      </div>

      {/* Resume Score Widget */}
      <div
        className="floating-ui absolute bottom-[10%] right-[20%] glassmorphism p-5 rounded-2xl flex flex-col items-center gap-3 w-40 opacity-90 transform rotate-3"
      >
        <div className="text-[12px] font-bold" style={{ color: 'var(--text-body)' }}>Resume Score</div>
        <div className="relative w-16 h-16 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path strokeWidth="3" stroke="var(--border-medium)" fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path strokeWidth="3" strokeDasharray="92, 100" strokeLinecap="round" stroke="#3b82f6" fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          </svg>
          <span className="absolute text-[13px] font-bold" style={{ color: 'var(--text-heading)' }}>92%</span>
        </div>
        <div className="text-[10px] font-semibold text-green-500">Great Score!</div>
      </div>

      {/* ATS Icon Tag */}
      <div
        className="floating-ui absolute top-[20%] right-[35%] glassmorphism p-3 rounded-2xl opacity-80 flex items-center justify-center"
        style={{ color: '#9333ea' }}
      >
        <LuScanLine className="text-2xl" />
        <span className="absolute text-[8px] font-bold tracking-wider mt-6 px-1 rounded"
              style={{ backgroundColor: 'var(--bg-surface)', color: 'var(--text-muted)' }}>ATS</span>
      </div>

      {/* Profile Snippet */}
      <div
        className="floating-ui absolute top-[15%] right-[15%] glassmorphism p-2.5 rounded-xl opacity-70 flex items-center gap-2"
      >
        <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(147,40,231,0.1)' }}>
          <LuUserIcon className="text-[10px]" style={{ color: 'var(--text-muted)' }} />
        </div>
        <div className="w-12 h-1.5 rounded-sm" style={{ backgroundColor: 'var(--border-medium)' }}></div>
      </div>

      {/* Floating Document Icon */}
      <div
        className="floating-ui absolute bottom-[25%] left-[30%] glassmorphism p-2.5 rounded-xl opacity-80 flex items-center justify-center transform rotate-12"
        style={{ color: '#9333ea' }}
      >
        <LuFileText className="text-xl" />
      </div>

      {/* Dotted Connectors */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.15] z-[-1]" xmlns="http://www.w3.org/2000/svg">
        <path d="M 100 200 Q 300 100 500 300 T 900 250 T 1300 400" fill="none"
              stroke="url(#line-grad)" strokeWidth="1.5" strokeDasharray="5 5" />
        <path d="M 200 700 Q 450 850 700 650 T 1100 800" fill="none"
              stroke="url(#line-grad-2)" strokeWidth="1.5" strokeDasharray="5 5" />
        <defs>
          <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <linearGradient id="line-grad-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>

      {/* Glowing Particles */}
      <div className="floating-ui absolute top-[15%] left-[25%] w-3 h-3 rounded-full opacity-70"
           style={{ backgroundColor: '#a855f7', boxShadow: '0 0 15px #a855f7' }} />
      <div className="floating-ui absolute bottom-[35%] right-[10%] w-2.5 h-2.5 rounded-full opacity-80"
           style={{ backgroundColor: '#3b82f6', boxShadow: '0 0 15px #3b82f6' }} />
      <div className="floating-ui absolute top-[45%] right-[40%] w-4 h-4 rounded-full opacity-50 blur-[2px]"
           style={{ backgroundColor: '#ec4899', boxShadow: '0 0 20px #ec4899' }} />
      <div className="floating-ui absolute bottom-[20%] left-[45%] w-2 h-2 rounded-full opacity-50"
           style={{ backgroundColor: '#6366f1', boxShadow: '0 0 10px #6366f1' }} />
    </div>
  );
}

const LuUserIcon = ({ className, style }) => (
  <svg className={className} style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

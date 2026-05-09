import React, { useRef } from 'react';
import { useFloatingElements } from '../animations/useGSAPAnimations';
import { LuCircleCheck, LuBrainCircuit, LuFileText, LuUser, LuStar } from "react-icons/lu";

export default function LandingBackground() {
  const containerRef = useRef(null);
  
  // Apply floating animation to all elements with class 'floating-ui'
  useFloatingElements(containerRef, '.floating-ui');

  return (
    <div ref={containerRef} className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Soft Ambient Glows (Bubbles) */}
      <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-purple-200/40 rounded-full blur-[120px] mix-blend-multiply opacity-70" />
      <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-[100px] mix-blend-multiply opacity-60" />
      <div className="absolute bottom-[-10%] left-[20%] w-[700px] h-[700px] bg-pink-100/40 rounded-full blur-[140px] mix-blend-multiply opacity-60" />
      <div className="absolute top-[40%] left-[40%] w-[400px] h-[400px] bg-indigo-100/40 rounded-full blur-[100px] mix-blend-multiply opacity-50" />

      {/* Floating UI Elements */}
      
      {/* User Profile Snippet */}
      <div className="floating-ui absolute top-[25%] left-[10%] glassmorphism p-3 rounded-xl flex items-center gap-3 w-48 opacity-80 transform -rotate-3 border border-white/60 premium-shadow">
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
          <LuUser className="text-sm" />
        </div>
        <div className="flex flex-col gap-1.5 w-full">
          <div className="w-full h-2 bg-gray-200 rounded"></div>
          <div className="w-2/3 h-2 bg-gray-100 rounded"></div>
        </div>
      </div>

      {/* Document Icon Box */}
      <div className="floating-ui absolute top-[30%] left-[28%] glassmorphism p-3 rounded-2xl opacity-90 border border-white/60 premium-shadow flex items-center justify-center text-purple-500 bg-white/70">
        <LuFileText className="text-xl" />
      </div>

      {/* ATS Friendly Tag */}
      <div className="floating-ui absolute bottom-[25%] left-[8%] glassmorphism px-4 py-2.5 rounded-full flex items-center gap-2 opacity-95 border border-white/60 premium-shadow bg-white/80">
        <LuCircleCheck className="text-green-500 text-sm" />
        <span className="text-[12px] font-semibold text-gray-700">ATS Friendly</span>
      </div>

      {/* Star Icon Box */}
      <div className="floating-ui absolute bottom-[28%] left-[22%] glassmorphism p-3 rounded-2xl opacity-90 border border-white/60 premium-shadow flex items-center justify-center text-purple-500 bg-white/70 transform rotate-12">
        <LuStar className="text-xl fill-purple-100" />
      </div>

      {/* AI Powered Tag */}
      <div className="floating-ui absolute bottom-[25%] right-[12%] glassmorphism px-4 py-2.5 rounded-full flex items-center gap-2 opacity-95 border border-white/60 premium-shadow bg-white/80 transform -rotate-3">
        <LuBrainCircuit className="text-purple-500 text-sm" />
        <span className="text-[12px] font-semibold text-gray-700">AI Powered</span>
      </div>

      {/* Small Decorative Dots & Shapes */}
      <div className="floating-ui absolute top-[20%] left-[40%] w-3 h-3 bg-purple-400 rounded-full opacity-60"></div>
      <div className="floating-ui absolute bottom-[40%] left-[35%] w-2 h-2 bg-blue-400 rounded-full opacity-50"></div>
      <div className="floating-ui absolute top-[45%] right-[30%] w-4 h-4 bg-pink-300 rounded-full opacity-60"></div>
      <div className="floating-ui absolute bottom-[20%] left-[45%] w-2.5 h-2.5 bg-indigo-400 rounded-full opacity-40"></div>

      {/* Abstract Success Rate Snippet */}
      <div className="floating-ui absolute top-[50%] right-[38%] glassmorphism p-3 rounded-xl flex items-center gap-3 w-40 opacity-85 border border-white/60 premium-shadow transform rotate-2 bg-white/70">
        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
            <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
        </div>
        <div className="flex flex-col">
          <span className="text-[14px] font-bold text-gray-800 leading-tight">95%</span>
          <span className="text-[10px] font-medium text-gray-500">Success Rate</span>
        </div>
      </div>

      {/* Subtle connecting dotted lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.15] z-[-1]" xmlns="http://www.w3.org/2000/svg">
        <path d="M 200 300 Q 400 150 600 400 T 1000 300" fill="none" stroke="currentColor" className="text-gray-400" strokeWidth="1.5" strokeDasharray="6 6" />
        <path d="M 150 700 Q 350 850 500 600 T 900 700" fill="none" stroke="currentColor" className="text-gray-400" strokeWidth="1.5" strokeDasharray="6 6" />
      </svg>
    </div>
  );
}

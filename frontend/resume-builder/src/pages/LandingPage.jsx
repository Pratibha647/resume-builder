import React, { useContext, useState, useRef } from 'react';
import HERO_IMG from '../assets/HERO_IMG.png'
import { useNavigate } from 'react-router-dom';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import Modal from '../components/Modal';
import { UserContext } from '../context/userContext';
import ProfileInfoCard from '../components/Cards/ProfileInfoCard';
import { useSlideDown, useHeroTextReveal, useFloatingParallax, useScrollReveal, useMagneticHover, useSmoothScroll } from '../animations/useGSAPAnimations';
import LandingBackground from '../components/LandingBackground';
import { LuGithub, LuLinkedin, LuMail } from "react-icons/lu";

/**
 * LandingPage — Uses CSS variables for all theming.
 * No hardcoded dark: Tailwind classes; inherits from :root.dark globally.
 */
export default function LandingPage() {
  const { user } = useContext(UserContext)
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const headerRef = useRef(null);
  const heroRef = useRef(null);
  const heroImgRef = useRef(null);
  const featuresRef = useRef(null);
  const connectRef = useRef(null);
  const btnRef = useRef(null);
  const ctaBtnRef = useRef(null);

  useSmoothScroll();
  useSlideDown(headerRef);
  useHeroTextReveal(heroRef);
  useFloatingParallax(heroImgRef);
  useScrollReveal(featuresRef, ".feature-card");
  useScrollReveal(connectRef, ".connect-card");
  useMagneticHover(btnRef);
  useMagneticHover(ctaBtnRef);

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className='w-full min-h-screen pb-96 overflow-hidden relative z-0 transition-colors duration-500'
         style={{ backgroundColor: 'var(--bg-base)' }}>
      <LandingBackground />

      <div className='container mx-auto px-4 py-6 relative z-10'>
        {/* Header */}
        <header ref={headerRef} className='flex justify-between items-center mb-16 glassmorphism rounded-2xl px-2 py-1 sticky top-4 z-50'>
          <div className='text-[22px] font-bold px-4 py-2 tracking-tight' style={{ color: 'var(--text-heading)' }}>
            Resume Builder
          </div>
          {user
            ? <ProfileInfoCard />
            : <button
                className='text-[13px] font-semibold px-6 py-2.5 rounded-xl transition-all cursor-pointer'
                style={{
                  backgroundColor: 'var(--bg-muted)',
                  color: 'var(--text-body)',
                  border: '1px solid var(--border-medium)',
                }}
                onClick={() => setOpenAuthModal(true)}
              >
                Login / Sign Up
              </button>
          }
        </header>

        {/* Hero */}
        <div ref={heroRef} className='flex flex-col md:flex-row items-center pt-8 md:pt-12'>
          <div className='w-full md:w-1/2 pr-4 mb-12 md:mb-0'>
            <h1 className='text-5xl md:text-[56px] font-bold mb-6 leading-[1.15] tracking-tight'>
              <div className='hero-text-line overflow-hidden'>Build Your</div>
              <div className='hero-text-line overflow-hidden pb-2'>
                <span className='text-transparent bg-clip-text bg-[radial-gradient(circle,_#7182ff_0%,_#a166ff_100%)] bg-[length:200%_200%] animate-text-shine'>
                  Resume Effortlessly
                </span>
              </div>
            </h1>
            <p className='hero-subtitle text-[17px] mb-8 max-w-lg leading-relaxed' style={{ color: 'var(--text-muted)' }}>
              Craft a standout resume in minutes with our smart and intuitive resume builder.
            </p>
            <div className='hero-subtitle flex items-center'>
              <button
                ref={btnRef}
                className='text-[14px] font-semibold px-8 py-3.5 rounded-xl transition-all cursor-pointer hover:-translate-y-0.5'
                style={{
                  backgroundColor: 'var(--text-heading)',
                  color: 'var(--bg-surface)',
                  boxShadow: 'var(--shadow-md)',
                }}
                onClick={handleCTA}
              >
                Get Started
              </button>
            </div>
          </div>
          <div className='w-full md:w-1/2 relative'>
            <div className='absolute inset-0 bg-gradient-to-tr from-purple-100/40 to-blue-50/40 rounded-3xl blur-3xl -z-10 transform scale-90' />
            <img ref={heroImgRef} src={HERO_IMG} alt="Hero Image"
                 className='w-full rounded-2xl'
                 style={{ boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-light)' }} />
          </div>
        </div>

        {/* Features */}
        <section ref={featuresRef} className='mt-32'>
          <h2 className='feature-card text-2xl md:text-3xl font-bold text-center mb-16 tracking-tight'>
            Features That Make You Shine
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='feature-card glassmorphism p-8 rounded-2xl premium-shadow transition-all duration-300 group'>
              <div className='w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'
                   style={{ backgroundColor: 'rgba(147,40,231,0.08)' }}>✨</div>
              <h3 className='text-[17px] font-semibold mb-3 tracking-tight'>Easy Editing</h3>
              <p className='text-[14px] leading-relaxed' style={{ color: 'var(--text-muted)' }}>
                Update your resume sections with live preview and instant formatting.
              </p>
            </div>
            <div className='feature-card glassmorphism p-8 rounded-2xl premium-shadow transition-all duration-300 group'>
              <div className='w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'
                   style={{ backgroundColor: 'rgba(59,130,246,0.08)' }}>🎨</div>
              <h3 className='text-[17px] font-semibold mb-3 tracking-tight'>Beautiful Templates</h3>
              <p className='text-[14px] leading-relaxed' style={{ color: 'var(--text-muted)' }}>
                Choose from modern, professional templates that are easy to customize.
              </p>
            </div>
            <div className='feature-card glassmorphism p-8 rounded-2xl premium-shadow transition-all duration-300 group'>
              <div className='w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'
                   style={{ backgroundColor: 'rgba(34,197,94,0.08)' }}>⚡</div>
              <h3 className='text-[17px] font-semibold mb-3 tracking-tight'>One-Click Export</h3>
              <p className='text-[14px] leading-relaxed' style={{ color: 'var(--text-muted)' }}>
                Download your resume instantly as a high-quality PDF with one click.
              </p>
            </div>
          </div>
        </section>

        {/* Connect With Me */}
        <section ref={connectRef} className='mt-32 mb-16 relative'>
          <div className='flex flex-col items-center text-center max-w-2xl mx-auto'>
            <h2 className='connect-card text-2xl md:text-3xl font-bold mb-4 tracking-tight'>
              Let's Build Your Career Together
            </h2>
            <p className='connect-card text-[15px] mb-10 leading-relaxed' style={{ color: 'var(--text-muted)' }}>
              Questions, feedback, or collaboration? Feel free to connect and explore my work.
            </p>

            <div className='flex flex-wrap justify-center gap-6 mb-16'>
              <a href="https://github.com/Pratibha647" target="_blank" rel="noopener noreferrer"
                 className='connect-card glassmorphism p-4 rounded-2xl premium-shadow transition-all duration-300 group flex items-center gap-3 card-glow'>
                <div className='w-10 h-10 text-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300'
                     style={{ backgroundColor: 'var(--text-heading)' }}>
                  <LuGithub className="text-xl" />
                </div>
                <span className='font-semibold text-[14px] pr-2'>GitHub</span>
              </a>

              <a href="https://www.linkedin.com/in/pratibha-banerjee11/" target="_blank" rel="noopener noreferrer"
                 className='connect-card glassmorphism p-4 rounded-2xl premium-shadow transition-all duration-300 group flex items-center gap-3 card-glow'>
                <div className='w-10 h-10 text-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300'
                     style={{ backgroundColor: '#2563eb' }}>
                  <LuLinkedin className="text-xl" />
                </div>
                <span className='font-semibold text-[14px] pr-2'>LinkedIn</span>
              </a>

              <a href="mailto:maanupratibha@gmail.com"
                 className='connect-card glassmorphism p-4 rounded-2xl premium-shadow transition-all duration-300 group flex items-center gap-3 card-glow'>
                <div className='w-10 h-10 text-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300'
                     style={{ backgroundColor: '#ec4899' }}>
                  <LuMail className="text-xl" />
                </div>
                <span className='font-semibold text-[14px] pr-2'>Email</span>
              </a>
            </div>

            {/* Mini CTA */}
            <div className='connect-card flex flex-col items-center glassmorphism p-8 rounded-3xl premium-shadow w-full max-w-xl mx-auto'>
              <h3 className='text-[16px] font-semibold mb-5'>Ready to build your professional resume?</h3>
              <button
                ref={ctaBtnRef}
                className='text-[14px] font-semibold px-8 py-3 rounded-xl transition-all cursor-pointer hover:-translate-y-0.5'
                style={{
                  backgroundColor: 'var(--text-heading)',
                  color: 'var(--bg-surface)',
                  boxShadow: 'var(--shadow-sm)',
                }}
                onClick={handleCTA}
              >
                Get Started
              </button>
            </div>
          </div>
        </section>
      </div>

      <div className='text-sm text-center p-5 mt-5 relative z-10'
           style={{
             backgroundColor: 'var(--bg-surface-alt)',
             borderTop: '1px solid var(--border-light)',
             color: 'var(--text-muted)',
           }}>
        Made with ❤️... Happy Coding
      </div>

      <Modal
        isOpen={openAuthModal}
        onClose={() => { setOpenAuthModal(false); setCurrentPage("login"); }}
        hideHeader
      >
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && <SignUp setCurrentPage={setCurrentPage} />}
        </div>
      </Modal>
    </div>
  )
}

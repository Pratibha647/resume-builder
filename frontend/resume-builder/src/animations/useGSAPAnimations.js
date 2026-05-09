import { useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export const useStaggerReveal = (containerRef, selector, dependencies = []) => {
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const elements = gsap.utils.toArray(selector);
      if (elements.length > 0) {
        gsap.fromTo(elements, 
          { opacity: 0, y: 20, scale: 0.98 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            duration: 0.5, 
            stagger: 0.08, 
            ease: "power2.out",
            clearProps: "all" 
          }
        );
      }
    }, containerRef);
    
    return () => ctx.revert();
  }, dependencies);
};

export const useHoverTilt = (cardRef) => {
  useLayoutEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let ctx = gsap.context(() => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate subtle tilt (max 4deg)
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;
        
        gsap.to(card, {
          rotateX,
          rotateY,
          transformPerspective: 1200,
          duration: 0.4,
          ease: "power1.out"
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
          ease: "power2.out",
          clearProps: "transform"
        });
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);
};

export const useHeroTextReveal = (containerRef) => {
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Animate lines/words of hero text
      const lines = gsap.utils.toArray('.hero-text-line');
      gsap.fromTo(lines,
        { y: 40, opacity: 0, rotateX: -20 },
        { 
          y: 0, 
          opacity: 1, 
          rotateX: 0, 
          duration: 0.8, 
          stagger: 0.15, 
          ease: "power3.out",
          delay: 0.2
        }
      );
      
      // Animate subtitle
      gsap.fromTo('.hero-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.5 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);
};

export const useFloatingParallax = (imgRef) => {
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Gentle floating animation
      gsap.to(imgRef.current, {
        y: -15,
        duration: 2.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
      });

      // Mouse parallax effect
      const handleMouseMove = (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        gsap.to(imgRef.current, {
          x,
          y: y - 15, // Maintain the float baseline
          rotateY: x * 0.5,
          rotateX: -y * 0.5,
          duration: 1,
          ease: "power2.out",
          transformPerspective: 1000
        });
      };
      
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    });
    return () => ctx.revert();
  }, []);
};

export const useScrollReveal = (containerRef, selector) => {
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const elements = gsap.utils.toArray(selector);
      
      elements.forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            scrollTrigger: {
              trigger: el,
              start: "top 85%", // when top of element hits 85% of viewport
              toggleActions: "play none none reverse"
            },
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
            delay: i * 0.1 // stagger effect via delay for scroll elements
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);
};

export const useSlideDown = (ref, dependencies = []) => {
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    }, ref);
    return () => ctx.revert();
  }, dependencies);
};

export const useFadeSlideIn = (ref, dependencies = []) => {
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.1 }
      );
    }, ref);
    return () => ctx.revert();
  }, dependencies);
};

export const useFloatingElements = (containerRef, selector) => {
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const elements = gsap.utils.toArray(selector);
      
      elements.forEach((el, i) => {
        // Randomize initial animation parameters
        const randomX = gsap.utils.random(-30, 30);
        const randomY = gsap.utils.random(-30, 30);
        const randomRot = gsap.utils.random(-15, 15);
        const duration = gsap.utils.random(6, 12);
        
        gsap.to(el, {
          x: `+=${randomX}`,
          y: `+=${randomY}`,
          rotation: `+=${randomRot}`,
          duration: duration,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * -1.5 // staggered start times
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);
};

export const useMagneticHover = (ref) => {
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const el = ref.current;
      if (!el) return;

      const handleMouseMove = (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(el, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.4,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.3)",
        });
      };

      el.addEventListener('mousemove', handleMouseMove);
      el.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        el.removeEventListener('mousemove', handleMouseMove);
        el.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, ref);
    return () => ctx.revert();
  }, []);
};

export const useSmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth premium easing
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false, // let touch be native
      touchMultiplier: 2,
      infinite: false,
    });

    // Synchronize Lenis scrolling with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Ensure GSAP ticker is synchronized with Lenis
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable GSAP lag smoothing to avoid conflicts with Lenis
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);
};

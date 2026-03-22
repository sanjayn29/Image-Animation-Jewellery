"use client";

import { useEffect, useState } from "react";
import ScrollytellingCanvas from "./ScrollytellingCanvas";
import Navbar from "./Navbar";

export function ScrollytellingSystem() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const onScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = Math.min(100, Math.max(0, (scrollY / maxScroll) * 100));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Navbar />
      {isMounted && <ScrollytellingCanvas />}
      
      {/* 400vh tall wrapper for scroll tracking */}
      <div className="relative w-full h-[500vh] text-white z-10">
        
        {/* HERO SECTION (0-15%) */}
        <div
          className="fixed inset-0 flex flex-col justify-center items-center pointer-events-none transition-opacity duration-700 ease-in-out"
          style={{ opacity: scrollProgress < 15 ? 1 : 0 }}
        >
          <h1 className="text-7xl font-bold tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent drop-shadow-2xl">
            LUMIÈRE
          </h1>
          <p className="mt-6 text-xl text-white/70 font-light tracking-wide drop-shadow-md">
            Crafted to be timeless.
          </p>
          <p className="text-white/50 tracking-widest uppercase text-sm mt-3 drop-shadow-md">
            Where precision meets elegance.
          </p>
        </div>

        {/* ASSEMBLY SEQUENCE (15-35%) */}
        <div
          className="fixed inset-0 flex flex-col justify-center items-start pl-24 pointer-events-none transition-opacity duration-700 ease-in-out"
          style={{
            opacity: scrollProgress >= 15 && scrollProgress < 35 ? 1 : 0,
            transform: `translateY(${(scrollProgress - 25) * -10}px)`,
          }}
        >
          <h2 className="text-5xl font-semibold tracking-tight text-white/90 drop-shadow-xl w-[500px] leading-tight mb-4">
            Every detail begins with precision.
          </h2>
          <p className="text-lg text-white/60 font-light leading-relaxed drop-shadow w-[400px]">
            Individually crafted elements,
            <br />
            assembled into perfection.
          </p>
        </div>

        {/* CRAFTSMANSHIP EXPLODED VIEW (35-65%) */}
        <div
          className="fixed inset-0 flex flex-col justify-center items-end pr-24 pointer-events-none transition-opacity duration-700 ease-in-out"
          style={{
            opacity: scrollProgress >= 35 && scrollProgress < 65 ? 1 : 0,
            transform: `translateY(${(scrollProgress - 50) * -5}px)`,
          }}
        >
          <h2 className="text-5xl font-semibold tracking-tight text-white/90 drop-shadow-xl text-right mb-6 w-[600px] leading-tight">
            Engineered beauty.
          </h2>
          <p className="text-xl text-[#FFF3C4]/80 font-light leading-relaxed drop-shadow text-right">
            Each component is refined,
            <br />
            balanced, and perfected by design.
          </p>
          <ul className="mt-8 space-y-4 text-white/60 text-right tracking-wide uppercase text-sm">
            <li className="flex justify-end items-center gap-3">
              Precision-cut gemstones <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
            </li>
            <li className="flex justify-end items-center gap-3">
              Hand-finished gold links <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
            </li>
            <li className="flex justify-end items-center gap-3">
              Built for lasting elegance <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
            </li>
          </ul>
        </div>

        {/* MATERIAL & DETAIL FOCUS (65-85%) */}
        <div
          className="fixed inset-0 flex flex-col justify-center items-center pointer-events-none transition-opacity duration-700 ease-in-out"
          style={{
            opacity: scrollProgress >= 65 && scrollProgress < 85 ? 1 : 0,
            transform: `scale(${1 + (scrollProgress - 75) * 0.005})`,
          }}
        >
          <h2 className="text-6xl font-medium tracking-tight bg-gradient-to-r from-[#FFF3C4] to-[#EAF6FF] bg-clip-text text-transparent drop-shadow-2xl text-center mb-6">
            Brilliance in every angle.
          </h2>
          <p className="text-xl text-white/70 font-light text-center leading-relaxed drop-shadow max-w-xl">
            Light. Reflection. Perfection.
            <br />
            A statement that lives with you.
          </p>
        </div>

        {/* FINAL REASSEMBLY + CTA (85-100%) */}
        <div
          className="fixed inset-0 flex flex-col justify-end items-center pb-32 pointer-events-none transition-opacity duration-1000 ease-in-out"
          style={{ opacity: scrollProgress >= 85 ? 1 : 0 }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-0 transition-opacity duration-700" />
          <div className="relative z-10 text-center pointer-events-auto flex flex-col items-center">
            <h2 className="text-4xl font-semibold tracking-wide text-white drop-shadow-2xl mb-2">
              Own the moment.
            </h2>
            <p className="text-lg text-[#D4AF37] tracking-widest uppercase mb-12">
              The Lumière Collection
            </p>
            
            <div className="flex gap-6 items-center">
              <button className="px-10 py-4 bg-white text-[#050505] font-semibold tracking-widest uppercase text-sm hover:bg-[#FFF3C4] transition-colors shadow-[0_0_30px_rgba(255,243,196,0.3)]">
                Explore Collection
              </button>
              <button className="px-10 py-4 border border-white/20 text-white font-medium tracking-widest uppercase text-sm hover:bg-white/10 transition-colors backdrop-blur-md">
                View Details
              </button>
            </div>
            
            <p className="text-white/40 tracking-widest uppercase text-xs mt-10">
              Crafted for moments that matter.
            </p>
          </div>
        </div>

      </div>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 transition-all duration-700 ease-in-out ${
        scrolled ? "bg-[#050505]/75 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="text-white text-lg font-medium tracking-wide">
        L U M I E R E
      </div>
      
      <div className="hidden md:flex space-x-12">
        {["Collection", "Craftsmanship", "Story", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-white/60 hover:text-white transition-colors text-sm uppercase tracking-widest"
          >
            {item}
          </a>
        ))}
      </div>

      <div>
        <button className="relative px-6 py-2.5 rounded-full overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#FFF3C4] opacity-20 transition-opacity group-hover:opacity-40" />
          <div className="absolute inset-[1px] bg-[#050505] rounded-full" />
          <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FFF3C4] text-xs font-semibold tracking-widest uppercase">
            Explore Collection
          </span>
        </button>
      </div>
    </nav>
  );
}

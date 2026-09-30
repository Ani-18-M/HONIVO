import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const { setRole } = useApp();

  return (
    <div className="relative w-full h-full min-h-[690px] flex flex-col justify-between overflow-hidden bg-[#FAF8F5] select-none font-sans">

      {/* 1. TOP LAYER: Realistic Dripping Honey Graphic (Matching Screen 1) */}
      <div className="absolute top-0 inset-x-0 h-52 pointer-events-none z-10 overflow-hidden">
        {/* Honeycomb grid pattern background */}
        <div className="absolute inset-0 bg-honeycomb opacity-10"></div>

        {/* Honey Drip Layer 1 - Deep Amber Shadow */}
        <svg
          className="absolute top-0 left-0 w-full h-44 text-amber-600 fill-current opacity-30 blur-[1px]"
          viewBox="0 0 375 140"
          preserveAspectRatio="none"
        >
          <path d="M0,0 L375,0 L375,50 Q340,110 310,50 Q280,140 240,60 Q200,120 160,55 Q120,130 80,45 Q40,90 0,40 Z" />
        </svg>

        {/* Honey Drip Layer 2 - Rich Golden Honey */}
        <svg
          className="absolute top-0 left-0 w-full h-40 text-amber-500 fill-current shadow-honey"
          viewBox="0 0 375 130"
          preserveAspectRatio="none"
        >
          <path d="M0,0 L375,0 L375,45 Q345,100 315,45 Q285,125 245,55 Q205,110 165,50 Q125,120 85,40 Q45,80 0,35 Z" />
        </svg>

        {/* Honey Drip Layer 3 - Bright Yellow Gloss Highlight */}
        <svg
          className="absolute top-0 left-0 w-full h-32 text-amber-400 fill-current opacity-90"
          viewBox="0 0 375 100"
          preserveAspectRatio="none"
        >
          <path d="M0,0 L375,0 L375,35 Q350,75 325,35 Q295,95 260,40 Q220,80 180,38 Q135,85 95,30 Q50,60 0,25 Z" />
        </svg>

        {/* Honey Gloss Shimmer Highlights */}
        <div className="absolute top-2 left-10 w-20 h-4 bg-white/40 rounded-full blur-xs transform -rotate-6"></div>
        <div className="absolute top-4 right-16 w-16 h-3 bg-white/40 rounded-full blur-xs transform rotate-6"></div>
      </div>

      {/* 2. CENTER CONTENT: HONIVA Brand Logo & Text (Matching Screen 1) */}
      <div className="relative z-20 my-auto pt-28 pb-4 flex flex-col items-center text-center px-6">

        {/* Emblem Badge: 3 Honey Drops / Sprout in Circle */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-amber-100/90 border-2 border-amber-300 shadow-honey flex items-center justify-center mb-5 relative group">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 via-amber-500 to-amber-300 flex items-center justify-center p-2 shadow-inner">
            {/* Custom 3-Leaf / Honey Droplet Sprout SVG Logo matching Screen 1 */}
            <svg viewBox="0 0 100 100" className="w-14 h-14 text-white fill-current drop-shadow-md">
              <path d="M50 15 C45 30 35 40 20 40 C35 55 45 65 50 85 C55 65 65 55 80 40 C65 40 55 30 50 15 Z" />
              <circle cx="50" cy="50" r="8" fill="#F59E0B" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-amber-950 font-serif tracking-tight mb-1.5">
          HONIVA
        </h1>

        {/* Tagline */}
        <p className="text-sm font-bold text-amber-900 tracking-wide mb-2">
          From Hive to Home
        </p>

        {/* Sub-tagline with Separator Dots */}
        <div className="flex items-center gap-2 text-[11px] font-bold text-amber-800/90 tracking-wider">
          <span>Pure</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          <span>Traceable</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          <span>Trusted</span>
        </div>
      </div>

      {/* 3. BOTTOM CONTENT: Apiary Farm Scene & Arrow Button (Matching Screen 1) */}
      <div className="relative z-20 w-full h-72 mt-auto flex flex-col justify-end overflow-hidden">

        {/* Photorealistic Beehive Boxes & Green Meadow Farm Photo */}
        <img
          src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80"
          alt="Beehive Farm Meadow Landscape"
          className="absolute inset-0 w-full h-full object-cover object-bottom"
        />

        {/* Gradient Overlay for Readable Button Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent"></div>

        {/* Action CTA Button with 'Get Started' text and Arrow Icon */}
        <div className="relative z-30 p-6 flex items-center justify-center">
          <button
            onClick={() => setRole('role_select')}
            className="group px-6 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-base shadow-honey-lg border-2 border-white flex items-center gap-3 transition-all transform active:scale-95 cursor-pointer"
          >
            <span className="tracking-wide text-slate-950 font-extrabold text-base">Get Started</span>
            <div className="w-9 h-9 rounded-full bg-slate-950 text-amber-400 flex items-center justify-center shadow-md group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-5 h-5 stroke-[3]" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

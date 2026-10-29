import React from 'react';

export const DienBienLandscape: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative overflow-hidden w-full select-none ${className}`}>
      <svg
        viewBox="0 0 1200 480"
        className="w-full h-auto drop-shadow-sm"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Sky Gradient */}
          <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#BAE6FD" />
            <stop offset="50%" stopColor="#E0F2FE" />
            <stop offset="100%" stopColor="#FFF6DF" />
          </linearGradient>

          {/* Far Mountains */}
          <linearGradient id="farMountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#93C5FD" />
            <stop offset="100%" stopColor="#60A5FA" />
          </linearGradient>

          {/* Near Mountains */}
          <linearGradient id="nearMountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6EE7B7" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>

          {/* Golden Rice Field */}
          <linearGradient id="riceFieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>

          {/* Stream Water */}
          <linearGradient id="streamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
        </defs>

        {/* Sky */}
        <rect width="1200" height="480" fill="url(#skyGrad)" />

        {/* Gentle Sun */}
        <circle cx="1020" cy="90" r="48" fill="#FDE047" opacity="0.9" />
        <circle cx="1020" cy="90" r="62" fill="#FEF08A" opacity="0.4" />

        {/* Soft Fluffy Clouds */}
        <g fill="#FFFFFF" opacity="0.85">
          <path d="M 120,70 Q 150,45 180,70 Q 210,50 240,70 Q 260,85 240,100 Q 140,105 120,70 Z" />
          <path d="M 620,95 Q 645,75 670,95 Q 695,80 720,95 Q 735,110 715,120 Q 630,125 620,95 Z" />
          <path d="M 850,55 Q 870,40 890,55 Q 910,45 930,55 Q 940,70 925,80 Q 860,82 850,55 Z" />
        </g>

        {/* Distant Mountain Range */}
        <path
          d="M 0,220 Q 160,110 320,200 T 640,170 T 960,190 T 1200,160 L 1200,480 L 0,480 Z"
          fill="url(#farMountainGrad)"
          opacity="0.45"
        />

        {/* Mid-range Forest Mountains */}
        <path
          d="M 0,260 Q 180,180 380,250 T 800,210 T 1200,240 L 1200,480 L 0,480 Z"
          fill="url(#nearMountainGrad)"
          opacity="0.65"
        />

        {/* Muong Thanh Rice Field Valleys */}
        <path
          d="M 0,330 Q 300,280 600,320 T 1200,290 L 1200,480 L 0,480 Z"
          fill="url(#riceFieldGrad)"
        />

        {/* Nam Rom Stream curving gently */}
        <path
          d="M 380,310 C 450,340 420,380 500,410 C 580,440 680,430 760,480 L 640,480 C 570,440 480,430 420,390 C 370,360 380,330 360,310 Z"
          fill="url(#streamGrad)"
          opacity="0.8"
        />

        {/* Traditional Thai Stilt House */}
        <g transform="translate(180, 260)">
          {/* Wooden Pillars */}
          <rect x="25" y="80" width="8" height="45" fill="#854D0E" rx="3" />
          <rect x="65" y="80" width="8" height="45" fill="#854D0E" rx="3" />
          <rect x="105" y="80" width="8" height="45" fill="#854D0E" rx="3" />
          <rect x="145" y="80" width="8" height="45" fill="#854D0E" rx="3" />

          {/* Wooden Floor/Balcony */}
          <rect x="15" y="70" width="150" height="14" fill="#A16207" rx="4" />
          <rect x="20" y="32" width="140" height="40" fill="#CA8A04" rx="3" />

          {/* Curved Thatched Roof */}
          <path
            d="M 5,35 Q 90,5 175,35 L 160,18 Q 90,-5 20,18 Z"
            fill="#78350F"
          />
          <path
            d="M 12,32 Q 90,8 168,32 L 155,20 Q 90,0 25,20 Z"
            fill="#B45309"
          />

          {/* Traditional Khau Cut (crossed wooden horns) on Roof */}
          <path
            d="M 78,0 L 102,18 M 102,0 L 78,18"
            stroke="#FEF08A"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Little Window */}
          <rect x="45" y="44" width="22" height="18" fill="#451A03" rx="2" />
          <rect x="110" y="44" width="22" height="18" fill="#451A03" rx="2" />

          {/* Stilt Ladder/Staircase */}
          <line x1="160" y1="75" x2="185" y2="125" stroke="#713F12" strokeWidth="6" />
          <line x1="168" y1="75" x2="193" y2="125" stroke="#713F12" strokeWidth="6" />
          <line x1="163" y1="88" x2="171" y2="88" stroke="#FEF08A" strokeWidth="3" />
          <line x1="171" y1="102" x2="179" y2="102" stroke="#FEF08A" strokeWidth="3" />
          <line x1="179" y1="116" x2="187" y2="116" stroke="#FEF08A" strokeWidth="3" />
        </g>

        {/* Blooming Ban Flower Tree on the Right */}
        <g transform="translate(920, 240)">
          {/* Trunk */}
          <path
            d="M 90,160 Q 80,100 110,60 Q 120,40 100,10"
            stroke="#78350F"
            strokeWidth="16"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 105,70 Q 140,50 160,30"
            stroke="#78350F"
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
          />

          {/* Foliage Clouds */}
          <circle cx="80" cy="20" r="38" fill="#FBCFE8" opacity="0.9" />
          <circle cx="130" cy="15" r="42" fill="#FDF2F8" opacity="0.95" />
          <circle cx="160" cy="40" r="32" fill="#F472B6" opacity="0.85" />
          <circle cx="105" cy="-10" r="35" fill="#FFFFFF" opacity="0.9" />

          {/* Flower Dots */}
          <circle cx="85" cy="15" r="5" fill="#FB789E" />
          <circle cx="120" cy="5" r="6" fill="#F43F5E" />
          <circle cx="145" cy="30" r="5" fill="#FFFFFF" />
          <circle cx="65" cy="35" r="6" fill="#FFFFFF" />
        </g>

        {/* Flying Birds in the Distance */}
        <path d="M 280,120 Q 290,110 300,120 Q 310,110 320,120" stroke="#0284C7" strokeWidth="2.5" fill="none" />
        <path d="M 330,135 Q 338,126 346,135 Q 354,126 362,135" stroke="#0284C7" strokeWidth="2" fill="none" />
      </svg>
    </div>
  );
};

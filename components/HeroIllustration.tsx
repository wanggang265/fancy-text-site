"use client";

export default function HeroIllustration() {
  return (
    <div className="rpp-hero-visual">
      <svg
        className="rpp-hero-illustration"
        width="420"
        height="360"
        viewBox="0 0 420 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ position: "relative", zIndex: 1, maxWidth: "100%" }}
      >
        <rect x="60" y="30" width="300" height="240" rx="14" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
        <rect x="60" y="30" width="300" height="34" rx="14" fill="#f1f5f9" stroke="#0f172a" strokeWidth="2" />
        <circle cx="82" cy="47" r="6" fill="#FF5722" />
        <circle cx="102" cy="47" r="6" fill="#F59E0B" />
        <circle cx="122" cy="47" r="6" fill="#65A30D" />
        <rect x="90" y="90" width="180" height="10" rx="5" fill="#e2e8f0" />
        <rect x="90" y="112" width="140" height="8" rx="4" fill="#e2e8f0" />
        <rect x="90" y="132" width="200" height="8" rx="4" fill="#e2e8f0" />
        <rect x="90" y="152" width="160" height="8" rx="4" fill="#e2e8f0" />
        <rect x="90" y="172" width="190" height="8" rx="4" fill="#e2e8f0" />
        <path
          d="M320 140 L360 140 L360 220 L300 220 L300 180 L320 180 Z"
          fill="#FFF0EB"
          stroke="#FF5722"
          strokeWidth="2"
        />
        <path d="M320 140 L320 180 L300 180 Z" fill="#FF5722" opacity="0.3" />
        <text
          x="330"
          y="190"
          fontFamily="Plus Jakarta Sans, sans-serif"
          fontSize="12"
          fill="#E64A19"
          fontWeight="700"
        >
          removed
        </text>
        <g transform="translate(190, 220) rotate(15)">
          <circle cx="0" cy="0" r="8" fill="#0f172a" />
          <path
            d="M-40 -10 L40 10 M-40 10 L40 -10"
            stroke="#0f172a"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <circle cx="-42" cy="-12" r="10" fill="none" stroke="#0f172a" strokeWidth="4" />
          <circle cx="-42" cy="12" r="10" fill="none" stroke="#0f172a" strokeWidth="4" />
        </g>
        <path
          d="M50 310 Q120 290 210 315 Q300 340 380 305"
          stroke="#FF5722"
          strokeWidth="14"
          strokeLinecap="round"
          opacity="0.25"
        />
        <rect x="30" y="80" width="28" height="28" rx="4" fill="#F59E0B" opacity="0.85" transform="rotate(-12 44 94)" />
        <circle cx="360" cy="280" r="18" fill="#65A30D" opacity="0.85" />
        <polygon points="340,60 352,84 328,84" fill="#0D9488" opacity="0.85" />
      </svg>
    </div>
  );
}

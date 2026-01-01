import React from "react";

export function Logo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Processor Frame */}
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="4"
        className="stroke-current"
        strokeWidth="2"
      />
      {/* Central Core */}
      <rect
        x="9"
        y="9"
        width="6"
        height="6"
        rx="1"
        className="fill-current"
      />
      {/* Data Paths */}
      <path
        d="M12 3V7M12 17V21M3 12H7M17 12H21"
        className="stroke-current"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Interconnects */}
      <path
        d="M7 7L9 9M15 15L17 17M17 7L15 9M9 15L7 17"
        className="stroke-current"
        strokeWidth="1.2"
        strokeLinecap="round"
        style={{ opacity: 0.5 }}
      />
    </svg>
  );
}

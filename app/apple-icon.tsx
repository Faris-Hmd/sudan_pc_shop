import { Logo } from "@/components/Logo";
import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 80,
          background: "linear-gradient(to bottom right, #3b82f6, #1d4ed8)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          borderRadius: "40px",
          fontWeight: 900,
          fontFamily: "sans-serif",
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="120"
          height="120"
        >
          {/* Processor Frame */}
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="4"
            stroke="white"
            strokeWidth="2"
          />
          {/* Central Core */}
          <rect
            x="9"
            y="9"
            width="6"
            height="6"
            rx="1"
            fill="white"
          />
          {/* Data Paths */}
          <path
            d="M12 3V7M12 17V21M3 12H7M17 12H21"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Interconnects */}
          <path
            d="M7 7L9 9M15 15L17 17M17 7L15 9M9 15L7 17"
            stroke="white"
            strokeWidth="1.2"
            strokeLinecap="round"
            style={{ opacity: 0.5 }}
          />
        </svg>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}


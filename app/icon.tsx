import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 512,
  height: 512,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 240,
          background: "linear-gradient(to bottom right, #3b82f6, #1d4ed8)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          borderRadius: "128px", // Premium rounded look
          fontWeight: 900,
          fontFamily: "sans-serif",
          boxShadow: "inset 0 0 100px rgba(0,0,0,0.1)",
        }}
      >
        PC
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}

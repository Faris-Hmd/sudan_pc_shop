"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

/**
 * A standalone spinner component for buttons or small inline loaders.
 */
export function Spinner({ className, size = "md" }: SpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-10 w-10",
    xl: "h-14 w-14",
  };

  const iconSize = {
    sm: 14,
    md: 20,
    lg: 28,
    xl: 40,
  };

  return (
    <div
      className={cn(
        "relative flex items-center justify-center",
        sizeClasses[size],
        className,
      )}
    >
      <Loader2
        className="text-current animate-spin relative z-10"
        size={iconSize[size]}
        strokeWidth={2}
      />
      <div
        className={cn(
          "absolute rounded-full border border-current opacity-20 animate-ping",
          sizeClasses[size],
        )}
      />
    </div>
  );
}

interface LoadingProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  text?: string;
  fullScreen?: boolean;
}

/**
 * A premium, consistent loading component used across the application.
 */
export default function Loading({
  className,
  size = "md",
  text = "Optimizing your experience...",
  fullScreen = false,
}: LoadingProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-10 w-10",
    lg: "h-16 w-16",
    xl: "h-24 w-24",
  };

  const containerClasses = cn(
    "flex flex-col items-center justify-center gap-6 p-8",
    fullScreen
      ? "fixed inset-0 z-[100] bg-background/90 backdrop-blur-xl"
      : "min-h-[80vh] w-full",
    className,
  );

  return (
    <div className={containerClasses}>
      <div className="relative flex items-center justify-center">
        {/* Glow effect */}
        <div
          className={cn(
            "absolute rounded-full bg-primary/20 blur-2xl animate-pulse",
            sizeClasses[size],
          )}
        />

        {/* Static decorative ring */}
        <div
          className={cn(
            "absolute rounded-full border-2 border-primary/10",
            sizeClasses[size],
          )}
        />

        <Spinner size={size} className="text-primary" />
      </div>

      {text && (
        <div className="flex flex-col items-center gap-1">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/80 animate-pulse text-center">
            {text}
          </p>
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        </div>
      )}
    </div>
  );
}

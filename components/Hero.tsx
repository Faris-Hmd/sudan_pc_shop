"use client";

import React from "react";
import { Monitor, Zap, ArrowRight, Grid2X2 } from "lucide-react";
import { Logo } from "@/components/Logo";
import Link from "next/link";

function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[50vh] items-center justify-center overflow-hidden bg-background py-10 md:py-16 transition-colors duration-500"
    >
      {/* Background Glows & Grid */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Animated Grid */}
        <div
          className="absolute inset-0 opacity-20 dark:opacity-10"
          style={{
            backgroundImage: `linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(to right, var(--primary) 1px, transparent 1px)`,
            backgroundSize: "4rem 4rem",
            maskImage:
              "radial-gradient(ellipse 60% 60% at 50% 50%, #000 70%, transparent 100%)",
          }}
        />
        {/* Dynamic Blobs - Hidden on mobile for performance */}
        <div
          className="absolute -top-40 -left-40 h-[30rem] w-[30rem] rounded-full bg-primary/20 blur-[80px] hidden md:block animate-pulse"
          style={{ willChange: "transform" }}
        />
        <div
          className="absolute -bottom-40 -right-40 h-[30rem] w-[30rem] rounded-full bg-secondary/20 blur-[80px] hidden md:block animate-pulse [animation-delay:2s]"
          style={{ willChange: "transform" }}
        />
      </div>

      {/* Floating Icons (Parallax-ish) */}
      <div className="pointer-events-none absolute inset-0 z-0 hidden md:block">
        <FloatingIcon
          icon={Logo}
          className="top-1/4 left-10 text-primary/40"
          delay={0}
        />
        <FloatingIcon
          icon={Zap}
          className="top-1/3 right-20 text-secondary/40"
          delay={2}
        />
        <FloatingIcon
          icon={Monitor}
          className="bottom-1/4 left-20 text-primary/30"
          delay={4}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center text-foreground">
        <div className="mb-8 flex justify-center">
          <Link
            href={"/about" as any}
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 backdrop-blur-md border border-primary/20 px-4 py-1.5 text-[10px] font-black text-primary uppercase tracking-[0.3em] transition-all hover:bg-primary/20 hover:scale-105 active:scale-95"
          >
            Engineering Sudan&apos;s Future
            <ArrowRight size={10} className="text-primary/60" />
          </Link>
        </div>

        <div>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-6xl text-foreground">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Build Your Dream PC
            </span>
            <br />
            <span className="opacity-90">Component by Component</span>
          </h1>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-lg opacity-70 md:text-xl">
          Discover top-tier GPUs, CPUs, and components built for performance,
          reliability, and power.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <a
            href="#shop"
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-primary px-8 py-4 text-lg font-black text-primary-foreground shadow-2xl shadow-primary/30 transition-all hover:opacity-90 hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2">
              Shop Now{" "}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
          </a>

          <a
            href="#categories"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-2xl bg-secondary/10 backdrop-blur-md border border-secondary/20 px-8 py-4 text-lg font-black text-foreground transition-all hover:bg-secondary/20 hover:scale-105 active:scale-95"
          >
            <div className="flex items-center gap-2">
              <Grid2X2 className="h-5 w-5 text-primary" />
              <span>Browse Categories</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

// Helper for floating icons
function FloatingIcon({
  icon: Icon,
  className,
  delay,
}: {
  icon: any;
  className: string;
  delay: number;
}) {
  return (
    <div
      className={`absolute opacity-20 animate-bounce ${className}`}
      style={{ animationDelay: `${delay}s`, animationDuration: "3s" }}
    >
      <Icon className="h-24 w-24" />
    </div>
  );
}

export default Hero;

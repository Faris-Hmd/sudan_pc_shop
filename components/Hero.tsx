"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Zap, ArrowRight, Grid2X2 } from 'lucide-react';
import { Logo } from "@/components/Logo";

function Hero() {
  return (
    <section id="hero" className="relative isolate flex min-h-[50vh] items-center justify-center overflow-hidden bg-slate-900 dark:bg-black py-10 md:py-16 transition-colors duration-500">
      {/* Background Glows & Grid */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Animated Grid */}
        <div 
          className="absolute inset-0 opacity-20 dark:opacity-10"
          style={{
            backgroundImage: `linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(to right, #3b82f6 1px, transparent 1px)`,
            backgroundSize: '4rem 4rem',
            maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 70%, transparent 100%)'
          }}
        />
        {/* ... (rest of the component remains same since it's already dark-themed) */}
        {/* Dynamic Blobs - Hidden on mobile for performance */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -left-40 h-[30rem] w-[30rem] rounded-full bg-blue-600/20 blur-[80px] hidden md:block"
          style={{ willChange: "transform" }}
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, -60, 0],
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -right-40 h-[30rem] w-[30rem] rounded-full bg-indigo-600/20 blur-[80px] hidden md:block"
          style={{ willChange: "transform" }}
        />
      </div>

      {/* Floating Icons (Parallax-ish) */}
      <div className="pointer-events-none absolute inset-0 z-0 hidden md:block">
        <FloatingIcon icon={Logo} className="top-1/4 left-10 text-blue-400" delay={0} />
        <FloatingIcon icon={Zap} className="top-1/3 right-20 text-indigo-400" delay={2} />
        <FloatingIcon icon={Monitor} className="bottom-1/4 left-20 text-cyan-400" delay={4} />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 flex justify-center"
        >
          <motion.a
            href="/about"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 px-4 py-1.5 text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] transition-all hover:bg-white/10"
          >
            Engineering Sudan&apos;s Future
            <ArrowRight size={10} className="text-white/40" />
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          style={{ willChange: "opacity, transform" }}
        >
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
              Build Your Dream PC
            </span>
            <br />
            <span className="text-white/90">Component by Component</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          style={{ willChange: "opacity, transform" }}
          className="mx-auto mt-6 max-w-2xl text-lg text-white/70 md:text-xl"
        >
          Discover top-tier GPUs, CPUs, and components built for performance,
          reliability, and power.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          style={{ willChange: "opacity, transform" }}
          className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <motion.a
            href="#shop"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-blue-600 px-8 py-4 text-lg font-black text-white shadow-2xl shadow-blue-600/30 transition-all hover:bg-blue-500"
          >
            <span className="relative z-10 flex items-center gap-2">
              Shop Now <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
          </motion.a>

          <motion.a
            href="#categories"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 px-8 py-4 text-lg font-black text-white transition-all hover:bg-white/10 hover:border-white/20"
          >
            <div className="flex items-center gap-2">
              <Grid2X2 className="h-5 w-5 text-blue-400" />
              <span>Browse Categories</span>
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

// Helper for floating icons
function FloatingIcon({ icon: Icon, className, delay }: { icon: any, className: string, delay: number }) {
  return (
    <motion.div
      animate={{
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: delay,
      }}
      className={`absolute opacity-20 ${className}`}
    >
      <Icon className="h-24 w-24" />
    </motion.div>
  );
}

export default Hero;


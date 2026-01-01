"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Monitor, Zap, ArrowRight } from 'lucide-react';

function Hero() {
  return (
    <section className="relative isolate flex min-h-[80vh] items-center justify-center overflow-hidden bg-slate-900 py-20 md:py-32">
      {/* Background Glows & Grid */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Animated Grid */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(to right, #3b82f6 1px, transparent 1px)`,
            backgroundSize: '4rem 4rem',
            maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 70%, transparent 100%)'
          }}
        />

        {/* Dynamic Blobs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -left-40 h-[30rem] w-[30rem] rounded-full bg-blue-600/30 blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, -60, 0],
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -right-40 h-[30rem] w-[30rem] rounded-full bg-indigo-600/30 blur-[100px]"
        />
      </div>

      {/* Floating Icons (Parallax-ish) */}
      <div className="pointer-events-none absolute inset-0 z-0 hidden md:block">
        <FloatingIcon icon={Cpu} className="top-1/4 left-10 text-blue-400" delay={0} />
        <FloatingIcon icon={Zap} className="top-1/3 right-20 text-indigo-400" delay={2} />
        <FloatingIcon icon={Monitor} className="bottom-1/4 left-20 text-cyan-400" delay={4} />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">
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
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mx-auto mt-8 max-w-2xl text-lg text-white/70 md:text-xl"
        >
          Discover top-tier GPUs, CPUs, and components built for performance,
          reliability, and power.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-12 flex justify-center"
        >
          <motion.a
            href="#shop"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-blue-600 px-10 py-5 text-lg font-bold text-white shadow-xl shadow-blue-600/30 transition-all hover:bg-blue-500 hover:shadow-blue-500/50"
          >
            <span className="relative z-10 flex items-center gap-2">
              Shop Now <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </span>
            {/* Shine Effect */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
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


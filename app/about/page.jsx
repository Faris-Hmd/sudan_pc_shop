"use client";

import React from "react";
import Link from "next/link";
import {
  Cpu,
  ShieldCheck,
  Zap,
  Users,
  Wrench,
  Truck,
  ArrowRight,
} from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-slate-900 dark:bg-black text-white border-b border-white/5">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-6 uppercase">
            Powering Sudan's <br />
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Digital Future</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-400 dark:text-slate-500 text-lg md:text-xl leading-relaxed font-medium">
            Founded in Khartoum, Sudan PC Shop is the premier destination for
            high-performance computing, specialized hardware, and custom-built
            workstations.
          </p>
        </div>
      </section>

      {/* The Vision - 2 Column Split */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="inline-block px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
              Our Mission
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Beyond bits and bytes, <br /> we architect excellence.
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg font-medium">
              In 2025, technology moves faster than ever. We realized that
              Sudan’s creators, developers, and gamers needed more than just a
              store—they needed a technical partner.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg font-medium">
              Sudan PC Shop was born from a passion for raw performance. We
              don't just ship boxes; we hand-select every component to ensure it
              survives the local climate and delivers the frames and rendering
              speeds our clients demand.
            </p>
          </div>

          {/* Stats Bento Box */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 transition-all">
              <p className="text-4xl font-black text-blue-600 dark:text-blue-400">5k+</p>
              <p className="text-xs text-slate-500 dark:text-slate-500 font-black uppercase tracking-widest mt-2">
                Custom Systems
              </p>
            </div>
            <div className="bg-slate-900 dark:bg-blue-600 p-8 rounded-[2rem] text-white transition-all shadow-xl shadow-blue-500/10 dark:shadow-none">
              <p className="text-4xl font-black">2025</p>
              <p className="text-xs text-blue-100 dark:text-blue-100 font-black uppercase tracking-widest mt-2">
                Tech Standard
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 col-span-2 transition-all">
              <p className="text-4xl font-black text-slate-900 dark:text-white transition-colors">100%</p>
              <p className="text-xs text-slate-500 dark:text-slate-500 font-black uppercase tracking-widest mt-2">
                Local Warranty & Engineering Support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values - Modern Cards */}
      <section className="bg-slate-50 dark:bg-slate-900/30 py-24 transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
              The Engineering Protocol
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Precision Engineering",
                desc: "Our technicians don't just plug parts in. We optimize thermal curves and cable management for every build.",
                icon: Wrench,
              },
              {
                title: "Guaranteed Authenticity",
                desc: "In a market of clones, we guarantee 100% genuine components sourced directly from global manufacturers.",
                icon: ShieldCheck,
              },
              {
                title: "Advanced Logistics",
                desc: "Fast, secure delivery across Sudan with packaging designed to protect fragile high-end electronics.",
                icon: Truck,
              },
            ].map((value, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group"
              >
                <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <value.icon size={28} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-bold">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="bg-blue-600 dark:bg-blue-700 rounded-[3rem] p-10 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-500/20 dark:shadow-none">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
              Ready to build your dream machine?
            </h2>
            <p className="text-blue-100 mb-10 max-w-xl mx-auto text-lg font-medium opacity-90">
              Consult with our experts for a custom quote or browse our 2025
              inventory of high-end hardware.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="bg-white text-blue-600 px-10 py-4 rounded-2xl font-black hover:bg-slate-50 transition-all flex items-center justify-center gap-3 shadow-lg shadow-black/5"
              >
                Browse Shop
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/contact"
                className="bg-blue-500/20 text-white border-2 border-white/20 px-10 py-4 rounded-2xl font-black hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                Contact Us
              </Link>
            </div>
          </div>
          {/* Decorative Circle */}
          <div className="absolute -top-24 -right-24 h-64 w-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 bg-blue-400/20 rounded-full blur-3xl" />
        </div>
      </section>
    </main>
  );
}

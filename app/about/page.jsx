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
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 uppercase">
            Powering Sudan's <br />
            <span className="text-blue-500">Digital Future</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl leading-relaxed">
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
            <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest rounded-full">
              Our Story
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Beyond just selling parts, <br /> we build ecosystems.
            </h2>
            <p className="text-slate-600 leading-relaxed">
              In 2025, technology moves faster than ever. We realized that
              Sudan’s creators, developers, and gamers needed more than just a
              store—they needed a technical partner.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Sudan PC Shop was born from a passion for raw performance. We
              don't just ship boxes; we hand-select every component to ensure it
              survives the local climate and delivers the frames and rendering
              speeds our clients demand.
            </p>
          </div>

          {/* Stats Bento Box */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <p className="text-3xl font-black text-blue-600">5k+</p>
              <p className="text-sm text-slate-500 font-medium">
                Custom Builds
              </p>
            </div>
            <div className="bg-slate-900 p-8 rounded-3xl text-white">
              <p className="text-3xl font-black">2025</p>
              <p className="text-sm text-slate-400 font-medium">
                Tech Standards
              </p>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 col-span-2">
              <p className="text-3xl font-black text-slate-900">100%</p>
              <p className="text-sm text-slate-500 font-medium">
                Local Warranty Support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values - Modern Cards */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 uppercase">
              The PC Shop Standard
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Expert Engineering",
                desc: "Our technicians don't just plug parts in. We optimize thermal curves and cable management for every build.",
                icon: Wrench,
              },
              {
                title: "Verified Authenticity",
                desc: "In a market of clones, we guarantee 100% genuine components sourced directly from global manufacturers.",
                icon: ShieldCheck,
              },
              {
                title: "Local Logistics",
                desc: "Fast, secure delivery across Sudan with packaging designed to protect fragile high-end electronics.",
                icon: Truck,
              },
            ].map((value, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-shadow group"
              >
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <value.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="bg-blue-600 rounded-[2rem] p-10 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-200">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
              Ready to build your dream machine?
            </h2>
            <p className="text-blue-100 mb-10 max-w-xl mx-auto text-lg">
              Consult with our experts for a custom quote or browse our 2025
              inventory of high-end hardware.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
              >
                Browse Shop
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/contact"
                className="bg-blue-700 text-white border border-blue-500 px-8 py-4 rounded-xl font-bold hover:bg-blue-800 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

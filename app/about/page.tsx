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
    <div className="min-h-screen bg-background transition-colors duration-500">
      <header className="page-header border-none m-0 shadow-none bg-foreground">
        <div className="max-w-7xl mx-auto px-6 py-10 md:py-20 text-center relative z-10">
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-6 uppercase text-background m-0">
            Powering Sudan's <br />
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              Digital Future
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-background/60 text-lg md:text-xl leading-relaxed font-medium mt-6 m-0">
            Founded in Khartoum, Sudan PC Shop is the premier destination for
            high-performance computing, specialized hardware, and custom-built
            workstations.
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <section className="py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                Our Mission
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tight">
                Beyond bits and bytes, <br /> we architect excellence.
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg font-medium m-0">
                In 2025, technology moves faster than ever. We realized that
                Sudan’s creators, developers, and gamers needed more than just a
                store—they needed a technical partner.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg font-medium m-0">
                Sudan PC Shop was born from a passion for raw performance. We
                don't just ship boxes; we hand-select every component to ensure
                it survives the local climate and delivers the frames and
                rendering speeds our clients demand.
              </p>
            </div>

            {/* Stats Bento Box */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card p-8 rounded-[2rem] border border-border transition-all">
                <p className="text-4xl font-black text-primary m-0">5k+</p>
                <p className="text-xs text-muted-foreground font-black uppercase tracking-widest mt-2 m-0">
                  Custom Systems
                </p>
              </div>
              <div className="bg-primary p-8 rounded-[2rem] text-primary-foreground transition-all shadow-xl shadow-primary/10">
                <p className="text-4xl font-black m-0">2025</p>
                <p className="text-xs text-primary-foreground/80 font-black uppercase tracking-widest mt-2 m-0">
                  Tech Standard
                </p>
              </div>
              <div className="bg-card p-8 rounded-[2rem] border border-border col-span-2 transition-all">
                <p className="text-4xl font-black text-foreground transition-colors m-0">
                  100%
                </p>
                <p className="text-xs text-muted-foreground font-black uppercase tracking-widest mt-2 m-0">
                  Local Warranty & Engineering Support
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values - Modern Cards */}
        <section className="bg-muted/30 py-24 transition-colors">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-foreground uppercase tracking-tighter m-0">
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
                className="bg-card p-8 rounded-3xl border border-border shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group"
              >
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <value.icon size={28} />
                </div>
                <h3 className="text-2xl font-black text-foreground mb-3 m-0">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm font-bold m-0">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="bg-primary rounded-[3rem] p-10 md:p-20 text-center text-primary-foreground relative overflow-hidden shadow-2xl shadow-primary/20">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight m-0 text-primary-foreground">
                Ready to build your dream machine?
              </h2>
              <p className="text-primary-foreground/80 mb-10 max-w-xl mx-auto text-lg font-medium opacity-90 m-0">
                Consult with our experts for a custom quote or browse our 2025
                inventory of high-end hardware.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                <Link
                  href={"/products" as any}
                  className="bg-background text-primary px-10 py-4 rounded-2xl font-black hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-lg shadow-black/5"
                >
                  Browse Shop
                  <ArrowRight size={20} />
                </Link>
                <Link
                  href={"/contact" as any}
                  className="bg-primary-foreground/10 text-primary-foreground border-2 border-primary-foreground/20 px-10 py-4 rounded-2xl font-black hover:bg-primary-foreground/20 transition-all backdrop-blur-sm"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            {/* Decorative Circle */}
            <div className="absolute -top-24 -right-24 h-64 w-64 bg-primary-foreground/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 bg-primary-foreground/20 rounded-full blur-3xl" />
          </div>
        </section>
      </div>
    </div>
  );
}

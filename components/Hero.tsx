function Hero() {
  return (
    <section className="relative isolate flex items-center justify-center py-20 md:py-28 overflow-hidden bg-slate-900">
      {/* Background Glows */}
      <div className="absolute inset-0 -z-10">
        {/* Blue/Indigo glow blobs */}
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-500/40 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-indigo-500/40 blur-3xl" />
        {/* Optional subtle overlay for depth */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-6 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight animate-fade-in-up">
          <span className="text-blue-400">Build Your Dream PC</span>
          <br />
          <span className="text-white/90">Component by Component</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl mx-auto animate-fade-in-up delay-150">
          Discover top-tier GPUs, CPUs, and components built for performance,
          reliability, and power.
        </p>

        {/* CTA */}
        <div className="mt-10 flex justify-center animate-fade-in-up delay-300">
          <a
            href="#shop"
            className="inline-flex items-center gap-2 rounded-xl
                       bg-blue-600 px-8 py-4 text-base font-semibold
                       shadow-lg shadow-blue-600/30
                       hover:bg-blue-700 hover:shadow-blue-700/40
                       active:scale-95 transition"
          >
            Shop Now
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;

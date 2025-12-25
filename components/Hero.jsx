function Hero() {
  return (
    <section className="z-5 relative py-10 flex items-center justify-center">
      {/* Bluish Gradient Background with subtle dark overlay for contrast */}
      <div className="absolute inset-0 overflow-hidden z-[-1]">
        <div className="absolute inset-0 bg-linear-to-br from-sky-100 via-sky-300 to-blue-300" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 text-center text-white p-8 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 animate-fade-in-up">
          <span className="text-blue-500">Build Your Dream PC</span>, Component
          by Component
        </h1>
        <p className="text-xl mb-8 opacity-90 animate-fade-in-up delay-200">
          Explore the latest in GPUs, CPUs, Motherboards, and more. Unbeatable
          performance, expert advice.
        </p>

        {/* Call to Action Button */}
        <a href="/#shop">
          <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform  animate-fade-in-up delay-400">
            Shop Now
          </div>
        </a>
      </div>
    </section>
  );
}

export default Hero;

import Link from "next/link";
import { Facebook, Instagram, Twitter, Github, Send } from "lucide-react";

export default function AppFooter() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & Socials */}
          <div className="space-y-6">
            <Link
              href="/"
              className="text-xl font-bold tracking-tighter text-white uppercase"
            >
              <span className="text-blue-500">Sudan</span> PC Shop
            </Link>
            <p className="text-sm leading-relaxed max-w-xs text-slate-400">
              Your premier destination for high-performance computing in Sudan.
              Quality hardware, expert advice, and 2025 tech standards.
            </p>
            <div className="flex space-x-5">
              {[Facebook, Instagram, Twitter, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="hover:text-blue-500 transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">
              Store
            </h4>
            <ul className="space-y-4 text-sm">
              {["About", "Categories", "Offers", "Build PC"].map((link) => (
                <li key={link}>
                  <Link
                    href={`/${link.toLowerCase().replace(" ", "-")}` as any}
                    className="hover:text-blue-400 transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">
              Support
            </h4>
            <ul className="space-y-4 text-sm">
              {["Privacy Policy", "terms", "Shipping Info", "Contact Us"].map(
                (link) => (
                  <li key={link}>
                    <Link
                      href={`/${link.toLowerCase().replace(" ", "-")}` as any}
                      className="hover:text-blue-400 transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">
              Stay Updated
            </h4>
            <p className="text-sm text-slate-400 mb-4">
              Get the latest hardware drops and price alerts.
            </p>
            <form className="relative group">
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <button className="absolute right-2 top-1.5 p-1 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
                <Send className="h-4 w-4 text-white" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 pb-safe">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Sudan PC Shop Inc. All hardware is
            subject to availability.
          </p>
          <div className="flex gap-4 text-[10px] text-slate-600 uppercase font-medium">
            <span>Verified Secure Checkout</span>
            <span>Local Warranty</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

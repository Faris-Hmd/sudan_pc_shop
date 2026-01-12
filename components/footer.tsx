import Link from "next/link";
import { Facebook, Instagram, Twitter, Github, Send } from "lucide-react";
import { Logo } from "@/components/Logo";

export default function AppFooter() {
  return (
    <footer className="bg-card text-foreground border-t border-border transition-colors duration-500">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & Socials */}
          <div className="space-y-6">
            <Link
              href="/"
              className="group flex items-center gap-3 text-xl font-bold tracking-tighter uppercase"
            >
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
                <Logo className="text-primary-foreground w-6 h-6" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xl font-black tracking-tight text-foreground">
                  SUDAN<span className="text-primary">PC</span>
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs text-muted-foreground">
              Your premier destination for high-performance computing in Sudan.
              Quality hardware, expert advice, and 2026 tech standards.
            </p>
            <div className="flex space-x-5">
              {[Facebook, Instagram, Twitter, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-foreground">
              Store
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  href={"/about" as any}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href={"/#categories" as any}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href={"/offers" as any}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Offers
                </Link>
              </li>
              <li>
                <Link
                  href={"/build-pc" as any}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Build PC
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-foreground">
              Support
            </h4>
            <ul className="space-y-4 text-sm">
              {["Privacy Policy", "terms", "Shipping Info", "Contact Us"].map(
                (link) => (
                  <li key={link}>
                    <Link
                      href={`/${link.toLowerCase().replace(" ", "-")}` as any}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-foreground">
              Stay Updated
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest hardware drops and price alerts.
            </p>
            <form className="relative group">
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full bg-muted border border-border rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
              <button className="absolute right-2 top-1.5 p-1 bg-primary rounded-md hover:opacity-90 transition-colors">
                <Send className="h-4 w-4 text-primary-foreground" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 pb-safe">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Sudan PC Shop Inc. All hardware is
            subject to availability.
          </p>
          <div className="flex gap-4 text-[10px] text-muted-foreground uppercase font-medium">
            <span>Verified Secure Checkout</span>
            <span>Local Warranty</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

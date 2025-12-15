import Link from "next/link";
import { Facebook, Instagram, Twitter, Github } from "lucide-react"; // Example icons

export default function AppFooter() {
  return (
    // Use a contrasting background to separate the footer visually
    <footer className="bg-gray-800 text-white mt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Section 1: About Us & Contact */}
          <div>
            <h4 className="text-sm font-semibold text-indigo-400 tracking-wider uppercase mb-4">
              About Us
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              Making the world a better place through elegant products. We
              provide high-quality items at great prices.
            </p>
            <div className="flex space-x-6">
              {/* Add social media links here */}
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Section 2: Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-indigo-400 tracking-wider uppercase mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 3: Legal */}
          <div>
            <h4 className="text-sm font-semibold text-indigo-400 tracking-wider uppercase mb-4">
              Legal
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Shipping & Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 4: Newsletter Signup (Optional CTA) */}
          <div>
            <h4 className="text-sm font-semibold text-indigo-400 tracking-wider uppercase mb-4">
              Stay Connected
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for exclusive offers.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter email"
                className="p-2 w-full rounded-l-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-r-md transition duration-300"
              >
                Go
              </button>
            </form>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-500 text-center">
            &copy; {new Date().getFullYear()} Your Company Inc. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
      {/* Header Section */}
      <div className="text-center max-w-3xl mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          About Us
        </h1>
        <p className="text-gray-600 text-lg md:text-xl">
          Welcome to our platform! We are dedicated to providing the best
          products and services for our customers. Our mission is to deliver
          quality, reliability, and an exceptional experience.
        </p>
      </div>

      {/* Image / Illustration */}
      {/* <div className="w-full max-w-4xl mb-12">
        <img
          src="/about-illustration.png" // replace with your image
          alt="About illustration"
          className="w-full rounded-xl shadow-lg"
        />
      </div> */}

      {/* Mission / Vision / Values */}
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl w-full">
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Our Mission
          </h2>
          <p className="text-gray-600">
            To provide our customers with high-quality products and an unmatched
            user experience.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Our Vision
          </h2>
          <p className="text-gray-600">
            To be the most trusted and innovative platform in our industry.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Our Values
          </h2>
          <p className="text-gray-600">
            Quality, integrity, innovation, and customer satisfaction guide
            everything we do.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Join Us Today!
        </h3>
        <p className="text-gray-600 mb-6">
          Sign up to stay updated with our latest products and offers.
        </p>
        <Link
          href={"/"}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-lg transition duration-200 text-lg"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}

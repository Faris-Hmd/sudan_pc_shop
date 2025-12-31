"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type Term = {
  title: string;
  content: string;
};

const terms: Term[] = [
  {
    title: "Acceptance of Terms",
    content:
      "By using our website, you accept these terms in full. If you disagree with any part, you must not use our services.",
  },
  {
    title: "Use of Services",
    content:
      "You agree to use our services only for lawful purposes. You may not use our website to upload, post, or transmit any harmful, illegal, or offensive content.",
  },
  {
    title: "Intellectual Property",
    content:
      "All content, graphics, logos, and designs on this website are the property of the company and protected by copyright laws.",
  },
  {
    title: "Limitation of Liability",
    content:
      "We are not responsible for any direct or indirect damages arising from the use of our website or services. Use our services at your own risk.",
  },
  {
    title: "Privacy",
    content:
      "Your personal information is handled according to our Privacy Policy. By using our services, you agree to the collection and use of your information as described.",
  },
  {
    title: "Changes to Terms",
    content:
      "We reserve the right to modify these Terms & Services at any time. Changes will be effective immediately upon posting on our website.",
  },
  {
    title: "Governing Law",
    content:
      "These terms are governed by the laws of [Your Country/State]. Any disputes arising under these terms will be resolved under the jurisdiction of the appropriate courts.",
  },
];

function TermsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-slate-900 text-white py-16 px-6 md:px-20 lg:px-40">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center">
          Terms & Services
        </h1>
        <p className="text-center text-slate-300 text-lg md:text-xl">
          By using our website, you agree to the following terms and conditions.
          Please read carefully.
        </p>

        {/* Accordion Sections */}
        <div className="space-y-4">
          {terms.map((term, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-lg shadow-md overflow-hidden"
            >
              {/* Header */}
              <button
                className="w-full flex justify-between items-center px-6 py-4 text-left font-semibold hover:bg-slate-700 transition"
                onClick={() => toggle(index)}
              >
                <span>{term.title}</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Content */}
              <div
                className={`px-6 pb-4 text-slate-300 transition-all duration-300 overflow-hidden ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <p>{term.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Conclusion */}
        <p className="text-center text-slate-400 mt-8 text-lg md:text-xl">
          By continuing to use our website, you agree to these terms.
        </p>
      </div>
    </main>
  );
}

export default TermsPage;

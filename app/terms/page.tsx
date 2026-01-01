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
    <main className="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-white py-16 px-6 md:px-20 lg:px-40 transition-colors duration-500">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Title */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase">
            Terms & <span className="text-blue-600 dark:text-blue-400">Services</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-500 dark:text-slate-400 text-lg md:text-xl font-medium leading-relaxed">
            By using our website, you agree to the following protocol. 
            Please review our operational standards carefully.
          </p>
        </div>

        {/* Accordion Sections */}
        <div className="space-y-4">
          {terms.map((term, index) => (
            <div
              key={index}
              className="bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden transition-all"
            >
              {/* Header */}
              <button
                className="w-full flex justify-between items-center px-8 py-6 text-left font-black text-lg hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors outline-none group"
                onClick={() => toggle(index)}
              >
                <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{term.title}</span>
                <div className={`p-2 rounded-xl bg-white dark:bg-slate-800 shadow-sm transition-transform ${openIndex === index ? "rotate-180 bg-blue-600 text-white" : ""}`}>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>

              {/* Content */}
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  openIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-8 pb-8 text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed font-medium">
                  <p className="p-6 bg-white dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                    {term.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Conclusion */}
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-slate-400 dark:text-slate-500 text-sm font-black uppercase tracking-[0.3em]">
            Operational Sovereignty Reserved &copy; 2025
          </p>
        </div>
      </div>
    </main>
  );
}

export default TermsPage;

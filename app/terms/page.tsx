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
    <div className="min-h-screen bg-background pb-20">
      <header className="page-header">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <h1>
            Terms & <span className="text-primary">Services</span>
          </h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Intro */}
        <div className="text-center space-y-4">
          <p className="max-w-2xl mx-auto text-muted-foreground text-base md:text-lg font-medium leading-relaxed m-0">
            By using our website, you agree to the following protocol. Please
            review our operational standards carefully.
          </p>
        </div>

        {/* Accordion Sections */}
        <div className="space-y-4">
          {terms.map((term, index) => (
            <div
              key={index}
              className="bg-card rounded-[2rem] border border-border shadow-sm overflow-hidden transition-all"
            >
              {/* Header */}
              <button
                className="w-full flex justify-between items-center px-6 sm:px-8 py-4 sm:py-6 text-left font-black text-lg hover:bg-muted/50 transition-colors outline-none group"
                onClick={() => toggle(index)}
              >
                <span className="group-hover:text-primary transition-colors text-base sm:text-lg">
                  {term.title}
                </span>
                <div
                  className={`p-2 rounded-xl bg-muted shadow-sm transition-all ${openIndex === index ? "rotate-180 bg-primary text-primary-foreground" : ""}`}
                >
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>

              {/* Content */}
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === index
                    ? "max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 sm:px-8 pb-6 sm:pb-8 text-muted-foreground text-sm sm:text-base leading-relaxed font-medium">
                  <p className="p-4 sm:p-6 bg-muted/30 rounded-2xl border border-border m-0">
                    {term.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Conclusion */}
        <div className="pt-8 border-t border-border text-center">
          <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.3em] m-0">
            Operational Sovereignty Reserved &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TermsPage;

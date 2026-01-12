import React from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <header className="page-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <h1>
            Contact <span className="text-primary">Us</span>
          </h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <section className="space-y-8">
            <div>
              <h2 className="text-3xl font-black">Get in touch</h2>
              <p>
                Have questions about a build? Need technical support? We're here
                to help Sudan's gaming community.
              </p>
            </div>

            <div className="space-y-6">
              <ContactMethod
                icon={<Mail className="text-primary" />}
                title="Email"
                value="support@sudanpc.com"
              />
              <ContactMethod
                icon={<Phone className="text-primary" />}
                title="Phone"
                value="+249 912 345 678"
              />
              <ContactMethod
                icon={<MapPin className="text-primary" />}
                title="Store Location"
                value="Khartoum, Sudan - Al Amarat Street"
              />
            </div>
          </section>

          <section className="bg-card border border-border p-6 sm:p-10 rounded-3xl shadow-xl shadow-primary/5">
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest opacity-60">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-muted border border-border p-3 outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest opacity-60">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full bg-muted border border-border p-3 outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Email address"
                  />
                </div>
              </div>
              <div className="space-y-2 border-radius-small">
                <label className="text-xs font-bold uppercase tracking-widest opacity-60">
                  Message
                </label>
                <textarea
                  rows={5}
                  className="w-full bg-muted border border-border p-3 outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="How can we help?"
                ></textarea>
              </div>
              <button className="w-full bg-primary text-primary-foreground font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all">
                <Send size={18} />
                SEND MESSAGE
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

function ContactMethod({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 group">
      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-sm tracking-tight">{title}</h4>
        <p className="m-0 text-base">{value}</p>
      </div>
    </div>
  );
}

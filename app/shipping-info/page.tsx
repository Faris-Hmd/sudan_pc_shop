import React from "react";
import { Truck, ShieldCheck, Clock, MapPin } from "lucide-react";

export default function ShippingPage() {
  return (
    <div className="min-h-screen">
      <header className="page-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <h1>
            Shipping <span className="text-primary">Information</span>
          </h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-black">Fast & Reliable Delivery</h2>
            <p className="max-w-2xl mx-auto">
              We understand that your new hardware can't wait. That's why we've
              optimized our logistics for the fastest delivery across Sudan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ShippingCard
              icon={<Clock className="text-primary" />}
              title="Khartoum Delivery"
              description="Orders within Khartoum and Omdurman are delivered within 24-48 hours."
            />
            <ShippingCard
              icon={<MapPin className="text-primary" />}
              title="States Delivery"
              description="Delivery to other states (Port Sudan, Madani, etc.) usually takes 3-5 business days."
            />
            <ShippingCard
              icon={<ShieldCheck className="text-primary" />}
              title="Secure Handling"
              description="All components are double-boxed and shipped with insurance for your peace of mind."
            />
            <ShippingCard
              icon={<Truck className="text-primary" />}
              title="Order Tracking"
              description="Receive real-time updates on your order status via SMS or Email."
            />
          </div>

          <div className="bg-muted p-8 rounded-3xl border border-border">
            <h3 className="font-bold text-xl mb-4">Refunds & Returns</h3>
            <p className="text-sm leading-relaxed mb-6">
              If your hardware arrives damaged or doesn't work out of the box,
              we offer a 3-day DOA (Dead on Arrival) replacement guarantee. For
              more details, please visit our Terms & Conditions page.
            </p>
            <div className="flex flex-wrap gap-4 font-bold text-xs uppercase tracking-widest opacity-60">
              <span className="flex items-center gap-2 italic">
                ● Quality Checked
              </span>
              <span className="flex items-center gap-2 italic">
                ● Insured Transit
              </span>
              <span className="flex items-center gap-2 italic">
                ● Local Support
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function ShippingCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-card border border-border p-6 rounded-3xl hover:shadow-xl hover:shadow-primary/5 transition-all">
      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
        {icon}
      </div>
      <h4 className="font-extrabold text-lg mb-2">{title}</h4>
      <p className="m-0 text-sm opacity-70 leading-relaxed">{description}</p>
    </div>
  );
}

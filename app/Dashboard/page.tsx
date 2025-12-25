import React from "react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="max-w-6xl mx-auto p-2">
      <header
        className="mb-8 bg-white p-4 py-7 rounded-lg border shadow
      "
      >
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Overview and quick links for admin tasks
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-8">
        <Link
          href="/dashboard/analatic/2025-12"
          className="group block p-6 rounded-lg border hover:shadow-lg transition bg-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Analytics</h3>
              <p className="text-sm text-muted-foreground mt-1">
                View sales and traffic charts
              </p>
            </div>
            <div className="text-2xl opacity-60">📈</div>
          </div>
        </Link>

        <Link
          href="/dashboard/manegeOrder"
          className="group block p-6 rounded-lg border hover:shadow-lg transition bg-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Manage Orders</h3>
              <p className="text-sm text-muted-foreground mt-1">
                See, update and ship orders
              </p>
            </div>
            <div className="text-2xl opacity-60">📦</div>
          </div>
        </Link>

        <Link
          href="/dashboard/productsSet"
          className="group block p-6 rounded-lg border hover:shadow-lg transition bg-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Products</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Add, edit or remove products
              </p>
            </div>
            <div className="text-2xl opacity-60">🛒</div>
          </div>
        </Link>

        <Link
          href="/dashboard/productsSet/prod_add"
          className="group block p-6 rounded-lg border hover:shadow-lg transition bg-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Add Product</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Quickly create a new product
              </p>
            </div>
            <div className="text-2xl opacity-60">➕</div>
          </div>
        </Link>

        <Link
          href="/dashboard/orders"
          className="group block p-6 rounded-lg border hover:shadow-lg transition bg-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Orders</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Recent orders and status
              </p>
            </div>
            <div className="text-2xl opacity-60">🧾</div>
          </div>
        </Link>

        <Link
          href="/dashboard/profile"
          className="group block p-6 rounded-lg border hover:shadow-lg transition bg-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Profile / Settings</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Manage account and preferences
              </p>
            </div>
            <div className="text-2xl opacity-60">⚙️</div>
          </div>
        </Link>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-6 rounded-lg border">
        <div className="p-4 rounded-lg border">
          <p className="text-sm text-muted-foreground">Total revenue</p>
          <p className="text-2xl font-semibold">$12,348</p>
        </div>
        <div className="p-4 rounded-lg border">
          <p className="text-sm text-muted-foreground">New orders</p>
          <p className="text-2xl font-semibold">42</p>
        </div>
        <div className="p-4 rounded-lg border">
          <p className="text-sm text-muted-foreground">Low stock</p>
          <p className="text-2xl font-semibold">7 items</p>
        </div>
      </section>
    </main>
  );
}

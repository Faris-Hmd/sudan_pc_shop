# 🖥️ Sudan PC Shop — Premium Hardware Ecosystem

A high-performance, aesthetically driven e-commerce platform dedicated to professional computer hardware. Built with **Next.js 16**, **Tailwind CSS 4**, and **Firebase**, this application delivers a "Pro-Hardware" experience with a high-density gallery, technical typography, and deep-navy aesthetics.

---

## 🚀 Vision & Design Philosophy

Sudan PC Shop isn't just a store; it's a technical ecosystem. Our design philosophy focuses on:

- **High-Intensity Information**: Dense grids (up to 8 columns) and compact components to allow power users to browse hundreds of components efficiently.
- **Glassmorphism & Depth**: Advanced UI patterns using backdrop blurs, radial glows, and pulsing micro-animations.
- **Hardware-First UI**: Minimalist `rounded-sm` corners, uppercase technical labels, and a specialized navy/black dark mode designed for immersion.

---

## 🛠️ Tech Stack & Architecture

### **Core**

- **Next.js 16 (App Router)**: Utilizing server components for performance and client-side interactivity for real-time reactivity.
- **React 19**: Leveraging the latest concurrent features.
- **Tailwind CSS 4**: Implementing a custom design system with high-density utilities.

### **Backend & Auth**

- **Firebase Firestore**: Real-time NoSQL database for products, users, and orders.
- **NextAuth (v5 Beta)**: Robust session management with Google and Email provider support.
- **SWR**: Performance-first data fetching with de-duplication and optimistic UI patterns.

### **UX & UI**

- **Embla Carousel**: Powering the high-intensity "Featured Hardware" carousels.
- **Lucide React**: Specialized technical iconography.
- **Recharts**: Data visualization for user stats and order tracking.
- **Standardized Loading**: Global `<Loading />` and `<Spinner />` system with glassmorphic layers.

---

## ✨ Key Features

- **⚡ High-Density Catalog**: Optimized product grids that scale from mobile to 8-column desktop layouts.
- **🛒 Reactive Cart System**: Real-time cross-tab syncing using custom hooks and LocalStorage persistence.
- **🔍 Advanced Sorting**: Instant client-side sorting by Price, Name, and Category.
- **👤 Technical Profile**: Verified member status, system-level metadata, and modular address management.
- **📦 Order Ecosystem**: Detailed order tracking and history with status-based coloring.
- **⚙️ Automated Seeding**: Controlled API route (`/api/seed`) to populate the store with diverse, pro-grade hardware data.

---

## 📦 Getting Started

### 1. Requirements

- Node.js 20+
- A Google Cloud / Firebase project for database services.

### 2. Installation

```bash
git clone <repository-url>
cd sudan_pc_shop
npm install
```

### 3. Environment Setup

Create a `.env.local` file with the following keys:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...

AUTH_SECRET=... # Run 'npx auth secret' to generate
AUTH_GOOGLE_ID=...
AUTH_GOOGLE_SECRET=...
```

### 4. Run Development

```bash
npm run dev
```

---

## 🛡️ Administrative Info

- **Production Seeding**: To seed the production database, visit `/api/seed?pass=seed_me_2024`.
- **System Version**: v2.4.0 (Hardware-Gallary Edition)

---

> Built by Antigravity AI for the Sudan PC Shop Project.

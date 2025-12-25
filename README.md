# 🖥️ PC Parts Haven

A modern, high-performance e-commerce platform for computer hardware, built with **Next.js** and **Firebase**. This application allows users to browse components, manage a shopping cart, and complete orders with real-time data syncing.

---

## 🚀 Key Features

- **Real-time Inventory:** Product stock levels sync instantly across all clients using **Firebase Firestore**.
- **Authentication:** Secure user sign-up/login (Email/Password & Google) via **Firebase Auth**.
- **Image Hosting:** High-resolution component images stored and served via **Firebase Storage**.
- **Custom PC Builder:** Filter components by compatibility (Socket, Form Factor, etc.) and calculate total power draw.
- **Shopping Cart:** Persistent cart logic using a mix of LocalStorage and Firestore for guest/user syncing.
- **Admin Dashboard:** Specialized routes to add/edit products, manage stock, and track order status.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15+ (App Router)
- **Database:** Firebase Firestore (NoSQL)
- **Authentication:** Firebase Auth
- **Storage:** Firebase Storage
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn UI / Lucide React
- **Toast Notifications:** Sonner

---

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone github.com
cd pc-component-shop
npm install
```

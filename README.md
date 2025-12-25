🖥️ PC Parts Haven
A modern, high-performance e-commerce platform for computer hardware, built with Next.js and Firebase. This application allows users to browse components, manage a shopping cart, and complete orders with real-time data syncing.
🚀 Key Features
Real-time Inventory: Product stock levels sync instantly across all clients using Firebase Firestore.
Authentication: Secure user sign-up/login (Email/Password & Google) via Firebase Auth.
Image Hosting: High-resolution component images stored and served via Firebase Storage.
Custom PC Builder: Filter components by compatibility (Socket, Form Factor, etc.) and calculate total power draw.
Shopping Cart: Persistent cart logic using a mix of LocalStorage and Firestore for guest/user syncing.
Admin Dashboard: Specialized routes to add/edit products, manage stock, and track order status.
🛠️ Tech Stack
Framework: Next.js (App Router)
Database: Firebase Firestore (NoSQL)
Authentication: Firebase Auth
Storage: Firebase Storage
Styling: Tailwind CSS
UI Components: Radix UI / Shadcn UI
Notifications: Sonner
📦 Installation & Setup
To run this project locally, follow these steps:

1. Clone the Repository
   bash
   git clone github.com
   cd pc-component-shop
   Use code with caution.

2. Install Dependencies
   bash
   npm install
   Use code with caution.

3. Firebase Configuration
   Create a project in the Firebase Console.
   Enable Firestore Database, Authentication, and Storage.
   Create a .env.local file in the root directory and add your Firebase config:
   env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   Use code with caution.

4. Run the Development Server
   bash
   npm run dev
   Use code with caution.

Open http://localhost:3000 in your browser to see the result.
🔥 Firestore Structure
The database is organized into the following main collections:
products: Stores component details (name, price, category, specs, images).
orders: Stores customer purchase history and shipping status.
users: Stores user profiles and saved PC builds.
categories: Defines the hierarchy (CPUs, GPUs, Motherboards, etc.).
🤝 Contributing
Fork the project.
Create your feature branch (git checkout -b feature/AmazingFeature).
Commit your changes (git commit -m 'Add some AmazingFeature').
Push to the branch (git push origin feature/AmazingFeature).
Open a Pull Request.
📜 License
Distributed under the MIT License. See LICENSE for more information.
📧 Contact
Your Name - your@email.com
Project Link: github.com

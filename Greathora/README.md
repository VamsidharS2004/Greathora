# 👑 Greathora — Couture & Executive Wear

> *"Every Woman Has a Story. Dress for Yours."*

Welcome to the official repository for **Greathora**, a full-stack, responsive e-commerce web application tailored for executive fashion, boardroom tailoring, and luxury contemporary office wear for modern women.

---

## 🌟 Key Highlights & Features

- **📱 Full Mobile, Tablet & Desktop Responsiveness**: Crafted using Tailwind CSS breakpoints with mobile-optimized navigation drawers, filter sidebars, and slide-over shopping bag drawers.
- **🛍️ Complete Product Catalog & Filtering**: Filter by Category (*Blazers, Shirts, Tops, Trousers, Dresses, Skirts, Co-Ord Sets, Knitwear, Outerwear*), Collection (*CEO Collection, Executive Edit, Power Dressing*), Occasion, Color, Size, and Price, plus Search and Sorting.
- **🛒 Interactive Shopping Bag & Express Checkout**: Instant quantity updates, color/size swatch selection, shipping address management, and encrypted payment method selection.
- **👤 User Accounts & Order History**: Customer sign-up, login, and order tracking dashboard.
- **🔁 Interactive Return & Exchange Portal**: Submit size exchange or return refund requests seamlessly with real-time feedback.
- **📬 Client Care & Contact Form**: Fully integrated contact inquiry form sending messages to database records.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite 6, Tailwind CSS 3, Lucide React Icons, React Router DOM 6
- **Backend**: Node.js, Express.js, REST API Architecture
- **Database**: SQLite (via `better-sqlite3`)
- **Authentication**: JSON Web Tokens (JWT) & bcryptjs password hashing

---

## 📂 Project Directory Structure

```
Greathora/
├── backend/                       # Node.js + Express REST API Server
│   ├── database.sqlite            # SQLite Database File
│   ├── db.js                      # Database Schemas & Initialization
│   ├── index.js                   # Express Server API Routes
│   ├── seed.js                    # Database Seeder Script
│   └── package.json
│
├── frontend/                      # React + Vite + Tailwind CSS App
│   ├── public/
│   │   └── images/products/       # Extracted Product Images
│   ├── src/
│   │   ├── components/            # Header, Footer, CartDrawer, ProductCard, SearchModal
│   │   ├── context/               # ShopContext.jsx (Cart, Wishlist, Auth state)
│   │   ├── pages/                 # Home, Shop, ProductDetail, Checkout, Account, About, Contact, Policy
│   │   ├── App.jsx                # React Router Setup
│   │   └── main.jsx               # Entry Point
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## 🚀 How to Run Locally

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v18+) installed on your machine.

---

### 2. Start Backend Server
Open a terminal inside the project:
```bash
cd backend
npm install
npm run seed     # Populates categories, collections & 30+ products
npm start        # Starts Express server on http://localhost:5000
```

---

### 3. Start Frontend Development Server
Open a **second terminal window**:
```bash
cd frontend
npm install
npm run dev      # Starts Vite dev server on http://localhost:3000
```

---

### 4. Open in VS Code Live Preview
1. Open **VS Code** and press `Ctrl + Shift + P` (or `Cmd + Shift + P`).
2. Select **`Simple Browser: Show`**.
3. Type `http://localhost:3000` and hit **Enter**.

---

## 📜 Client Care & Registered Office
- **Company**: Greathora
- **Email**: `support@greathora.com`
- **Customer Care**: `+91 9770305316`
- **Business Hours**: Monday – Sunday | 10:00 AM – 7:00 PM (IST)
- **Registered Office**: Hyderabad, India

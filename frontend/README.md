# ShopHub - E-Commerce Frontend

A modern, attractive React-based frontend for the E-Commerce application.

## Features

- 🎨 Beautiful, modern UI with Tailwind CSS
- 🛍️ Product browsing and shopping cart
- 📦 Order management
- 👤 User authentication
- 🔧 Admin product management
- 📱 Fully responsive design
- ⚡ Fast and optimized with Vite

## Tech Stack

- **React 18** - UI Library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - API calls
- **Lucide React** - Icons
- **React Toastify** - Notifications

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Backend server running on `http://localhost:8080`

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## Project Structure

```
frontend/
├── src/
│   ├── components/      # Reusable components
│   ├── context/         # React context providers
│   ├── pages/           # Page components
│   ├── services/        # API services
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── index.html           # HTML template
└── package.json         # Dependencies
```

## Pages

- **Home** - Welcome page with user registration/login
- **Products** - Browse all products and add to cart
- **Cart** - View cart items and checkout
- **Orders** - View order history
- **Admin Products** - Manage products (admin only)

## API Integration

The frontend connects to the Spring Boot backend running on port 8080. All API requests are proxied through Vite's dev server.

## User Roles

- **USER** - Can browse products, add to cart, and place orders
- **ADMIN** - Can manage products in addition to user features

## Enjoy Shopping! 🛒

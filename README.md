# Kigali Tech Store 🇷🇼

A premium e-commerce Single Page Application (SPA) built with Vue 3, Vite, and Tailwind CSS. This store features a curated selection of gadgets and electronics with a Rwanda-inspired aesthetic.

## ✨ Features

- **Dynamic Product Catalog**: Fetched from [Fake Store API](https://fakestoreapi.com).
- **Advanced Filtering**: Filter by category, search by title, and sort by price or rating.
- **Persistent Shopping Cart**: State managed by Pinia with localStorage persistence.
- **Personalized Wishlist**: Save favorite gadgets for later.
- **User Authentication**: Mock JWT-based login and registration system.
- **Secure Checkout**: Multi-step checkout flow with Stripe payment integration (Test Mode).
- **User Profile**: Order history tracking and account management.
- **Responsive Design**: Mobile-first approach using Tailwind CSS.
- **Premium UX**: Glassmorphism effects, smooth transitions, and Kigali-themed color palette.

## 🛠️ Tech Stack

- **Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite
- **Routing**: Vue Router 4
- **State Management**: Pinia
- **Styling**: Tailwind CSS
- **Icons**: Lucide Vue Next
- **Carousels**: Swiper.js
- **HTTP Client**: Axios

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/kigali-tech-store.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## 🎨 Theme Colors

Inspired by the Rwanda Flag:
- **Kigali Blue**: `#00A1DE` (Innovation & Peace)
- **Kigali Yellow**: `#FAD201` (Economic Development)
- **Kigali Green**: `#20603D` (Prosperity & Hope)

## 📦 Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── layout/     # Header, Footer
│   └── products/   # ProductCard, etc.
├── stores/         # Pinia state management
├── views/          # Page components (Routes)
├── router/         # Vue Router configuration
└── assets/         # Global styles and assets
```

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---
Built with ❤️ for Kigali's tech community.

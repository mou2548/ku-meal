# KU-Meal

KU-Meal is a web-based food ordering system designed for Kasetsart University canteens. Built with React, Tailwind CSS, and Supabase, it allows students to browse shops, add items to cart, pay via PromptPay, and queue up for pickup. Shop owners can also monitor incoming orders.

## 🛠️ Tech Stack

| Layer       | Technology       |
|-------------|------------------|
| Frontend    | React + Vite     |
| Styling     | Tailwind CSS     |
| Backend     | Supabase (PostgreSQL + Auth + Storage) |
| Hosting     | Vercel           |

## 📦 Features

- 🔒 Nontri Account Login system (coming soon)
- 🍽️ Browse canteens and shops
- 🛒 Cart with item quantity & price tracking
- 📲 PromptPay QR code payment
- ⏳ Queue number generation
- 🧾 Order tracking for shop owners
- 📱 Responsive design for mobile/desktop

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/ku-meal.git
cd ku-meal
```

### 2. Install Dependencies
```bash
Copy
Edit
npm install
```

### 3. Setup Environment Variables
Create a .env file in the root:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run the App Locally
```bash
npm run dev
```

MIT License © 2025 Patiphat Moungmaithong
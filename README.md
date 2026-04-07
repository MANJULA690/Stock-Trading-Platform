# TradeX — Stock Trading Platform

A complete full-stack stock trading platform built with React (frontend) and Node.js + Express + MongoDB (backend).

## Features

### Frontend

- **Home page** — Hero, features, pricing, education sections
- **Signup / Login** — Full auth forms with JWT
- **Products page** — Platform showcase
- **Pricing page** — Brokerage calculator + complete fee table
- **Support page** — FAQ accordion + ticket creation form
- **About page** — Team, mission, stats
- **Dashboard** (protected)
  - Overview with portfolio chart (Recharts)
  - Holdings with P&L
  - Order history with filters
  - Live markets with 20 NSE stocks + order placement modal
  - Funds management

### Backend

- **Auth** — Register / Login with bcrypt + JWT
- **Orders** — Place BUY/SELL, balance deduction, holdings update
- **Portfolio** — Holdings with live P&L calculation
- **Watchlist** — Add/remove stocks
- **Support** — Create & track tickets
- **Stocks** — Mock live market data for 20 NSE stocks

## Tech Stack

| Layer    | Tech                                       |
| -------- | ------------------------------------------ |
| Frontend | React 18, React Router v6, Recharts, Axios |
| Backend  | Node.js, Express.js                        |
| Database | MongoDB (Mongoose)                         |
| Auth     | JWT + bcryptjs                             |
| Styling  | Custom CSS (dark theme, CSS variables)     |

## Project Structure

```
TradeX/
├── frontend/          # React app
│   └── src/
│       ├── context/        # AuthContext (global user state)
│       ├── dashboard/      # Protected dashboard views
│       │   ├── Dashboard.js    (layout + sidebar)
│       │   ├── Overview.js
│       │   ├── Holdings.js
│       │   ├── Orders.js
│       │   ├── Markets.js      (trade modal included)
│       │   └── DashboardFunds.js
│       └── landing_page/   # Public pages
│           ├── Navbar.js
│           ├── Footer.js
│           ├── home/
│           ├── signup/
│           ├── about/
│           ├── products/
│           ├── pricing/
│           └── support/
│
└── backend/           # Express API
    ├── index.js
    ├── models/
    │   ├── User.js
    │   ├── Order.js
    │   ├── Portfolio.js
    │   ├── Watchlist.js
    │   └── Ticket.js
    ├── routes/
    │   ├── auth.js
    │   ├── user.js
    │   ├── stocks.js
    │   ├── orders.js
    │   ├── portfolio.js
    │   ├── watchlist.js
    │   └── support.js
    └── middleware/
        └── auth.js
```

## Setup

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### 1. Backend

```bash
cd backend
cp .env.example .env         # Edit with your MongoDB URI & JWT secret
npm install
npm run dev                  # Runs on http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
npm install
npm start                    # Runs on http://localhost:3000
```

The frontend proxies API calls to `http://localhost:5000` via `"proxy"` in `package.json`.

## API Endpoints

| Method | Endpoint            | Auth | Description                 |
| ------ | ------------------- | ---- | --------------------------- |
| POST   | /api/auth/register  | —    | Register new user           |
| POST   | /api/auth/login     | —    | Login, get JWT              |
| GET    | /api/auth/me        | ✓    | Get current user            |
| GET    | /api/stocks         | —    | All stocks with live prices |
| GET    | /api/stocks/:symbol | —    | Single stock + 30d history  |
| GET    | /api/portfolio      | ✓    | Holdings + P&L summary      |
| POST   | /api/orders/place   | ✓    | Place BUY/SELL order        |
| GET    | /api/orders         | ✓    | Order history               |
| GET    | /api/watchlist      | ✓    | Get watchlist               |
| POST   | /api/watchlist/add  | ✓    | Add to watchlist            |
| POST   | /api/support/ticket | —    | Create support ticket       |
| PUT    | /api/user/add-funds | ✓    | Add funds to account        |

## Notes

- Stock prices are **simulated** (±1% random fluctuation from a base price). For production, integrate NSE/BSE WebSocket data feeds.
- Support ticket creation works without auth; registered users can view their own tickets via `/api/support/tickets`.
- Add money via the Funds page to enable trading. Demo users start with ₹0 balance.

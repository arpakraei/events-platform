Events Startup Project
A full-stack events ticketing platform built as part of the HackYourFuture Frontend curriculum. Users can browse events, view details, manage a cart, and purchase tickets with a full authentication flow.

Live Demo

Frontend: https://event-startup-project.vercel.app/
API: https://event-startup-project-q0x5.onrender.com

Features:

- Browse and search events with debounced search
- View full event details with ticket availability
- Register, login and sign out with JWT authentication
- Add tickets to cart with quantity selector
- Cart persists across sessions using localStorage
- Checkout flow that creates orders and decrements stock
- View order history and order details
- Auth-aware navigation
- Loading and error states on all data fetching
- Form validation on login and register
- 404 page for unknown routes

Tech Stack

- Frontend
  React 18
  React Router v6
  React Context (Auth + Cart)
  CSS Modules
  Vite

- Backend
  Node.js
  Express
  SQLite (via Knex)
  JWT (jsonwebtoken)
  bcrypt

Project Structure
mid-frontend-project/
├── api/ # Express backend
│ ├── src/
│ │ ├── routers/
│ │ │ ├── events.js # GET /api/events, GET /api/events/:id
│ │ │ ├── auth.js # POST /api/login, POST /api/register
│ │ │ └── orders.js # GET/POST /api/orders
│ │ ├── middleware/
│ │ │ └── auth.js # JWT verification middleware
│ │ ├── setup-db.js # Creates database tables
│ │ ├── seed-events.js # Seeds 100 events
│ │ └── index.mjs # Express app entry point
│ └── .env # Environment variables (not committed)
│
└── app/ # React frontend
└── src/
├── components/
│ ├── Layout/ # Header, nav, footer with Outlet
│ ├── EventList/ # Event list with search and filter
│ ├── EventCard/ # Single event summary card
│ ├── EventDetail/ # Full event detail with add to cart
│ ├── CartPage/ # Cart with update and remove
│ ├── Orders/ # Order history list
│ ├── OrderDetails/ # Single order detail
│ ├── Login/ # Login form with validation
│ ├── Register/ # Register form with validation
│ ├── HomePage/ # Landing page
│ └── NotFound/ # 404 page
├── context/
│ ├── AuthContext.jsx # User session context
│ └── CartContext.jsx # Cart state with localStorage
└── api.js # API URL helper

API Endpoints
Method Endpoint Auth Description
GET /api/events No Get all events (search, pagination)
GET /api/events/:id No Get single event
POST /api/register No Register new user
POST /api/login No Login and get JWT token
GET /api/orders Yes Get orders for logged in user
GET /api/orders/:id Yes Get single order with items
POST /api/orders Yes Create new order

Local Setup
Prerequisites

- Node.js v20+
- npm

1. Clone the repository
   git clone https://github.com/arpakraei/events-platform.git
   cd events-platform
2. Set up the API
   bashcd api
   cp .env-template .env
   npm install
   node src/setup-db.js
   node src/seed-events.js
   npm run dev
   API runs at: http://localhost:3001
3. Set up the frontend
   Open a new terminal:
   bashcd app
   cp .env-template .env
   npm install
   npm run dev
   App runs at: http://localhost:5173

Environment Variables

- API (api/.env)
- PORT=3001
- DB_CLIENT=sqlite3
- DB_SQLITE_FILENAME=./src/database.sqlite3
- DB_USE_NULL_AS_DEFAULT=true
- Frontend (app/.env)
- VITE_API_URL=http://localhost:3001

Weekly Progress

- Week1 Components & composition
- Week 2 State & conditional UI
- Week 3 Data fetching, forms & errors
- Week 4 Context & routing
- Week 5 Checkout, orders & deploy

Deliverables

Trello Board: https://trello.com/invite/b/69eaef76d754739cb3ca2d37/ATTI22238c4cd8938284b6c213af8088ffa2156BA574/event-startup-project

GitHub Repository: git clone https://github.com/arpakraei/events-platform.git

Deployed App: https://event-startup-project.vercel.app/

Author
Reza Arpakraei — HackYourFuture Aarhus

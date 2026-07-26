# Events Platform

A full-stack event discovery and ticketing application built during the HackYourFuture Denmark curriculum. Users can discover events, manage tickets in a persistent cart, authenticate securely, complete checkout, and review their orders.

[Live Demo](https://event-startup-project.vercel.app/) · [API](https://event-startup-project-q0x5.onrender.com)

## Features

* Browse, search, sort, and filter events
* Debounced search for improved performance
* View event details, prices, and ticket availability
* Register and log in using JWT authentication
* Add, update, and remove tickets from the cart
* Persist cart contents using `localStorage`
* Protect checkout from unauthenticated access
* Create orders and update ticket availability
* View order history and individual order details
* Handle loading, empty, error, and not-found states
* Validate login and registration forms
* Responsive interface built with CSS Modules

## Tech Stack

### Frontend

* React
* React Router
* React Context
* Vite
* CSS Modules

### Backend

* Node.js
* Express
* SQLite
* Knex
* JSON Web Tokens
* bcrypt

## Architecture

```text
events-platform/
├── api/
│   └── src/
│       ├── middleware/
│       │   └── auth.js
│       ├── routers/
│       │   ├── auth.js
│       │   ├── events.js
│       │   └── orders.js
│       ├── index.mjs
│       ├── seed-events.js
│       └── setup-db.js
│
└── app/
    └── src/
        ├── components/
        │   ├── CartPage/
        │   ├── EventDetail/
        │   ├── EventList/
        │   ├── Login/
        │   ├── OrderDetails/
        │   ├── Orders/
        │   └── Register/
        ├── context/
        │   ├── AuthContext.jsx
        │   └── CartContext.jsx
        └── api.js
```

## API Endpoints

| Method | Endpoint          | Authentication | Purpose                    |
| ------ | ----------------- | -------------: | -------------------------- |
| `GET`  | `/api/events`     |             No | Retrieve and search events |
| `GET`  | `/api/events/:id` |             No | Retrieve a single event    |
| `POST` | `/api/register`   |             No | Register a user            |
| `POST` | `/api/login`      |             No | Authenticate a user        |
| `GET`  | `/api/orders`     |            Yes | Retrieve the user’s orders |
| `GET`  | `/api/orders/:id` |            Yes | Retrieve one order         |
| `POST` | `/api/orders`     |            Yes | Create an order            |

## Local Development

### Requirements

* Node.js 20 or later
* npm

### 1. Clone the repository

```bash
git clone https://github.com/arpakraei/events-platform.git
cd events-platform
```

### 2. Start the API

```bash
cd api
cp .env-template .env
npm install
node src/setup-db.js
node src/seed-events.js
npm run dev
```

The API runs at `http://localhost:3001`.

### 3. Start the frontend

In another terminal:

```bash
cd app
cp .env-template .env
npm install
npm run dev
```

The frontend runs at `http://localhost:5173`.

## Environment Variables

API configuration in `api/.env`:

```env
PORT=3001
DB_CLIENT=sqlite3
DB_SQLITE_FILENAME=./src/database.sqlite3
DB_USE_NULL_AS_DEFAULT=true
```

Frontend configuration in `app/.env`:

```env
VITE_API_URL=http://localhost:3001
```

## What I Practised

* Designing reusable React components
* Managing authentication and cart state with Context
* Creating protected client and server workflows
* Building REST endpoints with Express
* Modelling events, orders, and order details in SQLite
* Handling loading, error, empty, and success states
* Deploying separate frontend and backend applications

## Status

The core application is complete and deployed. Future improvements may include automated testing, payment integration, accessibility auditing, and administrative event management.

## Author

**Ahmadreza “Reza” Pakraei**
Full-Stack Developer based in Aarhus, Denmark

[GitHub](https://github.com/arpakraei) · [LinkedIn](https://www.linkedin.com/in/ahmad-reza-pakraei/)

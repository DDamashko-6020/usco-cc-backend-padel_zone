# Pádel Backend API

API REST para una plataforma de Pádel construida con Node.js, Express, TypeScript y MongoDB (Mongoose).

## Requisitos
- Node.js 18+
- MongoDB en local o Atlas

## Setup

```bash
npm install
cp .env.example .env   # completar valores
npm run dev            # desarrollo (tsx watch)
npm run build && npm start   # producción
```

## Árbol del proyecto

```
src/
├── config/          # env, db (Mongoose), jwt
├── controllers/     # auth, user, court, booking, class, product, order
├── middlewares/     # auth (protect/authorize), errorHandler, notFound,
│                    # rateLimit, validate (express-validator)
├── models/          # User, Court, Booking, Class, Enrollment, Product, Order
├── routes/          # un router por módulo + index
├── types/           # augmentations de Express Request
├── utils/           # ApiError, ApiResponse, asyncHandler
├── app.ts           # wiring de middlewares y rutas
└── server.ts        # arranque, conexión a DB, graceful shutdown
```

## Endpoints (v1)

| Módulo | Rutas |
|---|---|
| auth | `POST /auth/register` · `POST /auth/login` · `GET /auth/me` · `POST /auth/logout` |
| users | `GET /users` (admin) · `GET/PUT/DELETE /users/:id` |
| courts | `GET /courts` · `POST /courts` (admin) · `PUT/DELETE /courts/:id` (admin) |
| bookings | `GET /bookings` · `POST /bookings` · `GET /bookings/:id` · `PATCH /bookings/:id/cancel` |
| classes | `GET /classes` · `POST /classes` (admin/coach) · `POST/DELETE /classes/:id/enroll` |
| products | `GET /products` · `GET /products/:id` · `POST/PUT/DELETE` (admin) |
| orders | `GET /orders` · `POST /orders` · `GET /orders/:id` · `PATCH /orders/:id/status` (admin) |

## Seguridad
- Helmet, CORS restringido a `CLIENT_URL`, `hpp`, `express-mongo-sanitize`
- Rate limiting global (`/api`) y estricto en `/auth`
- JWT Bearer, bcrypt (12 rounds), validación con express-validator
- Manejo centralizado de errores sin stack trace en producción
# usco-cc-backend-padel_zone

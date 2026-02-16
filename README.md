# Efortlex

Efortlex is a modern full-stack apartment listing and renting platform with three user roles: **Landlord**, **Tenant**, and **Admin**.

## Monorepo Structure

```text
Efortlex/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
└── README.md
```


## Dockerized Local Run Path

Run the whole stack (MongoDB + API + Frontend) with Docker Compose:

```bash
docker compose up --build
```

Or use helper scripts (better error messages):

```bash
# Git Bash / macOS / Linux
./scripts/docker-up.sh

# PowerShell
./scripts/docker-up.ps1
```

Services:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- MongoDB: mongodb://localhost:27017/efortlex

To stop:

```bash
docker compose down
```

To stop and remove database volume:

```bash
docker compose down -v
```


### Docker Troubleshooting

If you see `no configuration file provided: not found`:
- Ensure you are in the project root (same folder containing `docker-compose.yml`).
- Run `ls -la` and verify `docker-compose.yml` is listed.
- If missing, re-download/re-clone the latest repository before running Compose.

If you see `docker: command not found`:
- Install Docker Desktop and restart your terminal session.

## Backend (Node.js + Express + MongoDB)

### Key Features
- JWT authentication with role-based access control.
- CRUD APIs for apartment listings with listing approval flow.
- Tenant rental applications with document metadata.
- Mock payment workflow with status updates.
- Maintenance request lifecycle.
- Admin analytics endpoints.
- Mock email notification service for status updates.

### Environment Variables (`backend/.env`)

```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/efortlex
JWT_SECRET=super-secret-key
FRONTEND_URL=http://localhost:5173
```

### API Routes

- `POST /api/auth/signup` – Register user (landlord, tenant, admin)
- `POST /api/auth/login` – Login and receive JWT
- `GET /api/auth/me` – Get current user profile
- `GET /api/listings/public` – Public listings with filters, sorting, pagination
- `GET /api/listings` – Listings visible to authenticated user
- `POST /api/listings` – Create listing (landlord)
- `PUT /api/listings/:id` – Update listing (landlord/admin)
- `DELETE /api/listings/:id` – Delete listing (landlord/admin)
- `PATCH /api/listings/:id/approve` – Approve/reject listing (admin)
- `POST /api/applications` – Submit rental application (tenant)
- `GET /api/applications` – View applications by role
- `PATCH /api/applications/:id/status` – Update application status (landlord/admin)
- `POST /api/payments` – Create mock payment (tenant)
- `GET /api/payments` – View payments by role
- `PATCH /api/payments/:id/status` – Update payment status (landlord/admin)
- `POST /api/maintenance` – Create maintenance request (tenant)
- `GET /api/maintenance` – View maintenance requests by role
- `PATCH /api/maintenance/:id` – Update maintenance request status (landlord/admin)
- `GET /api/admin/users` – Manage users (admin)
- `PATCH /api/admin/users/:id/role` – Update user role (admin)
- `GET /api/admin/analytics` – Platform analytics (admin)

### MongoDB Schema Overview

- **User**: name, email, passwordHash, role, profile
- **Listing**: landlord, title, address, location, rent, bedrooms, amenities, photos, status
- **Application**: tenant, listing, landlord, documents, status
- **Payment**: tenant, landlord, listing, amount, status, reference
- **MaintenanceRequest**: tenant, landlord, listing, issue, priority, status

## Frontend (React + Vite + TailwindCSS)

### Pages
- Landing page with featured listings and filter/search controls.
- About, Services, and Contact pages.
- Global top navigation with dashboard role selector (tenant/landlord/admin).
- Login and signup pages.
- Landlord dashboard: listing management, applications, payments, maintenance.
- Tenant dashboard: discover listings, apply, pay rent, maintenance requests.
- Admin dashboard: user management, listing approval, platform analytics.

### Run Locally

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev
```

The frontend expects backend API at `http://localhost:5000/api`.

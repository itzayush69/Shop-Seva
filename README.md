# 🛍️ Shop-Seva

A fullstack web application to support local shopkeepers and vendors — built with a modern tech stack including **React (Vite + Tailwind CSS)** for the frontend and **NestJS + SQLite + Prisma ORM** for the backend.

---

## 🧱 Tech Stack

### 🖥️ Frontend
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [PostCSS](https://postcss.org/)

### 🔧 Backend
- [NestJS](https://nestjs.com/)
- [SQLite](https://www.sqlite.org/)
- [Prisma ORM](https://www.prisma.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)

---

## 📸 Screenshots

### 🏠 Homepage
![Homepage](./assets/1.png)

### 🔍 Product Listing
![Product Listing](./assets/2.png)

### 🛒 Cart View
![Cart View](./assets/3.png)

### 🧾 Order Summary
![Order Summary](./assets/4.png)

---
## 🗂️ Folder Structure

```
Shop-Seva/
├── frontend/     # Vite + React + Tailwind
└── backend/      # NestJS + SQLite + Prisma
```

---

## 🧩 Architecture Flow

```mermaid
flowchart TD
  %% Frontend
  A[User or Seller]
  A --> B[Frontend: React + Vite + TailwindCSS]
  B --> B1[API Layer using Fetch or Axios]
  B1 -->|HTTP Request| C[Backend API with NestJS]

  %% Auth system
  C --> D1[Auth Module using JWT]
  D1 --> D2[Validate User or Seller]
  D1 -->|Return Token| B1

  %% Business Logic and DB
  C --> E[Business Logic Services]
  E --> F[Prisma ORM]
  F --> G[SQLite Database]

  %% Database Tables
  G --> G1[User Table]
  G --> G2[Seller Table]
  G --> G3[Product Table]

  %% Tooling
  subgraph Tooling
    T1[TypeScript]
    T2[Prettier and ESLint]
    T3[Git and GitHub]
    T4[NPM or PNPM]
    T5[VS Code]
  end

  B --> T1
  C --> T1
  C --> T2
  T3 --> B
  T3 --> C
  T4 --> B
  T4 --> C
  T5 --> T1
  T5 --> T2
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/itzayush69/Shop-Seva.git
cd Shop-Seva
```

---

### 2. Setup Frontend

```bash
cd frontend
pnpm install
pnpm run dev
```

> Starts the Vite dev server on `http://localhost:5173`

---

### 3. Setup Backend

```bash
cd ../backend
pnpm install
pnpm run start:dev
```

> Starts the NestJS backend server on `http://localhost:3000`

---

## 🧩 Database (SQLite + Prisma)

Prisma is used as the ORM for type-safe database interactions.

### Initial Setup

```bash
cd backend
pnpm install prisma --save-dev
npx prisma init
```

This creates a `/prisma/schema.prisma` file and a `.env` file.

### Example `.env`

```env
DATABASE_URL="file:./dev.db"
```

### Generate & Apply Migrations

```bash
npx prisma migrate dev --name init
```

### Prisma Studio (Optional)

To open a local DB GUI:

```bash
npx prisma studio
```

---

## 📄 Environment Variables

Create `.env` files in both `frontend/` and `backend/` folders if needed.

Examples:

- `frontend/.env`
- `backend/.env`

Common values:

```env
# frontend/.env
VITE_API_URL=http://localhost:3000

# backend/.env
DATABASE_URL="file:./dev.db"
JWT_SECRET=yourSecretKey
```

---

## 📦 Build Commands

### Frontend

```bash
cd frontend
pnpm build
```

### Backend

```bash
cd backend
pnpm build
```

---

## 🤝 Contribution

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---
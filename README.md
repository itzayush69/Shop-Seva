
# 🛍️ Shop-Seva

A fullstack web application to support local shopkeepers and vendors — built with a modern tech stack including **React (Vite + Tailwind CSS)** for the frontend and **NestJS + SQLite + Drizzle ORM** for the backend.

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
- [Drizzle ORM](https://orm.drizzle.team/)
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)

---

## 🗂️ Folder Structure

```
Shop-Seva/
├── frontend/     # Vite + React + Tailwind
└── Backend/      # NestJS + SQLite + Drizzle ORM
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
npm install
npm run dev
```

> Starts the Vite dev server on `http://localhost:5173`

---

### 3. Setup Backend

```bash
cd ../Backend
npm install
npm run start:dev
```

> Starts the NestJS backend server on `http://localhost:3000`

---

## 🧩 Database (SQLite + Drizzle ORM)

Drizzle ORM is used with SQLite for lightweight relational data management.

### Drizzle CLI (if using)
If you're using Drizzle CLI for migrations, install it globally:

```bash
npm install -g drizzle-kit
```

Make sure to configure your `drizzle.config.ts` file properly.

### Running Migrations

```bash
npx drizzle-kit push:sqlite
```

---

## 📄 .env Configuration

Create `.env` files in both `frontend/` and `backend/` folders if needed.

Examples:
- `/frontend/.env`
- `/Backend/.env`

You might define your SQLite DB path or API keys here.

---

## 📦 Build Commands

### Frontend

```bash
cd frontend
npm run build
```

### Backend

```bash
cd Backend
npm run build
```

---
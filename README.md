# Building

A REST API for shared expense management. Create groups, add members, log expenses, and track who owes whom.

## Tech Stack

- **Runtime** — Node.js + TypeScript
- **Framework** — Express.js
- **Database** — PostgreSQL
- **ORM** — Prisma
- **Validation** — Zod
- **Auth** — JWT

## Features

- User authentication (register, login)
- Group creation and member management
- Expense logging with equal and exact split modes
- Balances derived from split records — no sync issues

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL

### Installation

```bash
git clone <repo-url>
cd <project-name>
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
JWT_SECRET=your_jwt_secret
PORT=3000
```

### Database Setup

```bash
npx prisma migrate dev
```

### Run

```bash
# development
npm run dev

# production
npm run build
npm start
```

## API Overview

| Method | Endpoint                      | Description         |
| ------ | ----------------------------- | ------------------- |
| POST   | /api/auth/register            | Register a new user |
| POST   | /api/auth/login               | Login               |
| POST   | /api/groups                   | Create a group      |
| GET    | /api/groups                   | List user's groups  |
| POST   | /api/groups/:groupId/members  | Add a member        |
| POST   | /api/groups/:groupId/expenses | Create an expense   |
| GET    | /api/groups/:groupId/expenses | List group expenses |
| GET    | /api/expenses/:expenseId      | Get single expense  |
| PATCH  | /api/expenses/:expenseId      | Update expense      |
| DELETE | /api/expenses/:expenseId      | Delete expense      |

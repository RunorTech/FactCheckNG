// -----------------------------
// FILE: README.md
// -----------------------------
# FactCheckNG - Next.js + Prisma backend


This repository contains a working template for a backend using Next.js (app router), Prisma and PostgreSQL.


## Quick start


1. Install dependencies


```bash
npm install
```


2. Create a `.env` file at project root:


```
DATABASE_URL="postgresql://user:password@localhost:5432/dbname?schema=public"
```


3. Generate Prisma client & migrate


```bash
npx prisma generate
npx prisma migrate dev --name init
```


4. Run seed (optional)


```bash
npm run prisma:seed
```


5. Start dev server


```bash
npm run dev
```


## API examples


- `GET /api/states` -> list states
- `POST /api/states` body `{ name: string }` -> create state
- `GET /api/lgas` -> list LGAs
- `POST /api/lgas` body `{ name, stateId }`
- `GET /api/claims` -> list claims (query params `lgaId`, `category`)
- `POST /api/claims` -> create claim
- `GET /api/claims/:id` -> get claim with related items
- `PATCH /api/claims/:id` -> update claim
- `DELETE /api/claims/:id` -> delete claim


## Notes
- The Prisma schema in `prisma/schema.prisma` is the one you supplied. Run `prisma generate` after placing it.
- This repo focuses on the backend; you can hook a Next.js frontend or any other client.




// -----------------------------
// End of code document
// -----------------------------
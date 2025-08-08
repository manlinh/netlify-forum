# Netlify Forum (Next.js + Drizzle + Auth.js + Neon)

## Quick start
1. `npm i`
2. Create `.env.local` with:
```
DATABASE_URL=postgres://USER:PASS@HOST/DB?sslmode=require
AUTH_SECRET=...
EMAIL_SERVER=smtp://USER:PASS@HOST:PORT
EMAIL_FROM=Login <noreply@example.com>
NEXTAUTH_URL=http://localhost:3000
```
3. `npx drizzle-kit generate && npx drizzle-kit migrate`
4. `npm run dev`

## Deploy on Netlify
- Set env vars in Netlify: DATABASE_URL, AUTH_SECRET, NEXTAUTH_URL, EMAIL_SERVER, EMAIL_FROM
- `git push` (CI) or `netlify deploy --build --prod`

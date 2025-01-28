Uzochukwu Benneth's assessment

## Getting Started

1. Git clone
   First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Other Info:

Setup and Demo Instructions
Database Setup:

Follow this guide to set up a PostgreSQL database using Docker: Bytebase Blog.
Medusa App Setup:

Run npx create-medusa-app@latest to initialize the app.

Admin credentials:
Email: admin@medusa-test.com
Password: fHGuen5e8wUkYEV

Database Migration:
Local to Hosted Migration:
Export from local PostgreSQL:
pg_dump -U postgres -h localhost -p 5432 postgres > local_backup.sql
Import to hosted PostgreSQL:
psql 'postgresql://neondb_owner:npg_F82ukohdXraz@ep-nameless-mountain-a40whqli-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require' < local_backup.sql
Medusa Docs: Medusa Docs

Demo:
Watch the demo here: https://www.loom.com/share/2bd68ddfb17a401b8bad1be7531e645f?sid=b414b750-7236-4ce1-a147-83055d0d1a4c

Notes:
Outdated Next.js Head:
The Next.js Head API is outdated in Medusa v2, and instead, the metadata API should be used.

Medusa V2 Limitations:

Wishlist functionality and plugin installation are limited in Medusa v2. Specifically, only the Stripe payment plugin is supported.
Manual Fulfillment and other plugins are not supported in Medusa v2. More details here: Stack Overflow.
Deployment Issues:
Deployment on free platforms like Railway requires payment (due to $5/month minimum), but I can deploy on request.

Medusa V1 Stability:
While Medusa v1 is more stable and robust, I opted for v2 as it was recommended in the docs.

# SeJahit

Online clothing store web application. React frontend served by Nginx, Java Servlet backend on Tomcat, PostgreSQL database. Everything runs through Docker Compose.

```
Browser
  │ http://localhost/
  ▼
Nginx (React SPA build)
  │ /api/* → backend:8080
  ▼
Tomcat 11 (Java 17 Servlet WAR)
  │ JDBC
  ▼
PostgreSQL 17
```

## Prerequisites

- Docker Engine or Docker Desktop with **Compose v2**
- Port **80** free on the host
- Internet access on first build (pulls images and npm/Maven dependencies)

No local Node, Java, Maven, Tomcat, or PostgreSQL install is required for the Docker route.

## Quick start

From the repository root:

1. Create `.env` from the template:

   ```powershell
   Copy-Item -LiteralPath ".env.example" -Destination ".env"
   ```

   ```bash
   cp .env.example .env
   ```

2. Open `.env` and set a real password:

   ```dotenv
   POSTGRES_DB=SeJahit
   POSTGRES_USER=sejahit
   POSTGRES_PASSWORD=<replace-with-a-long-random-password>
   ```

   On the first start PostgreSQL creates the database and loads the seed schema from `db/init/sejahit.sql`.

3. Build and start everything:

   ```bash
   docker compose up --build
   ```

4. Open the app:

   ```
   http://localhost/
   ```

   Sanity-check the API:

   ```bash
   curl http://localhost/api/clothes
   ```

## URLs

| Service | URL |
|---|---|
| App (frontend) | http://localhost/ |
| API | http://localhost/api/users, `/api/images`, `/api/clothes`, `/api/cart`, `/api/cartinfo` |
| Backend / database | internal only (`backend:8080`, `db:5432`) — access through `/api/...` |

## Day-to-day commands

```bash
docker compose ps                 # service status
docker compose logs -f backend db frontend   # follow logs
docker compose up --build         # rebuild after source changes
docker compose down               # stop; keeps database data (pgdata volume)
docker compose down -v            # stop AND delete database data (destructive)
```

Database data survives `down`/`up` because it lives in the named `pgdata` volume. The schema/seed dump runs only when the volume is empty; use `down -v` to re-run it from scratch.

## Configuration

`.env` drives everything. Compose passes these to the backend:

- `POSTGRES_DB` — database name (also forms the JDBC URL)
- `POSTGRES_USER` — database user (also `DB_USER`)
- `POSTGRES_PASSWORD` — database password (also `DB_PASSWORD`)

Changing credentials after the first run causes auth errors (the existing volume keeps the old role). Restore the original values or recreate the volume.

## Local development (optional)

The full stack only runs through Compose. These work if you want to iterate on one service:

**Frontend** (from `frontend`):

```bash
npm ci
npm run dev       # Vite on http://localhost:5173
npm run lint
npm run build
```

**Backend** (from `backend`):

```bash
mvn clean package
```

Requires Node 20 and JDK 17 / Maven 3.9 installed locally, plus a reachable PostgreSQL.

## Troubleshooting

- **Port 80 already in use** — stop the conflicting service or change the host mapping in `docker-compose.yml`.
- **API errors right after startup** — Compose only orders startup; the database may still be loading `sejahit.sql`. Watch `docker compose logs -f db backend`.
- **Source edits not visible** — no bind mounts; rebuild with `docker compose up --build`.
- **localhost:8080/5432 refuse connections** — expected, those ports are internal only.

## Project layout

```
backend/              Java 17 Jakarta Servlet app (Maven, builds sejahit-1.0.war)
db/init/sejahit.sql   PostgreSQL schema + seed data (runs on empty volume)
frontend/             React 18 SPA (Vite build, served by Nginx)
docker-compose.yml    Full stack definition
.env.example          Environment template (copy to .env)
```

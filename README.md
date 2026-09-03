# InternArea

InternArea is a full-stack internship and job portal built as a learning-focused Internshala-style application. It combines a Next.js frontend with an Express API for internships, jobs, applications, administration, and a community public space.

> The repository currently contains a working frontend and backend foundation. Some frontend flows use browser `localStorage` demo data, while database-backed API features require MongoDB.

## Features

- Browse internship and job listings
- View listing details
- Submit and manage applications
- Admin login and administration screens
- User profile pages
- Public Space community feed
- Create posts with media metadata
- Like, comment on, and share posts
- Friend connections and posting limits
- Firebase client integration for authentication-related flows
- Responsive UI built with Tailwind CSS

## Technology Stack

### Frontend

- Next.js `15.2.1` with the Pages Router
- React `19`
- TypeScript
- Tailwind CSS `4`
- Redux Toolkit and React Redux
- Firebase
- Axios
- Swiper
- Lucide React
- React Toastify

### Backend

- Node.js
- Express `4`
- Mongoose and MongoDB
- CORS
- dotenv
- Nodemon for development

## Repository Structure

```text
.
├── backend/
│   ├── index.js             # Express server, port 5000
│   ├── db.js                # MongoDB connection
│   ├── Model/               # Mongoose models
│   ├── Routes/              # API route modules
│   ├── package.json
│   └── package-lock.json
├── internarea/
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── Components/      # Shared and feature components
│   │   ├── data/            # Local demo data and storage helpers
│   │   ├── firebase/        # Firebase client setup
│   │   ├── pages/            # Next.js pages and API routes
│   │   ├── store/            # Redux store
│   │   └── styles/           # Global styles
│   ├── package.json
│   └── package-lock.json
└── README.md
```

## Prerequisites

- Node.js 18.18 or newer
- npm 9 or newer
- MongoDB, only for database-backed API operations
- Firebase project credentials, only for flows that use Firebase

Check your versions:

```bash
node --version
npm --version
```

## Installation

Install each application independently from the repository root:

```bash
npm --prefix ./internarea ci
npm --prefix ./backend ci
```

Do not run `npm install` from the repository root because the root does not contain a `package.json`.

## Configuration

The backend reads `DATABASE_URL` through `dotenv`. If it is not supplied, it uses:

```text
mongodb://127.0.0.1:27017/internshala
```

Create `backend/.env` when using a different MongoDB instance:

```dotenv
DATABASE_URL=mongodb://127.0.0.1:27017/internshala
```

Keep real credentials out of Git. The frontend Firebase configuration is located in `internarea/src/firebase/firebase.js`; use your own Firebase project settings for authentication features.

## Run Locally

Start the backend in one terminal:

```bash
npm --prefix ./backend start
```

The API listens on [http://localhost:5000](http://localhost:5000).

Start the frontend in a second terminal:

```bash
npm --prefix ./internarea run dev
```

Open [http://localhost:3000](http://localhost:3000).

If port `3000` is occupied, use another port:

```bash
npm --prefix ./internarea run dev -- -p 3001
```

The backend continues to start when MongoDB is unavailable, but database-dependent routes will return errors until MongoDB is running.

## API Overview

All backend routes are prefixed with `/api`:

| Area | Methods and paths |
| --- | --- |
| Health check | `GET /` |
| Admin | `POST /api/admin/adminlogin` |
| Internships | `GET /api/internship`, `GET /api/internship/:id`, `POST /api/internship` |
| Jobs | `GET /api/job`, `GET /api/job/:id`, `POST /api/job` |
| Applications | `GET /api/application`, `GET /api/application/:id`, `POST /api/application`, `PUT /api/application/:id` |
| Public Space users | `POST /api/publicspace/user`, `GET /api/publicspace/user/:uid`, `PUT /api/publicspace/user/:uid/friend` |
| Public Space posts | `GET /api/publicspace/posts`, `POST /api/publicspace/post` |
| Post interactions | `POST /api/publicspace/posts/:id/like`, `/comment`, and `/share` |

Quick backend health check:

```bash
curl http://localhost:5000/
```

Expected response:

```text
hello this is internshala backend
```

## Frontend Routes

The main pages are available at:

- `/` - home page
- `/internship` - internship listings
- `/job` - job listings
- `/applications` - application administration
- `/userapplication` - user applications
- `/public-space` - community feed
- `/postInternship` - create an internship
- `/postJob` - create a job
- `/profile` - user profile
- `/login` - user login
- `/adminlogin` - admin login
- `/adminpanel` - admin panel

## Validation

Run frontend checks from the repository root:

```bash
npm --prefix ./internarea run lint
npm --prefix ./internarea exec tsc -- --noEmit
npm --prefix ./internarea run build
```

The backend does not currently define automated tests. Its configured test command intentionally exits with `Error: no test specified`.

## Troubleshooting

### `ENOENT: package.json` from npm

Run commands with the correct project prefix or change into the relevant directory. The repository root is not itself an npm project.

### `EADDRINUSE: address already in use :::5000`

Another backend process is already using port `5000`. Stop that process or identify it with:

```bash
npx kill-port 5000
```

Then start the backend again.

### MongoDB connection refused

Start MongoDB locally, or set `DATABASE_URL` in `backend/.env` to a reachable MongoDB instance. The frontend's local demo data can still render without MongoDB, but API operations that read or write models cannot complete.

### Frontend compilation is slow or stale

Stop other Next.js processes before rebuilding. Remove generated output from the frontend directory and restart:

```bash
rm -rf ./internarea/.next
npm --prefix ./internarea run dev
```

`.next/`, `node_modules/`, and environment files should remain uncommitted.

## Production Build

Build and serve the frontend:

```bash
npm --prefix ./internarea run build
npm --prefix ./internarea start
```

Run the backend with a process manager in production rather than relying on Nodemon:

```bash
node ./backend/index.js
```

Before deploying, configure MongoDB, Firebase, CORS policy, secrets, logging, and a production process manager. The current backend enables permissive CORS and is intended for development use.

## Development Notes

- Frontend demo records are stored in browser `localStorage` under `internarea_*` keys.
- The backend API and local demo data are separate data paths; changing one does not automatically update the other.
- The backend uses MongoDB models for persistent jobs, internships, applications, users, and posts.
- Do not commit `backend/.env` or other files containing credentials.

## License

No project license has been declared yet.

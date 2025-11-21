# UniClubs – Front & Back

Plateforme de gestion des clubs universitaires. Le frontend est construit avec **React + Vite** et le backend avec **Node.js/Express**, **PostgreSQL** et **JWT**.

## Structure

- `src/` : SPA React (étudiants & admins)
- `server/` : API REST (Express + Prisma + PostgreSQL)

## Prérequis

- Node.js 18+
- PostgreSQL (local ou hébergé)
- npm

## Installation

```bash
# Frontend
npm install

# Backend
cd server
npm install
cp env.example .env   # puis compléter les variables
```

Mettre à jour `DATABASE_URL`, `JWT_SECRET`, etc. dans `server/.env`.

## Base de données (backend)

```bash
cd server
npx prisma migrate dev --name init
npm run prisma:seed
```

La seed crée :

- Admin : `admin@uniclubs.com` / `Admin123!`
- Étudiant : `emma.johnson@university.edu` / `Student123!`

## Lancer les serveurs

```bash
# Frontend
npm run dev

# Backend (depuis server/)
npm run dev
```

- Frontend : http://localhost:5173
- Backend : http://localhost:4000/api

## Endpoints principaux

- `POST /api/auth/register` – inscription étudiant
- `POST /api/auth/login` – connexion (JWT)
- `GET /api/clubs` – lister les clubs
- `GET /api/clubs/:id` – détail d’un club
- `POST /api/clubs/:id/applications` – demande d’adhésion (étudiant)
- `GET /api/memberships` – admin : demandes à traiter
- `PATCH /api/memberships/:id/status` – admin : accepter/refuser
- `POST /api/events/club/:clubId` – admin : créer un événement
- `GET /api/notifications` – notifications de l’utilisateur connecté

Voir `server/src/routes` pour la liste complète.

## Notes de sécurité

- Toujours utiliser un `JWT_SECRET` fort en production.
- Configurer `FRONTEND_URL` (CORS) dans `.env`.
- Prisma peut générer le client avec `npm run prisma:generate`.

## Tests rapides

- `POST /api/auth/login` avec les identifiants seed → récupérer le token.
- Ajouter l’entête `Authorization: Bearer <token>` pour les routes protégées.

## Aller plus loin

- Ajouter l’envoi d’emails pour les notifications.
- Brancher le frontend sur l’API (`fetch` vers `VITE_API_URL`).
- Mettre en place un hébergement (Railway, Render, etc.) pour l’API/Postgres.

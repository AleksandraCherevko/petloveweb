# Petlove Web

Petlove Web is a Next.js application for browsing pet notices, managing favorites/viewed notices, and handling user profile actions (edit user, add/remove pets).

## Tech Stack

- Next.js (App Router)
- TypeScript
- React
- CSS Modules
- Zustand (auth store)
- React Hook Form + Yup
- React Select
- Axios / Fetch
- React Hot Toast

## Features

- Authentication flow (sign up / sign in / sign out)
- Protected routes (`/profile`, `/add-pet`)
- Notices list with filters:
  - category
  - gender
  - type
  - location
  - sort (popular/unpopular/cheap/expensive)
- Notice card actions:
  - Learn more (details modal)
  - Add/Remove favorite
- Profile page:
  - user info
  - edit profile modal
  - user pets list
  - favorites / viewed notices tabs
- Add pet form with validation
- Custom 404 page
- API proxy routes via Next.js (`/api/...`)

## Project Structure

- `app/` — routes, layouts, API route handlers
- `app/components/` — UI components
- `app/lib/` — API client, store, shared helpers
- `public/` — static assets (images/icons)

## Getting Started

### 1. Install dependencies
npm install

### 2. Run development server
npm run dev
Open: http://localhost:3000

### 3. Build for production
npm run build
npm start

## Scripts
- npm run dev — start dev server
- npm run build — build app
- npm start — run production build
- npm run lint — run linter

## Validation Rules (main forms)
### Add Pet
- title — required string
- name — required string
- imgURL — required image URL (http/https)
- species — required string
- birthday — required, format YYYY-MM-DD
- sex — required (male, female, multiple, unknown)

### Edit User
- name — required
- email — required, valid email
- phone — required, +38XXXXXXXXXX
- avatar — optional URL (if provided, must be valid image URL)

### Notes
- Some backend responses use 400 or 409 for already-existing favorite items; 
- frontend handles these states gracefully.
- Favorites/viewed are synced with user data from /api/users/current/full.
- Modal windows support close by:
- close button
- backdrop click
- Escape key

# 💪 FitLog — Workout Library & Planner

A dark, no-nonsense gym companion: browse lifts, lock them into today's plan, save others for later, and track the day's totals.

**Live:** https://fitlog-opal-seven.vercel.app/ · **Repo:** _add link_

## Technologies

Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS · Context API · react-hot-toast · lucide-react

## Features

1. Responsive workout library (1 / 2 / 3-column grid) fetched from the FitLog API with a loading spinner
2. Dynamic workout detail pages (`/workout/[id]`) with specs and instructions
3. Today's Plan (5-lift cap) and Saved lists with live navbar counters and toasts
4. My Plan dashboard: live Exercises / Minutes / Calories, tabs, Mark as Done, remove, empty state
5. Sort (Duration, Calories, Rating), search by name or tag, and localStorage persistence
6. Custom 404 page; reload-safe routing

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Deploy with `vercel` or by importing the repo on Vercel.

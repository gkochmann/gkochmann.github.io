# CodeCounsel — Interactive Product Demo

A polished, fully interactive SaaS demo for **CodeCounsel**, showing how the product keeps Friendli's approved intent aligned with what ships.

## What this demo shows

- **4 live use cases**: Privacy (Smart Profiles), Traditional ML (Nearby Ranking Model), GenAI (Plan Assistant), Design (Home Feed Redesign)
- **3-column review dashboard**: Approved Intent | Current Implementation | Diff & Review
- **Interactive review workflow**: create tasks, add comments, mark risk, draft disclosures
- **Mobile phone preview** for each use case with drift annotations
- **Source Explorer** across 9 connected systems
- **System Contracts table** with 12 monitored contracts
- **Global Audit Trail** with real-time updates from user actions

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Build for production

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

1. Update `vite.config.ts` — set `base` to your repo name:

```ts
base: '/your-repo-name/'
```

2. Build and push the `dist/` folder to `gh-pages` branch, or use the GitHub Pages action.

## Stack

- Vite + React + TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React icons

# 📅 Interactive Wall Calendar

A production-grade, interactive wall calendar component built for the **takeUforward Frontend Engineering Challenge**.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)](https://your-deploy-url.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---
## 📹 Demo
> 🌐 [Live on Vercel](https://interactive-calendar-glc5auce8-lavi-hks-projects.vercel.app/)

---
## ✨ Features

| Feature | Description |
|---|---|
| 🖼 **Wall Calendar Aesthetic** | Seasonal hero image paired with the date grid — changes every month |
| 📆 **Date Range Selector** | Click a start date, click an end date — visual states for start, end, and in-between days |
| 📝 **Integrated Notes** | Attach colour-coded sticky notes to any date range; persisted in `localStorage` |
| 🎌 **Holiday Markers** | Indian public holidays highlighted with a green dot and tooltip |
| 📱 **Fully Responsive** | Side-by-side on desktop, gracefully stacked on mobile |
| ♿ **Accessible** | ARIA labels, keyboard navigation, `focus-visible` rings throughout |
| ⚡ **Performance** | Local hero image assets from `public/images` with skeleton shimmer; no unnecessary external dependencies |

---

## 🛠 Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 14** (App Router) | SSR/SSG, `next/image` optimisation, Vercel-ready |
| Language | **TypeScript** | Type-safe props, hooks, and data shapes |
| Styling | **CSS Modules + CSS Variables** | Zero-runtime, scoped, theme-able without Tailwind overhead |
| Date logic | **date-fns v3** | Tree-shakeable, immutable, no global state |
| Icons | **lucide-react** | Consistent, lightweight SVG icons |
| Persistence | **localStorage** | Client-side only — no backend required per spec |
| Deployment | **Vercel** | Zero-config, previews on every PR |

---

## 🗂 Project Structure

```
wall-calendar/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout + metadata
│   │   └── page.tsx            # Entry point
│   ├── components/
│   │   ├── Calendar/
│   │   │   ├── WallCalendar.tsx   # Orchestrator component
│   │   │   ├── CalendarGrid.tsx   # Date grid with range rendering
│   │   │   ├── CalendarHeader.tsx # Month navigation
│   │   │   └── HeroImage.tsx      # Month-based hero photo
│   │   └── Notes/
│   │       └── NotesPanel.tsx     # Notes compose + list
│   ├── hooks/
│   │   └── useDateRange.ts        # Selection state machine
│   ├── lib/
│   │   └── holidays.ts            # Indian holiday data 2025-2026
│   └── styles/
│       └── globals.css            # All CSS (variables, layout, components)
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## 🚀 Setup & Local Development

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/wall-calendar.git
cd wall-calendar

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Local Hero Images

Place your manually downloaded monthly hero images into the `public/images` folder. Use these exact file names for the calendar to pick them automatically:

- `january.jpg`
- `february.jpg`
- `march.jpg`
- `april.jpg`
- `may.jpg`
- `june.jpg`
- `july.jpg`
- `august.jpg`
- `september.jpg`
- `october.jpg`
- `november.jpg`
- `december.jpg`

The component is configured to use these local image files directly, so no external image hosts are required.

If the image files are missing, the calendar will display a local fallback placeholder instead of failing with a broken image.

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

```bash
npx vercel --prod
```

---

## 🎨 Design Decisions

**Why CSS Variables over Tailwind?**  
The challenge calls for a wall-calendar *aesthetic* — a specific editorial look with paper tones, serif display fonts, and warm accents. CSS Variables gave me full control over the design system without Tailwind's utility sprawl cluttering the JSX. Components read more cleanly and the visual intent is clear.

**Why `date-fns` over `dayjs`?**  
`date-fns` v3 is fully tree-shakeable. Only the functions I use (`isSameDay`, `isWithinInterval`, `format`, `startOfDay`) are bundled. `dayjs` pulls in a larger baseline even with plugins.

**Why a two-phase selection state machine?**  
A simple "if start exists, set end" approach breaks when the user clicks the same cell twice, or clicks earlier than the start. The `phase: idle | selecting` machine handles all edge cases cleanly without conditional spaghetti.

**Why `localStorage` for notes?**  
The challenge spec explicitly says "client-side solutions like localStorage". Notes survive page refreshes and browser restarts with zero backend complexity.

---


## 📄 License

MIT © 2025 Your Name

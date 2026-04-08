# 🎬 2-Minute Demo Script — Interactive Wall Calendar
## takeUforward Frontend Engineering Challenge

---

### ⏱ TIMING GUIDE
| Segment | Duration |
|---|---|
| Hook + Intro | 0:00–0:15 |
| Architecture overview | 0:15–0:30 |
| Feature 1: Hero Image | 0:30–0:45 |
| Feature 2: Date Range | 0:45–1:10 |
| Feature 3: Notes | 1:10–1:30 |
| Responsiveness | 1:30–1:45 |
| Closing | 1:45–2:00 |

---

## 🎙 FULL SCRIPT

### [0:00 – 0:15] HOOK
*(Show finished calendar on screen — full desktop view)*

"This is the Interactive Wall Calendar I built for the takeUforward
Frontend Engineering Challenge. It's a production-grade React component
with a wall-calendar aesthetic, live date range selection, a persistent
notes system, and full mobile responsiveness. Let me walk you through
the technical decisions I made."

---

### [0:15 – 0:30] ARCHITECTURE
*(Switch to VS Code — show the src/ folder tree briefly)*

"The stack is Next.js 14 with the App Router, TypeScript for type safety,
and date-fns v3 for all date math. I chose CSS Variables over Tailwind
for styling — this gave me full control over the editorial, paper-tone
design system without cluttering the JSX with utility classes.
The component tree is clean: a WallCalendar orchestrator, a CalendarGrid,
a HeroImage, and a NotesPanel — each with a single responsibility."

---

### [0:30 – 0:45] FEATURE 1 — HERO IMAGE
*(Click through a few months: Jan → April → October)*

"The hero image is tied to the current month using curated Unsplash photos.
I use Next.js Image with priority loading on the first render and a skeleton
shimmer animation so there's never a layout shift while the photo loads.
The month name overlays the image with a gradient — the typography is
Playfair Display, which gives it that physical wall-calendar feel."

---

### [0:45 – 1:10] FEATURE 2 — DATE RANGE SELECTION
*(Click April 10, then click April 18)*

"The date range selection uses a two-phase state machine inside a custom
hook called useDateRange. Phase one: click a start date — highlighted in
burnt orange. Phase two: click an end date — the range fills amber, with
a darker shade at the end so direction is clear.

*(Now click Apr 18 first, then Apr 10)*

Edge case handled: if you click a date before the start, the hook
automatically swaps them so the range is always valid. There's also a
contextual hint banner — 'Now click an end date' — so the UX is
self-explanatory without any tooltip library."

---

### [1:10 – 1:30] FEATURE 3 — NOTES
*(Type a note with the date range active, then add it)*

"The notes panel is integrated with the date selection. When a range is
active, the placeholder and the badge both reflect it automatically.

*(Type: 'Team offsite — book meeting room' and click Add)*

Notes are colour-coded using six pastel swatches, stored in localStorage —
so they survive a full page refresh with zero backend required.

*(Refresh the page — show notes persisting)*

The timestamp is always visible, and deletion is instant."

---

### [1:30 – 1:45] RESPONSIVENESS
*(Open DevTools → toggle to iPhone 14 Pro size)*

"On mobile, the layout collapses vertically — hero image on top, calendar
below, notes at the bottom. Touch targets on each day cell are large enough
to tap comfortably. Everything works identically on phone and desktop."

---

### [1:45 – 2:00] CLOSE
*(Return to full desktop view)*

"To summarise, the three main technical challenges I solved were:
a two-phase date range state machine that handles edge cases gracefully,
a month-aware hero image with zero layout shift, and a persistent notes
system tied to date ranges — no backend needed.

The full source code is on GitHub with a detailed README covering every
architectural decision. Thank you for watching."

---

## 📋 RECORDING CHECKLIST
- [ ] Browser zoom at 100%, DevTools closed
- [ ] Notes cleared (localStorage) for a clean demo start
- [ ] Mic tested — quiet room
- [ ] Resolution: 1920x1080 minimum
- [ ] Practice 2-3 times for natural pacing
- [ ] Record in one take — Loom/OBS/macOS Screen Recording

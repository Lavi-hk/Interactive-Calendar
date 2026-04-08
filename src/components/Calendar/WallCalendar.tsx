"use client";

import { useState } from "react";
import { useDateRange } from "@/hooks/useDateRange";
import { getHolidaysForYear } from "@/lib/holidays";
import CalendarGrid from "./CalendarGrid";
import CalendarHeader from "./CalendarHeader";
import HeroImage from "./HeroImage";
import NotesPanel from "../Notes/NotesPanel";

export default function WallCalendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const { dateRange, phase, handleDayClick, reset, hasSelection } = useDateRange();

  const holidays = getHolidaysForYear(year);

  function goToPrev() {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  }

  function goToNext() {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  }

  return (
    <div className="wall-calendar-wrapper">
      {/* Selection hint banner */}
      {phase === "selecting" && (
        <div className="selection-hint" role="status" aria-live="polite">
          📅 Now click an end date to complete your selection
        </div>
      )}

      <div className="wall-calendar">
        {/* ── Left panel: Hero Image ── */}
        <div className="calendar-left">
          <HeroImage month={month} year={year} />
        </div>

        {/* ── Right panel: Calendar + Notes ── */}
        <div className="calendar-right">
          <CalendarHeader
            year={year}
            month={month}
            onPrev={goToPrev}
            onNext={goToNext}
            onReset={reset}
            canReset={hasSelection}
          />

          <CalendarGrid
            year={year}
            month={month}
            dateRange={dateRange}
            onDayClick={handleDayClick}
            holidays={holidays}
          />

          <div className="divider" aria-hidden="true" />

          <NotesPanel dateRange={dateRange} />
        </div>
      </div>
    </div>
  );
}

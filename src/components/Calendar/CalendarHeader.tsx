"use client";

import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

interface CalendarHeaderProps {
  year: number;
  month: number;
  onPrev: () => void;
  onNext: () => void;
  onReset: () => void;
  canReset: boolean;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function CalendarHeader({
  year,
  month,
  onPrev,
  onNext,
  onReset,
  canReset,
}: CalendarHeaderProps) {
  return (
    <div className="calendar-header">
      <div className="month-nav">
        <button
          onClick={onPrev}
          className="nav-btn"
          aria-label="Previous month"
          title="Previous month"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="month-title-block">
          <div className="month-name">{MONTH_NAMES[month]}</div>
          <div className="year-badge">{year}</div>
        </div>

        <button
          onClick={onNext}
          className="nav-btn"
          aria-label="Next month"
          title="Next month"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {canReset && (
        <button
          onClick={onReset}
          className="reset-btn"
          aria-label="Clear date selection"
          title="Clear date selection"
        >
          <RotateCcw size={12} />
          Clear
        </button>
      )}
    </div>
  );
}

"use client";

import { useMemo } from "react";
import { isSameDay, isWithinInterval, startOfDay } from "date-fns";
import type { DateRange } from "@/hooks/useDateRange";

interface CalendarGridProps {
  year: number;
  month: number; // 0-indexed
  dateRange: DateRange;
  onDayClick: (date: Date) => void;
  holidays?: Record<string, string>; // "YYYY-MM-DD" -> holiday name
}

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function CalendarGrid({
  year,
  month,
  dateRange,
  onDayClick,
  holidays = {},
}: CalendarGridProps) {
  const today = startOfDay(new Date());

  const days = useMemo(() => {
    const totalDays = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfWeek(year, month);
    const cells: (Date | null)[] = [];

    // Leading blanks
    for (let i = 0; i < firstDay; i++) cells.push(null);

    for (let d = 1; d <= totalDays; d++) {
      cells.push(new Date(year, month, d));
    }

    // Trailing blanks to complete last row
    while (cells.length % 7 !== 0) cells.push(null);

    return cells;
  }, [year, month]);

  function getDayState(date: Date | null): string {
    if (!date) return "";

    const { start, end } = dateRange;
    const d = startOfDay(date);

    const isStart = start && isSameDay(d, start);
    const isEnd = end && isSameDay(d, end);
    const isBetween =
      start && end && isWithinInterval(d, { start, end }) && !isStart && !isEnd;
    const isToday = isSameDay(d, today);
    const isPast = d < today;

    let cls = "day-cell";
    if (isStart) cls += " day-start";
    else if (isEnd) cls += " day-end";
    else if (isBetween) cls += " day-between";
    if (isToday) cls += " day-today";
    if (isPast) cls += " day-past";

    const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    if (holidays[key]) cls += " day-holiday";

    return cls;
  }

  function getTitle(date: Date): string {
    const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    return holidays[key] || "";
  }

  const monthHolidays = Object.entries(holidays)
    .filter(([key]) => key.startsWith(`${year}-${String(month + 1).padStart(2, "0")}-`))
    .map(([key, name]) => ({
      key,
      day: Number(key.slice(-2)),
      name,
    }))
    .sort((a, b) => a.day - b.day);

  return (
    <div className="calendar-grid">
      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAY_NAMES.map((d, i) => (
          <div
            key={d}
            className={`day-header ${i === 0 || i === 6 ? "weekend-header" : ""}`}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-y-1">
        {days.map((date, idx) => {
          if (!date) {
            return <div key={`blank-${idx}`} className="day-blank" />;
          }

          const dayState = getDayState(date);
          const title = getTitle(date);

          return (
            <button
              key={date.toISOString()}
              className={dayState}
              title={title}
              onClick={() => onDayClick(date)}
              aria-label={`${date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}${title ? ` - ${title}` : ""}`}
            >
              <span className="day-number">{date.getDate()}</span>
              {title && <span className="holiday-dot" aria-hidden="true" />}
              {title && <span className="holiday-label">{title}</span>}
            </button>
          );
        })}
      </div>

      <div className="holiday-legend">
        <div className="holiday-legend-heading">Holidays this month</div>
        {monthHolidays.length > 0 ? (
          <div className="holiday-items">
            {monthHolidays.map((holiday) => (
              <div key={holiday.key} className="holiday-item">
                <span className="holiday-day">{holiday.day}</span>
                <span className="holiday-name">{holiday.name}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="holiday-empty">No holidays this month</div>
        )}
      </div>
    </div>
  );
}

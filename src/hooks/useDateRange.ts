import { useState, useCallback } from "react";
import { startOfDay } from "date-fns";

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

type SelectionPhase = "idle" | "selecting";

export function useDateRange() {
  const [dateRange, setDateRange] = useState<DateRange>({ start: null, end: null });
  const [phase, setPhase] = useState<SelectionPhase>("idle");

  const handleDayClick = useCallback((date: Date) => {
    const d = startOfDay(date);

    if (phase === "idle") {
      // First click → set start, enter selecting mode
      setDateRange({ start: d, end: null });
      setPhase("selecting");
    } else {
      // Second click → set end (or swap if before start)
      setDateRange((prev) => {
        if (!prev.start) return { start: d, end: null };
        if (d < prev.start) {
          return { start: d, end: prev.start };
        }
        return { start: prev.start, end: d };
      });
      setPhase("idle");
    }
  }, [phase]);

  const reset = useCallback(() => {
    setDateRange({ start: null, end: null });
    setPhase("idle");
  }, []);

  const hasSelection = dateRange.start !== null;

  return { dateRange, phase, handleDayClick, reset, hasSelection };
}

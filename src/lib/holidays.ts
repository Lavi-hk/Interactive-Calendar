// Indian public holidays + major global dates for 2025-2026
export const HOLIDAYS_2025: Record<string, string> = {
  "2025-01-01": "New Year's Day",
  "2025-01-14": "Makar Sankranti",
  "2025-01-26": "Republic Day",
  "2025-02-26": "Maha Shivratri",
  "2025-03-14": "Holi",
  "2025-03-31": "Eid-ul-Fitr",
  "2025-04-14": "Dr. Ambedkar Jayanti",
  "2025-04-18": "Good Friday",
  "2025-05-12": "Buddha Purnima",
  "2025-08-15": "Independence Day",
  "2025-08-16": "Janmashtami",
  "2025-10-02": "Gandhi Jayanti",
  "2025-10-20": "Dussehra",
  "2025-10-23": "Diwali",
  "2025-11-05": "Guru Nanak Jayanti",
  "2025-12-25": "Christmas",
};

export const HOLIDAYS_2026: Record<string, string> = {
  "2026-01-01": "New Year's Day",
  "2026-01-14": "Makar Sankranti",
  "2026-01-26": "Republic Day",
  "2026-03-03": "Maha Shivratri",
  "2026-03-20": "Holi",
  "2026-04-03": "Good Friday",
  "2026-04-14": "Dr. Ambedkar Jayanti",
  "2026-08-15": "Independence Day",
  "2026-10-02": "Gandhi Jayanti",
  "2026-12-25": "Christmas",
};

export function getHolidaysForYear(year: number): Record<string, string> {
  if (year === 2025) return HOLIDAYS_2025;
  if (year === 2026) return HOLIDAYS_2026;
  return {};
}

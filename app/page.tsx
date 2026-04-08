import WallCalendar from "@/components/Calendar/WallCalendar";

export default function Home() {
  return (
    <div className="page-container">
      <h1 className="page-title">📅 Wall Calendar</h1>
      <p className="page-subtitle">
        Select a date range, attach notes, and explore Indian holidays
      </p>
      <WallCalendar />
    </div>
  );
}

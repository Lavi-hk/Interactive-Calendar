"use client";

import { useState, useEffect, useRef } from "react";
import { format, isSameDay } from "date-fns";
import { StickyNote, Trash2, Plus } from "lucide-react";
import type { DateRange } from "@/hooks/useDateRange";

interface Note {
  id: string;
  text: string;
  dateRangeLabel?: string;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  color: string;
}

const NOTE_COLORS = [
  "#FEF3C7", // amber
  "#DCFCE7", // green
  "#DBEAFE", // blue
  "#FCE7F3", // pink
  "#F3E8FF", // purple
  "#FFF7ED", // orange
];

const STORAGE_KEY = "wall-calendar-notes";

interface NotesPanelProps {
  dateRange: DateRange;
}

function loadNotes(): Note[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveNotes(notes: Note[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function buildLabel(range: DateRange): string | undefined {
  if (!range.start) return undefined;
  if (!range.end || isSameDay(range.start, range.end)) {
    return format(range.start, "MMM d, yyyy");
  }
  return `${format(range.start, "MMM d")} – ${format(range.end, "MMM d, yyyy")}`;
}

export default function NotesPanel({ dateRange }: NotesPanelProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [draft, setDraft] = useState("");
  const [colorIdx, setColorIdx] = useState(0);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setNotes(loadNotes());
    setHydrated(true);
  }, []);

  const rangeLabel = buildLabel(dateRange);

  function addNote() {
    if (!draft.trim()) return;
    const note: Note = {
      id: crypto.randomUUID(),
      text: draft.trim(),
      dateRangeLabel: rangeLabel,
      startDate: dateRange.start?.toISOString(),
      endDate: dateRange.end?.toISOString(),
      createdAt: new Date().toISOString(),
      color: NOTE_COLORS[colorIdx],
    };
    const updated = [note, ...notes];
    setNotes(updated);
    saveNotes(updated);
    setDraft("");
    textRef.current?.focus();
  }

  function deleteNote(id: string) {
    const updated = notes.filter((n) => n.id !== id);
    setNotes(updated);
    saveNotes(updated);
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      addNote();
    }
  }

  if (!hydrated) return null;

  return (
    <div className="notes-panel">
      <div className="notes-header">
        <StickyNote size={18} className="notes-icon" />
        <h3 className="notes-title">Notes</h3>
        {rangeLabel && (
          <span className="notes-range-badge">{rangeLabel}</span>
        )}
      </div>

      {/* Compose area */}
      <div className="notes-compose">
        <textarea
          ref={textRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKey}
          placeholder={
            rangeLabel
              ? `Add a note for ${rangeLabel}…`
              : "Select a date, then add a note…"
          }
          className="notes-textarea"
          rows={3}
          style={{ backgroundColor: NOTE_COLORS[colorIdx] }}
        />

        <div className="notes-compose-footer">
          {/* Color picker */}
          <div className="color-swatches" role="group" aria-label="Note color">
            {NOTE_COLORS.map((c, i) => (
              <button
                key={c}
                className={`color-swatch ${i === colorIdx ? "color-swatch-active" : ""}`}
                style={{ backgroundColor: c }}
                onClick={() => setColorIdx(i)}
                aria-label={`Color ${i + 1}`}
                aria-pressed={i === colorIdx}
              />
            ))}
          </div>

          <button
            onClick={addNote}
            disabled={!draft.trim()}
            className="add-note-btn"
            aria-label="Add note (Ctrl+Enter)"
          >
            <Plus size={16} />
            Add
          </button>
        </div>
      </div>

      {/* Notes list */}
      <div className="notes-list" role="list">
        {notes.length === 0 && (
          <p className="notes-empty">
            No notes yet. Select dates and jot something down!
          </p>
        )}

        {notes.map((note) => (
          <div
            key={note.id}
            className="note-card"
            style={{ backgroundColor: note.color }}
            role="listitem"
          >
            <div className="note-card-header">
              {note.dateRangeLabel && (
                <span className="note-date-label">{note.dateRangeLabel}</span>
              )}
              <button
                onClick={() => deleteNote(note.id)}
                className="note-delete-btn"
                aria-label="Delete note"
              >
                <Trash2 size={14} />
              </button>
            </div>
            <p className="note-text">{note.text}</p>
            <p className="note-timestamp">
              {format(new Date(note.createdAt), "MMM d · h:mm a")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

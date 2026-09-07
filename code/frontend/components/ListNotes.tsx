"use client";

import { listNotesResponse } from "@/lib/mock/list-notes";
import styles from "./ListNotes.module.css";

function formatCreatedAt(value: string) {
  return value.replace("T", " ").replace("Z", "");
}

export function ListNotes() {
  const notes = [...listNotesResponse.data].sort((a, b) =>
    b.created_at.localeCompare(a.created_at),
  );

  return (
    <main className={styles.page} aria-labelledby="notes-heading">
      <section className={styles.shell}>
        <header className={styles.header}>
          <div>
            <p className={styles.kicker}>Sticky Notes</p>
            <h1 id="notes-heading" className={styles.title}>
              Saved notes
            </h1>
          </div>
          <p className={styles.count} aria-label={`${notes.length} notes`}>
            {notes.length} notes
          </p>
        </header>

        {notes.length ? (
          <ul className={styles.grid} aria-label="Saved notes">
            {notes.map((note) => (
              <li key={note.id} className={styles.card}>
                <p className={styles.text}>{note.text}</p>
                <p className={styles.meta}>{formatCreatedAt(note.created_at)}</p>
              </li>
            ))}
          </ul>
        ) : (
          <section className={styles.empty} aria-label="No saved notes">
            <h2 className={styles.emptyTitle}>No notes yet</h2>
            <p className={styles.emptyText}>Add your first note to see it here.</p>
          </section>
        )}
      </section>
    </main>
  );
}

"use client";

import { useMemo, useState } from 'react';
import styles from './DeleteNoteBoard.module.css';
import { notes as initialNotes, type Note } from '../lib/mock/delete-note';

export default function DeleteNoteBoard() {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [removingId, setRemovingId] = useState<number | null>(null);

  const countLabel = useMemo(() => `${notes.length} note${notes.length === 1 ? '' : 's'}`, [notes.length]);

  const handleDelete = (id: number) => {
    setRemovingId(id);
    window.setTimeout(() => {
      setNotes((current) => current.filter((note) => note.id !== id));
      setRemovingId((current) => (current === id ? null : current));
    }, 220);
  };

  return (
    <main className={styles.shell}>
      <section className={styles.hero} aria-labelledby="title">
        <div>
          <span className={styles.eyebrow}>Sticky Notes</span>
          <h1 id="title" className={styles.title}>Simple notes. Fast add. Easy delete.</h1>
          <p className={styles.lead}>Keep short notes in one place. New notes land at top, older notes stay below, and every card can be removed with one click.</p>
        </div>
        <div className={styles.panel} aria-label="Notes summary">
          <div className={styles.topbar}>
            <span className={styles.tag}><i /> Calm workspace</span>
            <span className={styles.subtle}>{countLabel}</span>
          </div>
          <div className={styles.subtle}>Newest first. Text limit: 280 characters.</div>
        </div>
      </section>

      <section className={styles.panel} aria-labelledby="list-title">
        <div className={styles.boardTop}>
          <div>
            <div className={styles.boardTitle} id="list-title">Saved notes</div>
            <div className={styles.subtle}>Cards below show newest first.</div>
          </div>
          <div className={styles.subtle}>Click delete on any card</div>
        </div>
        <div className={styles.notes} aria-live="polite">
          {notes.length ? notes.map((note) => (
            <article key={note.id} className={`${styles.card} ${removingId === note.id ? styles.removing : ''}`}>
              <p className={styles.text}>{note.text}</p>
              <div className={styles.foot}>
                <span className={styles.stamp}><span aria-hidden="true">◔</span><span>{note.created_at}</span></span>
                <button className={styles.deleteButton} type="button" onClick={() => handleDelete(note.id)} aria-label={`Delete note ${note.id}`}>Delete</button>
              </div>
            </article>
          )) : (
            <div className={styles.empty}>
              <h2>No notes yet</h2>
              <p>Add your first note above. It will appear here as a card.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

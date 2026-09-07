"use client";

import type { FormEvent } from 'react';
import { useMemo, useState } from 'react';
import { initialNotes, type Note } from '../lib/mock/add-note';
import styles from './AddNoteBoard.module.css';

const MAX_LENGTH = 280;

export default function AddNoteBoard() {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const countLabel = useMemo(
    () => `${notes.length} note${notes.length === 1 ? '' : 's'}`,
    [notes.length],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = text.trim();
    if (!value) {
      setError('Enter note text.');
      return;
    }
    if (value.length > MAX_LENGTH) {
      setError('Note must be 280 characters or less.');
      return;
    }
    setNotes((current) => [{ id: Date.now(), text: value, created_at: '2025-02-14 10:12' }, ...current]);
    setText('');
    setError('');
  }

  return (
    <main className={styles.shell}>
      <section className={styles.hero} aria-labelledby="title">
        <div>
          <span className={styles.eyebrow}>Sticky Notes</span>
          <h1 id="title" className={styles.title}>Simple notes. Fast add. Easy delete.</h1>
          <p className={styles.lead}>Keep short notes in one place. New notes land at top, older notes stay below, and every card can be removed with one click.</p>
        </div>
        <div className={styles.summary} aria-label="Notes summary">
          <div className={styles.summaryTop}>
            <span className={styles.tag}><i /></span>
            <span className={styles.subtle}>{countLabel}</span>
          </div>
          <div className={styles.subtle}>Newest first. Text limit: 280 characters.</div>
        </div>
      </section>

      <section className={styles.panel} aria-labelledby="compose-title">
        <div className={styles.boardTop}>
          <div>
            <div className={styles.boardTitle} id="compose-title">Add note</div>
            <div className={styles.subtle}>Type text and press Add.</div>
          </div>
          <div className={styles.counter}><span>{text.length}</span>/280</div>
        </div>
        <form className={styles.compose} onSubmit={handleSubmit} noValidate>
          <div>
            <label className={styles.label} htmlFor="noteText">Note text</label>
            <textarea
              id="noteText"
              className={styles.textarea}
              value={text}
              onChange={(event) => { setText(event.target.value); setError(''); }}
              aria-describedby="noteHelp noteError"
              placeholder="Jot down a task, reminder, or quick idea."
              maxLength={MAX_LENGTH}
            />
            <div className={styles.meta}>
              <div className={styles.error} id="noteError" aria-live="polite">{error}</div>
              <div id="noteHelp">Press Add to save</div>
            </div>
          </div>
          <button className={styles.addButton} type="submit">Add</button>
        </form>
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
          {notes.length === 0 ? (
            <div className={styles.empty}>
              <h2>No notes yet</h2>
              <p>Add your first note above. It will appear here as a card.</p>
            </div>
          ) : (
            notes.map((note) => (
              <article key={note.id} className={styles.card}>
                <p className={styles.text}>{note.text}</p>
                <div className={styles.foot}>
                  <span className={styles.stamp}>{note.created_at}</span>
                  <button className={styles.deleteButton} type="button" aria-label={`Delete note ${note.id}`}>Delete</button>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

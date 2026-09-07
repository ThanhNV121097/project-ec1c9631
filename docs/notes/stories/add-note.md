# Story — Add note

## User story
As a guest, I want to type note text and press Add so that I can save a new note.

## In scope
- Text box for note body on Sticky Notes single-page board
- Add button that saves a note when text is non-empty and within 280 characters
- Success state that clears input and shows new note in list as newest first
- Inline rejection when text exceeds 280 characters
- Created timestamp is stored with saved note and shown in list after save

## Out of scope
- List notes pagination, filtering, search, or sorting controls
- Delete note flow
- Edit note text
- Accounts, login, or permissions
- Tags or any other metadata beyond id, text, and created_at
- Error UI for storage failures beyond approved screen states

## UI scope
- Single-page board main view from approved design
- Compose area with textarea field and Add primary button
- Empty input and filled input states
- Inline validation message for over-limit text
- List area refresh after successful save, showing new note first
- Gentle add motion only as approved design allows

## Acceptance criteria
1. Given text box contains non-empty text of 280 characters or fewer, when guest presses Add, then a new note is saved.
2. Given a note is saved, when save succeeds, then saved note has `created_at` timestamp.
3. Given a note is saved, when save succeeds, then text box clears.
4. Given a note is saved, when save succeeds, then new note appears first in list.
5. Given a note is saved, when save succeeds, then approved add motion may play on the new card.
6. Given text box contains more than 280 characters, when guest presses Add, then note is rejected and nothing is saved.

## Dependencies
- `docs/notes/SRS.md` requirements NOTES-002 and list refresh behavior from NOTES-001
- Approved Sticky Notes design and design system
- Postgres `notes` table
- List notes story landing first so successful save can appear in list

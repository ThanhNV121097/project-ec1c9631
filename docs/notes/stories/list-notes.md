# Story — List notes

## User story
As a guest, I want to see saved notes as cards in newest-first order, so that I can read current notes first.

## In scope
- Load every saved note from Postgres `notes`.
- Show notes as cards on the single Sticky Notes page.
- Order cards by `created_at` descending, newest first.
- Show each note's text and `created_at` timestamp.
- Show live total notes count and keep it updated after add or delete.
- Show approved empty state when no notes exist.

## Out of scope
- Add note, delete note, or any note editing.
- Accounts, login, permissions, tags, search, filters, or pagination.
- Any data beyond `id`, `text`, and `created_at`.
- Error-state UI beyond what approved design already shows.

## UI scope
- Single Sticky Notes page.
- Default list state with cards in a two-column layout on wider screens and one column under 860px.
- Empty state panel when list has no notes.
- Header or summary area that shows live notes count.

## Acceptance criteria
1. Given stored notes exist, when page loads, then every saved note appears as a card.
2. Given stored notes have different `created_at` values, when page loads, then newest `created_at` appears first.
3. Given a stored note has text and `created_at`, when page loads, then the card shows both text and timestamp.
4. Given stored notes change after add or delete, when UI updates, then live notes count reflects current total.
5. Given no saved notes exist, when page loads, then empty-state content from approved design appears.

## Dependencies
- Postgres `notes` table exists.
- Add note story must land before count updates can be exercised by add flow.
- Delete note story must land before count updates can be exercised by delete flow.

## Notes
- This story has no blocking questions; newest-first order, empty state, and count display are fixed by SRS and approved design.

# Story — Delete note

## User story
As a guest, I want to delete a note from its card, so that I can remove an unwanted note.

## In scope
- Delete one saved note from the note card that shows it.
- Remove that note from the list after the action completes.
- Keep every other note unchanged.
- Keep remaining note order unchanged.
- Show the approved delete affordance on each card in the single Sticky Notes page.

## Out of scope
- Add note, list note, or any new note data flow beyond what delete depends on.
- Accounts, login, permissions, edit, tags, search, filters, or pagination.
- Bulk delete, undo, archive, or confirm dialogs.
- Error states not shown in approved design.

## UI scope
- Sticky Notes single-page board from approved design.
- Note card state with visible Delete button.
- Card removal state during delete transition, if implemented by the approved motion.
- Empty state is not part of this story unless delete leaves no notes and the existing approved empty state appears.

## Acceptance criteria
1. Given a note card is visible, when guest presses Delete on that card, then that note is removed.
2. Given a note is deleted, when removal succeeds, then deleted note no longer appears in list.
3. Given multiple notes exist, when guest deletes one note, then other notes remain visible and unchanged.
4. Given multiple notes exist, when guest deletes one note, then remaining note order stays the same.
5. Given a note is deleted, when removal succeeds, then remove motion may play on the deleted card.

## Dependencies
- `docs/notes/SRS.md` requirements for `NOTES-003`.
- Approved design and `design/design-system.md` for card, delete button, and motion rules.
- Postgres `notes` table and delete API contract from architecture/service design.
- `List notes` story must already supply rendered note cards for deletion targets.

# SRS — Sticky Notes

Module: `notes`
Design: [View the approved design](http://localhost:8080/design/ec1c9631-4954-40b7-a0ce-02b5deee9752)
Design system: `design/design-system.md`

> One file per module, at `docs/notes/SRS.md`. It covers only the functions that belong to this module. Never write `docs/SRS.md`.

## 1. Purpose

Notes module lets user see saved notes, add new note, and delete existing note in one single-page app. Without it, product has no stored notes at all and cannot satisfy core list/add/delete workflow.

## 2. Actors

| Actor | Who they are | What they may do in this module |
|---|---|---|
| Guest | Unauthenticated visitor | View notes, add note, delete note |

## 3. Scope

**In scope** — the functions specified below, by their plan titles:

- List notes
- Add note
- Delete note

**Out of scope** — name what a reader would reasonably expect here and say where it lives instead. This section prevents the same argument twice.

- Accounts, login, or permissions — deliberately not built; brief says no accounts and no login.
- Edit note text — deliberately not built; brief says no editing.
- Tags, search, pagination, filters, or sorting controls — deliberately not built; brief says no tags, no search, no pagination, and newest-first order is fixed.
- Any module other than `notes` — no other module exists for this project.
- Card add/remove animation beyond approved gentle motion — not required as separate user control; motion is part of the approved UI only for card insertion/removal feedback.

## 4. Functional requirements

### 4.1 List notes

**Requirement NOTES-001 — Show saved notes newest first**

*As a* guest, *I want to* see saved notes as cards in newest-first order, *so that* I can read current notes first.

Behaviour:

1. Given saved notes exist, when the page loads, then the page shows every saved note as a card.
2. The cards appear in descending `created_at` order, with newest note first.
3. Each card shows note text and `created_at` timestamp.
4. The screen shows live total notes count in the header or summary area, and the count updates whenever notes are added or deleted.
5. If no notes exist, the page shows the approved empty-state content instead of cards.

**Acceptance criteria** — each maps one-to-one onto a test case in `docs/notes/test-cases/list-notes.md`. Given/When/Then, no compound conditions: one behaviour per criterion.

| # | Given | When | Then |
|---|---|---|---|
| AC-1 | Stored notes exist | Page loads | Every saved note appears as a card |
| AC-2 | Stored notes have different `created_at` values | Page loads | Newest `created_at` appears first |
| AC-3 | Stored note has text and `created_at` | Page loads | Card shows both text and timestamp |
| AC-4 | Stored notes change after add or delete | UI updates | Live notes count reflects current total |
| AC-5 | No saved notes exist | Page loads | Empty-state content from approved design appears |

**Failure, boundary and permission behaviour**

| Case | Condition | Expected behaviour |
|---|---|---|
| Permission | Not applicable: guest is only actor and no role distinction exists | Not applicable: all module actions are available to guest in approved scope |
| Empty data | No saved notes exist | Empty-state content shown, no cards rendered |
| Upstream failure | Storage read fails | Not shown in approved design; API contract handles error outside screen states |

**Data touched**

| Field | Type | Required | Rule |
|---|---|---|---|
| id | integer | yes | Unique per note |
| text | text | yes | Display as stored; max 280 characters |
| created_at | timestamp | yes | Display as stored; used for newest-first order |

### 4.2 Add note

**Requirement NOTES-002 — Save note from text box**

*As a* guest, *I want to* type note text and press Add, *so that* I can save a new note.

Behaviour:

1. Given the text box contains non-empty text up to 280 characters, when guest presses Add, then a new note is saved.
2. The saved note gets a `created_at` timestamp.
3. After success, the input box clears.
4. After success, the new note appears in the list as newest first.
5. After success, card add motion from the approved design may play while the new card enters the list.
6. If input text is longer than 280 characters, the note is not saved.

**Acceptance criteria**

| # | Given | When | Then |
|---|---|---|---|
| AC-1 | Text box contains non-empty text within 280 characters | Guest presses Add | New note is saved |
| AC-2 | Guest saves a note | Save succeeds | Saved note has `created_at` timestamp |
| AC-3 | Guest saves a note | Save succeeds | Text box clears |
| AC-4 | Guest saves a note | Save succeeds | New note appears first in list |
| AC-5 | Guest saves a note | Save succeeds | Add motion may play on the new card |
| AC-6 | Text box contains more than 280 characters | Guest presses Add | Note is rejected and nothing is saved |

**Failure, boundary and permission behaviour**

| Case | Condition | Expected behaviour |
|---|---|---|
| Invalid input | Text box is empty | Note is not saved; approved design shows no separate error state, so inline rejection message is the only required feedback |
| Boundary | Text length is 280 characters | Save accepted |
| Boundary | Text length is 281 characters | Save rejected |
| Permission | Not applicable: guest is only actor and no role distinction exists | Not applicable |
| Upstream failure | Storage write fails | Not shown in approved design; API contract handles error outside screen states |

**Data touched**

| Field | Type | Required | Rule |
|---|---|---|---|
| text | text | yes | Required, max 280 characters |
| created_at | timestamp | yes | Set when note is saved |
| id | integer | yes | Generated for saved note |

### 4.3 Delete note

**Requirement NOTES-003 — Delete note from card**

*As a* guest, *I want to* delete a note from its card, *so that* I can remove an unwanted note.

Behaviour:

1. Given a note card is visible, when guest presses Delete on that card, then that note is removed.
2. The deleted note no longer appears in the list after the action completes.
3. Other notes remain unchanged.
4. Deleting one note does not change note order for remaining notes.
5. After success, card remove motion from the approved design may play while the card leaves the list.

**Acceptance criteria**

| # | Given | When | Then |
|---|---|---|---|
| AC-1 | A note card is visible | Guest presses Delete on that card | That note is removed |
| AC-2 | A note is deleted | Removal succeeds | Deleted note no longer appears in list |
| AC-3 | Multiple notes exist | Guest deletes one note | Other notes remain visible and unchanged |
| AC-4 | Multiple notes exist | Guest deletes one note | Remaining note order stays the same |
| AC-5 | A note is deleted | Removal succeeds | Remove motion may play on the deleted card |

**Failure, boundary and permission behaviour**

| Case | Condition | Expected behaviour |
|---|---|---|
| Not found | Note already removed before action completes | Removed from list; no duplicate delete state shown in approved design |
| Permission | Not applicable: guest is only actor and no role distinction exists | Not applicable |
| Upstream failure | Storage delete fails | Not shown in approved design; API contract handles error outside screen states |

**Data touched**

| Field | Type | Required | Rule |
|---|---|---|---|
| id | integer | yes | Identifies note to delete |
| text | text | no | Not changed |
| created_at | timestamp | no | Not changed |

## 5. Screens

The design is the source of truth for appearance; this section maps functions onto it so nothing in the design is unaccounted for and nothing specified here is missing from the design.

| Screen | Section in the design | Functions it serves | States that must exist |
|---|---|---|---|
| Sticky Notes single-page board | Main page | NOTES-001, NOTES-002, NOTES-003 | default, empty |

## 6. Non-functional requirements

| Area | Requirement |
|---|---|
| Performance | Page load renders saved notes list within 2s on 1 Mbps cold cache for 100 stored notes |
| Performance | Add and delete actions complete and reflect in UI within 1s on 1 Mbps cold cache |
| Accessibility | Keyboard reachability, visible focus, labelled note text field, buttons, and contrast ≥ 4.5:1 |
| Responsive | Works at 320px and up; no horizontal page scroll |
| Privacy | Store only note id, text, and created_at; no account data or extra metadata |

## 7. Dependencies and assumptions

- **Depends on:** Postgres `notes` table, for storing note records.
- **Assumption:** Empty state is part of approved design and appears only when no notes exist.
- **Assumption:** Live notes count is part of approved design and updates with list changes.
- **Assumption:** Gentle add/remove motion on cards is part of approved design and may appear during insert/delete transitions.

| Open question | Proposed default | Who decides |
|---|---|---|
| How should inline validation for empty Add input read? | Use short message near input | Stakeholder |

## 8. Traceability

| Plan item | Requirement ids | Test cases |
|---|---|---|
| List notes | NOTES-001 | `test-cases/list-notes.md` |
| Add note | NOTES-002 | `test-cases/add-note.md` |
| Delete note | NOTES-003 | `test-cases/delete-note.md` |

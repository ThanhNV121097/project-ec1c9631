# Test Cases — Add note

Risk level: medium. Writes data, updates list, and has one explicit validation boundary.

## Coverage map
- NOTES-002 AC-1: save note on Add
- NOTES-002 AC-2: saved note gets created_at
- NOTES-002 AC-3: input clears on success
- NOTES-002 AC-4: new note appears first in list
- NOTES-002 AC-6: over-280 text rejected
- NOTES-002 failure case: empty input rejected with no save
- Service contract: POST /v1/notes success shape, 400 malformed request, 422 validation, no client-supplied id/created_at

## Cases

**Scenario**: Save note from text box
**Given** notes page is open, text box contains `Buy tea`, and list already shows any existing notes
**When** guest presses Add
**Then** API saves new note, response is `201`, body returns decimal `id`, stored `text`, and RFC 3339 `created_at`; page shows new card in list; note appears first in list; input clears
Check: interact_page

**Scenario**: Saved note gets created_at timestamp
**Given** notes page is open and text box contains `Walk dog`
**When** guest presses Add
**Then** API response body includes non-empty RFC 3339 UTC `created_at` for saved note
Check: fetch_url

**Scenario**: Input clears after successful save
**Given** notes page is open and text box contains `Read book`
**When** guest presses Add and save succeeds
**Then** text box value becomes empty
Check: interact_page

**Scenario**: New note appears first in list
**Given** notes page is open, existing notes already show in list, and text box contains `New top note`
**When** guest presses Add and save succeeds
**Then** new note card appears before older cards in rendered list
Check: render_url

**Scenario**: Over-280 text rejected
**Given** notes page is open and text box contains 281 characters
**When** guest presses Add
**Then** API returns `422` with `error.code` `VALIDATION_FAILED`; no note is saved; list does not gain a card
Check: fetch_url

**Scenario**: Empty input rejected
**Given** notes page is open and text box is empty
**When** guest presses Add
**Then** page shows inline rejection message; no request body is accepted as a saved note; input stays empty
Check: interact_page

**Scenario**: POST /v1/notes rejects malformed request body
**Given** client sends non-JSON or non-object body to `POST /v1/notes`
**When** request reaches API
**Then** response is `400` with `error.code` `MALFORMED_REQUEST`
Check: fetch_url

**Scenario**: POST /v1/notes does not accept client-supplied id or created_at
**Given** client sends request body with `text`, `id`, and `created_at`
**When** request reaches API
**Then** response is `400` or `422` per contract, and saved note if created still gets server-generated decimal `id` and server-generated `created_at`, not client values
Check: fetch_url

**Scenario**: POST /v1/notes keeps stored text unchanged
**Given** client submits note text with leading and trailing spaces inside 280 characters
**When** save succeeds
**Then** response returns same stored text, and saved note text matches submitted text exactly
Check: fetch_url

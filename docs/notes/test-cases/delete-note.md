# Test Cases — Delete note

Risk level: P2. Small CRUD action, but covers destructive write and idempotent delete contract.

## Scenario: Delete existing note removes card and note from list
**Given** note list has 3 saved notes, newest first, and middle note ID `42` is visible on page
**When** user clicks delete button on note `42`
**Then** API returns `204`, note `42` is removed from `notes` table, and page list no longer shows card for `42` while other notes remain unchanged
**Check:** interact_page

## Scenario: Delete last note leaves other notes untouched
**Given** note list has notes `41`, `42`, `43` and `42` is deleted from backend while page is open
**When** user deletes note `42`
**Then** only card for `42` disappears; cards for `41` and `43` remain visible with same text and order
**Check:** interact_page

## Scenario: Delete missing note still succeeds
**Given** note ID `99` does not exist in `notes` table
**When** user clicks delete on card for note `99` after list refresh shows no such note
**Then** API returns `204` and page state keeps showing current notes with no error message
**Check:** interact_page

## Scenario: Delete request with zero ID rejected
**Given** request path is `/v1/notes/0`
**When** client sends DELETE request
**Then** API returns `422` with error code `VALIDATION_FAILED` and details for path field `id`
**Check:** fetch_url

## Scenario: Delete request with invalid ID syntax rejected
**Given** request path is `/v1/notes/abc`
**When** client sends DELETE request
**Then** API returns `400` with error code `MALFORMED_REQUEST`
**Check:** fetch_url

## Scenario: Delete endpoint returns documented error envelope on internal failure
**Given** backend delete operation fails unexpectedly
**When** client sends DELETE request for valid note ID
**Then** API returns `500` with error code `INTERNAL`, response includes `request_id`, and no note text is exposed in error body
**Check:** fetch_url

# Test Cases — Add note

Risk level: medium. One write path, one validation boundary, one UI update path. Cover success, rejection, and contract shape.

## Scenario: Add note saves text and created_at
**Given** notes list is open and text box is empty
**When** user types `Buy tea` and clicks Add
**Then** API creates note with stored text `Buy tea` and `created_at` timestamp, response is `201`, UI shows new card in list, and new card is first item
**Check:** interact_page

## Scenario: Add note clears input after success
**Given** notes list is open and text box contains `Buy tea` in pending add state
**When** user clicks Add and request succeeds
**Then** input becomes empty after success
**Check:** interact_page

## Scenario: Add note rejects text over 280 characters
**Given** notes list is open and text box is empty
**When** user types 281-character note and clicks Add
**Then** API returns `422 VALIDATION_FAILED` with field `text`, note is not saved, input keeps same text, and no new card appears
**Check:** interact_page

## Scenario: Add note rejects empty or whitespace-only text
**Given** notes list is open and text box is empty
**When** user types only spaces and clicks Add
**Then** API returns `422 VALIDATION_FAILED` with field `text`, note is not saved, and input keeps same whitespace text
**Check:** interact_page

## Scenario: Add note rejects malformed request body
**Given** client sends non-JSON or non-object body to create note endpoint
**When** request reaches API
**Then** API returns `400 MALFORMED_REQUEST` and no note is saved
**Check:** fetch_url

## Scenario: Add note response includes id, text, and created_at
**Given** notes API accepts valid note text
**When** client posts `{"text":"Buy tea"}`
**Then** response is `201` JSON with string `id`, same `text`, and RFC 3339 UTC `created_at`, plus `Location: /v1/notes/{id}`
**Check:** fetch_url

## Scenario: Add note request rejects unknown fields
**Given** client sends valid text plus extra field to create note endpoint
**When** request reaches API
**Then** API returns `400 MALFORMED_REQUEST` and ignores no extra field by storing nothing
**Check:** fetch_url

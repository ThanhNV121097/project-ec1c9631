# Test Cases — List notes

Risk level: medium. Read path only, but it crosses DB → API → browser, so order and contract shape matter.

## Scenario: Empty list loads as no cards
**Given** notes table has no rows and app is reachable
**When** page opens and browser requests `GET /v1/notes`
**Then** API returns `200` with JSON body `{"data":[],"total":0}` and page shows no note cards
Check: render_url

## Scenario: Existing notes load newest first
**Given** notes table has 3 rows with different `created_at` values and different IDs, including one newest row
**When** page opens and browser requests `GET /v1/notes`
**Then** API returns `200` with `data` ordered by `created_at DESC, id DESC`, `total` equals 3, and first rendered card is newest row
Check: render_url

## Scenario: Loaded note card shows text and created_at
**Given** notes table has 1 row with text `Buy tea` and RFC 3339 UTC `created_at`
**When** page opens and browser requests `GET /v1/notes`
**Then** rendered card displays exact stored text `Buy tea` and exact stored `created_at` value
Check: render_url

## Scenario: List response includes required note fields only
**Given** notes table has 1 saved row
**When** client fetches `GET /v1/notes`
**Then** response status is `200`, body has top-level `data` array and `total` integer, and each note object includes `id`, `text`, and `created_at`
Check: fetch_url

## Scenario: Notes API unavailable returns retryable error
**Given** backend cannot reach Postgres while app is running
**When** client fetches `GET /v1/notes`
**Then** response status is `503` and error body has `error.code` equal `UNAVAILABLE`
Check: fetch_url

## Scenario: Unexpected server failure returns internal error envelope
**Given** list handler hits an unexpected server failure
**When** client fetches `GET /v1/notes`
**Then** response status is `500` and error body has `error.code` equal `INTERNAL`
Check: fetch_url

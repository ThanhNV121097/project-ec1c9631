# Test Cases — List notes

Risk level: medium. List is core landing state, but scope is narrow and behavior is fully specified by SRS and service contract.

## Case 1
**Scenario**: Load all saved notes as cards
**Given**: Stored notes exist in `notes` table
**When**: Page loads
**Then**: Every saved note appears as a card, and each card shows that note's text and `created_at` timestamp.
**Check**: render_url
**Trace**: NOTES-001 AC-1, AC-3

## Case 2
**Scenario**: Show newest note first
**Given**: Stored notes exist with different `created_at` values
**When**: Page loads
**Then**: Cards render in descending `created_at` order, with newest note first.
**Check**: render_url
**Trace**: NOTES-001 AC-2

## Case 3
**Scenario**: Show live total with saved notes
**Given**: Stored notes exist
**When**: Page loads and list finishes rendering
**Then**: Header or summary area shows total notes count equal to current saved notes.
**Check**: render_url
**Trace**: NOTES-001 AC-4

## Case 4
**Scenario**: Show empty state when no notes exist
**Given**: No saved notes exist
**When**: Page loads
**Then**: Approved empty-state content appears and no note cards render.
**Check**: render_url
**Trace**: NOTES-001 AC-5

## Case 5
**Scenario**: List endpoint returns collection envelope
**Given**: Browser requests `GET /v1/notes`
**When**: API responds successfully
**Then**: Response status is `200` and body has `data` array plus `total` integer.
**Check**: fetch_url
**Trace**: services.md 2.4, 3.1 success shape

## Case 6
**Scenario**: List endpoint keeps empty collection shape
**Given**: No saved notes exist and browser requests `GET /v1/notes`
**When**: API responds successfully
**Then**: Response body is `{"data":[],"total":0}`.
**Check**: fetch_url
**Trace**: services.md 3.1 notes on empty list

## Case 7
**Scenario**: List endpoint rejects bad path or unavailable storage
**Given**: Browser requests invalid list route or storage read cannot complete
**When**: API responds
**Then**: Invalid route or path syntax returns `400` `MALFORMED_REQUEST`; storage failure returns `503` `UNAVAILABLE`.
**Check**: fetch_url
**Trace**: services.md 2.3, 3.1 errors

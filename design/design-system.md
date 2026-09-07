# Design System — Sticky Notes

> Source of truth: the approved `index.html` (preview: http://localhost:8080/design/ec1c9631-4954-40b7-a0ce-02b5deee9752).
> Every value below is extracted from it. Changing a value here without
> changing the approved design is a defect.

Last updated: 2025-02-14

## 1. Foundations

### 1.1 Color

Semantic tokens. Name by job, never by hue.

| Token | Value | Used for |
|---|---|---|
| `--color-bg` | `#FAFAF7` | Page background |
| `--color-surface` | `#FFFFFF` | Card / panel background |
| `--color-surface-raised` | `#FFF7E8` | Eyebrow chip, elevated warm surface |
| `--color-surface-soft` | `#F3F0E8` | Subtle panel tint |
| `--color-border` | `#E7E1D6` | Default border, divider |
| `--color-border-soft` | `#DECFB7` | Empty-state dashed border |
| `--color-text` | `#1F2937` | Body text |
| `--color-text-muted` | `#6B7280` | Secondary text, captions |
| `--color-primary` | `#F4B860` | Primary action background |
| `--color-primary-strong` | `#E79A1F` | Focus ring, active accent |
| `--color-primary-text` | `#3D2600` | Text on primary button |
| `--color-danger` | `#DC4C3E` | Destructive action, error text |
| `--color-danger-surface` | `#FFF0EE` | Destructive button background |
| `--color-danger-border` | `#F2B7B0` | Destructive button border |
| `--color-danger-hover-surface` | `#FFE5E1` | Destructive hover background |
| `--color-chip-text` | `#8B5A12` | Eyebrow chip text |

#### Contrast audit

Every text-on-background pair actually used. Body text ≥ 4.5:1, large text (≥ 18.66px bold or ≥ 24px) ≥ 3:1, UI borders ≥ 3:1.

| Foreground | Background | Ratio | Passes |
|---|---|---|---|
| `--color-text` | `--color-bg` | `14.5:1` | AA |
| `--color-text` | `--color-surface` | `14.0:1` | AA |
| `--color-text-muted` | `--color-surface` | `4.8:1` | AA |
| `--color-primary-text` | `--color-primary` | `8.8:1` | AA |
| `--color-chip-text` | `--color-surface-raised` | `5.4:1` | AA |
| `--color-danger` | `--color-danger-surface` | `4.9:1` | AA |
| `--color-danger` | `--color-surface` | `4.3:1` | AA Large only |
| `--color-primary-strong` | `--color-bg` | `3.2:1` | UI accent only |
| `--color-border` | `--color-surface` | `1.3:1` | Decorative border |
| `--color-border-soft` | `--color-surface` | `1.5:1` | Decorative border |

### 1.2 Spacing

Base unit: `4px`. Every margin, padding, and gap in the product uses one of these.

| Token | Value |
|---|---|
| `--space-1` | `4px` |
| `--space-2` | `8px` |
| `--space-3` | `12px` |
| `--space-4` | `16px` |
| `--space-5` | `20px` |
| `--space-6` | `24px` |
| `--space-8` | `32px` |
| `--space-10` | `40px` |
| `--space-12` | `48px` |
| `--space-14` | `56px` |

### 1.3 Typography

Font families (include the fallback stack and how the font is loaded):

- Body: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.
- Headings: same stack as body.
- Mono: none.

| Token | Size | Line height | Weight | Used for |
|---|---|---|---|---|
| `--text-xs` | `14px` | `20px` | `600` | Eyebrow chip, small labels |
| `--text-sm` | `14px` | `20px` | `400` | Secondary body, captions |
| `--text-base` | `16px` | `24px` | `400` | Body, note text |
| `--text-lg` | `18px` | `29px` | `400` | Lead paragraph |
| `--text-xl` | `20px` | `24px` | `700` | Section titles |
| `--text-2xl` | `28px` | `33px` | `700` | Card and hero title |
| `--text-3xl` | `70px` | `67px` | `700` | Display hero heading |

Heading levels are used in order and never skipped for visual sizing.

Weight and letter-spacing are tokens too, not just columns in the table above:

| Token | Value | Used for |
|---|---|---|
| `--font-weight-body` | `400` | Running text |
| `--font-weight-medium` | `600` | Labels, emphasis |
| `--font-weight-heading` | `700` | h1-h6 |
| `--tracking-tight` | `-0.04em` | Display heading |
| `--tracking-normal` | `0` | Everything else |

### 1.4 Radius, border, shadow, motion

| Token | Value | Used for |
|---|---|---|
| `--radius-sm` | `14px` | Small button, destructive button |
| `--radius-md` | `18px` | Input, textarea |
| `--radius-lg` | `20px` | Card, empty panel, eyebrow chip container |
| `--radius-xl` | `22px` | Note card |
| `--radius-2xl` | `24px` | Compose panel, empty state |
| `--radius-3xl` | `28px` | Shell panel |
| `--radius-full` | `999px` | Pill chip |
| `--border-width` | `1px` | Default border |
| `--border-width-strong` | `1.5px` | Focused input border |
| `--shadow-sm` | `0 8px 18px rgba(31,41,55,.05)` | Resting note card |
| `--shadow-md` | `0 10px 20px rgba(244,184,96,.28)` | Primary button resting |
| `--shadow-lg` | `0 18px 40px rgba(31,41,55,.08)` | Main shell panel |
| `--duration-fast` | `180ms` | Hover, focus |
| `--duration-base` | `220ms` | Card enter/exit |
| `--easing` | `ease` | All transitions |

Motion respects `prefers-reduced-motion: reduce`: state changes remain, movement is removed.

### 1.5 Layout and breakpoints

| Name | Min width | Container | Columns | Gutter |
|---|---|---|---|---|
| `sm` | `0px` | `100%` | `1` | `16px` |
| `md` | `861px` | `1100px` | `2` | `18px` |
| `lg` | `1100px` | `1100px` | `2` | `20px` |
| `xl` | `1280px` | `1100px` | `2` | `20px` |

Z-index scale (only these values are allowed):

| Layer | Value |
|---|---|
| Base | `0` |
| Sticky header | `10` |
| Dropdown | `20` |
| Modal backdrop | `40` |
| Modal | `50` |
| Toast | `60` |

## 2. Components

One subsection per reusable component. Every component lists **all** states.

### 2.1 Primary button

**Purpose** — Main call to action for note add. Not used for delete.

**Anatomy** — `[label]`.

**Variants**

| Variant | Tokens | When to use |
|---|---|---|
| Primary | `--color-primary`, `--color-primary-text`, `--shadow-md`, `--radius-sm` | Add action |

**Sizes**

| Size | Height | Padding | Text token |
|---|---|---|---|
| Default | `auto` | `14px 18px` | `--text-base` |

**States** — every row must be filled in.

| State | Visual change | Tokens |
|---|---|---|
| Default | Warm fill, soft shadow | `--color-primary`, `--color-primary-text`, `--shadow-md` |
| Hover | Slight lift, lighter fill | `--color-primary`, `--shadow-md` |
| Focus (keyboard) | Visible warm ring around button | `--color-primary-strong` |
| Active / pressed | No lift, translateY(0) | `--color-primary` |
| Disabled | Not present in approved design | — |
| Loading | Not present in approved design | — |
| Error | Not present in approved design | — |
| Empty | Not applicable | — |

**Accessibility** — native `button`, keyboard activation, visible focus ring, minimum hit target 44×44px.

### 2.2 Textarea field

**Purpose** — Enter note body before save.

**Anatomy** — `[label] [textarea] [helper/error row]`.

**Variants**

| Variant | Tokens | When to use |
|---|---|---|
| Default | `--radius-md`, `--border-width-strong`, `--color-border`, `--color-text` | Note entry |

**Sizes**

| Size | Height | Padding | Text token |
|---|---|---|---|
| Default | `118px` min-height | `14px 14px 12px` | `--text-base` |

**States** — every row must be filled in.

| State | Visual change | Tokens |
|---|---|---|
| Default | White surface, gray border | `--color-surface`, `--color-border`, `--radius-md` |
| Hover | No special hover state in approved design | — |
| Focus (keyboard) | Warm border and focus halo | `--color-primary-strong`, `--color-primary` |
| Active / pressed | Not applicable | — |
| Disabled | Not present in approved design | — |
| Loading | Not present in approved design | — |
| Error | Error message below field in danger red | `--color-danger` |
| Empty | Placeholder text visible, field empty | `--color-text-muted` |

**Accessibility** — native `textarea`, visible label, keyboard resize allowed, minimum hit target 44×44px.

### 2.3 Note card

**Purpose** — Display one saved note with created time and delete action.

**Anatomy** — `[text] [footer: timestamp + delete button]`.

**Variants**

| Variant | Tokens | When to use |
|---|---|---|
| Default | `--color-surface`, `--color-border`, `--radius-xl`, `--shadow-sm` | Saved note |

**Sizes**

| Size | Height | Padding | Text token |
|---|---|---|---|
| Default | `160px` min-height | `16px 16px 14px` | `--text-base` |

**States** — every row must be filled in.

| State | Visual change | Tokens |
|---|---|---|
| Default | White-to-warm tint background, light shadow | `--color-surface`, `--shadow-sm` |
| Hover | No dedicated hover change in approved design | — |
| Focus (keyboard) | Delete button focus ring visible inside card | `--color-primary-strong` |
| Active / pressed | Remove animation starts before deletion | `--duration-base` |
| Disabled | Not present in approved design | — |
| Loading | Not present in approved design | — |
| Error | Not present in approved design | — |
| Empty | Card list absent; empty state shown instead | `--color-border-soft` |

**Accessibility** — card content is semantic text, delete control is native button with label, timestamp is readable text.

### 2.4 Destructive button

**Purpose** — Delete a note from a card.

**Anatomy** — `[label]`.

**Variants**

| Variant | Tokens | When to use |
|---|---|---|
| Destructive | `--color-danger-surface`, `--color-danger`, `--color-danger-border` | Remove note |

**Sizes**

| Size | Height | Padding | Text token |
|---|---|---|---|
| Default | `auto` | `10px 14px` | `--text-sm` |

**States** — every row must be filled in.

| State | Visual change | Tokens |
|---|---|---|
| Default | Pale red surface, red text, red border | `--color-danger-surface`, `--color-danger`, `--color-danger-border` |
| Hover | Slightly darker pale red surface | `--color-danger-hover-surface` |
| Focus (keyboard) | Warm focus halo around control | `--color-primary-strong` |
| Active / pressed | No shadow, immediate press | `--color-danger-hover-surface` |
| Disabled | Not present in approved design | — |
| Loading | Not present in approved design | — |
| Error | Not present in approved design | — |
| Empty | Not applicable | — |

**Accessibility** — native `button`, `aria-label` on each note, keyboard activation, minimum hit target 44×44px.

### 2.5 Empty state panel

**Purpose** — Explain no notes exist and what to do next.

**Anatomy** — `[heading] [body copy]`.

**Variants**

| Variant | Tokens | When to use |
|---|---|---|
| Default | `--color-surface`, `--color-border-soft`, `--radius-2xl` | No saved notes |

**Sizes**

| Size | Height | Padding | Text token |
|---|---|---|---|
| Default | `auto` | `34px 18px` | `--text-sm`, `--text-xl` |

**States** — every row must be filled in.

| State | Visual change | Tokens |
|---|---|---|
| Default | Centered copy with dashed border | `--color-border-soft` |
| Hover | No hover state in approved design | — |
| Focus (keyboard) | No internal interactive element | — |
| Active / pressed | Not applicable | — |
| Disabled | Not present in approved design | — |
| Loading | Not present in approved design | — |
| Error | Not present in approved design | — |
| Empty | This is the empty state | `--color-text-muted` |

**Accessibility** — reads as informative content, no fake control, copy explains next action.
## 3. Content and formatting

- Voice and tone: calm, direct, useful.
- Date and time format: `YYYY-MM-DD HH:MM`, 24-hour clock, no timezone label.
- Number format: plain integers for counts and IDs.
- Capitalization rule: sentence case for headings and labels; single-word button labels stay title case only when they are commands (`Add`, `Delete`).
- Empty-state wording pattern: say what is missing, then say what to do next.
- Error wording pattern: short, specific, plain language.

## 4. Known deviations

Places where the approved design does not follow its own rules or the
anti-patterns in `references/ai-defaults.md`. Record, do not silently fix.

| Where | Deviation | Why it stands | Follow-up |
|---|---|---|---|
| Hero heading | Very large display type at `70px` / `67px` line height for one screen only | Approved mockup uses it for impact in the hero | Reuse only for hero-level marketing copy |
| Layout | `gap: 20px` and `gap: 18px` appear alongside base 4px scale | Approved mockup uses measured content spacing, not whole-step-only scale | Keep exact values in implementation |
| Note list | Two-column card grid on wide screens rather than single column | Approved mockup shows it and still fits card width | Collapse to one column under `860px` |
| Button rounding | One-off `16px` destructive button radius sits between `14px` and `18px` | Approved mockup uses it for softer delete affordance | Treat as sanctioned local radius |
| Shadow strength | Primary button shadow is stronger than resting card shadow | Action needs emphasis in approved mockup | Keep hierarchy: button stronger than card |
| Loading / error / disabled states | Not shown in approved design for any control | Stakeholder approved success-path-only mockup | Add only when product later needs them |

## 5. Change log

| Date | Change | Design PR |
|---|---|---|
| 2025-02-14 | Initial design system from approved Sticky Notes mockup | pending |

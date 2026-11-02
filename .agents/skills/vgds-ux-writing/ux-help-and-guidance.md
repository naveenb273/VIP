---
name: vgds-ux-help-and-guidance
parent: vgds-ux-writing
metadata:
  version: "2.0"
  package: "@volvo/vcdk-ai-kit"
  category: foundation
  repository: "VolvoGroup-Internal/volvo-group-design-system"
  branch: "main"
description: Tooltips, inline help text, contextual hints, walkthroughs, and coach marks.
---

## Scope

**Covers:**

- Hover tooltips
- Inline help text (persistent, below or beside elements)
- Contextual guidance in sidebars or panels
- Walkthrough step copy

**Does not cover:**

- Tooltips introducing a brand-new feature for the first time (→ ux-onboarding)
- Error explanations (→ ux-error-messages)

**Boundary note:**
If copy explains an existing, established feature on demand, it belongs here.

---

## Context checklist

Items marked (R) are required before writing. Items marked (O) improve quality but have a usable default.

| #   | Context item                                    | Why it matters                                                       | Default if not provided |
| --- | ----------------------------------------------- | -------------------------------------------------------------------- | ----------------------- |
| 1   | What the element or feature does (R)            | Required to write accurate help copy                                 | —                       |
| 2   | What question the user is likely asking (R)     | Help copy answers a specific question, not a general description     | —                       |
| 3   | Where the tooltip or hint appears (O)           | Position affects length — hover tooltips are shorter than panel copy | Hover tooltip           |
| 4   | User's likely familiarity with this pattern (O) | Determines how much explanation is needed                            | Moderate                |

If required items are missing, ask for them as part of the master skill's context question.
Do not ask for required items separately from the master skill's shared question block.

---

## Rules and constraints

### Structure rules

- Tooltips: 2 sentences maximum (60 characters preferred, 100 max)
- Inline help: 1–2 sentences; answer the implicit question, don't describe the feature
- Never start with "This is a…" or "Here you can…"
- Tooltips should not repeat the label they're attached to

### Tone rules

- Helpful and explanatory — assume the user has a genuine question
- Conversational but brief — answer the question, stop
- Never condescending ("Simply click…", "Just…", "Easily…")

### Forbidden patterns

| "This feature allows you to…" | Feature-focused, adds unnecessary length | Answer the user's implicit question |
| "Simply click…" / "Just…" | Condescending | Remove modifier, state the action |
| "For more information, see…" alone | Lazy fallback | Answer the question first, then link |
| Tooltip that repeats the label | Zero value | Add information the label doesn't provide |

### Required elements

| Tooltip copy | Always | 100 chars |
| Inline help text | Always for inline patterns | 160 chars |

---

## Templates

### Tooltip

```yaml
tooltip:
  trigger: "<element label or description>"
  copy: "<one sentence answering the implicit question — max 100 chars, or null if tooltip is not needed>"
  decision: "<when copy is null — one sentence explaining why the tooltip adds no value; omit when copy is present>"
  alternative: "<when copy is null — one sentence suggesting a better solution, typically a more precise label; omit when copy is present>"
```

### Inline help

```yaml
inline_help:
  copy: "<1–2 sentences — max 160 chars>"
  link:
    label: "<optional — max 25 chars>"
    destination: "<URL or section>"
```

---

## Rubric

Run before returning output. If any Fail condition is true, revise first.

**Pass if all are true:**

- [ ] Copy answers a question, not describes a feature
- [ ] Tooltip is ≤100 characters
- [ ] Does not start with "This is…" or "Here you can…"
- [ ] Does not repeat the label it's attached to
- [ ] Passes all shared quality standards from master skill

**Fail if any are true:**

- [ ] Character limits exceeded
- [ ] Fails any shared constraint from SKILL.md
- [ ] Output uses a forbidden pattern listed above
- [ ] Required element is missing

---

## Examples

### Example 1 — Tooltip: metric label needing clarification

**Input:**

- Surface: Fleet overview dashboard — Volvo Group fleet portal
- Element: "Uptime rate" metric, displayed as a percentage in the dashboard header
- Request: Write a tooltip for this metric

**Output:**

```yaml
tooltip:
  trigger: "Uptime rate — fleet overview dashboard"
  copy: "Share of scheduled hours your fleet was available — calculated over the last 30 days."
  decision: null
  alternative: null
```

**Why this works:** "Uptime rate" tells the user what the metric is called, not what it measures or over what period. The tooltip answers both implicit questions — what counts as uptime ("scheduled hours your fleet was available") and the calculation window ("last 30 days") — in one sentence at 84 characters. It does not restate the label.

---

### Example 2 — Inline help: section-level

**Input:**

- Surface: Settings — data sharing section, Volvo Group fleet portal
- Section header: "Data sharing"
- The section contains toggles controlling what vehicle data is visible to connected third-party logistics and telematics platforms
- Request: Write inline help for this section

**Output:**

```yaml
inline_help:
  copy: "Controls what your connected platforms can access. Changes apply to entire fleet, not individual vehicles."
  link:
    label: null
    destination: null
```

**Why this works:** The implicit question on a "Data sharing" section is not "what is data sharing?" but "what does changing these settings actually affect?" The first sentence answers that directly. The second addresses the most likely source of hesitation — users may assume changes are granular per vehicle — before they have to ask. Two sentences, 104 characters, no jargon.

---

### Example 3 — Edge case: tooltip not needed

**Input:**

- Surface: Fleet overview dashboard — Volvo Group fleet portal
- Element: "Total vehicles" counter in the dashboard header
- Request: Write a tooltip for this counter

**Output:**

```yaml
tooltip:
  trigger: "Total vehicles — fleet overview dashboard"
  copy: null
  decision: "Tooltip not needed — the label is self-explanatory and would add no information the user does not already have. Redundant tooltips create noise and reduce trust in tooltips that carry genuinely useful information."
  alternative: "If there is ambiguity about what counts as a vehicle — for example, whether trailers or inactive vehicles are included — address it in the label itself: 'Active vehicles' or 'Vehicles (excl. trailers)'. This surfaces the clarification at all times, not only on hover."
```

**Common mistake this avoids:** Writing a tooltip because one was requested, regardless of whether it adds value. "The total number of vehicles in your fleet" restates the label and teaches the user nothing. The skill declines, explains why, and redirects to a more precise label — fixing the underlying problem at the source rather than papering over it with a tooltip.

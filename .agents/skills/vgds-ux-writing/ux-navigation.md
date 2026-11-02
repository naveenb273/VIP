---
name: vgds-ux-navigation
parent: vgds-ux-writing
metadata:
  version: "2.0"
  package: "@volvo/vcdk-ai-kit"
  category: foundation
  repository: "VolvoGroup-Internal/volvo-group-design-system"
  branch: "main"
description: Navigation labels, menu items, breadcrumbs, page titles, tab labels, and section headers.
---

## Scope

**Covers:**

- Top navigation and sidebar labels
- Menu items and dropdown labels
- Breadcrumb labels
- Page titles (H1 level)
- Tab and pill labels
- Section and group headers

**Does not cover:**

- Page-level body copy or section descriptions (→ ux-onboarding or ux-help-and-guidance)
- In-page tab content copy (→ relevant surface sub-skill)

**Boundary note:**
If copy orients the user to where they are or how to move, it belongs here regardless of component.

---

## Context checklist

Items marked (R) are required before writing. Items marked (O) improve quality but have a usable default.

| #   | Context item                                          | Why it matters                                                | Default if not provided |
| --- | ----------------------------------------------------- | ------------------------------------------------------------- | ----------------------- |
| 1   | What the destination or section contains (R)          | Determines the label noun                                     | —                       |
| 2   | User's likely mental model for this section (O)       | Labels should match how users think, not how product teams do | Industry standard       |
| 3   | Character limit (O)                                   | Nav labels are often length-constrained in UI                 | 20 chars                |
| 4   | Parallel items in the same nav (O)                    | Labels should be grammatically parallel                       | —                       |
| 5   | Existing labels in the same nav (R)                   | Labels should be distinct                                     | -                       |
| 6   | Higher level label, when belonging to a nav group (O) | Labels should relate to top-level label                       | -                       |

If required items are missing, ask for them as part of the master skill's context question.
Do not ask for required items separately from the master skill's shared question block.

---

## Rules and constraints

### Structure rules

- Use nouns for destinations, verbs only for action-items in nav (ex. "Sign in")
- Sentence case throughout
- Avoid gerunds ("Settings" not "Managing settings")
- Max: 20 characters per label; 3 words preferred
- Parallel grammatical structure across all items in the same nav level
- Active items must be distinguishable by text label, not color alone
- Avoid pronouns ("My account", "Your wallet")
- Put most important word at the start
- When a label simplifies, shortens, or omits words from the source description, append a one-line editorial note explaining what was changed and why. If the omission could affect meaning — for example, dropping a qualifier like "Scheduled" that distinguishes two types of the same content — flag it explicitly for the user to confirm.

### Tone rules

- Neutral and precise — nav copy is not a branding moment
- Consistent register across all items in a nav level
- No puns, wordplay, slang, or personality in core navigation
- Avoid jargon, unless widely accessible to target audience

### Forbidden patterns

| "Click here" | Directional | Use the destination name |
| Icon-only nav with no text label | Accessibility failure | Always include text or aria-label |
| "Misc" / "Other" | Vague catch-all | Name the actual content |
| Mixed case in the same nav level | Inconsistent | Sentence case throughout |
| Unusual special characters (hyphen excluded) | Adds complexity | Simple spelling throughout

### Required elements

| Label | Always | 20 chars |
| Aria-label | When label alone is ambiguous | 40 chars |

---

## Templates

### Nav item

```yaml
nav_item:
  label: "<[Noun] or [Verb] [Object] — max 20 chars>"
  aria_label: "<if label needs context — max 40 chars, optional>"
  level: "<primary | secondary | breadcrumb | tab>"
```

---

## Rubric

Run before returning output. If any Fail condition is true, revise first.

**Pass if all are true:**

- [ ] Label is a noun or [Verb] [Object], not a phrase
- [ ] All items at the same nav level are grammatically parallel
- [ ] Label is ≤20 characters
- [ ] Aria-label added when label alone lacks context
- [ ] Any words omitted or simplified from the source description are noted and flagged for user confirmation if the omission could affect meaning
- [ ] Passes all shared quality standards from master skill

**Fail if any are true:**

- [ ] Character limits exceeded
- [ ] Fails any shared constraint from SKILL.md
- [ ] Output uses a forbidden pattern listed above
- [ ] Required element is missing

---

## Examples

### Example 1 — Noun-based primary navigation

**Input:**

- Context: Primary navigation
- Request: Parallel naming

**Output:**

```yaml
nav_items:
  - label: "Trucks"
    level: "primary"
  - label: "Buses"
    level: "primary"
  - label: "Services"
    level: "primary"
  - label: "Dealers"
    level: "primary"
```

**Why this works:** All navigation labels follow the [Noun] structure and use the same plural form consistently.

---

### Example 2 — Verb-and-object navigation labels

**Input:**

- Context: "Services" secondary navigation
- Request: Parallel and descriptive naming

**Output:**

```yaml
nav_items:
  - label: "Schedule maintenance"
    level: "secondary"
  - label: "Buy parts"
    level: "secondary"
  - label: "Renew insurance"
    level: "secondary"
  - label: "Contact Support"
    level: "secondary"
```

**Why this works:** All navigation labels follow the [Verb] [Object] structure and describe the action clearly. Sentence case is used throughout.

---

### Example 3 — Edge case: Mixed structure labels

**Input:**

- Context: [Noun] primary navigation and [Verb] [Object] secondary navigation
- Request: Clear and descriptive naming

**Output:**

```yaml
nav_items:
  - label: "Financial services"
    level: "primary"
  - label: "Get a credit"
    level: "secondary"
  - label: "Renew insurance"
    level: "secondary"
  - label: "Apply for sponsorship"
    level: "secondary"
  - label: "Refinance your credit"
    level: "secondary"
  - label: "Issue company card"
    level: "secondary"
```

**Why this works:** Primary and secondary navigation use distinct structures but complement each other. All secondary navigation labels follow the [Verb] [Object] structure and describe the options clearly. Sentence case is used throughout.

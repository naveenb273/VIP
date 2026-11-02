---
name: vgds-ux-settings
parent: vgds-ux-writing
metadata:
  version: "2.0"
  package: "@volvo/vcdk-ai-kit"
  category: foundation
  repository: "VolvoGroup-Internal/volvo-group-design-system"
  branch: "main"
description: Settings pages, preference labels, toggle copy, account management copy, and permission request strings.
---

## Scope

**Covers:**

- Settings page section labels
- Preference and option labels
- Toggle and switch descriptions
- Account, billing, and plan management copy
- Permission and access request strings

**Does not cover:**

- Error messages from a settings action failure (→ ux-error-messages)
- Onboarding screens that configure initial settings (→ ux-onboarding)

**Boundary note:**
If copy governs a persistent user preference or account state, it belongs here.

---

## Context checklist

Items marked (R) are required before writing. Items marked (O) improve quality but have a usable default.

| #   | Context item                             | Why it matters                                  | Default if not provided |
| --- | ---------------------------------------- | ----------------------------------------------- | ----------------------- |
| 1   | What the setting controls (R)            | Required to write an accurate label             | —                       |
| 2   | Default state (R)                        | On/off defaults must be explicit in toggle copy | —                       |
| 3   | Consequences of changing the setting (O) | High-consequence settings need inline warnings  | No consequences stated  |
| 4   | Settings section it belongs to (R)       | Helps with parallel labelling across a section  | -                       |

If required items are missing, ask for them as part of the master skill's context question.
Do not ask for required items separately from the master skill's shared question block.

---

## Rules and constraints

### Structure rules

- Labels describe the outcome, not the mechanism — preferred approach.
- Use outcome-first language whenever the feature and available space allow it: "Receive email updates" not "Enable email notifications".
- Use "Enable / Disable" or "On / Off" only when:
  (a) the outcome cannot be described concisely within the space available, or
  (b) the setting controls a technical or system-level function where naming the outcome would be misleading or imprecise (e.g. "Enable two-factor authentication" — the mechanism is the outcome here).
- Never use "Enable / Disable" or "On / Off" as a default when outcome language is feasible but inconvenient to write.
- Toggle labels must make sense in both on/off states without changing the label
- High-consequence settings (data deletion, billing) require an inline consequence note
- Group settings under clear section headers; headers are nouns, not instructions
- Max label: 40 characters; max description: 100 characters

### Tone rules

- Matter-of-fact and efficient — users in settings know what they want
- Consequence notes: calm, factual, not alarming
- Avoid marketing language in settings — this is a utility surface

### Forbidden patterns

| "Toggle this to…" | Instruction, not a label — tells the user how to interact with the control rather than what it does | State the outcome: "Receive [outcome]" or, where outcome language isn't feasible, "Enable [feature]" |
| Marketing copy in settings | Wrong surface | Neutral, functional language only |
| "Advanced settings" without context | Vague | Name what's advanced: "Developer options" |

### Conditional patterns

Use these patterns only under the named conditions. Do not use them as defaults.

| Pattern                      | Use only when                                                                                                                                   | Never use when                                         |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| "Enable / Disable [feature]" | (a) outcome cannot be described concisely within available space, or (b) the mechanism is the outcome — e.g. "Enable two-factor authentication" | Outcome language is feasible but inconvenient to write |
| "On / Off" alone             | Space is critically constrained and no short outcome phrase fits                                                                                | A label can be added alongside the toggle              |

### Required elements

| Option label | Always | 40 chars |
| Description | When label alone is insufficient | 100 chars |
| Consequence note | When action is irreversible or high-stakes | 80 chars |

---

## Templates

### Settings option

```yaml
setting:
  label: "<outcome-first label — max 40 chars>"
  outcome_language: "<'fits — N chars' |
    'fits — N chars, N-char overage; flag to design for confirmation' |
    'not feasible — shortest outcome phrase [phrase] is N chars;
    condition (a) fallback applied' |
    'not feasible — mechanism is the outcome;
    condition (b) fallback applied'>"
  description: "<what this controls — max 100 chars, optional>"
  consequence_note: "<high-stakes settings only — max 80 chars, optional>"
  default: "<on | off | [value]>"
```

---

## Rubric

Run before returning output. If any Fail condition is true, revise first.

**Pass if all are true:**

- [ ] Label uses outcome-first language, or — if outcome language is not feasible — uses "Enable / Disable" or "On / Off" under one of the two named conditions in ### Structure rules
- [ ] Toggle label works in both states without being changed
- [ ] High-stakes settings include a consequence note
- [ ] No marketing language present
- [ ] Passes all shared quality standards from master skill

**Fail if any are true:**

- [ ] Character limits exceeded
- [ ] Fails any shared constraint from SKILL.md
- [ ] Output uses a forbidden pattern listed above
- [ ] Required element is missing

---

## Examples

### Example 1 — Standard settings label

**Input:**

- Surface: Notification settings — Volvo Group Fleet Portal
- Setting controls: Weekly email summarizing fleet performance metrics
- Default state: Off
- Request: Write the label and description for this setting

**Output:**

```yaml
setting:
  label: "Weekly fleet summary"
  outcome_language: "fits — 20 chars"
  description: "Fuel use, mileage, and service alerts — delivered weekly
    by email."
  consequence_note: null
  default: "off"
```

**Why this works:** The label names what the user receives, not what the system does. At 20 characters it works in both toggle states and scales to mobile without truncation. The description names 3 specific contents of the email rather than restating the label.

---

### Example 2 — Conditional pattern: dense settings panel

**Input:**

- Surface: Vehicle data & integrations — compact sidebar, Volvo Group Fleet Portal
- Four toggles in a constrained layout; design system label limit for this component: 22 characters
- Request: Write labels and descriptions for all four settings

**Output:**

```yaml
settings_panel:
  surface: "Vehicle data & integrations — compact sidebar"
  label_limit: "22 characters"

  settings:
    - label: "Share location data"
      outcome_language: "fits — 19 chars"
      description: "Get live positions in your logistics platform."
      consequence_note: null
      default: "on"

    - label: "Sync maintenance schedule"
      outcome_language: "fits — 25 chars, 3-char overage; flag to design
        for confirmation"
      description: "Align service jobs with your fleet calendar."
      consequence_note: null
      default: "on"

    - label: "Enable fuel reporting"
      outcome_language: "not feasible — shortest outcome phrase 'Share fuel
        data per vehicle' is 27 chars; condition (a) fallback applied"
      description: "Export fuel data for each vehicle."
      consequence_note: null
      default: "off"

    - label: "Enable API access"
      outcome_language: "not feasible — mechanism is the outcome; condition
        (b) fallback applied"
      description: "Connect tools to your fleet data."
      consequence_note: null
      default: "off"
```

**Why this works:** Each label is evaluated against the 22-character limit before outcome vs. mechanism is decided — the `outcome_language` field makes that reasoning visible and auditable. The first two settings use outcome language; the third falls back to condition (a) with a specific character count showing why; the fourth applies condition (b) because "API access" is a technical function where mechanism and outcome are the same thing. All four descriptions are kept under 50 characters for mobile readability.

---

#### Example 3 — Edge case: mechanism language in the request

**Input:**

- Surface: Alert preferences — Volvo Group Fleet Portal
- Request: "Add a toggle to enable GPS tracking alerts for fleet vehicles"
- Default state: On

**Output:**

```yaml
setting:
  label: "Receive GPS alerts"
  outcome_language: "fits — 18 chars"
  description: "Know when a vehicle leaves its route or operating hours."
  consequence_note: null
  default: "on"
```

**Common mistake this avoids:** The request uses mechanism framing — "enable GPS tracking alerts". A less careful response carries that framing into the label ("Enable GPS tracking alerts"), treating the user's wording as copy. The skill converts it to outcome language: the user receives alerts, so "Receive GPS alerts" names what they get.
The description then adds the two specific trigger conditions the label can't carry at its character limit.

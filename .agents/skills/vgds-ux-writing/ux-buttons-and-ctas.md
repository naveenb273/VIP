---
name: vgds-ux-buttons-and-ctas
parent: vgds-ux-writing
metadata:
  version: "2.0"
  package: "@volvo/vcdk-ai-kit"
  category: foundation
  repository: "VolvoGroup-Internal/volvo-group-design-system"
  branch: "main"
description: Button labels, calls to action, action links, link text, standalone link, inline link, icon button accessibility labels, and toggle labels.
---

## Scope

**Covers:**

- Primary, secondary and tertiary button labels
- Calls to action (hero, card, inline)
- Text links used as actions
- Icon button aria-labels
- Toggle and switch labels

**Does not cover:**

- Button labels inside forms where form context governs the copy (→ ux-forms)
- Destructive action confirm/cancel pairs (→ ux-confirmations)

**Boundary note:**
If the label triggers an action and is the primary decision point for the user, it belongs here.

---

## Context checklist

Items marked (R) are required before writing. Items marked (O) improve quality but have a usable default.

| #   | Context item | Why it matters | Default if not provided |
| --- | ------------ | -------------- | ----------------------- |

| 1 | Action the button performs (R) | Determines the verb and object | — |
| 2 | Consequence of the action (R) | Reversible vs. irreversible affects label specificity | — |
| 3 | Button hierarchy on the page (O) | Primary vs. secondary vs. tertiary affects directness | Secondary |
| 4 | Character limit (O) | Some design systems constrain label length | 20 chars |

If required items are missing, ask for them as part of the master skill's context question.
Do not ask for required items separately from the master skill's shared question block.

---

## Rules and constraints

### Structure rules

- Format: [Verb] [Object] — always lead with a verb
- Primary buttons: specific verb + object ("Save changes", not "Save")
- Destructive buttons: use precise verbs ("Delete", not "Remove") when action is permanent
- Avoid: "Submit", "Yes", "No", "Click here"
- Max: 20 characters for most; 35 for complex CTAs with secondary text
- Parallel buttons on the same surface must use parallel grammar
- In multi-button sets, all labels must be immediately distinguishable from each other — do not repeat the same object word across all buttons in a set. In a 3-button set: if the primary and secondary labels both need the object for clarity, the tertiary label must be made distinct (e.g. "Delete project / Archive project / Cancel", not "Delete project / Archive project / Keep project"). If the primary action is the most critical, vary verb and/or object across all three (e.g. "Delete project / Archive data / Cancel"). For destructive confirm/cancel pairs specifically, see ux-confirmations.

### Tone rules

- Active and direct — these are instructions, not suggestions
- Confident, not pushy — avoid "Now", "Immediately", "Don't miss"
- Destructive actions: serious and specific, never dramatic

### Forbidden patterns

| "Submit" | Generic | "Save changes", "Send message", etc. |
| "Click here" | Directional, non-descriptive | Name the action or destination |
| "Yes" / "No" | No context, confusing, prone to mistakes | "Delete project" / "Keep project" |
| "Learn more" as primary CTA | Passive, non-descriptive | "See pricing", "Read the guide" |
| Two similar labels for opposed or related actions | Confusion risk | Make confirm/cancel clearly distinct |
| The same object word repeated across all labels in a multi-button set | Labels blend together at a glance — user has to read each carefully to distinguish them | Vary verb and/or object; make the tertiary label distinct ("Cancel", "Go back") when primary and secondary both need the object for clarity |
| "Driver guide" | Missing verb, not action driven, passive | "Read driver guide" / "Open driver guide" |
| "No, I don't like special offers" | Negative, shaming the user, dark UX pattern | "Not now" / "Maybe later" |
| "SAVE CHANGES" | All caps - distracting, lower accessibility | "Save changes" |

### Required elements

| Label | Always | 20 chars (primary), 35 chars (complex CTA) |
| Aria-label | When label alone lacks context | 50 chars |
| Secondary text | Optional — only when consequence needs clarification | 60 chars |

---

## Templates

### Button label

```yaml
button:
  label: "<[Verb] [Object] — max 20 chars>"
  aria_label: "<if label lacks context — max 50 chars, optional>"
  hierarchy: "<primary | secondary | destructive | tertiary>"
  secondary_text: "<optional clarifier — max 60 chars>"
```

---

## Rubric

Run before returning output. If any Fail condition is true, revise first.

**Pass if all are true:**

- [ ] Label leads with a verb
- [ ] Object is named specifically (not "this" or "it")
- [ ] Destructive actions use precise, specific verbs
- [ ] Parallel buttons on the same surface use parallel grammar
- [ ] In multi-button sets: all labels are immediately distinguishable — no object word repeated across all buttons in the set
- [ ] Label is ≤20 characters (or ≤35 for complex CTAs)
- [ ] Passes all shared quality standards from master skill

**Fail if any are true:**

- [ ] Character limits exceeded
- [ ] Fails any shared constraint from SKILL.md
- [ ] Output uses a forbidden pattern listed above
- [ ] Required element is missing

---

## Examples

### Example 1 — Common account action

**Input:**

- Action: reset password
- Context: short form to recover account access
- Impact: start flow to change account password and continue to sign-in

**Output:**

```yaml
primary_button:
  label: "Reset password"
  style: "primary"
  secondary_text: "You'll receive an email with a link to reset your password."
secondary_button:
  label: "Cancel"
  style: "secondary"
```

**Why this works:** Primary button label explicitly tells the user what will happen next. Secondary button gives the user the option to resume signing in normally. Both buttons lead with a verb.

---

### Example 2 — Cancel action

**Input:**

- Action: cancel subscription
- Context: confirmation modal for destructive action
- Impact: change access level and remove payment for user account

**Output:**

```yaml
primary_button:
  label: "Cancel subscription"
  style: "primary"
secondary_button:
  label: "Go back"
  style: "secondary"
```

**Common mistake this avoids:** The title for this type of confirmation is usually phrased to include the primary term "cancel". The primary button must include the same action ("cancel") with a clarifier ("subscription"), to avoid being perceived as an action which abandons the flow, as it's most often used in UI.

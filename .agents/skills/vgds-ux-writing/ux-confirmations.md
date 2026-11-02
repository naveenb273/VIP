---
name: vgds-ux-confirmations
parent: vgds-ux-writing
metadata:
  version: "2.0"
  package: "@volvo/vcdk-ai-kit"
  category: foundation
  repository: "VolvoGroup-Internal/volvo-group-design-system"
  branch: "main"
description: Confirmation dialogs, destructive action warnings, irreversible-action gates, and consent prompts.
---

## Scope

**Covers:**

- Confirmation dialog title, body, and actions
- Destructive action warnings (delete, remove, cancel)
- Irreversible-action gates ("you can't undo this")
- Consent prompts before significant actions

**Does not cover:**

- Error messages after an action fails (→ ux-error-messages)
- Settings toggle labels that warn of consequences (→ ux-settings)

**Boundary note:**
If copy warns the user _before_ they act — not after — it belongs here.

---

## Context checklist

Items marked (R) are required before writing. Items marked (O) improve quality but have a usable default.

| #   | Context item                                            | Why it matters                                | Default if not provided |
| --- | ------------------------------------------------------- | --------------------------------------------- | ----------------------- |
| 1   | What will be deleted/changed/canceled (R)               | Must be named specifically in the dialog      | —                       |
| 2   | Is the action reversible? (R)                           | Determines warning severity and copy approach | —                       |
| 3   | Consequences (data loss, cost, access) (R)              | Must be stated clearly before the action      | —                       |
| 4   | Neutral action (opposite to the destructive action) (R) | Allows for a "safe exit" path in the copy     | -                       |
| 5   | Alternative action (partial destructive action) (O)     | Allows for a "compromise" path                | -                       |

If required items are missing, ask for them as part of the master skill's context question.
Do not ask for required items separately from the master skill's shared question block.

---

## Rules and constraints

### Structure rules

- Always include: what will happen + consequence + 2 explicit actions (confirm and cancel)
- Name the object specifically ("Delete this project?" not "Delete?" or "Delete this item?")
- Cancel label must be clearly safe ("Cancel" by default; use "Keep [object]" only when "Cancel" alone could be ambiguous or seem destructive)
- Confirm label must name the action ("Delete project", not "Confirm")
- Alternative label must clearly explain the outcome ("Archive project")
- Max title: 60 characters
- Max body: 200 characters (consequences must be complete)
- Max action: 25 characters
- Never use "Are you sure?" as the title — state what will happen instead
- Always include a character count for title and body in the output — format: `[N chars]` inline after each field
- When an alternative action exists, present it in the body as a helpful suggestion, not an instruction — the user has likely already decided on the destructive action; the alternative is offered, not recommended. Pattern: "You can also [alternative] if [brief reason]." Never use imperative framing ("Archive it instead", "Choose archive")
- Body copy must not state the obvious or explain what is already implied — if the user is keeping data, they are by definition not deleting it; do not say so. Every sentence in the body must add information the user does not already have

**Primary button style:**

- Use `destructive` when the action is irreversible or results in permanent data loss
- Use `warning` when the action is reversible but has a meaningful consequence (e.g. pausing a service, committing to a term, removing access temporarily)
- Use `primary` when the action is low-stakes and fully reversible with no meaningful consequence

### Tone rules

- Direct and transparent — the user is about to do something significant
- No manipulation (no dark patterns: "No thanks, I hate saving money")
- Neutral cancel label — make it easy to back out without shame

### Label distinctiveness rules (2-button and 3-button dialogs)

- All labels in a dialog must be immediately distinguishable at a glance — the user should not have to read carefully to tell them apart
- **2-button dialogs:** The cancel/safe-exit label must be distinct from the confirm label. Prefer a generic safe-exit ("Cancel", "Go back") over repeating the object from the confirm label. Exception: when the object is essential to prevent misreading the cancel label as a destructive action (e.g. "Delete project / Keep project" — "Keep project" makes the safe path explicit). When in doubt, use "Cancel".
- **3-button dialogs:** If the primary and secondary actions both need the object for clarity, the tertiary label must be distinct — use "Cancel" or "Go back", not a third label repeating the object (e.g. "Delete project / Archive project / Cancel"). If the primary action is the most critical, vary verb and/or object across all three (e.g. "Delete project / Archive data / Cancel").

### Forbidden patterns

| "Are you sure?" as title | Weak, no information | State what will happen |
| "OK" / "Cancel" pair | Generic | "[Action]" / "Keep [thing]" |
| No mention of consequences | Incomplete | Always state what is lost or changed |
| Dark pattern cancel labels | Manipulative | Neutral, safe cancel label always |
| Imperative framing for alternatives in body ("Archive it instead", "Choose to archive") | Presumes the user wants the alternative — they likely don't; the alternative is a suggestion | "You can also [alternative] if [reason]." |
| Truisms or self-evident statements in body ("keep the data without deleting it", "permanently removed and no longer available") | States what is already implied; wastes character budget | Every sentence must add information the user does not already have |
| All three labels in a 3-button dialog using the same object word | Labels become hard to distinguish at a glance | Vary verb and/or object; make tertiary label distinct ("Cancel" or "Go back") |
| Cancel label repeating the object from the confirm label in a 2-button dialog when "Cancel" or "Go back" would be unambiguous | Unnecessary repetition — adds no clarity | Use "Cancel" or "Go back" as the default safe-exit; only repeat the object when omitting it would make the cancel label ambiguous or seem destructive |

### Required elements

| Title (what will happen) | Always | 60 chars |
| Body (consequence) | Always | 200 chars |
| Confirm action label | Always | 25 chars |
| Cancel/safe-exit label | Always | 25 chars |
| Alternative action label | Optional | 25 chars |

---

## Templates

### Confirmation dialog - 2 buttons

```yaml
confirmation:
  title: "<what will happen, not 'Are you sure?' — max 60 chars>"
  title_chars: <N>
  body: "<consequence, named specifically — max 200 chars>"
  body_chars: <N>
  primary_button:
    label: "<[Verb] [Object] — max 25 chars>"
    style: "<destructive | warning | primary>"
    # destructive: irreversible or permanent data loss
    # warning: reversible but meaningful consequence
    # primary: low-stakes, fully reversible
  secondary_button:
    label: "<Cancel | Go back | Keep [object] if needed — max 25 chars>"
    style: "neutral"
```

### Confirmation dialog - 3 buttons

```yaml
confirmation:
  title: "<what will happen, not 'Are you sure?' — max 60 chars>"
  title_chars: <N>
  body: "<consequence, named specifically, and alternative as suggestion — max 200 chars>"
  body_chars: <N>
  primary_button:
    label: "<[Verb] [Object] — max 25 chars>"
    style: "<destructive | warning | primary>"
    # destructive: irreversible or permanent data loss
    # warning: reversible but meaningful consequence
    # primary: low-stakes, fully reversible
  secondary_button:
    label: "<[Verb] [Object] — max 25 chars>"
    style: "alternative"
  tertiary_button:
    label: "<Cancel | Go back — max 25 chars>"
    style: "neutral"
```

---

## Rubric

Run before returning output. If any Fail condition is true, revise first.

**Pass if all are true:**

- [ ] Title states what will happen, not "Are you sure?"
- [ ] Title character count is shown and ≤60
- [ ] Body names the specific object and consequence
- [ ] Body character count is shown and ≤200
- [ ] Body contains no truisms or self-evident statements — every sentence adds information the user does not already have
- [ ] Alternative action (if present) is framed as a suggestion in body copy, not an instruction
- [ ] Confirm label names the destructive action explicitly
- [ ] Primary button style matches reversibility: destructive for irreversible, warning for reversible-with-consequence, primary for low-stakes reversible
- [ ] Cancel label is "Cancel" or "Go back" unless repeating the object is needed to prevent the safe-exit label from reading as destructive
- [ ] In 3-button dialogs: all three labels are distinguishable at a glance — no object word repeated across all three
- [ ] No dark patterns in any label
- [ ] Passes all shared quality standards from master skill

**Fail if any are true:**

- [ ] Character limits exceeded
- [ ] Fails any shared constraint from SKILL.md
- [ ] Output uses a forbidden pattern listed above
- [ ] Required element is missing

---

## Examples

### Example 1 — Delete single item

**Input:**

- Action: Delete a file
- Item name: "Old timesheets.docx"
- Reversibility: Irreversible
- Impact: Single item, user's own content

**Output:**

```yaml
confirmation_dialog:
  headline: 'Delete "Old timesheets.docx"?'
  body: "The file will be permanently removed, with no option to restore it later."
  primary_button:
    label: "Delete file"
    style: "destructive"
  secondary_button:
    label: "Cancel"
    style: "neutral"
```

**Why this works:** The title and available actions read as a clear conversation. Actions are clearly distinct, with the primary button explain the exact outcome. The body informs the user about the consequences of the destructive action.

---

### Example 2 — Discard changes

**Input:**

- Action: Navigate away with unsaved changes
- Context: User edited a form and clicked away
- Reversibility: Irreversible
- Impact: User input is discarded

**Output:**

```yaml
confirmation_dialog:
  headline: "Exit without saving?"
  body: "Your changes aren't saved yet and they'll be lost."
  primary_button:
    label: "Exit"
    style: "destructive"
  secondary_button:
    label: "Keep editing"
    style: "neutral"
```

**Why this works:** The title and available actions read as a clear conversation. Actions are clearly distinct and the secondary button phrases the action in a positive tone. The body details the consequences.

---

### Example 3 — Edge case: cancel subscription

**Input:**

- Action: Stop current subscription
- Reversibility: Reversible
- Impact: User loses access and/or content

**Output:**

```yaml
confirmation_dialog:
  headline: "Cancel your premium subscription?"
  body: "Your subscription will be canceled immediately and you'll lose access to your account and files on March 27. You can also switch to a lower plan to keep your data accessible."
  primary_button:
    label: "Cancel subscription"
    style: "destructive"
  secondary_button:
    label: "Change plan"
    style: "alternative"
  tertiary_button:
    label: "Go back"
    style: "neutral"
```

**Why this works:** The title and available actions read as a clear conversation. Actions are clearly distinct, explaining the outcome. The body details the consequences and alternative options available to the user.

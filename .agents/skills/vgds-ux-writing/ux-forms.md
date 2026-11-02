---
name: vgds-ux-forms
parent: vgds-ux-writing
metadata:
  version: "2.0"
  package: "@volvo/vcdk-ai-kit"
  category: foundation
  repository: "VolvoGroup-Internal/volvo-group-design-system"
  branch: "main"
description: Form field labels, placeholders, helper text, input validation copy, and submission and loading states.
---

## Scope

**Covers:**

- Field labels (visible, persistent)
- Placeholder text (inside inputs)
- Helper/hint text (below or beside fields)
- Field-level validation feedback
- Submit button context, loading states, success confirmation

**Does not cover:**

- Standalone button labels outside forms (→ ux-buttons-and-ctas)
- System errors triggered by form submission (→ ux-error-messages)

**Boundary note:**
If the copy lives inside or directly supports a form interaction, this sub-skill owns the context.

---

## Context checklist

Items marked (R) are required before writing. Items marked (O) improve quality but have a usable default.

| #   | Context item | Why it matters | Default if not provided |
| --- | ------------ | -------------- | ----------------------- |

| 1 | Field type and data collected (R) | Determines label, placeholder, and helper text needs | — |
| 2 | Validation rules (R) | Required to write accurate error and helper copy | — |
| 3 | Field sensitivity (O) | Personal or financial data needs reassurance copy | Not sensitive |
| 4 | Form length / flow (O) | Multi-step forms need progress and transition copy | Single-step |

If required items are missing, ask for them as part of the master skill's context question.
Do not ask for required items separately from the master skill's shared question block.

---

## Rules and constraints

### Structure rules

- Every field must have a persistent visible label (not placeholder-only)
- Helper text appears below the field, before validation is triggered
- Validation copy replaces helper text on error; restores on correction
- Placeholder: only for format examples (ex. name@example.com), never for labels
- Label max: 60 characters
- Helper text max: 80 characters
- Validation copy max: 80 characters

### Tone rules

- Neutral and instructive for labels and helper text
- Calm and specific for validation errors — never alarming for recoverable mistakes
- Reassuring and guiding for sensitive fields (payment, personal data)

### Forbidden patterns

| Placeholder as the only label | Disappears on focus | Always use a persistent label |
| "Required" on every field | Creates noise | Mark optional fields instead |
| "Invalid" alone | No guidance | State what's wrong and how to fix it |
| Asterisk with no legend | Unclear | Explain what \* means |
| "Enter your [field name]" as helper | Redundant with label | Explain format or why it's needed |
| Visual signal only for errors | Meaningless, unclear | Always use validation copy

### Required elements

| Persistent field label | Always | 30 chars |
| Helper text | When format or purpose isn't obvious | 80 chars |
| Validation copy | Always (triggered on error) | 80 chars |
| Placeholder | Only for format examples | 40 chars |

---

## Templates

### Field set

```yaml
field:
  label: "<persistent visible label — max 60 chars>"
  placeholder: "<format example only, optional — max 40 chars>"
  helper_text: "<shown before error — max 80 chars, optional>"
  validation_error: "<shown on error — max 80 chars>"
  required: <true | false>
```

---

## Rubric

Run before returning output. If any Fail condition is true, revise first.

**Pass if all are true:**

- [ ] Every field has a persistent visible label
- [ ] Validation copy names the field and the fix, not just the problem
- [ ] Placeholder (if used) is a format example only, not a substitute label
- [ ] Helper text answers a likely user question, not just repeats the label
- [ ] Passes all shared quality standards from master skill

**Fail if any are true:**

- [ ] Character limits exceeded
- [ ] Fails any shared constraint from SKILL.md
- [ ] Output uses a forbidden pattern listed above
- [ ] Required element is missing

---

## Examples

### Example 1 — Simple text field validation

**Input:**

- Purpose: Collect user's full name
- Required: Yes
- Constraints: min. 2 text strings

**Output:**

```yaml
form_field:
  label: "Full name"
  required: true
  input_type: "text"
  placeholder: "ex. Robin Hood"
  help_text: null
  validation:
    - rule: "required"
      error: "Enter your first and last name."
```

**Why this works:** Placeholder suggests a clear format (2 distinct names, separated by blank space) without duplicating the label. Error message is clear and direct, further detailing the expected input.

---

### Example 2 — Email validation

**Input:**

- Purpose: Collect email address
- Required: Yes
- Constraints: Must be valid email format; must be @volvo.com domain email

**Output:**

```yaml
form_field:
  label: "Email address"
  required: true
  input_type: "email"
  placeholder: "you@volvo.com"
  help_text: null
  validation:
    - rule: "required"
      error: "Add your email address."
    - rule: "valid_email"
      error: "Check your email for any typos."
    - rule: "volvo_email"
      error: "Use a @volvo.com email to continue."
```

**Common mistake this avoids:** The placeholder text specifically uses the required email domain. The form displays distinct error messages for each type of issue, helping users correct their input without having to guess.

---

### Example 3 — Edge case: Text input with character number and type limits

**Input:**

- Purpose: Bio or description field
- Required: No
- Constraints: Max 280 characters; only special characters supported are '%' and '&'

**Output:**

```yaml
form_field:
  label: "Bio"
  required: false
  input_type: "textarea"
  placeholder: "Tell us a bit about yourself."
  help_text: "Max. 280 characters, including % and &."
  optional_indicator: "(optional)"
  max_length: 280
  show_character_count: true
  validation:
    - rule: "max_length_280"
      error: "Shorten your text to 280 characters or fewer."
    - rule: "special_characters_limit"
      error: "Use only '%' or '&' as special characters."
```

**Why this works:** Placeholder explains the purpose of the input, while the helper text continuously display the limitations. The validation supports a specific error message for each constraint, for more effective guidance.
**Alternative approach:** The placeholder text could be used as the label, to keep the context visible at all times.

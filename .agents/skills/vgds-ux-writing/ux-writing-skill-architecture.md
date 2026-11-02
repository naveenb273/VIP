# UX Writing Skill System — Architecture Specification

---

## 1. Sub-Skill File List

Ten sub-skills, each covering a distinct, non-overlapping scope. Every file is self-contained and invoked only by the master skill.

| File                      | Scope                                                                                                      |
| ------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `ux-error-messages.md`    | All error states: validation, system, network, permission, authentication, not-found, conflict, rate-limit |
| `ux-notifications.md`     | Alerts, banners, toasts, badges, push notifications, in-app announcements                                  |
| `ux-onboarding.md`        | First-run flows, empty states, progressive disclosure, feature announcements                               |
| `ux-forms.md`             | Field labels, placeholders, helper text, validation copy, submission and loading states                    |
| `ux-buttons-and-ctas.md`  | Button labels, CTAs, action links, icon button labels, toggle labels                                       |
| `ux-confirmations.md`     | Confirmation dialogs, destructive action warnings, consent prompts, irreversible-action gates              |
| `ux-navigation.md`        | Nav labels, menu items, breadcrumbs, page titles, tab labels, section headers                              |
| `ux-voice-and-tone.md`    | Voice definition, tone adaptation frameworks, brand audits, consistency reviews                            |
| `ux-settings.md`          | Settings pages, preference labels, toggle copy, account management, permission requests                    |
| `ux-help-and-guidance.md` | Tooltips, inline help text, contextual hints, walkthroughs, coach marks                                    |

**Scope boundary rules:**

- If copy appears _inside a form_, use `ux-forms.md` — even if it's a button inside a form.
- If copy is about _recovering from a broken state_, use `ux-error-messages.md` — even if it appears in a modal.
- If copy _warns before an action_ (not after), use `ux-confirmations.md`.
- If copy teaches a feature for the first time, use `ux-onboarding.md` — even if it's a tooltip.

---

## 2. Master Skill File Structure

```
SKILL.md

```

---

name: ux-writing
description: [SKILL DESCRIPTION — used by Claude to trigger the skill]

---

# UX Writing — Master Skill

## Purpose

## Sub-skills

## Routing table

## Routing logic

## Context protocol

## Ambiguity protocol

## Shared quality standards

## Output format

## Iteration protocol

````

### Full master skill template

---

```markdown
---
name: ux-writing
description: >
  Invoke for any UX writing or microcopy task: error messages, notifications,
  onboarding, form copy, button labels, confirmation dialogs, navigation labels,
  voice and tone, settings copy, tooltips, and help text. Handles all interface
  copy tasks for digital products. Routes to the correct sub-skill automatically.
  Use for new copy, rewrites, audits, and consistency reviews.
---

# UX Writing — Master Skill

## Purpose

This skill handles all UX writing tasks. It identifies the correct sub-skill
for the request, gathers necessary context, and produces validated output.
The invoker does not need to know which sub-skill applies.


## Sub-skills

| ID | File | Covers |
|----|------|--------|
| ERR | ux-error-messages.md | Error states of all types |
| NOT | ux-notifications.md | Alerts, banners, toasts, push |
| ONB | ux-onboarding.md | First-run, empty states, feature intro |
| FRM | ux-forms.md | Labels, placeholders, helper text, validation |
| BTN | ux-buttons-and-ctas.md | Buttons, CTAs, action links |
| CFM | ux-confirmations.md | Confirmation dialogs, destructive warnings |
| NAV | ux-navigation.md | Nav, menus, breadcrumbs, page titles |
| V&T | ux-voice-and-tone.md | Voice definition, tone, audits |
| SET | ux-settings.md | Settings, preferences, account copy |
| HLP | ux-help-and-guidance.md | Tooltips, inline help, walkthroughs |


## Routing table

Map the user's request to a sub-skill using the strongest signal present.
Signals are listed in priority order within each row.

| Sub-skill | Route if request mentions... |
|-----------|------------------------------|
| ERR | error, failure, broken, can't load, invalid, denied, not found, offline, wrong, rejected, 404, 500, permission denied, access blocked |
| NOT | notification, alert, banner, toast, badge, announcement, push notification, in-app message |
| ONB | onboarding, first time, empty state, zero state, no results, get started, welcome, feature announcement, new user |
| FRM | form, field, label, placeholder, input, helper text, hint, validation, required field, submit |
| BTN | button, CTA, call to action, link, action, click, tap, label for [action verb] |
| CFM | confirm, are you sure, delete, remove, cancel, undo, irreversible, destructive, warning before |
| NAV | nav, menu, navigation, breadcrumb, page title, tab, sidebar, section header |
| V&T | voice, tone, brand, audit, review, consistency, style, personality, rewrite for brand |
| SET | settings, preferences, toggle, switch, account, profile, permissions, plan, subscription |
| HLP | tooltip, help text, hint, coach mark, walkthrough, inline explanation, contextual guidance |


## Routing logic

1. Read the full request.
2. Identify the strongest routing signal from the table above.
3. If one sub-skill matches clearly → load it and proceed to the context protocol.
4. If two sub-skills could apply → use the scope boundary rules below.
5. If the request is genuinely ambiguous → ask one clarifying question (see ambiguity protocol).
6. Do not explain the routing decision to the user unless asked.

### Scope boundary rules

- Copy that appears *after something breaks* → ERR, not CFM
- Copy that *warns before an action* → CFM, not ERR
- A button *inside a form* → FRM owns the context; BTN handles the label
- A tooltip that *teaches a new feature* → ONB, not HLP
- A tooltip that *clarifies an existing field* → HLP, not ONB
- A banner that *announces a new feature* → ONB, not NOT
- A banner that *warns about a system issue* → NOT, not ERR


## Context protocol

Before producing any output, confirm the minimum required context.
Context requirements are defined in each sub-skill file.
Use this shared checklist first, then load sub-skill-specific requirements.

### Shared context (required for all sub-skills)

These must be known before writing begins. If any are missing from the request,
ask for them in a single grouped question — never ask for one item at a time.

| # | Context item | Why it matters |
|---|---|---|
| 1 | **Product type** | Consumer app, enterprise tool, developer tool, etc. Sets register and complexity |
| 2 | **Audience** | Who is reading this? Experience level, domain familiarity |
| 3 | **Platform / surface** | Web, iOS, Android, VS Code extension, CLI, etc. |

### How to ask for missing context

If any shared context items are missing, ask once using this pattern:

> Before I write this, I need a few details:
> - [Missing item 1]?
> - [Missing item 2]?
>
> [Sub-skill-specific question if needed]

Never ask more than 4 questions total (shared + sub-skill specific combined).
If sub-skill questions would exceed the limit, prioritise sub-skill-specific ones
over shared ones — shared defaults are listed below.

### Shared context defaults (use only if asking is not practical)

| Item | Default |
|---|---|
| Product type | B2B SaaS tool |
| Audience | Professional, moderate domain familiarity |
| Platform | Web (desktop) |


## Ambiguity protocol

If the routing signal is unclear, ask one question only. Do not list all sub-skills.
Do not ask the user to choose a category. Ask about the *situation*, not the taxonomy.

**Good:**
> Is this copy for something that's gone wrong (error or failure state), or for
> explaining how something works?

**Bad:**
> Should I use the error messages sub-skill or the help and guidance sub-skill?


## Shared quality standards

All output from any sub-skill must pass these standards before delivery.

### The four quality tests

| Test | Question |
|---|---|
| **Purposeful** | Does this help the user do something or understand something? |
| **Concise** | Is every word earning its place? |
| **Conversational** | Would a person say this? |
| **Clear** | Is this unambiguous on first read? |

### Universal constraints

- Never blame the user
- Never use technical terms the user won't recognise
- Never use exclamation points in error states or serious contexts
- Sentence case throughout (not Title Case)
- Active voice by default
- Second person ("you", "your") unless sub-skill specifies otherwise
- US English spelling and grammar throughout (not UK English or British English)

### Accessibility baseline

- All interactive element labels must be self-describing without visual context
- Error messages must name the field and the fix, not just the problem
- Do not rely on colour alone to convey state


## Output format

Produce output in this structure unless the sub-skill specifies otherwise:

````

[Copy block with all required elements clearly labelled]

---

Rubric check: [PASS / 1–2 line note on any edge case]
Alternatives: [Only if confidence is not high or multiple approaches are valid]

```

If the request involves multiple copy elements (e.g., a full form), group them
by element type with a heading for each.


## Iteration protocol

1. Deliver output as above.
2. If the user requests a change, apply it and recheck the shared quality standards.
3. If a requested change would violate a shared constraint, flag it briefly and
   offer a compliant alternative. Do not silently comply with a constraint violation.
4. If the user accepts, close.
```

---

## 3. Sub-Skill File Structure

Every sub-skill uses the same six-section structure, in this order. The structure is fixed; the content varies.

### Section map

```
---                         ← YAML front matter (name, parent, description)
---

# [Sub-skill name]

## Scope                    ← What this file covers and what it does NOT cover
## Context checklist        ← Sub-skill-specific questions to ask before writing
## Rules and constraints    ← Hard limits, patterns, forbidden terms
## Templates                ← Structural patterns for each element type
## Rubric                   ← Pass/fail checklist for output validation
## Examples                 ← 2–4 annotated before/after or input/output pairs
```

### Full sub-skill template

````markdown
---
name: vgds-ux-[identifier]
parent: vgds:ux-writing
description: >
  [One sentence: what this file covers. Used internally for routing confirmation.]
---

# [Sub-skill Name]

## Scope

**Covers:**

- [Specific element or situation type 1]
- [Specific element or situation type 2]
- [...]

**Does not cover:**

- [Adjacent scope that belongs to another sub-skill — with file reference]
- [...]

**Boundary note:** [One sentence on the most common edge case at the boundary
of this sub-skill's scope, and how to resolve it.]

## Context checklist

Collect this information before writing. Items marked (R) are required.
Items marked (O) improve quality but have a usable default.

| #   | Item               | Why                              | Default if not provided |
| --- | ------------------ | -------------------------------- | ----------------------- |
| 1   | [Context item] (R) | [One sentence: impact on output] | —                       |
| 2   | [Context item] (R) | [One sentence: impact on output] | —                       |
| 3   | [Context item] (O) | [One sentence: impact on output] | [Default value]         |
| 4   | [Context item] (O) | [One sentence: impact on output] | [Default value]         |

If required items are missing, ask for them as part of the master skill's shared
context question. Do not ask separately.

## Rules and constraints

### Structure rules

- [Structural requirement — e.g., always include a title and a recovery action]
- [Character limits per element type]
- [...]

### Tone rules

- [Tone requirement specific to this sub-skill]
- [...]

### Forbidden patterns

| Pattern    | Why forbidden | Use instead     |
| ---------- | ------------- | --------------- |
| "[phrase]" | [Reason]      | "[Alternative]" |
| [...]      | [...]         | [...]           |

### Required elements

| Element        | Required?                       | Max length      |
| -------------- | ------------------------------- | --------------- |
| [Element name] | Always / Conditional / Optional | [N chars/words] |
| [...]          | [...]                           | [...]           |

## Templates

One template per element type this sub-skill handles.
Use YAML format for structured output. Use markdown for prose templates.

### [Element type 1]

```yaml
[element]:
  [field]: "<description — max N chars>"
  [field]: "<description — optional>"
  [field]:
    label: "<max N chars>"
    type: "<type>"
```
````

### [Element type 2]

[Prose template with placeholders in [brackets]]

## Rubric

Run this before returning any output.

**Pass if all are true:**

- [ ] [Criterion 1]
- [ ] [Criterion 2]
- [ ] [Criterion 3]
- [ ] Passes all shared quality standards from master skill

**Fail if any are true:**

- [ ] [Failure condition 1]
- [ ] [Failure condition 2]
- [ ] Fails any shared constraint from master skill

If the rubric fails, revise and recheck before delivering output.
Do not deliver output that fails the rubric without flagging the issue.

## Examples

### Example 1 — [Scenario name]

**Input:**

- [Context item]: [Value]
- [Context item]: [Value]
- Request: [What the user asked for]

**Output:**

```yaml
[Structured output]
```

**Why this works:** [1–2 sentences on the key decisions made]

---

### Example 2 — [Scenario name]

**Input:**

- [Context item]: [Value]
- Request: [What the user asked for]

**Output:**
[Output]

**Common mistake this avoids:** [What a less careful version would have done wrong]

---

### Example 3 — Edge case: [Scenario name]

**Input:**

- [Ambiguous or difficult context]

**Routing note:** [Why this stays in this sub-skill rather than routing elsewhere]

**Output:**
[Output]

```

---

## 4. Design Rationale

### Why these ten sub-skills

The boundaries follow *user intent and UI surface*, not content type.
A developer asking for "error copy" knows they need error copy — they should not
need to know whether it's a "system error" or a "permission error" at the point
of invocation. The sub-skill handles that classification internally.

The ten files cover every common UI state a developer writing or reviewing copy
would encounter. No two files cover the same surface or intent.

### Why a shared context protocol in the master

Sub-skill files should not duplicate context-gathering logic. Centralising it
in the master skill ensures:
- A developer invoking the skill gives information once, not once per sub-skill
- Shared defaults are consistent across all sub-skills
- Ambiguity handling is predictable

### Why the routing table uses natural language signals

Developers invoking this skill in VS Code will use natural language. The routing
table is designed to match how a developer would actually describe their task
("I need a button label for…", "write me an error for when…"), not how a UX
writer would categorise the work.

### Why each sub-skill includes a rubric

The rubric closes the loop between writing and validation within a single file.
It removes the need for a separate review pass and ensures output is
self-correcting before it reaches the developer.

---

## 5. File Naming and Location Convention

```

skills/
├── SKILL.md ← Master skill (single entry point)
├── ux-error-messages.md
├── ux-notifications.md
├── ux-onboarding.md
├── ux-forms.md
├── ux-buttons-and-ctas.md
├── ux-confirmations.md
├── ux-navigation.md
├── ux-voice-and-tone.md
├── ux-settings.md
└── ux-help-and-guidance.md

```

All files in the same directory. No sub-folders. The master skill references
sub-skills by filename only.
```

---
name: vgds-ux-writing
metadata:
  version: "2.0"
  package: "@volvo/vcdk-ai-kit"
  category: foundation
  repository: "VolvoGroup-Internal/volvo-group-design-system"
  branch: "main"
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
for the request, gathers necessary context, produces validated output, and runs
a terminology QA pass before delivery. The invoker does not need to know which
sub-skill applies or how the process works.

---

## Sub-skills

| ID  | File                    | Covers                                                |
| --- | ----------------------- | ----------------------------------------------------- |
| ERR | ux-error-messages.md    | Error states of all types                             |
| NOT | ux-notifications.md     | Alerts, banners, snackbars, push                      |
| ONB | ux-onboarding.md        | First-run, empty states, feature intro                |
| FRM | ux-forms.md             | Labels, placeholders, helper text, validation         |
| BTN | ux-buttons-and-ctas.md  | Buttons, CTAs, action links                           |
| CFM | ux-confirmations.md     | Confirmation dialogs, modals, destructive warnings    |
| NAV | ux-navigation.md        | Nav, menus, breadcrumbs, page titles                  |
| V&T | ux-voice-and-tone.md    | Voice definition, tone of voice, audits               |
| SET | ux-settings.md          | Settings, preferences, options, profile, account copy |
| HLP | ux-help-and-guidance.md | Tooltips, inline help, walkthroughs                   |

---

## File loading protocol

All sub-skill files and the terminology reference are in the same directory as this file.

**When to load what:**

| File                  | When to load                                                                  |
| --------------------- | ----------------------------------------------------------------------------- |
| `./ux-[sub-skill].md` | After routing is determined — load the matched sub-skill file before drafting |
| `./ux-terminology.md` | At Step 5 (Terminology QA) only — not upfront                                 |

**How to load:** Use your file reading tool with the path relative to this file's location.

Example — if routed to ERR, load `./ux-error-messages.md` before proceeding to the context protocol.

Do not load `./ux-writing-skill-architecture.md` — it is a design reference document, not a runtime file.

---

## Routing table

Map the user's request to a sub-skill using the strongest signal present.
Signals are listed in priority order within each row.

| Sub-skill | Route if request mentions...                                                                                                                                     |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ERR       | error, failure, broken, can't load, invalid, denied, not found, missing, removed, offline, wrong, rejected, 404, 500, permission denied, access blocked, warning |
| NOT       | notification, alert, banner, snackbar, badge, announcement, push notification, in-app message                                                                    |
| ONB       | onboarding, first time, empty state, zero state, no results, get started, welcome, feature announcement, new user                                                |
| FRM       | form, field, label, placeholder, input, helper text, hint, validation, required field, submit                                                                    |
| BTN       | button, CTA, call to action, link, action, click, tap, label for [action verb]                                                                                   |
| CFM       | confirm, are you sure, delete, remove, cancel, undo, irreversible, destructive, warning before                                                                   |
| NAV       | nav, menu, navigation, breadcrumb, page title, tab, sidebar, section header                                                                                      |
| V&T       | voice, tone, brand, audit, review, consistency, style, personality, rewrite for brand                                                                            |
| SET       | settings, preferences, options, toggle, switch, account, profile, permissions, plan, subscription                                                                |
| HLP       | tooltip, help text, hint, walkthrough, inline explanation, contextual guidance                                                                                   |

---

## Routing logic

1. Read the full request.
2. Identify the strongest routing signal from the table above.
3. If one sub-skill matches clearly → load it and proceed to the context protocol.
4. If two sub-skills could apply → use the scope boundary rules below.
5. If the request is genuinely ambiguous → ask one clarifying question (see ambiguity protocol).
6. Do not explain the routing decision to the user unless asked.

### Scope boundary rules

- Copy that appears _after something breaks_ → ERR, not CFM
- Copy that _warns before an action_ → CFM, not ERR
- A button _inside a form_ → FRM owns the context; BTN handles the label
- A tooltip that _teaches a new feature_ → ONB, not HLP
- A tooltip that _clarifies an existing field_ → HLP, not ONB
- A banner that _announces a new feature_ → ONB, not NOT
- A banner that _warns about a system issue_ → NOT, not ERR

---

## Context protocol

Before producing any output, confirm the minimum required context.
Context requirements are defined in each sub-skill file.
Use this shared checklist first, then load sub-skill-specific requirements.

### Shared context (required for all sub-skills)

These must be known before writing begins. If any are missing from the request, ask for them in a single grouped question — never ask for one item at a time.

| #   | Context item         | Why it matters                                                                   |
| --- | -------------------- | -------------------------------------------------------------------------------- |
| 1   | **Product type**     | Consumer app, enterprise tool, developer tool, etc. Sets register and complexity |
| 2   | **Audience**         | Who is reading this? Experience level, domain familiarity                        |
| 3   | **Platform/surface** | Web, iOS, Android, VS Code extension, CLI, etc.                                  |

### How to ask for missing context

If any shared context items are missing, ask once using this pattern:

> Before I write this, I need a few details:
>
> - [Missing item 1]?
> - [Missing item 2]?
>
> [Sub-skill-specific question if needed]

Never ask more than 4 questions total (shared + sub-skill specific combined).
If sub-skill questions would exceed the limit, prioritise sub-skill-specific ones
over shared ones — shared defaults are listed below.

### Shared context defaults (use only if asking is not practical)

| Item         | Default                                   |
| ------------ | ----------------------------------------- |
| Product type | B2B SaaS tool                             |
| Audience     | Professional, moderate domain familiarity |
| Voice        | Clear, direct, neutral-positive           |
| Platform     | Web (desktop)                             |

---

## Ambiguity protocol

If the routing signal is unclear, ask one question only. Do not list all sub-skills.
Do not ask the user to choose a category. Ask about the _situation_, not the taxonomy.

**Good:**

> Is this copy for something that's gone wrong (error or failure state), or for
> explaining how something works?

**Bad:**

> Should I use the error messages sub-skill or the help and guidance sub-skill?

---

## Shared quality standards

All output from any sub-skill must pass these standards before delivery.

### The four quality tests

| Test               | Question                                                      |
| ------------------ | ------------------------------------------------------------- |
| **Purposeful**     | Does this help the user do something or understand something? |
| **Concise**        | Is every word earning its place?                              |
| **Conversational** | Would a person say this?                                      |
| **Clear**          | Is this unambiguous on first read?                            |

### Universal constraints

- Never blame the user
- Never use technical terms the user won't recognize
- Never use exclamation points in error states or serious contexts
- Sentence case throughout (not Title Case)
- Active voice by default
- Second person ("you", "your") unless sub-skill specifies otherwise
- American (US) English throughout (not UK English or British English)
- Use one consistent term for each concept within a single output — do not refer to the same thing with two different words in the same component or message. If the source material uses inconsistent terms, pick the most precise one and apply it throughout.
- Use numerals for all numbers in UX copy (e.g. "3 behaviors", "10 vehicles", "5 attempts") — do not spell out numbers. Two exceptions: (1) when the number opens a sentence — spell it out to avoid starting with a digit (e.g. "Three behaviors are tracked"); (2) when used as an indefinite article — use "one [noun]" or "a [noun]" rather than the numeral (e.g. "a driver", "one vehicle").

### Accessibility baseline

- All interactive element labels must be self-describing without visual context
- Error messages must name the field and the fix, not just the problem
- Do not rely on colour alone to convey state

---

## Output workflow

Every request follows these steps in order. Do not skip or reorder steps.

**Step 1 — Route**
Identify the correct sub-skill using the routing table and routing logic above.
If the routing decision is non-obvious — a boundary case, a case where two sub-skills could apply, or a case where the request falls partly or fully outside the skill's scope (e.g. OS-level push notifications, out-of-scope platforms) — record the decision. It will be surfaced in the output as a Routing note at Step 6. Do not explain routing mid-response; surface it only in the output footer.

**Step 2 — Gather context**
Collect shared context and any sub-skill-specific required items.
Ask once if anything critical is missing. Apply defaults if asking is not practical.

**Unknown values protocol:**
If the request requires a specific value (threshold, count, date, name, URL, duration) that is not provided and would materially affect the output, do not invent it. Choose one of two options:

- **Option 1 — Ask:** If the missing value is small in number and easy to provide, ask for it before writing. Combine with any other missing context questions — never ask for a value in isolation if other context is also missing.
- **Option 2 — Two versions:** If asking would slow the user down unnecessarily, produce two versions of the output:
  - **Generic:** Copy written to work without the specific value — vague by design, not by accident.
  - **Specific:** Copy with a clearly marked placeholder (e.g. `[X days]`, `[threshold]`, `[vehicle name]`) signalling exactly where the user must insert their own data.

Never silently invent a value and present it as if it were known. If a value was invented despite this rule — for example, because it was embedded in source material — flag it in the output footer using the Invented value note format defined in Step 6.

**Dynamic value check — applies during drafting:**
Before completing a draft, scan for any specific value in the copy — whether taken from the prompt or inferred from context — that the product would need to inject at runtime rather than hardcode. Common examples: user names, vehicle identifiers, counts that change over time, dates or days that vary by configuration, thresholds set by individual users, scores, and prices. Flag each one in the output footer using the Dynamic value note format defined in Step 6. This check applies equally to values stated explicitly in the prompt and to values the skill inferred or assumed from context — both require the flag if they are runtime-dependent.

**Step 3 — Draft**
Load the sub-skill file. Write output following its templates and rules.
Draft freely — do not self-censor against terminology constraints at this stage.

**Cross-output consistency — applies when producing multiple pieces in the same session or brief:**
When a request produces more than 1 piece of copy (e.g. a multi-surface brief, a set of related components), maintain a working list of terms established in earlier pieces. Before drafting each new piece, check whether any concept already has a named term from a previous piece — and use that term, not a synonym. Do not introduce an alternative word for a concept already named in the same session without explicitly flagging the change and providing a reason. Common failure mode: using "valid", "active", and "current" interchangeably across pieces when only 1 has been established as the canonical form for this brief. The first term used in the session is the default canonical form unless the user specifies otherwise or a later piece corrects it via a V&T audit finding.

**Step 4 — Run sub-skill rubric**
Check the draft against the sub-skill's pass/fail rubric.
Revise until all pass criteria are met. Do not proceed to step 5 with a failing draft.

**Step 5 — Terminology QA**
Read `ux-terminology.md`. Check the draft output against all four sections
in the order below. Apply corrections silently before delivery.

| Check | Section in ux-terminology.md          | What to look for                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | Approved terms                        | Confirm all product-specific terms use their canonical form. **Canonical form includes capitalization** — a term spelled correctly but cased wrongly is a terminology violation. Example: "contact support" must be "Contact Support". Check every approved term in the draft against its variant forms table, not just its spelling.                                                                                                                                                                                                                                                                                       |
| 2     | Forbidden terms                       | Confirm no forbidden term appears anywhere in the output                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 3     | UI pattern vocabulary                 | Confirm component names, state names, and action verbs match standards                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 4     | Voice vocabulary                      | Confirm no hedging language or non-standard openers are present — including vague error body phrases. See Hedging language to remove in ux-terminology.md Voice vocabulary.                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 5     | Internal and cross-output consistency | Confirm the same concept is referred to by one term throughout the output. If two different words name the same thing (e.g. "registration" and "plate number" in the same message), pick the most precise and apply it consistently. Flag the change in the Terminology adjusted note. When producing multiple pieces in the same session, also confirm the draft does not introduce a new term for a concept already named in a previous piece — e.g. using "valid" in Piece 7 when "current" was established in Piece 2 and "active" in Piece 6. If a synonym slipped in, correct it to the established term and flag it. |

Scope the check to terms actually present in the output — do not scan for all possible violations. Read only what is needed to verify what is in the draft.

**Terminology QA is not optional.** It runs on every output — including rewrites, alternatives, and mid-conversation revisions. A draft that passes the sub-skill rubric but fails Terminology QA must be corrected before delivery. It does not ship as-is with a note.

**Step 6 — Deliver**
Return the output using the format below.
If corrections were made in step 5, append a one-line note: `Terminology adjusted: [old term] → [canonical term]`
Do not list corrections that were not made. Do not explain the QA process unless the user asks.
If the output contains domain-specific or technical terms (e.g. "API", "quota", "instance", "payload"), append an audience assumption note: `Audience assumption: "[term]" — written for [audience type]. Adjust if your audience differs.`
Include this note for each distinct domain-specific term used. Omit it if all terms are everyday language.
If the output contains a placeholder for an unknown value, append a note for each one: `Invented value: "[placeholder]" — replace with your product's actual value before use.`
If the output contains any value — whether taken from the prompt or inferred from context — that must be injected dynamically at runtime rather than hardcoded, append a note for each one: `Dynamic value: "[value]" — must be injected at runtime; do not hardcode in the copy.` This applies to values explicitly provided (e.g. "2 attempts") and to values the skill assumed from context (e.g. "every Monday" inferred from "weekly").
If a non-obvious routing or scope decision was made — including boundary cases, platform scope limitations, or cases where two sub-skills could apply — append a one-line note: `Routing note: [what was decided and why — one sentence].`
Always append a terminology check note on every output, regardless of whether corrections were made or domain terms were flagged: `Terminology check: Review all terms in this output against your internal product terminology and approved term list. Confirm that proposed terms match your product's canonical forms and intended meaning before use.`

**Step 7 — Iterate**
If the user requests a change, apply it and rerun steps 4 and 5 before returning the revised output.
If a requested change would violate a shared constraint, flag it briefly and offer a compliant alternative.
Do not silently comply with a violation.

---

## Output format

```
[Copy block with all required elements clearly labelled]

---
Rubric: [PASS / 1–2 line note on any edge case]
Alternatives: [Only if confidence is not high or multiple valid approaches exist]
Terminology adjusted: [old] → [canonical]   ← include only if a correction was made
Audience assumption: "[term]" — written for [audience type]. Adjust if your audience differs.   ← include only if domain-specific terms are used
Invented value: "[placeholder]" — replace with your product's actual value before use.   ← include once per placeholder; omit if no placeholders used
Dynamic value: "[value]" — must be injected at runtime; do not hardcode in the copy.   ← include for any runtime-dependent value from the prompt
Routing note: [what was decided and why — one sentence]   ← include only for non-obvious routing or scope decisions
Terminology check: Review all terms in this output against your internal product terminology and approved term list. Confirm that proposed terms match your product's canonical forms and intended meaning before use.   ← always include
```

If the request involves multiple copy elements (e.g. a full form or a set of error states), group them by element type with a heading for each.

---
name: vgds-ux-onboarding
parent: vgds-ux-writing
metadata:
  version: "2.0"
  package: "@volvo/vcdk-ai-kit"
  category: foundation
  repository: "VolvoGroup-Internal/volvo-group-design-system"
  branch: "main"
description: First-run flows, empty states, zero-data or zero-results states, progressive disclosure, and feature announcements for new users.
---

## Scope

**Covers:**

- First-run welcome screens
- Empty states (no data yet, data removed, access restricted)
- Zero-results states (search or filter returned nothing)
- Feature announcement modals and banners
- Progressive disclosure copy (step-by-step reveals)
- Ongoing system process (loading states)

**Does not cover:**

- Ongoing help text for established features (→ ux-help-and-guidance)
- Error copy inside onboarding forms (→ ux-error-messages)

**Boundary note:**
If this is the first time a user sees a feature or state, it belongs here — even if it's a tooltip.

---

## Context checklist

Items marked (R) are required before writing. Items marked (O) improve quality but have a usable default.

| #   | Context item                                                          | Why it matters                                                                                                                                                   | Default if not provided |
| --- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| 1   | Empty state type (R)                                                  | First-use vs. user-cleared vs. no-results changes the message entirely                                                                                           | —                       |
| 2   | What the user should do next (R)                                      | Required to write the CTA                                                                                                                                        | —                       |
| 3   | User's prior experience with this product or feature (O)              | Affects how much explanation is needed                                                                                                                           | Moderate familiarity    |
| 4   | CTA destination (R)                                                   | Where "get started" or similar goes                                                                                                                              | —                       |
| 5   | Core product value or user goal (R for first-use and welcome screens) | Required to lead with user benefit instead of feature description. Without it, copy defaults to generic phrasing that cannot reflect the product's actual value. | —                       |

If required items are missing, ask for them as part of the master skill's context question.
Do not ask for required items separately from the master skill's shared question block.

---

## Rules and constraints

### Structure rules

- Always include an explanation of why it's empty OR what the user can do to see or add content
- Always include a CTA - no dead-ends
- Illustration alt text counts as copy — write it
- Headline max: 60 characters
- Body max: 150 characters
- CTA max: 20 characters
- First-use states: focus on value or user intent, not features
- User-cleared states: explain without blaming the user
- Zero-results states: include guidance on how to improve the chances of seeing results OR suggest comparable/ related results
- Access-restricted states: explain how the user might gain or request access (if possible)

### Tone rules

- Welcoming and encouraging, not negative, robotic, urgent or pressuring
- First-use: friendly and value-focused
- User-cleared: practical and helpful - don't blame the user
- Zero-results: practical and helpful — don't apologize, offer a path forward
- Access-restricted: practical and helpful - offer a path forward, don't be harsh or blame the user

### Forbidden patterns

| Pattern | Why forbidden | Use instead |
| "Nothing here yet" alone | No guidance | Add why and what to do + action |
| "Get started!" with no context | Vague | Name the action ("Add your first project") |
| "No results found" alone | Dead end | Offer related results/searches or a next step |
| Feature list as onboarding copy | Feature-focused | Lead with user benefit |
| Generic welcome copy without product value ("You're all set", "Ready to go", "Welcome aboard") when used as the primary message | Meaningless without context — could apply to any product | Ask for core product value; reflect it in the headline or body |

### Required elements

| Headline | Always | max. 60 chars |
| Body / explanation | Always | max. 150 chars |
| CTA | Always (except error-caused empty states) | max. 20 chars |

---

## Templates

### Empty state

```yaml
empty_state:
  type: "<first-use | zero-results | user-cleared | access restricted >"
  headline: "<max 60 chars>"
  body: "<why it's empty + what to do — max 150 chars>"
  cta:
    label: "<max 20 chars>"
```

---

## Rubric

Run before returning output. If any Fail condition is true, revise first.

**Pass if all are true:**

- [ ] Empty state type is correctly identified (first-use / zero-results / user-cleared / access restricted)
- [ ] Headline explains why it's empty or what this space is for
- [ ] CTA names a specific action, not just "Get started"
- [ ] Copy leads with user benefit, not feature description
- [ ] For first-use and welcome screens: core product value or user goal was provided or asked for — generic copy ("You're all set", "Ready to go") is a fail if no product value was supplied
- [ ] Passes all shared quality standards from master skill

**Fail if any are true:**

- [ ] Character limits exceeded
- [ ] Fails any shared constraint from SKILL.md
- [ ] Output uses a forbidden pattern listed above
- [ ] Required element is missing

---

## Examples

### Example 1 — New user setup wizard

**Input:**

- Onboarding type: setup-wizard
- Product: project management tool
- Required steps: start wizard, name workspace, invite team members, view workspace
- User type: New signup

**Output:**

```yaml
onboarding_flow:
  type: "setup-wizard"
  total_steps: 4
  steps:
    - step: 1
      headline: "Welcome to Workflow X Tool"
      body: "Let's set up your workspace in just 2 minutes."
      action:
        label: "Get started"
        type: "next"
    - step: 2
      headline: "Set your workspace name"
      body: "Choose a name your team will easily recognize."
      action:
        label: "Continue"
        type: "next"
    - step: 3
      headline: "Add your team members"
      body: "Collaboration works best with others. You can also add people later."
      action 1:
        label: "Add members and continue"
        type: "next"
      action 2:
        label: "Skip for now"
        type: "next"
      step: 4
      headline: "Your workspace is ready!"
      body: "Now you can start a new project, track your activity, or add more members."
      action:
        label: "Start project"
        type: "complete"
```

**Why this works:** All headlines explain the purpose of the page, paired with clear, specific actions to keep the user progressing through the wizard.

---

### Example 2 — New feature introduction

**Input:**

- Onboarding type: feature-intro
- Feature: new dashboard controls
- Steps: overview, new control #1, new control #2
- User type: existing user discovering a new UI

**Output:**

```yaml
onboarding_flow:
  type: "feature-intro"
  total_steps: 3
  steps:
    - step: 1
      headline: "Better speed and traffic data"
      body: "You can now easily access 2 new metrics in the dashboard - both updated in real time."
      action:
        label: "See new metrics"
        type: "next"
    - step: 2
      headline: "Network speed"
      body: "Know your network performance at any given time. Filter by device and generate informative reports."
      action:
        label: "Next"
        type: "next"
    - step: 3
      headline: "Traffic overview"
      body: "Monitor the traffic in your network, 24/7. Sort by user, device, or location."
      action:
        label: "Got it"
        type: "complete"
```

**Common mistake this avoids:** Compressing all information in a single screen or step would create mental overload for the user. It would also make it harder to recognize the new features and start using them.

---

### Example 3 — Edge case: data removed by user

**Input:**

- Empty state type: data-removed
- Content: user checked off all tasks in their task-tracker-page
- User type: existing user

**Output:**

```yaml
empty_state:
  type: "data-removed"
  headline: "All tasks done!"
  body: "You completed everything in your tracker. You can add new tasks here anytime or switch to a different project."
  action:
    label: "See active projects"
```

**Routing note:** Although it could be considered both a success (positive output) and an error message (empty page), this scenario is an empty state. Despite the lack of data or actionable items, it is the outcome of an intentional, positive user action, and it doesn't represent a dead-end.

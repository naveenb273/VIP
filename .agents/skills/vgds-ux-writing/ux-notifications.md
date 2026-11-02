---
name: vgds-ux-notifications
parent: vgds-ux-writing
metadata:
  version: "2.0"
  package: "@volvo/vcdk-ai-kit"
  category: foundation
  repository: "VolvoGroup-Internal/volvo-group-design-system"
  branch: "main"
description: Alerts, banners, snackbars, badges, push notifications, and in-app announcements of any severity.
---

## Scope

**Covers:**

- Snackbar messages (Neutral, Success)
- Inline and persistent banners (all severity levels)
- Push notification title and body
- Badge label copy
- In-app announcement copy
- Recurring feature tips and product update notices for existing users (Info)
- System and service status updates (Info, Neutral)
- Action and process completion confirmations (Success, Neutral)

**Does not cover:**

- Errors following a failed action (→ ux-error-messages)
- Caution, Warning, or Error-level messages (→ ux-error-messages)
- First-time feature announcements shown to existing users when they first encounter a new feature (→ ux-onboarding) — recurring notices about the same feature, or product-wide update banners, stay here
- Announcements shown to new users during a first-run or onboarding flow (→ ux-onboarding)
- One-time first-use guidance (→ ux-onboarding)

**Boundary note:**
If the message announces a status, completion, or update not caused by user error, it belongs here.
If the message is shown to a user for the very first time as part of an onboarding or first-run flow, route to ux-onboarding instead — even if the copy looks like an Info notification.

---

## Context checklist

Items marked (R) are required before writing. Items marked (O) improve quality but have a usable default.

| #   | Context item | Why it matters | Default if not provided |
| --- | ------------ | -------------- | ----------------------- |

| 1 | Severity level (R) | Determines tone, component type, and copy approach — infer from the situation described; ask one question only if Neutral and Success are indistinguishable from context. For this subskill: Neutral, Info, or Success. Caution, Warning, and Error route to ux-error-messages | Infer from request; see ### Severity inference in Structure rules |
| 2 | What triggered the notification (R) | Determines whether it's system-, user-, or time-initiated | — |
| 3 | Required action (O) | Whether user must act or can dismiss | Dismissable |
| 4 | Timing / persistence (O) | Auto-dismiss timing affects how much copy fits | Auto-dismiss, 5s |

If required items are missing, ask for them as part of the master skill's context question.
Do not ask for required items separately from the master skill's shared question block.

---

## Rules and constraints

### Structure rules

- Identify the component type before writing — required elements differ per component
- Never produce output without first confirming which component type applies
- Always include: body + severity indicator
- Don't display titles in snackbars
- Title is only mandatory for banner; optional for other components
- Snackbar body: 90 characters
- Banner title max: 60 characters, body: 150 characters
- Action label max: 20 characters
- Auto-dismiss snackbars should not contain required actions

### Tone rules

- Tone is determined by severity level — apply the correct register before writing
- Never use exclamation points — not even for Success
- Never use promotional or marketing language in Info notifications
- Never create urgency in Neutral or Info messages

# Tone by severity level:

| Neutral | Direct — state what happened or is happening; no warmth, no urgency |
| Info | Friendly, direct — useful and clear; informative without being promotional |
| Success | Positive, direct — affirm the outcome proportionally; brief warmth is acceptable; never effusive or exclamatory |

# Tone boundaries:

- Neutral must read as passive and factual — adding warmth signals Success
- Info must not read as a promotion — if it sounds like marketing, rewrite it
- Success warmth must be proportional to the outcome — "Purchase confirmed" warrants more warmth than "File saved"

### Forbidden patterns

| "You have a new notification" | Says nothing | State what happened |
| URGENT / ALERT in all caps | Alarming | Describe the situation calmly |
| "Click here for more" | Vague link | "View [specific thing]" |
| Notification with no dismiss | Traps user | Always provide a close action |
| Exclamation point in any notification | Inappropriate at all severity levels | Remove — let the content carry the tone | All |
| "Great news!" / "Exciting update!" openers | Promotional; trivialises for minor events | State what happened directly | Info, Success |
| Urgent language in Neutral or Info notifications ("Act now", "Don't miss this") | Creates false urgency for non-urgent content | State the information without pressure | Neutral, Info |
| Persistent banner for Neutral content | Overstates a passive event | Use auto-dismiss snackbar or inline message | Neutral |
| Auto-dismiss snackbar for Info requiring user action | User may miss it before it disappears | Use persistent banner for Info with required action | Info |
| Warm or congratulatory tone for Neutral system events | Mislabels a background event as a user achievement | Keep Neutral copy factual and passivte | Neutral |

### Required elements

| Severity | Always | — | Declared in output; inferred from request |
| Title | Required for banners, optional for all others | 45–60 chars |
| Body | Required for all | 90–150 chars |
| Action or dismiss | Always | 20 chars |

### Severity inference

Identify severity before writing. Infer from the situation described.
Do not ask the user to name the severity level.
Ask one clarifying question only when Neutral and Success cannot be distinguished from context.

# Inference signal table:

| Signal in request                                              | Inferred severity |
| -------------------------------------------------------------- | ----------------- |
| User-initiated action completed with a positive outcome        | Success           |
| System or background process completed without user initiation | Neutral           |
| Product feature launched or updated                            | Info              |
| Tip, best practice, or usage guidance shared proactively       | Info              |
| System update, policy change, or service notice                | Info              |
| Ambiguous — completed action but who initiated it is unclear   | Ask one question  |

Clarifying question (use only when Neutral and Success are indistinguishable):
"Did the user trigger this action, or did the system do it automatically in the background?"

# Severity constraints on component types:

| Severity | Permitted components                                       | Prohibited components    |
| -------- | ---------------------------------------------------------- | ------------------------ |
| Neutral  | Snackbar (auto-dismiss), Inline message                    | Persistent banner, Modal |
| Info     | Banner (persistent), Snackbar                              | —                        |
| Success  | Snackbar (auto-dismiss), Banner (high-value outcomes only) | Modal                    |

# Auto-dismiss rules by severity:

| Neutral | Always auto-dismiss — passive info does not require user attention |
| Info | Persistent by default — user may need to act or refer back |
| Success | Auto-dismiss for routine completions; persistent banner for high-value outcomes (purchase confirmed, account activated) |

---

## Templates

### Snackbar

```yaml
snackbar:
  severity: "<neutral | success>"
  severity_inference: "<signal from request that determined this level — one phrase>"
  title: "<what happened — max 45 chars>"
  body: "<context if needed — max 90 chars, optional>"
  action:
    label: "<max 20 chars, optional>"
  dismiss: true
  auto_dismiss_ms: 5000
```

### Banner

```yaml
banner:
  severity: "<neutral | info | success>"
  severity_inference: "<signal from request that determined this level — one phrase>"
  title: "<what happened or what the user needs to know — max 60 chars>"
  body: "<what this means for the user — max 150 chars>"
  action:
    label: "<max 20 chars>"
    type: "<navigate | dismiss>"
```

---

## Rubric

Run before returning output. If any Fail condition is true, revise first.

**Pass if all are true:**

- [ ] Severity level is identified and declared in the output
- [ ] Severity was inferred from situational signals, not assumed or defaulted
- [ ] Component type is permitted for the identified severity level
- [ ] Neutral messages use auto-dismiss snackbars or inline — never persistent banner
- [ ] Info messages with a required action use persistent banner — never auto-dismiss snackbar
- [ ] Success warmth is proportional to the outcome — high-value outcomes warrant more warmth than routine completions
- [ ] Title states what happened or what the user needs to know — not a generic label
- [ ] No exclamation points present
- [ ] No promotional or urgency language present in Neutral or Info copy
- [ ] Auto-dismiss snackbars contain no required actions
- [ ] Dismiss mechanism is present
- [ ] Passes all shared quality standards from master skill

**Fail if any are true:**

- [ ] Character limits exceeded
- [ ] Fails any shared constraint from SKILL.md
- [ ] Output uses a forbidden pattern listed above
- [ ] Required element is missing

---

## Examples

### Example 1 — Neutral: background process completed

**Input:**

- Context: A fleet report was generated automatically in the background — the user did not trigger it
- Severity: Neutral (system-initiated, no user action required)
- Action required: None — user can view the report but doesn't have to

**Output:**

```yaml
snackbar:
  severity: "neutral"
  severity_inference: "system-initiated background process completed — no user action triggered this"
  body: "Fleet report ready."
  action:
    label: "View report"
    type: "navigate"
  dismiss: true
  auto_dismiss_ms: 5000
```

**Why this works:** Severity is Neutral — the system generated this automatically, not in response to a user action. Auto-dismiss snackbar is the correct component for Neutral (passive info; no persistent attention required). Body is factual and direct — no warmth, no urgency. The action is optional, not required, which makes an auto-dismiss snackbar appropriate; the user can always find the report elsewhere.

**Routing note:** If the user had manually triggered the report generation, severity would be Success, not Neutral — the distinction is who initiated the action.

---

### Example 2 — Info: persistent banner with required action

**Input:**

- Context: The portal's data retention policy has changed — users must review and acknowledge the update before continuing
- Severity: Info (system/policy update; user action required)
- Action required: Yes — user must acknowledge to proceed

**Output:**

```yaml
banner:
  severity: "info"
  severity_inference: "policy change requiring user acknowledgment — system-initiated, action required"
  title: "Data retention policy updated"
  body: "Our data retention period has changed. Review the update to understand how your fleet data is stored and managed."
  action:
    label: "Review update"
    type: "navigate"
  dismiss: false
```

**Why this works:** Severity is Info — no failure has occurred; this is a system notice. A persistent banner is the correct component: the user must acknowledge the update, so auto-dismiss would risk the message disappearing before they act. `dismiss: false` keeps it visible until the user takes action. Title states what happened; body explains why it matters to the user without promotional language.

**Common mistake this avoids:** Using an auto-dismiss snackbar for Info with a required action. The forbidden pattern "Auto-dismiss snackbar for Info requiring user action" applies here — the user must be able to read and act on the message at their own pace.

---

### Example 3 — Edge case: Info banner, no action, manual dismiss

**Input:**

- Context: Network connection lost — the app has switched to offline mode; the user's changes will sync automatically when connection is restored
- Severity: Info (system status update; informational only, no user action required)
- Action required: None

**Output:**

```yaml
banner:
  severity: "info"
  severity_inference: "system status change affecting ongoing user work — informational, no action required"
  title: "You're offline"
  body: "Your changes will sync automatically when your connection is restored."
  action:
    label: "Got it"
    type: "dismiss"
  dismiss: true
  auto_dismiss_ms: null
```

**Why this works:** Severity is Info — this is a system status update, not an error. A persistent banner (not auto-dismiss) is correct because the status change directly affects the user's ongoing work: they need to know they're offline for as long as they are. Auto-dismissing would leave them unaware. The "Got it" action lets the user dismiss manually once they've acknowledged the state; removing it would trap them with no way to close the banner. Body is factual and reassuring — no urgency, no alarm.

**Common mistake this avoids:** Routing this to ux-error-messages as a Warning. Nothing has broken — the app is functioning in a degraded but handled state. System status changes that affect ongoing work belong here as Info, not in ERR as Warning or Error.

---
name: vgds-ux-error-messages
parent: vgds-ux-writing
metadata:
  version: "2.0"
  package: "@volvo/vcdk-ai-kit"
  category: foundation
  repository: "VolvoGroup-Internal/volvo-group-design-system"
  branch: "main"
description: All error and failure states: validation, system, network, permission, authentication, not-found, conflict, and rate-limit errors.
---

## Scope

**Covers:**

- Inline validation errors (field-level)
- System errors (server-side failures, timeouts)
- Network errors (connectivity loss)
- Permission and authentication errors
- Not-found and conflict errors
- Rate-limit errors

**Does not cover:**

- Warnings before an action (→ ux-confirmations)
- Notification banners about system status (→ ux-notifications)

**Boundary note:**
If copy appears after something breaks, it belongs here — even if it appears inside a modal or banner.

**Permission prompt vs. permission error — both belong here, but they are not the same:**

- A **permission prompt** appears _before_ the user has granted or denied access. It asks for permission by leading with user benefit. It is not an error — nothing has gone wrong yet. Use the permission error type with a benefit-first structure.
- A **permission error** appears _after_ the user has denied access, or when the system detects missing permissions at the point of use. It explains what's blocked and how to resolve it.
- Do not route permission prompts to CFM (ux-confirmations). They are not warnings about a destructive action — they are access requests. The ERR permission type covers both states.

---

## Context checklist

Items marked (R) are required before writing. Items marked (O) improve quality but have a usable default.

| #   | Context item                       | Why it matters                                                                                                                                                                      | Default if not provided                                             |
| --- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| 1   | Error type (R)                     | Determines structure, recovery options, and tone                                                                                                                                    | —                                                                   |
| 2   | What the user was trying to do (R) | Frames the failure in user terms                                                                                                                                                    | —                                                                   |
| 3   | Available recovery actions (R)     | Required to write the action label                                                                                                                                                  | "Try again" fallback                                                |
| 4   | Severity level (R)                 | Determines tone, component type, and copy approach — infer from the situation described; ask one clarifying question only if Caution and Warning are indistinguishable from context | Infer from request; see # Severity inference in ### Structure rules |

If required items are missing, ask for them as part of the master skill's context question.
Do not ask for required items separately from the master skill's shared question block.

---

## Rules and constraints

### Structure rules

- Identify the component type before writing — required elements differ per component
- Never produce output without first confirming which component type applies
- Body copy must state what happened in user terms, not system terms
- Body copy must always be a complete sentence — never a fragment
- Actions must use specific labels — never "OK", "Yes", or "Close" when a more descriptive label is possible
- One primary action maximum; one secondary or dismiss action maximum
- Auto-dismiss toasts must not carry required actions; use a banner or modal instead

**System error body pattern — when cause is undiagnosable:**
When a system error has no diagnosable cause to give the user, do not invent an explanation. Use this pattern:

- Body: `"We couldn't [verb] [object] right now. [Recovery step]."`
- Example: `"We couldn't export your report right now. Try again."`
- Always include the next possible action in the body — the action button reinforces it, it does not replace it.
- Never use phrases like "An issue on our end…", "Something on our end…", or "An unexpected error occurred…" — these are circumlocutions that imply an explanation without providing one. They fail voice and terminology QA.

**2-state retry rule — system and network errors with retry actions:**
When a system or network error offers a retry action, always produce both states. Each state has a distinct body and action. Never show the same message across states.

| State              | Trigger                                        | Body                                                                                                                                               | Action                                |
| ------------------ | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| **1 — Initial**    | Error appears; user has failed 0–1 times       | Describe the issue and tell the user what to do next. Do not mention Contact Support. Example: "We couldn't [verb] [object] right now. Try again." | "Try again" only                      |
| **2 — Escalation** | User has failed twice (2 unsuccessful retries) | Apologetic tone. Use: "Unfortunately, we still can't [verb] [object]. Please contact Support for help."                                            | "Contact Support" only — remove retry |

**2-state retry constraints:**

- "Contact Support" must never appear as an action in State 1 — it is reserved for State 2 only
- "Contact Support" must never appear in body copy in State 1 — do not suggest escalation before the user has exhausted retries
- State 1 covers the first and second display of the error — the action remains "Try again" on both
- State 2 triggers on the third display (after 2 failed retries)
- State 2 body opens with "Unfortunately" — permitted when a system failure has persisted
- State 2 body uses "Please" before "contact Support" — permitted when requiring significant extra effort from the user after repeated failure
- If the product cannot technically detect retry count, note this as a constraint in the output; provide both states and flag to the team that retry tracking is required to implement them correctly

# Severity inference

Identify severity before writing. Infer from the situation described in the request using the signal table below. Do not ask the user to name the severity level.
Ask one clarifying question only when Caution and Warning cannot be distinguished from context.

# Inference signal table:

| Signal in request                                                           | Inferred severity       |
| --------------------------------------------------------------------------- | ----------------------- |
| Issue is actively happening or affecting the user                           | Error                   |
| Physical harm, life-threatening risk, or irreversible data loss is imminent | Error (critical/danger) |
| User is about to take a destructive or irreversible action                  | Warning                 |
| A system resource is depleted or a required action is overdue               | Warning                 |
| A potential future issue exists but has not occurred yet                    | Caution                 |
| A feature is in a beta, unstable, or time-limited state                     | Caution                 |
| Ambiguous — could be either Caution or Warning                              | Ask one question        |

# Clarifying question (use only when Caution and Warning are indistinguishable):

- "Is this alerting the user to a problem that's already affecting them, or warning
- them about something that could become a problem if no action is taken?"

# Severity constraints on component types:

| Severity | Permitted components                           | Prohibited components   |
| -------- | ---------------------------------------------- | ----------------------- |
| Caution  | Banner, Inline message                         | Modal, Toast            |
| Warning  | Modal, Banner                                  | Toast, Field validation |
| Error    | Modal, Banner, Toast, Inline, Field validation | —                       |

# Caution sparing-use rule (hard constraint):

- Caution messages must only be used when the product's messaging architecture requires multiple degrees of alert severity.
- Do not introduce Caution copy unless the product already uses — or is explicitly designed to support — Warning and Error as distinct levels.
- If in doubt, route to Warning. A Warning written carefully is always preferable to a Caution applied incorrectly.

# Component types and their structures:

| Component        | Title    | Body     | Action   | Dismissable |
| ---------------- | -------- | -------- | -------- | ----------- |
| Modal / Dialog   | Required | Required | Required | Optional    |
| Banner           | Required | Optional | Required | Yes         |
| Snackbar         | ❌       | Required | Optional | Yes (auto)  |
| Inline message   | ❌       | Required | Optional | No          |
| Field validation | ❌       | Required | ❌       | No          |

Modal / Dialog:

- Title states what failed; body explains why and what to do — both are required; the action must align with the title
- Title and body together must answer: what happened, why, and what to do next
- Must always include at least one action

Banner:

- Title states what failed or what the user needs to know
- Body is optional — omit only if title + action are fully self-explanatory
- Must always include an action; a banner with no action is a dead end

Snackbar:

- No title — body carries the full message
- Body must be self-contained; cannot reference anything not visible in the message itself
- Do not use snackbars for errors requiring careful user decisions

Inline message:

- No title — body carries the full message
- Body must be specific to the element it accompanies
- Action must resolve the error directly if included — do not navigate away

Field validation:

- No title, no action — the corrected input is the implicit recovery
- Body names the field issue and the fix in one sentence
- Appears below the relevant field only; never use field validation copy in a modal or banner

# Character limits by component:

| Component        | Title    | Body      | Action label |
| ---------------- | -------- | --------- | ------------ |
| Modal / Dialog   | 60 chars | 150 chars | 20 chars     |
| Banner           | 60 chars | 150 chars | 20 chars     |
| Snackbar         | —        | 90 chars  | 20 chars     |
| Inline message   | —        | 120 chars | 20 chars     |
| Field validation | —        | 80 chars  | —            |

### Tone rules

- Tone is determined by severity level — apply the correct register before writing
- Never use a flat tone across all severity levels; Caution and Error must read differently
- Never blame the user at any severity level ("You entered…" → "Check your…")
- Never use exclamation points at any severity level
- Never trivialize ("Oops!", "Whoops!") — these are removed without replacement
- Only apologize ("Sorry,..") when the issue is caused by a system failure
- Only say "Please.." when requiring additional effort from the user - ex. submitting more data than normally needed, restarting a form from scratch, waiting longer than usual for a process or request

# Tone by severity level:

| Caution | Calm, direct, helpful — alert without alarming; suggest the preventive action |
| Warning | Calm, sympathetic, helpful — acknowledge the friction; make the safe path clear |
| Error | Reassuring, helpful, firm — acknowledge the failure; focus immediately on recovery |

# Tone boundaries:

- Caution must never read as urgent — urgency signals Warning or Error
- Warning must never read as catastrophic — save firm tone for Error
- Error (critical/danger) may be firmer than standard Error, but must never cause panic; physical harm contexts require calm clarity above all else

### Forbidden patterns

| Pattern                                                                       | Why forbidden                                                                                                           | Use instead                                                                                                 | Component scope                    |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| Title in a snackbar, inline message, or field validation                      | These components have no title element                                                                                  | Use body copy only — make it self-contained                                                                 | Snackbar, Inline, Field validation |
| Body-only in a modal or dialog                                                | Modals and dialogs require both title and body                                                                          | Add a title that states what failed                                                                         | Modal, Dialog                      |
| "Error 500" / "404" alone                                                     | Technical, meaningless to the user                                                                                      | Describe what happened in plain language                                                                    | All                                |
| "Something went wrong" alone                                                  | No guidance, no context                                                                                                 | "[Action] failed" for titles; "We couldn't [verb] [object] right now." for body                             | All                                |
| "Something went wrong" as title or primary message                            | Vague; forces user to read on to understand the failure                                                                 | "[Action] failed" — always specific, always names what the user was trying to do                            | All                                |
| "Something went wrong on our end" in any position                             | Still vague — acceptable form was removed; any variant of this phrase is now forbidden                                  | "[Action] failed" for titles. Body: "We couldn't [verb] [object] right now." — do not invent an explanation | All                                |
| "An issue on our end…" / "Something on our end…" as body copy                 | Circumlocution — a longer rewrite of "something went wrong on our end" with no added clarity                            | "We couldn't [verb] [object] right now." — concise, honest, implies temporary without overstating           | All                                |
| "Invalid input"                                                               | Doesn't say what is invalid or how to fix it                                                                            | Name the field and the required fix                                                                         | All                                |
| "Oops!" / "Whoops!"                                                           | Trivializes the user's problem                                                                                          | Remove entirely; start with what happened                                                                   | All                                |
| "Please try again later" alone                                                | No context, no confidence                                                                                               | Add what happened and when to retry                                                                         | All                                |
| "You failed to…" / "You entered an incorrect…"                                | Blames the user                                                                                                         | "Check your…" or name the fix directly                                                                      | All                                |
| Required action in an auto-dismiss toast                                      | User may not see it before it disappears                                                                                | Use a banner, modal, or dialog for required actions                                                         | Snackbar                           |
| Action label "OK" or "Dimiss" for a fixable error                             | Misses the opportunity to guide the user                                                                                | Use a specific label: "Try again", "Edit email", etc.                                                       | All                                |
| Two competing primary actions                                                 | Decision paralysis                                                                                                      | One primary action maximum                                                                                  | All                                |
| Two similar actions in the same message - "No / Cancel", "Cancel / Nevermind" | Confusing, prone to user error                                                                                          | Distinct actions which clearly explain the outcome                                                          | All                                |
| "Contact Support" as the first or only option                                 | Burdens Support; more effort for the user                                                                               | Offer self-service recovery first; escalate only if it fails                                                | All                                |
| "Contact Support" in body copy of State 1 of a retryable error                | Suggests escalation before the user has had a chance to retry — undermines confidence and burdens Support unnecessarily | Reserve Contact Support for State 2 action only; keep State 1 body focused on what failed                   | All                                |
| Field validation copy used in a modal or banner                               | Field validation lacks context for higher-level components                                                              | Write component-appropriate copy for modals and banners                                                     | Modal, Dialog, Banner              |
| Caution-level tone for a Warning or Error                                     | Understates the severity; user may not act                                                                              | Match tone to the confirmed severity level                                                                  | All                                |
| Error-level tone for a Caution message                                        | Creates unnecessary alarm for a non-critical state                                                                      | Use calm, direct tone for Caution                                                                           | All                                |
| Caution component (banner/inline) for an Error                                | Low-visibility component for a blocking issue                                                                           | Use modal or prominent banner for Error                                                                     | All                                |
| Caution used without a multi-level alert architecture                         | Adds a level that has no peer levels to distinguish it from                                                             | Default to Warning; use Caution only when architecture supports it                                          | All                                |
| "Danger" or "Critical" label applied to non-life-threatening content          | Overstates severity; erodes trust in critical alerts                                                                    | Reserve critical/danger for physical harm or life-threatening risk only                                     | All                                |

### Required elements

Required elements are defined per component type.
"Conditional" means required unless other elements make it redundant.

| Element | Required? | Max length | Notes |
| ------- | --------- | ---------- | ----- |

Modal / dialog:
| Title | Always | 60 chars | States what failed — does not repeat the body |
| Body | Always | 150 chars | Explains why and what to do next |
| Primary action | Always | 20 chars | Specific verb + object |
| Secondary action | Optional | 20 chars | Only if a safe exit exists alongside the primary action |

Banner:
| Title | Always | 60 chars | States what failed or what the user needs to know |
| Body | Conditional | 150 chars | Omit only if title + action are fully self-explanatory |
| Action | Always | 20 chars | A banner with no action is a dead end |

Snackbar:
| Body | Always | 90 chars | Self-contained — cannot reference content outside the message |
| Action | Conditional | 20 chars | Only if time-sensitive and requires no careful consideration |

Inline message:
| Body | Always | 120 chars | Specific to the element it accompanies |
| Action | Conditional | 20 chars | Only if it resolves the error directly; omit if navigation away is required |

Field validation:
| Body | Always | 80 chars | Names the issue and the fix in one sentence; corrected input is the implicit recovery |

---

## Templates

### Error message

```yaml
error:
  severity: "<caution | warning | error | error-critical>"
  severity_inference: "<signal from request that determined this level — one phrase>"
  component: "<modal | banner | toast | inline | field-validation>"
  title: "<what went wrong or what the user needs to know — max 60 chars,
    omit for toast, inline, and field-validation>"
  body: "<situation and next step — max 150 chars>"
  action:
    label: "<button text — max 20 chars>"
    type: "<retry | dismiss | navigate | contact | fix-input>"
```

### Permission prompt (pre-access request)

Use this template when the user has not yet granted or denied a permission. Nothing has gone wrong — this is a request, not an error. Structure differs from a standard error message.

```yaml
permission_prompt:
  type: "prompt" # Use "error" when permission has already been denied
  component: "modal"
  title: "<user benefit — what they gain by allowing this — max 60 chars>"
  body: "<how this permission enables that benefit — max 150 chars>"
  action:
    primary:
      label: "<Allow [resource]> — max 20 chars"
      type: "grant"
    secondary:
      label: "<Not now> — max 20 chars"
      type: "dismiss"
```

**Key differences from a standard error:**

- Title leads with user benefit, not what failed
- No blame, urgency, or consequence framing
- Secondary action must be "Not now" or equivalent — never "Deny" or "Block" (those are the OS's labels, not yours)
- If permission is denied and the user tries to access the feature again, switch to the standard error template with type: "permission"

---

## Rubric

Run before returning output. If any Fail condition is true, revise first.

**Pass if all are true:**

- [ ] Severity level is identified and declared in the output
- [ ] Severity was inferred from situational signals, not assumed or defaulted
- [ ] If Caution is used, a multi-level alert architecture was confirmed as present
- [ ] Component type is permitted for the identified severity level
- [ ] Title is present for modal and banner; absent for toast, inline, and field validation
- [ ] Title states what failed or what the user needs to know — not system terms
- [ ] Title is ≤60 characters
- [ ] Body is ≤150 characters and adds genuine context beyond the title
- [ ] Body includes the next possible action for the user
- [ ] Recovery action is specific, not generic ("Try again" only if no better option)
- [ ] Tone matches the identified severity level — not flat across all outputs
- [ ] No blame language ("you", "your mistake", "invalid")
- [ ] No technical terms (error codes, stack trace language)
- [ ] For permission prompts: title leads with user benefit, not with the permission request
- [ ] For permission prompts: secondary action is "Not now" or equivalent — not "Deny" or "Block"
- [ ] Passes all shared quality standards from master skill

**Fail if any are true:**

- [ ] Character limits exceeded
- [ ] Fails any shared constraint from SKILL.md
- [ ] Output uses a forbidden pattern listed above
- [ ] Required element is missing

---

## Examples

### Example 1 — Validation error

**Input:**

- Context: User submitted email field with invalid format
- Field: Email address

**Output:**

```yaml
error:
  title: "Check your email for any typos."
  body: null
  action:
    label: null
    type: null
```

**Why this works:** Short, clear, and helpful. Specific message for the element it refers to (email address field), tells the user what to do without blaming them.

---

### Example 2 — Network error

**Input:**

- Context: API call failed due to connectivity
- User action: Saving a document

**Output:**

```yaml
error:
  title: "Your changes weren't saved"
  body: "Check your connection and then try to save again."
  action:
    label: "Retry saving"
    type: "retry"
```

**Common mistake this avoids:** Title focuses on the direct effect on the user, not the technical aspects of the issue. The action is clear continuation of the title.

Note: Retry option should disappear after 2 failed atempts. Error body and action should change to:
body: "Unfortunately the connection is still failing. Try again later."
action:
label: "Got it" or "OK"
type: "dismiss"

---

### Example 3 — Edge case: Error with no recovery action

**Input:**

- Error type: system
- Context: Account suspended by admin
- User action: Signing in

**Output:**

```yaml
error:
  title: "Your account is locked"
  body: "Contact your admin for more details about regaining access."
  action:
    label: "OK"
    type: "dismiss"
```

---

### Example 4 — Caution: beta feature state

**Input:**

- Surface: Fleet analytics dashboard — Volvo Group Fleet Portal
- Situation: A new predictive maintenance feature is available but in beta;
  data may be incomplete
- Request: Write the message

**Severity inference:**

- Signal: "beta, data may be incomplete" → potential future issue, unstable
  state → Caution
- Component constraint: Caution permits Banner or Inline only → Banner selected
  (section-level relevance)

**Output:**

```yaml
error:
  severity: "caution"
  severity_inference: "beta feature — data may be incomplete, no active failure"
  component: "banner"
  title: "Predictive maintenance is in beta"
  body: "Data may be incomplete while we finalize this feature. Check results
    against your existing service records."
  action:
    label: "See what's included"
    type: "navigate"
```

**Why this works:** The tone is calm and informational — it does not suggest urgency or alarm. The body names the specific risk ("data may be incomplete") and the practical workaround ("check against your service records"), which is the defining quality of Caution copy. A modal would overstate the severity; a snackbar would understate the persistence of the issue. Banner is the correct component.
Note: this example assumes the fleet portal uses a multi-level alert architecture — Caution would not be introduced as a standalone level.

---

### Example 5 — Warning: system resource depleted

**Input:**

- Surface: Vehicle detail view — Volvo Group Fleet Portal
- Situation: A vehicle's AdBlue level has dropped below the threshold required for continued legal operation; the vehicle will reduce performance automatically if not refilled
- Request: Write the warning message

**Severity inference:**

- Signal: "required action, system will automatically restrict vehicle" → required action overdue, consequences imminent but not yet active → Warning
- Component constraint: Warning permits Modal or Banner → Banner selected (non-blocking; vehicle is still operational)

**Output:**

```yaml
error:
  severity: "warning"
  severity_inference: "required action overdue — AdBlue below legal threshold,
    automatic restriction imminent"
  component: "banner"
  title: "AdBlue level critically low"
  body: "This vehicle will reduce speed automatically if AdBlue isn't
    refilled soon. Schedule a refill before the next trip."
  action:
    label: "Schedule refill"
    type: "navigate"
```

**Why this works:** The tone is calm and sympathetic — it names the consequence clearly ("will reduce speed automatically") without catastrophising. "Soon" and "before the next trip" create appropriate urgency without alarm. The action routes directly to resolution rather than dismissal, which is the right call for a Warning with a time-bound consequence. An Error tone here would be disproportionate — the vehicle is still operational and the issue is preventable.

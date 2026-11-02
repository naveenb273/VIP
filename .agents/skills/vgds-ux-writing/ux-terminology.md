# UX Terminology Reference

<!-- ============================================================
  CONNECTION TO SKILL ARCHITECTURE

  This is a reference file, not a skill file. It has no YAML
  frontmatter and is never auto-triggered. It is loaded on-demand
  by the master skill at Step 5 of the Output workflow — after
  drafting and sub-skill rubric validation, before delivery.

  Where this file is referenced in SKILL.md:
  ## Output workflow > Step 5 — Terminology QA

  How it is used:
  Claude reads this file once per request, scoped to terms actually
  present in the draft output. It does not scan for all possible
  violations — only what is in the current draft is checked.

  Check order (defined in the master skill):
  1. Approved terms       → canonical product-specific forms
  2. Forbidden terms      → hard blocklist, any surface
  3. UI pattern vocabulary → component names, state names, action verbs
  4. Voice vocabulary      → hedging language, opener patterns

  This file is NOT referenced inside individual sub-skill files.
  The QA step is owned entirely by the master skill. Sub-skills
  write freely; the master skill checks terminology after drafting.

  Updating this file:
  - All additions require a Do / Don't example before being added.
  - Forbidden terms must include a "Use instead" value — incomplete
    entries must not be enforced until the field is filled.
  - Terms without a definition should not be added.
  - Deprecated terms go to Archived terms — never delete.
============================================================ -->

---

## How to use this file

This file is the single source of truth for terminology decisions across all UX writing for Volvo Group. It is read as a QA gate, after copy is drafted and before it is returned to the user.

**Reading order during QA (Step 5 of Output workflow):**

1. Approved terms — check all product-specific names in the draft
2. Forbidden terms — confirm none appear anywhere in the output
3. UI pattern vocabulary — confirm component, state, and verb standards
4. Voice vocabulary — confirm no hedging patterns or disallowed openers

**Reading order when updating this file:**

1. Check Archived terms before adding a new entry — the term may exist already.
2. Add the new entry with all fields complete.
3. Log the change in the Changelog.

**What counts as a terminology correction:**
A correction is any change made to a term in the draft output to align it with a canonical form, remove a forbidden term, or apply a standard verb or opener. All corrections are reported to the user as a one-line note in the output footer: `Terminology adjusted: [old] → [canonical]`

---

## Approved terms

Canonical forms for product-specific names, features, and concepts. These override generic alternatives in all UX writing.
One entry per term. Fill in all fields. A model entry is provided at the end of this section.

### Term entry structure

```
### [Canonical term]

**Definition:** [One sentence: what this term refers to in this product]

**Use when:** [The situation or surface where this term applies]

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| [canonical form]      | ✅ Use         | —                                            |
| [common alternative]  | ❌ Avoid       | [Why — ex. "too informal for error states"] |
| [another variant]     | ⚠️ Conditional  | [When it is acceptable, if ever]             |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| [Related term] | [Routing condition — when this term is the right choice instead] |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| [this term] / [counterpart] | [The situation where both must appear together] | [ex "never use one without the other on the same surface"] |

**In context:**
- ✅ "[Example sentence using the canonical term correctly]"
- ❌ "[Example sentence using a forbidden variant]"

**Notes:** [Omit if no edge cases, platform exceptions, or legacy usage apply]
```

---

### About

**Definition:** A generic term used in nevigation to denote introductory content regarding a company, team, product, etc.

**Use when:** Describing pages, sections, or other types of content that presents information about the app, product, service, or company.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| About [object] | ✅ Use | - |
| About | ⚠️ Conditional | Use as top-level navigation item, when grouping more specific secondary-level content |

**Related terms:**

**In context:**

- ✅ "About Volvo"
- ✅ "About us"
- ❌ "About"

**Paired terms:**

**Notes:** Avoid using “About” without a term which describes the topic or scope, as it’s vague and doesn't help the user.

---

### Accept

**Definition:** Mandatory consent given by the user to terms, policies, or gating conditions required for a product, service, or feature to function.
**Use when:** The user must consent to proceed — the action is required, not optional. Common surfaces: cookie banners, terms of service, permission gates, feature activation with mandatory agreement.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Accept | ✅ Use | — |
| Confirm | ❌ Avoid | Confirm is for voluntary user choices, not mandatory consent — see Related terms |
| Allow | ❌ Avoid | Implies granting permission to the product; Accept implies consent given by the user |
| Approve | ❌ Avoid | Implies authority over a 3rd party's action, no personal consent. |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Confirm | Use when requesting the user’s explicit consent for a sensitive, impactful, or irreversible action | Pair with "cancel" |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Accept / Reject | The user must choose between consenting or refusing a mandatory requirement | Never use Accept / Decline or Accept / Deny — Reject is the canonical counterpart |

**In context:**

- ✅ "Accept and continue"
- ✅ "Accept cookies"
- ❌ "Confirm to continue" — mandatory gate; use Accept, not Confirm
- ❌ "Allow cookies" — user gives consent, not permission to the product

---

### Access

**Definition:** The right or ability to use a product, feature, or resource, determined by account type, subscription level, or assigned permissions.

**Use when:** Referring to the usage rights of a user within an app, product or service. This is usually conditioned by account types, payment requirements, or associated permissions (ex. paywalls, permission gates, upgrade prompts, error messages, and admin controls).

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Access | ✅ Use | - |
| Access right(s) / Access level(s) | ⚠️ Conditional | Use when communicating different access levels or restrictions to users (commonly used phrase) |
| Permission | ❌ Avoid | Refers to a specific granted capability, not overall usage rights — see Related terms |
| Privileges | ❌ Avoid | Implies elevated or special status; too formal for standard UI copy |
| Rights | ❌ Avoid | Legal connotation; not standard in product UI |
| Availability | ❌ Avoid | Refers to system or feature availability, not usage rights |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Permission(s) | When referring to the right to access a specific resource, feature, or action - ex. "Edit permissions" | - |

**In context:**

- ✅ "You don't have access to this feature. Upgrade your plan to continue."
- ✅ "Request access from your admin."
- ❌ "You don't have permission to view this page." — the gate is account-type or plan-based, not role-specific; use Access

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Request access / Grant access | Describing the user-to-admin flow for obtaining usage rights | Use "Request access" for the user action; "Grant access" for the admin action. Never swap or mix these. |

**Notes:** "Access" describes an entitlement state — whether a user does or doesn't have the right to use something. When the specific mechanism matters to the user (ex. role assignment vs. plan upgrade), pair "access" with a more specific term to give clear recovery guidance — ex. "You don't have access to this feature. Contact your admin to update your role."

---

### Accessibility

**Definition:** The degree to which a product, feature, or service can be used by people with a wide range of disabilities, including visual, auditory, motor, and cognitive differences.

**Use when:** Referring to the collective set of design, development, and content decisions that make a product usable for people with disabilities. Use in settings labels, feature documentation, onboarding, help content, and compliance references.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Accessibility | ✅ Use | Lowercase in body copy; capitalize only as a section or settings label — ex. "Accessibility settings" |
| A11y | ⚠️ Conditional | Acceptable in developer-facing or internal technical contexts only; never use in user-facing UI copy|
| Inclusive design | ❌ Avoid | Refers to a design methodology or process, not the product property itself — see Related terms |
| Universal design | ❌ Avoid | Architectural and academic term; not standard in product UI copy |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Inclusive design | Referring to the design methodology or process behind accessible outcomes; appropriate in design system docs, team guidelines, or brand content, not UI cop. |
| Assistive technology | Referring specifically to tools users bring to the product — screen readers, switch controls, magnifiers, not the product's own features |

**In context:**

- ✅ "Accessibility settings"
- ✅ "This product meets WCAG 2.1 AA accessibility standards."
- ❌ "Inclusive design options" — too broad and process-oriented; use Accessibility for the product property
- ❌ "Enable a11y settings" — a11y is for developer-facing contexts only; use Accessibility in all user-facing copy

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Accessibility / Settings | Labeling the section of the product where users configure accessibility-related options; never "A11y settings" in user-facing copy | - |
| Accessibility / Features | Referring to specific accommodations the product provides — ex. in onboarding, help articles, or marketing: use "accessibility features" (lowercase) in body copy; use "Accessibility" alone as the label in navigation or settings | - |

**Notes:** Accessibility refers to the product property, what the product does. Assistive technology refers to what the user brings. Keep these separate in copy: a product supports is either compatible with assistive technology or it doesn't provide it. When referencing legal standards (WCAG, ADA, EN 301 549), use the standard's name precisely and pair it with plain-language explanation — ex. "Meets WCAG 2.1 AA standards" rather than "fully accessible" or "ADA-compliant."

---

### Account

**Definition:** The page or section that contains personal information and settings specific to a user, including identification details, access, security, app settings, and payment or subscription information.

**Use when:** Referring to the page or section that holds a user's personal information and product-level settings. Use in navigation labels, settings entry points, error messages, and any surface where the user manages their identity, access, security, or billing.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Account | ✅ Use | Capitalize as a navigation or section label — e.g. "Account settings"; lowercase in body copy — ex. "Manage your account" |
| My account | ❌ Avoid | Avoid using as navigation or section label; possessive adjective adds unnecessary complexity; use Account alone |
| Your account | ⚠️ Conditional | Acceptable in body copy when user-directed framing is needed — ex. "Your account has been updated"; avoid as a label |
| Profile | ❌ Avoid | Reserved for user-facing identity in the context of the app — see Related terms |
| User account | ❌ Avoid | Redundant in most UI contexts; Account alone is sufficient |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Profile | Referring to the page, section, or data representing a user in the context of the app — ex. how they appear to other users, their avatar, bio, or activity; not their private settings or billing information |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Account / Settings | Referring to the configuration options within a user's account — ex. "Account settings" | "Account settings" is the standard compound label; "Settings" alone is acceptable when context clearly scopes to the individual user |

**In context:**

- ✅ "Account settings"
- ✅ "Manage your account"
- ✅ "Your account has been upgraded."
- ❌ "My account" — possessive adds unnecessary complexity; use Account
- ❌ "Go to your profile to update your password." — password is a security setting, not profile data; use Account
- ❌ "User account settings" — redundant; use Account settings

**Notes:** Account and Profile are frequently confused because both relate to the user. The distinction is scope and audience: Account holds private, functional data (credentials, billing, security, settings) the user manages for themselves. Profile holds the user's identity as it appears within the app — to themselves and often to others. A user updates their Account to change their password; they update their Profile to change their display name or avatar. Keep this boundary consistent across navigation labels, settings copy, and error messages. <!-- inferred -->

---

### Add

**Definition:** The act of including an existing item into a pre-existing list, collection, or product area. Different from "create", which generates something new.
**Use when:** Describing the act of including or expanding pre-existing items in a list or product area — ex. "Add to cart", "Add to favorites", "Add a team member."

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Add | ✅ Use | Always pair with an object in button labels — "Add [item]" or "Add to [location]"; never "Add" alone when the target is ambiguous |
| Insert | ❌ Avoid | Implies a specific position in a sequence; appropriate in technical, design, or data-entry contexts, not standard UI actions |
| Include | ❌ Avoid | Passive and non-imperative; not suitable for button labels or action copy |
| Append | ❌ Avoid | Technical term implying end-of-list placement; avoid in all user-facing copy |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Create | The action generates a new item that does not yet exist (ex. "Create list", "Create request) rather than including an existing item into a pre-existing context | - |
| Upload | The item being added originates outside the product — e.g. a file, image, or document the user is bringing in from their device or another source | - |
| Import | Adding items from an external source or format, typically in bulk — ex. "Import contacts", "Import from CSV" | - |

**In context:**

- ✅ "Add to cart"
- ✅ "Add to favorites"
  ✅ "Add to contacts"
- ❌ "Insert to cart" — Insert implies positional placement; use "Add"
- ❌ "Include in favorites" — passive construction; not suitable for a button label; use "Add"

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Add / Remove | Describing the inclusion/exclusion of items in a list, collection, or product area | Use "Remove" as the primariy pair term, unless the exclusion is destructive - see "Add / Delete" |
| Add / Delete | Describing the inclusion and the permanent, destructive exclusion of items |

**Notes:** "Add" describes moving or referencing an item that already exists into a new context. If the item does not yet exist, use "Create". If the item originates outside the product, use "Upload" or "Import" depending on whether the action is singular or bulk. In button labels, "Add" should always be paired with its object — "Add [item]" or "Add to [location]" — to avoid ambiguity, especially on surfaces with multiple addable item types.

---

### Alert

**Definition:** A notification that informs the user that something relevant has happened or is about to happen, and may invite a reaction or acknowledgement without blocking further action.

**Use when:** Referring to notifications that inform the user that something relevant, but non-critical, has happened or will happen. Alerts may require a reaction or acknowledgement, but do not restrict the user's next action. Use the singular "Alert" for individual instances; use the plural "Alerts" for collections, settings sections, or the feature itself.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Alert | ✅ Use | Singular, for individual instances and as a message label
| Alerts | ✅ Use | Plural, for collections, settings sections, or the feature — ex. "Alerts settings", "View all alerts"

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Warning | The message notifies the user of a critical issue or event that actively impacts their experience in the app — typically requiring action and carrying higher urgency than an alert
| Error | The message informs the user of an issue that directly affects their ability to use the app — typically blocking or degrading their experience
| Notification | Referring to the broader category of system-generated messages a user receives, including but not limited to alerts — appropriate in settings labels or feature-level copy where the scope is wider than non-critical events|

**In context:**

- ✅ "You have 3 new alerts"
  ✅ "Alert: your subscription renews in 3 days."
  ✅ "Add to contacts"
- ❌ "Insert to cart" — Insert implies positional placement; use "Add"
- ❌ "Notification: Your file was shared."

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Add / Remove | Describing the inclusion or exclusion of items in a list, collection, or product area | Always use "Remove" as the counterpart — never Delete, Remove, or Remove, unless the action is permanent and destructive, in which case use "Delete" |

**Notes:** "Add" describes moving or referencing an item that already exists into a new context. If the item does not yet exist, use "Create". If the item originates outside the product, use "Upload" or "Import" depending on whether the action is singular or bulk. In button labels, "Add" should always be paired with its object — "Add [item]" or "Add to [location]" — to avoid ambiguity, especially on surfaces with multiple addable item types.

---

### Active

**Definition:** The state of an item that is currently operational, enabled, or in use. Applies to accounts, orders, vehicles, systems, and similar items.

**Use when:** Describing an item that is operational at the present time. Use as a status label, filter option, or state indicator across any product surface where items can be turned on or off, enabled or disabled, or started, paused, and stopped.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Active | ✅ Use | Capitalize as a status label — ex. "Active"; lowercase in body copy — ex. "Your subscription is active" |
| Enabled | ⚠️ Conditional | Acceptable when referring specifically to a feature or toggle that has been switched on — not for accounts, orders, or entities with a broader operational state |
| On | ⚠️ Conditional | Acceptable for binary toggle controls only — ex. "Notifications: On"; too reductive for entity or account states |
| Running | ❌ Avoid | Too process-specific; implies a task or job in progress, not a general operational state |
| Live | ❌ Avoid | Carries publishing or broadcast connotations; not appropriate for accounts, vehicles, or system states |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Enabled | Referring specifically to a feature, setting, or toggle that has been switched on — not an account, order, or broader entity | Ex. "Two-factor authentication is enabled" |
| Online | Referring to connectivity or real-time availability — ex. a device or user that is reachable on a network — rather than an operational state | Not a synonym for Active |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Active / Inactive | Describing the current operational state of an item that can be turned on or off | Always use Inactive as the counterpart — never Disabled, Off, or Paused unless those states are technically distinct from Inactive in your product |

**In context:**

- ✅ "Active subscriptions"
- ✅ "This account is active."
- ✅ "3 active vehicles"
- ❌ "Live subscriptions" — Live implies a broadcast or publishing state; use Active
- ❌ "Running orders" — Running implies a process in progress, not an operational state; use Active
- ❌ "Enabled account" — Enabled is for features and toggles, not accounts; use Active

---

### Allow

**Definition:** A user action that grants optional permission for a feature or service to access a resource or perform an action on their behalf.

**Use when:** Requesting the user's optional permission for a feature or service — ex. "Allow camera access", "Allow notifications." Use on permission request dialogs, feature opt-ins, and any surface where the user is granting access voluntarily and can decline without losing core functionality.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Allow | ✅ Use | — |
| Confirm | ❌ Avoid | For voluntary user choices that finalize an action — not for granting permission to a feature or service |
| Accept | ❌ Avoid | For mandatory consent to terms, policies, or gating conditions — not for optional permission grants |
| Approve | ❌ Avoid | Implies authority over a third party's action — not personal permission granted to a feature or service |
| Grant | ⚠️ Conditional | Acceptable in admin or developer-facing contexts — ex. "Grant access"; too formal for standard user-facing permission prompts |
| Enable | ⚠️ Conditional | Acceptable when turning on a feature or setting — not when granting access to a resource like camera, location, or microphone |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Accept | The user must consent to a mandatory requirement — ex. terms of service, a cookie policy, or a gating condition — rather than granting optional permission | Not interchangeable with Allow — Accept implies the user must agree to proceed |
| Confirm | The user is voluntarily confirming their own choice — especially for sensitive or irreversible actions | Not for permission grants — ex. use Confirm for "Confirm deletion", not "Confirm camera access" |
| Enable | The user is turning on a feature or toggle within the product — not granting access to a device resource or external service | Ex. "Enable dark mode", not "Enable camera access" |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Allow / Reject | Presenting the user with a choice to grant or decline optional permission | Always use Reject as the counterpart — never Deny, Block, or Decline |

**In context:**

- ✅ "Allow camera access"
- ✅ "Allow notifications"
- ✅ "Allow location access to find nearby services"
- ❌ "Accept camera access" — user is granting optional permission, not consenting to a mandatory requirement; use Allow
- ❌ "Confirm location access" — Confirm is for voluntary user choices, not permission grants; use Allow
- ❌ "Approve microphone access" — Approve implies authority over a third party; use Allow <!-- inferred -->

---

### Archive

**Definition:** As a noun: a storage location for items that have expired, are no longer active, or are no longer relevant to the user's current work — but are retained for reference or record. As a verb: the action of moving an item from active view into that storage location.

**Use when:** Referring to the page or section that stores inactive items (noun), or describing the action of moving an item out of active view into long-term storage (verb). Use as a navigation label, section title, status label, or action label — ex. "Archive", "View archive", "Move to archive", "Archive this order."

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Archive | ✅ Use | As a noun: capitalize as a navigation or section label — ex. "Archive"; as a verb: lowercase in action labels and body copy — ex. "Archive this order"
| Archived | ✅ Use | Use as a status label or filter option — ex. "Archived orders", "Show archived" |
| Archiving | ⚠️ Conditional | Use for in-progress states only — ex. "Archiving…"; avoid as a label or section title |
| Storage | ❌ Avoid | Implies a technical container for files or data, not a contextual holding area for expired items |
| History | ❌ Avoid | Implies a chronological log of past events — not a deliberate collection of inactive or expired items — see Related terms |
| Trash | ❌ Avoid | Implies items are pending permanent deletion; archived items are retained, not removed — see Related terms |
| Hide | ❌ Avoid | Implies concealment rather than intentional long-term storage; does not convey retention or recoverability |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| History | Referring to a chronological log of past actions, events, or transactions — not a collection of inactive items the user has explicitly set aside | Ex. "Order history", "Activity history" — items in History are records, not candidates for restoration |
| Delete | The action removes an item with no intent to retain or restore it | Archive retains items for reference; Delete removes them — never use as synonyms |
| Trash | The product uses a two-step deletion model where items are held temporarily before permanent removal | Use Trash only if items in that state are pending deletion, not long-term retention |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Archive / Restore | Describing the action of moving an item into the archive (verb) and the reverse action of returning it to active use | Always use Restore as the counterpart — never Unarchive or Reactivate |

**In context:**

- ✅ "Archive" — noun, navigation or section label
- ✅ "Archived orders" — adjective, status label or filter
- ✅ "Archive this order" — verb, action label
- ✅ "Move to archive" — noun, destination in body copy
- ✅ "This order has been archived. Restore it to make changes." — past tense, confirmation message
- ❌ "Move to trash" — Trash implies pending deletion; use Archive when items are retained for reference
- ❌ "Hide order" — implies concealment, not intentional long-term storage; use Archive this order
- ❌ "Delete old orders" — when items are being retained, not removed; use Archive

**Notes:** Archive implies retention with intent — items are kept because they may be needed for reference, compliance, or potential restoration. If your product permanently removes archived items after a set period, make this explicit in context copy — ex. "Archived items are deleted after 12 months" — to avoid misleading users about retention.

---

### Authenticate

**Definition:** The act of confirming a user's identity through a second layer of security, typically during sign-in or before sensitive actions.

**Use when:** Requesting a second layer of security verification during sign-in or other sensitive user actions — ex. "Authenticate with Face ID", "Authenticate to continue." Use on MFA prompts, biometric gates, security checkpoints, and any surface where identity must be confirmed beyond the initial credential.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Authenticate | ✅ Use | — |
| Authenticating | ✅ Use | Use for in-progress states only — ex. "Authenticating…"; avoid as a label or section title |
| Verify | ❌ Avoid | Reserved for asking the user to double-check input or actions — not a synonym for identity confirmation — see Related terms |
| Confirm | ❌ Avoid | For voluntary user choices that finalize an action — not for identity or security confirmation |
| Validate | ❌ Avoid | Technical term associated with system-side input checking; not appropriate for user-facing security prompts |
| Authorize | ⚠️ Conditional | Acceptable in developer-facing or API contexts where access rights are being granted programmatically; too technical for standard user-facing security prompts |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Verify | Asking the user to double-check their own input or confirm an action they have taken — ex. "Verify your email address", "Verify your details" | Not for identity confirmation at a security checkpoint — Verify addresses content accuracy, not user identity |
| Sign in | The user is completing the primary credential step — entering a username and password — before any second-factor prompt | Authenticate refers to the additional security layer, not the initial sign-in action |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Authenticate / Cancel | Presenting the user with the option to complete or abandon a security prompt | Use Cancel as the counterpart — never Skip or Dismiss, as these imply the step is optional when it may be required |

**In context:**

- ✅ "Authenticate with Face ID"
- ✅ "Authenticate to continue"
- ✅ "Authenticating…" — in-progress state
- ❌ "Verify with Face ID" — Face ID is an identity confirmation step, not an input check; use Authenticate
- ❌ "Confirm your identity with Face ID" — Confirm is for voluntary user choices; use Authenticate for security gates
- ❌ "Authorize with Face ID" — Authorize is for programmatic access

---

### Authentication

**Definition:** The process of confirming a user's identity or authorizing a sensitive action through a second layer of security — ex. two-factor authentication (2FA), biometric authentication, or hardware key authentication.

**Use when:** Referring to the overall process, system, or method used to confirm identity beyond the initial credential. Use in settings labels, feature names, help content, and error messages — ex. "Authentication required", "Set up authentication", "Authentication method."

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Authentication | ✅ Use | Capitalize as a section or settings label — ex. "Authentication settings"; lowercase in body copy — ex. "Set up authentication"
| Two-factor authentication | ✅ Use | Use the full form on first mention; 2FA is acceptable as a shorthand after first mention or in space-constrained UI |
| 2FA | ⚠️ Conditional | Acceptable as a shorthand after the full form has been introduced, or in space-constrained UI; never use as the first or only mention |
| Multi-factor authentication | ⚠️ Conditional | Use when the product supports more than two factors; MFA is acceptable as shorthand after first mention |
| Verification | ❌ Avoid | Reserved for confirming the accuracy of user input or actions — not a synonym for identity confirmation through a security layer — see Related terms |
| Security check | ❌ Avoid | Vague; does not convey the specific identity-confirmation purpose of authentication |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Authenticate | Referring to the specific user action of completing an identity confirmation step — ex. "Authenticate with Face ID" | Authentication is the process or system; Authenticate is the action — see Authenticate entry |
| Verification | Referring to the process of confirming the accuracy of user-provided input or actions — ex. email verification, identity document verification | Not interchangeable with Authentication — Verification addresses content accuracy, not security-layer identity confirmation |
| Authorization | Referring to the process of determining what an authenticated user is permitted to do — a separate step that follows authentication | Authentication confirms who the user is; Authorization determines what they can access — never use as synonyms |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Authentication / Method | Referring to the specific mechanism used to complete authentication — ex. "Authentication method", "Choose an authentication method" | Always use Method as the compound counterpart — never "Authentication type" or "Authentication option" |
| Authentication / Code | Referring to the one-time code used to complete an authentication step — ex. "Authentication code", "Enter your authentication code" | Use Code — never "OTP", "passcode", or "token" in user-facing copy |
| Authentication / App | Referring to a third-party app used to generate authentication codes — ex. "Authentication app", "Set up an authentication app" | Use App — never "authenticator tool" or "2FA app" in standard user-facing copy |

**In context:**

- ✅ "Authentication settings"
- ✅ "Set up two-factor authentication to secure your account."
- ✅ "Choose an authentication method."
- ✅ "Enter your authentication code."
- ❌ "Set up verification" — when referring to a second security layer, not input checking; use Authentication
- ❌ "Security check required" — vague and imprecise; use Authentication required
- ❌ "Enter your OTP" — OTP is technical jargon; use Authentication code

**Notes:** Authentication and Authorization are frequently confused — both in product copy and in engineering contexts. In user-facing copy, keep the distinction clear: Authentication confirms identity ("Are you who you say you are?"); Authorization determines access ("What are you allowed to do?"). If your product exposes both concepts to users — ex. in an admin or developer-facing dashboard — ensure the two terms are never used interchangeably.

---

### Available

**Definition:** The state of an app, product, feature, or service that can be accessed or used at the present time; or the status of a user who is currently active and reachable within a product.

**Use when:** Describing something the user can currently access or use, or indicating that a user is currently active and open to interaction. Use as a status label, filter option, or state descriptor across surfaces where items, features, or services can be available or unavailable — ex. "Available now", "Available on all plans", "3 slots available" — or where users can set or display their presence status — ex. "Set status to Available", "Mark as Available."

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Available | ✅ Use | Capitalize as a status label — ex. "Available"; lowercase in body copy — ex. "This feature is available on all plans" |
| Now available | ✅ Use | Acceptable for announcements or release copy where timing is relevant — ex. "Now available on iOS"; not appropriate for user presence status |
| Accessible | ⚠️ Conditional | Acceptable when referring specifically to availability for users with disabilities — ex. "Accessible to screen readers"; do not use as a general synonym for Available |
| Enabled | ❌ Avoid | Refers to a feature or toggle that has been switched on — not whether something can be accessed at the present time — see Related terms |
| Active | ❌ Avoid | Describes an item that is currently operational — not whether it can be accessed by the user or whether a user is reachable — see Related terms |
| Online | ❌ Avoid | Describes connectivity state — not whether a user is reachable or open to interaction; the two may coincide but are not synonyms |
| Ready | ❌ Avoid | Implies a prior loading or preparation state has completed; not a general synonym for Available |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Active | Describing the operational state of an item — ex. an account, vehicle, or system that is currently running | Available describes whether something can be accessed or a user is reachable; Active describes whether something is currently in operation — see Active entry |
| Enabled | A specific feature or toggle has been switched on by the user or admin | Available describes what can be accessed; Enabled describes what has been turned on |
| Accessible | Referring specifically to availability for users with disabilities, or compatibility with assistive technology | Do not use Accessible as a general synonym for Available — see Accessibility entry |
| Online | Referring specifically to a user's or device's connectivity state — ex. "User is online" | Online indicates network presence; Available indicates willingness or readiness to interact — a user can be Online but set to Do not disturb |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Available / Unavailable | Describing whether a feature, service, or time slot can or cannot be accessed at the present time | Always use Unavailable as the counterpart — never "Not available", "Inactive", or "Disabled" unless those states are technically distinct in your product |
| Available / Busy | Describing a user's presence status — whether they are open to interaction or not | Use Busy as the primary counterpart for presence status — ex. "Available", "Busy", "Do not disturb"; never use Unavailable for user presence status |

**In context:**

- ✅ "Available now" — feature or service state
- ✅ "Available on all plans" — conditional access
- ✅ "3 slots available" — quantity state
- ✅ "This feature is not available on your current plan." — access restriction
- ✅ "Set your status to Available." — user presence
- ✅ "Maya is Available." — user presence label
- ❌ "This feature is enabled on all plans" — Available describes access, not activation state; use Available
- ❌ "Maya is online" — Online describes connectivity, not willingness to interact; use Available for presence status
- ❌ "Maya is active" — Active describes an operational state; use Available for user presence

**Notes:** Available covers two distinct use cases that share the same term. In feature or service contexts, it describes access — can the user use this right now? In presence contexts, it describes a user's self-declared status — are they open to interaction? Keep these uses visually and contextually distinct on surfaces where both appear. When availability is conditional — ex. restricted by plan, region, or device — always pair Available with the specific condition to avoid misleading users: ex. "Available on Pro plans", "Available on iOS only."

---

### Back

**Definition:** A navigation action that returns the user to the previous page or step in a flow.

**Use when:** Labeling a button or link that directs the user to the previous page or step. Prioritize pairing Back with a verb for clarity — ex. "Go back" — unless spacing is too limited for the compound form.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Go back | ✅ Use | Preferred form — use whenever spacing allows |
| Back | ✅ Use | Acceptable when spacing is too limited for the compound form — ex. a mobile header or a narrow step indicator |
| Back to [destination] | ✅ Use | Use when the destination is known and naming it adds clarity — ex. "Back to dashboard", "Back to results" |
| Return | ❌ Avoid | Implies the user is completing a round trip or reversing a transaction — not a neutral navigation action |
| Previous | ⚠️ Conditional | Acceptable in paginated or sequential contexts where Back could be ambiguous — ex. "Previous step", "Previous page"; not for general back navigation |
| Undo | ❌ Avoid | Reverses an action or change, not a navigation step — a distinct concept from Back |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Cancel | The user is abandoning a task or flow entirely — not navigating to the previous step | Cancel exits the flow; Back stays within it — never use as synonyms |
| Close | The user is dismissing a modal, panel, or overlay — not navigating within a linear flow | Close removes a layer from view; Back moves the user to a prior step in a sequence |
| Previous | The surface is paginated or step-based and Back could be ambiguous — ex. multi-step forms, onboarding flows, or carousels | Use Previous only when the sequential context makes it the clearer choice |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Back / Next | Navigating between steps in a multi-step flow — ex. onboarding, checkout, or form wizards | Use Next as the forward counterpart — never "Forward", "Continue", or "Proceed" unless those terms are already established in your product's navigation pattern |

**In context:**

- ✅ "Go back"
- ✅ "Back to dashboard"
- ✅ "Back" — space-constrained navigation, ex. mobile header
- ❌ "Return" — implies a round trip or transaction reversal; use Go back
- ❌ "Cancel" — when the user is only navigating to the previous step, not abandoning the flow; use Go back
- ❌ "Undo" — reverses an action, not a navigation step; use Go back

**Notes:** Back and Cancel are frequently confused in multi-step flows. Back keeps the user within the flow and preserves their progress to the previous step. Cancel exits the flow entirely and may discard unsaved input. Never use them interchangeably — if both actions are available on the same surface, both labels must be present and visually distinct.

---

### Buy

**Definition:** The action of acquiring a product, service, upgrade, or extension in exchange for payment.

**Use when:** Describing a transaction where the user pays to acquire something — ex. "Buy now", "Buy this plan", "Buy an extension." Use on purchase CTAs, pricing pages, checkout flows, and any surface where an item has an attached cost.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Buy | ✅ Use | — |
| Buy now | ✅ Use | Acceptable when urgency or immediacy is relevant to the purchase context — ex. on a pricing page or promotional surface |
| Purchase | ❌ Avoid | More formal and transactional; creates unnecessary distance from the user — Buy is shorter, more direct, and more conversational |
| Shop | ❌ Avoid | Implies browsing behavior, not a specific acquisition action |
| Acquire | ❌ Avoid | Formal and clinical; not appropriate for consumer-facing copy |
| Get | ❌ Avoid | Reserved for obtaining items or benefits that are free — see Related terms |
| Order | ⚠️ Conditional | Acceptable in commerce contexts where the transaction involves physical goods and fulfillment — ex. "Order now"; not for digital products, plans, or extensions |
| Subscribe | ⚠️ Conditional | Acceptable when the transaction is specifically a recurring subscription — ex. "Subscribe to Pro"; not a general synonym for Buy |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Get | The user is obtaining an item, feature, or benefit at no cost — ex. "Get started", "Get the free plan", "Get this extension" | Never use Get when a cost is involved — the distinction between Buy and Get is the primary signal to users that a transaction requires payment |
| Subscribe | The transaction is a recurring payment for ongoing access — ex. a monthly or annual plan | Use Subscribe when the recurring nature of the payment is relevant to communicate; use Buy for one-time purchases |
| Upgrade | The user is moving from a lower-tier plan to a higher one, typically with a cost attached | Use Upgrade when the transaction involves a plan change — not as a synonym for Buy on a first-time purchase |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Buy / Cancel | Presenting the user with the option to complete or abandon a purchase | Use Cancel as the counterpart — never "Back" or "Dismiss" on a final purchase confirmation step |

**In context:**

- ✅ "Buy now"
- ✅ "Buy this plan"
- ✅ "Buy an extension"
- ❌ "Purchase now" — too formal; use Buy
- ❌ "Get this plan" — Get signals no cost; if a cost is attached, use Buy
- ❌ "Shop upgrades" — Shop implies browsing, not a specific acquisition action; use Buy
- ❌ "Acquire a license" — clinical and impersonal; use Buy a license

**Notes:** The Buy / Get distinction is the primary copy signal that tells users whether a transaction involves payment. Using Get on a paid item — even unintentionally — can create false expectations and increase support requests or failed conversions. Always confirm which term applies before labeling any acquisition CTA.

---

### Cancel

**Definition:** The action of abandoning an ongoing flow or process, typically without saving current progress, and returning the user to their current or previously visited page.

**Use when:** Labeling the action that exits an ongoing flow or process entirely — ex. "Cancel", "Cancel order", "Cancel subscription." Use on dialogs, forms, multi-step flows, and any surface where the user can choose to abandon what they are doing without completing it.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Cancel | ✅ Use | — |
| Cancel [object] | ✅ Use | Use when the target of the cancellation needs clarification — ex. "Cancel order", "Cancel subscription", "Cancel upload" |
| Exit | ❌ Avoid | Implies leaving a context or application entirely — not abandoning a specific flow or process |
| Reject | ❌ Avoid | Implies refusing a request or mandatory requirement — not abandoning a user-initiated flow |
| Go back | ❌ Avoid | Returns the user to the previous step within the flow — does not exit it — see Related terms |
| Close | ⚠️ Conditional | Acceptable for dismissing a modal, panel, or overlay when no flow or process is being abandoned; not a synonym for Cancel when progress would be lost |
| Discard | ⚠️ Conditional | Acceptable when the emphasis is specifically on discarding unsaved changes rather than exiting a flow — ex. "Discard changes"; not a general synonym for Cancel |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Go back | The user is returning to the previous step in a flow without exiting it — progress is preserved | Go back stays within the flow; Cancel exits it entirely — never use as synonyms |
| Close | The user is dismissing a modal, panel, or overlay that does not involve an active flow or unsaved progress | If dismissing would abandon a flow or discard unsaved input, use Cancel — not Close |
| Discard | The emphasis is specifically on abandoning unsaved changes to an item — ex. "Discard changes to this document" | Use Discard when the loss of specific content is the primary consequence; use Cancel when exiting a flow is the primary action |
| Undo | The user is reversing a completed action — not abandoning an in-progress flow | Undo operates on something already done; Cancel operates on something in progress |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Cancel / Confirm | Presenting the user with the option to abandon or complete a flow or action | Always use Confirm as the primary counterpart on confirmation dialogs — never "OK", "Yes", or "Proceed" |
| Cancel / Save | Presenting the user with the option to abandon or save progress in an editing flow | Use Save as the counterpart when the primary action is saving content — Cancel discards unsaved changes and exits |

**In context:**

- ✅ "Cancel"
- ✅ "Cancel order"
- ✅ "Cancel subscription"
- ✅ "Cancel upload"
- ❌ "Exit" — implies leaving the application entirely, not abandoning a specific flow; use Cancel
- ❌ "Reject" — implies refusing a mandatory requirement; use Cancel for abandoning a user-initiated flow
- ❌ "Go back" — returns the user to the previous step without exiting the flow; use Cancel when the flow is being abandoned entirely
- ❌ "Close" — when an active flow or unsaved progress is involved; use Cancel

**Notes:** Cancel and Go back are the most commonly confused pair in multi-step flows. Cancel exits the flow entirely and typically discards unsaved progress. Go back navigates to the previous step and preserves it. When both actions are available on the same surface — ex. a multi-step form — both labels must be present and visually distinct. If canceling would result in data loss, always warn the user before completing the action — ex. "Cancel? Your progress won't be saved."

---

### Car

**Definition:** A small, four-wheeled vehicle intended primarily for private passenger transportation.

**Use when:** Referring to privately used, small four-wheel vehicles in user-facing copy — ex. "Add your car", "Car details", "Your car's service history." Use consistently across all surfaces where this vehicle type is the subject, regardless of brand, model, or powertrain.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Car | ✅ Use | — |
| Cars | ✅ Use | Use for plural references — ex. "Your cars", "Registered cars" |
| Vehicle | ❌ Avoid | Broader term covering all vehicle types — not specific to small private four-wheel transport — see Related terms |
| Automobile | ❌ Avoid | Formal and dated; not appropriate for conversational UI copy |
| Machine | ❌ Avoid | Informal and imprecise; does not identify the vehicle type |
| Auto | ❌ Avoid | Informal shorthand; ambiguous in international contexts |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Vehicle | Referring to a broader category that includes multiple types — ex. trucks, vans, buses, or a mixed fleet — where Car would be too narrow | Vehicle is the appropriate umbrella term when the copy must cover more than small private four-wheel transport — never use as a direct synonym for Car |
| Truck | Referring specifically to larger commercial or heavy-duty vehicles — ex. in a fleet or logistics context | Use Truck when the vehicle type is explicitly commercial or load-bearing — not interchangeable with Car |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Car / Driver | Referring to the vehicle and the person operating it as a pair — ex. in assignment, booking, or fleet management contexts | Always use Driver as the counterpart — never "User" or "Operator" when referring to the person behind the wheel in a private transport context |

**In context:**

- ✅ "Add your car"
- ✅ "Car details"
- ✅ "Your car's service history"
- ✅ "No cars added yet."
- ❌ "Add your vehicle" — Vehicle is too broad when the product specifically handles private small four-wheel transport; use Car
- ❌ "Automobile details" — formal and dated; use Car details
- ❌ "Machine settings" — imprecise and informal; use Car settings

**Notes:** Car is specifically scoped to small, privately used four-wheel vehicles. If your product also handles vans, trucks, or mixed commercial fleets on the same surface, use Vehicle as the umbrella term at the category level and Car, Truck, or Van at the type level. Never substitute Vehicle for Car when the product context is exclusively private passenger transport — the broader term introduces unnecessary ambiguity.

---

### Caution

**Definition:** A message that calmly alerts the user to a potential upcoming issue — caused by the system or by the user's actions — and suggests ways to avoid it before it occurs.

**Use when:** Referring to a preventive message that surfaces a potential issue the user can still avoid — ex. "Caution: This is a beta feature", "Caution: Vehicle maintenance due soon." Use sparingly and only when the product's messaging architecture requires multiple degrees of severity between informational and warning. Caution is less severe than Warning and sits below it in the system message hierarchy — see Related terms. Do not use Caution as a general substitute for Warning or Alert.

**Tone of voice:** Calm, direct, helpful. State the potential issue clearly and suggest a way to avoid it. Do not alarm — the issue has not occurred yet — see Error entry for the full system message hierarchy.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Caution | ✅ Use | Capitalize as a message label — ex. "Caution"; lowercase in body copy — ex. "A caution message appeared about your maintenance schedule" |
| [Type] caution | ✅ Use | Use when specifying the subject adds clarity — ex. "Maintenance caution", "Beta feature caution" |
| Warning | ❌ Avoid | Reserved for critical issues or events that restrict or gate the user experience — Caution is preventive and forward-looking; Warning is present and action-requiring — see Warning entry |
| Alert | ❌ Avoid | Reserved for non-critical, informational notifications about events that have already occurred or are currently active — not for potential upcoming issues — see Alert entry |
| Notice | ❌ Avoid | Implies passive, informational content without a preventive purpose — does not convey the actionable, issue-avoidance intent of a Caution message |
| Advisory | ⚠️ Conditional | Acceptable in formal or enterprise-facing contexts — ex. security or compliance documentation; too formal for standard in-product messaging |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Warning | Notifying the user of a critical, present issue that creates friction or requires action — ex. "Fuel level is low", "Your inbox is full" | Warning is present and action-requiring; Caution is preventive and avoidable — Caution sits below Warning in the system message hierarchy — see Warning entry |
| Alert | Informing the user about a relevant but non-critical event — not a potential upcoming issue | Alert is informational; Caution is preventive — both are lower in severity than Warning but serve different purposes — see Alert entry |
| Error | Communicating an active or escalating issue already affecting the user's experience | Error is reactive; Caution is preventive — the two occupy opposite ends of the severity spectrum — see Error entry for the full six-level hierarchy |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Caution / [Suggested action] | Presenting the preventive message alongside a clear path to avoid the issue — ex. "Caution: Maintenance due soon. Schedule now." | Always pair a Caution message with a suggested action or resolution path — a Caution without guidance leaves the user with a problem but no solution |

**In context:**

- ✅ "Caution: This is a beta feature. Functionality may change."
- ✅ "Caution: Vehicle maintenance due in 5 days. Schedule now."
- ✅ "Caution: Limited storage remaining. Free up space to avoid disruption."
- ❌ "Warning: This is a beta feature" — Warning implies a critical, present issue; a beta label is a preventive notice; use Caution
- ❌ "Alert: Vehicle maintenance due soon" — Alert is for non-critical events already in progress, not upcoming preventive notices; use Caution
- ❌ "Notice: Vehicle maintenance due soon" — Notice implies passive information; use Caution when the user should take action to avoid an issue

**Notes:** Caution occupies the third tier of a six-level system message hierarchy — sitting above Info message and below Warning. It is specifically for potential upcoming issues that the user can still avoid through action. Two conditions must both be true for Caution to apply: the issue has not yet occurred, and the user can take action to prevent it. If the issue is already occurring, use Warning or Error depending on severity. If no action is available, use Alert or Info message instead. Caution should be used sparingly — not every product surface requires it, and overuse dilutes the warning signal of the tiers above it. For the full six-level hierarchy, see the Error entry.

---

### Change

**Definition:** A simple, cost-free modification made by the user to their account or interface settings, without affecting the default state of an item.

**Use when:** Describing a straightforward, reversible modification that has no cost and does not alter the default state of an item — ex. "Change battery settings", "Change theme", "Change language." Use in settings, preferences, and account surfaces where the user is adjusting how something appears or behaves for themselves.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Change | ✅ Use | — |
| Change [object] | ✅ Use | Always pair with the object being changed for clarity — ex. "Change theme", "Change password", "Change language" |
| Edit | ❌ Avoid | Reserved for modifying the content of an item — ex. text, data, or a record — not for interface or account settings |
| Alter | ❌ Avoid | Formal and imprecise; not appropriate for user-facing copy |
| Modify | ❌ Avoid | Reserved for technical modifications — see Related terms |
| Adjust | ❌ Avoid | Reserved for technical modifications — see Related terms |
| Update | ❌ Avoid | Implies bringing something to a more current or improved state — not a neutral, cost-free setting modification |
| Review | ❌ Avoid | Implies reading or assessing content — not making a modification |
| Revise | ❌ Avoid | Implies correcting or improving something previously submitted — not a general interface modification |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Adjust or Modify | Making technical modifications to system-level or hardware settings — ex. "Adjust internal lighting", "Modify sensor sensitivity" | Use for technical parameters where precision matters — not for simple user preference changes |
| Activate or Deactivate | Making modifications that switch the default state of a feature or item on or off — ex. "Activate autopilot", "Deactivate automatic updates" | Use when the modification changes a default or system state — not for neutral preference changes |
| Upgrade or Downgrade | Making changes that involve a cost or a plan tier shift — ex. "Upgrade subscription", "Downgrade to free plan" | Use when the modification has a financial consequence — never use Change for paid modifications |
| Edit | Modifying the content of a specific item — ex. a document, profile field, or data record — rather than a setting or preference | Edit operates on content; Change operates on settings and preferences — see Edit entry |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Change / Reset | Presenting the user with the option to modify a setting or restore it to its default state | Use Reset as the counterpart when the reverse action restores a default — never "Undo" or "Revert" in settings contexts |

**In context:**

- ✅ "Change battery settings"
- ✅ "Change theme"
- ✅ "Change language"
- ✅ "Change password"
- ❌ "Modify theme" — Modify is for technical parameters; use Change for interface preferences
- ❌ "Adjust battery settings" — Adjust is for technical modifications; use Change for user-level settings
- ❌ "Update theme" — Update implies improvement or a newer state; use Change for neutral preference modifications
- ❌ "Edit language" — Edit is for content modifications, not setting changes; use Change
- ❌ "Upgrade theme" — Upgrade implies a cost; use Change for cost-free modifications

**Notes:** Change is specifically scoped to simple, cost-free, non-default-altering modifications. Three boundaries matter most in practice: Change vs. Edit (settings vs. content), Change vs. Activate/Deactivate (preference vs. default state), and Change vs. Upgrade/Downgrade (free vs. paid). When a modification crosses any of these boundaries, the more specific term always takes precedence over Change.

---

### Clear

**Definition:** The action of removing all content from a page, form, or data set in a single operation, without targeting specific items.

**Use when:** Describing the bulk removal of all content from a surface, input, or filter state — ex. "Clear data", "Clear all filters", "Clear search." Use when the action affects everything in a given context at once, rather than specific user-selected items.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Clear | ✅ Use | — |
| Clear all | ✅ Use | Use when emphasizing that all items in a set will be removed — ex. "Clear all filters", "Clear all notifications" |
| Clear [object] | ✅ Use | Use when specifying the target adds clarity — ex. "Clear data", "Clear search", "Clear history" |
| Reset | ✅ Use | Acceptable as a synonym in most scenarios — preferred when the action restores a surface to its default state rather than simply emptying it — ex. "Reset filters" |
| Remove | ❌ Avoid | Implies targeting and eliminating a specific item — not a bulk content removal — see Related terms |
| Delete | ❌ Avoid | Implies permanent removal of specific user-selected content or files — see Related terms |
| Deselect | ❌ Avoid | Implies unchecking or unselecting specific chosen items — not a bulk content removal |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Delete | Removing specific content or files explicitly selected by the user — ex. "Delete file", "Delete selected items" | Delete targets specific items; Clear removes all content from a context at once — never use as synonyms |
| Reset | Restoring a surface, form, or setting to its default state — which may or may not result in empty content | Reset implies a return to a known default; Clear implies emptying without necessarily restoring a prior state — use Reset when a default state exists, Clear when the result is simply empty |
| Remove | Eliminating a specific item from a list or collection — ex. "Remove from favorites", "Remove member" | Remove targets one item at a time; Clear operates on an entire context — never use as synonyms |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Clear / Apply | Presenting the user with the option to remove all filters or inputs and apply a new selection — ex. in a filter panel or search surface | Use Apply as the counterpart when the primary forward action is confirming a selection — Clear removes all; Apply confirms |
| Clear all / Select all | Presenting the user with the option to remove or include all items in a set | Use Select all as the counterpart when both bulk states — all selected and none selected — are available on the same surface |

**In context:**

- ✅ "Clear data"
- ✅ "Clear all filters"
- ✅ "Clear search"
- ✅ "Reset filters" — acceptable synonym when restoring a default filter state
- ❌ "Delete all filters" — Delete implies permanent removal of specific items; use Clear for bulk content removal
- ❌ "Remove all filters" — Remove targets specific items; use Clear for removing all content at once
- ❌ "Deselect all filters" — Deselect implies unchecking individual items; use Clear for a single bulk action

**Notes:** Clear and Reset are closely related and acceptable as synonyms in most scenarios, but carry a subtle distinction worth preserving where possible. Clear emphasizes emptying a surface — the result is blank. Reset emphasizes returning to a default — the result may or may not be blank. Ex. "Clear filters" removes all active filters, leaving the filter panel empty; "Reset filters" restores the filters to their default stat

---

### Close

**Definition:** The action of dismissing a notification, modal, or view, returning the user to the surface beneath it without abandoning a flow or process.

**Use when:** Labeling the action that removes a notification, modal, panel, or overlay from view — ex. "Close", "Close menu", "Close preview." Use when the user is dismissing a UI layer, not exiting a flow, abandoning a process, or acknowledging a prompt requiring a response.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Close | ✅ Use | — |
| Close [object] | ✅ Use | Use when specifying the target adds clarity — ex. "Close menu", "Close preview", "Close panel" |
| Dismiss | ❌ Avoid | Implies a deliberate acknowledgement of content before removing it — not a neutral layer removal; reserved for notifications that require acknowledgement — see Related terms |
| Exit | ❌ Avoid | Implies interrupting or leaving a flow or process — not dismissing a UI layer — see Related terms |
| Hide | ❌ Avoid | Implies the content is still present but concealed — Close removes the layer from view entirely |
| Quit | ❌ Avoid | Implies leaving an application or session — too broad for dismissing a single UI component |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Cancel | The user is abandoning an active flow or process — typically without saving progress | Cancel exits a flow; Close dismisses a UI layer — if closing a modal would also abandon a flow, use Cancel — not Close |
| OK | The user is acknowledging a prompt, alert, or notification that requires confirmation before being dismissed | Use OK when the user must actively confirm they have read or understood the content — not as a synonym for Close on a generic overlay |
| Exit | The user is interrupting an active flow or process — with or without saving data or progress | Exit operates on a flow or session; Close operates on a UI component — never use as synonyms |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Close / Open | Describing the two states of a UI layer that can be shown or hidden — ex. a menu, panel, drawer, or modal | Always use Open as the counterpart — never "Show", "Expand", or "Launch" unless those terms are already established in your product's navigation pattern |

**In context:**

- ✅ "Close"
- ✅ "Close menu"
- ✅ "Close preview"
- ✅ "Close panel"
- ❌ "Dismiss" — use for notifications requiring acknowledgement only; use Close for neutral layer removal
- ❌ "Exit" — implies leaving a flow or process; use Close for dismissing a UI layer
- ❌ "Hide panel" — implies the panel persists in a hidden state; use Close

**Notes:** Close, Cancel, and Exit are frequently confused because all three remove something from view. The distinction is what is being removed and what the consequences are. Close dismisses a UI layer with no effect on the user's flow or data. Cancel abandons a flow and typically discards unsaved progress. Exit interrupts a flow or process, with or without saving. When a modal or panel contains an active flow — ex. a form or a multi-step process — the dismissal action is Cancel or Exit, not Close.

---

### Confidentiality

**Definition:** The protection of information against unauthorized access, use, or disclosure, ensuring it is only available to those permitted to see it.

**Use when:** Referring to the principle or practice of keeping information protected from unauthorized access or exposure. Use in privacy notices, data handling disclosures, security settings, and any surface where the protection of sensitive information is being described or guaranteed to the user — ex. "Your confidentiality is protected", "Confidentiality agreement."

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Confidentiality | ✅ Use | Capitalize only in formal document titles or legal references — ex. "Confidentiality Agreement"; lowercase in body copy — ex. "We protect the confidentiality of your data" |
| Confidential | ✅ Use | Use as an adjective to describe information or documents that are protected — ex. "Confidential information", "This document is confidential" |
| Privacy | ⚠️ Conditional | Acceptable when referring to the user's right to control their personal data — not a direct synonym for Confidentiality, which refers specifically to protection against unauthorized access — see Related terms |
| Secrecy | ❌ Avoid | Implies deliberate concealment with negative connotation — not appropriate for describing data protection practices |
| Discretion | ❌ Avoid | Implies a personal judgment call — too informal and subjective for a product-level data protection commitment |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Privacy | Referring to the user's right to control how their personal data is collected, used, and shared | Privacy describes user rights and data control; Confidentiality describes protection against unauthorized access — related but not interchangeable |
| Security | Referring to the technical measures and systems used to protect data from breaches, attacks, or unauthorized access | Security describes the mechanisms of protection; Confidentiality describes the principle and outcome — ex. "Security measures ensure confidentiality" |
| Data protection | Referring to the broader set of practices, policies, and legal obligations governing how personal data is handled | Data protection is the umbrella; Confidentiality is one principle within it, alongside integrity and availability |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Confidentiality / Integrity / Availability | Referring to the three core principles of information security — collectively known as the CIA triad — in security documentation or enterprise-facing copy | Use all three terms together only in formal security or compliance contexts — ex. security policy documentation, enterprise dashboards; not in standard user-facing copy |

**In context:**

- ✅ "We protect the confidentiality of your data."
- ✅ "Confidential information"
- ✅ "Your conversations are kept confidential."
- ✅ "Confidentiality Agreement" — formal document title
- ❌ "Your data is kept secret." — Secrecy implies deliberate concealment; use Confidentiality or "kept confidential"
- ❌ "We handle your data with discretion." — Discretion implies subjective judgment, not a guaranteed protection standard; use Confidentiality
- ❌ "Your privacy is protected from unauthorized access." — Privacy refers to user rights over data; Confidentiality refers to protection from unauthorized access — use the right term for the right concept

**Notes:** Confidentiality, Privacy, and Security are closely related and frequently used interchangeably in product copy, but each refers to a distinct concept. Confidentiality is a principle — information should only be accessible to authorized parties. Privacy is a right — users control how their data is collected and used. Security is a practice — technical and organizational measures that enforce both. In user-facing copy, default to Privacy for user-rights contexts and Confidentiality for data-protection commitments. Reserve Security for references to technical safeguards.

---

### Confirm

**Definition:** The action of giving explicit consent to proceed with a sensitive, impactful, or irreversible action before it is executed.

**Use when:** Requesting the user's deliberate, explicit consent before completing an action that is sensitive, high-impact, or cannot be undone — ex. "Confirm transfer", "Confirm deletion", "Confirm your order." Use on confirmation dialogs, destructive action gates, and any surface where proceeding without explicit user intent could cause significant or irreversible consequences.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Confirm | ✅ Use | — |
| Confirm [object] | ✅ Use | Always pair with the object being confirmed when the action target needs to be clear — ex. "Confirm transfer", "Confirm deletion", "Confirm order" |
| Approve | ❌ Avoid | Implies authority over a third party's action — not personal consent for one's own action |
| Accept | ❌ Avoid | Reserved for mandatory consent to required terms, policies, or gating conditions — not for voluntary confirmation of a user's own action — see Related terms |
| OK | ⚠️ Conditional | Acceptable for low-stakes acknowledgements — ex. dismissing an informational alert; not a substitute for Confirm on sensitive or irreversible actions |
| Yes | ❌ Avoid | Conversational and binary — does not convey the deliberate, explicit nature of a confirmation; not appropriate for action labels |
| Submit | ⚠️ Conditional | Acceptable when the action is specifically sending or submitting a form — ex. "Submit application"; not a general synonym for Confirm |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Accept | The user is consenting to a mandatory requirement — ex. terms of service, a cookie policy, or a gating condition — rather than confirming their own voluntary action | Accept is required to proceed; Confirm is a deliberate gate on an action the user has already chosen to take — never use as synonyms |
| Allow | The user is granting optional permission for a feature or service to access a resource | Allow is for optional permission grants — not for confirming the consequences of a user-initiated action — see Allow entry |
| OK | The user is acknowledging an informational prompt or alert that does not involve a sensitive or irreversible action | Use OK for low-stakes acknowledgements; use Confirm when the action has meaningful consequences |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Confirm / Cancel | Presenting the user with the option to proceed with or abandon a sensitive or irreversible action | Always use Cancel as the counterpart — never "Back", "No", or "Dismiss"; Cancel must always be visually distinct from and secondary to Confirm |

**In context:**

- ✅ "Confirm transfer"
- ✅ "Confirm deletion"
- ✅ "Confirm your order"
- ✅ "Confirm new password"
- ❌ "Approve transfer" — Approve implies authority over another party's action; use Confirm for the user's own action
- ❌ "Accept deletion" — Accept is for mandatory consent to terms or requirements; use Confirm for deliberate user-initiated actions
- ❌ "Yes, delete" — conversational and binary; use Confirm deletion for an explicit, deliberate action label
- ❌ "OK" — on a destructive or irreversible action; use Confirm to signal the weight of the action

**Notes:** Confirm, Accept, and Allow are all consent-related terms but operate at different levels of intent and obligation. Confirm is the user doubling down on a choice they have already made — it gates their own action. Accept is the user agreeing to an external requirement they must meet to proceed. Allow is the user granting optional permission to a feature or service. The three are never interchangeable. On surfaces where Confirm is used, the action label should always name the object — ex. "Confirm deletion" rather than "Confirm" alone — to ensure the user understands exactly what they are consenting to before proceeding.

---

### Confirmation

**Definition:** A message or notification that certifies an event has occurred, a request has been received, or an action will take place.

**Use when:** Referring to the message, screen, or notification that communicates to the user that something has happened or will happen — ex. "Confirmation email", "Order confirmation", "You'll receive a confirmation shortly." Use on success states, post-action screens, email notifications, and any surface where the product is certifying the outcome of a user action or system event.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Confirmation | ✅ Use | Use lowercase when used as a screen or document label — ex. "Order confirmation" - and in body copy — ex. "You'll receive a confirmation email" |
| Confirmation [object] | ✅ Use | Use when specifying what is being confirmed adds clarity — ex. "Confirmation email", "Booking confirmation", "Payment confirmation" |
| Acknowledgement | ❌ Avoid | Implies the system has noted a request without committing to an outcome — Confirmation certifies an event has happened or will happen |
| Receipt | ⚠️ Conditional | Acceptable specifically in payment or transaction contexts — ex. "Payment receipt"; not a general synonym for Confirmation across other event types |
| Notification | ⚠️ Conditional | Acceptable when referring to the delivery mechanism — ex. "You'll receive a notification"; not a synonym for the content or purpose of a confirmation message |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Confirm | The user is taking the action of giving explicit consent to proceed with a sensitive or irreversible action — ex. "Confirm deletion", "Confirm transfer" | Confirm is the user action; Confirmation is the system response certifying an outcome — never use as synonyms — see Confirm entry |
| Alert | The message is informing the user of a relevant but non-critical event — not certifying that a specific user-initiated action has been completed | Alerts inform; Confirmations certify — an alert does not imply a preceding user action |
| Success | The surface is specifically a success state — ex. a success banner or screen — following the completion of a user action | Success describes the outcome state; Confirmation describes the message that communicates it — the two often appear together but are not synonyms |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Confirmation / Email | Referring to the message sent to the user certifying an event or request — ex. "Confirmation email", "Check your email for a confirmation" | Always use Email as the delivery channel modifier — never "Confirmation message" or "Confirmation notification" when the channel is specifically email |
| Confirmation / Screen | Referring to the in-product page or view displayed after a completed action — ex. "Confirmation screen", "You'll see a confirmation screen" | Use Screen for in-product post-action states — distinguish from email or push confirmations that arrive outside the product |

**In context:**

- ✅ "Order confirmation"
- ✅ "Confirmation email"
- ✅ "Booking confirmation"
- ✅ "You'll receive a confirmation shortly."
- ✅ "Confirmation screen" — in-product post-action state
- ❌ "Order acknowledgement" — implies the system has noted the request without committing to fulfillment; use Order confirmation
- ❌ "You'll receive a notification" — when the message specifically certifies an event or completed action; use confirmation
- ❌ "Confirm email" — Confirm is the user action; Confirmation email is the system message certifying an outcome

**Notes:** Confirmation and Confirm are the noun and verb forms of the same root but describe opposite sides of the same interaction. Confirm is what the user does — they gate a sensitive action. Confirmation is what the system sends back — it certifies that an event has occurred or will occur. On surfaces where both concepts appear — ex. a "Confirm order" button followed by an "Order confirmation" screen — keeping the two forms distinct and consistent reinforces clarity throughout the flow.

---

### Connect

**Definition:** The action of establishing an access relationship between a device, account, or item and another app, system, or account.

**Use when:** Describing the action of establishing a connection between two entities — ex. "Connect to Wi-Fi", "Connect your account", "Connect a device." Use on integration setup flows, device pairing surfaces, account linking screens, and any surface where the user is initiating access between two systems or services.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Connect | ✅ Use | — |
| Connect to [destination] | ✅ Use | Use when the target of the connection is known and naming it adds clarity — ex. "Connect to Wi-Fi", "Connect to Bluetooth" |
| Connect [object] | ✅ Use | Use when the item being connected is the subject — ex. "Connect your account", "Connect a device" |
| Link | ❌ Avoid | Implies associating two items by reference — not establishing an active access relationship between them |
| Sync | ⚠️ Conditional | Acceptable when the connection specifically involves ongoing data synchronization between two systems — ex. "Sync your calendar"; not a general synonym for Connect |
| Pair | ⚠️ Conditional | Acceptable specifically for Bluetooth or short-range wireless device connections — ex. "Pair your headphones"; not for account or system integrations |
| Integrate | ⚠️ Conditional | Acceptable in developer-facing or enterprise contexts where two systems are being formally joined — ex. "Integrate with Salesforce"; too technical for standard user-facing copy |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Link | Referring to a navigational element that directs the user to another location — ex. a hyperlink or a cross-reference | Link is a navigational term — not an access relationship; never use as a synonym for Connect |
| Sync | Referring specifically to an ongoing, two-way data exchange between connected systems — ex. "Sync contacts", "Sync calendar" | Sync describes what happens after a connection is established — not the act of connecting itself |
| Authorize | Referring to the step in an OAuth or API flow where the user grants a third-party app permission to access their account | Authorize is the permission grant within a connection flow; Connect is the user-facing label for initiating the overall process |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Connect / Disconnect | Describing the action of establishing or terminating an access relationship between two entities | Always use Disconnect as the counterpart — never "Unlink", "Remove", or "Deactivate" |

**In context:**

- ✅ "Connect to Wi-Fi"
- ✅ "Connect your account"
- ✅ "Connect a device"
- ✅ "Connect to Bluetooth"
- ❌ "Link to Wi-Fi" — Link is a navigational term, not an access relationship; use Connect
- ❌ "Sync your account" — Sync describes ongoing data exchange after a connection; use Connect for the initial setup action
- ❌ "Integrate your calendar" — too technical for standard user-facing copy; use Connect your calendar

**Notes:** Connect and Link are the most commonly confused pair in this entry. In this glossary, Link is a navigational element — it directs the user somewhere. Connect establishes an active access relationship between two systems or accounts. On surfaces where both concepts appear — ex. a settings page with a "Connect your Google account" button and a "Terms of service" link — keeping the two terms distinct preserves the navigational and functional meaning of each.

---

### Connection

**Definition:** The established link between two devices, systems, or apps that enables them to communicate or exchange data — ex. a Wi-Fi connection, an API connection.

**Use when:** Referring to the established state or relationship between two connected entities — ex. "Wi-Fi connection", "API connection", "Connection lost." Use in status indicators, settings labels, error messages, and any surface where the existence, quality, or loss of a link between two systems is being described.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Connection | ✅ Use | Capitalize only as part of a proper noun label — ex. "Volvo Truck Connection" in a settings header; lowercase in body copy and status messages — ex. "Connection lost" |
| [Type] connection | ✅ Use | Use when specifying the connection type adds clarity — ex. "Wi-Fi connection", "API connection", "Bluetooth connection" |
| Link | ❌ Avoid | Refers to a navigational element or a reference between two items — not an active data or network relationship between systems — see Related terms |
| Integration | ⚠️ Conditional | Acceptable in developer-facing or enterprise contexts to describe a formal, configured relationship between two systems — ex. "Salesforce integration"; too technical for standard user-facing status copy |
| Network | ⚠️ Conditional | Acceptable when referring specifically to the broader network infrastructure — ex. "Check your network"; not a synonym for the individual connection between two systems or devices |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Connect | Referring to the action of establishing a connection — ex. "Connect to Wi-Fi", "Connect your account" | Connect is the action; Connection is the resulting state — see Connect entry |
| Integration | Referring to a formally configured, ongoing relationship between two enterprise or developer-facing systems | Use Integration when the relationship involves setup, configuration, and maintenance beyond a single connection event — not as a general synonym for Connection |
| Link | Referring to a navigational element or a reference between two items — ex. a hyperlink or a URL | Link is navigational; Connection is relational — never use as synonyms |
| Network | Referring to the broader infrastructure that enables connections — ex. a corporate network, a mobile network | Network is the environment; Connection is the individual link within it |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Connection / Status | Referring to the current state of an established link — ex. "Connection status", "Check your connection status" | Always use Status as the compound counterpart when surfacing real-time link health — never "Connection state" or "Connection condition" |

**In context:**

- ✅ "Wi-Fi connection"
- ✅ "API connection"
- ✅ "Connection lost"
- ✅ "Connection status"
- ✅ "Check your connection and try again."
- ❌ "Wi-Fi link" — Link is navigational, not relational; use Connection
- ❌ "Salesforce connection failed" — in a developer or enterprise context, prefer "Salesforce integration error" to match the register of that audience; reserve Connection for user-facing status copy
- ❌ "Check your network connection" — redundant; "Check your connection" or "Check your network" alone is sufficient

**Notes:** Connection describes a state — the link exists or it doesn't. Connect describes the action that creates it. In error and status copy, this distinction matters: "Connection lost" describes a state change the system has detected; "Connect to Wi-Fi" is an instruction for the user to take an action. Never use Connection as a verb substitute for Connect — ex. "Connection your account" is always wrong.

---

### Contact

**Definition:** The generic action of reaching out to another person, team, or company through an unspecified or multi-channel means of communication.

**Use when:** Labeling the action of connecting the user to another person, team, or company when the communication channel is unspecified or multiple channels are available — ex. "Contact Support", "Contact us", "Contact your admin." When the channel is known, always use the channel-specific term instead — ex. "Call", "Email", "Book an appointment."

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Contact | ✅ Use | — |
| Contact [recipient] | ✅ Use | Always pair with the recipient when the target is known — ex. "Contact Support", "Contact your admin", "Contact us" |
| Get in touch | ⚠️ Conditional | Informal and idiomatic — use sparringly, only when matching the audience and product tone |
| Reach out | ❌ Avoid | Informal and conversational — not appropriate for button labels or instructional copy <!-- inferred --> |
| Message | ⚠️ Conditional | Acceptable when the communication channel is specifically in-app or chat-based messaging — ex. "Message your driver"; not a general synonym for Contact |
| Connect | ⚠️ Conditional | Acceptable when establishing an access relationship between two systems or accounts — not for initiating human communication — see Connect entry |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Call | The communication channel is specifically a phone or video call — ex. "Call Support", "Call your dealer" | Use the channel-specific term whenever the channel is known — Contact is the fallback for unspecified or multi-channel surfaces only |
| Email | The communication channel is specifically email — ex. "Email us", "Email your account manager" | Use Email when the action will open an email client or pre-filled email form — not Contact |
| Chat | The communication channel is specifically live chat or an in-product messaging tool — ex. "Chat with Support" | Use Chat when a real-time in-product messaging interface is the channel |
| Visit | The communication channel is an in-person appointment or a physical location — ex. "Visit a dealer", "Book a visit" | Use Visit when the interaction requires a physical presence — not Contact |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Contact / Support | Referring to the action of reaching out to a support team — ex. "Contact Support" | "Contact Support" is the standard compound for generic help-seeking actions — use Support as the counterpart when the recipient is the product's help team |

**In context:**

- ✅ "Contact Support"
- ✅ "Contact us"
- ✅ "Contact your admin"
- ✅ "Call Support" — when the channel is specifically a phone call
- ✅ "Email your account manager" — when the channel is specifically email
- ❌ "Get in touch with Support" — informal; use Contact Support
- ❌ "Reach out to your admin" — informal; use Contact your admin
- ❌ "Connect with Support" — Connect is for access relationships between systems; use Contact for human communication
- ❌ "Contact Support by phone" — when the channel is known, name the action: use "Call Support" instead

**Notes:** Contact is a deliberate fallback — it should only appear when the communication channel is genuinely unknown or when multiple channels are available and none is being prioritized. As soon as the channel is known, the channel-specific term (Call, Email, Chat, Visit) is always the right choice. Using Contact when a specific channel is available makes the action less clear and reduces the user's confidence in what will happen next.

---

### Continue

**Definition:** The action of voluntarily advancing to the next step in a flow or process, typically implying progress has been made or a condition has been met in the current step.

**Use when:** Labeling the forward action in a flow or process where the user has completed or acknowledged the current step and is choosing to move ahead — ex. "Continue to payment", "Continue to review", "Continue setup." Use when the action implies meaningful progression — the user has done something on the current step before advancing.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Continue | ✅ Use | — |
| Continue to [destination] | ✅ Use | Use when naming the next step adds clarity or reduces anxiety about what comes next — ex. "Continue to payment", "Continue to review" |
| Proceed | ❌ Avoid | Formal and impersonal — creates unnecessary distance from the user; not appropriate for conversational UI copy |
| Go | ❌ Avoid | Vague and directionless — does not convey voluntary progression through a defined flow |
| Next | ⚠️ Conditional | Acceptable when advancing through a step-based flow where steps are clearly numbered or sequenced and no meaningful action is required on the current step — see Related terms |
| Submit | ⚠️ Conditional | Acceptable when the forward action specifically sends or submits data — ex. "Submit application"; not a general synonym for Continue |
| Finish | ⚠️ Conditional | Acceptable on the final step of a flow when the action completes the process entirely — ex. "Finish setup"; not for intermediate steps |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Next | Advancing to the next step in a sequenced flow or to access subsequent content — ex. a numbered stepper, a carousel, or paginated content | Next is neutral and sequential; Continue implies the user has engaged with or completed something on the current step before advancing — use Next for mechanical step progression, Continue for meaningful advancement |
| Go back | The user is returning to the previous step in the flow without exiting it — progress is preserved | Go back is the reverse action of Continue within the same flow — see Back entry |
| Cancel | The user is abandoning the flow or process entirely — typically without saving progress | Cancel exits the flow; Continue advances within it — never use as synonyms — see Cancel entry |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Continue / Go back | Navigating forward and backward within a multi-step flow where the user has engaged with the current step | Use Go back as the reverse counterpart — never "Back", "Previous", or "Cancel" when the user is only returning to the prior step |
| Continue / Cancel | Presenting the user with the option to advance or abandon an in-progress flow — ex. on an interstitial or confirmation step | Use Cancel as the exit counterpart when the alternative to continuing is abandoning the flow entirely — see Cancel entry |

**In context:**

- ✅ "Continue to payment"
- ✅ "Continue to review"
- ✅ "Continue setup"
- ✅ "Continue" — when context makes the next step clear
- ❌ "Proceed to payment" — formal and impersonal; use Continue to payment
- ❌ "Go to payment" — vague and directionless; use Continue to payment
- ❌ "Next" — when the user has meaningfully engaged with the current step and the action implies earned progression, not just mechanical step advancement; use Continue
- ❌ "Submit" — when the action advances the user to the next step without sending data; use Continue

**Notes:** Continue and Next are the most commonly conflated terms in this entry. The distinction is whether the user has done something meaningful on the current step before advancing. Continue implies earned progression — the user has filled in a form, made a selection, or acknowledged content. Next implies mechanical step advancement — the user is simply moving through a sequence. In practice: a checkout flow that collects payment details uses Continue; a step indicator in an onboarding carousel uses Next. When in doubt, Continue is the safer choice for action labels on steps that require user input.

---

### Control panel

**Definition:** A page or section that contains a set of customizable settings scoped either to a specific area of the product or to the entire user experience.

**Use when:** Referring to a dedicated surface where the user can configure and customize product settings — either within a specific feature area or across the product globally. Use as a section label, navigation destination, or feature name — ex. "Control panel", "Fleet control panel", "Open control panel."

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Control panel | ✅ Use | Use sentence case as a navigation label or section title — ex. "Control panel"; lowercase in body copy — ex. "Open the control panel to adjust your settings"
| Dashboard | ⚠️ Conditional | Acceptable when the surface primarily displays data, metrics, or status overviews rather than customizable settings — ex. "Fleet dashboard"; not a general synonym for Control panel |
| Settings | ⚠️ Conditional | Acceptable when the surface is scoped to a single, clearly defined area of configuration — ex. "Account settings", "Notification settings"; use Control panel when the surface spans multiple configurable areas |
| Admin panel | ⚠️ Conditional | Acceptable when the surface is specifically restricted to administrator-level configuration — ex. in enterprise or multi-user products; not a general synonym for Control panel |
| Console | ❌ Avoid | Technical term associated with developer tools and system-level interfaces — not appropriate for standard user-facing configuration surfaces |
| Hub | ❌ Avoid | Vague and non-specific — does not convey that the surface contains customizable settings |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Panel or Side panel | Referring to a fixed or floating UI section that hosts a subset of settings or controls — typically without being a full page or primary navigation destination | Panel is a UI component; Control panel is a product surface — a control panel may contain panels, but a panel is not a control panel |
| Settings | Referring to a single, clearly scoped configuration area rather than a multi-area customization surface | Use Settings for focused, single-topic configuration — ex. "Notification settings"; use Control panel when the surface aggregates settings across multiple areas |
| Dashboard | Referring to a surface that primarily surfaces data, metrics, or system status for the user to monitor rather than configure | Dashboard is for visibility; Control panel is for configuration — the two may appear together but serve different purposes |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Control panel / Settings | Referring to the relationship between the high-level customization surface and a specific configuration area within it — ex. "Open the control panel to access notification settings" | Use Control panel for the surface; Settings for the specific configuration topic within it — never use interchangeably as section labels on the same navigation level |

**In context:**

- ✅ "Control panel"
- ✅ "Fleet control panel"
- ✅ "Open the control panel to adjust your settings."
- ✅ "Global control panel" — when the surface spans the entire product experience
- ❌ "Open the console" — Console is developer-facing; use Control panel for user-facing configuration surfaces
- ❌ "Open the hub" — Hub is vague; use Control panel when the surface contains customizable settings
- ❌ "Go to settings" — when the surface spans multiple configurable areas rather than a single topic; use Control panel

**Notes:** Control panel and Settings are the most commonly confused terms in this entry because both describe configuration surfaces. The distinction is scope: Settings is scoped to a single, clearly defined topic — ex. "Account settings", "Notification settings." Control panel aggregates multiple configurable areas into a single surface, either for a specific product area or for the entire product globally. When both terms appear in the same product, they should occupy different levels of the navigation hierarchy — Control panel as the top-level destination, Settings as the specific configuration section within it.

---

### Create

**Definition:** The action of generating a new item that does not yet exist — ex. a file, account, list, or record.

**Use when:** Describing the act of bringing something new into existence within the product — ex. "Create new file", "Create account", "Create a list." Use on empty states, primary action buttons, and any surface where the user is initiating the generation of a new item from scratch.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Create | ✅ Use | — |
| Create [object] | ✅ Use | Always pair with the object being created for clarity — ex. "Create account", "Create new file", "Create a list" |
| Create new [object] | ✅ Use | Use when distinguishing a new item from existing ones of the same type adds clarity — ex. "Create new report", "Create new profile" |
| Make | ❌ Avoid | Informal and imprecise — does not convey the product-level act of generating a new item |
| Build | ⚠️ Conditional | Acceptable when the item being generated is complex and requires multiple configuration steps — ex. "Build a workflow", "Build a report"; not a general synonym for Create |
| Generate | ⚠️ Conditional | Acceptable when the item is produced automatically by the system rather than configured by the user — ex. "Generate report", "Generate API key"; not a synonym for user-initiated creation |
| New | ⚠️ Conditional | Acceptable as a standalone label on icon-only buttons or highly space-constrained surfaces — ex. a "+" button labeled "New"; always prefer Create [object] when space allows |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Add | The user is including a pre-existing item into a list, collection, or product area — ex. "Add to cart", "Add a team member" | Add operates on items that already exist; Create generates something new — never use as synonyms — see Add entry |
| Upload | The item being brought into the product originates from outside it — ex. a file, image, or document from the user's device | Upload is for externally sourced items; Create is for items generated within the product — never use as synonyms |
| Import | Items are being brought in from an external source or format, typically in bulk — ex. "Import contacts", "Import from CSV" | Import is for bulk external data; Create is for user-initiated, single-item generation within the product |
| Duplicate | The user is generating a new item by copying an existing one — ex. "Duplicate file", "Duplicate report" | Duplicate creates a new item from an existing template; Create generates a new item from scratch — distinguish in copy when both actions are available on the same surface |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Create / Delete | Describing the actions of generating a new item and permanently removing an existing one — ex. as opposing actions in an item management surface | Always use Delete as the destructive counterpart — never "Remove" or "Clear" when the action permanently destroys a user-created item |
| Create / Edit | Describing the two primary content actions available on a surface where items can be generated and modified — ex. a document or report management view | Create generates new items; Edit modifies existing ones — both may appear on the same surface but should always be visually and contextually distinct |

**In context:**

- ✅ "Create new file"
- ✅ "Create account"
- ✅ "Create a list"
- ✅ "Create new report"
- ❌ "Add account" — an account does not pre-exist and must be generated; use Create account — see Add entry
- ❌ "Make a new file" — informal; use Create new file
- ❌ "Build account" — Build implies complex multi-step configuration; use Create for straightforward item generation
- ❌ "Upload a report" — Upload is for externally sourced items; use Create when the report is generated within the product

**Notes:** Create and Add are the most consistently confused pair in this glossary because both result in something appearing in the product. The distinction is origin: Create generates something new that did not exist before. Add includes something that already existed elsewhere. A user Creates a new list; they Add items to it. On surfaces where both actions are available — ex. a project view with a "Create project" button and an "Add member" option — the two terms must remain distinct to preserve the meaning of each action.

---

### Currency

**Definition:** The system of money used in a specific region or country — ex. US dollars, euros, British pounds.

**Use when:** Referring to the type of money associated with a transaction, account, or regional setting — ex. "Select your currency", "Currency: USD", "Prices shown in local currency." Use in payment flows, pricing surfaces, account settings, and any surface where the unit of monetary value needs to be identified or selected.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Currency | ✅ Use | Capitalize as a settings label or field label — ex. "Currency"; lowercase in body copy — ex. "Select your preferred currency" |
| [Currency code] | ✅ Use | Use ISO 4217 currency codes — ex. USD, EUR, GBP — when displaying currency alongside a value in space-constrained UI — ex. "USD 49.99" |
| Money | ❌ Avoid | Informal and non-specific — does not identify the regional or system-level unit of exchange |
| Funds | ❌ Avoid | Refers to a pool or balance of money — not the type or unit of currency in use |
| Payment | ❌ Avoid | Refers to the act of transferring money — not the unit or system of monetary value |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Price | Referring to the specific monetary value assigned to a product, service, or item — ex. "Price: $49.99" | Price is a specific value; Currency is the unit that gives that value meaning — ex. a price of 49.99 requires a currency to be interpretable |
| Balance | Referring to the amount of money held in an account or wallet at a given time — ex. "Account balance", "Remaining balance" | Balance is an amount within a currency context — not a synonym for Currency itself |
| Payment | Referring to the act or method of transferring money — ex. "Payment method", "Payment failed" | Payment describes a transaction action; Currency describes the unit of value used within it |
| Exchange rate | Referring to the ratio at which one currency converts to another — ex. "Current exchange rate: 1 USD = 0.92 EUR" | Use Exchange rate when the conversion between two currencies is the subject — not Currency alone |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Currency / Region | Referring to the combination of monetary unit and geographic locale — ex. in account settings where both are configured together | Currency and Region are often configured together but refer to distinct settings — never combine into a single label |
| Currency / [ISO code] | Displaying a currency alongside its standard identifier — ex. "Euro (EUR)", "US Dollar (USD)" | Always use the ISO 4217 three-letter code as the identifier — never abbreviations like "$" alone when the currency could be ambiguous across regions |

**In context:**

- ✅ "Select your currency"
- ✅ "Currency: USD"
- ✅ "Prices shown in local currency"
- ✅ "Euro (EUR)"
- ✅ "Change your currency in account settings."
- ❌ "Select your money" — informal and non-specific; use Currency
- ❌ "Available funds: USD" — Funds refers to a balance, not a currency type; use Currency or display the balance with its currency code
- ❌ "Payment: EUR" — Payment refers to a transaction action, not a unit of value; use Currency

**Notes:** When displaying monetary values in UI, always pair the amount with its currency identifier to avoid ambiguity — ex. "USD 49.99" rather than "$49.99", which could be interpreted as any dollar-denominated currency. Never combine the currency symbol and identifier in the same value — ex. "$49.99 USD" is incorrect. The ISO 4217 code is the primary display format — ex. "USD 49.99", "EUR 49.99". For settings labels, use the full currency name alongside its ISO code on first reference — ex. "US Dollar (USD)" — and the code alone in space-constrained contexts.

---

### Dashboard

**Definition:** A digital or physical panel that displays multiple types of data and controls the user can monitor and interact with in a single view.

**Use when:** Referring to a surface — digital or physical — that aggregates multiple data types and interactive controls into a single view. Use as a navigation label, section title, or feature name — ex. "Dashboard", "Fleet dashboard", "Go to dashboard." In vehicle or machine contexts, use Dashboard to refer to the physical instrument panel.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Dashboard | ✅ Use | Use sentence case as a navigation label or section title — ex. "Dashboard", "Fleet dashboard"; lowercase in body copy — ex. "View your dashboard" |
| [Qualifier] dashboard | ✅ Use | Use when scoping the dashboard to a specific area or audience adds clarity — ex. "Fleet dashboard", "Driver dashboard", "Analytics dashboard" |
| Control panel | ❌ Avoid | Reserved for surfaces containing customizable settings — not for data display and monitoring surfaces — see Control panel entry |
| Overview | ⚠️ Conditional | Acceptable as a section label when the surface is read-only and displays a summary of data without interactive controls — ex. "Account overview"; not a synonym for Dashboard when controls are present |
| Home | ⚠️ Conditional | Acceptable as the primary landing surface label when the dashboard is the product's main entry point — ex. "Home"; not a general synonym for Dashboard on secondary or feature-specific views |
| Portal | ❌ Avoid | Implies a gateway or access point to a broader system — not a data display and control surface |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Control panel | Referring to a surface that contains customizable settings the user can configure — not data to monitor | Control panel is for configuration; Dashboard is for data display and interaction — never use as synonyms — see Control panel entry |
| Onboard | Referring to all physical and digital systems and controls present within a vehicle or machine | Onboard defines the total system environment; Dashboard is a specific display surface within it — ex. the dashboard is one component of the onboard experience |
| Overview | Referring to a read-only summary view of data without interactive controls — ex. an account or project summary page | Use Overview when the surface is purely informational with no interactive controls; use Dashboard when controls are present alongside the data |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Dashboard / Settings | Referring to the two primary surfaces in a product — one for monitoring data and interacting with controls, one for configuring the product | Dashboard and Settings are distinct destinations — Dashboard is where the user works; Settings is where the user configures — never use interchangeably |
| Dashboard / Report | Referring to the live data view and the static or exportable data document as complementary surfaces | Dashboard displays real-time or interactive data; Report captures a snapshot for review or sharing — both may coexist on the same product surface |

**In context:**

- ✅ "Dashboard"
- ✅ "Fleet dashboard"
- ✅ "Go to dashboard"
- ✅ "Driver dashboard"
- ✅ "Your dashboard shows real-time vehicle data."
- ❌ "Control panel" — when the surface displays data and interactive controls rather than customizable settings; use Dashboard
- ❌ "Go to the portal" — Portal implies a gateway, not a data display surface; use Dashboard
- ❌ "View your overview" — when interactive controls are present alongside the data; use Dashboard

**Notes:** Dashboard and Control panel are the most commonly confused terms in this area of the glossary because both are feature-rich, multi-element surfaces. The distinction is purpose: Dashboard surfaces data for the user to monitor and act on. Control panel surfaces settings for the user to configure. A product can have both — ex. a fleet management product where the Dashboard shows live vehicle data and the Control panel manages notification preferences — but they should never share the same label or occupy the same navigation level. In vehicle contexts, Dashboard may additionally refer to the physical instrument panel; ensure context makes the referent clear when both meanings are plausible.

---

### Dealer

**Definition:** A business or company officially authorized by Volvo Group to sell and service Volvo products and services.

**Use when:** Referring to an authorized Volvo Group business entity that sells or services Volvo products — ex. "Find a dealer", "Contact your dealer", "Visit a dealer." Use across all surfaces where the user is directed to or interacts with an authorized point of sale or service — ex. dealer locators, service booking flows, support escalation paths, and product documentation.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Dealer | ✅ Use | — |
| Dealer [qualifier] | ✅ Use | Use when specifying the dealer's function adds clarity — ex. "Dealer network", "Dealer portal", "Dealer locator" |
| Reseller | ❌ Avoid | Implies a non-authorized third-party sales relationship — not the exclusive, authorized relationship Dealer conveys |
| Partner | ❌ Avoid | Too broad and informal — implies a general business relationship, not an authorized sales and service mandate |
| Distributor | ❌ Avoid | Implies a wholesale or logistics role in a supply chain — not a direct customer-facing authorized sales and service entity |
| Retailer | ❌ Avoid | Implies a generic point-of-sale relationship — does not convey the authorization or service mandate of a Volvo dealer |
| Agent | ❌ Avoid | Implies a representative acting on behalf of another party — not an independent authorized business entity |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Dealer network | Referring to the collective system of all authorized Volvo Group dealers — ex. "Our dealer network covers 180 markets" | Dealer network is the aggregate; Dealer is the individual entity — see Paired terms |
| Service center | Referring specifically to an authorized location that provides maintenance and repair services, which may or may not also sell products | Use Service center when the context is exclusively service and maintenance — use Dealer when the entity covers both sales and service |
| Workshop | Referring specifically to the physical space where vehicle servicing and repairs take place — ex. in service booking or maintenance copy | Workshop is the location within a dealer where service work is performed — not a synonym for the dealer entity itself |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Dealer / Dealer network | Referring to an individual authorized entity and the collective system of all authorized Volvo Group dealers | Always use Dealer network as the collective form — never "dealer partners", "dealer chain", or "dealer ecosystem" |

**In context:**

- ✅ "Find a dealer"
- ✅ "Contact your dealer"
- ✅ "Visit a dealer"
- ✅ "Dealer network"
- ✅ "Book a service appointment at your nearest dealer."
- ❌ "Find a reseller" — Reseller implies a non-authorized third-party relationship; use Dealer
- ❌ "Contact your distributor" — Distributor implies a wholesale or supply chain role; use Dealer
- ❌ "Find a partner" — Partner is too broad and does not convey authorized status; use Dealer
- ❌ "Find a retailer" — Retailer implies a generic point-of-sale relationship; use Dealer

**Notes:** Dealer is a Volvo Group-specific term denoting an officially authorized sales and service entity. It is not interchangeable with generic commercial relationship terms like reseller, partner, or distributor, all of which omit the authorization and service mandate that define a Volvo dealer. When directing users to a physical location for sales or service, Dealer is always the correct term — regardless of whether the context is sales, maintenance, repair, or product support.

---

### Delete

**Definition:** The action of permanently removing specific, user-selected content, files, or items from the product.

**Use when:** Describing the permanent removal of a specific item, file, or piece of content explicitly selected by the user — ex. "Delete column", "Delete account", "Delete file." Use on destructive action buttons, confirmation dialogs, and any surface where the user is removing a specific item with no expectation of recovery.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Delete | ✅ Use | — |
| Delete [object] | ✅ Use | Always pair with the object being deleted for clarity — ex. "Delete column", "Delete account", "Delete file" |
| Clear | ❌ Avoid | Reserved for removing all content from a page, form, or input field in a single bulk operation — not for targeted removal of a specific item — see Related terms |
| Remove | ❌ Avoid | Implies detaching or excluding an item from a context without necessarily destroying it — not for permanent, irreversible removal |
| Deselect | ❌ Avoid | Implies unchecking or unselecting a chosen item — not removing or destroying it |
| Erase | ❌ Avoid | Technical and imprecise — does not convey the product-level permanence of a deletion |
| Discard | ⚠️ Conditional | Acceptable when abandoning unsaved content before it has been created or saved — ex. "Discard changes"; not for deleting existing, saved items |
| Archive | ⚠️ Conditional | Acceptable when items are being moved to long-term storage with the intent to retain them — not a synonym for Delete, which permanently removes them — see Archive entry |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Clear | Removing all content from a page, form, or input field at once — ex. "Clear all filters", "Clear data" | Clear is a bulk, non-targeted operation; Delete is a targeted, permanent removal — never use as synonyms — see Clear entry |
| Remove | Detaching or excluding a specific item from a list or collection without permanently destroying it — ex. "Remove from favorites", "Remove member" | Remove is reversible; Delete is permanent — use Remove when the item continues to exist elsewhere after the action |
| Archive | Moving a specific item to long-term storage for retention and potential restoration — ex. "Archive order", "Archive conversation" | Archive retains the item; Delete destroys it — never use as synonyms — see Archive entry |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Delete / Cancel | Presenting the user with the option to permanently remove an item or abandon the deletion — ex. on a confirmation dialog | Always pair Delete with Cancel on confirmation dialogs — never "Back" or "Dismiss" |
| Delete / Create | Describing the two opposing lifecycle actions for an item — generating it and permanently removing it | Delete is the destructive counterpart to Create — see Create entry |

**In context:**

- ✅ "Delete column"
- ✅ "Delete account"
- ✅ "Delete file"
- ✅ "Delete selected items"
- ✅ "Are you sure you want to delete this account? This action can't be undone."
- ❌ "Clear column" — Clear removes all content from a surface; use Delete for targeted removal of a specific item
- ❌ "Remove account" — Remove implies the item still exists elsewhere; use Delete for permanent, irreversible removal
- ❌ "Deselect column" — Deselect unchecks a selection; use Delete for permanently removing an item
- ❌ "Erase file" — Technical and imprecise; use Delete

**Notes:** Delete, Remove, and Clear are the three most commonly confused removal terms in this glossary. The distinctions are permanence and scope. Delete is permanent and targeted — a specific item is destroyed. Remove is reversible and targeted — a specific item is detached from a context but continues to exist. Clear is non-targeted and bulk — all content in a given context is removed at once. When Delete is used on a high-stakes or irreversible action — ex. deleting an account or a file with no recovery option — always follow with a confirmation dialog that names the object and states the consequence explicitly: ex. "Delete this account? All your data will be permanently lost."

---

### Device

**Definition:** A physical item — such as a phone, tablet, laptop, or computer — used by a customer to access a website, app, product, or service.

**Use when:** Referring generically to the physical hardware a user is using to access the product — ex. "Your device", "Sign in on another device", "This feature is available on all devices." Use the generic term Device unless the product or feature is exclusively available on a specific device type, in which case name that type directly — ex. "Available on iOS devices only."

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Device | ✅ Use | — |
| [Type] device | ✅ Use | Use when the feature or product is exclusively available on a specific device type — ex. "iOS device", "mobile device"; never use a specific type when the product is available across multiple device types |
| Phone | ⚠️ Conditional | Acceptable only when the product or feature is exclusively available on phones — ex. "Download the app on your phone"; do not use as a generic substitute for Device |
| Mobile | ⚠️ Conditional | Acceptable when referring specifically to the mobile experience or mobile-only features — ex. "Mobile app", "Available on mobile"; not a general synonym for Device |
| Computer | ⚠️ Conditional | Acceptable only when the product or feature is exclusively available on desktop or laptop computers — do not use as a generic substitute for Device |
| Gadget | ❌ Avoid | Informal and imprecise — does not convey the functional role of the hardware in accessing the product |
| Hardware | ❌ Avoid | Technical term associated with system-level or developer contexts — not appropriate for standard user-facing copy |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Platform | Referring to the operating system or environment a product runs on — ex. iOS, Android, Windows | Platform describes the software environment; Device describes the physical hardware — ex. "Available on all platforms" vs. "Sync across all devices" |
| Browser | Referring specifically to the web application context in which the product is accessed — ex. "Open in your browser", "Browser settings" | Browser is a software access method; Device is the physical hardware — use Browser when the access method matters, Device when the hardware matters |
| App | Referring to the software application installed on or accessed through the device | App is what the user interacts with; Device is what they use to do it — the two frequently appear together but refer to distinct things |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Device / Account | Referring to the two primary identifiers in a multi-device sign-in or session management context — ex. "Sign in on a new device", "Manage devices linked to your account" | Device and Account are distinct — the device is the hardware; the account is the user's identity — both may appear in the same flow without overlapping in meaning |
| Device / Settings | Referring to device-level configuration options — ex. "Device settings", "Manage your device settings" | Always use Settings as the compound counterpart — never "Device preferences" or "Device options" |

**In context:**

- ✅ "Your device"
- ✅ "Sign in on another device"
- ✅ "This feature is available on all devices."
- ✅ "Available on iOS devices only." — when the feature is exclusively iOS
- ✅ "Remove this device" — in a session or account management context
- ❌ "Sign in on your phone" — when the product is available on multiple device types; use Device
- ❌ "This feature is available on all computers" — when the product is available across multiple device types; use Device
- ❌ "Check your hardware settings" — Hardware is a technical term; use Device settings

**Notes:** Device is the default term for all references to user hardware unless the product or feature is exclusively available on a specific type. The moment a specific device type is named — ex. phone, tablet, laptop — the copy implies exclusivity or platform specificity. Use this intentionally: "Download the app on your phone" is correct if the app is phone-only; it is misleading if the app is also available on tablets and desktops. When in doubt, Device is always the safer and more inclusive choice.

---

### Disconnect

**Definition:** The action of interrupting the access of a device, account, or item to a user's app or account — without deleting the item or removing it from the access list.

**Use when:** Describing the action of terminating an active access relationship between a device, account, or item and a user's app or account — ex. "Disconnect AA00FHAE", "Disconnect your account", "Disconnect this device." Use when the item remains in the access list after disconnection and can be reconnected later — disconnect is always reversible in this context.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Disconnect | ✅ Use | — |
| Disconnect [object] | ✅ Use | Always pair with the object being disconnected for clarity — ex. "Disconnect AA00FHAE", "Disconnect this device", "Disconnect your account" |
| Unlink | ❌ Avoid | Implies removing a reference or association between two items — not interrupting an active access relationship; also inconsistent with Connect as the canonical counterpart |
| Remove | ❌ Avoid | Implies the item is deleted or excluded from the access list — Disconnect explicitly preserves the item in the list |
| Deactivate | ❌ Avoid | Implies changing the operational state of an item — not interrupting its access to a specific account or app |
| Revoke | ⚠️ Conditional | Acceptable in developer-facing or admin contexts where access rights are being formally withdrawn — ex. "Revoke API access"; too technical and permanent-sounding for standard user-facing copy |
| Sign out | ⚠️ Conditional | Acceptable when the user is ending their own active session — not for interrupting a device's or account's access relationship from a management surface |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Connect | Granting a device, account, or item access to a user's app or account — ex. "Connect to Wi-Fi", "Connect your account" | Connect establishes the access relationship; Disconnect interrupts it — always the canonical pair — see Connect entry |
| Delete | Permanently removing an item from the product with no intent to retain or restore it | Disconnect preserves the item in the access list; Delete removes it permanently — never use as synonyms |
| Remove | Excluding an item from a list or collection without permanently destroying it | Remove takes the item out of the access list; Disconnect keeps it there in an inactive state — the distinction matters when both actions are available on the same surface |
| Sign out | The user is ending their own active session across a device or browser — not managing another device's or account's access from a settings surface | Sign out is user-initiated session termination; Disconnect is access management — they may produce similar outcomes but belong on different surfaces |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Connect / Disconnect | Describing the action of establishing or interrupting an access relationship between two entities — ex. in a device management or integration settings surface | Always use Connect as the counterpart — never "Link" or "Enable" — see Connect entry |
| Disconnect / Reconnect | Presenting the user with the option to interrupt and then restore an access relationship — ex. on a device or account management surface | Use Reconnect as the restore counterpart when the item remains in the access list after disconnection — never "Connect again" or "Re-enable" |

**In context:**

- ✅ "Disconnect AA00FHAE"
- ✅ "Disconnect this device"
- ✅ "Disconnect your account"
- ✅ "AA00FHAE has been disconnected. You can reconnect it at any time."
- ❌ "Unlink this device" — Unlink implies removing a reference, not interrupting access; use Disconnect
- ❌ "Remove this device" — Remove implies the device is excluded from the access list; Disconnect keeps it there in an inactive state
- ❌ "Deactivate this device" — Deactivate implies a state change, not an access interruption; use Disconnect
- ❌ "Revoke access" — too formal and permanent-sounding for a reversible access interruption; use Disconnect

**Notes:** Disconnect is explicitly reversible — the item remains in the access list after disconnection and can be reconnected at any time. This distinguishes it from Remove (item leaves the list) and Delete (item is permanently destroyed). When Disconnect is used on a management surface where multiple actions are available — ex. a device list with Disconnect, Remove, and Delete options — the copy and UI must make the consequence of each action unambiguous. Always follow a Disconnect action with confirmation copy that reinforces its reversibility — ex. "AA00FHAE has been disconnected. You can reconnect it at any time."

---

### Discover / Explore

**Definition:** The action of directing the user toward additional content, sections, pages, or products — inviting open-ended browsing rather than targeted retrieval.

**Use when:** Directing the user to another section, page, or app for additional information without a specific query or target in mind — ex. "Discover our offer", "Explore features", "Explore what's new." Use on promotional surfaces, empty states, onboarding flows, and navigation CTAs where the intent is to invite curiosity and browsing rather than fulfill a specific search.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Discover | ✅ Use | Preferred when the emphasis is on finding something new or unexpected — ex. "Discover our offer", "Discover what's new" |
| Explore | ✅ Use | Preferred when the emphasis is on browsing a space or feature set at the user's own pace — ex. "Explore features", "Explore the app" |
| Navigate | ❌ Avoid | Implies directional movement to a known destination — not open-ended browsing toward additional content |
| Find | ❌ Avoid | Implies a targeted retrieval of a specific known item — not an invitation to browse or discover new content |
| Browse | ⚠️ Conditional | Acceptable when the user is scrolling through a catalog or list of items without a specific query — ex. "Browse vehicles"; more passive than Discover or Explore and lacks the invitation quality of either |
| Search | ❌ Avoid | Implies a query-driven retrieval of specific results — not open-ended browsing — see Related terms |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Search | Presenting results based on a specific user query — ex. "Search for a vehicle", "Search by keyword" | Search is query-driven and targeted; Discover/Explore is open-ended and invitation-driven — never use as synonyms |
| Filter | Finding items or information based on search terms or criteria chosen by the user — ex. "Filter by location", "Filter results" | Filter refines an existing result set; Discover/Explore initiates open-ended browsing without a predefined result set |
| Browse | The user is passively scrolling through a catalog or content list without a specific goal — ex. "Browse vehicles", "Browse our catalog" | Browse is more passive and neutral than Discover or Explore — use Discover/Explore when the CTA should actively invite curiosity or forward movement |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Discover / Learn more | Directing the user to additional content or information about a specific topic or offer — ex. "Discover our offer. Learn more." | Use Learn more as a secondary CTA that complements Discover — Discover initiates exploration; Learn more deepens it |
| Explore / Get started | Pairing an open-ended browsing invitation with a clear entry point to begin using the product — ex. in onboarding or empty states | Use Get started as the action counterpart when Explore sets the context and Get started drives the first concrete step |

**In context:**

- ✅ "Discover our offer"
- ✅ "Explore features"
- ✅ "Explore what's new"
- ✅ "Discover what Volvo has to offer"
- ✅ "Explore the app" — in onboarding or empty state copy
- ❌ "Navigate to our offer" — Navigate implies a known destination; use Discover for open-ended directional copy
- ❌ "Find our features" — Find implies targeted retrieval of a specific item; use Explore for open-ended feature browsing
- ❌ "Search our offer" — Search is query-driven; use Discover for promotional browsing CTAs

**Notes:** Discover and Explore are interchangeable in most contexts but carry a subtle tonal difference worth preserving on high-visibility surfaces. Discover implies encountering something new and unexpected — it suits promotional and launch copy. Explore implies agency and self-directed browsing — it suits onboarding, feature introductions, and empty states. When in doubt, Explore is the more neutral and versatile of the two. Both terms are distinct from Search and Filter, which are query- and criteria-driven — never use any of the four interchangeably on surfaces where the user's intent (browsing vs. retrieving) determines which experience they access.

---

### Download

**Definition:** The action of creating a copy of an app, file, or information on the user's device from a remote source.

**Use when:** Describing the transfer of a file, app, or piece of information from a remote source to the user's device — ex. "Download report", "Download the app", "Download invoice." Use on export flows, file retrieval surfaces, and any surface where the user is pulling content from the product onto their local device.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Download | ✅ Use | — |
| Download [object] | ✅ Use | Always pair with the object being downloaded for clarity — ex. "Download report", "Download invoice", "Download the app" |
| Save | ❌ Avoid | Reserved for recording the latest changes or status in a user flow or session — not for transferring content from a remote source to a device — see Related terms |
| Copy | ❌ Avoid | Reserved for duplicating an item within the same interface — not for transferring content to a device — see Related terms |
| Install | ❌ Avoid | Reserved for running an executable after it has been downloaded — not for the download action itself — see Related terms |
| Export | ⚠️ Conditional | Acceptable when the primary action is converting and sending data out of the product in a specific format — ex. "Export as CSV", "Export to PDF"; not a general synonym for Download when the result is simply a file copy on the user's device |
| Fetch | ❌ Avoid | Technical term associated with API or developer contexts — not appropriate for user-facing copy |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Install | The downloaded item is an executable that runs on the user's device after downloading — ex. "Install app", "Install the update" | Install follows Download for executables — Download creates the copy; Install runs it — never use as synonyms |
| Copy | The user is duplicating an item within the same interface — ex. "Copy text", "Copy link", "Copy to clipboard" | Copy operates within the product interface; Download transfers content to the user's device — never use as synonyms |
| Save | The user is recording the latest changes or status in an ongoing session — ex. "Save file", "Save changes" | Save preserves work in progress within the product; Download transfers a finished file to the user's device — never use as synonyms |
| Export | The user is converting and sending data out of the product in a specific format — ex. "Export as CSV", "Export to PDF" | Export implies format conversion and data transformation; Download implies a direct file copy — use Export when the output format is the primary concern |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Download / Upload | Describing the two directions of file transfer — pulling content from a remote source to the user's device and pushing content from the user's device to a remote source | Always use Upload as the counterpart — never "Send" or "Submit" when the action is specifically transferring a file from device to server |
| Download / Install | Describing the two sequential steps of acquiring and activating an executable — ex. "Download and install the update" | Use only when both steps are distinct and user-facing — ex. a manual update flow; do not use when the install happens automatically after download |

**In context:**

- ✅ "Download report"
- ✅ "Download invoice"
- ✅ "Download the app"
- ✅ "Your report is ready to download."
- ❌ "Save report" — Save records changes in a session; use Download when the user is transferring a file to their device
- ❌ "Copy report" — Copy duplicates within the interface; use Download for device-level file transfer
- ❌ "Install report" — Install runs executables; use Download for transferring non-executable files
- ❌ "Fetch report" — technical jargon; use Download

**Notes:** Download, Save, Copy, and Install are frequently confused because all four result in content being available to the user. The distinctions are location and action type. Download transfers content from a remote source to the user's device. Save records the current state of content within the product. Copy duplicates content within the same interface. Install activates an executable after it has been downloaded. On surfaces where multiple of these actions are available — ex. a file management view with Download, Save, and Copy options — each label must be distinct and accurately describe what will happen to the content.

---

### Downgrade

**Definition:** The action of switching an account, product, service, feature, or subscription to a lower tier — usually accompanied by a reduction in cost or capability.

**Use when:** Describing the action of moving to a lower plan, tier, or capability level — ex. "Downgrade to Standard", "Downgrade your subscription", "Downgrade plan." Use on pricing pages, subscription management surfaces, and any surface where the user is reducing their plan level, feature access, or service tier.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Downgrade | ✅ Use | — |
| Downgrade to [tier] | ✅ Use | Use when naming the destination tier adds clarity — ex. "Downgrade to Standard", "Downgrade to Free" |
| Downgrade [object] | ✅ Use | Use when specifying the item being downgraded adds clarity — ex. "Downgrade subscription", "Downgrade plan" |
| Change | ❌ Avoid | Implies a neutral, cost-free modification — does not convey the directional tier shift and cost reduction that Downgrade implies — see Change entry |
| Switch | ⚠️ Conditional | Acceptable when the move between tiers is presented as a neutral plan change without emphasis on direction — ex. "Switch plans"; use Downgrade when the downward direction and its consequences are relevant to communicate |
| Cancel | ❌ Avoid | Implies abandoning a subscription entirely — not reducing it to a lower tier; a downgrade to a free plan is still a Downgrade, not a Cancel |
| Reduce | ❌ Avoid | Informal and imprecise — does not convey the tier-based nature of the change |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Upgrade | The user is switching to a higher tier — usually accompanied by a higher cost or expanded capability — ex. "Upgrade to Pro", "Upgrade your plan" | Upgrade and Downgrade are the canonical pair for tier-based plan changes — always use together when both directions are available on the same surface — see Paired terms |
| Change | The user is making a neutral, cost-free modification to a setting or preference — not a directional tier shift | Change is for non-directional, cost-free modifications; Downgrade is for tier-based reductions — never use as synonyms — see Change entry |
| Cancel | The user is terminating a subscription or service entirely — not reducing it to a lower tier | A downgrade to a free plan is still a Downgrade — Cancel ends the relationship; Downgrade adjusts it |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Downgrade / Upgrade | Presenting the user with the option to move to a lower or higher tier — ex. on a subscription or plan management surface | Always use Upgrade as the counterpart — never "Enhance", "Boost", or "Improve"; both must appear at the same navigation level when both actions are available |

**In context:**

- ✅ "Downgrade to Standard"
- ✅ "Downgrade subscription"
- ✅ "Downgrade plan"
- ✅ "Downgrade to Free"
- ✅ "Are you sure you want to downgrade? You'll lose access to Pro features."
- ❌ "Change to Standard" — Change implies a neutral, cost-free modification; use Downgrade for tier-based reductions
- ❌ "Cancel to Standard" — Downgrading to a free plan is a tier reduction, not a cancellation; use Downgrade to Free
- ❌ "Reduce your plan" — Informal and imprecise; use Downgrade

**Notes:** Downgrade always implies a directional move — to a lower tier, with reduced capability or cost. When the downgrade results in loss of features, always make this explicit in the confirmation copy before the action completes — ex. "Downgrade to Standard? You'll lose access to reporting tools and priority support." This is especially important when a user downgrades to a free plan, which may be mistaken for a cancellation — clarifying that the account and data are retained at the lower tier reduces confusion and unnecessary support contact.

---

### Driver

**Definition:** An individual who operates or controls a vehicle — including buses, trucks, and boats.

**Use when:** Referring to a person who operates a vehicle as their primary role — ex. "Assign a driver", "Driver profile", "Driver behavior." Use across fleet management, telematics, service, and any surface where the individual operating a vehicle is the subject.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Driver | ✅ Use | — |
| Driver [qualifier] | ✅ Use | Use when scoping the driver to a specific context adds clarity — ex. "Driver profile", "Driver behavior", "Driver ID" |
| Pilot | ❌ Avoid | Reserved for aircraft or watercraft in formal contexts — not the standard term for vehicle operators across Volvo product surfaces |
| Operator | ❌ Avoid | Reserved for individuals who control or operate machinery — ex. haulers, loaders, excavators — not vehicles — see Related terms |
| User | ❌ Avoid | Too generic — does not convey the vehicle-operating role; use Driver when the person's role is specifically vehicle operation |
| Chauffeur | ❌ Avoid | Implies a professional passenger transport role — too narrow and formal for general use across all vehicle types |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Operator | Referring to an individual who controls or operates machinery — ex. a hauler, loader, or excavator — rather than a vehicle | Operator is for machinery; Driver is for vehicles — never use as synonyms; the distinction reflects the difference in equipment type and operational context |
| Fleet manager | Referring to the individual responsible for overseeing and managing a group of vehicles and their drivers — not operating a vehicle directly | Fleet manager is a supervisory role; Driver is an operational role — both may appear in the same product but refer to distinct personas |
| Passenger | Referring to an individual traveling in a vehicle but not operating it | Passenger is always distinct from Driver — never use interchangeably on surfaces that distinguish between the two roles |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Driver / Vehicle | Referring to the person and the vehicle they operate as a pair — ex. in fleet assignment, telematics, or route management contexts | Always use Vehicle as the counterpart when referring to the Driver-equipment relationship — use Car when the vehicle is specifically a small private passenger vehicle — see Car and Vehicle entries |
| Driver / Fleet manager | Referring to the operational and supervisory roles within a fleet management context — ex. in access control, reporting, or communication surfaces | Driver and Fleet manager are distinct personas that may both appear in the same product — never conflate their roles in copy or navigation labels |

**In context:**

- ✅ "Assign a driver"
- ✅ "Driver profile"
- ✅ "Driver behavior"
- ✅ "Driver ID"
- ✅ "No driver assigned to this vehicle."
- ❌ "Assign a pilot" — Pilot is for aircraft contexts; use Driver for vehicle operators
- ❌ "Assign an operator" — Operator is for machinery; use Driver for vehicle operators
- ❌ "Driver or operator" — do not combine the two terms as if interchangeable; use Driver for vehicles and Operator for machinery separately

**Notes:** Driver and Operator are the two most important personnel terms in this glossary to keep distinct. Both refer to individuals who control equipment, but the equipment type determines the correct term — Driver for vehicles (buses, trucks, boats), Operator for machinery (haulers, loaders, excavators). On surfaces where both personas appear — ex. a fleet management platform that covers both vehicle fleets and construction equipment — the two terms must never be used interchangeably, and navigation labels must make the distinction clear to the user.

---

### Edit

**Definition:** The action of making changes to the content of an input field, record, or file — ex. updating a text value, modifying a data entry, or revising a document.

**Use when:** Describing the action of modifying existing content in an input field or file — ex. "Edit address", "Edit profile", "Edit document." Use on forms, data records, content management surfaces, and any surface where the user is changing the specific content of an existing item rather than adjusting a setting or preference.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Edit | ✅ Use | — |
| Edit [object] | ✅ Use | Always pair with the object being edited for clarity — ex. "Edit address", "Edit profile", "Edit document" |
| Update | ⚠️ Conditional | Acceptable — and preferred — when the edit has a strong time component, implying the content is being brought up to date — ex. "Update address", "Update payment details"; use Edit when no time component is present |
| Change | ❌ Avoid | Reserved for simple, cost-free modifications to settings or preferences — not for modifying the content of a specific field or file — see Related terms |
| Modify | ❌ Avoid | Reserved for technical modifications to system-level or hardware settings — see Related terms |
| Adjust | ❌ Avoid | Reserved for technical modifications — not for content-level changes in input fields or files — see Related terms |
| Review | ❌ Avoid | Implies reading or assessing content — not making changes to it |
| Revise | ❌ Avoid | Implies correcting or improving something previously submitted — not a general content editing action |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Change | The user is making a simple, cost-free modification to a setting or interface preference — ex. "Change theme", "Change language" | Change operates on settings and preferences; Edit operates on the content of a specific field or file — never use as synonyms — see Change entry |
| Adjust or Modify | The user is making a technical modification to a system-level or hardware parameter — ex. "Adjust internal lighting", "Modify sensor sensitivity" | Adjust and Modify are for technical parameters; Edit is for user-facing content in input fields and files |
| Activate or Deactivate | The user is switching the default state of a feature or item on or off — ex. "Activate autopilot", "Deactivate automatic updates" | Activate/Deactivate operate on default states; Edit operates on content — never use as synonyms |
| Upgrade or Downgrade | The user is making a tier-based change with an attached cost — ex. "Upgrade to Pro", "Downgrade to Standard" | Upgrade/Downgrade are for paid tier changes; Edit is for cost-free content modifications — never use as synonyms |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Edit / Save | Describing the action of modifying content and recording those changes — ex. in a form or document editing flow | Always use Save as the completion counterpart — never "Confirm" or "Apply" when the action is specifically recording edited content |
| Edit / Cancel | Presenting the user with the option to modify content or abandon the editing session without saving | Use Cancel as the exit counterpart — editing sessions should always offer a way to abandon changes without saving — see Cancel entry |

**In context:**

- ✅ "Edit address"
- ✅ "Edit profile"
- ✅ "Edit document"
- ✅ "Edit payment details"
- ❌ "Change address" — Change is for settings and preferences, not content fields; use Edit address
- ❌ "Modify address" — Modify is for technical parameters; use Edit for user-facing content fields
- ❌ "Update address" — Update implies improvement or currency; use Edit for neutral content modification <!-- inferred -->
- ❌ "Review address" — Review implies reading, not modifying; use Edit <!-- inferred -->

**Notes:** Edit is specifically scoped to content modification — changing what is written, entered, or stored in a field or file. Four boundaries matter most in practice: Edit vs. Change (content vs. settings), Edit vs. Adjust/Modify (user-facing content vs. technical parameters), Edit vs. Activate/Deactivate (content vs. default state), and Edit vs. Upgrade/Downgrade (free content change vs. paid tier change). When a modification crosses any of these boundaries, the more specific term always takes precedence over Edit.

---

### Error

**Definition:** A message that calmly and firmly communicates an issue already affecting the user, or an existing issue that will escalate unless the user takes action — ex. a failed payment, an engine that must be stopped to prevent damage. The most severe tier in the standard system message hierarchy.

**Use when:** Referring to a message that communicates an active or escalating issue requiring immediate user action — ex. "Payment error", "Connection error", "Engine error." Use in error states, system failures, and any surface where an existing issue is affecting the user's experience or risks worsening without intervention. When the issue carries physical harm or life-threatening implications, use Critical or Danger instead.

**Tone of voice:** Reassuring, helpful, firm. Acknowledge the issue without alarming the user; focus on what they can do next. Never use panic-inducing language — ex. "FATAL" or "CRITICAL" — in standard error messages.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Error | ✅ Use | Use sentence case as a message label or status indicator — ex. "Error", "Payment error"; lowercase in body copy — ex. "A payment error occurred" |
| [Type] error | ✅ Use | Use when specifying the error type adds clarity — ex. "Connection error", "Validation error", "Server error" |
| Critical | ⚠️ Conditional | Use instead of Error when the issue carries physical harm or life-threatening implications — ex. "Critical: Engine overheating" |
| Danger | ⚠️ Conditional | Use instead of Error when the issue carries an immediate risk of physical harm or life-threatening consequences — ex. "Danger: Risk of fire" |
| Warning | ❌ Avoid | Reserved for creating friction around destructive or irreversible user actions, or alerting to a required action — not for issues already affecting the user — see Related terms |
| Caution | ❌ Avoid | Reserved for alerting the user about a potential upcoming issue that hasn't occurred yet — not for active or escalating issues — see Related terms |
| Alert | ❌ Avoid | Not part of the system message hierarchy — see Notes |
| Failure | ❌ Avoid | Implies a complete and unrecoverable breakdown — too alarming for user-facing copy; reserve for system-level technical documentation |
| Issue | ⚠️ Conditional | Acceptable in body copy where a softer tone reduces user anxiety — ex. "There's an issue with your payment"; not appropriate as a label or status indicator |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Warning | Creating friction in a destructive or irreversible user action, or alerting the user to a required action — ex. "Account deletion is permanent", "Your inbox is full" | Warning anticipates or gates an action; Error addresses an issue already in progress — never use as synonyms |
| Caution | Alerting the user about a potential upcoming issue not yet in effect — ex. "Beta feature", "Limited time left to schedule maintenance" | Caution is preventive; Error is reactive — never use as synonyms |
| Success | Confirming the positive outcome of a user or system-generated action — ex. "Purchase confirmed", "Account activated" | Success and Error are the two primary outcome states — always pair them consistently across the same surface |
| Neutral | Sharing non-critical, passive information with no required user action — ex. "File history deleted", "Download in progress" | Neutral is the lowest severity tier; Error is the highest standard tier — never use as synonyms |
| Info message | Communicating non-critical product, service, or system information — ex. feature launches, tips | Info message is informational and non-blocking; Error requires action — never use as synonyms |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Error / Success | Describing the two primary outcome states of a user action or system event — something went wrong vs. something completed as expected | Always use Success as the positive counterpart — never "Complete", "Done", or "OK" as a state label when the negative counterpart is Error |
| Error / Retry | Presenting the user with the error state and the primary recovery action — ex. "Connection error. Try again." | Always provide a recovery path alongside an error message — never leave the user without a next step — see error messages skill |

**In context:**

- ✅ "Payment error"
- ✅ "Connection error"
- ✅ "Engine error — stop the vehicle to prevent damage."
- ✅ "An error occurred while loading your data. Try again."
- ✅ "Critical: Engine overheating" — when physical harm is a risk
- ❌ "Payment warning" — Warning is for friction on destructive actions or required actions; use Error for issues already affecting the user
- ❌ "Payment caution" — Caution is for potential upcoming issues; use Error for active issues
- ❌ "Payment failure" — Failure is too alarming; use Payment error

**Notes:** Error sits at the top of a six-level system message hierarchy. From lowest to highest severity: Neutral (passive, non-critical information) → Info message (non-critical product or system information) → Success (positive action outcome) → Caution (potential upcoming issue, preventive) → Warning (friction on destructive actions or required action alert) → Error (active or escalating issue requiring user action). Critical and Danger extend beyond the standard Error tier for messages with physical harm or life-threatening implications. The six levels are never interchangeable — each maps to a specific situation, tone, and user emotional state. For full error message writing guidance, refer to the error messages skill.

---

### Exit

**Definition:** The action of moving the user outside an app, mode, or view — returning them to a prior context beyond the current surface.

**Use when:** Describing the action of leaving an app, mode, or view entirely — ex. "Exit Satellite View", "Exit full screen", "Exit guided mode." Use when the user is moving outside a defined context, not dismissing a UI layer or abandoning a flow within the product.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Exit | ✅ Use | — |
| Exit [object] | ✅ Use | Always pair with the context being exited for clarity — ex. "Exit Satellite View", "Exit full screen", "Exit guided mode" |
| Close | ❌ Avoid | Reserved for dismissing a notification, modal, or view — not for moving outside an app, mode, or view — see Related terms |
| Cancel | ❌ Avoid | Reserved for abandoning a flow or process without saving progress — not for leaving a defined context or mode — see Related terms |
| Leave | ⚠️ Conditional | Acceptable in social or collaborative contexts where the user is departing from a shared space — ex. "Leave group", "Leave meeting"; not a general synonym for Exit in app or mode contexts |
| Quit | ⚠️ Conditional | Acceptable when referring to closing an entire application at the OS level — ex. "Quit app"; not for exiting a specific mode or view within a product |
| Back | ❌ Avoid | Returns the user to the previous step within a flow — does not exit a mode or app context — see Back entry |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Close | The user is dismissing a notification, modal, panel, or overlay — returning to the surface beneath it without leaving an app or mode | Close removes a UI layer; Exit moves the user outside a defined context — never use as synonyms — see Close entry |
| Cancel | The user is abandoning an active flow or process — typically without saving progress | Cancel exits a flow; Exit exits a mode or app context — both result in leaving something, but at different levels of the product — see Cancel entry |
| Back | The user is returning to the previous step in a flow without exiting it | Back navigates within a flow; Exit leaves an app, mode, or view entirely — never use as synonyms — see Back entry |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Exit / Enter | Describing the two states of entering and leaving a specific mode or view — ex. "Enter Satellite View / Exit Satellite View" | Always use Enter as the counterpart when the mode has an explicit entry point — never "Open" or "Start" when Exit is the label for leaving |
| Exit / Save | Presenting the user with the option to leave a mode or view and record any changes made within it — ex. in an editing mode or configuration view | When Exit would result in unsaved changes, always pair it with a Save prompt before completing the action — never allow Exit to silently discard changes |

**In context:**

- ✅ "Exit Satellite View"
- ✅ "Exit full screen"
- ✅ "Exit guided mode"
- ✅ "Exit and save" — when leaving a mode that contains unsaved changes
- ❌ "Close Satellite View" — Close dismisses a UI layer; use Exit when leaving a mode or view entirely
- ❌ "Cancel Satellite View" — Cancel abandons a flow; use Exit when leaving a defined app context or mode
- ❌ "Back to map" — Back navigates within a flow; use Exit when leaving a mode context entirely

**Notes:** Exit, Close, and Cancel are the three most commonly confused dismissal terms in this glossary because all three result in the user leaving something. The distinction is what is being left and what the consequences are. Exit moves the user outside an app, mode, or view — the context itself is left behind. Close removes a UI layer — the underlying surface remains. Cancel abandons a flow — progress is typically lost. When Exit would result in data loss or unsaved changes, always surface a confirmation prompt before completing the action — ex. "Exit guided mode? Your progress will be lost."

---

### Favorites

**Definition:** A user-curated list, page, or section that stores items previously marked by the user for future use or quick access — including products, content, settings, payment methods, addresses, connections, and more.

**Use when:** Referring to the list, page, or section that contains items the user has explicitly saved for future use or reference — ex. "Favorites", "Add to favorites", "View your favorites." Use as a navigation label, section title, or feature name across any surface where the user can save and retrieve personally marked items.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Favorites | ✅ Use | Sentence case as a navigation label or section title — ex. "Favorites"; lowercase in body copy — ex. "View your favorites" |
| Favorited | ✅ Use | Use as a status indicator when an item has been marked — ex. "Favorited", "Item favorited" |
| Preferred | ❌ Avoid | Implies a system-assigned or default preference — not a user-curated personal selection |
| Top | ❌ Avoid | Implies a ranked or algorithmically ordered list — not a user-curated collection |
| Saved | ⚠️ Conditional | Acceptable as a section label when the product's saving mechanic is distinct from favoriting — ex. "Saved items", "Saved addresses"; not a general synonym for Favorites when both concepts exist in the same product |
| Bookmarks | ⚠️ Conditional | Acceptable in content-heavy or browser-adjacent products where bookmarking is the established convention — ex. a documentation portal or reading app; not appropriate for products where Favorites is the established term |
| Starred | ⚠️ Conditional | Acceptable when the UI uses a star icon as the marking mechanism and the product convention aligns — ex. in email or task management tools; not a general synonym for Favorites |
| Wishlist | ❌ Avoid | Implies items the user wants to acquire — too specific to commerce contexts to serve as a general synonym for Favorites |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Add to favorites | Referring to the action of marking an item for inclusion in the user's favorites list | Add to favorites is the action; Favorites is the destination — always use Add to favorites as the CTA label, never "Favorite" alone as a verb |
| Save | Referring to the action of recording a specific item — ex. an address, payment method, or search — for reuse, in a product where Save and Favorites are distinct mechanics | Use Save when the product distinguishes between saving functional items (ex. addresses) and marking content items as favorites — if only one mechanic exists, use Favorites consistently |
| History | Referring to a chronological log of items the user has previously accessed — not items they have deliberately marked for future use | History is passive and automatic; Favorites is deliberate and user-curated — never use as synonyms |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Add to favorites / Remove from favorites | Describing the action of marking and unmarking an item in the user's favorites list | Always use Remove from favorites as the counterpart — never "Unfavorite", "Delete from favorites", or "Deselect" |
| Favorites / History | Referring to the two user-facing content lists — one curated by the user, one generated automatically by the system | Favorites and History are distinct and complementary — both may appear in the same navigation but should never be labeled interchangeably |

**In context:**

- ✅ "Favorites"
- ✅ "Add to favorites"
- ✅ "Remove from favorites"
- ✅ "View your favorites"
- ✅ "No favorites yet. Add items to access them quickly."
- ❌ "Preferred items" — Preferred implies a system-assigned default; use Favorites for user-curated selections
- ❌ "Top items" — Top implies ranking or algorithmic ordering; use Favorites for user-marked collections
- ❌ "Wishlist" — too commerce-specific; use Favorites for a general user-curated list

**Notes:** Favorites is always user-curated and deliberate — items appear because the user chose to mark them, not because the system ranked or recommended them. This distinguishes Favorites from History (automatic), Recommended (algorithmic), and Top (ranked). On products where Save and Favorites coexist — ex. saving a payment method vs. favoriting a vehicle — keep the two mechanics distinct in both copy and UI to avoid user confusion about where a marked item will appear.

---

### Feedback

**Definition:** User input regarding their experience with an app, product, or service — including ratings, reviews, survey responses, bug reports, and open-ended comments.

**Use when:** Referring to any form of user-provided input about their experience — ex. "Share feedback", "Submit feedback", "Give feedback." Use on feedback prompts, rating surfaces, survey flows, bug report forms, and any surface where the user is invited to communicate their experience or opinion about the product.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Feedback | ✅ Use | Sentence case as a section or button label — ex. "Feedback"; lowercase in body copy — ex. "Share your feedback" |
| Share feedback | ✅ Use | Preferred CTA form — ex. "Share feedback"; more inviting than "Submit feedback" for open-ended input |
| Submit feedback | ✅ Use | Acceptable when the feedback is being sent through a structured form — ex. "Submit feedback"; use Share feedback for open-ended or conversational prompts |
| Review | ⚠️ Conditional | Acceptable when the feedback is specifically a public-facing product or service review — ex. "Write a review", "Leave a review"; not a general synonym for Feedback |
| Rating | ⚠️ Conditional | Acceptable when the feedback mechanism is specifically a numerical or star-based score — ex. "Leave a rating"; not a general synonym for Feedback |
| Report | ⚠️ Conditional | Acceptable when the feedback specifically concerns a bug, issue, or policy violation — ex. "Report a bug", "Report an issue"; not a general synonym for Feedback |
| Comment | ❌ Avoid | Too narrow — implies only text-based input and excludes ratings, surveys, and other feedback types |
| Opinion | ❌ Avoid | Informal and subjective — does not convey the structured, product-improvement purpose of user feedback |
| Complaint | ❌ Avoid | Implies exclusively negative input — Feedback covers the full range of user experience input, positive and negative |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Review | The feedback is specifically a public-facing evaluation of a product or service — ex. "Rate and review your experience" | Review is a specific type of Feedback intended for public display — not all feedback is a review |
| Rating | The feedback mechanism is specifically a score — ex. a star rating or NPS score — rather than open-ended input | Rating is a specific feedback format; Feedback is the broader category that includes ratings, reviews, and open-ended responses |
| Report | The user is flagging a bug, issue, or policy violation — ex. "Report a bug", "Report this content" | Report is a specific type of Feedback directed at the product team for action — not general experience input |
| Survey | The feedback is being collected through a structured set of questions — ex. "Complete our survey" | Survey is a feedback collection method — not a synonym for Feedback itself; "Take our survey" is correct, not "Share your survey" |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Feedback / Response | Referring to the user's input and the product team's reply — ex. in a support or feedback management context | Response is the product team's counterpart to user Feedback — use Response for the reply, never "Reply" or "Answer" in formal feedback management copy |
| Share feedback / Thank you | Presenting the feedback prompt and the post-submission acknowledgement as a pair — ex. "Share feedback" → "Thank you for your feedback" | Always follow a feedback submission with an acknowledgement — never leave the user without confirmation that their input was received |

**In context:**

- ✅ "Share feedback"
- ✅ "Submit feedback"
- ✅ "Give feedback"
- ✅ "Your feedback helps us improve."
- ✅ "Thank you for your feedback."
- ❌ "Leave a comment" — Comment implies text-only input; use Share feedback for open-ended product experience input
- ❌ "Share your opinion" — Opinion is informal; use Share feedback
- ❌ "Submit a complaint" — Complaint implies exclusively negative input; use Share feedback or Report an issue for specific problem reporting

**Notes:** Feedback is the umbrella term for all forms of user input about their experience. Rating, Review, Report, and Survey are all specific types or formats of feedback — each has its own entry in this glossary or should be treated as a qualified form of the broader term. When the feedback mechanism is specific — ex. a star rating, a bug report form, or a public review — use the more specific term rather than Feedback alone, as it sets clearer expectations for the user about what they are being asked to provide. When the mechanism is open-ended or multi-format, Feedback is always the right choice.

---

### Filter

**Definition:** The action of narrowing down a data set or list of items based on criteria chosen by the user — ex. filtering by age, location, or status.

**Use when:** Describing the action or mechanism of reducing a displayed set of items based on user-selected criteria — ex. "Filter by age", "Filter results", "Apply filters." Use on list views, search result pages, dashboards, and any surface where the user can narrow down a data set without entering a free-text query. Filter can refer to both the action and the UI control that enables it.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Filter | ✅ Use | Both as a noun — ex. "Apply a filter", "Active filters" — and as a verb — ex. "Filter by age", "Filter results" |
| Filter by [criteria] | ✅ Use | Use when naming the criteria adds clarity — ex. "Filter by age", "Filter by location", "Filter by status" |
| Filters | ✅ Use | Use as a plural noun for the section label or control group — ex. "Filters", "Show filters", "Clear filters" |
| Segment | ❌ Avoid | Implies dividing a data set into defined groups — a system-side or analytical operation, not a user-initiated narrowing action |
| Refine | ❌ Avoid | Implies improving or polishing a result set — not a neutral, criteria-based narrowing action |
| Sort | ❌ Avoid | Reorders items within a set without reducing it — not a synonym for Filter, which removes items that don't meet the criteria |
| Search | ❌ Avoid | Presents results based on a free-text user query — not criteria-based narrowing of an existing set — see Related terms |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Search | Presenting results based on a free-text query entered by the user — ex. "Search by keyword", "Search vehicles" | Search retrieves results from a query; Filter narrows an existing result set by criteria — the two frequently coexist but are never synonymous |
| Sort | Reordering an existing set of items by a specific attribute — ex. "Sort by date", "Sort by price" | Sort changes the order of items without removing any; Filter removes items that don't match the selected criteria — never use as synonyms |
| Clear | Removing all active filter criteria to return the full unfiltered data set — ex. "Clear filters", "Clear all" | Clear is the reset counterpart to Filter — see Clear entry and Paired terms |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Filter / Clear | Presenting the user with the option to apply criteria and remove all active filters — ex. in a filter panel or search surface | Always use Clear as the counterpart — never "Reset filters", "Remove filters", or "Undo filters", unless Reset is already established as the product convention — see Clear entry |
| Filter / Sort | Presenting the user with both narrowing and reordering controls on the same surface — ex. a list or search results view | Filter and Sort are complementary controls — Filter reduces the set; Sort reorders it — always label them distinctly when both are present on the same surface |
| Show filters / Hide filters | Toggling the visibility of the filter panel or control group — ex. on mobile or compact layouts where filters are collapsed by default | Always use Hide filters as the counterpart to Show filters — never "Close filters" or "Remove filters" when the action only toggles panel visibility |

**In context:**

- ✅ "Filter by age"
- ✅ "Filter results"
- ✅ "Apply filters"
- ✅ "Active filters: Age, Location"
- ✅ "Show filters" / "Hide filters"
- ❌ "Segment by age" — Segment implies system-defined grouping; use Filter for user-initiated narrowing
- ❌ "Refine by age" — Refine implies improvement, not criteria-based narrowing; use Filter
- ❌ "Sort by age" — Sort reorders items without removing them; use Filter when items are excluded based on criteria
- ❌ "Search by age" — Search is query-driven; use Filter for criteria-based narrowing of an existing set

**Notes:** Filter and Sort are the two most commonly paired — and confused — controls on list and search surfaces. The distinction is simple but important: Filter reduces the set by removing items that don't match the criteria. Sort reorders the remaining items. Both can appear on the same surface and should always be labeled distinctly. When Filter and Search coexist, Filter operates on the displayed result set; Search generates a new result set from a query. The two mechanisms are complementary, not interchangeable.

---

### Get started / Get [item]

**Definition:** An action that initiates a user flow or provides the user with access to a specific item — ex. an app, report, or discount.

**Use when:** Labeling the action that begins a flow or grants access to a specific item. Use "Get started" when initiating an open-ended flow without a specific named item — ex. "Get started with Driver Guide." Use "Get [item]" when the item being accessed is specific and named — ex. "Get 25% off", "Get the report." Always include a clear description or the name of the item when using the "Get [item]" formula.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Get started | ✅ Use | Use to initiate an open-ended flow or onboarding experience — ex. "Get started with Driver Guide", "Get started" |
| Get [item] | ✅ Use | Use when the item is specific and named — ex. "Get 25% off", "Get the report", "Get early access"; never use "Get" alone without a clear object |
| Catch | ❌ Avoid | Informal and imprecise — does not convey initiating a flow or accessing an item |
| Have | ❌ Avoid | Informal and grammatically ambiguous as an action label — does not convey the sense of obtaining or initiating |
| Take | ❌ Avoid | Implies physical acquisition — not appropriate for digital flows or access to items |
| Gain | ❌ Avoid | Formal and transactional — does not convey the inviting, accessible tone of Get started or Get [item] |
| Obtain | ❌ Avoid | Formal and impersonal — not appropriate for conversational user-facing copy |
| Buy | ⚠️ Conditional | Use instead of Get [item] when the item has an attached cost — ex. "Buy this plan"; never use Get when a payment is required — see Buy entry |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Start | Immediately initiating a specific feature, process, or item — ex. "Start navigation", "Start free trial" | Start is direct and immediate; Get started is inviting and introductory — use Start when the action launches something specific, Get started when it begins a broader flow or onboarding experience |
| Buy | The item being accessed has an attached cost — ex. "Buy this plan", "Buy an extension" | Get implies free access; Buy signals a paid transaction — never use Get when a cost is involved — see Buy entry |
| Download | The item being accessed is a file or app being transferred to the user's device — ex. "Download the report", "Download the app" | Use Download when the specific mechanism is a file transfer — not Get, which is more general — see Download entry |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Get started / Continue | Presenting the entry point to a flow and the action for returning to it — ex. in onboarding or multi-session flows | Use Continue when the user is returning to a flow already in progress — Get started is for first-time entry only; once started, the action becomes Continue |
| Get [item] / Buy [item] | Presenting both a free and a paid acquisition option on the same surface — ex. a pricing page with a free tier and a paid tier | Always use Get for free items and Buy for paid items on the same surface — never mix the two for items of the same type |

**In context:**

- ✅ "Get started"
- ✅ "Get started with Driver Guide"
- ✅ "Get 25% off"
- ✅ "Get the report"
- ✅ "Get early access"
- ❌ "Get" — never use alone without a named object or "started"
- ❌ "Catch the deal" — informal; use "Get 25% off" or name the specific offer
- ❌ "Obtain access" — formal and impersonal; use "Get access" or "Get started"
- ❌ "Gain early access" — formal; use "Get early access"
- ❌ "Get this plan" — when the plan has a cost; use "Buy this plan" — see Buy entry

**Notes:** Get started and Get [item] serve two distinct purposes that share the same verb. Get started initiates a flow — it sets expectations of a journey beginning. Get [item] provides access to something specific — it sets expectations of immediate delivery. Never use Get alone as a label, and never use Get when a cost is attached to the item — the Buy / Get distinction is the primary copy signal for paid vs. free acquisition across this glossary. When both a free and paid option exist on the same surface, Get and Buy must appear consistently and never be swapped.

---

### Go back

**Definition:** A navigation action that returns the user to the previous page or step in a flow.

**Use when:** Labeling the action that returns the user to the previous page or step — ex. "Go back", "Go back to results." Go back is the preferred full form; use it whenever spacing allows. Use Back alone only in space-constrained surfaces — ex. a mobile header or narrow step indicator. See Back entry.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Go back | ✅ Use | Preferred form — use whenever spacing allows |
| Go back to [destination] | ✅ Use | Use when naming the destination adds clarity or reassurance — ex. "Go back to results", "Go back to dashboard" |
| Back | ✅ Use | Acceptable in space-constrained surfaces only — ex. a mobile header or narrow step indicator — see Back entry |
| Return | ❌ Avoid | Implies completing a round trip or reversing a transaction — not a neutral navigation action |
| Go to previous | ❌ Avoid | Verbose and unnatural — Go back conveys the same meaning more concisely |
| Undo | ❌ Avoid | Reverses a completed action or change — not a navigation step — see Back entry |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Go to [destination] | Directing the user to a specific named destination within or outside their current UI — ex. "Go to settings", "Go to dashboard" | Go to [destination] is forward navigation to a known place; Go back is backward navigation to the previous step — never use as synonyms |
| Cancel | The user is abandoning a flow or process entirely — typically without saving progress | Cancel exits the flow; Go back stays within it and preserves progress — never use as synonyms — see Cancel entry |
| Close | The user is dismissing a modal, panel, or overlay — not navigating within a linear flow | Close removes a UI layer; Go back moves the user to a prior step in a sequence — see Close entry |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Go back / Continue | Navigating backward and forward within a multi-step flow where the user has engaged with the current step | Use Continue as the forward counterpart when meaningful progression is implied — see Continue entry |
| Go back / Next | Navigating backward and forward in a sequenced flow where steps are clearly numbered and no meaningful action is required on the current step | Use Next as the forward counterpart in mechanical step-based flows — ex. a numbered onboarding carousel — see Back entry |

**In context:**

- ✅ "Go back"
- ✅ "Go back to results"
- ✅ "Go back to dashboard"
- ❌ "Return" — implies a round trip or transaction reversal; use Go back
- ❌ "Go to previous" — verbose; use Go back
- ❌ "Cancel" — when the user is only returning to the previous step, not abandoning the flow; use Go back
- ❌ "Go to step 1" — when navigating to the immediately preceding step; use Go back for step-by-step backward navigation

**Notes:** Go back and Cancel are the most important pair to keep distinct in multi-step flows. Go back preserves the user's progress and keeps them within the flow. Cancel exits the flow entirely and typically discards unsaved input. When both actions are available on the same surface, both labels must be present and visually distinct — Go back as a secondary text link, Cancel as a clearly labeled exit action. For the space-constrained standalone form, see the Back entry.

---

### Go to [destination]

**Definition:** A navigation action that directs the user to a specific named destination within or outside their current UI.

**Use when:** Labeling a link or action that sends the user to a specific, named destination — ex. "Go to profile", "Go to Help Center", "Go to settings." Always include the name or a clear description of the destination — never use "Go to" alone. Use for destinations within the current product UI and, when the channel is unspecified, for destinations outside it. When the destination is explicitly outside the current UI, prefer Visit — see Related terms.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Go to [destination] | ✅ Use | Always include the destination name — ex. "Go to profile", "Go to Help Center", "Go to settings" |
| Go home | ✅ Use | Use specifically for navigating to the product's home or main landing page — never "Go to home" |
| Go to homepage | ✅ Use | Acceptable alternative to Go home when clarifying the destination as a web page — ex. in an error state or a cross-domain redirect |
| Go to home | ❌ Avoid | Unnatural phrasing — use Go home or Go to homepage instead |
| Go to | ❌ Avoid | Never use without a named destination — always complete the formula with a specific description or name |
| Navigate to [destination] | ❌ Avoid | Technical and impersonal — not appropriate for user-facing navigation labels |
| Head to [destination] | ❌ Avoid | Informal and idiomatic — not appropriate for UI copy |
| Visit [destination] | ⚠️ Conditional | Use when the destination is explicitly outside the user's current UI — ex. "Visit the Help Center", "Visit volvogroup.com" — see Related terms |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Visit [destination] | The destination is explicitly outside the user's current UI — ex. an external website, a physical location, or a separate product | Use Visit when the transition takes the user outside the current product — Go to [destination] when they stay within it; the two can coexist in the same navigation when destinations are mixed |
| Go back | The user is returning to the previous page or step in a flow — not navigating forward to a named destination | Go back is backward navigation; Go to [destination] is forward navigation — never use as synonyms — see Go back entry |
| Go home / Go to homepage | The specific destination is the product's home or main landing page | Use the dedicated forms rather than "Go to home" — see Variant forms |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Go to [destination] / Go back | Presenting forward and backward navigation options on the same surface — ex. an error state or a dead-end page | Go to [destination] moves the user forward to a specific place; Go back returns them to where they came from — both may appear together on error or not-found pages |
| Go to [destination] / Visit [destination] | Presenting navigation to both internal and external destinations on the same surface | Use Go to for internal destinations and Visit for external ones — never mix the two labels for destinations of the same type |

**In context:**

- ✅ "Go to profile"
- ✅ "Go to Help Center"
- ✅ "Go to settings"
- ✅ "Go home"
- ✅ "Go to homepage"
- ✅ "Visit volvogroup.com" — external destination
- ❌ "Go to home" — unnatural; use Go home or Go to homepage
- ❌ "Go to" — never use without a named destination
- ❌ "Navigate to profile" — technical and impersonal; use Go to profile
- ❌ "Head to the Help Center" — informal; use Go to Help Center
- ❌ "Visit settings" — Visit is for external destinations; use Go to settings for in-product navigation

**Notes:** Go to [destination] and Visit [destination] can coexist on the same surface when a page contains both internal and external links — ex. a support page that links to in-product settings ("Go to settings") and an external knowledge base ("Visit the Help Center"). When both appear together, apply the labels consistently: Go to for every internal link, Visit for every external one. Never use Go to for an external destination or Visit for an internal one on the same surface, as the inconsistency removes the navigational signal the distinction provides.

---

### Help Center

**Definition:** The page or section of a product that contains support content and features — including articles, guides, FAQs, and contact options — to help users resolve issues and answer questions.

**Use when:** Referring to the dedicated support content destination within or linked from the product — ex. "Go to Help Center", "Visit the Help Center", "Search the Help Center." Help Center is a proper noun and always capitalized. Use as a navigation label, link destination, or reference in error messages and onboarding copy.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Help Center | ✅ Use | Always capitalize as a proper noun — ex. "Visit the Help Center", "Go to Help Center" |
| Help center | ❌ Avoid | Incorrect casing — Help Center is a proper noun and must always be capitalized |
| Support center | ❌ Avoid | Not the established term for this product surface — use Help Center consistently |
| Help page | ❌ Avoid | Too narrow — implies a single page rather than a dedicated support content destination |
| Help | ⚠️ Conditional | Acceptable as a navigation label in space-constrained UI — ex. a header icon or footer link; not a substitute for Help Center when the full name fits |
| FAQs | ❌ Avoid | Refers to a specific content format within the Help Center — not the destination itself |
| Knowledge base | ⚠️ Conditional | Acceptable in developer-facing or enterprise contexts where the term is established — not appropriate for standard user-facing copy where Help Center is the product term |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Support | Referring to the team or service that provides direct information and assistance to the user — ex. "Contact Support", "Chat with Support" | Support is the human service; Help Center is the self-serve content destination — the two coexist but serve different user intents |
| Contact | Referring to the generic action of reaching out to a person or team for help — ex. "Contact Support", "Contact us" | Use Contact when the user needs human assistance — Help Center when they can resolve the issue through self-serve content — see Contact entry |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Help Center / Support | Presenting both a self-serve content destination and a human assistance option on the same surface — ex. in an error message or a support escalation flow | Help Center first, Support second — lead with self-serve before escalating to human contact; never use the two labels interchangeably |
| Search the Help Center / Contact Support | Presenting the two primary resolution paths when a user encounters an issue — ex. in error states, empty states, or onboarding | Search the Help Center for self-serve resolution; Contact Support for direct assistance — always offer both when neither can be ruled out |

**In context:**

- ✅ "Go to Help Center"
- ✅ "Visit the Help Center"
- ✅ "Search the Help Center"
- ✅ "Find answers in the Help Center."
- ✅ "Help" — space-constrained navigation label only
- ❌ "Go to support center" — not the established term; use Help Center
- ❌ "Visit the help page" — too narrow; use Help Center
- ❌ "Check the FAQs" — FAQs is a content format, not the destination; use Help Center
- ❌ "Visit the knowledge base" — informal product term; use Help Center in standard user-facing copy

**Notes:** Help Center and Support describe two distinct resolution paths. Help Center is self-serve — the user finds answers independently through content. Support is assisted — a person or team helps the user directly. In error messages, empty states, and escalation flows where both options are presented, always lead with Help Center and follow with Support. This reduces support volume by encouraging self-serve first while ensuring the human fallback is always visible and accessible.

---

### Home / Homepage

**Definition:** The initial page or view of a website, app, or service — the primary landing surface a user reaches on first entry or when navigating to the root of the product.

**Use when:** Referring to the starting page or view of a website, app, or service — ex. "Go to homepage", "Go home", "Return to home." Use Home as a navigation label within the product UI; use Homepage when the destination is specifically a web page, or when clarity about the destination type is needed — ex. in error states or cross-domain redirects.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Home | ✅ Use | Preferred navigation label within the product UI — ex. "Home" as a nav item, "Go home" as an action |
| Homepage | ✅ Use | Preferred when referring specifically to the web page root — ex. "Go to homepage", "Visit the homepage"; use in error states and cross-domain copy |
| Go home | ✅ Use | Standard action label for navigating to the product's main landing page — see Go to [destination] entry |
| Go to homepage | ✅ Use | Acceptable when the destination is specifically a web page — ex. in a 404 error or cross-domain redirect |
| Go to home | ❌ Avoid | Unnatural phrasing — use Go home or Go to homepage instead — see Go to [destination] entry |
| Landing page | ❌ Avoid | Refers to a marketing or campaign-specific entry page — not the product's primary starting surface |
| Main page | ❌ Avoid | Vague and non-standard — does not convey the navigational role of the home surface |
| Start page | ❌ Avoid | Implies a configured entry point — not the standard term for a product's primary landing surface |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Dashboard | Referring to the product's primary data display and control surface — which may serve as the home view in some products | Dashboard is a functional surface; Home is a navigational concept — in products where the dashboard is the home view, use the label the product has established rather than treating them as interchangeable |
| Go to [destination] | Directing the user to any named destination within or outside the product | Go home and Go to homepage are specific applications of the Go to [destination] pattern — see Go to [destination] entry |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Home / [Current section] | Displaying the user's navigational position relative to the home surface — ex. in a breadcrumb trail or error page | Home is always the root of the breadcrumb — never label it with the product name alone in navigational copy |
| Go home / Go back | Presenting the option to return to the home surface or to the immediately preceding step — ex. on an error or not-found page | Go home returns the user to the root of the product; Go back returns them to the previous step — both may appear together on error pages where the previous step is not the home surface |

**In context:**

- ✅ "Home" — navigation label
- ✅ "Homepage" — web page reference
- ✅ "Go home"
- ✅ "Go to homepage"
- ✅ "Take me back to the homepage." — error state copy
- ❌ "Go to home" — unnatural phrasing; use Go home or Go to homepage
- ❌ "Visit the landing page" — Landing page is a marketing term; use Homepage for the product's primary web entry point
- ❌ "Go to the main page" — vague and non-standard; use Go home or Go to homepage
- ❌ "Go to the start page" — implies a configured entry point; use Go home

**Notes:** Home and Homepage describe the same destination but signal different contexts. Home is a navigational label — it appears in menus, breadcrumbs, and action buttons within the product. Homepage emphasizes the web page nature of the destination — it appears in error states, cross-domain links, and marketing copy where the distinction between a page and an in-app view matters. In products where the home view is a dashboard, use whichever label the product has established as the primary navigation term — Home and Dashboard are not automatically interchangeable.

---

### Inactive

**Definition:** The state of an item that is currently not operational, enabled, or in use.

**Use when:** Describing an item that is not operational at the present time — ex. "Inactive account", "Inactive subscription", "3 inactive vehicles." Use as a status label, filter option, or state indicator across any product surface where items can be turned on or off, enabled or disabled, or started and stopped. Always use as the counterpart to Active — see Active entry and Paired terms.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Inactive | ✅ Use | Capitalize as a status label — ex. "Inactive"; lowercase in body copy — ex. "This account is inactive" |
| Disabled | ⚠️ Conditional | Acceptable when referring specifically to a feature or toggle that has been switched off — not for accounts, orders, or entities with a broader operational state; also carries accessibility implications as a UI component state |
| Off | ⚠️ Conditional | Acceptable for binary toggle controls only — ex. "Notifications: Off"; too reductive for entity or account states |
| Deactivated | ⚠️ Conditional | Acceptable when the item has been explicitly deactivated by a user or admin action — implies intentional intervention; use Inactive as the neutral status label when no specific action triggered the state |
| Paused | ⚠️ Conditional | Acceptable when the item is in a temporary, intentionally suspended state — ex. "Paused subscription"; use only when Paused is technically distinct from Inactive in the product |
| Expired | ⚠️ Conditional | Acceptable when the item's inactive state is specifically caused by a time limit or end date — ex. "Expired subscription", "Expired session"; not a general synonym for Inactive |
| Offline | ❌ Avoid | Describes a connectivity or network state — not an operational status; see Online / Offline in the connection and device entries |
| Dormant | ❌ Avoid | Implies a long period of inactivity — too specific and formal for standard status labels |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Active | Describing an item that is currently operational, enabled, or in use | Active is the canonical counterpart to Inactive — always use together when both states are possible on the same surface — see Active entry |
| Disabled | Referring specifically to a feature, setting, or toggle that has been switched off — not an account, order, or broader operational entity | Disabled is for features and toggles; Inactive is for entities with a broader operational state — see Variant forms |
| Deactivated | The item has been explicitly switched to a non-operational state by a deliberate user or admin action | Deactivated implies intent and action; Inactive is a neutral status descriptor — use Deactivated in confirmation copy, Inactive as the ongoing status label |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Active / Inactive | Describing the current operational state of an item that can be turned on or off — ex. accounts, vehicles, subscriptions, systems | Always use Active as the counterpart — never Enabled, On, or Running — see Active entry |

**In context:**

- ✅ "Inactive"
- ✅ "Inactive account"
- ✅ "3 inactive vehicles"
- ✅ "This subscription is inactive."
- ✅ "Filter by: Active / Inactive"
- ❌ "Offline account" — Offline describes connectivity, not operational status; use Inactive
- ❌ "Dormant account" — too formal and specific; use Inactive
- ❌ "Disabled account" — Disabled is for features and toggles, not accounts; use Inactive
- ❌ "Dead subscription" — informal and alarming; use Inactive subscription

**Notes:** Inactive is the neutral status descriptor for any item that is not currently operational. Several conditional forms — Disabled, Paused, Expired, Deactivated — describe specific subtypes of the inactive state, each implying a different cause or intent. Use these only when the distinction is meaningful to the user and the product supports it as a technically distinct state. When in doubt, Inactive is always the safe and accurate default. The one boundary that must always hold: never use Inactive for connectivity or network states — those belong to the Online / Offline vocabulary.

---

### Language

**Definition:** A product setting that controls the language used across the UI content of an entire website or app.

**Use when:** Referring to the setting that determines what language the product's UI is displayed in — ex. "Language", "Language settings", "Change language." Use in account settings, onboarding flows, and any surface where the user can select or change the display language of the product. Distinct from region or locale settings, which control formats rather than language — see Related terms.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Language | ✅ Use | Capitalize as a settings label — ex. "Language"; lowercase in body copy — ex. "Change your language" |
| Display language | ✅ Use | Acceptable when clarifying that the setting controls the UI language specifically — ex. "Display language: English"; use Language alone when the context is unambiguous |
| Interface language | ⚠️ Conditional | Acceptable in developer-facing or enterprise contexts to distinguish UI language from content language — not for standard user-facing settings labels |
| Locale | ❌ Avoid | Refers to a combination of language, region, and format preferences — not the UI language setting alone; reserve for technical documentation |
| Region | ❌ Avoid | Controls date, time, and number formats tied to a geographic location — not the language of UI content — see Related terms |
| Translation | ❌ Avoid | Refers to the process of converting content between languages — not the user-facing setting that selects a language |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Region | Referring to the setting that controls date, time, currency, and number formats tied to a geographic location | Region controls format; Language controls text — the two are often configured together but refer to distinct settings; never use as synonyms — see Currency entry |
| Locale | Referring to the combined technical configuration of language and regional format preferences — ex. in developer documentation or system settings | Locale is a technical term that encompasses both Language and Region — use Language and Region as separate user-facing labels, Locale only in technical contexts |
| Accessibility | Referring to the broader set of settings designed to make the product usable for people with disabilities — not the language display setting | Language is a display preference; Accessibility is a usability configuration — see Accessibility entry |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Language / Region | Referring to the two display preference settings that are most commonly configured together — ex. "Language and region" as a settings section label | Language and Region are distinct settings that often appear in the same section — combine into a single section label only when both are present; never use one to mean both |
| Language / [Language name] | Displaying the current language setting alongside its value — ex. "Language: English", "Language: Svenska" | Always display the language name in the language itself when listing options — ex. "Svenska" not "Swedish" in a Swedish-language interface |

**In context:**

- ✅ "Language"
- ✅ "Language settings"
- ✅ "Change language"
- ✅ "Display language: English"
- ✅ "Language and region"
- ❌ "Locale settings" — Locale is a technical term; use Language settings for user-facing copy
- ❌ "Region" — when the setting specifically controls the UI display language, not date or number formats; use Language
- ❌ "Translation settings" — Translation refers to a process, not a user-facing setting; use Language settings

**Notes:** Language controls what the UI says. Region controls how values are formatted. In products where both settings exist, they should appear as separate but adjacent controls — ex. "Language: English / Region: United States" — rather than collapsed into a single "Locale" setting, which is a technical concept most users do not recognize. When displaying language options in a selector, always show the language name in the language itself — ex. "Français", "Deutsch", "Svenska" — rather than in the current UI language, so users can identify their language regardless of what is currently displayed.

---

### Learn / Learn more

**Definition:** A navigation action that directs the user to a destination with additional detail or context about content they have just viewed.

**Use when:** Directing the user to more information about a specific topic, feature, or product — ex. "Learn about sustainable transportation", "Learn how it works", "Learn more." Always use a descriptive label that names the topic whenever space allows — ex. "Learn about Driver Guide" rather than "Learn more." Reserve "Learn more" for contexts where space is genuinely too limited for a descriptive label or where the topic is already sufficiently clear from surrounding content.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Learn about [topic] | ✅ Use | Preferred form — always include the topic name when space allows — ex. "Learn about sustainable transportation", "Learn about Driver Guide" |
| Learn how [action] | ✅ Use | Acceptable when the additional content explains a process or capability — ex. "Learn how it works", "Learn how to set up two-factor authentication" |
| Learn more | ✅ Use | Acceptable as a fallback when space is limited or the topic is already clear from surrounding content — avoid as a default; always prefer a descriptive label |
| Read [topic] | ⚠️ Conditional | Acceptable when the destination is specifically a long-form article or document — ex. "Read the report", "Read the guide"; use Learn when the destination contains mixed content types — see Related terms |
| Read more | ⚠️ Conditional | Acceptable when continuing inline content that has been truncated — ex. expanding a product description or article preview; not a general synonym for Learn more |
| Find out more | ❌ Avoid | Informal and verbose — Learn more conveys the same meaning more concisely |
| Discover more | ❌ Avoid | Discover is for open-ended browsing — not for directing the user to specific additional detail about content already viewed — see Discover / Explore entry |
| Click here | ❌ Avoid | Directional and inaccessible — never use as a navigation label |
| More info | ❌ Avoid | Informal shorthand — not appropriate for navigation labels or action copy |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Read [topic] or Read more | The destination is specifically a long-form article, report, or document the user will read in full — ex. "Read the sustainability report", "Read more" on a truncated article preview | Read implies a linear reading experience; Learn implies gaining understanding from any content type — use Read when the format is specifically text-based and long-form |
| Discover / Explore | The intent is open-ended browsing of a section or feature set — not directed navigation to specific additional detail | Discover and Explore invite curiosity; Learn directs the user to specific additional information — never use as synonyms — see Discover / Explore entry |
| Go to [destination] | The user is being directed to a named product destination rather than additional detail about content — ex. "Go to help center" | Go to is navigational; Learn is informational — use Go to when the destination is a product surface, Learn when the destination provides more detail about a topic |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Learn more / Get started | Presenting an informational CTA alongside an action CTA — ex. on a feature introduction or pricing surface | Learn more is the secondary, informational option; Get started is the primary, action-oriented option — always place Get started first when both appear on the same surface |

**In context:**

- ✅ "Learn about sustainable transportation"
- ✅ "Learn how it works"
- ✅ "Learn about Driver Guide"
- ✅ "Learn more" — when space is limited or topic is clear from context
- ❌ "Find out more" — verbose; use Learn more
- ❌ "Discover more" — Discover is for open-ended browsing; use Learn more for specific additional detail
- ❌ "Click here to learn more" — never use directional language; use the action label alone
- ❌ "More info" — informal shorthand; use Learn more or a descriptive Learn about [topic] label

**Notes:** Learn more is a useful fallback but a weak default. It places the burden on the user to decide whether the destination is worth visiting, because the label gives no information about what they will find. A descriptive label — ex. "Learn about Driver Guide" rather than "Learn more" — tells the user exactly what they will get, increases click confidence, and improves accessibility for screen reader users who navigate by link text alone. Apply the descriptive form wherever space allows and treat "Learn more" as a last resort rather than a first choice.

---

### Load / Reload

**Definition:** The action of running or refreshing an entire app or file — bringing it into an operational state or restarting it from scratch.

**Use when:** Describing the action of running an entire app or file, or restarting it entirely after a failure or change — ex. "Reload Authenticator", "Load file", "Reload the app." Use Load for the initial running of an app or file; use Reload when the action repeats or restarts an already-loaded app or file. Distinct from Refresh, which updates data within an already-running app or view — see Related terms.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Load | ✅ Use | Use for the initial action of bringing an app or file into an operational state — ex. "Load file", "Loading…" |
| Reload | ✅ Use | Use when the app or file is being restarted or re-run after a failure, update, or change — ex. "Reload Authenticator", "Reload the app" |
| Reload [object] | ✅ Use | Always pair with the app or file being reloaded when the target is not clear from context — ex. "Reload Authenticator", "Reload the file" |
| Refresh | ❌ Avoid | Reserved for loading the latest data within an already-running app, page, or view — not for running or restarting an entire app or file — see Related terms |
| Run | ❌ Avoid | Technical term associated with executing code or scripts — not appropriate for user-facing app or file loading copy |
| Execute | ❌ Avoid | Technical and formal — not appropriate for any user-facing copy |
| Install | ❌ Avoid | Reserved for setting up an executable for first-time use on a device — not for running or reloading an already-installed app — see Related terms |
| Restart | ⚠️ Conditional | Acceptable when the action specifically stops and restarts a system, service, or device — ex. "Restart your device"; not a general synonym for Reload in app or file contexts |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Refresh | Loading the latest data within an already-running app, page, or view — ex. "Refresh the dashboard", "Refresh your feed" | Refresh updates content within a running context; Reload restarts the entire app or file — never use as synonyms |
| Install | Setting up an executable for first-time use on a device — ex. "Install the app", "Install the update" | Install is for first-time setup; Load is for running; Reload is for restarting — each describes a distinct stage in an app's lifecycle — see Download entry |
| Restart | Stopping and restarting a system, service, or device — ex. "Restart your device", "Restart the service" | Restart operates at the system or device level; Reload operates at the app or file level — use the term that matches the scope of what is being restarted |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Load / Unload | Describing the action of bringing an app or file into an operational state and removing it from that state — ex. in a file management or module-based system | Use Unload as the counterpart when the reverse action removes the app or file from an operational state without deleting it |
| Reload / Cancel | Presenting the user with the option to restart an app or file or abandon the reload — ex. on a loading error screen | Use Cancel as the exit counterpart — never "Stop" or "Skip" when the user is abandoning a reload in progress |

**In context:**

- ✅ "Reload Authenticator"
- ✅ "Load file"
- ✅ "Reload the app"
- ✅ "Loading…" — in-progress state label
- ✅ "Reloading…" — in-progress state label for a restart
- ❌ "Refresh Authenticator" — Refresh updates data within a running app; use Reload for restarting the entire app
- ❌ "Run the app" — technical; use Load or Reload for user-facing copy
- ❌ "Execute file" — technical and formal; use Load file
- ❌ "Install Authenticator" — Install is for first-time setup; use Reload for restarting an already-installed app

**Notes:** Load, Reload, Refresh, and Install describe four distinct stages in an app or file's lifecycle. Install sets up an executable for first-time use. Load brings it into an operational state. Reload restarts it after a failure, update, or change. Refresh updates the data or content within it while it continues running. The four are never interchangeable — each maps to a specific moment and user intent. On surfaces where the distinction matters — ex. an error screen that offers the option to restart an app — the label must accurately describe what will happen so the user knows what to expect.

---

### Location

**Definition:** The spatial or geographical position of an item — ex. an IP address location, a vehicle's current position, or the physical site of a piece of equipment.

**Use when:** Referring to the spatial or geographical position of a device, vehicle, asset, or user — ex. "IP location", "Excavator location", "Share your location." Use in maps, tracking surfaces, fleet management, settings, and any surface where the position of an item is being identified, displayed, or requested.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Location | ✅ Use | Capitalize as a settings or field label — ex. "Location settings", "Current location"; lowercase in body copy — ex. "Share your location" |
| [Item] location | ✅ Use | Use when specifying the item whose position is being described adds clarity — ex. "Vehicle location", "Excavator location", "IP location" |
| Current location | ✅ Use | Use when referring specifically to the real-time position of a device or user — ex. "Current location", "Use current location" |
| Position | ⚠️ Conditional | Acceptable in technical or precision contexts — ex. GPS position, coordinate-level data; not a general synonym for Location in standard user-facing copy |
| Address | ⚠️ Conditional | Acceptable when the location is specifically a postal or civic address — ex. "Delivery address", "Enter your address"; not a synonym for Location when referring to spatial or geographical data |
| Place | ⚠️ Conditional | Acceptable in consumer-facing or mapping contexts where informality is appropriate — ex. "Find a place"; not appropriate for fleet, equipment, or technical contexts |
| Whereabouts | ❌ Avoid | Informal and imprecise — not appropriate for product copy |
| Coordinates | ❌ Avoid | Technical term for a specific data format — not a user-facing synonym for Location |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Address | The location is specifically a postal or civic address — ex. a delivery address, a billing address, or a dealer address | Address is a structured, human-readable location format; Location is broader and includes spatial, geographic, and network-based positions |
| Region | Referring to a geographic area used for settings or content configuration — ex. language and format preferences tied to a country or locale | Region is an administrative or configuration concept; Location is a physical or spatial position — see Language entry |
| GPS | Referring specifically to the satellite-based positioning system used to determine location data | GPS is the technology; Location is what it produces — use Location in user-facing copy, GPS only when the technology itself is relevant to the user |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Location / Settings | Referring to the configuration options that control how location data is collected, used, or displayed — ex. "Location settings" | Always use Settings as the compound counterpart — never "Location preferences" or "Location options" |
| Share location / Stop sharing location | Describing the action of enabling and disabling real-time location sharing — ex. in a fleet or personal device context | Use Stop sharing location as the counterpart — never "Disable location" or "Turn off location" when the action specifically ends a sharing session |
| Current location / [Named location] | Presenting the user's real-time position alongside a saved or named destination — ex. on a map or route planning surface | Current location is always the dynamic, real-time option — distinguish it clearly from saved or manually entered locations |

**In context:**

- ✅ "IP location"
- ✅ "Excavator location"
- ✅ "Share your location"
- ✅ "Current location"
- ✅ "Location settings"
- ✅ "Vehicle location unknown" — error state
- ❌ "Whereabouts of the excavator" — informal; use "Excavator location"
- ❌ "Enter your coordinates" — technical; use "Enter your location" for user-facing copy
- ❌ "GPS data" — when the user-facing concept is the position itself; use "Location"

**Notes:** Location covers a wide range of spatial concepts in this product context — from a user's device position to a vehicle's real-time coordinates to an asset's site on a map. The term is intentionally broad. When the specific type of location matters to the user — ex. an IP-based location vs. a GPS-based location vs. a postal address — qualify Location with the appropriate modifier rather than substituting a different term. This keeps the vocabulary consistent while giving users the context they need to understand what kind of location data is being used or requested.

---

### Machine

**Definition:** A non-transport vehicle in Volvo Group's portfolio — including construction, mining, and industrial equipment such as excavators, loaders, and haulers.

**Use when:** Referring generically to non-transport vehicles in Volvo Group's portfolio — ex. "Electric machine", "Machine settings", "Add a machine." Use Machine as the umbrella term across all surfaces where the equipment is used for construction, mining, or industrial purposes rather than transportation. Use the specific equipment name — ex. excavator, loader, hauler — when the type is known and relevant.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Machine | ✅ Use | Lowercase in body copy — ex. "Your machine is due for service"; capitalize only as a proper label or section title — ex. "Machine settings" |
| [Type] machine | ✅ Use | Use when specifying the machine type adds clarity — ex. "Electric machine", "Autonomous machine" |
| Electric machine | ✅ Use | Standard compound for electrically powered non-transport vehicles in the Volvo Group portfolio — always use Electric machine, never "EV" or "electric vehicle" for this category |
| Vehicle | ❌ Avoid | Reserved for transportation automobiles — ex. buses, trucks — not for construction or industrial equipment — see Related terms |
| Car | ❌ Avoid | Reserved for small private passenger vehicles — never for non-transport equipment — see Car entry |
| Equipment | ⚠️ Conditional | Acceptable as a collective noun when referring to a mixed set of machines in a broader operational context — ex. "Fleet equipment"; not a general synonym for Machine on product surfaces |
| Device | ❌ Avoid | Refers to electronic hardware used to access a product — not physical construction or industrial equipment — see Device entry |
| Unit | ❌ Avoid | Vague and imprecise — does not convey the operational or equipment-specific nature of a machine |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Vehicle | Referring to a transportation automobile in Volvo Group's portfolio — ex. a bus, truck, or boat | Vehicle is for transport; Machine is for non-transport construction and industrial equipment — never use as synonyms |
| Car | Referring specifically to a small, private passenger vehicle | Car is the most specific transportation term — Machine is never appropriate for passenger vehicles — see Car entry |
| Operator | Referring to the individual who controls or operates a machine — ex. an excavator operator, a loader operator | Operator is the personnel term paired with Machine — never use Driver for machine operators — see Driver entry and Operator entry |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Machine / Operator | Referring to the equipment and the person controlling it as a pair — ex. in fleet assignment, telematics, or job site management contexts | Always use Operator as the personnel counterpart for machines — never Driver — see Operator entry |
| Machine / Fleet | Referring to an individual machine and the collective group it belongs to — ex. "Add this machine to your fleet" | Fleet is the aggregate; Machine is the individual unit — both may appear on the same surface without overlapping in meaning |

**In context:**

- ✅ "Electric machine"
- ✅ "Machine settings"
- ✅ "Add a machine"
- ✅ "Your machine is due for service."
- ✅ "No machines added yet."
- ❌ "Electric vehicle" — when referring to a non-transport machine in the Volvo Group portfolio; use Electric machine
- ❌ "Construction vehicle" — Vehicle is for transport equipment; use Machine for construction and industrial equipment
- ❌ "Add a device" — Device refers to electronic hardware; use Machine for physical construction equipment
- ❌ "Add a unit" — vague and imprecise; use Machine

**Notes:** Machine and Vehicle are the two primary equipment categories in the Volvo Group product vocabulary and must never be used interchangeably. Machine covers non-transport, construction, and industrial equipment — excavators, loaders, haulers, pavers. Vehicle covers transportation automobiles — buses, trucks, boats. On surfaces that manage both categories — ex. a mixed fleet management platform — the two terms must appear as distinct labels to avoid ambiguity. Electric machine is the established compound for electrically powered non-transport equipment; never substitute "electric vehicle" or "EV" for this category regardless of industry convention.

---

### Merchandise

**Definition:** The collective set of official, branded physical goods associated with a specific brand — ex. clothing, accessories, and lifestyle items bearing a brand's identity.

**Use when:** Referring to the full range of official branded physical products available under a specific brand — ex. "Shop merchandise", "Volvo merchandise", "View all merchandise." Use on e-commerce surfaces, brand stores, and any surface where official branded physical goods are being presented or sold.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Merchandise | ✅ Use | Lowercase in body copy — ex. "Browse our merchandise"; capitalize only as a section or page label — ex. "Merchandise" |
| [Brand] merchandise | ✅ Use | Use when specifying the brand adds clarity — ex. "Volvo merchandise", "Volvo Trucks merchandise" |
| Merch | ⚠️ Conditional | Acceptable in informal or youth-facing brand contexts where a casual register is intentional — not appropriate for standard Volvo Group product copy |
| Products | ⚠️ Conditional | Acceptable as a broader label when the surface includes both merchandise and non-physical offerings — ex. "Products and services"; not a synonym for Merchandise when the context is specifically branded physical goods |
| Goods | ❌ Avoid | Generic and commercial — does not convey the branded, official nature of the items |
| Items | ❌ Avoid | Too generic — does not distinguish branded merchandise from any other type of listed content |
| Swag | ❌ Avoid | Informal and not appropriate for product copy in a professional B2B or brand context |
| Souvenirs | ❌ Avoid | Implies tourist or commemorative items — too narrow and informal for a general merchandise offering |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Products | Referring to the broader range of a brand's offerings — including services, software, and physical goods — not exclusively branded merchandise | Use Products when the scope extends beyond physical branded items; use Merchandise when the context is specifically official branded physical goods |
| Accessories | Referring to supplementary physical items designed to complement a primary product — ex. vehicle accessories, equipment add-ons | Accessories are functional add-ons to a specific product; Merchandise is branded lifestyle and identity goods — the two may coexist in the same store but serve different purposes |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Merchandise / Shop | Presenting the merchandise offering alongside the action of browsing or buying it — ex. "Shop merchandise", "Merchandise shop" | Shop is the action or destination counterpart — use "Shop merchandise" as the CTA and "Merchandise" as the section label |
| Merchandise / [Brand name] | Specifying which brand's merchandise is being presented — ex. "Volvo merchandise", "Volvo Trucks merchandise" | Always qualify with the brand name when multiple brands share the same surface — never use Merchandise alone when the brand attribution is ambiguous |

**In context:**

- ✅ "Merchandise"
- ✅ "Volvo merchandise"
- ✅ "Shop merchandise"
- ✅ "Browse our merchandise"
- ✅ "View all merchandise"
- ❌ "Browse our merch" — too casual for standard Volvo Group copy; use Merchandise
- ❌ "Buy Volvo goods" — Goods is generic and does not convey the branded nature; use Merchandise
- ❌ "Shop Volvo swag" — informal; use "Shop Volvo merchandise"
- ❌ "View Volvo items" — Items is too generic; use Merchandise

**Notes:** Merchandise always implies official and branded — it signals that the items carry the brand's identity and have been sanctioned by the brand owner. This distinguishes it from generic product listings, third-party goods, or unbranded accessories. On surfaces that sell both official merchandise and functional accessories or equipment parts, always label each category distinctly so users understand what they are browsing.

---

### Mode

**Definition:** A distinct style of operating a device or displaying information on a screen — ex. dark mode, silent mode, driving mode.

**Use when:** Referring to a specific operational or display state that changes how a device behaves or how content appears — ex. "Dark mode", "Silent mode", "Driving mode", "Full-screen mode." Use in settings, onboarding, and any surface where the user can switch between distinct ways of operating a device or viewing content.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| [Name] mode | ✅ Use | Always pair with a descriptive name — ex. "Dark mode", "Silent mode", "Driving mode", "Full-screen mode" |
| Mode | ⚠️ Conditional | Acceptable as a standalone label when the context makes the specific mode clear — ex. a toggle labeled "Mode" within a dedicated settings section; never use alone as a navigation label or section title |
| Theme | ❌ Avoid | Reserved for a custom visual style applied to an entire product or service based on brand identity — not for operational or display states — see Related terms |
| View | ⚠️ Conditional | Acceptable when the distinction is specifically about how content is displayed — ex. "List view", "Map view"; not a synonym for operational modes like silent or driving mode |
| Setting | ❌ Avoid | Refers to a configurable option within a product — not the distinct operational or display state that Mode describes |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Theme | Referring to a custom visual style applied to an entire product or service — typically based on a brand's identity — ex. "Apply a theme", "Custom theme" | Theme defines a product's visual identity; Mode defines a device's operational or display state — never use as synonyms |
| View | Referring specifically to a display format or layout for content — ex. "List view", "Grid view", "Map view" | View is a display preference for content layout; Mode is a broader operational or display state that can affect behavior as well as appearance — use View when the change is layout-only |
| Settings | Referring to the section where modes can be configured or switched — not the mode itself | Settings is where the user manages modes; Mode is the state being managed — never use as synonyms |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Dark mode / Light mode / System mode | Presenting the display appearance options for a screen — ex. in display or accessibility settings | Always offer all options when one is available — never present Dark mode without a Light mode counterpart and vice versa |
| Enter [mode] / Exit [mode] | Describing the action of activating and leaving a specific mode — ex. "Enter full-screen mode", "Exit driving mode" | Always use Enter and Exit as the counterpart actions — never "Start mode", "Stop mode", "Enable", or "Disable" when a mode has a defined entry and exit — see Exit entry |

**In context:**

- ✅ "Dark mode"
- ✅ "Silent mode"
- ✅ "Driving mode"
- ✅ "Full-screen mode"
- ✅ "Enter driving mode"
- ✅ "Exit full-screen mode"
- ❌ "Dark theme" — when referring to the display appearance state of a device; use Dark mode
- ❌ "Silent setting" — Setting refers to a configurable option, not an operational state; use Silent mode
- ❌ "List mode" — when the distinction is specifically about content layout; use List view

**Notes:** Mode and Theme are the most commonly confused terms in this entry. Mode describes how a device operates or how content is displayed — it is behavioral and contextual, and can change during a session. Theme describes a visual identity applied to the entire product — it is brand-based and typically fixed. A product can have both: a user might switch to Dark mode for nighttime use while the product's interface is styled with a custom theme. The two are independent of each other and must never be used interchangeably.

---

### Navigation

**Definition:** The use of menus and links to move through a website, app, product, or service; or the use of maps, geolocation, or directions to guide a user or vehicle to a physical destination.

**Use when:** Referring to either of two distinct concepts — UI navigation (moving through a product using menus and links) or physical navigation (guidance to a destination using maps, geolocation, or directions). Use the surrounding context to make the meaning clear; qualify with a modifier when both concepts appear on the same surface — ex. "App navigation", "Turn-by-turn navigation."

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Navigation | ✅ Use | Covers both UI and physical navigation — qualify with a modifier when the meaning needs disambiguation |
| [Type] navigation | ✅ Use | Use when specifying the navigation type adds clarity — ex. "Turn-by-turn navigation", "App navigation", "In-app navigation" |
| Start navigation | ✅ Use | Standard action label for initiating a physical navigation session — ex. "Start navigation" in a mapping or routing context |
| Steering | ❌ Avoid | Refers to the physical act of directing a vehicle — not a synonym for navigation in any product copy context |
| Exploration | ❌ Avoid | Implies open-ended browsing — not the purposeful, directional act of navigating to a destination or through a product |
| Wayfinding | ⚠️ Conditional | Acceptable in physical environment or signage contexts — ex. indoor navigation or campus maps; not appropriate for standard digital product copy |
| Directions | ⚠️ Conditional | Acceptable when referring specifically to step-by-step route instructions — ex. "Get directions"; not a general synonym for Navigation |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Location | Referring to the spatial or geographical position of a user, vehicle, machine, or item — ex. "See truck location", "Current location" | Location describes where something is; Navigation describes how to get somewhere or move through a product — related but distinct — see Location entry |
| Route | Referring to the specific path calculated or followed during a physical navigation session — ex. "Calculate route", "Your route" | Route is the path; Navigation is the act of following it — the two frequently appear together in mapping and fleet contexts |
| Menu | Referring to a specific UI element that contains navigation links or options — ex. "Open the menu", "Main menu" | Menu is a component within UI navigation; Navigation is the broader concept of moving through the product — never use as synonyms |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Start navigation / Stop navigation | Describing the action of initiating and ending a physical navigation session — ex. in a mapping, routing, or fleet context | Always use Stop navigation as the counterpart — never "End route", "Exit navigation", or "Cancel directions" when a navigation session has been explicitly started |
| Navigation / Settings | Referring to the configuration options for navigation behavior — ex. "Navigation settings" in a mapping or product app | Always use Settings as the compound counterpart — never "Navigation preferences" or "Navigation options" |

**In context:**

- ✅ "Start navigation"
- ✅ "Turn-by-turn navigation"
- ✅ "App navigation"
- ✅ "Navigation settings"
- ✅ "Navigation menu" — UI navigation component label
- ✅ "Get directions" — when referring specifically to step-by-step route instructions
- ❌ "Start steering" — Steering is a physical vehicle action; use Start navigation
- ❌ "Begin exploration" — Exploration implies open-ended browsing; use Navigation for purposeful directional movement
- ❌ "Wayfinding menu" — Wayfinding is for physical environment contexts; use Navigation menu for UI copy

**Notes:** Navigation covers two meaningfully distinct concepts that share the same term. In product UI contexts, Navigation refers to the menus, links, and structures that let users move through a digital product. In physical or mapping contexts, Navigation refers to route guidance using maps, geolocation, or directions. On surfaces where both meanings are present — ex. a fleet management app with in-product menus and vehicle routing features — always qualify the term to prevent ambiguity: "App navigation" for the UI structure, "Turn-by-turn navigation" or "Route navigation" for the physical guidance feature.

---

### Next

**Definition:** The action of advancing to the immediately following step in a sequenced flow or accessing the subsequent item in a series of content.

**Use when:** Labeling the forward action in a step-based flow where progression is mechanical and sequential — ex. a numbered stepper, a carousel, or paginated content — or when accessing the next item in a content series — ex. "Next slide", "Next page." Use Next when no meaningful user input or engagement is required on the current step before advancing. When the user has completed or engaged with the current step, use Continue instead — see Related terms.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Next | ✅ Use | — |
| Next [item] | ✅ Use | Use when naming the next item adds clarity — ex. "Next slide", "Next step", "Next page" |
| Proceed | ❌ Avoid | Formal and impersonal — does not convey the light, sequential nature of advancing through a step or content series |
| Forward | ⚠️ Conditional | Acceptable in media playback or document navigation contexts — ex. "Skip forward"; not a general synonym for Next in flow or step navigation |
| Continue | ⚠️ Conditional | Use instead of Next when the user has meaningfully engaged with or completed the current step — see Related terms and Continue entry |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Continue | The user has completed an action or engaged meaningfully with the current step before advancing — ex. filled in a form, made a selection, acknowledged content | Continue implies earned progression; Next implies mechanical step advancement — use Continue when something has happened on the current step, Next when the user is simply moving through a sequence — see Continue entry |
| Go back | The user is returning to the previous step in the flow without exiting it | Go back is the reverse action of Next within the same flow — see Go back entry |
| Cancel | The user is abandoning the flow or process entirely — typically without saving progress | Cancel exits the flow; Next advances within it — never use as synonyms — see Cancel entry |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Next / Back | Navigating forward and backward through a sequenced flow or content series where steps are clearly numbered or ordered and no meaningful user action is required on each step | Use Back as the reverse counterpart — see Back entry; use Go back / Continue for flows where meaningful user engagement is required |
| Next / Previous | Navigating forward and backward through paginated content or a content series — ex. slides, pages, search results | Use Previous as the counterpart when the content series is paginated or indexed — ex. "Previous slide", "Previous page"; not for multi-step flows where Go back is the correct reverse action |

**In context:**

- ✅ "Next"
- ✅ "Next slide"
- ✅ "Next step"
- ✅ "Next page"
- ❌ "Proceed" — formal and impersonal; use Next for sequential step advancement
- ❌ "Continue to step 2" — when no meaningful user action was required on step 1; use Next — Continue implies earned progression
- ❌ "Forward" — in a multi-step flow or stepper context; use Next

**Notes:** Next and Continue are the most important distinction in this area of the glossary. Next is mechanical — the user is simply moving to the next item in a sequence without having done anything meaningful on the current step. Continue is earned — the user has completed an input, made a choice, or acknowledged content before advancing. The practical test: if removing the current step from the flow would make no difference to the outcome, use Next. If the current step requires something from the user, use Continue. Applying this consistently across a multi-step flow prevents the labels from becoming interchangeable and ensures users understand when their input actually matters.

---

### No

**Definition:** A refusal of explicit consent to a sensitive, impactful, or irreversible action — used as a negative response option in confirmation dialogs.

**Use when:** Presenting the option to refuse a sensitive, impactful, or irreversible action — ex. "No, keep my account", "No, don't delete." Always include a clarification of what the refusal means whenever space allows — ex. "No, keep my account" rather than "No" alone. Never pair with "Yes" when both options require clarification — use more descriptive labels instead to reduce cognitive load.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| No, [clarification] | ✅ Use | Preferred form — always include what the refusal preserves or avoids — ex. "No, keep my account", "No, don't delete" |
| No | ⚠️ Conditional | Acceptable only when the refusal is unambiguous from context and no clarification is needed — ex. a simple yes/no prompt with no irreversible consequences; never use alone on destructive or irreversible action dialogs |
| Cancel | ✅ Use | Acceptable alternative when the user is abandoning a flow rather than explicitly refusing a specific action — ex. a cancel button on a confirmation dialog — see Cancel entry |
| Go back | ✅ Use | Acceptable alternative when the refusal returns the user to the previous step without closing the flow — see Go back entry |
| Reject | ✅ Use | Acceptable alternative when the user is refusing a mandatory requirement, request, or permission — see Reject entry |
| Yes / No | ❌ Avoid | Never pair Yes and No as the only options when both require clarification — the binary pairing increases cognitive load and risk of error on high-stakes actions |
| Nope | ❌ Avoid | Informal — not appropriate for confirmation dialogs involving sensitive or irreversible actions |
| Disagree | ❌ Avoid | Implies a difference of opinion rather than a refusal of a specific action — not appropriate for confirmation dialogs |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Cancel | The user is abandoning an ongoing flow or process rather than explicitly refusing a specific destructive action | Cancel exits a flow; No refuses a specific action in a confirmation dialog — the two often appear on the same surface but serve different functions — see Cancel entry |
| Go back | The user is returning to the previous step without closing the flow or refusing a specific action | Go back is a navigation action; No is a refusal — use Go back when no destructive action is being confirmed — see Go back entry |
| Reject | The user is refusing a mandatory requirement, request, or permission — ex. rejecting terms, a connection request, or an allow prompt | Reject is for mandatory or third-party requests; No is for the user's own sensitive or destructive actions — see Reject entry |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| No, [clarification] / [Action] | Presenting the refusal and the destructive or sensitive action as a pair on a confirmation dialog — ex. "Delete account?" → "Delete account" / "No, keep my account" | Always place the clarified No as the secondary, safe option — visually distinct from and subordinate to the primary destructive action; the No option should always be the easier path to take |
| No / Yes | Presenting a binary choice to the user | Never use Yes / No as a dialog pair regardless of stakes — the primary option must always describe the outcome clearly, while the secondary can be a simple opposite — ex. "Delete account" / "Cancel" |

**In context:**

- ✅ "Delete account? No, keep my account."
- ✅ "Remove file? No, keep the file."
- ✅ "No, don't delete" — when space is limited
- ✅ "Cancel" — as an alternative when abandoning a flow
- ❌ "Delete account? Yes / No" — when both options require clarification; use descriptive labels — ex. "Delete account" / "No, keep my account" or "Cancel"
- ❌ "Nope" — informal; use No or a clarified alternative
- ❌ "No" alone — on a dialog involving a destructive or irreversible action; always add a clarification

**Notes:** No is a last resort label — a clarified alternative is always preferred on any surface where the action is sensitive, impactful, or irreversible. The clarification serves two purposes: it tells the user exactly what they are preserving by refusing — ex. "keep my account" — and it reduces the risk of accidental confirmation by making the safe option as legible as the destructive one. When both options on a dialog require clarification, drop Yes / No entirely and use descriptive action labels for both — ex. "Delete account" / "Keep my account" or "Cancel" — which removes the binary framing and its associated cognitive load.

---

### On

**Definition:** The state of a feature, setting, or system that is currently active and operational.

**Use when:** Indicating that a feature, setting, or system is currently enabled and active — ex. "Push notifications: On", "Wi-Fi: On", "Dark mode: On." Use as a binary status label paired with Off, primarily on toggles, switches, and status indicators. For broader operational states beyond toggles — ex. an account or subscription — use Active instead.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| On | ✅ Use | Use as a status label on toggles and binary switches — ex. "Push notifications: On"; always capitalize as a label |
| Active | ✅ Use | Acceptable alternative with a similar meaning — preferred for entities with a broader operational state — ex. accounts, subscriptions, vehicles — see Active entry |
| Available | ❌ Avoid | Describes whether something can be accessed — not whether it is currently enabled or switched on — see Available entry |
| Enabled | ⚠️ Conditional | Acceptable in settings or developer-facing copy where the feature has been deliberately switched on by a user or admin — ex. "Two-factor authentication: Enabled"; slightly more formal than On and implies deliberate configuration |
| Running | ❌ Avoid | Implies a process or task in progress — not a binary toggle state |
| Live | ❌ Avoid | Carries publishing or broadcast connotations — not appropriate for feature or setting states |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Active | The item with an operational state is broader than a feature toggle — ex. an account, subscription, vehicle, or system | Active is for entities; On is for toggles and binary settings — both convey an enabled state but at different scopes — see Active entry |
| Available | The item can currently be accessed or used by the user — not specifically that it has been switched on | Available describes access; On describes activation — never use as synonyms — see Available entry |
| Enabled | A feature or setting has been deliberately switched on, typically by a user or admin action in a settings context | Enabled is slightly more formal than On and implies intentional configuration — use On for toggle labels, Enabled for confirmation copy or settings descriptions |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| On / Off | Labeling the two states of a binary toggle, switch, or setting — ex. "Push notifications: On / Off", "Dark mode: On" | Always use Off as the counterpart — never "Disabled", "Inactive", or "Paused" on a binary toggle; the On / Off pair must appear consistently on the same surface |

**In context:**

- ✅ "Push notifications: On"
- ✅ "Wi-Fi: On"
- ✅ "Dark mode: On"
- ✅ "Active" — for accounts, subscriptions, or entities with a broader operational state
- ❌ "Push notifications: Available" — Available describes access, not activation state; use On
- ❌ "Push notifications: Live" — Live carries broadcast connotations; use On
- ❌ "Push notifications: Running" — Running implies a process in progress; use On

**Notes:** On and Active are the two canonical terms for an enabled state in this glossary, but they operate at different scopes. On is for binary toggles and switches — it signals that a feature or setting has been switched on by the user. Active is for entities with a broader operational state — accounts, vehicles, subscriptions — that are currently running or in use. The practical test: if the state is controlled by a toggle or switch, use On. If the state describes whether an entity is currently operational, use Active. Never use Available as a substitute for either — Available describes access rights, not activation state.

---

### Off

**Definition:** The state of a feature, setting, or system that is currently inactive and not operational.

**Use when:** Indicating that a feature, setting, or system is currently disabled and not active — ex. "Cookie tracking: Off", "Wi-Fi: Off", "Dark mode: Off." Use as a binary status label paired with On, primarily on toggles, switches, and status indicators. For broader operational states beyond toggles — ex. an account or subscription — use Inactive instead.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Off | ✅ Use | Use as a status label on toggles and binary switches — ex. "Cookie tracking: Off"; always capitalize as a label |
| Inactive | ✅ Use | Acceptable alternative with a similar meaning — preferred for entities with a broader operational state — ex. accounts, subscriptions, vehicles — see Inactive entry |
| Unavailable | ❌ Avoid | Describes whether something cannot currently be accessed — not whether it has been switched off — see Available entry |
| Disabled | ⚠️ Conditional | Acceptable in settings or developer-facing copy where the feature has been deliberately switched off by a user or admin — ex. "Two-factor authentication: Disabled"; slightly more formal than Off and implies deliberate configuration |
| Paused | ⚠️ Conditional | Acceptable when the feature or setting is in a temporary, intentionally suspended state — ex. "Syncing: Paused"; use only when Paused is technically distinct from Off in the product |
| Stopped | ❌ Avoid | Implies a process has been halted mid-execution — not a binary toggle state |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Inactive | The item with a non-operational state is broader than a feature toggle — ex. an account, subscription, vehicle, or system | Inactive is for entities; Off is for toggles and binary settings — both convey a disabled state but at different scopes — see Inactive entry |
| Unavailable | The item cannot currently be accessed or used by the user — not specifically that it has been switched off | Unavailable describes access; Off describes activation state — never use as synonyms — see Available entry |
| Disabled | A feature or setting has been deliberately switched off, typically by a user or admin action in a settings context | Disabled is slightly more formal than Off and implies intentional configuration — use Off for toggle labels, Disabled for confirmation copy or settings descriptions |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| On / Off | Labeling the two states of a binary toggle, switch, or setting — ex. "Cookie tracking: Off", "Wi-Fi: On / Off" | Always use On as the counterpart — never "Enabled", "Active", or "Available" on a binary toggle; the On / Off pair must appear consistently on the same surface — see On entry |

**In context:**

- ✅ "Cookie tracking: Off"
- ✅ "Wi-Fi: Off"
- ✅ "Dark mode: Off"
- ✅ "Inactive" — for accounts, subscriptions, or entities with a broader operational state
- ❌ "Cookie tracking: Unavailable" — Unavailable describes access, not activation state; use Off
- ❌ "Cookie tracking: Stopped" — Stopped implies a halted process; use Off for a binary toggle state
- ❌ "Cookie tracking: Disabled" — as a toggle label; Disabled implies deliberate configuration and is better suited to confirmation copy or settings descriptions; use Off on the toggle itself

**Notes:** Off and Inactive are the two canonical terms for a disabled state in this glossary, mirroring the On / Active relationship. Off is for binary toggles and switches — it signals that a feature or setting has been switched off. Inactive is for entities with a broader operational state — accounts, vehicles, subscriptions — that are not currently running or in use. The practical test: if the state is controlled by a toggle or switch, use Off. If the state describes whether an entity is currently operational, use Inactive. Never use Unavailable as a substitute for either — Unavailable describes access rights, not activation state.

---

### OK

**Definition:** An acknowledgement of a condition or requirement the user has minimal control over — used to accept and proceed when the choice is effectively non-optional.

**Use when:** Presenting the user with a condition, requirement, or informational prompt where their only meaningful option is to acknowledge and continue — ex. "Accept functional cookies to continue? OK." Use OK when the user has minimal control over the outcome and the action is not sensitive, irreversible, or permission-based. Always capitalize as OK, never as "Ok" or "ok."

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| OK | ✅ Use | Always capitalize as OK — never "Ok" or "ok" |
| Accept | ✅ Use | Acceptable alternative in similar scenarios — preferred when the prompt involves mandatory consent to terms or conditions — see Accept entry |
| Got it | ⚠️ Conditional | Acceptable in informational or low-stakes acknowledgement contexts where a conversational tone is appropriate — ex. a tooltip or onboarding tip; not for consent or condition acceptance |
| Sure | ❌ Avoid | Informal and implies optional agreement — not appropriate for conditions the user has minimal control over |
| Alright | ❌ Avoid | Informal and conversational — not appropriate for UI copy |
| Fine | ❌ Avoid | Informal and ambiguous — not appropriate for UI copy |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Allow | The user is granting optional permission for a feature or service to access a resource — ex. "Allow camera access" | Allow is for optional permissions; OK is for non-optional conditions or requirements — never use as synonyms — see Allow entry |
| Accept | The user is giving mandatory consent to terms, policies, or gating conditions required for a product or feature to function | Accept is for mandatory consent with explicit terms; OK is for conditions where the user has minimal control and no meaningful alternative — use Accept when terms are presented, OK when a condition simply requires acknowledgement |
| Confirm | The user is giving explicit consent to a sensitive, impactful, or irreversible action — ex. "Confirm deletion", "Confirm transfer" | Confirm is for high-stakes, user-initiated actions; OK is for low-control, non-sensitive acknowledgements — never use as synonyms — see Confirm entry |
| Yes | The user is responding affirmatively to a specific question or choice | Yes implies a genuine binary choice; OK implies acceptance of a condition with minimal alternatives — never use Yes / No as a dialog pair — see No entry |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| OK / Reject | Presenting the user with the option to accept or refuse a condition or requirement they have minimal control over | Always use Reject as the counterpart when the negative option is available — never "No", "Cancel", or "Dismiss" when the action specifically refuses a non-optional condition |
| OK / Cancel | Presenting the user with the option to acknowledge a condition or abandon the flow entirely | Use Cancel as the counterpart when the alternative to OK is exiting the flow or process — see Cancel entry |

**In context:**

- ✅ "Accept functional cookies to continue? OK"
- ✅ "Your session will expire in 5 minutes. OK"
- ✅ "Accept" — when mandatory consent to terms is involved
- ❌ "Ok" — incorrect casing; always capitalize as OK
- ❌ "Sure" — informal; use OK
- ❌ "Fine" — informal and ambiguous; use OK
- ❌ "OK" — on a dialog involving a sensitive or irreversible action; use Confirm instead — ex. "Confirm deletion", not "OK"

**Notes:** OK sits in a specific and narrow position in the consent vocabulary — it is for conditions the user has minimal control over and that carry no sensitive or irreversible consequences. When the condition involves explicit terms, use Accept. When the action is user-initiated and high-stakes, use Confirm. When permission is being granted optionally, use Allow. OK should never be used as a catch-all acknowledgement label on actions where the user is making a meaningful choice — if a more specific term applies, it always takes precedence over OK.

---

### Onboard

**Definition:** All physical and digital systems and controls present within a vehicle or machine — encompassing the complete operational environment the driver or operator interacts with.

**Use when:** Referring to the full set of systems, controls, and technology present inside a vehicle or machine — ex. "Onboard systems", "Onboard technology", "Onboard diagnostics." Use in product descriptions, technical documentation, fleet management, and any surface where the complete operational environment of a vehicle or machine is the subject — as distinct from specific components like the dashboard or individual controls.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Onboard | ✅ Use | Use as an adjective preceding the noun it modifies — ex. "Onboard systems", "Onboard technology", "Onboard diagnostics"; write as one word, never hyphenated or spaced |
| On-board | ❌ Avoid | Hyphenated form — not the standard spelling in this product context; use Onboard |
| On board | ❌ Avoid | Two-word form used in spatial or nautical contexts — ex. "passengers on board"; not appropriate as a modifier in product copy |
| In-cab | ⚠️ Conditional | Acceptable in truck-specific contexts where the reference is specifically to systems located within the driver's cab — ex. "In-cab display"; more specific than Onboard and not appropriate as a general synonym |
| Built-in | ⚠️ Conditional | Acceptable when emphasizing that a system or feature is integrated into the vehicle as standard — ex. "Built-in navigation"; not a general synonym for Onboard when referring to the full operational environment |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Dashboard | Referring specifically to the physical or digital interface designed for data display and control — a component within the onboard environment | Dashboard is a specific surface within the onboard environment; Onboard encompasses the complete set of systems and controls — never use as synonyms — see Dashboard entry |
| Navigation | Referring specifically to the route guidance system or feature present in the vehicle | Navigation is one onboard system; Onboard refers to the entire operational environment — use Navigation when the route guidance feature is the specific subject — see Navigation entry |
| Driver | Referring to the individual who operates the vehicle and interacts with its onboard systems | Driver is the personnel term paired with onboard vehicle contexts — see Driver entry |
| Operator | Referring to the individual who operates a machine and interacts with its onboard systems | Operator is the personnel term paired with onboard machine contexts — see Operator entry |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Onboard / Systems | Referring to the collective set of technology and controls present within a vehicle or machine — ex. "Onboard systems", "View onboard systems" | Systems is the most common compound counterpart — always use Onboard systems rather than "In-vehicle systems" or "Built-in systems" for consistency |
| Onboard / Diagnostics | Referring to the self-monitoring and reporting capabilities of a vehicle or machine — ex. "Onboard diagnostics", "Check onboard diagnostics" | Diagnostics is a standard compound in fleet and telematics contexts — use Onboard diagnostics rather than "Vehicle diagnostics" when the emphasis is on the vehicle's own reporting system |

**In context:**

- ✅ "Onboard systems"
- ✅ "Onboard technology"
- ✅ "Onboard diagnostics"
- ✅ "Access onboard controls"
- ❌ "On-board systems" — hyphenated form; use Onboard
- ❌ "On board technology" — two-word form; use Onboard
- ❌ "Dashboard systems" — Dashboard is one component of the onboard environment; use Onboard when referring to the complete set of systems

**Notes:** Onboard describes the complete operational environment inside a vehicle or machine — every system, control, and interface the driver or operator interacts with. Dashboard is a specific display and control surface within that environment. The two are related but operate at different levels of specificity: Onboard is the whole; Dashboard is a part. On surfaces where both terms appear, always use Onboard when referring to the full set of systems and Dashboard when referring specifically to the data display and control interface.

---

### Open

**Definition:** The action of launching or accessing an app, web page, file, or interactive content to make it visible or available for interaction.

**Use when:** Describing the action of accessing and displaying an app, web page, file, or interactive content — ex. "Open in new tab", "Open file", "Open chat." Use on navigation links, file management surfaces, and any surface where the user is initiating access to a viewable or interactive item. Distinct from Start or Load, which initiate a process or flow rather than accessing a viewable item — see Related terms.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Open | ✅ Use | — |
| Open [object] | ✅ Use | Always pair with the item being opened when the target is not clear from context — ex. "Open file", "Open chat", "Open report" |
| Open in [location] | ✅ Use | Use when specifying where the item will open adds clarity — ex. "Open in new tab", "Open in app" |
| Launch | ❌ Avoid | Implies initiating a complex system or application from scratch — too heavy for opening a file, tab, or interactive element |
| Start | ❌ Avoid | Reserved for initiating a user flow or process — not for accessing a viewable or interactive item — see Related terms |
| Execute | ❌ Avoid | Technical term associated with running code or scripts — never appropriate for user-facing copy |
| View | ⚠️ Conditional | Acceptable when the content is specifically read-only and the user will not interact with it beyond viewing — ex. "View report", "View map"; use Open when the content is interactive |
| Access | ⚠️ Conditional | Acceptable in settings or permission contexts where the emphasis is on gaining entry rather than displaying content — ex. "Access settings"; not a general synonym for Open |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Start | Initiating a user flow, process, or feature — ex. "Start navigation", "Start free trial" | Start initiates something; Open accesses something already available — use Start when a process begins, Open when an item is displayed — see Start entry |
| Close | Dismissing an open app, file, panel, or interactive element — ex. "Close chat", "Close file" | Close is the canonical counterpart to Open — see Paired terms and Close entry |
| Load / Reload | Bringing an entire app or file into an operational state, or restarting it after a failure or change — ex. "Load file", "Reload the app" | Load and Open can overlap when the subject is a file, but Load implies the technical process of running the item, while Open implies displaying it for user interaction — use Open in user-facing copy unless the technical loading process itself is the relevant action — see Load / Reload entry |
| View | Accessing read-only content where no interaction beyond viewing is possible | View implies passive consumption; Open implies access to interactive content — use View for read-only surfaces, Open for interactive ones |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Open / Close | Describing the action of accessing and dismissing an app, file, panel, or interactive element | Always use Close as the counterpart — never "Exit", "Quit", or "Hide" when the action specifically closes an opened item — see Close entry |

**In context:**

- ✅ "Open in new tab"
- ✅ "Open file"
- ✅ "Open chat"
- ✅ "Open report"
- ✅ "Open in app"
- ❌ "Launch file" — Launch implies initiating a complex system; use Open for files and interactive content
- ❌ "Start chat" — Start initiates a process; use Open for accessing interactive content like a chat window
- ❌ "Execute file" — technical and not appropriate for user-facing copy; use Open file

**Notes:** Open and Start are the most commonly confused terms in this entry because both can initiate something. The distinction is what is being initiated. Open accesses a viewable or interactive item that already exists — a file, a tab, a chat window. Start initiates a process or flow — a navigation session, a free trial, an onboarding sequence. The practical test: if the user will see or interact with a specific item, use Open. If the user is beginning a sequence of actions, use Start.

---

### Operator

**Definition:** An individual who controls or operates machinery — including haulers, loaders, excavators, and other non-transport equipment.

**Use when:** Referring to a person whose primary role is controlling or operating a machine — ex. "Assign an operator", "Operator profile", "Operator ID." Use across fleet management, telematics, job site, and any surface where the individual operating a machine is the subject. Always use Operator for machinery and Driver for vehicles — the two are never interchangeable in Volvo Group product copy.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Operator | ✅ Use | — |
| Operator [qualifier] | ✅ Use | Use when scoping the operator to a specific context adds clarity — ex. "Operator profile", "Operator ID", "Operator behavior" |
| Driver | ❌ Avoid | Reserved for individuals who operate vehicles — ex. buses, trucks, boats — not machinery — see Related terms |
| Pilot | ❌ Avoid | Reserved for aircraft or watercraft in formal contexts — not the standard term for machine operators across Volvo Group product surfaces |
| User | ❌ Avoid | Too generic — does not convey the machine-operating role; use Operator when the person's role is specifically machine operation |
| Worker | ❌ Avoid | Implies a general labor role — does not convey the specific act of controlling or operating a machine |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Driver | Referring to an individual who controls or operates a vehicle — ex. a bus, truck, or boat | Driver is for vehicles; Operator is for machinery — the equipment type determines the correct term — never use as synonyms — see Driver entry |
| Fleet manager | Referring to the individual responsible for overseeing and managing a group of machines and their operators — not operating a machine directly | Fleet manager is a supervisory role; Operator is an operational role — both may appear in the same product but refer to distinct personas |
| Technician | Referring to an individual who maintains, repairs, or services machinery — not controls or operates it | Technician performs maintenance; Operator controls the machine during active use — the two roles may involve the same equipment but at different stages |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Operator / Machine | Referring to the person and the equipment they operate as a pair — ex. in job site assignment, telematics, or fleet management contexts | Always use Machine as the equipment counterpart for operators — never Vehicle; the Operator / Machine pair is the machinery equivalent of the Driver / Vehicle pair — see Machine entry |
| Operator / Fleet manager | Referring to the operational and supervisory roles within a machine fleet management context — ex. in access control, reporting, or communication surfaces | Operator and Fleet manager are distinct personas that may both appear in the same product — never conflate their roles in copy or navigation labels |

**In context:**

- ✅ "Assign an operator"
- ✅ "Operator profile"
- ✅ "Operator ID"
- ✅ "No operator on this machine."
- ✅ "Operator behavior"
- ❌ "Assign a driver" — Driver is for vehicle operators; use Operator for machinery
- ❌ "Assign a pilot" — Pilot is for aircraft contexts; use Operator for machine operators
- ❌ "Operator or driver" — do not combine the two terms as if interchangeable; use Operator for machinery and Driver for vehicles separately — see Driver entry

**Notes:** Operator and Driver are the two primary personnel terms in the Volvo Group product vocabulary and must never be used interchangeably. The equipment type determines the correct term — Operator for machinery (haulers, loaders, excavators), Driver for vehicles (buses, trucks, boats). On surfaces where both personas appear — ex. a platform covering vehicle fleets and construction equipment simultaneously — the two terms must remain distinct across all labels, navigation items, and copy to avoid ambiguity about who is being referred to and what they operate.

---

### Panel / Side panel

**Definition:** A fixed or floating UI section that hosts settings, controls, or supplementary content — typically displayed alongside the main content area without replacing the primary view.

**Use when:** Referring to a UI component that surfaces settings, controls, or contextual content alongside the main view — ex. "Open the side panel", "Expand the panel", "Filter panel." Use Panel as the generic term; use Side panel when the panel is specifically anchored to the left or right edge of the screen. Distinct from a modal, which replaces or overlays the primary view, and from a control panel, which is a full product surface — see Related terms.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Panel | ✅ Use | Use as the generic term for any fixed or floating UI section hosting settings or controls — ex. "Filter panel", "Details panel" |
| Side panel | ✅ Use | Use when the panel is specifically anchored to the left or right edge of the screen — ex. "Open the side panel", "Side panel settings" |
| [Type] panel | ✅ Use | Use when specifying the panel's function adds clarity — ex. "Filter panel", "Settings panel", "Details panel" |
| Drawer | ⚠️ Conditional | Acceptable in mobile or responsive contexts where the panel slides in from the edge of the screen — ex. "Open the drawer"; not a general synonym for Panel on desktop surfaces |
| Sidebar | ⚠️ Conditional | Acceptable when the panel is a persistent, always-visible navigation or content column — ex. in a document editor or dashboard layout; not appropriate for temporary or toggle-based panels |
| Tray | ❌ Avoid | Informal and platform-specific — not appropriate for standard user-facing product copy |
| Widget | ❌ Avoid | Implies a standalone interactive element — not a UI section hosting settings and controls |
| Popup | ❌ Avoid | Implies a transient overlay triggered by a user action — not a fixed or docked panel section |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Control panel | Referring to a full product surface — a page or section — that contains a set of customizable settings across multiple areas | Control panel is a product destination; Panel is a UI component within a product — a control panel may contain panels, but a panel is not a control panel — see Control panel entry |
| Modal | Referring to an overlay that temporarily interrupts the primary view and requires user action before returning to the main content | Modal interrupts the primary view; Panel supplements it — the primary view remains accessible when a panel is open — never use as synonyms |
| Dashboard | Referring to a surface that displays multiple types of data and controls for the user to monitor and interact with | Dashboard is a full product surface; Panel is a UI component — a dashboard may contain panels, but a panel is not a dashboard — see Dashboard entry |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Open panel / Close panel | Describing the action of showing and hiding a panel — ex. "Open the filter panel", "Close the side panel" | Always use Close as the counterpart to Open for panels — never "Exit panel", "Hide panel", or "Dismiss panel" when the action toggles the panel's visibility — see Open and Close entries |
| Expand panel / Collapse panel | Describing the action of increasing and reducing a panel's visible area — ex. when a panel can be resized or toggled between compact and full states | Use Expand and Collapse when the panel changes size — never "Open" and "Close" when the panel remains visible in both states |

**In context:**

- ✅ "Open the side panel"
- ✅ "Filter panel"
- ✅ "Details panel"
- ✅ "Settings panel"
- ✅ "Expand the panel"
- ❌ "Open the tray" — informal and platform-specific; use Panel or Side panel
- ❌ "Open the popup" — Popup implies a transient overlay; use Panel for a fixed or docked UI section
- ❌ "Open the widget" — Widget implies a standalone element; use Panel for a section hosting settings and controls
- ❌ "Go to the side panel" — Go to implies navigating to a destination; use Open the side panel for toggling a UI component

**Notes:** Panel and Side panel describe a UI component — a section within the product interface. Control panel and Dashboard are product surfaces — destinations in the navigation hierarchy. The distinction matters because panels are components the user opens and closes within a view, while control panels and dashboards are views the user navigates to. On surfaces where both a panel component and a control panel destination exist, the labels must be consistently distinct — ex. "Open the settings panel" for the component, "Go to control panel" for the destination.

---

### Password

**Definition:** An alphanumeric code required to verify a user's identity and gain access to an account, page, product, or service.

**Use when:** Referring to the alphanumeric credential a user enters to authenticate and access a product — ex. "Enter your password", "Change password", "Forgot your password?" Use in sign-in flows, account settings, authentication surfaces, and any surface where the user's access credential is the subject.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Password | ✅ Use | Lowercase in body copy — ex. "Enter your password"; capitalize only as a field label — ex. "Password" |
| Passcode | ⚠️ Conditional | Acceptable when the credential is specifically a short numeric or alphanumeric code — ex. a PIN or device unlock code; not a general synonym for Password in account authentication contexts |
| PIN | ⚠️ Conditional | Acceptable when the credential is specifically a numeric personal identification number — ex. "Enter your PIN"; not interchangeable with Password when the credential includes letters or symbols |
| Passphrase | ⚠️ Conditional | Acceptable when the credential is specifically a longer, phrase-based secret — ex. in security documentation or advanced account settings; not appropriate for standard sign-in copy |
| Access code | ⚠️ Conditional | Acceptable when the credential is a temporary or one-time code — ex. "Enter your access code"; not a general synonym for the user's primary account password |
| Secret | ❌ Avoid | Informal and imprecise — does not convey the specific authentication purpose of a password |
| Key | ❌ Avoid | Implies a cryptographic or API credential — not the user-facing account password |
| Credentials | ❌ Avoid | Refers to the combined set of sign-in details — ex. username and password together — not the password alone |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Authentication | Referring to the broader process of confirming identity through a second security layer — ex. two-factor authentication | Authentication is the process; Password is one credential used within it — see Authentication entry |
| Username | Referring to the identifier paired with the password to complete a sign-in — ex. "Enter your username and password" | Username and Password are the canonical sign-in credential pair — see Paired terms |
| PIN | Referring specifically to a short numeric code used as an alternative or supplementary credential | PIN is a specific credential type; Password is the general account authentication credential — use the specific term when the credential type matters to the user |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Password / Username | Referring to the two credentials required for sign-in — ex. "Enter your username and password" | Always present Username before Password in sign-in copy and form labels — the standard order is Username → Password |
| New password / Confirm password | Presenting the two fields required when creating or changing a password — ex. in account settings or password reset flows | Always use Confirm password as the second field label — never "Repeat password", "Re-enter password", or "Verify password" |
| Forgot password / Reset password | Presenting the recovery entry point and the action that follows it — ex. "Forgot your password?" → "Reset your password" | Forgot password is the trigger; Reset password is the action — use consistently across the full recovery flow |

**In context:**

- ✅ "Enter your password"
- ✅ "Change password"
- ✅ "Forgot your password?"
- ✅ "New password"
- ✅ "Confirm password"
- ✅ "Reset your password"
- ❌ "Enter your secret" — informal; use Enter your password
- ❌ "Enter your key" — Key implies a cryptographic credential; use Password for account authentication
- ❌ "Enter your credentials" — Credentials refers to the full sign-in set; use Password when the field is specifically for the password

**Notes:** Password is the standard term for the primary account authentication credential across all user-facing surfaces. When the credential type is specifically numeric (PIN), phrase-based (passphrase), or temporary (access code), use the more specific term — but only when the distinction is meaningful to the user. In most sign-in and account management contexts, Password is always the right choice regardless of the underlying technical credential format.

---

### Privacy

**Definition:** The protection of personal data — preserving its private character and ensuring the owner retains control over how it is collected, used, and shared.

**Use when:** Referring to the principle or practice of protecting personal data and preserving user control over it — ex. "Privacy settings", "Your privacy", "Privacy policy." Use in settings, legal notices, consent flows, data handling disclosures, and any surface where the collection, use, or protection of personal data is the subject.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Privacy | ✅ Use | Lowercase in body copy — ex. "We respect your privacy"; capitalize as a section or settings label — ex. "Privacy settings" |
| Privacy notice | ✅ Use | The official, legal statement that describes how personal data is handled and processed — ex. "Read our privacy notice", "Privacy notice"; always use Privacy notice as the label for the legal document — never "Privacy policy" or "Privacy statement" |
| Privacy settings | ✅ Use | The section where users manage their personal data and consent preferences — ex. "Go to privacy settings" |
| Privacy policy | ❌ Avoid | Not the established term for the legal document in this product context — use Privacy notice |
| Privacy statement | ❌ Avoid | Not the established term for the legal document in this product context — use Privacy notice |
| Data privacy | ⚠️ Conditional | Acceptable in formal or enterprise-facing contexts where the distinction between privacy and data privacy is relevant — ex. "Data privacy compliance"; not for standard user-facing settings or notice labels |
| Confidentiality | ❌ Avoid | Refers to protection against unauthorized access — not the user's right to control their own personal data — see Confidentiality entry |
| Security | ❌ Avoid | Refers to the technical measures that protect data — not the principle of user control over personal data — see Confidentiality entry |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Confidentiality | Referring to the protection of information against unauthorized access, use, or disclosure | Confidentiality is a protection principle; Privacy is a user right — both relate to data protection but are not interchangeable — see Confidentiality entry |
| Security | Referring to the technical systems and measures used to protect data from breaches or unauthorized access | Security describes the mechanisms; Privacy describes the principle and the user's right — see Confidentiality entry |
| Data protection | Referring to the broader set of practices, policies, and legal obligations governing how personal data is handled | Data protection is the umbrella; Privacy is one principle within it — use Data protection in legal or compliance contexts, Privacy in user-facing copy |
| Consent | Referring to the user's explicit agreement to the collection or use of their personal data — ex. cookie consent, marketing consent | Consent is the mechanism by which users exercise their privacy rights — the two frequently appear together in data handling flows but are not synonyms |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Privacy notice / Terms of service | Presenting the two primary legal documents users must acknowledge — ex. "By continuing, you agree to our Privacy notice and Terms of service" | Always present both documents when both apply — Privacy notice covers data handling; Terms of service covers product use |
| Privacy / Settings | Referring to the configuration section where users manage data and consent preferences — ex. "Privacy settings" | Always use Settings as the compound counterpart — never "Privacy preferences" or "Privacy options" as the section label |
| Read our privacy notice / Manage your privacy settings | Presenting the legal disclosure alongside the user's active control point — ex. in a consent banner or onboarding flow | Privacy notice is read-only; Privacy settings is where the user acts — always offer both when the surface involves data consent |

**In context:**

- ✅ "Privacy settings"
- ✅ "Read our privacy notice"
- ✅ "Your privacy"
- ✅ "We respect your privacy."
- ✅ "Privacy notice" — legal document label
- ✅ "By continuing, you agree to our Privacy notice and Terms of service."
- ❌ "Privacy policy" — not the established term for the legal document; use Privacy notice
- ❌ "Privacy statement" — not the established term; use Privacy notice
- ❌ "Confidentiality settings" — Confidentiality refers to protection from unauthorized access, not user data control; use Privacy settings
- ❌ "Security notice" — Security describes technical protection mechanisms, not data handling; use Privacy notice

**Notes:** Privacy and Confidentiality are closely related but describe different concepts. Privacy is a user right — the person controls how their data is collected and used. Confidentiality is a protection principle — information is guarded against unauthorized access. In user-facing copy, default to Privacy for anything involving the user's control over their personal data. Privacy notice is the established product term for the legal document describing data handling — never substitute Privacy policy or Privacy statement, regardless of how these documents are labeled in industry conventions elsewhere.

---

### Profile

**Definition:** The page, section, or collection of data representing a user within the context of an app, product, or service — including identity details such as avatar, name, username, and biography.

**Use when:** Referring to the user-facing identity data a person presents within the product — ex. "Edit profile", "View profile", "Profile picture." Use on profile pages, social or collaborative surfaces, and any surface where the user's in-app identity — how they appear to themselves and others — is the subject. Distinct from Account, which contains private settings and functional data — see Related terms.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Profile | ✅ Use | Lowercase in body copy — ex. "Edit your profile"; capitalize as a navigation label or section title — ex. "Profile" |
| Profile [qualifier] | ✅ Use | Use when specifying the profile element adds clarity — ex. "Profile picture", "Profile settings", "Driver profile", "Operator profile" |
| Account | ❌ Avoid | Reserved for the page or section containing a user's private settings, credentials, and functional data — not the user's in-app identity — see Related terms |
| Bio | ⚠️ Conditional | Acceptable as a field label for the biography section of a profile — ex. "Add a bio"; not a synonym for Profile itself |
| Avatar | ⚠️ Conditional | Acceptable as a label for the user's profile image or icon — ex. "Upload an avatar"; not a synonym for the full profile |
| User page | ❌ Avoid | Informal and non-standard — does not convey the identity-focused purpose of a profile |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Account | Referring to the page or section containing a user's private settings, credentials, security options, and payment or subscription information | Account holds private, functional data the user manages for themselves; Profile holds the user's identity as it appears within the app — never use as synonyms — see Account entry |
| Driver profile | Referring specifically to the profile data associated with a vehicle driver in a fleet or telematics context | Driver profile is a product-specific compound — use when the profile is scoped to a driver persona rather than a general user — see Driver entry |
| Operator profile | Referring specifically to the profile data associated with a machine operator in a fleet or job site context | Operator profile is a product-specific compound — use when the profile is scoped to an operator persona — see Operator entry |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Profile / Account | Referring to the user's in-app identity and their private settings as two distinct but related destinations — ex. in navigation or settings copy | Profile and Account are distinct destinations — Profile is public-facing or app-contextual; Account is private and functional — both may appear in the same navigation without overlapping — see Account entry |
| Profile picture / Profile name | Referring to the two primary visible identity elements of a user's profile — ex. in profile setup or editing flows | Use Profile picture and Profile name as the standard compound labels — never "Avatar name" or "User image" in standard product copy |

**In context:**

- ✅ "Edit profile"
- ✅ "View profile"
- ✅ "Profile picture"
- ✅ "Driver profile"
- ✅ "Set up your profile"
- ✅ "Your profile is visible to other members."
- ❌ "Edit account" — when the user is changing their in-app identity details; use Edit profile
- ❌ "View user page" — informal and non-standard; use View profile
- ❌ "Profile or account" — do not treat as interchangeable; Profile is in-app identity, Account is private settings — use each in its correct context

**Notes:** Profile and Account are the most consistently confused pair in this glossary because both relate to the user and often appear in the same navigation. The distinction is scope and audience. Profile is the user's identity within the app — what they present to the product and potentially to other users. Account is the user's private configuration layer — credentials, billing, security. A user edits their Profile to change their display name; they manage their Account to change their password. On surfaces where both appear in navigation, always treat them as distinct destinations with distinct purposes.

---

### Profile image / Profile photo / Avatar

**Definition:** A user's visual representation within a product — either chosen by the user or automatically generated by the system.

**Use when:** Referring to the image or graphic that visually identifies a user within the product. Use Profile image as the default term when the representation can be either a photograph or a graphic. Use Profile photo when the representation is specifically a photographic image. Use Avatar when the representation is specifically a system-generated or illustrated graphic identity — ex. an auto-generated icon or illustrated character.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Profile image | ✅ Use | Default term — use when the representation can be either a photograph or a graphic — ex. "Upload a profile image", "Change your profile image" |
| Profile photo | ✅ Use | Use when the representation is specifically a photographic image — ex. "Upload a profile photo", "Take a profile photo" |
| Avatar | ✅ Use | Use when the representation is specifically a system-generated or illustrated graphic — ex. "Your avatar", "Default avatar"; also acceptable when the product's established convention uses Avatar across all representation types |
| Profile picture | ⚠️ Conditional | Widely used and widely understood — acceptable when established as the product convention; Profile image is preferred for new copy as it more accurately covers both photographic and graphic representations |
| Thumbnail | ❌ Avoid | Refers to a small preview image — not the user's identity representation |
| Icon | ❌ Avoid | Implies a UI symbol or action element — not a personal identity representation |
| Headshot | ❌ Avoid | Implies a formal professional photograph — too narrow for a general user representation |
| Photo | ❌ Avoid | Alone without "Profile" — too generic and does not convey the identity-representation purpose |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Profile | Referring to the full page, section, or collection of data representing the user within the product | Profile image is one element of the profile — not a synonym for the profile itself — see Profile entry |
| Username | Referring to the text-based identifier paired with the profile image in a user's identity — ex. displayed alongside the avatar in a navigation header | Profile image and Username are the two primary identity elements — both may appear together but refer to distinct things |
| Display name | Referring to the user's chosen name as it appears within the product — ex. alongside their profile image | Display name is the text identity; Profile image is the visual identity — use consistently as a pair in profile setup flows |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Profile image / Display name | Presenting the user's visual and text identity elements together — ex. in profile setup, editing flows, or user-facing identity displays | Profile image and Display name are the canonical identity pair — use both consistently across all surfaces where the user's identity is presented |
| Upload profile image / Remove profile image | Describing the action of adding and removing a user's visual representation | Always use Remove as the counterpart to Upload — never "Delete profile image" unless the image is being permanently destroyed from the system |

**In context:**

- ✅ "Upload a profile image" — when the image can be a photo or graphic
- ✅ "Upload a profile photo" — when specifically a photograph is expected
- ✅ "Your avatar" — when the representation is system-generated or illustrated
- ✅ "Change your profile image"
- ✅ "No profile image added yet."
- ❌ "Upload a thumbnail" — Thumbnail is a preview image, not an identity representation; use Profile image
- ❌ "Upload a headshot" — too formal and narrow; use Profile photo if a photograph is specifically required
- ❌ "Upload a photo" — too generic without "Profile"; use Profile photo
- ❌ "Upload an icon" — Icon implies a UI element, not a personal identity graphic; use Avatar or Profile image

**Notes:** Profile image, Profile photo, and Avatar are three forms of the same concept scoped by what the representation can be. Profile image is the broadest and safest default — it covers all representation types. Profile photo is narrower — use it only when a photograph is specifically required or expected. Avatar is narrowest — use it when the representation is specifically system-generated, illustrated, or non-photographic, or when the product has established Avatar as its convention. Never use all three terms interchangeably on the same surface — pick one and apply it consistently.

---

### Read [content] / Read more

**Definition:** A navigation action that directs the user to a specific piece of long-form text content — ex. an article, report, or document — for a more detailed reading experience.

**Use when:** Directing the user to a specific, named piece of long-form written content — ex. "Read our monthly report", "Read the case study", "Read the release notes." Always use a descriptive label that names the content whenever space allows. Reserve "Read more" for contexts where space is genuinely too limited or the content is already clearly identified from surrounding context. Use Read when the destination is specifically text-based and long-form; use Learn when the destination may contain mixed content types — see Related terms.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Read [content] | ✅ Use | Preferred form — always name the content when space allows — ex. "Read our monthly report", "Read the case study", "Read the release notes" |
| Read more | ✅ Use | Acceptable fallback when space is limited or the content is already clearly identified from surrounding context — avoid as a default; always prefer a descriptive label |
| Read the full [content] | ✅ Use | Use when emphasizing that the full version of a previewed or truncated piece is available — ex. "Read the full report", "Read the full article" |
| Learn more | ⚠️ Conditional | Acceptable when the destination contains mixed content types — ex. video, interactive elements, or a combination of formats — rather than specifically long-form text — see Related terms and Learn entry |
| Find out more | ❌ Avoid | Informal and verbose — Read more conveys the same meaning more concisely |
| Click here | ❌ Avoid | Directional and inaccessible — never use as a navigation label |
| See more | ⚠️ Conditional | Acceptable in visual or media content contexts where the user is expanding a view rather than reading text — ex. "See more photos"; not a synonym for Read more in text-based contexts |
| View more | ⚠️ Conditional | Acceptable when the additional content is visual or data-based rather than text-based — ex. "View more results"; not a synonym for Read more in editorial or long-form contexts |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Learn [topic] or Learn more | The destination contains mixed content types — ex. a feature overview page with video, interactive demos, and text — rather than specifically long-form written content | Read is for text-based destinations; Learn is for mixed-format or educational destinations — use Learn when the format of the destination is broader than written text — see Learn entry |
| Download [content] | The destination is a file the user will save to their device — ex. "Download the report", "Download the PDF" | Use Download when the content is a file to be saved rather than content to be read in place — see Download entry |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Read more / Show less | Presenting the option to expand and collapse inline text content — ex. a truncated article preview or product description | Use Show less as the counterpart when the content is expanded inline — never "Read less" or "Collapse" |
| Read [content] / Learn more | Presenting a specific reading CTA alongside a broader informational CTA — ex. on a feature or product overview surface | Read [content] is the specific, text-based option; Learn more is the broader, mixed-format option — always use Read [content] when the destination is a named document or article |

**In context:**

- ✅ "Read our monthly report"
- ✅ "Read the case study"
- ✅ "Read the full article"
- ✅ "Read more" — when space is limited or content is clear from context
- ✅ "Read the release notes"
- ❌ "Find out more" — verbose; use Read more or a descriptive Read [content] label
- ❌ "Click here to read more" — never use directional language; use the action label alone
- ❌ "View our monthly report" — View implies passive observation; use Read for text-based content the user will engage with

**Notes:** Read and Learn more occupy adjacent positions in the navigation vocabulary — both direct the user to more information, but Read is specifically for long-form written content and Learn is for destinations with mixed content types. On surfaces where a named document or article is the destination, Read [content] is always the right choice. Read more is a useful fallback but should be treated as a last resort in the same way as Learn more — a descriptive label always serves the user better by telling them exactly what they will find. For screen reader users who navigate by link text alone, "Read more" and "Learn more" are effectively meaningless without surrounding context.

---

### Register

**Definition:** The action of completing a formal enrollment process that requires detailed or sensitive information from the user — ex. registering a company, a vehicle, or a product for warranty purposes.

**Use when:** Describing a formal, multi-step enrollment process that collects more comprehensive or sensitive information than a simple sign-up — ex. "Register your company", "Register your vehicle", "Register your product." Use when the registration involves official, legal, or detailed data — ex. company details, vehicle identification numbers, ownership documentation. Distinct from Create account (access-based registration) and Sign up (simple, lightweight enrollment) — see Related terms.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Register | ✅ Use | — |
| Register [object] | ✅ Use | Always pair with the item being registered for clarity — ex. "Register your company", "Register your vehicle", "Register your product" |
| Sign up | ❌ Avoid | Reserved for simple, cost-free subscriptions to newsletters or events — not for formal enrollment flows requiring detailed or sensitive information — see Related terms |
| Subscribe | ❌ Avoid | Reserved for enrolling in paid services or products with a recurring payment plan — not for formal entity or asset registration — see Related terms |
| Enroll | ⚠️ Conditional | Acceptable in education or program-based contexts — ex. "Enroll in the training program"; not a general synonym for Register in company, vehicle, or product registration contexts |
| Join | ❌ Avoid | Implies entering a community or group — does not convey the formal, documentation-heavy nature of registration |
| Apply | ⚠️ Conditional | Acceptable when the registration involves an approval step — ex. "Apply for a permit"; not a synonym for Register when no approval is required |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Sign up | Initiating a simple, cost-free subscription to a newsletter, event, or lightweight service — ex. "Sign up for our newsletter", "Sign up for the webinar" | Sign up is lightweight and informal; Register is formal and requires more information — never use as synonyms |
| Create account | Getting registration-based access to an app, product, or service — ex. "Create an account to get started" | Create account is for digital access; Register is for formal enrollment of an entity or asset — use Create account when the outcome is a product login, Register when the outcome is an official record |
| Subscribe | Enrolling in a paid service or product with a recurring payment plan — ex. "Subscribe to Fleet Manager Pro" | Subscribe implies a financial commitment with recurring billing; Register implies a formal enrollment process — never use as synonyms |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Register / Cancel registration | Describing the action of formally enrolling and removing an entity or asset from a registry — ex. a vehicle, company, or product | Use Cancel registration as the counterpart — never "Deregister", "Unregister", or "Remove registration" |
| Register / Confirm registration | Presenting the registration action and the post-submission confirmation state — ex. "Register your vehicle" → "Confirm your registration" | Always follow a registration flow with a confirmation step that summarizes what was registered — see Confirmation entry |

**In context:**

- ✅ "Register your company"
- ✅ "Register your vehicle"
- ✅ "Register your product"
- ✅ "Complete your registration"
- ❌ "Sign up your company" — Sign up is for lightweight, cost-free subscriptions; use Register for formal enrollment flows
- ❌ "Subscribe your vehicle" — Subscribe implies a recurring payment plan; use Register for formal asset enrollment
- ❌ "Join the fleet registry" — Join implies community membership; use Register for formal enrollment
- ❌ "Create account for your vehicle" — Create account is for digital product access; use Register for asset registration

**Notes:** Register, Sign up, Create account, and Subscribe describe four distinct enrollment patterns. Register is for formal, documentation-heavy enrollment of an entity or asset — a company, vehicle, or product. Create account is for gaining digital access to a product. Sign up is for lightweight, free subscriptions to communications or events. Subscribe is for ongoing paid access with recurring billing. The four are never interchangeable — each signals a different level of commitment, data requirement, and outcome to the user. Using Register where Sign up is correct will make a simple action feel unnecessarily heavy; using Sign up where Register is correct will underset user expectations for a complex process.

---

### Reject

**Definition:** The action of explicitly refusing consent to a request or prerequisite within an app, flow, or process.

**Use when:** Labeling the action of refusing a request or prerequisite — ex. "Reject all cookies", "Reject terms", "Reject request." Use when the user is actively declining something presented to them — a permission request, a consent requirement, a mandatory condition, or a third-party action. Distinct from Cancel, which abandons a user-initiated flow, and from No, which refuses a sensitive user-initiated action — see Related terms.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Reject | ✅ Use | — |
| Reject [object] | ✅ Use | Always pair with the item being rejected for clarity — ex. "Reject all cookies", "Reject request", "Reject terms" |
| Decline | ⚠️ Conditional | Acceptable in polite or low-stakes refusal contexts — ex. declining an invitation or a suggested action; carries a softer tone than Reject and may be appropriate on social or collaborative surfaces |
| Deny | ❌ Avoid | Implies a system or authority withholding something from the user — not the user actively refusing a request; also carries a negative, punitive connotation |
| Refuse | ❌ Avoid | Informal in UI copy — carries a stronger negative register than Reject without adding clarity |
| Block | ⚠️ Conditional | Acceptable when the action prevents future requests from a specific source — ex. "Block this sender", "Block notifications from this app"; not a general synonym for Reject on consent dialogs |
| Cancel | ❌ Avoid | Reserved for abandoning a user-initiated flow or process — not for refusing a presented request or requirement — see Related terms |
| No | ❌ Avoid | Too informal and context-free as a standalone label on consent dialogs — use Reject when refusing a request; use No, [clarification] when refusing a sensitive user-initiated action — see No entry |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Cancel | The user is abandoning an ongoing flow or process they initiated — typically without saving progress | Cancel exits a flow; Reject refuses a presented request — never use as synonyms — see Cancel entry |
| No | The user is refusing a sensitive, impactful, or irreversible action they are being asked to confirm — ex. "No, keep my account" | No is for refusing user-initiated actions; Reject is for refusing externally presented requests or prerequisites — the two operate at different levels of the consent vocabulary — see No entry |
| Allow | The user is granting optional permission for a feature or service | Allow is the positive counterpart to Reject in permission request dialogs — ex. "Allow" / "Reject" on a camera or location access prompt — see Allow entry |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Reject / Accept | Describing the action of refusing or consenting to a mandatory requirement — ex. terms, conditions, or a gating consent | Always use Accept as the positive counterpart — never "Allow", "Approve", or "Agree" when Reject is the negative option — see Accept entry |
| Reject / Allow | Describing the action of refusing or granting optional permission — ex. a camera, location, or notification access request | Always use Allow as the positive counterpart when the permission is optional — never "Accept" when Allow is the established counterpart — see Allow entry |
| Reject all / Accept all | Presenting bulk consent options for a set of items — ex. cookie categories, notification types | Always pair Reject all with Accept all — never "Reject all" / "Allow all" or mixed counterpart labels on the same surface |

**In context:**

- ✅ "Reject all cookies"
- ✅ "Reject request"
- ✅ "Reject terms"
- ✅ "Reject all" — bulk refusal label
- ❌ "Deny cookies" — Deny implies a system withholding access; use Reject for the user actively refusing
- ❌ "Refuse cookies" — informal register; use Reject
- ❌ "Cancel cookies" — Cancel is for abandoning flows; use Reject for refusing a presented consent request
- ❌ "No to all" — informal and context-free; use Reject all

**Notes:** Reject, Cancel, and No all express refusal but at different levels and in different directions. Reject refuses something presented to the user — a request, a permission, a consent requirement. Cancel abandons something the user initiated — a flow, a process. No refuses a sensitive action the user is being asked to confirm about something they themselves started. On surfaces where both a consent refusal and a flow exit are available — ex. a cookie consent dialog with both "Reject all" and a close button — the labels must be consistent with this distinction to avoid user confusion about what each action does.

---

### Remove

**Definition:** The action of excluding a user, account, connection, or device from a list — suspending their access and removing their entry from a specific registry or record set, without permanently destroying the underlying item.

**Use when:** Describing the action of excluding a specific item from a list or collection — ex. "Remove AA00FHAE", "Remove member", "Remove device." Use when the item is being taken out of a specific context or list and its entry in that registry is removed, without necessarily permanently destroying the underlying data. Distinct from Disconnect, which interrupts access while keeping the item in the list, and from Delete, which permanently destroys the item — see Related terms.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Remove | ✅ Use | — |
| Remove [object] | ✅ Use | Always pair with the item being removed for clarity — ex. "Remove AA00FHAE", "Remove member", "Remove device" |
| Delete | ❌ Avoid | Implies permanent destruction of a specific item — Remove may suspend access or delete from a list without permanently destroying the underlying record — see Related terms |
| Disconnect | ❌ Avoid | Interrupts access while keeping the item in the list — Remove excludes the item from the list entirely — see Related terms |
| Exclude | ⚠️ Conditional | Acceptable in filtering or reporting contexts where an item is being omitted from a data set — ex. "Exclude from report"; not a general synonym for Remove in list or access management contexts |
| Revoke | ⚠️ Conditional | Acceptable in admin or developer-facing contexts where access rights are being formally withdrawn — ex. "Revoke access"; too formal for standard user-facing list management copy |
| Unlink | ❌ Avoid | Implies removing a navigational reference or association — not excluding an item from a list or suspending its access |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Disconnect | Interrupting the access of a device, account, or item while keeping it in the access list — ex. "Disconnect AA00FHAE" | Disconnect is reversible and preserves the item in the list; Remove excludes the item from the list and may delete it from records — never use as synonyms — see Disconnect entry |
| Delete | Permanently destroying a specific, user-selected item with no intent to retain it — ex. "Delete file", "Delete account" | Delete permanently destroys; Remove excludes from a context — use Delete only when the item will not be recoverable — never use as synonyms — see Delete entry |
| Archive | Moving an item to long-term storage for retention — ex. "Archive order", "Archive conversation" | Archive retains the item in a stored state; Remove takes it out of active context and may delete it — use Archive when retention is the intent — see Archive entry |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Remove / Add | Describing the action of excluding and including an item in a list or collection — ex. in member management or device lists | Always use Add as the counterpart — never "Insert" or "Include" when the primary action is adding to a list — see Add entry |
| Remove / Restore | Describing the action of excluding an item from a list and returning it to that list — ex. in a soft-delete or recoverable removal pattern | Use Restore as the counterpart when the removed item can be returned to the list — never "Re-add" or "Undo remove" |

**In context:**

- ✅ "Remove AA00FHAE"
- ✅ "Remove member"
- ✅ "Remove device"
- ✅ "Remove from list"
- ✅ "AA00FHAE has been removed."
- ❌ "Delete AA00FHAE" — Delete implies permanent destruction; use Remove when the item is being excluded from a list
- ❌ "Disconnect AA00FHAE" — Disconnect keeps the item in the list; use Remove when the item is being excluded entirely
- ❌ "Unlink AA00FHAE" — Unlink refers to navigational associations; use Remove for list exclusion

**Notes:** Remove, Disconnect, and Delete sit close together in the access management vocabulary but describe meaningfully different outcomes. Disconnect interrupts access and preserves the item in the list — it is reversible. Remove excludes the item from the list and may delete it from records — it may or may not be reversible depending on the product. Delete permanently destroys the item — it is never reversible. On surfaces where all three actions are available for the same item — ex. a connected device management screen — the labels must accurately reflect each outcome so users can make an informed choice before acting.

---

### Reset

**Definition:** The action of returning data, settings, or a surface to its initial or default state — discarding any user-made changes or accumulated content in the process.

**Use when:** Describing the action of restoring something to its original or default state — ex. "Reset history", "Reset filters", "Reset to default." Use in settings, filter panels, and any surface where the user can undo accumulated changes or customizations and return to the starting configuration. Distinct from Clear, which empties a surface without restoring a default, and from Delete, which permanently removes specific items — see Related terms.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Reset | ✅ Use | — |
| Reset [object] | ✅ Use | Always pair with the item being reset for clarity — ex. "Reset history", "Reset filters", "Reset password" |
| Reset to default | ✅ Use | Use when emphasizing that the action returns the item to its factory or system-defined state — ex. "Reset to default settings" |
| Delete | ❌ Avoid | Permanently removes a specific user-selected item — Reset restores a default state without necessarily destroying any underlying record — see Related terms |
| Remove | ❌ Avoid | Excludes an item from a list or collection — Reset returns a configuration to its original state — never use as synonyms — see Related terms |
| Clear | ❌ Avoid | Removes all content from a surface without restoring a prior state — Reset implies a known default exists; Clear simply empties — see Related terms |
| Undo | ⚠️ Conditional | Acceptable when reversing the immediately preceding user action — not for returning a full configuration to its original state; Undo is step-by-step, Reset is wholesale |
| Restore | ⚠️ Conditional | Acceptable when returning an archived or removed item to active use — ex. "Restore archive"; not a general synonym for Reset when returning settings to a default state |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Clear | Removing all content from a page, form, or input field in a single operation — ex. "Clear all filters", "Clear data" | Clear empties a surface; Reset returns it to a known default state — the result of Clear may be blank, the result of Reset is a pre-defined state — use Reset when a default exists, Clear when the result is simply empty — see Clear entry |
| Delete | Permanently removing a specific, user-selected item — ex. "Delete file", "Delete account" | Delete destroys a specific item; Reset restores a configuration — never use as synonyms — see Delete entry |
| Undo | Reversing the immediately preceding action — ex. a typed character, a moved item, a single setting change | Undo is incremental and action-specific; Reset is wholesale and configuration-wide — use Undo for step-by-step reversals, Reset for returning an entire configuration to its default |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Reset / Apply | Presenting the option to restore defaults and confirm a new configuration — ex. in a settings or filter panel | Always use Apply as the forward counterpart — never "Save" when the primary action on the surface is applying a configuration rather than saving content |
| Reset / Change | Presenting the option to restore the default state and make a new modification — ex. on a settings item where the current value can be reset or replaced | Reset returns to the default; Change modifies the current value — both may appear on the same surface for the same item — see Change entry |

**In context:**

- ✅ "Reset history"
- ✅ "Reset filters"
- ✅ "Reset to default"
- ✅ "Reset password"
- ✅ "Reset to default settings"
- ❌ "Delete history" — when the intent is returning to a default state, not permanently destroying records; use Reset
- ❌ "Clear filters" — when the filter panel has defined defaults to return to; use Reset — use Clear only when the result is an empty state with no prior default
- ❌ "Remove filters" — Remove excludes items from a list; use Reset for returning a filter state to its default configuration

**Notes:** Reset, Clear, and Delete all result in something being removed or changed, but at different levels and with different outcomes. Reset returns a configuration to a known default — the surface returns to a defined prior state. Clear empties a surface — no default is implied, the result is simply blank. Delete permanently destroys a specific item — nothing is returned to a prior state. The practical test: if a defined default exists, use Reset. If the result is simply empty with no prior state to return to, use Clear. If a specific item is being permanently removed, use Delete.

---

### Safety

**Definition:** The condition of being protected from physical harm — encompassing personal safety, vehicle safety, and the safety of drivers, operators, passengers, and bystanders.

**Use when:** Referring to the protection of physical integrity — ex. "Safety features", "Driver safety", "Vehicle safety", "Safety alert." Use in product descriptions, vehicle or machine settings, warning messages, and any surface where the physical wellbeing of a person or the physical integrity of a vehicle or machine is the subject. Distinct from Security, which refers to protection of data or digital systems, and from Confidentiality, which refers to protection of information — see Related terms.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Safety | ✅ Use | Lowercase in body copy — ex. "Driver safety is our priority"; capitalize as a section or feature label — ex. "Safety settings", "Safety alerts" |
| [Qualifier] safety | ✅ Use | Use when specifying the type or subject of safety adds clarity — ex. "Driver safety", "Vehicle safety", "Passenger safety", "Road safety" |
| Safe | ✅ Use | Acceptable as an adjective describing a state — ex. "Keep your drivers safe", "Safe driving"; not a substitute for Safety as a noun label |
| Security | ❌ Avoid | Refers to the protection of data, digital systems, or physical assets from unauthorized access — not physical human or vehicle integrity — see Related terms |
| Protection | ⚠️ Conditional | Acceptable in product descriptions or marketing copy where Safety is the broader concept being expressed — ex. "Driver protection features"; not a standard substitute for Safety as a section or feature label |
| Wellbeing | ⚠️ Conditional | Acceptable when the context extends beyond physical safety to include mental or occupational health — ex. "Driver wellbeing program"; not a synonym for Safety in vehicle or machine contexts |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Security | Referring to the protection of data, digital systems, accounts, or physical assets from unauthorized access or breach | Security is digital and asset-based; Safety is physical and person- or vehicle-based — never use as synonyms; a product can address both simultaneously without conflating the terms |
| Confidentiality | Referring to the protection of information against unauthorized access, use, or disclosure | Confidentiality is an information principle; Safety is a physical condition — see Confidentiality entry |
| Warning | Referring to a system message that creates friction around a destructive action or alerts the user to a required action — ex. a low fuel or overheating warning | Warning is one mechanism for communicating safety-relevant information; Safety is the broader principle those messages serve — see Error entry for the full system message hierarchy |
| Error | Referring to a system message communicating an active or escalating issue that requires user action — including safety-critical situations — ex. "Engine must be stopped to avoid overheating" | Error and Critical/Danger are the system message tiers for communicating active safety threats — see Error entry |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Safety / Security | Referring to both physical and digital protection in the same context — ex. in a product overview or a combined settings section | Safety and Security are distinct but may appear together — always treat them as separate concerns with separate labels; never combine into a single "Safety & Security" section unless the product genuinely addresses both in the same surface |
| Safety / Settings | Referring to the configuration options that control safety-related features — ex. "Safety settings" | Always use Settings as the compound counterpart — never "Safety preferences" or "Safety options" as the section label |
| Safety features / Safety alerts | Referring to the two primary safety-related surfaces — the features that prevent harm and the messages that communicate risk | Safety features are preventive; Safety alerts are reactive — both may appear in the same product but serve distinct purposes |

**In context:**

- ✅ "Driver safety"
- ✅ "Vehicle safety"
- ✅ "Safety features"
- ✅ "Safety alert"
- ✅ "Safety settings"
- ✅ "Keep your drivers safe."
- ❌ "Driver security" — Security refers to data or digital protection; use Safety for physical integrity
- ❌ "Safety or security" — do not treat as interchangeable; use Safety for physical protection and Security for data or system protection separately
- ❌ "Driver protection settings" — Protection is not a standard label; use Safety settings

**Notes:** Safety and Security are the two most commonly conflated protection terms in product copy, particularly in automotive and fleet contexts where both concepts are relevant. Safety is always physical — it refers to the wellbeing of people and the integrity of vehicles or machines. Security is always digital or asset-based — it refers to protecting data, accounts, and systems from unauthorized access. A product can address both simultaneously, but they must always be labeled and discussed as separate concerns. Combining them — ex. "Safety & Security settings" — obscures which type of protection is being managed and should only be used when the section genuinely contains both physical safety and data security controls.

---

### Save

**Definition:** The action of recording the latest information or changes provided by the user — preserving the current state of a file, form, or session for future access.

**Use when:** Describing the action of recording and preserving user input or changes — ex. "Save file", "Save changes", "Save and continue." Use in editing flows, forms, settings, and any surface where the user's work or input needs to be stored. Distinct from Download, which transfers a file to the user's device, and from Submit, which sends data for processing — see Related terms.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Save | ✅ Use | — |
| Save [object] | ✅ Use | Use when naming the item being saved adds clarity — ex. "Save file", "Save report", "Save changes" |
| Save and continue | ✅ Use | Use when saving preserves progress and immediately advances the user to the next step — ex. in a multi-step flow |
| Save and exit | ✅ Use | Use when saving preserves progress and closes the current view or flow — ex. in an editing session |
| Record | ❌ Avoid | Implies logging data for audit or tracking purposes — not preserving user-made changes |
| Refresh | ❌ Avoid | Loads the latest data from a source — not records user-made changes — see Related terms |
| Update | ❌ Avoid | Implies bringing something to a more current or improved state — not a neutral recording action; acceptable as a verb only when the edit has a strong time component — see Edit entry |
| Store | ❌ Avoid | Technical and impersonal — not appropriate for standard user-facing copy |
| Backup | ❌ Avoid | Implies creating a redundant copy for recovery purposes — not the primary save action |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Download | The user is transferring a file from the product to their local device — ex. "Download report", "Download invoice" | Download creates a local copy on the user's device; Save preserves the current state within the product — never use as synonyms — see Download entry |
| Submit | The user is sending completed data for processing, review, or action — ex. "Submit form", "Submit application" | Submit sends data out for an external action; Save records it within the product — the two may appear in sequence but are never synonymous |
| Export | The user is converting and sending data out of the product in a specific format — ex. "Export as CSV" | Export transforms and outputs data; Save preserves the current state — use Export when the output format is the primary concern — see Download entry |
| Refresh | Loading the latest data from a source into the current view — ex. "Refresh the dashboard", "Refresh your feed" | Refresh pulls in new data from outside; Save records changes made within the product — never use as synonyms — see Load / Reload entry |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Save / Discard | Presenting the user with the option to record or abandon their changes — ex. when navigating away from an unsaved editing session | Always use Discard as the counterpart when the alternative to saving is abandoning changes — never "Cancel changes", "Don't save", or "Undo" |
| Save / Edit | Describing the two primary states of a content editing cycle — modifying and recording — ex. on a form or document surface | Save completes the edit cycle; Edit initiates it — both may appear on the same surface at different moments — see Edit entry |
| Save and continue / Go back | Presenting the option to save and advance or return to the previous step — ex. in a multi-step flow where progress must be preserved | Save and continue is the forward action; Go back is the backward action — always offer both when the flow is multi-step and progress can be lost |

**In context:**

- ✅ "Save file"
- ✅ "Save changes"
- ✅ "Save and continue"
- ✅ "Save and exit"
- ✅ "Your changes have been saved."
- ❌ "Record changes" — Record implies audit logging; use Save for preserving user input
- ❌ "Refresh to save" — Refresh pulls in new data; it does not save changes; use Save
- ❌ "Update file" — Update implies improvement or currency; use Save for neutral recording of user changes
- ❌ "Store file" — technical and impersonal; use Save file

**Notes:** Save is the default term for recording user input or changes within a product. Three boundaries matter most in practice: Save vs. Download (within product vs. local device), Save vs. Submit (record for future access vs. send for external action), and Save vs. Discard (preserve vs. abandon). When a multi-step flow requires preserving progress before advancing, "Save and continue" is the standard compound — it signals both that progress is preserved and that the user is moving forward, removing ambiguity about whether the save action also closes the view.

---

### Search

**Definition:** The action of retrieving information or items that correspond to a user's specific query or search term.

**Use when:** Describing the action or mechanism for retrieving results based on a user's query — ex. "Search", "Search by date", "Search by name." Use as a standalone label when the search scope is clear from context, or with a descriptive attribute when specifying the searchable field or method helps the user. Use on search bars, input fields, and any surface where the user enters a query to retrieve specific results. Distinct from Filter, which narrows an existing result set by criteria, and from Discover / Explore, which invites open-ended browsing — see Related terms.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Search | ✅ Use | Acceptable as a standalone label when the scope is clear — ex. as a field placeholder, a button label, or a section title |
| Search by [attribute] | ✅ Use | Use when specifying the searchable field reduces friction or sets expectations — ex. "Search by date", "Search by name", "Search by vehicle ID" |
| Search [object] | ✅ Use | Use when naming the searchable content type adds clarity — ex. "Search images", "Search drivers", "Search the Help Center" |
| Find | ❌ Avoid | Implies locating a specific known item rather than retrieving results from a query — not a general synonym for Search |
| Filter | ❌ Avoid | Narrows an existing result set by criteria — not a query-based retrieval — see Related terms |
| Look up | ❌ Avoid | Informal and imprecise — not appropriate for product search labels |
| Seek | ❌ Avoid | Formal and uncommon in UI copy — not appropriate for search labels |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Filter | Narrowing an existing result set by user-selected criteria — ex. "Filter by location", "Filter by status" | Filter operates on a result set already retrieved; Search generates a new result set from a query — the two frequently coexist but are never synonymous — see Filter entry |
| Discover / Explore | Directing the user to browse open-ended content without a specific query — ex. "Discover our offer", "Explore features" | Discover and Explore invite curiosity; Search retrieves specific results from a query — never use as synonyms — see Discover / Explore entry |
| Sort | Reordering an existing result set by a specific attribute — ex. "Sort by date", "Sort by relevance" | Sort reorders results; Search generates them — use Sort to describe ordering within search results, never as a synonym for Search |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Search / Filter | Presenting both a query-based retrieval and a criteria-based narrowing control on the same surface — ex. a list view or results page | Search and Filter are complementary — Search generates the result set; Filter narrows it — always label them distinctly when both appear on the same surface — see Filter entry |
| Search / Sort | Presenting both a query input and a result ordering control on the same surface | Search retrieves results; Sort orders them — both may appear on the same surface and must remain distinctly labeled |
| Search / Clear | Presenting the search action and the option to remove the current query and results — ex. a search bar with a clear button | Always use Clear as the counterpart when the action removes the current query — never "Reset search", "Delete search", or "Remove query" — see Clear entry |

**In context:**

- ✅ "Search"
- ✅ "Search by date"
- ✅ "Search by name"
- ✅ "Search vehicles"
- ✅ "Search the Help Center"
- ✅ "No results for your search. Try different keywords."
- ❌ "Find by date" — Find implies locating a specific known item; use Search for query-based retrieval
- ❌ "Filter by name" — Filter narrows an existing result set; use Search when the user is entering a query to retrieve results
- ❌ "Look up driver" — informal; use Search driver or Search by name

**Notes:** Search and Filter are the two most commonly paired — and confused — retrieval mechanisms. Search generates a result set from a query the user enters. Filter narrows a result set that already exists. Both can appear on the same surface and serve complementary purposes — a user might Search for "Stockholm" and then Filter the results by date range. On surfaces where both are present, labeling them consistently and distinctly is essential: Search for the query input, Filter for the criteria controls, Sort for the ordering control. Never use any of the three as a synonym for another.

---

### Security

**Definition:** The protection of digital systems, accounts, and connections from unauthorized access, breaches, or malicious activity.

**Use when:** Referring to the protection of digital integrity — ex. "Security settings", "Account security", "Connection security", "Security code." Use in account settings, authentication flows, and any surface where the protection of digital systems, user credentials, or data connections is the subject. Distinct from Safety, which refers to physical integrity, and from Privacy, which refers to the user's right to control their personal data — see Related terms.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Security | ✅ Use | Lowercase in body copy — ex. "Protect your account security"; capitalize as a section or settings label — ex. "Security settings" |
| [Qualifier] security | ✅ Use | Use when specifying the type or subject of security adds clarity — ex. "Account security", "Connection security", "App security" |
| Safety | ❌ Avoid | Refers to physical integrity — not the protection of digital systems or credentials — see Safety entry |
| Protection | ⚠️ Conditional | Acceptable in marketing or product description copy where Security is the broader concept — ex. "Account protection features"; not a standard substitute for Security as a section or settings label |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Safety | Referring to the protection of physical integrity — ex. driver safety, vehicle safety, passenger safety | Safety is physical; Security is digital — never use as synonyms; a product can address both without conflating the terms — see Safety entry |
| Privacy | Referring to the user's right to control how their personal data is collected, used, and shared | Privacy is a user right over data; Security is the technical mechanism that protects it — related but distinct; see Privacy entry |
| Authentication | Referring to the process of confirming a user's identity through a credential or second security layer | Authentication is one mechanism within the broader Security domain — not a synonym for Security itself — see Authentication entry |
| Confidentiality | Referring to the protection of information against unauthorized access, use, or disclosure | Confidentiality is an information principle; Security is the set of technical measures that enforce it — see Confidentiality entry |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Security / Settings | Referring to the configuration options that control account, connection, or app security — ex. "Security settings" | Always use Settings as the compound counterpart — never "Security preferences" or "Security options" as the section label |
| Security code | Referring to a numerical or alphanumeric code used to verify identity or authorize a specific action — ex. "Enter your security code" | Always use Security code as the full compound — never "Sec code", "Auth code", or "Verification code" when Security code is the established term on the surface |
| Security alert | Referring to a system message that notifies the user of a potential or confirmed security threat — ex. "Security alert: Unrecognized sign-in detected" | Security alert is the standard compound for security-related notifications — always use Alert, never "Security warning" or "Security error" for notification-level messages |
| Security / Safety | Referring to both digital and physical protection in the same context — ex. in a product overview or settings section | Security and Safety are distinct — always treat as separate concerns with separate labels; only combine into a "Security & Safety" section when the surface genuinely addresses both — see Safety entry |

**In context:**

- ✅ "Security settings"
- ✅ "Account security"
- ✅ "Connection security"
- ✅ "Security code"
- ✅ "Security alert"
- ✅ "App security"
- ❌ "Safety settings" — when the context is digital protection of accounts or systems; use Security settings
- ❌ "Security or privacy" — do not treat as interchangeable; Security is the technical protection mechanism, Privacy is the user's data right — use each in its correct context
- ❌ "Security preferences" — not a standard section label; use Security settings

**Notes:** Security, Safety, and Privacy are three distinct protection concepts that are frequently conflated in product copy, particularly in automotive and fleet products where all three are relevant simultaneously. Security is digital — it protects accounts, systems, and connections from unauthorized access. Safety is physical — it protects people and vehicles from harm. Privacy is a right — it gives users control over how their personal data is handled. A product can and often does address all three, but they must always be labeled and discussed as separate concerns. The practical test: if the subject is a password, a login, a connection, or a system — use Security. If the subject is a person, a vehicle, or physical harm — use Safety. If the subject is personal data and user control — use Privacy.

---

### Secure connection

**Definition:** A reliable and private connection between a user and a system that is protected against unauthorized access, interception, or tampering.

**Use when:** Referring to a connection that is encrypted or otherwise protected from unauthorized access — ex. "Secure connection", "Your connection is secure", "No secure connection detected." Use in connection status indicators, network settings, authentication flows, and any surface where the integrity and privacy of the user's connection is being confirmed or flagged.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Secure connection | ✅ Use | Always use as a two-word compound — ex. "Secure connection established", "No secure connection" |
| Connection is secure | ✅ Use | Acceptable as a status message in body copy — ex. "Your connection is secure"; use Secure connection as the label, Connection is secure as the confirmation copy |
| Encrypted connection | ⚠️ Conditional | Acceptable in developer-facing or technical documentation where the specific mechanism is relevant — ex. "Encrypted connection required"; not appropriate for standard user-facing status copy where Secure connection is clearer |
| Safe connection | ❌ Avoid | Safe refers to physical integrity — Security is the correct domain for connection protection — see Safety and Security entries |
| Private connection | ⚠️ Conditional | Acceptable when emphasizing that the connection prevents third-party observation — ex. in a VPN or privacy-focused context; not a general synonym for Secure connection |
| Protected connection | ❌ Avoid | Vague and non-standard — Secure connection is the established term; Protection is not a standard label in connection status copy |
| HTTPS | ❌ Avoid | Technical protocol identifier — not appropriate for user-facing connection status copy; use Secure connection |
| SSL / TLS | ❌ Avoid | Technical encryption protocol names — never use in user-facing copy; use Secure connection |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Security | Referring to the broader set of digital protection measures for accounts, systems, and connections | Security is the umbrella concept; Secure connection is one specific application of it — see Security entry |
| Connection | Referring to the established link between a device, account, or system — without the security qualifier | Use Connection when the protection state is not the subject; use Secure connection when it is — see Connection entry |
| Authentication | Referring to the process of verifying a user's identity before granting access through a connection | Authentication is one mechanism that contributes to a secure connection — not a synonym for it — see Authentication entry |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Secure connection / No secure connection | The context only accounts for secure connections — ex. a product where all connections are expected to be secure and any deviation is an anomaly | Use No secure connection only when the absence of security is the only possible negative state — never when unprotected connections are a normal product state |
| Secure connection / No connection / Unsecured connection | The context accounts for both secure and non-secure connections — ex. a network or connectivity surface where connections can be absent, active but unprotected, or active and protected | Use all three labels when three states are possible — No connection (no active link), Unsecured connection (active but unprotected), Secure connection (active and protected); never collapse two of these states into a single label |
| Secure connection / Settings | Referring to the configuration options for connection security — ex. "Secure connection settings" | Always use Settings as the compound counterpart — never "Secure connection preferences" or "Secure connection options" |

**In context:**

- ✅ "Secure connection"
- ✅ "Your connection is secure."
- ✅ "No secure connection detected."
- ✅ "Secure connection established."
- ✅ "No connection" — when no active link exists, in a three-state context
- ✅ "Unsecured connection" — when an active but unprotected connection exists, in a three-state context
- ❌ "No secure connection" — when the context includes both absent and unprotected connections as distinct states; use No connection and Unsecured connection separately
- ❌ "Safe connection" — Safe refers to physical integrity; use Secure connection for digital connection protection
- ❌ "HTTPS connection" — technical protocol identifier; use Secure connection for user-facing copy
- ❌ "SSL connection" — technical; use Secure connection
- ❌ "Protected connection" — vague and non-standard; use Secure connection

**Notes:** Secure connection describes both the state and the label — it confirms that a connection is protected and serves as the label when that protection is absent or unavailable. The correct negative counterpart depends on what states the product surface accounts for. When the context only handles secure connections — ex. a product where all connections are expected to be secure — "No secure connection" is the correct negative label. When the context handles both secure and non-secure connections, three distinct states must be labeled separately: "No connection" when no active link exists, "Unsecured connection" when an active link exists but is not protected, and "Secure connection" when an active link is protected. Collapsing these three into two labels — ex. using "No secure connection" to cover both absence and lack of protection — creates ambiguity about whether the connection exists at all. Always use the number of labels that matches the number of distinct states the surface can present. Technical terms like HTTPS, SSL, and TLS describe the mechanisms behind a secure connection — always translate to Secure connection in user-facing copy.

---

### See

**Definition:** A navigation or expansion action that directs the user to a destination with more details or reveals additional content within the current view.

**Use when:** Directing the user to a destination with more details or expanding a section to reveal more content — ex. "See shopping cart", "See full list", "See all results." Always include a descriptive label naming the destination or content whenever space allows. Reserve "See more" for contexts where space is genuinely too limited or the content is already clear from surrounding context — treat it as a fallback, not a default.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| See [destination] | ✅ Use | Preferred form — always name the destination or content — ex. "See shopping cart", "See full list", "See all drivers" |
| See all [content] | ✅ Use | Use when directing the user to a complete list or collection — ex. "See all results", "See all vehicles" |
| See more | ✅ Use | Acceptable fallback when space is limited or content is already clear from context — avoid as a default; always prefer a descriptive label |
| View | ✅ Use | Acceptable alternative with a similar meaning — preferred when the destination is read-only or the content is data-based — ex. "View report", "View invoice" — see Related terms |
| Show more | ⚠️ Conditional | Acceptable when revealing additional hidden items inline without navigating away — ex. expanding a truncated list; not a general synonym for See when navigation to a destination is involved — see Related terms |
| Read more | ⚠️ Conditional | Acceptable when the destination is specifically long-form text content — ex. an article or report — see Read entry |
| Learn more | ⚠️ Conditional | Acceptable when the destination contains mixed content types — ex. a feature overview with video and text — see Learn entry |
| Click here | ❌ Avoid | Directional and inaccessible — never use as a navigation label |
| More | ❌ Avoid | Too generic alone — always pair with a noun or use See more / View more instead |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| View | The destination is specifically read-only or the content is data-based — ex. "View report", "View invoice", "View map" | View implies passive observation; See implies directed navigation to a named destination — use View when no interaction beyond observation is expected, See when the user will interact with the destination |
| Show | Revealing hidden or collapsed content within the current UI without navigating away — ex. "Show details", "Show filters" | Show expands content in place; See navigates or expands to a named destination — never use as synonyms — see Show entry |
| Read | The destination is specifically long-form written content — ex. an article, report, or document | Read is for text-based destinations; See is for any named destination or expansion — see Read entry |
| Learn | The destination contains mixed content types — ex. a feature overview with video, interactive demos, and text | Learn is for educational or mixed-format destinations; See is for any named destination or expansion — see Learn entry |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| See all / See less | Presenting the option to expand and collapse a full list or collection inline | Use See less as the counterpart when the full list is expanded — never "See fewer" or "Collapse" |
| See [destination] / Go back | Presenting a forward navigation CTA alongside a return action — ex. on a summary or preview surface | See [destination] moves the user forward; Go back returns them — see Go back entry |

**In context:**

- ✅ "See shopping cart"
- ✅ "See full list"
- ✅ "See all results"
- ✅ "See all drivers"
- ✅ "See more" — when space is limited or content is clear from context
- ✅ "View report" — when the destination is read-only and data-based
- ❌ "See" — never use alone without a named destination or "more" / "all"
- ❌ "Click here to see more" — never use directional language; use the action label alone
- ❌ "More" — too generic alone; use See more or name the destination
- ❌ "Show cart" — Show reveals hidden content in place; use See shopping cart for navigation to a destination

**Notes:** See, View, Show, Read, and Learn all direct the user toward more content but at different levels of specificity and with different implied interactions. See is the most general — it covers navigation to any named destination and expansion of content within the current view. View is See scoped to read-only or data-based content. Show reveals hidden content in place without navigating. Read is See scoped to long-form text. Learn is See scoped to mixed-format educational content. When the destination is named and specific, See [destination] is always the right choice. When the destination is generic or unnamed, choose the more specific alternative that best matches the content type and interaction expected.

---

### Select

**Definition:** The action of marking specific text, cells, filters, options, or files in preparation for a subsequent action — ex. copying, moving, or applying a setting.

**Use when:** Describing the action of marking one or more items for a subsequent action — ex. "Select model", "Select all", "Select files." Use on forms, tables, file managers, filter panels, and any surface where the user marks items before acting on them. Distinct from Choose, which implies a final decision between options, and from Filter, which narrows a result set by criteria — see Related terms.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Select | ✅ Use | — |
| Select [object] | ✅ Use | Always pair with the item being selected when the target is not clear from context — ex. "Select model", "Select files", "Select date" |
| Select all | ✅ Use | Use when marking all items in a set at once — ex. "Select all", "Select all vehicles" |
| Highlight | ❌ Avoid | Refers to a visual emphasis state — not the action of marking items for a subsequent operation |
| Choose | ❌ Avoid | Implies a final, often irreversible decision between options — not a neutral marking action that precedes a further step — see Related terms |
| Pick | ❌ Avoid | Informal and imprecise — not appropriate for UI action labels |
| Tick | ❌ Avoid | Refers to the visual indicator — not the user action; too informal for standard UI copy |
| Check | ⚠️ Conditional | Acceptable when referring specifically to a checkbox interaction — ex. "Check this box"; not a general synonym for Select across other input types |
| Mark | ⚠️ Conditional | Acceptable in specific content management contexts — ex. "Mark as read"; not a general synonym for Select for marking items for action |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Choose | The user is making a final decision between a set of options — ex. "Choose a plan", "Choose your language" | Choose implies a permanent or consequential decision; Select implies marking for a pending action — use Choose when the decision is the end point, Select when it precedes a further action |
| Filter | The user is narrowing an existing result set by user-selected criteria — not marking specific items for action | Filter operates on a result set; Select marks specific items within it — never use as synonyms — see Filter entry |
| Deselect | The user is unmarking a previously selected item — ex. "Deselect all", "Deselect this file" | Deselect is the canonical counterpart to Select — see Paired terms |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Select / Deselect | Describing the action of marking and unmarking specific items — ex. in a file manager, a table, or a multi-select list | Always use Deselect as the counterpart — never "Unselect", "Uncheck", or "Remove selection" |
| Select all / Deselect all | Presenting the bulk marking and unmarking options for an entire set of items | Always use Deselect all as the counterpart to Select all — never "Unselect all" or "Clear selection" when the action specifically unmarks all items |
| Select / Apply | Presenting the marking action and the action that processes the selection — ex. in a filter panel or a multi-select form | Use Apply as the forward action counterpart when the selection must be confirmed before taking effect — see Filter entry |

**In context:**

- ✅ "Select model"
- ✅ "Select files"
- ✅ "Select all"
- ✅ "Select date"
- ✅ "3 items selected"
- ❌ "Highlight model" — Highlight is a visual emphasis state, not a marking action; use Select
- ❌ "Choose model" — when the user is marking an item for a subsequent action, not making a final decision; use Select
- ❌ "Pick files" — informal; use Select files
- ❌ "Tick this option" — refers to the visual indicator, not the user action; use Select

**Notes:** Select and Choose are the most commonly confused terms in this entry because both involve the user indicating a preference. The distinction is finality and direction. Select marks an item for a pending action — the user still has a next step. Choose makes a decision — the selection is the outcome. On a form where the user marks multiple files before clicking "Move", the marking action is Select. On a pricing page where the user picks a plan to proceed with, the decision action is Choose. Applying this consistently prevents users from being primed for the wrong next step by the label they see.

---

### Share

**Definition:** The action of granting access to a page, piece of information, or unrestricted resource at the user's request.

**Use when:** Describing the action of making content or information accessible to others — ex. "Share referral link", "Share article", "Share location." Use when the shared resource is unrestricted and no invitation or approval process is required. Distinct from Invite, which grants access to restricted spaces or accounts — see Related terms.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Share | ✅ Use | — |
| Share [object] | ✅ Use | Always pair with the item being shared when the target is not clear from context — ex. "Share referral link", "Share article", "Share location" |
| Share with [recipient] | ✅ Use | Use when specifying the recipient adds clarity — ex. "Share with your team", "Share with a contact" |
| Send | ⚠️ Conditional | Acceptable when the sharing mechanism is specifically a direct message or email — ex. "Send via email", "Send to a contact"; not a general synonym for Share when the mechanism is a link or access grant |
| Publish | ⚠️ Conditional | Acceptable when the content is being made publicly available — ex. "Publish your report"; not a synonym for Share when the content is being selectively distributed to specific recipients |
| Distribute | ❌ Avoid | Implies a formal, organized delivery process — not appropriate for conversational user-initiated sharing |
| Forward | ⚠️ Conditional | Acceptable when passing on a received message or document — ex. "Forward this email"; not a general synonym for Share in standard product contexts |
| Broadcast | ❌ Avoid | Implies one-to-many mass delivery — not the selective, user-initiated sharing action this term describes |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Invite | Granting access to a restricted space, account, or resource — ex. "Invite a team member", "Invite to workspace" | Invite implies a gatekeeping step and restricted access; Share implies open, unrestricted access — never use as synonyms — see Invite entry |
| Add | Including a pre-existing item in a list or product area — ex. "Add to favorites", "Add a member" | Add operates on items that already exist; Share grants access to content or resources — never use as synonyms — see Add entry |
| Export | Sending data out of the product in a specific format for external use — ex. "Export as CSV", "Export report" | Export converts and outputs data; Share grants access to content within or linked from the product — use Export when the output format is the primary concern |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Share / Stop sharing | Describing the action of granting and revoking access to a shared resource — ex. location sharing, a live document, or a real-time feed | Always use Stop sharing as the counterpart — never "Unshare", "Remove access", or "Revoke sharing" when the action ends an active sharing session |
| Share / Copy link | Presenting the option to share via the platform's native sharing mechanism or copy a link for manual distribution | Share initiates the platform sharing flow; Copy link gives the user the URL to share manually — both may appear together as complementary options |

**In context:**

- ✅ "Share referral link"
- ✅ "Share article"
- ✅ "Share location"
- ✅ "Share with your team"
- ✅ "Stop sharing location"
- ❌ "Invite referral link" — Invite is for restricted access; use Share for unrestricted content
- ❌ "Distribute article" — formal and imprecise; use Share article
- ❌ "Broadcast location" — implies mass delivery; use Share location
- ❌ "Add referral link" — Add includes items in a list; use Share for granting access to content

**Notes:** Share and Invite are the most important pair to keep distinct in this entry. Share grants access to unrestricted content — a link, an article, a location — where no approval or gatekeeping is involved. Invite grants access to a restricted space or account — a workspace, a team, a product — where the recipient must be explicitly authorized. The distinction matters because Share sets the expectation of immediate, frictionless access, while Invite sets the expectation of a process. Using Share where Invite is correct will mislead users about the nature of the access they are granting or receiving.

---

### Show

**Definition:** The action of revealing hidden or collapsed content within the current UI — without navigating the user away from their current surface.

**Use when:** Describing the action of making hidden or collapsed content visible in place — ex. "Show technical data sheet", "Show more", "Show less." Use when the content appears within the current view and the user does not navigate to a new page or destination. Distinct from See, View, Read, and Learn, which involve navigation to a separate destination — see Related terms.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Show | ✅ Use | — |
| Show [object] | ✅ Use | Use when naming the content being revealed adds clarity — ex. "Show technical data sheet", "Show filters", "Show details" |
| Show more | ✅ Use | Use when revealing additional hidden items within the current view — ex. expanding a truncated list or section |
| Show less | ✅ Use | Use when collapsing previously expanded content — always the counterpart to Show more — see Paired terms |
| Visualize | ❌ Avoid | Implies generating a visual representation of data — not revealing hidden content |
| Check | ❌ Avoid | Implies verifying or reviewing content — not revealing hidden content; also ambiguous with checkbox interactions |
| Display | ❌ Avoid | Technical and passive — describes how the system presents content, not the user's action of revealing it |
| Reveal | ⚠️ Conditional | Acceptable in creative or onboarding contexts where a more dynamic tone is appropriate — not for standard UI action labels |
| Expand | ⚠️ Conditional | Acceptable when the content being revealed occupies more vertical or horizontal space — ex. "Expand details"; use Show when the revealed content was simply hidden, Expand when it physically grows the UI element |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| See | Directing the user to a named destination or expanding content to a separate view — ex. "See full list", "See all results" | See may involve navigation; Show does not — Show reveals content in the current view, See navigates or directs — see See entry |
| View | Accessing read-only or data-based content — ex. "View report", "View invoice" | View implies passive observation of a destination; Show reveals content in place — never use as synonyms |
| Read | Directing the user to a destination with specifically long-form text content — ex. "Read the article" | Read involves navigation to text-based content; Show reveals content within the current view — never use as synonyms — see Read entry |
| Learn | Directing the user to a destination with mixed content types — ex. "Learn how it works" | Learn involves navigation to educational or mixed-format content; Show reveals content in the current view — never use as synonyms — see Learn entry |
| Hide | Collapsing or concealing content that is currently visible — ex. "Hide filters", "Hide details" | Hide is the counterpart to Show when toggling visibility of persistent content — see Paired terms |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Show / Hide | Toggling the visibility of content that persists on the surface — ex. filters, details, a side panel | Use Hide as the counterpart when the content is toggled rather than expanded — never "Close", "Dismiss", or "Collapse" when the content is simply being hidden in place |
| Show more / Show less | Expanding and collapsing truncated content inline — ex. a list with hidden items or a section with collapsed rows | Always use Show less as the counterpart to Show more — never "See less", "Read less", or "Collapse" |
| Show / Hide filters | Toggling the visibility of a filter panel — ex. on a compact or mobile layout where filters are hidden by default | Use Show filters and Hide filters as the standard compound labels — never "Open filters" or "Close filters" when the panel is not navigated to but toggled in place |

**In context:**

- ✅ "Show technical data sheet"
- ✅ "Show more"
- ✅ "Show less"
- ✅ "Show filters"
- ✅ "Show details"
- ✅ "Hide filters" — counterpart to Show filters
- ❌ "Visualize technical data sheet" — Visualize implies generating a visual representation; use Show
- ❌ "Check technical data sheet" — Check implies verification; use Show
- ❌ "Display technical data sheet" — Display is a passive system action, not a user action label; use Show
- ❌ "View more" — when revealing hidden items inline without navigating; use Show more — use View only when the destination is a separate read-only surface

**Notes:** Show is specifically scoped to revealing content within the current view — the user does not leave the surface they are on. This distinguishes it from See, View, Read, and Learn, all of which direct the user to a destination. The practical test: if the content appears in place without a page transition or navigation event, use Show. If the user moves to a new destination, use the appropriate navigation term. When both a Show action and a navigational CTA are present on the same surface — ex. "Show details" to expand a row and "See full profile" to navigate — both labels must be present and distinct so the user understands whether they are staying on the current surface or leaving it.

---

### Sign in

**Definition:**The action of accessing an account previously created by the user by entering their credentials. As a verb phrase, always written as two words — "sign in". As a compound adjective modifying a noun, always hyphenated — "sign-in" — ex. "sign-in page", "sign-in flow", "sign-in screen."

**Use when:** Describing the action of accessing an existing user account — ex. "Sign in to My Truck", "Sign in to your account", "Sign in." Use on login surfaces, session start flows, and any surface where the user is entering credentials to access a product they have previously registered for. Distinct from Create account (first-time registration) and Authenticate (second-factor verification) — see Related terms.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Sign in | ✅ Use | Always two words — never "Signin" as a single word |
| Sign-in | ✅ Use | Compound adjective — always hyphenated when modifying a noun — ex. "Sign-in page", "Sign-in flow", "Sign-in screen" |
| Sign in to [product] | ✅ Use | Use when naming the product adds clarity or context — ex. "Sign in to My Truck", "Sign in to Volvo Connect" |
| Sign in page | ❌ Avoid | "Sign in page" without a hyphen is incorrect — when used as a modifier, always hyphenate: "Sign-in page" |
| Log in | ❌ Avoid | Not the established term in this product context — Sign in is always preferred |
| Login | ❌ Avoid | Single-word form — never use as a verb; acceptable only as a noun in technical documentation — ex. "login credentials" |
| Connect | ❌ Avoid | Reserved for granting a device, account, or item access to another app or system — not for accessing a user account — see Related terms |
| Access | ❌ Avoid | Implies entering a restricted area — too generic and does not convey the credential-based nature of signing in |
| Enter | ❌ Avoid | Too generic — does not convey the authentication purpose of accessing an account |
| Sign up | ❌ Avoid | For creating a new account — not accessing an existing one — see Sign up entry |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Connect | Granting a device, account, or item access to another app, system, or account — ex. "Connect to Wi-Fi", "Connect your account" | Connect establishes an access relationship between two systems; Sign in accesses a user's own account — never use as synonyms — see Connect entry |
| Authenticate | Requesting a second layer of security during or after sign-in — ex. "Authenticate with Face ID", "Authenticate to continue" | Authenticate is the additional verification step that may follow Sign in — not a synonym for it — see Authenticate entry |
| Create account | Initiating the process of creating a new account for first-time access — ex. "Create an account to get started" | Create account is for first-time registration; Sign in is for returning users accessing an existing account — never use as synonyms |
| Sign out | Ending the current session and returning the user to a signed-out state | Sign out is the canonical counterpart to Sign in — see Paired terms and Sign out entry |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Sign in / Sign out | Describing the action of accessing and ending a session in a user account | Always use Sign out as the counterpart — never "Log out", "Disconnect", or "Exit" when the action specifically ends a user account session — see Sign out entry |
| Sign in / Create account | Presenting the two primary entry points for new and returning users — ex. on a welcome or landing screen | Always present Sign in for returning users and Create account for new users — never mix Sign in / Register or Sign in / Sign up as the paired entry points unless the registration flow specifically uses those terms |

**In context:**

- ✅ "Sign in"
- ✅ "Sign in to My Truck"
- ✅ "Sign in to your account"
- ✅ "Sign in to continue"
- ❌ "Log in" — not the established term; use Sign in
- ❌ "Login" — single-word form is never a verb; use Sign in
- ❌ "Connect to your account" — Connect is for device or system access; use Sign in for user account access
- ❌ "Access your account" — too generic; use Sign in

**Notes:** Sign in and Log in describe the same action but Sign in is the established term for this product context and must be used consistently across all surfaces. Log in and Login are among the most common slip-ins from developer or technical writing conventions — both must be caught in content review before publication. The verb/adjective distinction is equally important: Sign in is always two unhyphenated words as a verb — ex. "Sign in to your account." Sign-in is always hyphenated as a compound adjective modifying a noun — ex. "Sign-in page", "Sign-in flow", "Sign-in screen." Never use "Sign in page" without the hyphen, and never use "Sign-in" as a standalone verb. When Sign in appears alongside Create account on the same surface, ensure the two are visually and spatially distinct so returning users reach Sign in without friction and new users find Create account without confusion.

---

### Sign out

**Definition:** The action of closing a user's current account session. As a verb phrase, always written as two words — "sign out". As a compound adjective modifying a noun, always hyphenated — "sign-out" — ex. "sign-out confirmation", "sign-out screen."

**Use when:** Describing the action of ending an active account session — ex. "Sign out of My Truck", "Sign out", "Sign out of all devices." Use on account menus, session management surfaces, and any surface where the user is explicitly ending their current session. Always use Sign out as the canonical counterpart to Sign in.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Sign out | ✅ Use | Verb phrase — always two unhyphenated words — ex. "Sign out of your account", "Sign out of all devices" |
| Sign-out | ✅ Use | Compound adjective — always hyphenated when modifying a noun — ex. "Sign-out confirmation", "Sign-out screen" |
| Sign out of [product] | ✅ Use | Use when naming the product adds clarity — ex. "Sign out of My Truck", "Sign out of Volvo Connect" |
| Sign out of all devices | ✅ Use | Use when the action ends all active sessions across all devices — ex. in account security settings |
| Sign out page / Sign out page | ❌ Avoid | "Sign out page" without a hyphen is incorrect — when used as a modifier, always hyphenate: "Sign-out page" |
| Log out | ❌ Avoid | Not the established term in this product context — Sign out is always preferred |
| Logout | ❌ Avoid | Single-word form — never use as a verb or adjective; not appropriate for any user-facing copy |
| Disconnect | ❌ Avoid | Reserved for interrupting a device or account's access to another app or system — not for ending a user session — see Disconnect entry |
| Exit | ❌ Avoid | Implies leaving an app, mode, or view — not closing an account session — see Exit entry |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Sign in | The user is accessing an existing account by entering their credentials | Sign in is the canonical counterpart to Sign out — see Paired terms and Sign in entry |
| Disconnect | Interrupting the access of a device, account, or item to another app or system while keeping it in the access list | Disconnect operates on system-level access relationships; Sign out closes a user's account session — never use as synonyms — see Disconnect entry |
| Exit | Leaving an app, mode, or view | Exit operates at the level of the product interface; Sign out operates at the level of the account session — never use as synonyms — see Exit entry |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Sign in / Sign out | Describing the action of accessing and closing a user account session | Always use Sign in as the counterpart — never "Log in / Sign out" or "Sign in / Log out" — the pair must be consistent across the same product — see Sign in entry |

**In context:**

- ✅ "Sign out"
- ✅ "Sign out of My Truck"
- ✅ "Sign out of all devices"
- ✅ "Sign-out confirmation" — adjective form modifying a noun
- ✅ "Sign-out screen" — adjective form modifying a noun
- ❌ "Log out" — not the established term; use Sign out
- ❌ "Logout" — single-word form is never appropriate in user-facing copy; use Sign out
- ❌ "Disconnect" — Disconnect is for system access; use Sign out to close a user account session
- ❌ "Sign out page" — missing hyphen; use Sign-out page when the term modifies a noun

**Notes:** Sign out and Log out describe the same action but Sign out is the established term for this product context and must be used consistently across all surfaces — including developer handoff, error messages, and navigation labels. The verb/adjective distinction mirrors the Sign in entry: Sign out is always two unhyphenated words as a verb — ex. "Sign out of your account." Sign-out is always hyphenated as a compound adjective modifying a noun — ex. "Sign-out screen", "Sign-out confirmation." Never use "Sign out screen" without the hyphen, and never use "Sign-out" as a standalone verb. The Sign in / Sign out pair must appear consistently — never mix Sign in with Log out or Log in with Sign out on the same product surface.

---

### Sign up

**Definition:** The action of initiating a simple, cost-free enrollment for a newsletter, event, or service trial. As a verb phrase, always written as two words — "sign up". As a compound adjective modifying a noun, always hyphenated — "sign-up" — ex. "sign-up form", "sign-up flow."

**Use when:** Describing the action of enrolling in something free and lightweight — ex. "Sign up to Daily Tracks", "Sign up for our newsletter", "Sign up for the webinar." Use when the enrollment requires minimal information, no payment, and no formal registration process. Distinct from Register (complex or sensitive information required), Subscribe (recurring payment), and Create account (product access) — see Related terms.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Sign up | ✅ Use | Verb phrase — always two unhyphenated words — ex. "Sign up for the newsletter", "Sign up today" |
| Sign-up | ✅ Use | Compound adjective — always hyphenated when modifying a noun — ex. "Sign-up form", "Sign-up flow", "Sign-up confirmation" |
| Sign up for [item] | ✅ Use | Use when naming the item being enrolled in adds clarity — ex. "Sign up for Daily Tracks", "Sign up for the webinar" |
| Sign up page / sign up form | ❌ Avoid | Missing hyphen — when used as a modifier, always hyphenate: "Sign-up page", "Sign-up form" |
| Register | ❌ Avoid | Reserved for formal enrollment flows requiring more or sensitive information — not for simple, cost-free subscriptions — see Related terms |
| Subscribe | ❌ Avoid | Reserved for enrolling in paid services with a recurring payment plan — not for free, lightweight enrollment — see Related terms |
| Join | ⚠️ Conditional | Acceptable in community or social contexts where the enrollment implies becoming part of a group or event — ex. "Join our community", "Join the webinar"; not a general synonym for Sign up in newsletter or event contexts |
| Enroll | ⚠️ Conditional | Acceptable in education or program-based contexts — ex. "Enroll in the course"; not a general synonym for Sign up |
| Sign in | ❌ Avoid | For accessing an existing account — not creating a new enrollment — see Sign in entry |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Register | The enrollment involves a formal, multi-step process requiring detailed or sensitive information — ex. "Register your company", "Register your vehicle" | Register is formal and information-heavy; Sign up is lightweight and cost-free — never use as synonyms — see Register entry |
| Subscribe | The enrollment involves a paid service or product with a recurring payment plan — ex. "Subscribe to Fleet Manager Pro" | Subscribe implies financial commitment; Sign up implies free enrollment — never use as synonyms — see Subscribe entry |
| Create account | The enrollment provides registration-based access to an app, product, or service — free or paid — ex. "Create an account to get started" | Create account is for gaining product access; Sign up is for lightweight non-access enrollments — use Create account when the outcome is a login credential, Sign up when the outcome is a subscription to communications or events |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Sign up / Sign in | Presenting the two entry points for new and returning users — ex. on a newsletter landing page or event registration surface | Use Sign in as the counterpart for users who have already enrolled — never "Log in" as the counterpart to Sign up on the same surface |
| Sign up / Unsubscribe | Presenting the enrollment and opt-out options — ex. at the bottom of a newsletter or event communication | Use Unsubscribe as the opt-out counterpart — never "Sign out", "Cancel", or "Remove" when the action specifically ends a free subscription |

**In context:**

- ✅ "Sign up to Daily Tracks"
- ✅ "Sign up for our newsletter"
- ✅ "Sign up for the webinar"
- ✅ "Sign-up form" — adjective form modifying a noun
- ✅ "Sign-up confirmation" — adjective form modifying a noun
- ❌ "Register for our newsletter" — Register implies a complex formal process; use Sign up for free, lightweight enrollment
- ❌ "Subscribe to our newsletter" — Subscribe implies a recurring payment; use Sign up for free enrollment
- ❌ "Sign up form" — missing hyphen; use Sign-up form when the term modifies a noun
- ❌ "Join our newsletter" — Join implies community membership; use Sign up for newsletter enrollment

**Notes:** Sign up, Register, Subscribe, and Create account describe four distinct enrollment patterns that are frequently misused interchangeably. Sign up is the lightest — free, simple, and requiring minimal information. Create account adds a credential layer — the user gains product access. Register is the most formal — detailed or sensitive information is required. Subscribe introduces a financial commitment. The verb/adjective distinction follows the same rule as Sign in and Sign out: Sign up is always two unhyphenated words as a verb; Sign-up is always hyphenated as a compound adjective modifying a noun. Never use "Sign up form" or "Sign up page" without the hyphen.

---

### Start

**Definition:** The action of initiating a user flow, process, or feature.

**Use when:** Describing the action of beginning a specific, named process, flow, or feature — ex. "Start engine", "Start ID verification", "Start navigation." Use when the action directly initiates something concrete and named, and the user is the initiator. Distinct from Get started, which introduces a broader flow or onboarding experience, and from Open, which accesses a viewable item — see Related terms.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Start | ✅ Use | — |
| Start [object] | ✅ Use | Always pair with the process, flow, or feature being initiated — ex. "Start engine", "Start ID verification", "Start navigation" |
| Begin | ❌ Avoid | More formal and less direct than Start — not appropriate for action labels in product copy |
| Initiate | ❌ Avoid | Technical and impersonal — not appropriate for user-facing action labels |
| Go | ❌ Avoid | Vague and directionless — does not convey initiating a specific named process or feature |
| Launch | ❌ Avoid | Implies initiating a complex system or application — too heavy for standard process or feature initiation |
| Activate | ⚠️ Conditional | Acceptable when switching a feature or system on from an inactive default state — ex. "Activate autopilot"; not a general synonym for Start when a process or flow is being initiated |
| Run | ❌ Avoid | Technical term associated with executing code or scripts — not appropriate for user-facing copy |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Get started | Initiating a broader flow or onboarding experience, or providing access to a specific free item — ex. "Get started with Driver Guide", "Get started" | Get started is inviting and introductory; Start is direct and specific — use Get started when beginning a broader experience, Start when initiating a named process or feature — see Get started entry |
| Open | Accessing and displaying an app, file, or interactive item — ex. "Open file", "Open chat" | Open accesses a viewable or interactive item; Start initiates a process or flow — use Open when the user will see or interact with a specific item, Start when a sequence of actions begins — see Open entry |
| Continue | Advancing to the next step in a flow where the user has already engaged with the current step | Continue is for flows already in progress; Start is for flows not yet begun — never use as synonyms — see Continue entry |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Start / Stop | Describing the action of initiating and halting a process, feature, or engine state — ex. "Start engine / Stop engine", "Start navigation / Stop navigation" | Always use Stop as the counterpart — never "End", "Cancel", or "Finish" when the reverse action specifically halts an active process |
| Start / Pause | Describing the action of initiating and temporarily suspending a process — ex. in a recording, a timer, or a data sync | Use Pause as the counterpart when the process can be resumed — never "Stop" when the intent is a temporary suspension rather than a full halt |

**In context:**

- ✅ "Start engine"
- ✅ "Start ID verification"
- ✅ "Start navigation"
- ✅ "Start free trial"
- ❌ "Begin engine" — formal and unnatural; use Start
- ❌ "Initiate ID verification" — technical and impersonal; use Start ID verification
- ❌ "Go" — vague; use Start or Get started depending on context
- ❌ "Launch navigation" — Launch implies a complex system initiation; use Start navigation
- ❌ "Open ID verification" — Open accesses a viewable item; use Start for initiating a process

**Notes:** Start and Get started occupy adjacent but distinct positions. Start is direct and specific — it initiates a named process or feature immediately. Get started is introductory and broader — it begins an experience or onboarding flow. The practical test: if the action names a specific process the system will execute — ex. "Start engine", "Start navigation" — use Start. If the action introduces a broader journey without a specific named process — ex. "Get started with Driver Guide" — use Get started. Start / Stop is the canonical pair for processes that can be actively halted; Start / Pause is the canonical pair for processes that can be temporarily suspended and resumed.

---

### Submit

**Definition:** The action of sending completed information, files, forms, or messages to a system or recipient for processing, review, or action.

**Use when:** Describing the action of deliberately sending completed content to a system or recipient — ex. "Submit ticket", "Submit form", "Submit application." Use when the data is being sent out for an external action, approval, or processing step — not merely saved within the product for future access. Distinct from Save, which records data within the product, and from Share, which grants access to unrestricted content — see Related terms.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Submit | ✅ Use | — |
| Submit [object] | ✅ Use | Always pair with the item being submitted for clarity — ex. "Submit ticket", "Submit form", "Submit application" |
| Save | ❌ Avoid | Records data within the product for future access — not for sending data to an external system or recipient — see Related terms |
| Share | ❌ Avoid | Grants access to unrestricted content — not for sending completed data for processing or review — see Related terms |
| Register | ❌ Avoid | Describes a formal enrollment process — not the act of sending completed data for processing — see Register entry |
| Send | ⚠️ Conditional | Acceptable when the submission mechanism is specifically a direct message or email — ex. "Send message", "Send request"; not a general synonym for Submit on forms or application flows |
| Upload | ⚠️ Conditional | Acceptable when the submission specifically involves transferring a file to a system — ex. "Upload document"; not a general synonym for Submit when the content includes form fields or structured data |
| Confirm | ⚠️ Conditional | Acceptable when the submission requires explicit user confirmation before processing — ex. "Confirm and submit"; not a standalone synonym for Submit |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Save | The user is recording their latest changes or input within the product for future access — not sending data for external processing | Save preserves within the product; Submit sends to an external system or recipient — the two may appear in sequence but are never synonymous — see Save entry |
| Share | The user is granting access to unrestricted content or resources — ex. an article, a link, or a location | Share is for access grants; Submit is for sending completed data for processing — never use as synonyms — see Share entry |
| Send | The user is delivering a message or file directly to a specific recipient — ex. a direct message or email | Send is for direct delivery to a recipient; Submit is for sending to a system for processing or review — use Send when the communication channel is direct, Submit when data enters a processing pipeline |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Submit / Cancel | Presenting the option to send completed data or abandon the submission — ex. on a form or application | Always use Cancel as the counterpart — never "Go back", "Clear", or "Reset" when the alternative to submitting is abandoning the form entirely — see Cancel entry |
| Submit / Save | Presenting the option to send data for processing or preserve a draft for later — ex. on a form that supports drafts | Use Save as the draft-preservation counterpart when the form can be partially completed and returned to — Submit finalizes and sends, Save preserves in progress |

**In context:**

- ✅ "Submit ticket"
- ✅ "Submit form"
- ✅ "Submit application"
- ✅ "Submit your feedback"
- ❌ "Save ticket" — Save records within the product; use Submit when the ticket is being sent for processing
- ❌ "Share form" — Share grants access to content; use Submit when form data is being sent for action
- ❌ "Register form" — Register describes a formal enrollment; use Submit for sending completed form data
- ❌ "Send application" — Send implies direct delivery to a recipient; use Submit when the application enters a processing system

**Notes:** Submit, Save, and Send describe three different destinations for user-provided data. Submit sends data to a system or recipient for processing, review, or action — the user's involvement ends at submission. Save preserves data within the product — the user can return and continue. Send delivers data directly to a named recipient — the communication is personal and direct. On surfaces where both Save and Submit are available — ex. a form that supports drafts — always ensure both labels are visible and the distinction between them is clear: Save keeps the user's progress; Submit finalizes it.

---

### Subscribe

**Definition:** The action of enrolling in a paid service or product with a recurring payment plan.

**Use when:** Describing the action of enrolling in a paid service or product that involves recurring billing — ex. "Subscribe to Autona", "Subscribe to the Pro plan", "Subscribe now." Use on pricing pages, plan selection surfaces, and any surface where the user is committing to a recurring payment. Distinct from Sign up (free, lightweight enrollment) and Register (formal enrollment requiring detailed information) — see Related terms.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Subscribe | ✅ Use | — |
| Subscribe to [product] | ✅ Use | Use when naming the product or plan adds clarity — ex. "Subscribe to Autona", "Subscribe to Pro plan" |
| Sign up | ❌ Avoid | Reserved for free, lightweight enrollments — not for paid recurring services — see Related terms |
| Register | ❌ Avoid | Reserved for formal enrollment requiring detailed or sensitive information — not for paid subscription enrollment — see Related terms |
| Enroll | ⚠️ Conditional | Acceptable in education or program-based contexts — ex. "Enroll in the fleet training program"; not a general synonym for Subscribe in paid recurring service contexts |
| Join | ⚠️ Conditional | Acceptable in community or membership contexts where subscription implies belonging — ex. "Join Pro"; not a general synonym for Subscribe on standard pricing surfaces |
| Buy | ⚠️ Conditional | Acceptable when emphasizing a one-time payment aspect of a subscription — ex. "Buy now" on an annual plan; use Subscribe when the recurring nature of the payment is the primary signal — see Buy entry |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Sign up | The enrollment is free and lightweight — ex. a newsletter, event, or service trial requiring minimal information | Sign up implies no financial commitment; Subscribe implies a recurring payment — never use as synonyms — see Sign up entry |
| Register | The enrollment involves a formal, multi-step process requiring detailed or sensitive information — ex. registering a company or vehicle | Register is formal and information-heavy; Subscribe is for recurring paid access — never use as synonyms — see Register entry |
| Upgrade | The user is moving from a lower plan tier to a higher one — typically with a higher recurring cost | Upgrade is a tier change within an existing subscription; Subscribe is the initial enrollment — use Upgrade when the user already has a subscription, Subscribe for first-time enrollment — see Upgrade entry |
| Downgrade | The user is moving from a higher plan tier to a lower one | Downgrade is a tier reduction within an existing subscription — use Subscribe only for initial enrollment — see Downgrade entry |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Subscribe / Unsubscribe | Describing the action of enrolling in and opting out of a recurring paid service | Use Unsubscribe as the counterpart when the user is ending a recurring paid subscription — never "Sign out", "Remove", or "Deactivate" when the action specifically ends a recurring billing relationship |
| Subscribe / Cancel | Presenting the option to enroll or abandon the subscription flow — ex. on a pricing page confirmation step | Use Cancel as the exit counterpart when the alternative to subscribing is abandoning the enrollment flow entirely — see Cancel entry |

**In context:**

- ✅ "Subscribe to Autona"
- ✅ "Subscribe to the Pro plan"
- ✅ "Subscribe now"
- ✅ "Unsubscribe" — ending a recurring paid subscription
- ❌ "Sign up to Autona" — Sign up implies a free enrollment; use Subscribe for paid recurring services
- ❌ "Register for Autona" — Register implies a formal process requiring detailed information; use Subscribe for paid recurring enrollment
- ❌ "Join Autona" — on a standard pricing surface; Join implies community membership — use Subscribe

**Notes:** Subscribe, Sign up, Register, and Create account describe four distinct enrollment patterns distinguished primarily by cost and complexity. Subscribe is the only enrollment term that explicitly signals a recurring financial commitment — using it correctly sets accurate user expectations before a payment is processed. Unsubscribe and Cancel are both valid counterparts but in different contexts: Unsubscribe ends the recurring billing relationship from within an active subscription; Cancel abandons the subscription flow before it is completed. Never use them interchangeably on the same surface.

---

### Subscription

**Definition:** A user's continuous access to an app, product, or service that is conditioned by a recurring payment.

**Use when:** Referring to the ongoing access arrangement between a user and a paid product or service — ex. "Manage your subscription", "Subscription plan", "Subscription renewal." Use in account settings, billing surfaces, pricing pages, and any surface where the user's access is tied to a recurring payment. Distinct from a one-time purchase, a free trial, or a plan tier — see Related terms.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Subscription | ✅ Use | Lowercase in body copy — ex. "Manage your subscription"; capitalize as a section label — ex. "Subscription settings" |
| Subscription [qualifier] | ✅ Use | Use when specifying the subscription type or state adds clarity — ex. "Subscription plan", "Subscription renewal", "Active subscription" |
| Pause subscription✅ UseUse when the user is temporarily suspending their subscription without cancelling it — ex. "Pause subscription", "Your subscription is paused" |
| Change subscription✅ UseUse when the user is modifying their subscription without specifying direction — ex. "Change subscription", "Change your subscription plan"; use Upgrade or Downgrade when the direction is known and relevant to communicate — see Upgrade and Downgrade entries |
| Subscription on hold✅ UseUse as a status label when the subscription is neither active nor cancelled — ex. due to a payment failure or a user-initiated pause — ex. "Subscription on hold", "Your subscription is on hold" |
| Plan | ⚠️ Conditional | Acceptable when referring specifically to the tier or configuration of a subscription — ex. "Pro plan", "Change your plan"; not a general synonym for Subscription when the recurring payment is the primary subject |
| Membership | ⚠️ Conditional | Acceptable in community or access-based contexts where the subscription confers belonging — ex. "Fleet membership"; not a general synonym for Subscription on standard billing surfaces |
| License | ⚠️ Conditional | Acceptable in enterprise or software contexts where access is granted per seat or per device — ex. "User license"; not a synonym for Subscription when recurring billing is the primary subject |
| Service | ❌ Avoid | Too broad — refers to the product offering, not the user's recurring access arrangement |
| Package | ❌ Avoid | Implies a bundled offering — does not convey the recurring payment nature of a subscription |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Subscribe | Referring to the action of enrolling in a subscription — ex. "Subscribe to Autona" | Subscribe is the action; Subscription is the resulting state — see Subscribe entry |
| Plan | Referring to the specific tier, configuration, or feature set within a subscription — ex. "Pro plan", "Standard plan" | Plan describes what is included; Subscription describes the access arrangement and its billing model — both may appear on the same surface without overlapping |
| Upgrade / Downgrade | Referring to the action of moving to a higher or lower subscription tier | Upgrade and Downgrade operate on an existing Subscription — see Upgrade and Downgrade entries |
| Free trial | Referring to a time-limited period of free access before a subscription begins | Free trial precedes a Subscription — use Free trial when no payment has been committed, Subscription when recurring billing is active or imminent |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Subscription / Plan | Referring to the access arrangement and the specific tier together — ex. "Your subscription plan", "Manage your subscription plan" | Use Subscription for the access arrangement, Plan for the tier — both may appear as a compound: "Subscription plan" |
| Subscription / Renewal | Referring to the ongoing access arrangement and the point at which it is extended — ex. "Subscription renewal", "Your subscription renews on [date]" | Renewal is the billing event within the subscription lifecycle — always pair with Subscription when the renewal date or process is the subject |
| Pause subscription / Resume subscriptionDescribing the action of temporarily suspending and reactivating a subscription — ex. in account settings or billing management | Always use Resume subscription as the counterpart to Pause subscription — never "Restart subscription", "Reactivate", or "Unpause" |
| Active subscription / On-hold subscription / Canceled subscription | Presenting the three primary subscription states — ex. in account settings or billing history | Active subscription is the in-force state; On-hold subscription is the suspended or payment-failed state; Canceled subscription is the terminated state — always qualify with the state when presenting subscription status |

**In context:**

- ✅ "Manage your subscription"
- ✅ "Subscription plan"
- ✅ "Subscription renewal"
- ✅ "Active subscription"
- ✅ "Subscription on hold" — neither active nor canceled
- ✅ "Resume subscription"
- ✅ "Change subscription"
- ✅ "Your subscription renews on 1 March."
- ❌ "Manage your service" — Service refers to the product offering, not the recurring access arrangement; use Subscription
- ❌ "Manage your package" — Package implies a bundle; use Subscription for recurring access
- ❌ "Manage your membership" — on a standard billing surface without community or belonging connotations; use Subscription

**Notes:** Subscription describes the access arrangement — the fact that access is continuous and conditioned on recurring payment. Plan describes what that access includes — the tier, the features, the pricing. Both concepts are often relevant on the same surface and can appear together as a compound — "Subscription plan" — without confusion, as long as each term is used consistently in its own context. Free trial is the pre-subscription state; Subscription begins when recurring billing is active. When communicating subscription status to users, always specify the state — "Active subscription" or "Cancelled subscription" — rather than using Subscription alone, which gives no information about whether access is currently in force.

---

### Support

**Definition:** The team or service that provides direct assistance to users — ex. through chat, email, phone, or ticket-based help.

**Use when:** Referring to the team or service that provides direct assistance — ex. "Contact Support", "Get support", "Chat with Support." Use in error messages, help surfaces, escalation flows, and any surface where the user is being directed to human or assisted help. Distinct from Help Center, which is the self-serve content destination — see Related terms.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Support | ✅ Use | Capitalize as a proper label when referring to the team or service — ex. "Contact Support", "Support team", "Our Support team is available 24/7" |
| Contact Support | ✅ Use | Standard CTA for directing the user to the support team — ex. in error messages, empty states, and escalation flows |
| Get support | ✅ Use | Acceptable alternative when the emphasis is on obtaining assistance rather than initiating contact — ex. "Get support for your fleet" |
| Help | ❌ Avoid | Refers to self-serve content or guidance — not the team or service providing direct assistance; reserve Help for navigation labels pointing to the Help Center — see Related terms |
| Customer service | ⚠️ Conditional | Acceptable in consumer-facing contexts where the term is more familiar than Support — ex. in B2C product copy; not the standard term for Volvo Group product surfaces |
| Customer care | ⚠️ Conditional | Acceptable in emotionally sensitive or high-touch service contexts — ex. after a product incident; not a general synonym for Support in standard product copy |
| Helpdesk | ❌ Avoid | Technical and dated — not appropriate for user-facing copy |
| Technical support | ⚠️ Conditional | Acceptable when the support is specifically for technical issues — ex. "Contact Technical Support" in a developer or enterprise context; not for general user-facing support CTAs |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Help Center | Referring to the page or section containing self-serve support content — ex. articles, guides, FAQs | Help Center is the self-serve destination; Support is the assisted channel — the two coexist and serve different user intents — see Help Center entry |
| Contact | Referring to the generic action of reaching out to a person, team, or company through an unspecified channel | Contact is the verb; Support is the recipient — "Contact Support" combines both — see Contact entry |
| Chat | Referring specifically to a real-time messaging channel through which support is provided — ex. "Chat with Support" | Chat names the channel; Support names the recipient — use together when the channel is specifically live chat — see Contact entry |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Help Center / Support | Presenting both the self-serve content destination and the human assistance channel on the same surface — ex. in an error message or onboarding flow | Always lead with Help Center — direct users to self-serve first before escalating to Support; never use the two labels interchangeably — see Help Center entry |
| Contact Support / Search the Help Center | Presenting the two primary resolution paths when a user encounters an issue | Search the Help Center for self-serve resolution; Contact Support for direct assistance — always offer both when neither can be ruled out |
| Support / [Channel] | Referring to the support team alongside the specific communication channel — ex. "Chat with Support", "Email Support", "Call Support" | Always name the channel when it is known — generic "Contact Support" is the fallback for multi-channel or unspecified channel surfaces — see Contact entry |

**In context:**

- ✅ "Contact Support"
- ✅ "Get support"
- ✅ "Chat with Support"
- ✅ "Email Support"
- ✅ "Our Support team is available 24/7."
- ❌ "Contact Help" — Help refers to self-serve content; use Contact Support for direct assistance
- ❌ "Get help" — when the user is being directed to a human team; use Get support or Contact Support
- ❌ "Contact Helpdesk" — dated and technical; use Contact Support
- ❌ "Help" — as a label pointing to the support team rather than the Help Center; use Support

**Notes:** Support and Help Center are the two primary assistance surfaces in this glossary and must always be treated as distinct. Support connects the user to a person or team. Help Center connects the user to content. On surfaces where both are available — ex. an error message with a "Search the Help Center" link and a "Contact Support" CTA — always present Help Center first. This reduces support volume by encouraging self-serve resolution while ensuring the human fallback is always visible and accessible. Never use Help as a label for the support team — Help is reserved for the content destination (Help Center) or as a space-constrained navigation label pointing to it.

---

### Status

**Definition:** The functional state of an item based on specific criteria — such as its availability, performance level, readiness, or ownership.

**Use when:** Referring to the current functional state of an item — ex. "Vehicle status", "Order status", "Connection status." Use as a section label, field label, or inline descriptor on dashboards, fleet management surfaces, order tracking, and any surface where the current state of an item is being communicated to the user. Status is always system-reported — it describes what is currently true about an item, not what the user is doing to it.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Status | ✅ Use | Lowercase in body copy — ex. "Check the vehicle status"; capitalize as a column or field label — ex. "Status" |
| [Item] status | ✅ Use | Use when specifying the item whose state is being described adds clarity — ex. "Vehicle status", "Order status", "Connection status" |
| [Status label] | ✅ Use | Use the most specific status label available for the item type — ex. "Active", "Inactive", "On hold", "Available", "In progress" — always prefer a specific state label over "Status" alone in a status indicator |
| State | ⚠️ Conditional | Acceptable in technical or developer-facing documentation — ex. "Connection state", "System state"; not appropriate as a general synonym for Status in standard user-facing copy |
| Condition | ⚠️ Conditional | Acceptable when describing the physical or operational condition of a vehicle or machine — ex. "Vehicle condition"; not a general synonym for Status across all item types |
| Situation | ❌ Avoid | Informal and imprecise — does not convey the system-reported, criteria-based nature of a functional state |
| Health | ⚠️ Conditional | Acceptable in system monitoring or infrastructure contexts — ex. "System health", "Connection health"; not appropriate for standard item status labels in fleet or order management |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Active / Inactive | Referring specifically to the operational state of an item — whether it is currently running or not | Active and Inactive are specific status values — they are states within the Status vocabulary, not synonyms for Status itself — see Active and Inactive entries |
| Available | Referring specifically to whether an item or user can currently be accessed or used | Available is a specific status value for access and presence — see Available entry |
| Alert | Referring to a notification triggered by a status change that requires the user's attention | An Alert communicates a status event; Status describes the state itself — see Alert entry |
| Error | Referring to a system message that communicates an active issue affecting the user's experience | Error is a specific status value in the system message hierarchy — see Error entry |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Status / [Status label] | Displaying the status field label alongside the current state value — ex. "Status: Active", "Status: On hold" | Always display a specific state label alongside the Status field label — never display "Status: Status" or leave the value blank |
| Status / Filter | Presenting the status field alongside the option to filter a list by status value — ex. "Filter by status" | Filter by status is a standard list management pattern — always use Filter, never "Sort by status" when the intent is to narrow by state — see Filter entry |
| [Item] status / [Item] details | Presenting a summary state indicator alongside the full detail view of an item — ex. "Vehicle status" in a fleet list alongside "Vehicle details" for the full record | Status is the at-a-glance summary; Details is the full record — both may appear on the same surface for the same item |

**In context:**

- ✅ "Vehicle status"
- ✅ "Order status"
- ✅ "Connection status"
- ✅ "Status: Active"
- ✅ "Status: On hold"
- ✅ "Filter by status"
- ✅ "Check the vehicle status before departure."
- ❌ "Vehicle situation" — informal and imprecise; use Vehicle status
- ❌ "Vehicle state" — State is for technical or developer contexts; use Status for user-facing copy
- ❌ "Status: Status" — never display the label and value as the same word; always use a specific state label as the value

**Notes:** Status describes what is currently true about an item — it is always system-reported and based on defined criteria. The specific state labels (Active, Inactive, Available, On hold, In progress, etc.) are the values within the Status vocabulary. On list and dashboard surfaces, always display a specific state label rather than "Status" alone as a value — "Status: Active" is informative, "Status" alone is not. When multiple status types are relevant for the same item — ex. a vehicle with both an operational status and a connectivity status — always qualify each with its type: "Vehicle status: Active", "Connection status: Secure", rather than collapsing them into a single unqualified Status field.

---

### System

**Definition:** The sum of features, processes, data, and infrastructure that form a complete or partial product or service — ex. a security system, a braking system, or a fleet management system.

**Use when:** Referring to an interconnected set of components, features, or processes that function together as a whole — ex. "Security system", "Braking system", "Fleet management system." Use in product descriptions, technical documentation, onboarding, and any surface where a collection of integrated components is being described or referenced as a single functional unit.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| System | ✅ Use | Lowercase in body copy — ex. "The braking system is active"; capitalize only when forming a proper product name — ex. "Volvo Safety System" |
| [Qualifier] system | ✅ Use | Use when specifying the system type adds clarity — ex. "Security system", "Braking system", "Onboard system", "Fleet management system" |
| Platform | ⚠️ Conditional | Acceptable when referring to the broader technical environment on which a system runs — ex. "Fleet management platform"; implies a more open, extensible architecture than System; not a general synonym |
| Solution | ⚠️ Conditional | Acceptable in sales, marketing, or enterprise-facing copy where the emphasis is on outcomes rather than components — ex. "Transport solution"; not appropriate for technical or functional descriptions of a system |
| Tool | ❌ Avoid | Implies a single-purpose utility — does not convey the interconnected, multi-component nature of a system |
| Software | ⚠️ Conditional | Acceptable when specifically referring to the software layer of a system — ex. "Fleet management software"; not a general synonym for System when hardware, data, or infrastructure are also involved |
| Infrastructure | ❌ Avoid | Refers specifically to the underlying hardware and network components — not the complete system including features and processes |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Onboard | Referring specifically to the physical and digital systems present within a vehicle or machine | Onboard is a scoped application of System within the vehicle or machine context — see Onboard entry |
| Dashboard | Referring to the display and control interface within a system — not the system itself | Dashboard is one component of a larger system — see Dashboard entry |
| Control panel | Referring to the settings surface where a system's configuration can be managed | Control panel is one surface within a system — not a synonym for the system itself — see Control panel entry |
| Feature | Referring to a specific, individual capability within a system | A Feature is one component of a System — use Feature when referring to a single capability, System when referring to the integrated whole |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| System / Settings | Referring to the configuration options for a system — ex. "System settings" | Always use Settings as the compound counterpart — never "System preferences" or "System options" as the label |
| System / Status | Referring to the current operational state of a system — ex. "System status", "Check system status" | Always use Status as the compound counterpart when reporting the operational state of a system — see Status entry |
| System / Update | Referring to the action of bringing a system to a more current version — ex. "System update", "Update your system" | System update is the standard compound for version or patch updates — never "System upgrade" for routine updates; reserve Upgrade for plan or tier changes — see Upgrade entry |

**In context:**

- ✅ "Security system"
- ✅ "Braking system"
- ✅ "Fleet management system"
- ✅ "System settings"
- ✅ "System status"
- ✅ "System update"
- ✅ "The onboard system detected an issue."
- ❌ "Security tool" — Tool implies a single-purpose utility; use System for an interconnected set of components
- ❌ "Security infrastructure" — Infrastructure refers to the underlying hardware layer only; use System for the complete functional unit
- ❌ "System upgrade" — when referring to a routine version or patch update; use System update — reserve Upgrade for plan or tier changes

**Notes:** System is intentionally broad — it covers any integrated set of features, processes, data, and infrastructure that functions together as a unit, whether partial or complete. The qualifier matters: "Braking system" scopes the term precisely, while "System" alone is only appropriate as a field label or when the system being referenced is unambiguous from context. On surfaces where System update and Upgrade coexist — ex. a settings page with a software update notification and a plan upgrade CTA — the two terms must be kept distinct: System update is for software versioning, Upgrade is for plan or tier changes.

---

### Terms of service

**Definition:** The sum of legal and commercial policies that govern a user's access to and use of an app, product, or service.

**Use when:** Referring to the legal agreement that defines the rules, rights, and obligations that apply when a user accesses a product — ex. "Terms of service", "Accept the terms of service", "Read our terms of service." Use in consent flows, sign-up surfaces, legal footers, and any surface where the governing conditions of product use are presented or referenced. Always use the full compound — never abbreviate to "terms" alone in user-facing copy.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Terms of service | ✅ Use | Always use the full compound — ex. "Accept the terms of service", "Read our terms of service"; capitalize only in formal document titles — ex. "Terms of Service" |
| Terms and conditions | ⚠️ Conditional | Acceptable when the product's legal documentation uses this label as the official title — not a general synonym for Terms of service in standard product copy |
| User agreement | ⚠️ Conditional | Acceptable in enterprise or B2B contexts where the agreement is specifically between the product and an organizational user — not a general synonym for Terms of service in consumer-facing copy |
| Terms | ❌ Avoid | Abbreviation — too informal and ambiguous in user-facing copy; always use the full compound |
| T&Cs | ❌ Avoid | Informal shorthand — not appropriate for user-facing product copy |
| Legal | ❌ Avoid | Refers to the broader legal domain — not the specific governing agreement for product use |
| Policy | ❌ Avoid | Refers to a single governing rule — ex. Privacy policy; not a synonym for the full terms of service governing product use |
| EULA | ❌ Avoid | End User License Agreement — technical and formal; not appropriate for standard user-facing copy unless the product specifically uses a software license model |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Privacy notice | Referring specifically to the legal statement describing how personal data is handled and processed | Privacy notice covers data handling; Terms of service covers product use — the two are distinct legal documents that frequently appear together — see Privacy entry |
| Accept | Referring to the action of giving mandatory consent to the terms of service before accessing the product | Accept is the correct action verb for terms of service consent — never "Agree", "Confirm", or "OK" when the terms are a mandatory gating condition — see Accept entry |
| Consent | Referring to the broader process of the user agreeing to data or usage policies | Consent is the mechanism; Terms of service is one document the user consents to — the two frequently appear together in consent flows but are not synonymous |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Terms of service / Privacy notice | Presenting the two primary legal documents users must acknowledge — ex. "By continuing, you agree to our Terms of service and Privacy notice" | Always present both documents when both apply — Terms of service covers product use; Privacy notice covers data handling — never combine into a single document label — see Privacy entry |
| Accept / Terms of service | Presenting the consent action alongside the governing document — ex. "Accept the terms of service to continue" | Always use Accept as the action verb — never "Agree to" or "Confirm" the terms of service — see Accept entry |

**In context:**

- ✅ "Terms of service"
- ✅ "Accept the terms of service"
- ✅ "Read our terms of service"
- ✅ "By continuing, you agree to our terms of service and privacy notice."
- ✅ "Terms of Service" — formal document title only
- ❌ "Terms" — too informal and ambiguous; use Terms of service in full
- ❌ "T&Cs" — informal shorthand; use Terms of service
- ❌ "Accept our legal" — Legal is too broad; use Terms of service
- ❌ "Accept our policy" — Policy refers to a single rule; use Terms of service for the governing agreement
- ❌ "Accept the EULA" — technical and formal; use Terms of service for standard user-facing copy

**Notes:** Terms of service and Privacy notice are the two primary legal documents in the product vocabulary and must always be treated as distinct. Terms of service governs how the product may be used. Privacy notice governs how personal data is handled. Both are mandatory consent documents and must both appear when both apply — never merge them into a single label or refer to them collectively as "policies" or "legal". The action verb for both is Accept — never Agree, Confirm, or OK — and the two documents must always appear in the same consent statement when both are required.

---

### Theme

**Definition:** The visual style applied to an app or product — typically derived from or aligned with a brand's identity — including colors, typography, and overall aesthetic treatment.

**Use when:** Referring to a visual style configuration applied across the entire product or a significant portion of it — ex. "Apply a theme", "Custom theme", "Default theme." Use in settings, design documentation, and any surface where the user can select or configure the visual appearance of the product. Distinct from Mode, which describes an operational or display state that changes how a device behaves — see Related terms.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Theme | ✅ Use | Capitalize as a settings label or section title — ex. "Theme settings"; lowercase in body copy — ex. "Apply a custom theme" |
| [Qualifier] theme | ✅ Use | Use when specifying the theme type adds clarity — ex. "Custom theme", "Default theme", "Brand theme", "Dark theme" |
| Mode | ❌ Avoid | Describes an operational or display state — ex. Dark mode, Driving mode — not a visual style configuration — see Related terms |
| Skin | ❌ Avoid | Informal and dated — not appropriate for standard user-facing product copy |
| Style | ⚠️ Conditional | Acceptable in design system or developer-facing documentation where Style refers to a specific visual property — ex. "Typography style"; not a general synonym for Theme in user-facing settings copy |
| Look | ❌ Avoid | Informal and imprecise — does not convey the structured, brand-aligned nature of a theme |
| Layout | ❌ Avoid | Refers to the arrangement of UI elements — not the visual style applied to them |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Mode | Referring to a distinct style of operating a device or displaying information — ex. "Dark mode", "Driving mode", "Full-screen mode" | Mode is behavioral and contextual — it changes how a device operates or content is displayed; Theme is visual and brand-aligned — it changes how the product looks; a product can have both without the two overlapping — see Mode entry |
| Settings | Referring to the section where themes can be selected or configured | Settings is where the user manages themes; Theme is the configuration being managed — never use as synonyms |
| Brand | Referring to the identity system from which a theme is derived — ex. a product theme based on Volvo brand guidelines | Brand is the source; Theme is the expression of that brand in the product interface |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Theme / Settings | Referring to the configuration section where the user selects or customizes a theme — ex. "Theme settings" | Always use Settings as the compound counterpart — never "Theme preferences" or "Theme options" as the section label |
| Default theme / Custom theme | Presenting the out-of-the-box visual style alongside the option to configure a personalized one | Default theme is the product's standard visual style; Custom theme is a user-configured alternative — always distinguish the two when both are available on the same surface |
| Theme / Mode | Referring to the visual style configuration alongside the operational display state — ex. in a display or appearance settings section | Theme and Mode are complementary, not interchangeable — a user can apply a Volvo theme and switch to Driving mode simultaneously without either affecting the other |

**In context:**

- ✅ "Apply a theme"
- ✅ "Custom theme"
- ✅ "Default theme"
- ✅ "Theme settings"
- ✅ "Brand theme"
- ❌ "Apply a mode" — when referring to the product's visual style; use Theme — Mode is for operational or display states
- ❌ "Apply a skin" — informal and dated; use Theme
- ❌ "Change the look" — informal and imprecise; use Change the theme or Apply a theme
- ❌ "Dark mode" — when referring to a visual style configuration tied to brand identity; use Dark theme — use Dark mode only when it describes a device or display operating state

**Notes:** Theme and Mode are the most commonly confused terms in the visual appearance vocabulary. Theme is static and brand-aligned — it defines the product's visual identity and is typically consistent across sessions. Mode is contextual and behavioral — it changes in response to the user's environment or preferences and can shift during a session. The clearest distinction: a Dark theme is a visual design choice applied to the whole product; Dark mode is a display state the device or operating system applies, often in response to ambient light or user preference. Both may coexist — a product can have a Volvo theme as its default visual style while also supporting a Driving mode that adjusts content layout. Always use Theme for visual identity, Mode for operational states.

---

### Tutorial

**Definition:** Educational content that gives the user an in-depth understanding of a product, service, or feature — primarily delivered in video format.

**Use when:** Referring to in-depth educational content designed to build a user's understanding of a product, service, or feature — ex. "Watch the tutorial", "Tutorial library", "Getting started tutorial." Use in help surfaces, onboarding flows, and any surface where comprehensive, step-by-step educational content is being presented. Distinct from a Walkthrough, which provides a shorter overview rather than in-depth instruction — see Related terms.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Tutorial | ✅ Use | Lowercase in body copy — ex. "Watch the tutorial"; capitalize as a section label — ex. "Tutorial library" |
| [Qualifier] tutorial | ✅ Use | Use when specifying the tutorial subject adds clarity — ex. "Getting started tutorial", "Fleet management tutorial", "Feature tutorial" |
| Video tutorial | ✅ Use | Use when specifying the video format adds clarity or sets user expectations — ex. "Watch the video tutorial"; not required when video is already established as the default format on the surface |
| Guide | ⚠️ Conditional | Acceptable when the educational content is text-based and step-by-step rather than video-based — ex. "Setup guide", "User guide"; not a general synonym for Tutorial when the format is specifically video |
| How-to | ⚠️ Conditional | Acceptable as a label for short, task-focused instructional content — ex. "How-to videos"; not a general synonym for Tutorial when the content provides in-depth product understanding rather than a single task instruction |
| Course | ⚠️ Conditional | Acceptable in formal learning or certification contexts where the tutorial is part of a structured curriculum — ex. "Enroll in the course"; not appropriate for standard in-product tutorial labels |
| Webinar | ❌ Avoid | Implies a live, scheduled group session — not pre-recorded, on-demand educational content |
| Demo | ❌ Avoid | Implies a product demonstration — not educational content designed to build user understanding |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Walkthrough | Referring to shorter content that provides an overview of a feature, flow, or process — ex. "Product walkthrough", "Onboarding walkthrough" | Walkthrough is brief and overview-focused; Tutorial is in-depth and understanding-focused — use Walkthrough for orientation, Tutorial for education |
| Guide | Referring to text-based, step-by-step instructional content — ex. "Setup guide", "Quick start guide" | Guide is text-based; Tutorial is primarily video-based — use Guide when the format is written, Tutorial when the format is video |
| Help Center | Referring to the destination that hosts tutorials and other support content | Help Center is the container; Tutorial is one content type within it — see Help Center entry |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Watch tutorial / Read guide | Presenting video-based and text-based educational content as complementary options — ex. in a help or onboarding surface | Watch is the standard action verb for Tutorial; Read is the standard action verb for Guide — always use the action verb that matches the content format |
| Tutorial / Walkthrough | Presenting in-depth educational content alongside a shorter overview — ex. in a help center or feature introduction surface | Tutorial is the comprehensive option; Walkthrough is the quick overview — always label each distinctly so users can choose the depth they need |

**In context:**

- ✅ "Watch the tutorial"
- ✅ "Tutorial library"
- ✅ "Getting started tutorial"
- ✅ "Video tutorial"
- ✅ "Fleet management tutorial"
- ❌ "Watch the demo" — Demo implies a product demonstration; use Tutorial for educational content designed to build understanding
- ❌ "Watch the webinar" — Webinar implies a live session; use Tutorial for pre-recorded educational content
- ❌ "Watch the guide" — Guide is text-based; use Watch the tutorial for video content and Read the guide for written content

**Notes:** Tutorial and Walkthrough are often used interchangeably but serve different user needs. Tutorial is in-depth — it is designed to give the user a comprehensive understanding of a product, service, or feature, and is primarily delivered as video content. Walkthrough is brief — it provides an orientation or overview without the depth of a tutorial. On surfaces where both are available, always label them distinctly and let users choose based on how much time and depth they need. The action verb matters: Watch for video tutorials, Read for text-based guides — never use Read for video content or Watch for written content.

---

### Update

**Definition:** The action of replacing an app or user-provided information with a newer or more current version.

**Use when:** Describing the action of replacing an existing app version with a newer one, or replacing previously saved user information with a more current version — ex. "Update app", "Update contact details", "Update payment method." Use when the action brings something to a more current state — either through a software version change or through the user correcting or refreshing their own data. Distinct from Reload (restarting an app), Refresh (loading the latest data in a view), and Upgrade (moving to a higher plan tier) — see Related terms.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Update | ✅ Use | — |
| Update [object] | ✅ Use | Always pair with the item being updated for clarity — ex. "Update app", "Update contact details", "Update payment method" |
| Reload | ❌ Avoid | Restarts an entire app or file — not a synonym for replacing content or a version with a newer one — see Related terms |
| Refresh | ❌ Avoid | Loads the latest data from a source into the current view — not for replacing saved user information or installing a new app version — see Related terms |
| Restart | ❌ Avoid | Stops and restarts a system, service, or device — not a synonym for bringing something to a more current version |
| Upgrade | ❌ Avoid | Moves to a higher plan or feature tier — Update is for version changes and data currency, not tier advancement — see Upgrade entry |
| Sync | ⚠️ Conditional | Acceptable when the update involves two-way data exchange between systems — ex. "Sync contacts"; not a general synonym for Update when the change is one-directional |
| Edit | ⚠️ Conditional | Acceptable when the user is modifying the content of a specific field or record — ex. "Edit address"; use Update when the emphasis is on bringing the information to a more current state — see Edit entry |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Reload | Restarting an entire app or file from scratch — ex. "Reload Authenticator", "Reload the app" | Reload restarts; Update replaces with a newer version — never use as synonyms — see Load / Reload entry |
| Refresh | Loading the latest data from a source into the current view — ex. "Refresh the dashboard", "Refresh your feed" | Refresh pulls in new data without replacing the app or the user's saved information; Update replaces content with a newer version — never use as synonyms |
| Upgrade | Moving to a higher plan or feature tier — ex. "Upgrade to Pro" | Upgrade is a tier advancement; Update is a version or data currency change — never use as synonyms — see Upgrade entry |
| Edit | Modifying the content of a specific field or record — ex. "Edit address", "Edit profile" | Edit is for content modification; Update is for bringing information to a more current state — use Edit when the change is any modification, Update when the change specifically reflects newer information — see Edit entry |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Update / Cancel | Presenting the option to apply a version update or abandon the update flow — ex. on an app update prompt | Use Cancel as the exit counterpart — never "Skip update" when the user is abandoning the flow entirely; use "Skip" only when the update is genuinely optional and deferrable |
| Update now / Update later | Presenting the option to apply an available update immediately or defer it — ex. on an optional app update notification | Use Update later when deferral is available — never "Remind me later" or "Skip" when the intent is to defer rather than dismiss permanently |
| System update / App update | Distinguishing between a device-level and application-level version change — ex. in a notifications or settings surface | Always qualify with the scope when both types of update are available on the same surface — System update for the device or OS, App update for the specific application |

**In context:**

- ✅ "Update app"
- ✅ "Update contact details"
- ✅ "Update payment method"
- ✅ "Update now"
- ✅ "Update later"
- ✅ "An update is available."
- ❌ "Reload app" — Reload restarts the app; use Update app for installing a newer version
- ❌ "Refresh contact details" — Refresh loads new data into a view; use Update for replacing saved user information with a newer version
- ❌ "Upgrade app" — Upgrade is a tier advancement; use Update for installing a new app version
- ❌ "Restart contact details" — Restart stops and restarts a system; use Update for replacing saved information

**Notes:** Update, Reload, Refresh, and Upgrade are four distinct actions that all involve changing something — but what changes and how differs significantly. Update replaces content or a version with something newer. Reload restarts an app or file entirely. Refresh pulls the latest data into a running view. Upgrade advances a plan or tier. Of the four, Update and Upgrade are the most commonly confused on settings and app management surfaces where both a version update notification and a plan upgrade CTA may appear simultaneously — always ensure they are labeled distinctly and never appear as synonyms on the same surface.

---

### Upload

**Definition:** The action of transferring a file from an external source — such as a device or local storage — into an app or service.

**Use when:** Describing the action of adding an external file to a product — ex. "Upload ID photo", "Upload document", "Upload profile image." Use on file input surfaces, form fields, and any surface where the user is bringing content from outside the product into it. Distinct from Download, which transfers content from the product to the user's device, and from Import, which brings in external data in bulk or in a specific format — see Related terms.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Upload | ✅ Use | — |
| Upload [object] | ✅ Use | Always pair with the file or content type being uploaded for clarity — ex. "Upload ID photo", "Upload document", "Upload profile image" |
| Import | ⚠️ Conditional | Acceptable when the action involves bringing in external data in bulk or in a specific format — ex. "Import contacts", "Import from CSV"; not a general synonym for Upload when the action is a single file transfer — see Download entry |
| Attach | ⚠️ Conditional | Acceptable when the file is being added to a specific message, form, or record — ex. "Attach a file"; not a general synonym for Upload when the file is being transferred to the product itself |
| Add | ⚠️ Conditional | Acceptable in space-constrained UI when the context makes the file-transfer nature clear — ex. "Add photo"; always prefer Upload when space allows — see Add entry |
| Send | ❌ Avoid | Implies delivering content to a specific recipient — not transferring a file into a product for storage or processing |
| Submit | ❌ Avoid | Implies sending completed data for processing or review — not the act of transferring a file into a product — see Submit entry |
| Save | ❌ Avoid | Records data already within the product — not transferring content from an external source — see Save entry |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Download | The user is transferring content from the product to their local device — ex. "Download report", "Download invoice" | Upload and Download describe opposite directions of file transfer — Upload is device to product, Download is product to device — see Download entry |
| Import | The action involves bringing in external data in bulk or in a specific format — ex. "Import contacts", "Import from CSV" | Import implies format conversion or bulk data transfer; Upload implies a single file transfer — use Import when the data structure or volume is the primary concern |
| Create | The user is generating a new item within the product rather than bringing in an existing external file | Create generates something new; Upload brings in something that already exists externally — never use as synonyms — see Create entry |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Upload / Download | Describing the two directions of file transfer — bringing content into the product and taking content out of it | Always use Download as the counterpart — never "Save" or "Export" when the action is specifically transferring a file from the product to the user's device — see Download entry |
| Upload / Remove | Describing the action of adding and removing an uploaded file — ex. on a profile image or document submission surface | Use Remove as the counterpart when the reverse action takes the uploaded file out of the product — never "Delete upload" or "Cancel upload" when the file has already been successfully transferred |
| Upload [object] / Replace [object] | Describing the initial upload and the action of replacing it with a new file — ex. on a profile image or ID document surface | Use Replace as the forward action when an uploaded file already exists and is being substituted — ex. "Replace profile image"; never "Re-upload" or "Upload new" |

**In context:**

- ✅ "Upload ID photo"
- ✅ "Upload document"
- ✅ "Upload profile image"
- ✅ "Upload your logo"
- ✅ "File uploaded successfully."
- ❌ "Send ID photo" — Send implies delivery to a recipient; use Upload for transferring a file into a product
- ❌ "Submit ID photo" — Submit is for sending completed data for processing; use Upload for transferring a file
- ❌ "Save ID photo" — Save records data already in the product; use Upload for bringing in external content
- ❌ "Import ID photo" — Import is for bulk or format-specific data transfer; use Upload for a single file

**Notes:** Upload and Download are the two directions of the same file transfer concept — Upload brings content in, Download takes content out. Both must be labeled consistently on surfaces where both are available. Upload, Import, and Create all result in content appearing in the product but from different origins and through different mechanisms: Upload brings in a single external file, Import brings in external data in bulk or a specific format, Create generates something new within the product. On file submission surfaces where a file has already been uploaded, always offer Replace rather than a second Upload — "Replace profile image" is clearer than "Upload new profile image" and prevents users from thinking they are adding to rather than substituting the existing file.

---

### Unavailable

**Definition:** The state of an app, product, feature, or service that cannot be accessed or used at the present time.

**Use when:** Describing something the user cannot currently access or use — ex. "Feature unavailable", "Service unavailable", "Currently unavailable." Use as a status label, error state indicator, or inline descriptor on any surface where an item, feature, or service is temporarily or permanently inaccessible. Always use as the counterpart to Available — see Paired terms and Available entry.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Unavailable | ✅ Use | Capitalize as a status label — ex. "Unavailable"; lowercase in body copy — ex. "This feature is currently unavailable" |
| Currently unavailable | ✅ Use | Use when emphasizing that the unavailability is temporary — ex. "This service is currently unavailable. Try again later." |
| [Item] unavailable | ✅ Use | Use when specifying the item adds clarity — ex. "Feature unavailable", "Service unavailable" |
| Not available | ⚠️ Conditional | Acceptable in body copy where the full word form reads more naturally — ex. "This feature is not available on your current plan"; not appropriate as a standalone status label — use Unavailable |
| Inactive | ❌ Avoid | Describes an item that is not currently operational — not whether it can be accessed; a user's access may be unavailable even when the item is active — see Inactive entry |
| Disabled | ❌ Avoid | Implies a feature or toggle that has been deliberately switched off — not a general synonym for Unavailable — see On / Off entries |
| Restricted | ⚠️ Conditional | Acceptable when the unavailability is specifically due to access rights or permissions — ex. "Access restricted"; not a general synonym for Unavailable across all contexts |
| Offline | ❌ Avoid | Refers to a connectivity state — not whether a feature or service can be accessed — see Connection entry |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Available | Describing something the user can currently access or use | Available and Unavailable are the canonical pair for access state — see Available entry and Paired terms |
| Inactive | Describing an item that is not currently operational — ex. an account or vehicle that is not running | Inactive describes operational state; Unavailable describes access state — a feature can be Unavailable to a user while remaining Active in the system — never use as synonyms — see Inactive entry |
| Error | Referring to a system message communicating an active issue affecting the user's experience — ex. "Service unavailable. Try again later." | Unavailable is a status label; Error is the system message type used to communicate it — see Error entry |
| Access | Referring to the usage rights that determine whether a user can reach a feature or service | Access describes the entitlement; Unavailable describes the result when that entitlement is absent or the feature is inaccessible — see Access entry |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Available / Unavailable | Describing whether a feature, service, or item can or cannot be accessed at the present time | Always use Available as the counterpart — never "Active", "Enabled", or "Online" when the dimension being described is access rather than operational state — see Available entry |

**In context:**

- ✅ "Feature unavailable"
- ✅ "Service unavailable"
- ✅ "Currently unavailable"
- ✅ "This feature is currently unavailable. Try again later."
- ✅ "This feature is unavailable on your current plan."
- ❌ "Feature inactive" — Inactive describes operational state; use Unavailable for access state
- ❌ "Feature disabled" — Disabled implies a deliberate toggle-off; use Unavailable for general inaccessibility
- ❌ "Feature offline" — Offline describes connectivity; use Unavailable for access state
- ❌ "Not available" — as a standalone status label; use Unavailable — Not available is acceptable only in body copy

**Notes:** Unavailable, Inactive, and Disabled all describe something the user cannot access or use, but for different reasons. Unavailable is neutral — the item cannot be accessed at this time, regardless of cause. Inactive means the item exists but is not currently running. Disabled means a feature or toggle has been deliberately switched off. On status indicators and labels, always use Unavailable as the neutral default when the reason for inaccessibility is not relevant or not known. Reserve Inactive and Disabled for contexts where the specific cause matters to the user and guides their next action.

---

### Undo

**Definition:** The action of reverting the most recent user action and canceling any of its effects.

**Use when:** Describing the action of reversing the immediately preceding user action — ex. "Undo edits", "Undo delete", "Undo." Use on editing surfaces, content management tools, and any surface where the user may want to reverse a just-completed action without navigating away or losing other progress. Distinct from Cancel (abandons a flow), Clear (removes all content from a surface), and Reset (returns to a default state) — see Related terms.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Undo | ✅ Use | — |
| Undo [action] | ✅ Use | Use when naming the action being reversed adds clarity — ex. "Undo edits", "Undo delete", "Undo move" |
| Cancel | ❌ Avoid | Abandons an ongoing flow or process — not a step-by-step reversal of a completed action — see Related terms |
| Clear | ❌ Avoid | Removes all content from a surface in a single bulk operation — not a targeted reversal of a specific action — see Related terms |
| Reset | ❌ Avoid | Returns data or settings to a default state — not a targeted reversal of the immediately preceding action — see Related terms |
| Revert | ⚠️ Conditional | Acceptable when reverting a document, file, or configuration to a previously saved version — ex. "Revert to saved"; not a general synonym for Undo in standard editing contexts |
| Go back | ❌ Avoid | Returns the user to the previous step in a navigation flow — not a reversal of a content action — see Go back entry |
| Remove | ❌ Avoid | Excludes an item from a list or collection — not a targeted reversal of an action — see Remove entry |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Cancel | The user is abandoning an ongoing flow or process — typically without saving progress | Cancel exits a flow; Undo reverses a completed action — Cancel operates on in-progress states, Undo operates on completed ones — never use as synonyms — see Cancel entry |
| Clear | The user is removing all content from a page, form, or input field in a single operation | Clear is a bulk content removal; Undo is an action-specific reversal — Clear does not restore content, Undo does — never use as synonyms — see Clear entry |
| Reset | The user is returning data or settings to a default state | Reset restores a prior configuration; Undo reverses the immediately preceding action — Reset is configuration-wide, Undo is action-specific — never use as synonyms — see Reset entry |
| Redo | The user is re-applying an action that was previously undone | Redo is the forward counterpart to Undo — see Paired terms |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Undo / Save | Presenting the option to reverse a recent action or record the current state — ex. in an editing flow where both actions are available simultaneously | Undo reverses progress; Save preserves it — both may appear on the same surface but must remain visually and functionally distinct — see Save entry |
| Undo / Dismiss | Presenting the option to reverse an action or let it stand — ex. in a transient notification such as a snackbar | Undo is the action; Dismiss closes the notification without reversing — never use Redo as the counterpart on the same notification surface |
| Undo / Keep changes | Presenting the option to reverse recent edits or confirm them — ex. on a confirmation prompt triggered when a user navigates away from an unsaved editing session | Keep changes is the forward-preserving counterpart — more specific and less ambiguous than "Save" when the decision is specifically whether to retain or discard recent edits |

**In context:**

- ✅ "Undo edits"
- ✅ "Undo delete"
- ✅ "Undo"
- ✅ "Undo move"
- ✅ "File deleted. Undo" - standard transient notification pattern; Undo appears alone, no counterpart on the same surface
- ❌ "Cancel edits" — Cancel abandons a flow; use Undo to reverse a completed editing action
- ❌ "Clear edits" — Clear removes all content from a surface; use Undo for a targeted action reversal
- ❌ "Reset edits" — Reset returns to a default state; use Undo for reversing the immediately preceding action
- ❌ "Go back" — Go back navigates to the previous step; use Undo for reversing a content action
- ❌ "File deleted. Undo? Redo?" — never pair Undo with Redo on the same notification surface; Undo appears alone in transient notifications

**Notes:** Undo, Cancel, Clear, and Reset all result in something being reversed or removed, but at different levels and through different mechanisms. Undo reverses the immediately preceding action — it is step-by-step and targeted. Cancel abandons an in-progress flow. Clear removes all content from a surface. Reset returns a configuration to its default. The key distinction for Undo is recency and specificity: it operates only on what the user just did, and it restores what was there before. On transient notification surfaces such as snackbars, Undo appears as a single action with no counterpart: "File deleted. Undo." The user either taps Undo or lets the notification dismiss itself. Redo belongs in toolbars and menus as a separate persistent control, not as a dialog-level or notification-level pair to Undo. In editing flows where both a reverse and a forward option are needed, Undo / Save and Undo / Keep changes are the correct pairs — they describe what will happen to the user's work, not abstract history operations. On surfaces with undo history, always name the undoable action wherever space allows: "Undo delete" rather than "Undo" alone.

---

### Unsubscribe

**Definition:** The action of removing or canceling a user's enrollment in a service, product, newsletter, or event.

**Use when:** Describing the action of ending a subscription or enrollment — ex. "Unsubscribe from Autona", "Unsubscribe from the newsletter", "Unsubscribe from Daily Tracks." Use in subscription management, account settings, email footers, and any surface where the user is opting out of a recurring service, paid subscription, or free enrollment. The correct counterpart depends on what the user originally enrolled in — Subscribe for paid recurring services, Sign up for free or lightweight enrollments — see Paired terms.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Unsubscribe | ✅ Use | — |
| Unsubscribe from [service] | ✅ Use | Use when naming the service being unsubscribed from adds clarity — ex. "Unsubscribe from Autona", "Unsubscribe from the newsletter" |
| Sign out | ❌ Avoid | Closes a user's current account session — not the same as ending a subscription or enrollment — see Sign out entry |
| Log out | ❌ Avoid | Not the established term for ending a session and not a synonym for ending a subscription — see Sign out entry |
| Close | ❌ Avoid | Dismisses a UI layer — does not end a subscription or enrollment — see Close entry |
| Exit | ❌ Avoid | Leaves an app, mode, or view — does not end a subscription or enrollment — see Exit entry |
| Cancel subscription | ⚠️ Conditional | Acceptable when the emphasis is on the financial or contractual termination of a paid subscription — ex. "Cancel subscription" in an account billing section; not a general synonym for Unsubscribe across all enrollment types — see Cancel entry |
| Opt out | ⚠️ Conditional | Acceptable in legal or data consent contexts — ex. "Opt out of marketing communications"; more formal than Unsubscribe and implies a legal right rather than a user choice |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Sign out | The user is ending their current account session — not canceling a subscription or enrollment | Sign out ends a session; Unsubscribe ends an enrollment — never use as synonyms — see Sign out entry |
| Cancel | The user is terminating a paid subscription's billing relationship entirely — ex. "Cancel subscription" | Cancel ends the subscription contract; Unsubscribe is the user-facing action label for opting out — the two may describe the same outcome but at different levels of formality — see Cancel entry |
| Subscribe | The user is enrolling in a paid recurring service — the action that Unsubscribe reverses | Subscribe is the canonical counterpart for paid services — see Subscribe and Paired terms |
| Sign up | The user is enrolling in a free or lightweight service — the action that Unsubscribe reverses for non-paid enrollments | Sign up is the canonical counterpart for free enrollments — see Sign up and Paired terms |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Subscribe / Unsubscribe | The enrollment is a paid recurring service — ex. "Subscribe to Autona" / "Unsubscribe from Autona" | Always use Subscribe as the counterpart for paid recurring services — never "Sign up / Unsubscribe" when the original enrollment was paid — see Subscribe entry |
| Sign up / Unsubscribe | The enrollment is a free service, newsletter, or event — ex. "Sign up for Daily Tracks" / "Unsubscribe from Daily Tracks" | Always use Sign up as the counterpart for free or lightweight enrollments — never "Subscribe / Unsubscribe" when no payment is involved — see Sign up entry |

**In context:**

- ✅ "Unsubscribe from Autona"
- ✅ "Unsubscribe from the newsletter"
- ✅ "Unsubscribe from Daily Tracks"
- ✅ "You've been unsubscribed."
- ❌ "Sign out of Autona" — Sign out ends a session; use Unsubscribe to end a subscription
- ❌ "Log out of the newsletter" — Log out ends a session and is not the established term; use Unsubscribe
- ❌ "Close your subscription" — Close dismisses a UI layer; use Unsubscribe to end an enrollment
- ❌ "Exit the newsletter" — Exit leaves a view; use Unsubscribe to cancel an enrollment

**Notes:** Unsubscribe is always paired with the term that initiated the enrollment — Subscribe for paid recurring services, Sign up for free or lightweight enrollments. Never mix the pair: a user who Subscribed to a paid service Unsubscribes, not Signs out or Cancels without context. A user who Signed up for a free newsletter also Unsubscribes. On email footers and notification preference surfaces where Unsubscribe appears as a standalone link, the service name should always accompany it — "Unsubscribe from Daily Tracks" rather than "Unsubscribe" alone — so the user knows exactly what they are opting out of.

---

### Upgrade

**Definition:** The action of switching an account, product, service, feature, or subscription to a higher tier — usually accompanied by an increase in cost or capability.

**Use when:** Describing the action of moving to a higher plan, tier, or capability level — ex. "Upgrade to Premium", "Upgrade your subscription", "Upgrade plan." Use on pricing pages, subscription management surfaces, and any surface where the user is advancing their plan level, feature access, or service tier. Distinct from Update, which brings something to a more current version without changing its tier — see Related terms.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Upgrade | ✅ Use | — |
| Upgrade to [tier] | ✅ Use | Use when naming the destination tier adds clarity — ex. "Upgrade to Premium", "Upgrade to Pro" |
| Upgrade [object] | ✅ Use | Use when specifying the item being upgraded adds clarity — ex. "Upgrade subscription", "Upgrade plan" |
| Update | ❌ Avoid | Replaces content or an app with a newer version — does not convey the tier advancement and cost increase that Upgrade implies — see Update entry |
| Improve | ❌ Avoid | Vague and non-specific — does not convey the tier-based nature of the change |
| Enhance | ❌ Avoid | Informal and marketing-adjacent — not appropriate for action labels |
| Switch | ⚠️ Conditional | Acceptable when the move between tiers is presented as a neutral plan change without emphasis on direction — ex. "Switch plans"; use Upgrade when the upward direction and its benefits are relevant to communicate |
| Unlock | ⚠️ Conditional | Acceptable when the emphasis is on gaining access to features currently unavailable on the user's plan — ex. "Unlock Pro features"; not a general synonym for Upgrade as a tier-change action label |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Downgrade | The user is switching to a lower tier — usually with a reduction in cost or capability | Upgrade and Downgrade are the canonical pair for tier-based plan changes — always use together when both directions are available on the same surface — see Downgrade entry and Paired terms |
| Update | The user is replacing an app or data with a newer version — not advancing to a higher plan tier | Update is for version currency; Upgrade is for tier advancement — never use as synonyms — see Update entry |
| Subscribe | The user is enrolling in a paid service for the first time — not advancing from an existing tier | Subscribe is for initial enrollment; Upgrade is for existing subscribers moving to a higher tier — see Subscribe entry |
| Change | The user is making a neutral, cost-free modification to a setting or preference — not a directional tier shift with an attached cost | Change is for free, non-directional modifications; Upgrade is for paid, upward tier changes — see Change entry |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Upgrade / Downgrade | Presenting the user with the option to move to a higher or lower tier — ex. on a subscription or plan management surface | Always use Downgrade as the counterpart — never "Reduce", "Lower", or "Switch down"; both must appear at the same navigation level when both directions are available — see Downgrade entry |

**In context:**

- ✅ "Upgrade to Premium"
- ✅ "Upgrade to Pro"
- ✅ "Upgrade subscription"
- ✅ "Upgrade plan"
- ✅ "Upgrade your account to access this feature."
- ❌ "Update to Premium" — Update is for version changes; use Upgrade for tier advancement
- ❌ "Improve your plan" — vague and non-specific; use Upgrade
- ❌ "Enhance your subscription" — marketing-adjacent; use Upgrade subscription
- ❌ "Switch to Premium" — Switch is neutral and direction-free; use Upgrade when the upward direction and its benefits are relevant

**Notes:** Upgrade and Update are the most commonly confused terms on settings and product surfaces where both a software version notification and a plan CTA may appear simultaneously. Upgrade is always directional and tier-based — it moves the user upward in the product hierarchy, usually at a higher cost. Update is always version-based — it replaces something with a newer iteration at the same tier. Never use them as synonyms on the same surface. When a user already has a subscription and is moving to a higher tier, Upgrade is always the correct term — Subscribe is for first-time enrollment only.

---

### Username

**Definition:** A user's identifier used during sign-in — chosen by the user or predefined by the system.

**Use when:** Referring to the identifier a user enters alongside their password to access their account — ex. "Enter your username", "Username", "Forgot your username?" Use in sign-in flows, account settings, and any surface where the user's identity credential is the subject. Distinct from Display name, which is how the user appears within the product to themselves and others — see Related terms.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Username | ✅ Use | Always one word — never "User name" as two words; lowercase in body copy — ex. "Enter your username"; capitalize as a field label — ex. "Username" |
| Alias | ❌ Avoid | Implies a secondary or alternative identity — not the primary identifier used for authentication |
| Name | ❌ Avoid | Too generic — does not convey the authentication-specific purpose of a username; also ambiguous with Display name or Full name |
| User ID | ⚠️ Conditional | Acceptable in developer-facing or enterprise contexts where the identifier is system-assigned rather than user-chosen — ex. "User ID: 84721"; not a general synonym for Username in standard sign-in copy |
| Handle | ⚠️ Conditional | Acceptable in social or community contexts where the username is public-facing and identity-expressive — ex. "@handle"; not appropriate for standard authentication-focused sign-in copy |
| Login | ❌ Avoid | Refers to the sign-in action or the combined credential set — not the username field specifically — see Sign in entry |
| Account name | ⚠️ Conditional | Acceptable in enterprise or B2B contexts where the identifier is tied to an organizational account — ex. "Account name"; not a general synonym for Username in consumer-facing sign-in flows |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Password | Referring to the credential paired with the username to complete a sign-in | Username and Password are the canonical sign-in credential pair — always present Username before Password in sign-in copy and form labels — see Password entry |
| Display name | Referring to the name the user presents within the product — ex. in a profile, a comment, or a collaboration surface | Username is for authentication; Display name is for in-product identity — a user's username and display name are often different and serve different purposes — never use as synonyms |
| Email | Referring to an email address used as the sign-in identifier — ex. when the product uses email rather than a separate username | Email is a specific type of sign-in identifier that replaces Username when email-based authentication is used — use Email when the field accepts an email address, Username when it accepts a non-email identifier |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Username / Password | Referring to the two credentials required for sign-in — ex. "Enter your username and password" | Always present Username before Password — the standard order is Username → Password — see Password entry |
| Forgot username / Forgot password | Presenting the two credential recovery entry points — ex. on a sign-in surface | Always offer both recovery paths when both apply — Forgot username and Forgot password are distinct flows that must be clearly labeled separately |

**In context:**

- ✅ "Enter your username"
- ✅ "Username"
- ✅ "Forgot your username?"
- ✅ "Choose a username"
- ✅ "Your username can't be changed after sign-up."
- ❌ "Enter your alias" — Alias implies a secondary identity; use Username for the primary sign-in identifier
- ❌ "Enter your name" — Name is too generic and ambiguous; use Username for the authentication-specific identifier
- ❌ "Enter your login" — Login refers to the sign-in action or credential set; use Username for the specific identifier field
- ❌ "User name" — always one word; use Username

**Notes:** Username and Display name serve different purposes and must never be used interchangeably. Username is a private authentication identifier — it proves who you are to the system. Display name is a public or semi-public identity label — it shows who you are to other users within the product. A user's username might be "j.anderson.84" while their display name is "Jamie Anderson". On products where the email address serves as the sign-in identifier, Email replaces Username in all sign-in copy and form labels — never use Username when the field expects an email address, as this creates a mismatch between the label and the expected input format.

---

### Vehicle

**Definition:** A transportation automobile used for on-land public or commercial transport — including buses and trucks in Volvo Group's portfolio.

**Use when:** Referring generically to on-land transportation automobiles in Volvo Group's portfolio — ex. "Vehicle status", "Add a vehicle", "Fleet vehicles." Use Vehicle as the umbrella term for buses and trucks across all surfaces where the transportation function is the subject, rather than specific vehicle type. Use the specific type name — ex. bus, truck — when the type is known and relevant to the user.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Vehicle | ✅ Use | Lowercase in body copy — ex. "Your vehicle is due for service"; capitalize only as a proper label or section title — ex. "Vehicle settings" |
| [Type] vehicle | ✅ Use | Use when specifying the vehicle type adds clarity — ex. "Commercial vehicle", "Heavy vehicle" |
| Car | ❌ Avoid | Reserved for small private passenger vehicles — not for commercial transportation automobiles — see Car entry |
| Machine | ❌ Avoid | Reserved for non-transport vehicles — ex. excavators, loaders, haulers — not for transportation automobiles — see Machine entry |
| Automobile | ❌ Avoid | Formal and dated — not appropriate for standard user-facing product copy |
| Transport | ⚠️ Conditional | Acceptable when referring to the broader act or system of transportation — ex. "Public transport"; not a general synonym for Vehicle as a product label |
| Unit | ❌ Avoid | Vague and imprecise — does not convey the transportation-specific nature of a vehicle |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Machine | Referring to a non-transport vehicle in Volvo Group's portfolio — ex. a loader, excavator, or hauler | Machine is for non-transport equipment; Vehicle is for on-land transport automobiles — never use as synonyms — see Machine entry |
| Car | Referring specifically to a small, private passenger vehicle | Car is the most specific passenger vehicle term — Vehicle is never appropriate as a synonym for Car — see Car entry |
| Driver | Referring to the individual who operates a vehicle | Driver is the personnel term paired with Vehicle in transportation contexts — see Driver entry |
| Fleet | Referring to a group of vehicles managed collectively — ex. "Fleet vehicles", "Manage your fleet" | Fleet is the aggregate; Vehicle is the individual unit — both may appear on the same surface — see Paired terms |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Vehicle / Driver | Referring to the transportation vehicle and the person operating it as a pair — ex. in fleet assignment, route management, or telematics contexts | Always use Driver as the personnel counterpart for vehicles — never Operator, which is reserved for machine operators — see Driver entry |
| Vehicle / Fleet | Referring to an individual vehicle and the collective group it belongs to — ex. "Add this vehicle to your fleet", "Fleet vehicles" | Fleet is the aggregate; Vehicle is the individual unit — both may appear on the same surface without overlapping in meaning |
| Vehicle / Machine | Referring to the two primary equipment categories in Volvo Group's portfolio on surfaces that cover both | Vehicle covers transportation automobiles; Machine covers non-transport equipment — always label each distinctly when both appear on the same surface — see Machine entry |

**In context:**

- ✅ "Vehicle status"
- ✅ "Add a vehicle"
- ✅ "Fleet vehicles"
- ✅ "Your vehicle is due for service."
- ✅ "No vehicles assigned."
- ❌ "Add a car" — Car is for small private passenger vehicles; use Vehicle for buses and trucks in the Volvo Group portfolio
- ❌ "Add a machine" — Machine is for non-transport equipment; use Vehicle for transportation automobiles
- ❌ "Add an automobile" — formal and dated; use Vehicle
- ❌ "Add a unit" — vague and imprecise; use Vehicle

**Notes:** Vehicle and Machine are the two primary equipment categories in the Volvo Group product vocabulary and must never be used interchangeably. Vehicle covers on-land transportation automobiles — buses and trucks. Machine covers non-transport construction and industrial equipment — excavators, loaders, haulers. On surfaces that manage both categories simultaneously — ex. a mixed fleet management platform — the two terms must always appear as distinct labels. Vehicle is also distinct from Car, which refers specifically to small private passenger vehicles and is never appropriate for commercial transportation automobiles in the Volvo Group portfolio.

---

### Verification

**Definition:** The process of checking the accuracy or validity of user-provided information or requests — ex. identity verification, email verification, address verification.

**Use when:** Referring to the process of confirming that user-provided information is accurate, valid, or genuine — ex. "Identity verification", "Email verification", "Verify your details." Use in onboarding flows, account setup, compliance surfaces, and any surface where the accuracy of user-submitted information is being confirmed. Distinct from Authentication, which confirms who the user is through a security credential — see Related terms.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Verification | ✅ Use | Lowercase in body copy — ex. "Complete your verification"; capitalize as a section label — ex. "Identity verification" |
| [Type] verification | ✅ Use | Use when specifying the type of verification adds clarity — ex. "Identity verification", "Email verification", "Address verification" |
| Verify | ✅ Use | The verb form — use when describing the action of checking accuracy — ex. "Verify your email", "Verify your identity", "Verify your details" |
| Authentication | ❌ Avoid | Confirms a user's identity through a second security layer — not the accuracy of user-provided information — see Related terms |
| Validation | ⚠️ Conditional | Acceptable in technical or developer-facing contexts where input meets a defined format or rule — ex. "Input validation"; not a general synonym for Verification in user-facing copy |
| Confirmation | ⚠️ Conditional | Acceptable when the user is confirming a specific action or event — ex. "Booking confirmation"; not a synonym for Verification when the process checks the accuracy of information — see Confirmation entry |
| Check | ❌ Avoid | Implies a quick visual review — does not convey the systematic process of verifying the accuracy of user information |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Authentication | Referring to the process of confirming a user's identity through a credential or second security layer — ex. two-factor authentication, Face ID | Authentication confirms identity; Verification confirms accuracy of information — never use as synonyms — see Authentication entry |
| Confirmation | Referring to a message or action that certifies an event has occurred or will occur — ex. "Booking confirmation", "Order confirmation" | Confirmation certifies an event; Verification checks the accuracy of information — the two occasionally appear in sequence but are never synonymous — see Confirmation entry |
| Validation | Referring to the technical process of checking that input meets a defined format or rule — ex. form field validation, data validation | Validation is system-side and format-based; Verification is user-facing and accuracy-based — use Validation in technical documentation, Verification in user-facing copy |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Verify / Confirm | Presenting the action of checking information accuracy alongside the action of certifying a completed event or choice — ex. in a multi-step onboarding flow | Verify is for checking accuracy of submitted information; Confirm is for gating a sensitive user action — both may appear in sequence in the same flow but must remain distinct in label and purpose |
| Verification / [Type] | Labeling a specific verification process — ex. "Identity verification", "Email verification" | Always qualify Verification with the type when the surface involves more than one type of verification — never use Verification alone as a label when the type is known |

**In context:**

- ✅ "Identity verification"
- ✅ "Email verification"
- ✅ "Verify your email"
- ✅ "Verify your details"
- ✅ "Complete your verification"
- ✅ "Address verification"
- ❌ "Authentication" — when the process is checking the accuracy of user-provided information rather than confirming identity through a security credential; use Verification
- ❌ "Validate your email" — Validate is for technical format-checking; use Verify your email for user-facing accuracy confirmation
- ❌ "Check your details" — Check implies a quick review; use Verify your details for a systematic accuracy confirmation

**Notes:** Verification, Authentication, and Confirmation are three closely adjacent concepts that frequently appear in the same user flows but describe distinct steps. Verification checks whether user-provided information is accurate — ex. "Is this the correct email address?" Authentication confirms whether the user is who they claim to be — ex. "Is this the right person?" Confirmation certifies that an event has occurred or will occur — ex. "Has this booking been registered?" A single onboarding flow may involve all three in sequence: the user Verifies their email, Authenticates with a second factor, and receives a Confirmation of account creation. Each step must be labeled with its correct term to set accurate expectations for what the user is being asked to do.

---

### Verify

**Definition:** The action of asking the user to double-check the accuracy of their own input or a pending action before it is processed.

**Use when:** Asking the user to review and confirm the accuracy of information they have provided — ex. "Verify your account number", "Verify your details", "Verify your address." Use in forms, checkout flows, and any surface where the user is being asked to check their own input before it is submitted or acted on. Distinct from Authenticate, which confirms identity through a security credential, and from Confirm, which gates a sensitive or irreversible action — see Related terms.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Verify | ✅ Use | — |
| Verify [object] | ✅ Use | Always pair with the item being verified for clarity — ex. "Verify your account number", "Verify your address", "Verify your details" |
| Authenticate | ❌ Avoid | Confirms identity through a security credential — not the user double-checking their own input — see Related terms |
| Validate | ❌ Avoid | Technical system-side process of checking input format — not the user-facing action of reviewing their own information — see Verification entry |
| Check | ⚠️ Conditional | Acceptable in informal or instructional body copy where a lighter tone is appropriate — ex. "Check your details before continuing"; not appropriate as a button label or section title where Verify is the established term |
| Confirm | ⚠️ Conditional | Acceptable when the user is giving explicit consent to proceed with a sensitive or irreversible action — not when they are simply reviewing the accuracy of their input — see Confirm entry |
| Review | ⚠️ Conditional | Acceptable when the user is reading through a summary before proceeding — ex. "Review your order"; not a general synonym for Verify when the emphasis is on accuracy checking rather than reading |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Authenticate | The user is completing an identity confirmation step through a security credential or second factor — ex. "Authenticate with Face ID" | Authenticate confirms who the user is; Verify checks the accuracy of what the user has provided — never use as synonyms — see Authenticate entry |
| Confirm | The user is giving explicit consent to proceed with a sensitive, impactful, or irreversible action — ex. "Confirm deletion", "Confirm transfer" | Confirm gates a user action; Verify checks the accuracy of user input — both may appear in the same flow but must remain distinct — see Confirm entry |
| Verification | Referring to the broader process of checking accuracy — ex. "Identity verification", "Email verification" | Verification is the noun form of the process; Verify is the action the user takes — see Verification entry |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Verify / Edit | Presenting the option to confirm the accuracy of information or return to correct it — ex. on a review step before submission | Use Edit as the correction counterpart — if the user spots an error during verification, they should be able to Edit, not Cancel or Go back — see Edit entry |
| Verify / Submit | Presenting the accuracy check alongside the final submission action — ex. on a form review step | Verify is the check; Submit is the send — always offer both when the user is reviewing input before sending it for processing — see Submit entry |

**In context:**

- ✅ "Verify your account number"
- ✅ "Verify your address"
- ✅ "Verify your details"
- ✅ "Please verify the information below before submitting."
- ❌ "Authenticate your account number" — Authentication confirms identity; use Verify when asking the user to check their own input
- ❌ "Validate your account number" — Validate is a technical system-side check; use Verify for user-facing accuracy review
- ❌ "Confirm your account number" — Confirm gates a sensitive action; use Verify when the user is reviewing the accuracy of input before submission

**Notes:** Verify, Authenticate, and Confirm occupy adjacent but distinct positions in the user action vocabulary. Verify is accuracy-focused — the user is checking whether what they entered is correct. Authenticate is identity-focused — the system is checking whether the person is who they claim to be. Confirm is consent-focused — the user is agreeing to proceed with a consequential action. In a payment flow, a user might Verify their account number (accuracy check), Authenticate with a second factor (identity check), and Confirm the transfer (consent gate) — three distinct steps that must each be labeled with their correct term to set accurate user expectations at each stage.

---

### Version

**Definition:** A variant of the same document, app, product, or item — typically numbered or indexed to indicate progression and chronological order.

**Use when:** Referring to a specific release, iteration, or variant of a document, app, or product — ex. "Version 2.1", "Latest version", "App version." Use in update notifications, release notes, settings, and any surface where the specific iteration of a product or document is being identified or communicated to the user.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Version | ✅ Use | Lowercase in body copy — ex. "Install the latest version"; capitalize as a label — ex. "Version 2.1" |
| Version [number] | ✅ Use | Use the version number when identifying a specific release — ex. "Version 2.1", "Version 14.0.1" |
| Latest version | ✅ Use | Use when directing the user to the most current release without specifying a number — ex. "Update to the latest version" |
| v[number] | ✅ Use | Acceptable as a compact version identifier in space-constrained UI or developer-facing contexts — ex. "v2.1"; always use the full "Version [number]" form in body copy and notifications |
| Edition | ❌ Avoid | Implies a distinct commercial or editorial release — not the iterative, numbered versioning of a software or document |
| Issue | ❌ Avoid | Implies a periodic publication — not appropriate for product or software versioning |
| Release | ⚠️ Conditional | Acceptable when referring to the event of making a version available — ex. "The latest release includes bug fixes"; not a direct synonym for Version as a label or identifier |
| Build | ⚠️ Conditional | Acceptable in developer-facing or technical documentation where the specific compiled instance of a version is relevant — ex. "Build 20240315"; not for standard user-facing version labels |
| Update | ⚠️ Conditional | Acceptable when referring to the action of moving to a newer version — ex. "Install the update"; not a synonym for Version as an identifier — see Update entry |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Update | Referring to the action of replacing the current version with a newer one — ex. "Update app", "Install the update" | Update is the action; Version is the identifier — "Update to version 2.1" correctly pairs both — see Update entry |
| Release notes | Referring to the document that describes what changed in a specific version — ex. "Read the release notes for version 2.1" | Release notes document a version's changes; Version identifies the release — both frequently appear together |
| System | Referring to the broader product or infrastructure of which the version is a part — ex. "System version", "Operating system version" | System scopes the version to a specific product layer — see System entry |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Current version / Latest version | Presenting the user's installed version alongside the most recent available release — ex. in an update notification or settings surface | Current version is what the user has; Latest version is what is available — always display both when an update is available so the user can compare |
| Version / Update | Presenting the version identifier alongside the action to install a newer one — ex. "Version 2.0 is available. Update now." | Version identifies the release; Update is the action — both must appear together on update notification surfaces to give the user full context |

**In context:**

- ✅ "Version 2.1"
- ✅ "Latest version"
- ✅ "Update to the latest version"
- ✅ "Version 2.0 is available."
- ✅ "v2.1" — compact form in space-constrained UI
- ✅ "Current version: 1.4 / Latest version: 2.1"
- ❌ "Edition 2.1" — Edition implies a commercial or editorial variant; use Version for iterative product releases
- ❌ "Issue 2.1" — Issue implies a periodic publication; use Version for product or document iterations
- ❌ "Build 2.1" — Build is a developer-facing identifier; use Version in standard user-facing copy

**Notes:** Version is the standard identifier for any iterative release of a product, app, or document. On update notification surfaces, always display both the current and latest version numbers when they differ — ex. "Current version: 1.4. Update to version 2.1." — so the user can assess the gap before deciding to update. The compact "v[number]" form is appropriate in space-constrained UI and developer contexts, but the full "Version [number]" form should always be used in notifications, release notes, and settings where the user needs full clarity about what they are installing or viewing.

---

### View

**Definition:** The action of accessing read-only or data-based content — directing the user to a destination for passive observation.

**Use when:** Directing the user to a specific, named destination where content will be observed rather than interacted with — ex. "View shopping cart", "View report", "View invoice." Use when the content at the destination is primarily read-only, data-based, or informational. When the user will interact with the destination, prefer See. When content is revealed inline without navigation, use Show — see Related terms.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| View | ✅ Use | — |
| View [object] | ✅ Use | Always pair with the destination or content type for clarity — ex. "View shopping cart", "View report", "View invoice" |
| View all [content] | ✅ Use | Use when directing the user to a complete collection — ex. "View all orders", "View all notifications" |
| See | ✅ Use | Acceptable alternative with a similar meaning — preferred when the destination involves interaction beyond observation, or when a more conversational tone is appropriate — see See entry |
| Show | ❌ Avoid | Reveals hidden or collapsed content within the current view without navigating — not for directing the user to a separate destination — see Related terms |
| Read | ⚠️ Conditional | Acceptable when the destination is specifically long-form text content — ex. "Read the report", "Read the article"; use View when the destination is data-based or mixed-format — see Read entry |
| Learn | ⚠️ Conditional | Acceptable when the destination contains mixed educational content types — ex. "Learn more"; use View when the destination is specifically for observation of data or status — see Learn entry |
| Open | ⚠️ Conditional | Acceptable when the destination is an interactive item — ex. "Open file", "Open chat"; use View when the emphasis is on passive observation rather than interaction — see Open entry |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| See | Directing the user to a named destination that may involve interaction, or revealing content in a broader context — ex. "See full list", "See all results" | See is more general than View — it covers navigation to any named destination and expansion of content within the current view; use View when passive observation of read-only or data-based content is the primary intent — see See entry |
| Show | Revealing hidden or collapsed content within the current UI without navigating away — ex. "Show filters", "Show details" | Show reveals content in place; View navigates to a destination — never use as synonyms — see Show entry |
| Read | Directing the user to long-form text content — ex. "Read the article", "Read the report" | Read is for text-based destinations; View is for data-based or mixed-format destinations — use Read when the content is primarily written, View when it is data or status — see Read entry |
| Learn | Directing the user to mixed educational content — ex. "Learn how it works", "Learn more" | Learn is for educational or feature-introduction destinations; View is for data or status observation — see Learn entry |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| View / Edit | Presenting the option to observe content in read-only mode and the option to modify it — ex. on a profile, document, or data record | View is the observation state; Edit is the modification state — always distinguish the two when both are available on the same surface — see Edit entry |
| View all / View less | Presenting the option to expand and collapse a full list or collection — ex. in a summary card or dashboard widget | Use View less as the counterpart when the full list is expanded — never "See less", "Show less", or "Collapse" when View all is the expand label |

**In context:**

- ✅ "View shopping cart"
- ✅ "View report"
- ✅ "View invoice"
- ✅ "View all orders"
- ✅ "View all notifications"
- ✅ "See" — as an alternative when interaction is appropriate
- ❌ "Show shopping cart" — Show reveals content in place; use View for navigating to a destination
- ❌ "Read invoice" — Read is for text-based content; use View for data-based documents like invoices
- ❌ "Open report" — Open is for interactive items; use View when the content is for passive observation

**Notes:** View and See are the most commonly interchangeable terms in this entry and both are valid alternatives. The distinction is scope: View implies passive observation of read-only or data-based content — the user is directed to a destination to observe. See is broader — it covers navigation to any named destination and, in some cases, expansion of content within the current view. In practice, use View when the content is a data record, report, invoice, or status summary. Use See when the content may involve interaction or the destination is not specifically data-based. Show is never a substitute for either — Show reveals content in the current view without navigation, while View and See direct the user to a destination.

---

### Visit

**Definition:** A navigation action that directs the user to a destination outside their current UI — ex. an external website, a physical location, or a separate product.

**Use when:** Labeling a link or action that takes the user outside the current product UI — ex. "Visit the Help Center", "Visit volvogroup.com", "Visit a dealer." Use for external website links, cross-domain navigation, and physical location CTAs. When the destination is within the current product UI, use Go to [destination] instead — see Related terms.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Visit | ✅ Use | — |
| Visit [destination] | ✅ Use | Always include the destination name — ex. "Visit the Help Center", "Visit volvogroup.com", "Visit a dealer" |
| Go to [destination] | ⚠️ Conditional | Acceptable when the destination is within the current product UI — ex. "Go to settings"; use Visit when the destination is specifically outside the current UI — see Go to entry |
| Navigate to | ❌ Avoid | Technical and impersonal — not appropriate for user-facing navigation labels |
| Check out | ❌ Avoid | Informal and ambiguous — not appropriate for standard navigation labels |
| Head to | ❌ Avoid | Informal and idiomatic — not appropriate for UI copy |
| Browse | ⚠️ Conditional | Acceptable when the destination involves open-ended exploration — ex. "Browse our catalog"; not a synonym for Visit when a specific external destination is being named |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Go to [destination] | Directing the user to a named destination within the current product UI — ex. "Go to settings", "Go to profile" | Go to is for internal destinations; Visit is for external ones — the two can coexist on the same surface when destinations are mixed — never use interchangeably on the same surface — see Go to entry |
| See | Directing the user to a named destination within the product or expanding content — ex. "See full list", "See all results" | See is for internal navigation or inline expansion; Visit is for external destinations — see See entry |
| View | Directing the user to read-only or data-based content within the product — ex. "View report", "View invoice" | View is for internal read-only destinations; Visit is for external ones — see View entry |
| Read | Directing the user to a destination with specifically long-form text content — ex. "Read the article" | Read is for text-based destinations; Visit is for any external destination regardless of content type — see Read entry |
| Learn | Directing the user to a destination with mixed educational content — ex. "Learn more" | Learn is for mixed educational destinations; Visit is for any external destination — see Learn entry |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Go to [destination] / Visit [destination] | Presenting navigation to both internal and external destinations on the same surface | Use Go to for every internal link, Visit for every external one — never mix the two labels for destinations of the same type — see Go to entry |
| Visit [destination] / Contact | Presenting a physical location CTA alongside a communication CTA — ex. on a dealer or support surface | Visit is for physical or external destinations; Contact is for initiating communication — both may appear on the same surface for the same entity — see Contact entry |

**In context:**

- ✅ "Visit the Help Center"
- ✅ "Visit volvogroup.com"
- ✅ "Visit a dealer"
- ✅ "Visit our website"
- ❌ "Navigate to the Help Center" — technical; use Visit for external destinations
- ❌ "Check out the Help Center" — informal; use Visit
- ❌ "Go to the Help Center" — Go to is for internal destinations; use Visit when the Help Center is outside the current product UI
- ❌ "Head to volvogroup.com" — informal; use Visit volvogroup.com

**Notes:** Visit is specifically scoped to destinations outside the current product UI. This distinguishes it from Go to (internal navigation), See and View (internal navigation or data observation), and Read and Learn (content-type-specific navigation). On surfaces where both internal and external links appear — ex. a support page that links to in-product settings ("Go to settings") and an external website ("Visit volvogroup.com") — always apply the labels consistently: Go to for every internal link, Visit for every external one. Mixing the two removes the navigational signal that tells users whether they are staying within the product or leaving it.

---

### Walkthrough

**Definition:** Short, practical content that gives the user a quick overview of a product, feature, flow, or update.

**Use when:** Referring to brief, guided content designed to orient the user rather than provide in-depth instruction — ex. "Product walkthrough", "Feature walkthrough", "Take the walkthrough." Use in onboarding flows, feature introductions, and any surface where the user is being quickly oriented to something new without a full learning commitment. Distinct from a Tutorial, which provides in-depth understanding — see Related terms.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Walkthrough | ✅ Use | Always one word — never "walk-through" or "walk through" as the noun or adjective form; lowercase in body copy — ex. "Take the walkthrough"; capitalize as a section label — ex. "Product walkthrough" |
| [Qualifier] walkthrough | ✅ Use | Use when specifying the subject adds clarity — ex. "Product walkthrough", "Feature walkthrough", "Onboarding walkthrough" |
| Start the walkthrough | ✅ Use | Standard CTA for initiating a guided walkthrough — ex. in onboarding or feature introduction surfaces |
| Tutorial | ❌ Avoid | Reserved for in-depth educational content — not for quick, orienting overviews — see Related terms |
| Tour | ⚠️ Conditional | Acceptable when the walkthrough is specifically a navigational tour of the product UI — ex. "Product tour", "Take the tour"; not a general synonym for Walkthrough in all contexts |
| Demo | ❌ Avoid | Implies a product demonstration — not educational orientation content designed for the user — see Tutorial entry |
| Onboarding | ⚠️ Conditional | Acceptable as a broader label when the walkthrough is part of a first-time user flow — ex. "Onboarding walkthrough"; not a general synonym for Walkthrough as a content type |
| Guide | ⚠️ Conditional | Acceptable when the content is text-based and step-by-step — ex. "Quick start guide"; use Walkthrough when the content is interactive or visually guided rather than text-based |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Tutorial | Referring to in-depth educational content designed to give the user a comprehensive understanding — primarily in video format | Tutorial is comprehensive and in-depth; Walkthrough is brief and orienting — use Walkthrough when the user needs a quick overview, Tutorial when they need full understanding — see Tutorial entry |
| Guide | Referring to text-based, step-by-step instructional content — ex. "Setup guide", "Quick start guide" | Guide is text-based; Walkthrough is typically interactive or visually guided — use Guide when the format is written, Walkthrough when the format is interactive |
| Help Center | Referring to the destination that hosts walkthroughs and other support content | Help Center is the container; Walkthrough is one content type within it — see Help Center entry |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Walkthrough / Tutorial | Presenting a quick overview alongside in-depth educational content — ex. in a help center or feature introduction surface | Walkthrough is the quick option; Tutorial is the comprehensive option — always label each distinctly and place Walkthrough first as the lower-commitment entry point |
| Start the walkthrough / Skip | Presenting the option to begin the guided orientation or bypass it — ex. in an onboarding flow | Use Skip as the exit counterpart — never "Cancel", "Close", or "Exit" when the user is bypassing a non-mandatory walkthrough |

**In context:**

- ✅ "Product walkthrough"
- ✅ "Feature walkthrough"
- ✅ "Onboarding walkthrough"
- ✅ "Start the walkthrough"
- ✅ "Take a quick walkthrough of the new features."
- ❌ "Product tutorial" — when the content is a brief orienting overview, not in-depth instruction; use Walkthrough
- ❌ "Product demo" — Demo implies a product demonstration; use Walkthrough for user-oriented overview content
- ❌ "Walk-through" — hyphenated form is incorrect as a noun or adjective; use Walkthrough as one word

**Notes:** Walkthrough and Tutorial are the two primary educational content types in this glossary and must always be labeled distinctly. Walkthrough is brief — it gives the user a quick, practical orientation without requiring a significant time commitment. Tutorial is in-depth — it builds comprehensive understanding, primarily through video. On surfaces where both are available, always present Walkthrough first as the lower-commitment entry point, and Tutorial as the deeper option for users who want full understanding. The action verb for Walkthrough is Start — ex. "Start the walkthrough" — not Watch, which is reserved for video tutorials.

---

### Warning

**Definition:** A message that notifies the user of a critical issue or event — either system-generated or triggered by a user action — that creates friction or requires action before the user can continue normally.

**Use when:** Referring to a message that communicates a critical issue, a required action, or a destructive consequence the user must acknowledge or address — ex. "Warning: Account deletion is permanent", "Warning: Fuel level is low", "Warning: Your inbox is full." Use across system alerts, action confirmation gates, and any surface where the user needs to be stopped or significantly slowed before proceeding. Distinct from Alert (non-critical, informational) and Error (active issue already affecting the experience) — see Related terms.

**Tone of voice:** Calm, sympathetic, helpful. Acknowledge the issue or consequence clearly without alarming the user unnecessarily. Focus on what the user needs to know or do — see Error entry for the full system message hierarchy.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Warning | ✅ Use | Capitalize as a message label or status indicator — ex. "Warning"; lowercase in body copy — ex. "A warning appeared about your fuel level" |
| [Type] warning | ✅ Use | Use when specifying the warning type adds clarity — ex. "Fuel warning", "Storage warning", "Security warning" |
| Alert | ❌ Avoid | Reserved for non-critical, informational notifications that do not require action or restrict the user experience — not a synonym for Warning — see Related terms |
| Error | ❌ Avoid | Reserved for active or escalating issues already affecting the user's experience — Warning gates or slows the user; Error blocks or degrades their experience — see Related terms |
| Caution | ❌ Avoid | In this product's system message hierarchy, Caution is reserved for preventive messages about potential upcoming issues — not for critical issues requiring immediate acknowledgement — see Error entry |
| Notice | ❌ Avoid | Implies passive, informational content — does not convey the critical, action-requiring nature of a Warning |
| Notification | ⚠️ Conditional | Acceptable as a broad delivery mechanism label — ex. "You have a new notification"; not a synonym for Warning as a system message type |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Alert | Informing the user about a relevant but non-critical event that does not restrict the user experience or require immediate action — ex. "Your subscription renews in 3 days" | Alert is informational and non-blocking; Warning creates friction or requires action — never use as synonyms — see Alert entry |
| Error | Communicating an active or escalating issue already affecting the user's experience — ex. "Payment failed", "Engine must be stopped to avoid overheating" | Error is reactive and experience-affecting; Warning is anticipatory or action-gating — never use as synonyms — see Error entry |
| Caution | Alerting the user to a potential upcoming issue before it occurs — ex. "Beta feature", "Limited time left to schedule maintenance" | Caution is preventive and forward-looking; Warning is present and action-requiring — the two occupy adjacent tiers in the system message hierarchy — see Error entry |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Warning / Acknowledge | Presenting a warning alongside the action that confirms the user has read and accepted it — ex. "Warning: This action is irreversible. Acknowledge to continue." | Use Acknowledge when the user must confirm they have understood the warning before proceeding — never "OK", "Got it", or "Confirm" when the warning specifically requires the user to accept a risk or consequence |
| Warning / [Primary action] | Presenting a warning alongside the action that triggered it — ex. on a destructive action confirmation dialog | Always pair Warning with the specific action it gates — "Warning: Account deletion is permanent" must appear before "Delete account", not after |

**In context:**

- ✅ "Warning: Account deletion is permanent."
- ✅ "Warning: Fuel level is low."
- ✅ "Warning: Your inbox is full and can't receive more messages."
- ✅ "Fuel warning"
- ✅ "Security warning"
- ❌ "Alert: Your inbox is full" — Alert is non-critical; inbox full restricts the user experience and requires action; use Warning
- ❌ "Error: Fuel level is low" — Error is for active issues already affecting the experience; fuel level is a warning condition not yet causing failure; use Warning
- ❌ "Notice: Account deletion is permanent" — Notice implies passive information; account deletion permanence is a critical consequence requiring acknowledgement; use Warning

**Notes:** Warning sits in the fourth tier of a six-level system message hierarchy — above Caution (preventive) and below Error (active issue). Warning is the appropriate tier when the issue is present and critical, when the user experience is being restricted or gated, or when a user action has destructive or irreversible consequences that must be communicated before proceeding. The key distinction from Error: Warning anticipates or gates — it says "this will happen if you continue" or "this requires your attention now." Error reacts — it says "this has already happened and needs to be fixed." For the full six-level hierarchy, see the Error entry.

---

### Yes

**Definition:** An affirmative response to a sensitive, impactful, or irreversible action — always accompanied by a clarification of what the user is consenting to.

**Use when:** Presenting the option to consent to a sensitive, impactful, or irreversible action — ex. "Yes, delete my account", "Yes, remove this driver." Always include a clarification of what the affirmation means whenever space allows — never use Yes alone on a dialog involving a destructive or consequential action. Never pair with No when both options require clarification — use descriptive action labels for both instead — see No entry.

**Variant forms:**
| Form | Status | Notes |
|------|--------|-------|
| Yes, [clarification] | ✅ Use | Preferred form — always include what the user is consenting to — ex. "Yes, delete my account", "Yes, remove this driver" |
| Yes | ⚠️ Conditional | Acceptable only when the affirmation is unambiguous from context and no clarification is needed — ex. a simple factual confirmation with no irreversible consequences; never use alone on destructive or irreversible action dialogs |
| Confirm | ✅ Use | Acceptable alternative in similar scenarios — preferred when the action is sensitive or irreversible and the emphasis is on explicit gating — see Confirm entry |
| Yes / No | ❌ Avoid | Never use as a dialog option pair — Yes and No provide no context about the outcome of either choice; always use descriptive action labels instead — see No entry |
| OK | ❌ Avoid | For conditions the user has minimal control over — not for sensitive or irreversible actions where explicit, informed consent is required — see OK entry |
| Sure | ❌ Avoid | Informal and implies optional agreement — not appropriate for sensitive or irreversible action dialogs |
| Absolutely | ❌ Avoid | Informal and conversational — not appropriate for UI copy |

**Related terms:**
| Term | Use when | Notes |
|------|----------|-------|
| Allow | The user is granting optional permission for a feature or service to access a resource — ex. "Allow camera access" | Allow is for optional permissions; Yes is for sensitive or irreversible action consent — never use as synonyms — see Allow entry |
| Accept | The user is giving mandatory consent to terms, policies, or gating conditions required for the product to function | Accept is for mandatory external requirements; Yes is for the user's own sensitive action consent — never use as synonyms — see Accept entry |
| Confirm | The user is giving explicit consent to proceed with a sensitive or irreversible action — ex. "Confirm deletion", "Confirm transfer" | Confirm is the preferred alternative to Yes when the action is high-stakes — use Confirm when the action label alone is sufficient, Yes, [clarification] when the binary framing helps orient the user — see Confirm entry |
| No | The user is refusing a sensitive, impactful, or irreversible action | No is the refusal counterpart to Yes — always include a clarification for both when both options are present; never pair Yes / No without clarification — see No entry |

**Paired terms:**
| Pair | Use when | Notes |
|------|----------|-------|
| Yes, [clarification] / Cancel | Presenting affirmative consent and the option to abandon the action entirely — ex. "Yes, delete my account" / "Cancel" | Always use Cancel as the exit counterpart — never "No" as a standalone label; the Yes option must always include a clarification of what is being consented to |
| Yes, [clarification] / No, [clarification] | Presenting both affirmative and negative responses with full clarification on both sides — ex. "Yes, delete my account" / "No, keep my account" | Use only when both options require clarification and descriptive action labels alone are not possible — if both can be fully descriptive without Yes / No, prefer that pattern — see No entry |

**In context:**

- ✅ "Yes, delete my account"
- ✅ "Yes, remove this driver"
- ✅ "Yes, cancel my subscription"
- ✅ "Confirm" — preferred alternative when the action label alone is sufficient
- ❌ "Yes" — alone on a destructive or irreversible action dialog; always add a clarification
- ❌ "Yes / No" — never use as a pair without clarification on both options; use descriptive action labels
- ❌ "Sure" — informal; use Yes, [clarification] or Confirm
- ❌ "OK" — for sensitive or irreversible actions; use Yes, [clarification] or Confirm to ensure the user understands what they are consenting to

**Notes:** Yes and No are parallel entries in this glossary — both require clarification on any surface where a sensitive, impactful, or irreversible action is involved, and neither should ever appear as a plain binary pair. Yes, [clarification] is the preferred form when the binary framing helps the user understand the choice; Confirm is preferred when a single descriptive action label is sufficient and no binary framing is needed. The clearest test: if removing "Yes," from "Yes, delete my account" still leaves an unambiguous, outcome-describing label — use Confirm; if the clarification is essential to distinguishing the choice from its alternative — use Yes, [clarification].

---

## Forbidden terms

Terms that must never appear in UX copy on any surface.
Every entry requires a "Use instead" value. Entries without it are incomplete and must not be enforced until the field is filled.

| Forbidden term                        | Why forbidden                                              | Use instead                               | Applies to           |
| ------------------------------------- | ---------------------------------------------------------- | ----------------------------------------- | -------------------- |
| Kill                                  | Violent connotation; alarming in error contexts            | Stop, End, Remove                         | All surfaces         |
| Abort                                 | Technical; alarming for general audiences                  | Cancel, Stop                              | All surfaces         |
| Hit (as in "hit the button")          | Informal; unclear for screen reader users                  | Select, Choose, Click                     | All surfaces         |
| Simply / Just                         | Condescending; implies the task is easy when it may not be | Remove the modifier                       | All surfaces         |
| Easy                                  | Subjective; alienates users who find it hard               | Remove or describe the benefit instead    | All surfaces         |
| Whitelist / Blacklist                 | Racially coded terminology                                 | Allowlist / Blocklist                     | All surfaces         |
| Master / Slave                        | Racially coded terminology                                 | Primary / Secondary, Leader / Follower    | All surfaces         |
| Sanity check                          | Ableist connotation                                        | Quick check, Review, Verify               | All surfaces         |
| Click here                            | Directional; fails accessibility; assumes mouse input      | [Action verb] + [destination or object]   | All surfaces         |
| Please (at the start of instructions) | Filler; slightly passive                                   | Remove — lead with the verb               | Instructions, errors |
| Oops / Whoops / Uh oh                 | Trivialises user's problem                                 | Remove entirely; start with what happened | Error states         |

---

## UI pattern vocabulary

Standard terms for common UI states, components, and interactions. These apply across all sub-skills. Do not invent alternatives.

### States

| State                               | Canonical term    | Do not use                                                                                                                                                  |
| ----------------------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Content has not been created yet    | Empty state       | Blank state, Zero state, Nothing here                                                                                                                       |
| Search or filter returned nothing   | No results        | Empty results, Zero results                                                                                                                                 |
| System is processing                | Loading           | Fetching, Retrieving (in user-facing copy)                                                                                                                  |
| Action completed successfully       | Success           | Done, Finished, Complete (as a state label)                                                                                                                 |
| Action failed                       | Error             | Failure, Problem (as a state label)                                                                                                                         |
| Feature unavailable on current plan | Unavailable       | Locked, Premium only, Upgrade required (Upgrade required = CTA that accompanies the status, not the status label itself)                                    |
| User lacks permission               | Access restricted | Forbidden, Not allowed, Blocked                                                                                                                             |
| System temporarily unavailable      | Unavailable       | Down, Broken, Offline (Offline = connectivity state, not access state); Currently unavailable is an acceptable variant when the unavailability is temporary |

### Component copy terms

| Component                              | Term for its copy | Notes                                                                                                                                                                |
| -------------------------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Text inside an input before typing     | Placeholder       | Not "ghost text", not "watermark text"                                                                                                                               |
| Text below an input field              | Helper text       | Not "hint text", not "subtext", not "caption"                                                                                                                        |
| Text below an input field when invalid | Validation error  | Not "inline error", not "field error"                                                                                                                                |
| Passive overlay on hover               | Tooltip           | Not "popover" — popovers are interactive                                                                                                                             |
| Interactive overlay with content       | Popover           | Not "tooltip" — tooltips are passive                                                                                                                                 |
| Full overlay blocking content          | Modal             | Not "dialog" in user-facing copy                                                                                                                                     |
| Temporary message at screen edge       | Snackbar          | Not "toast" in user-facing copy                                                                                                                                      |
| Persistent message strip               | Banner            | Not "alert bar", not "notification bar"                                                                                                                              |
| Step-by-step feature introduction      | Walkthrough       | Not "tutorial" (tutorial = in-depth educational content, primarily video); "Tour" acceptable only when the walkthrough is specifically a navigational tour of the UI |

### Action verb standards

When multiple verbs could describe the same action, use the canonical verb.

| Situation                                               | Canonical verb | Do not use                                                                                                                                                                    |
| ------------------------------------------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Permanently remove data or content                      | Delete         | Remove (Remove = non-permanent detachment); Clear (Clear = bulk content removal from a surface)                                                                               |
| Detach without deleting                                 | Remove         | Delete, Unlink                                                                                                                                                                |
| Remove all content from a field or surface at once      | Clear          | Delete (Delete = permanent destruction); Reset (Reset = return to default state)                                                                                              |
| Return data or settings to a default state              | Reset          | Clear (Clear = bulk content removal); Undo (Undo = reverse most recent action only)                                                                                           |
| Move content to long-term storage with intent to retain | Archive        | Delete (Delete = permanent destruction); Remove                                                                                                                               |
| Leave a shared space                                    | Leave          | Exit, Quit                                                                                                                                                                    |
| End a session                                           | Sign out       | Log out, Logout                                                                                                                                                               |
| Begin a session                                         | Sign in        | Log in, Login                                                                                                                                                                 |
| Create an account for product access                    | Create account | Register (Register = formal flows requiring detailed or sensitive information); Sign up (Sign up = lightweight free enrollment for newsletters or events, not product access) |
| Record user input or changes within the product         | Save           | Record, Refresh, Update (Update = replace with a newer version)                                                                                                               |
| Send completed data for processing or review            | Submit         | Save (Save = preserve in product); Share (Share = grant access to content)                                                                                                    |
| Undo a completed action                                 | Undo           | Reverse, Revert (Revert = return to a previous saved version)                                                                                                                 |
| Return to a previous version                            | Revert         | Undo, Restore (Restore = recover from deletion)                                                                                                                               |
| Recover deleted content                                 | Restore        | Retrieve, Undelete                                                                                                                                                            |
| Create a copy                                           | Duplicate      | Copy (Copy = clipboard action)                                                                                                                                                |
| Transfer content from the product to the user's device  | Download       | Export (Export = move data out in a specific format); Save                                                                                                                    |
| Pause temporarily                                       | Pause          | Stop (Stop = permanent halt of a process)                                                                                                                                     |
| Permanently halt a process or feature                   | Stop           | Pause (Pause = temporary suspension); End; Cancel subscription or Unsubscribe for ending paid or free recurring services                                                      |
| Send to another person or app                           | Share          | Export (Export = move to external format); Invite (Invite = grant access to a restricted space)                                                                               |
| Move data out of the product in a specific format       | Export         | Download (Download = retrieve to local device); Share                                                                                                                         |
| Transfer a single file from a device into the product   | Upload         | Import (Import = bulk or format-specific data transfer)                                                                                                                       |
| Bring in external data in bulk or a specific format     | Import         | Upload (Upload = single file transfer); Download                                                                                                                              |

---

## Voice vocabulary

Sentence-level phrasing patterns that support the product's voice attributes.
These apply across surfaces. Voice attributes are defined in `ux-voice-and-tone.md`.

### Preferred openers by surface

| Surface              | Preferred pattern                                                                          | Avoid                                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| Error title          | "[Action] failed" or "[Thing] wasn't [past tense]" — state what the user's action produced | "We're sorry…", "Unfortunately…", "There was a problem with…", "We couldn't [verb]…", "An error occurred…" |
| Empty state headline | "[Noun] will appear here" or "No [noun] yet"                                               | "Nothing to see here", "It's quiet in here"                                                                |
| Confirmation title   | "[Action] [object]?"                                                                       | "Are you sure?", "Confirm action"                                                                          |
| Success message      | "[Past tense action]"                                                                      | "Success!", "Great job!", "Done!" alone                                                                    |
| Tooltip              | "[Verb phrase answering implicit question]"                                                | "This is a…", "Here you can…"                                                                              |
| Onboarding headline  | "[Benefit statement]"                                                                      | "Welcome to [Feature name]", "Get started with…"                                                           |
| Settings label       | "[Outcome]"                                                                                | "Enable [feature]", "Turn on [feature]"                                                                    |

### Second-person conventions

| Situation                         | Use                                          | Avoid                                                     |
| --------------------------------- | -------------------------------------------- | --------------------------------------------------------- |
| Referring to things the user owns | "your [thing]"                               | "the [thing]" (cold), "my [thing]" (confuses perspective) |
| Actions we take on their behalf   | "we"                                         | "the system", "the app", passive voice                    |
| Describing what will happen       | "[Subject] will [action]" — name the subject | "It will…", "This will…" (vague subject)                  |
| Giving instructions               | Imperative — "Select a date"                 | "You should select…", "You can select…"                   |

### Hedging language to remove

These phrases weaken copy. Remove or replace on sight during QA.

| Hedge                                                                      | Problem                                                                                                                              | Fix                                                                                                                                                                                    |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "Try to…"                                                                  | Implies it might not work                                                                                                            | Remove; use the direct verb                                                                                                                                                            |
| "You may want to…"                                                         | Passive, avoids commitment                                                                                                           | Remove; state the recommended action                                                                                                                                                   |
| "In some cases…"                                                           | Vague qualifier                                                                                                                      | State the specific cases or remove                                                                                                                                                     |
| "It is recommended that…"                                                  | Formal, passive                                                                                                                      | State the action directly                                                                                                                                                              |
| "Please note that…"                                                        | Empty opener                                                                                                                         | Remove; lead with the information                                                                                                                                                      |
| "As mentioned above…"                                                      | Reference-dependent                                                                                                                  | Make the copy self-contained                                                                                                                                                           |
| "An unexpected error occurred…"                                            | Vague, system-oriented, passive — a close variant of the forbidden "Something went wrong"                                            | For titles: "[Action] failed". For body when cause is undiagnosable: "We couldn't [verb] [object] right now."                                                                          |
| "An error has occurred"                                                    | Same problem — describes the system state, not the user impact                                                                       | "[Action] failed" for titles; "We couldn't [verb] [object] right now." for body                                                                                                        |
| "There was a problem with…"                                                | Passive opener that buries the failure                                                                                               | "[Action] failed" for titles; "We couldn't [verb] [object] right now." for body                                                                                                        |
| "An issue on our end [verb phrase]" / "Something on our end [verb phrase]" | Circumlocution — a longer, more complex version of "something went wrong on our end"; invents an explanation without providing one   | Do not invent an explanation. If the cause is undiagnosable, use: "We couldn't [verb] [object] right now." — direct, honest, and implies the issue is temporary without overstating it |
| "We were unable to…"                                                       | Verbose and passive                                                                                                                  | For titles: "[Action] failed". For body: "We couldn't [verb] [object] right now."                                                                                                      |
| "We couldn't [verb] [vague object]" as an error title                      | "We couldn't process your request" is still a system-oriented title — it describes the system's limitation, not the user's situation | "[Action] failed" is always preferred for titles — e.g. "Submission failed", "Payment failed", "Changes not saved"                                                                     |

---

## Archived terms

Terms no longer in use. Retained so historical copy can be interpreted correctly.
Do not use these in new copy. Do not delete entries from this section.

<!-- Use this format when adding new items to the Archive:
| Archived term | Replaced by | Date deprecated | Notes |
|---|---|---|---|
| [Old term] | [New canonical term] | [Month YYYY] | [Context — why it changed] |
-->

---

## Changelog

<!-- Use these formats when adding new changelog entried:
| [Month YYYY] | Added [term] to Approved terms | [Brief reason] |
| [Month YYYY] | Moved [term] to Archived terms | [Brief reason] |
| [Month YYYY] | Updated canonical form of [term] from [old] to [new] | [Brief reason] |
-->

| Date       | Change            | Reason                                  |
| ---------- | ----------------- | --------------------------------------- |
| April 2026 | Created this file | To be used with the SKILL.md skill file |

---
name: vgds-ux-voice-and-tone
parent: vgds-ux-writing
metadata:
  version: "2.0"
  package: "@volvo/vcdk-ai-kit"
  category: foundation
  repository: "VolvoGroup-Internal/volvo-group-design-system"
  branch: "main"
description: Voice definition, tone adaptation, brand consistency audits, and copy reviews for any surface.
---

## Scope

**Covers:**

- Applying pre-defined voice attributes to produce new copy (Write mode)
- Auditing existing copy against pre-defined voice attributes (Audit mode)
- Tone adaptation by audience emotional context and surface
- Before/after rewrites grounded in existing copy, not invented from scratch
- Compliance confirmation for copy that meets all voice standards

**Does not cover:**

- Defining or changing voice attributes — voice is pre-authored in this skill by the UX team and is not editable by end users (→ ux-voice-and-tone.md ### Defined voice attributes)
- Surface-specific copy where no voice or tone question is involved (→ the relevant surface sub-skill)
- Enforcing component character limits — defer to the target component's sub-skill for limits

**Boundary note:**
If the request involves voice alignment, tone checking, or brand consistency for any surface, this is the right sub-skill. If the user wants component copy with no voice or tone question, route to the relevant surface sub-skill instead.

---

## Context checklist

Items marked (R) are required before writing. Items marked (O) improve quality but have a usable default.

| #   | Context item                              | Why it matters                                                                                        | Default if not provided                                         |
| --- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| 1   | Task type (R)                             | Write mode (new copy needed) or Audit mode (existing copy to review) — determines the entire workflow | Infer from request: pasted copy = Audit, described need = Write |
| 2   | Surface or component (R in Write mode)    | Tone register shifts by surface — error states differ from onboarding                                 | Infer from request if possible                                  |
| 3   | Existing copy to review (R in Audit mode) | The copy must be provided verbatim — don't audit from a description                                   | —                                                               |
| 4   | Audience emotional context (O)            | Tone adapts to how the user is likely feeling at this moment                                          | Neutral, curious, stressed, confused, task-focused              |

If required items are missing, ask for them as part of the master skill's context question.
Do not ask for required items separately from the master skill's shared question block.

---

## Rules and constraints

### Defined voice attributes

<!-- This section is authored by the UX team and shouldn't be edited by end users.
     It defines the voice this skill applies in Write mode and audits against in Audit mode.
     Do not modify without a formal voice review. -->

- **Trustworthy:** Write copy that serves the reader's decision-making, not the brand's need to appear impressive.
  Use data as evidence that helps users understand or act — not as a demonstration of scale. Every number must answer
  a question the reader is actually asking. Never stack facts to impress.
  - ✅ Do: "Our parts network covers 190 markets, so a local dealer can get your truck back on the road within 24 hours."
  - ❌ Don't: "Three million vehicles on the road. 105,000 people behind them. 14 brands. 190 markets. Numbers that speak for themselves."

- **Approachable:** Write in plain language with second-person address.
  Acknowledge who the reader is and what they are trying to do. Never use industry jargon without explanation. Warmth belongs in body copy, not just headlines — a warm headline over a cold paragraph does not meet this attribute.
  - ✅ Do: "Whether you run 3 trucks or 300, our financing options are built around your cash flow, not ours."
  - ❌ Don't: "As a captive financial services provider, we offer integrated solutions across the full commercial transport lifecycle."

- **Intelligent:** Every sentence must earn its place.
  Choose specific over generic — copy should reflect the precision of Volvo's engineering. If a phrase could appear unchanged in a competitor's brochure, rewrite it. Common signals to rewrite: 'wide range', 'complete solutions', 'total offering', 'operational efficiency', 'business goals', 'seamless', 'holistic approach'.
  - ✅ Do: "The Volvo FH uses up to 10% less fuel than its predecessor - measurable savings that compound across a full fleet."
  - ❌ Don't: "Our comprehensive product and service portfolio is designed to help businesses of all sizes reach their operational goals more efficiently."

- **Positive:** Lead with concrete outcomes the reader can picture, not superlatives or leadership claims.
  Quiet confidence is built from specificity, not declaration. Show what Volvo enables the user to do — never boast, never
  oversell. The facts carry the optimism.
  - ✅ Do: "Every day, Volvo engines help deliver the goods that stock shelves, build roads, and keep cities moving."
  - ❌ Don't: "As proud leaders in sustainable transport, we are committed to shaping a better world through industry-leading innovation and next-generation technology."

### Tone by context

<!-- Maps the user's emotional context to a tone register. Applied in Write mode. -->

| Audience emotional context                | Tone register               | Key adjustments                                                 |
| ----------------------------------------- | --------------------------- | --------------------------------------------------------------- |
| Frustrated (error, failure, blocker)      | Calm, solution-focused      | Lead with the fix; acknowledge the state without dwelling on it |
| Confused (first use, unfamiliar feature)  | Patient, welcoming, helpful | Add context; avoid assumed knowledge                            |
| Confident (routine task, return user)     | Efficient, direct           | Minimal explanation; quick confirmation                         |
| Cautious (high-stakes action, data loss)  | Trustworthy, transparent    | Name consequences clearly; no pressure                          |
| Successful (task completed, goal reached) | Warm, proportional          | Brief positive confirmation; not effusive                       |

### Structure rules

- Identify the task type before doing anything else: Write mode or Audit mode
- In Write mode: apply the defined voice attributes to produce copy; do not ask the user to define or choose voice direction
- In Audit mode: evaluate provided copy against each defined voice attribute; produce a finding for every attribute that is violated
- Never invent voice attributes — use only those defined in ### Defined voice attributes below
- Never ask the user what voice they want — the voice is pre-defined in this skill
- Audit findings must always follow this order: attribute → surface → issue → rewrite
- Rewrites in Audit mode must be drawn from the existing copy — do not invent new copy from scratch
- In Write mode, append a one-line voice note to the output naming which attribute governs the key decisions made

### Write mode workflow:

1.  Identify the surface and component type from the request
2.  Identify the audience's likely emotional context
3.  Select the applicable tone register from ### Tone by context below
4.  Write copy applying all defined voice attributes at the appropriate register
5.  Append voice note: "Voice applied: [attribute] — [one sentence on the governing decision]"

### Audit mode workflow:

1.  Read the provided copy in full before evaluating
2.  Evaluate against each defined voice attribute in turn
3.  Produce one finding per violation — do not combine multiple violations into one finding
4.  Partial compliance is a violation — if an attribute is partly met and partly not, produce a finding for the failing part. Do not log it as compliant-with-a-note in the compliant block.
5.  For each finding: name the attribute, describe the issue, quote the specific copy, provide a rewrite
6.  If no violations are found, confirm compliance explicitly — do not return an empty response

### Tone rules

- In Write mode: tone is warm, direct, and purposeful — the skill produces copy, not commentary about copy
- In Audit mode: analytical and specific — cite evidence from the copy, not general impressions
- In Audit mode: constructive in rewrites — name the problem first, then model the fix
- Never describe a voice attribute without showing it — every claim needs a copy example
- Never use vague direction ("make it warmer", "be more human") — name the attribute and show the change

### Forbidden patterns

| Asking the user to define or choose their voice | Voice is pre-defined in this skill — users should not be prompted for voice direction | Apply the defined attributes directly | All |
| "Sound more friendly" or similar vague direction | Describes an impression, not an actionable change | Name the specific attribute being violated and show a rewrite | Audit mode |
| Invented rewrites with no grounding in the existing copy | Rewrites must revise what's there, not replace it wholesale | Work from the existing copy — change what violates the attribute, preserve what doesn't | Audit mode |
| Evaluating copy without quoting it | Claims without evidence are not auditable | Always quote the specific copy that violates an attribute | Audit mode |
| Skipping compliant attributes in an audit | Silence reads as oversight, not confirmation | Explicitly confirm any attribute that passes | Audit mode |
| Producing copy that contradicts a defined attribute without flagging it | Silent non-compliance erodes trust in the skill | Flag the conflict and explain the trade-off | Write mode |

### Required elements

Required elements differ by task type.

### Required elements in Write mode:

| Copy output | Always | Matches character limits of the target component — defer to that component's sub-skill for limits |
| Voice note | Always | One line: "Voice applied: [attribute] — [governing decision]" |

### Required elements in Audit mode:

| Finding per violation | One per attribute violated | — |
| Attribute named | Always, per finding | — |
| Quoted copy | Always, per finding | Verbatim from the input |
| Issue description | Always, per finding | One sentence: what the copy does that violates the attribute |
| Rewrite | Always, per finding | Revised version grounded in the existing copy |
| Compliance confirmation | Always, per passing attribute | One line: "[Attribute]: compliant" |

---

## Templates

### Write mode output

```yaml
copy:
  surface: "<component or surface type>"
  audience_context: "<emotional state of the user at this moment>"
  tone_register: "<which register was applied — see Tone by context>"
  output: "<the copy, formatted for the target component>"
  voice_note: "Voice applied: <attribute> — <one sentence on the governing decision>"
```

### Audit mode output

```yaml
audit:
  surface: "<page or component audited>"
  findings:
    - attribute: "<which defined voice attribute is violated>"
      issue: "<what the copy does that violates it — one sentence>"
      current_copy: "<verbatim quote from the input>"
      rewrite: "<revised segment or sentence>"
      rewrite_note: "<drop-in segment or standalone sentence — one sentence explaining the structural decision, optional if obvious>"
    - attribute: "<next violation, if any — repeat structure above>"
  compliant:
    - "<Attribute>: compliant — <one sentence confirming why>"
    # Note: partial compliance is not logged here — it is a violation and belongs in findings with a rewrite.
  full_rewrite: <complete revised version of the audited copy, ready to copy-paste>
```

Notes on the audit template:

- findings: one entry per attribute violated — never combine two violations; partial compliance is a violation and must appear here, not in the compliant block
- rewrite_note: required when the rewrite changes sentence structure;
  optional when it is a direct drop-in replacement
- compliant: always complete — never leave a passing attribute unconfirmed;
  only use "compliant" when the attribute is fully met — partial compliance belongs in findings
- full_rewrite: always present — this is the primary deliverable for the user

---

## Rubric

Run before returning output. If any Fail condition is true, revise first.

- [ ] Task type (Write or Audit) was identified before any output was produced
- [ ] Only defined voice attributes were applied — no invented or user-supplied attributes
- [ ] Write mode: output includes a voice note naming the governing attribute
- [ ] Write mode: copy applies all defined attributes at the appropriate tone register for the surface
- [ ] Audit mode: every violation has a named attribute, quoted copy, issue description, and rewrite
- [ ] Audit mode: partial compliance is treated as a violation — it appears in findings with a rewrite, never in the compliant block as a note
- [ ] Audit mode: every passing attribute is explicitly confirmed — no silent omissions
- [ ] Audit mode: rewrites are grounded in the existing copy, not invented from scratch
- [ ] No vague directional language used ("warmer", "more human") without a specific copy example
- [ ] Passes all shared quality standards from master skill

---

## Examples

### Example 1 — Audit mode: 'intelligent' and 'trustworthy' violation

**Input:**

- Mode: Audit
- Surface: Products & Services page — section intro
- Existing copy: "Volvo Group offers a wide range of products and services designed to provide complete solutions for all your transport and infrastructure needs, helping businesses of all sizes achieve their goals efficiently and sustainably."

**Output:**

```yaml
audit:
  surface: "Products & Services page — section intro"
  findings:
    - attribute: "Intelligent"
      issue: "The product description is entirely generic. 'Wide range of products and services' and 'complete solutions for all your needs' name nothing specific — any industrial company could use this copy unchanged."
      current_copy: "a wide range of products and services designed to provide complete solutions for all your transport and infrastructure needs"
      rewrite: "trucks, buses, construction equipment, and marine and industrial engines"
      rewrite_note: "Drop-in segment — replaces the quoted copy directly after 'Volvo Group offers'"
    - attribute: "Trustworthy"
      issue: "The closing clause makes no specific claim the reader can verify or act on. It describes an intent, not an offer."
      current_copy: "helping businesses of all sizes achieve their goals efficiently and sustainably."
      rewrite: "We back every product with financing and service coverage across 190 markets."
      rewrite_note: "Standalone sentence — restructured from a dependent clause into a second sentence for clarity and readability"
  compliant:
    - "Approachable: compliant — second-person address is present"
    - "Positive: compliant — tone is confident without boasting"
  full_rewrite: Volvo Group offers trucks, buses, construction equipment, and marine and industrial engines. We back every product with financing and service coverage across 190 markets.
```

**Why this works:** The segment rewrite for Intelligent drops in exactly where the quoted copy was — the grammar of the original sentence is preserved. The Trustworthy rewrite restructures the trailing dependent clause into a second
sentence, which is flagged explicitly with a rewrite_note so the user understands the change isn't an error. The full_rewrite shows both changes combined into a copy-paste ready version that is shorter, more specific, and
easier to read than the original.

---

### Example 2 — Audit mode: 'approachable' and 'positive' violation

**Input:**

- Mode: Audit
- Surface: About Us page — opening paragraph
- Existing copy: "The Volvo Group stands as a proud global leader in sustainable transport and infrastructure solutions, with a legacy spanning nearly a century of innovation and a commitment to shaping the future of mobility for generations to come."

**Output:**

```yaml
audit:
  surface: "About Us page — opening paragraph"
  findings:
    - attribute: "Approachable"
      issue: "The main clause is entirely self-referential. There is no second-person address and no acknowledgment of the reader. 'Proud global leader' signals institutional posture rather than removing it."
      current_copy: "The Volvo Group stands as a proud global leader in sustainable transport and infrastructure solutions"
      rewrite: "Since 1927, Volvo has built the vehicles, engines, and services that keep your operations running."
      rewrite_note: "Standalone sentence — replaces the main clause. Reader ('your') is introduced; heritage is retained as context, not as a credential."
    - attribute: "Positive"
      issue: "'A commitment to shaping the future of mobility' is aspiration without evidence. Quiet confidence requires concrete outcomes, not declarations of intent."
      current_copy: "a commitment to shaping the future of mobility for generations to come"
      rewrite: "Today that means trucks carrying your cargo, equipment building roads, and engines powering vessels across 190 markets."
      rewrite_note: "Standalone sentence — replaces the final clause. Abstract aspiration is replaced with three specific, present-tense outcomes."
    - attribute: "Intelligent"
      issue: "The specificity gap identified under Positive also weakens this attribute — 'legacy spanning nearly a century of innovation' names a duration, not an output. Heritage framing without grounding in what was actually built fails the precision standard."
      current_copy: "with a legacy spanning nearly a century of innovation"
      rewrite: "Since 1927, Volvo has built the vehicles, engines, and services that keep your operations running."
      rewrite_note: "Shared rewrite with Approachable finding — the same sentence resolves both violations. 'Since 1927' grounds the heritage claim in a fact; 'built' names a concrete activity; the list that follows names specific outputs."
  compliant:
    - "Trustworthy: compliant — no false or misleading claims present"
  full_rewrite: Since 1927, Volvo has built the vehicles, engines, and services that keep your operations running. Today that means trucks carrying your cargo, equipment building roads, and engines powering vessels across 190 markets.
```

**Why this works:** All three findings produce a rewrite — including Intelligent, which was previously logged as a partial compliance note. The Intelligent rewrite_note flags that it shares a solution with the Approachable finding, which keeps the full_rewrite clean without hiding the reasoning. The compliant block is now unambiguous: only Trustworthy fully passes. This models the correct behavior — partial compliance is a violation with a rewrite, not a caveat on a passing grade.

---

### Example 3 — Write mode: error message with progressive escalation

**Input:**

- Mode: Write
- Surface: Modal error — Fleet Management portal
- Audience context: Frustrated — a scheduled service report failed to generate
- Request: Write the error message, including a fallback version shown after 2–3 failed retries

**Output:**

```yaml
copy:
  surface: "Modal — fleet management portal"
  audience_context: "Frustrated — task failed, likely time-sensitive"
  tone_register: "Calm, solution-focused"
  output:
    first_state:
      shown: "On attempts 1–3"
      title: "Service report incomplete"
      body: "We're missing some vehicle data. Check that all your fleet vehicles are connected and try again."
      action: "Try again"
    fallback_state:
      shown: "After attempt 3"
      title: "Service report incomplete"
      body: "We're still missing some vehicle data. Please contact our Fleet Support team for assistance."
      action: "Contact Fleet Support"
  voice_note:
    "Voice applied: Trustworthy — 'We're missing some vehicle data' states the specific gap honestly without framing Volvo as having failed.
    Positive — 'incomplete' describes a recoverable state rather than declaring failure.
    Intelligent — conditional logic ('if the issue continues') is handled through timed message states, not longer copy. 'Still missing' in the fallback acknowledges prior attempts without blame."
```

**Why this works:** The title "Service report incomplete" describes a state, not a failure — this is the Positive attribute applied to error copy. The body names exactly what is missing ("some vehicle data") and exactly what to check,
with no conditional logic in the copy itself. Progressive escalation separates the two recovery paths into timed states: the user is not burdened with "if this doesn't work" language during an already frustrating moment. The fallback
uses "still" to acknowledge the user's repeated attempts — empathetic without apologizing. "Fleet Support" is capitalised as a proper noun throughout.

---

### Example 4 — Write mode: empty state

**Input:**

- Mode: Write
- Surface: First-run empty state — Sustainability dashboard, Volvo Group customer portal
- Audience context: Neutral, exploratory — tool just set up, nothing loaded yet
- Request: Write the empty state copy

**Output:**

```yaml
copy:
  surface: "Empty state — sustainability dashboard, first run"
  audience_context: "Neutral, exploratory — no frustration, mild curiosity"
  tone_register: "Patient, explanatory"
  output:
    headline: "Your emissions data will appear here"
    body: "Connect your fleet to start tracking CO₂ output, fuel use, and sustainability targets across all your vehicles."
    cta: "Connect your fleet"
  voice_note:
    "Voice applied: Approachable — plain language, second-person throughout, no jargon.
    Intelligent — the body names three specific things the dashboard tracks (CO₂ output, fuel use, sustainability targets) rather than a generic benefit claim.
    Positive — the headline is forward-looking without promising more than the tool delivers."
```

**Why this works:** The headline tells the user what the space is for rather than just confirming it is empty. The CTA names the action precisely — "Connect your fleet" is specific about what happens next, not a generic "Get started".
No attribute is applied at the expense of another: Intelligent specificity ("CO₂ output, fuel use, sustainability targets") and Approachable plainness ("across all your vehicles") sit in the same sentence without tension.

---

### Example 5 — Edge case: vague directional request

**Input:**

- Mode: Write (inferred)
- Surface: Homepage — financial services section
- Existing copy: "Volvo Financial Services delivers tailored financial solutions to support your business objectives."
- Request: "Can you make this copy sound more human and approachable?"

**Output:**

```yaml
copy:
  surface: "Homepage — financial services section"
  audience_context: "Neutral — exploring financing options"
  tone_register: "Confident, direct"
  output: "Volvo Financial Services works with you to find a payment plan that fits your fleet size, cash flow, and growth plans — so you can invest in the vehicles you need without tying up capital."
  voice_note: "Voice applied: Approachable — 'works with you', second-person throughout, plain language replacing 'tailored financial solutions' and 'business objectives'. Intelligent — specific about what the plan accounts for (fleet size, cash flow, growth plans) rather than restating the generic benefit."
```

**Routing note:** The request contains vague directional language ("more human and approachable"). The skill does not act on "more human" as a voice attribute — it maps the request to the closest defined attributes (Approachable, Intelligent) and applies those. No direction outside the defined attributes is introduced.

**Common mistake this avoids:** Treating "more human" as license to add warmth or informality beyond what the defined attributes permit — producing copy inconsistent with Volvo Group's register. Anchoring entirely to defined
attributes keeps output consistent regardless of how the request is framed.

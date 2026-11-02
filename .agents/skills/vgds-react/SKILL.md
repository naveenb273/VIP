---
name: vgds-react
description: Use this skill whenever you need to integrate VGDS web components with React 18+ or React 19+. This includes creating React components, handling events, managing state, working with TypeScript types, implementing hooks, using wrappers from @volvo/vcdk-react, mapping properties and events, slot composition, form controls, controlled components, ref access, and troubleshooting React-specific integration issues.
metadata:
  version: "2.0"
  package: "@volvo/vcdk-react"
  category: frameworks
  repository: "VolvoGroup-Internal/volvo-group-design-system"
  branch: "main"
compatibility:
  react:
    - "18+"
    - "19+"
---

# React Integration

**Package:** `@volvo/vcdk-react` (React 18+/19+)  
**Core Dependency:** `@volvo/vcdk`

## Source File Reading Protocol

**CRITICAL:** Prefer retrieval-led reasoning over pre-training-led reasoning for all VGDS React work.

Before suggesting any React component usage:

1. Read core component source to extract API (properties, events, slots)
2. Read React wrapper to map to React props and event handlers
3. Reference example implementations for integration patterns

**Never assume React APIs.** Wrappers map core component APIs to React, and these mappings must be read from source.

## File Locations

**Core Component:** `packages/vcdk/src/web-components/{component}/{component}.component.ts`  
**React Wrapper:** `packages/vcdk-react/src/components/{Component}.ts`  
**Examples:** `packages/example-react/src/components/{ComponentName}/`

**Naming conventions:**

- `{component}` = kebab-case (e.g., `text-field`)
- `{Component}` = PascalCase wrapper (e.g., `TextField`)
- `{ComponentName}` = PascalCase example directory (may differ slightly)

## API Discovery Workflow

**Component-Wrapper-Example pattern is MANDATORY.** Never suggest React usage without reading all three sources.

### Step 1: Read Core Component

`packages/vcdk/src/web-components/{component}/{component}.component.ts`

- Extract: @property decorators (props), @fires tags (events), @slot tags
- Note: Public methods, TypeScript types

### Step 2: Read React Wrapper

`packages/vcdk-react/src/components/{Component}.ts`

- Find `events` object in `createComponent()` if present → event handler names
- Map properties to React props
- Example: `onToggle: AccordionToggleEvent.eventName` → `<Accordion onToggle={handler} />`
- Note: Components without events have no `events` object

### Step 3: Reference Example

`packages/example-react/src/components/{ComponentName}/`

- Observe: Complete usage with hooks, state management, patterns

## Critical Constraints

**Never:**

- ❌ Import from barrel file (`@volvo/vcdk-react`) - Breaks tree-shaking
- ❌ Assume event handler names - Read wrapper's `events` object
- ❌ Access shadow DOM directly - Use declarative props/events only
- ❌ Guess slot names - Read component source for @slot tags

**Always:**

- ✅ Direct imports (`@volvo/vcdk-react/Button`) - Optimal bundle size
- ✅ Read wrapper source for event mappings - Ensures accuracy
- ✅ Use props, events, slots - Web component contract
- ✅ Reference example implementations - Real-world patterns

**Reason:** Wrappers are proxies. APIs defined in `@volvo/vcdk`, wrappers expose them with React ergonomics.

## Example Directory

**Location:** `packages/example-react/src/components/`

**Available:** AppBarTop|Avatar|Banner|Breadcrumbs|Button|Card|Checkbox|Charts|DataGrid|DatePicker|Dropdown|Drawer|FileUploader|Footer|Header|Hero|InlineMessage|Link|Modal|Pagination|ProgressBar|RadioButton|SearchField|SideMenu|Slider|Snackbar|Spinner|Switch|Table|TextField|Tooltip|and more

**Pattern:** Each directory contains usage variations, event handling, state management, edge cases

## TypeScript Types

Wrappers export namespaces for type safety:

```tsx
import { Accordion } from "@volvo/vcdk-react/Accordion";

const ref = React.useRef<Accordion.Element>(null);
const handler = (e: Accordion.ToggleEvent) => console.log(e.detail);
```

**Pattern:** `{Component}.Element` for refs, `{Component}.{Event}Event` for handlers

## Usage Patterns

**Code Splitting:**

```tsx
const Accordion = lazy(() =>
  import("@volvo/vcdk-react/Accordion").then((m) => ({ default: m.Accordion })),
);
```

**Event Handlers:** React 19+ auto-memoizes, use `useCallback` only for non-React children

**Ref Access:** Verify methods exist in component source before calling

```tsx
const modalRef = useRef<Modal.Element>(null);
modalRef.current?.show(); // Read component source for available methods
```

## Common Patterns & Pitfalls

**Event detail access:** `event.detail.value` (not `event.value`)  
**Controlled sync:** Use events to sync state (`onChange={(e) => setValue(e.detail.value)}`)  
**Boolean props:** `<Button disabled>` or `disabled={true}` (not string `"true"`)  
**Slot usage:** `<Component><span slot="name">Content</span></Component>`

## Testing & Debugging

**Testing:** Use `@testing-library/react` with standard patterns. Mock event handlers with `vi.fn()` or `jest.fn()`

**Event debugging:**

1. Read `packages/vcdk-react/src/components/{Component}.ts`
2. Verify `events` object registration matches your handler prop

**Shadow DOM:** DevTools → Enable "Show user agent shadow DOM"

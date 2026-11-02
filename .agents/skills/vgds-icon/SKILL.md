---
name: vgds-icon
description: Use this skill whenever you need to work with VGDS system icons. This includes vcdk-system-icon component, SystemIconId types, icon variants (lined/filled), CDN delivery, SVG icons, icon sizing, accessibility, element-title, aria labels, icon categories, ISO-compliant icons, and finding the right icon for UI elements.
metadata:
  version: "2.0"
  package: "@volvo/vcdk-assets"
  element: "vcdk-system-icon"
  category: foundation
  repository: "VolvoGroup-Internal/volvo-group-design-system"
  branch: "main"
---

# Icons

**Package:** `@volvo/vcdk-assets` (System icons + CDN utilities)

## Source File Reading Protocol

**Before using icons, validate IDs against the source:**

1. **Icon ID Type** → `packages/vcdk-assets/src/system-icon.ts` (SystemIconId union type)
2. **Component Implementation** → `packages/vcdk/src/web-components/system-icon/system-icon.component.ts`

**NEVER invent icon IDs. ALWAYS validate against SystemIconId type.**

## Overview

**Available:** 2000+ ISO-compliant + brand-approved icons | **Variants:** Lined (default) + Filled | **Brands:** Volvo, Mack, Renault Trucks | **Delivery:** CDN (versioned, globally distributed) | **Format:** SVG

**Categories:** UI (add, close, menu, settings) | Navigation (arrows, directions) | Powertrain (battery, charging, voltage) | Interior (seat, temperature, air) | Safety (alert, caution, danger) | Communication (signal, connectivity, notification) | Vehicle systems (brake, suspension, transmission)

## Component Usage

**Web Component:**

```html
<vcdk-system-icon icon="add"></vcdk-system-icon>
<vcdk-system-icon icon="close" size="24"></vcdk-system-icon>
<vcdk-system-icon icon="settings" filled></vcdk-system-icon>
<vcdk-system-icon icon="menu" element-title="Open menu"></vcdk-system-icon>
```

**React:**

```tsx
import { SystemIcon } from '@volvo/vcdk-react/system-icon';
<SystemIcon icon="add" />
<SystemIcon icon="close" size={24} />
<SystemIcon icon="settings" filled />
<SystemIcon icon="menu" elementTitle="Open menu" />
```

**Angular:**

```html
<ngx-vcdk-system-icon icon="add"></ngx-vcdk-system-icon>
<ngx-vcdk-system-icon icon="close" [size]="24"></ngx-vcdk-system-icon>
<ngx-vcdk-system-icon icon="settings" [filled]="true"></ngx-vcdk-system-icon>
<ngx-vcdk-system-icon
  icon="menu"
  element-title="Open menu"></ngx-vcdk-system-icon>
```

## Properties

**Read from:** `packages/vcdk/src/web-components/system-icon/system-icon.component.ts`

**Core:** `icon` (required, SystemIconId) | `size` (number in pixels, default: 16) | `filled` (boolean, default: false)

**Accessibility:** `element-title` (tooltip/title) | `element-aria-labelledby` (reference to label) | `element-aria-describedby` (reference to description)

## Finding Icons

**Validate IDs:**

```typescript
import type { SystemIconId } from "@volvo/vcdk-assets/system-icon";
import { systemIconIds } from "@volvo/vcdk-assets/system-icon";

const exists = systemIconIds.includes("add"); // Validate icon ID
```

**Common:** Actions (add, close, delete, edit, save, cancel) | Navigation (arrow-left, arrow-right, arrow-up, arrow-down, menu, home) | UI (settings, search, filter, more, info, help) | Status (check, error, warning, success) | Media (play, pause, stop, volume)

## Integrity Constraints

**Use the Component:** Icons served by component from CDN. Individual SVG files NOT included in package.

✅ Component:

```tsx
import { SystemIcon } from "@volvo/vcdk-react/system-icon";
<SystemIcon icon="add" />;
```

🚫 SVG import (does not exist):

```tsx
import AddIcon from "@volvo/vcdk-assets/icons/add.svg"; // Does not exist
<img src={AddIcon} />;
```

**Validate IDs:** Verify icon IDs exist in SystemIconId type before using. Read `packages/vcdk-assets/src/system-icon.ts`.

✅ Valid: `<vcdk-system-icon icon="add">` | 🚫 Invalid: `<vcdk-system-icon icon="add-item">` (not in type) | 🚫 Custom: `<vcdk-system-icon icon="my-custom">` (not supported)

**How It Works:** Icons loaded from CDN at runtime by component. Package doesn't bundle SVGs. **Result:** Smaller bundles, independent icon updates, component handles loading.

## Advanced

**Programmatic URLs:**

```typescript
import { systemIconUrl } from "@volvo/vcdk-assets/url";
const url = systemIconUrl({ icon: "add", brand: "volvo", variant: "lined" });
```

## Cross-References

**Component APIs:** `packages/vcdk/AGENTS.md`, `packages/vcdk-react/AGENTS.md`, `packages/vcdk-angular/AGENTS.md` | **Assets:** `packages/vcdk-assets/AGENTS.md` | **Storybook:** Icon explorer + search

## Refusals

**Custom icons / SVG file imports / Icon modification:** Not supported. Use SystemIconId values, component handles all loading, appearance controlled by `size` and `filled` only.

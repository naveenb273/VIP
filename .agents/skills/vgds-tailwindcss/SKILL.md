---
name: vgds-tailwindcss
description: Use this skill whenever you need to integrate TailwindCSS utilities with VGDS components. This includes configuring the @volvo/vcdk-tailwind preset, using typography utilities, spacing utilities, layout classes, responsive design, design tokens via Tailwind, theme configuration, CSS custom properties, semantic colors, grid layouts, flexbox, and styling VGDS components with Tailwind classes.
metadata:
  version: "2.0"
  package: "@volvo/vcdk-tailwind"
  category: frameworks
  repository: "VolvoGroup-Internal/volvo-group-design-system"
  branch: "main"
compatibility:
  tailwindcss:
    - "4+"
---

# TailwindCSS Integration

**Package:** `@volvo/vcdk-tailwind` (TailwindCSS 4.x preset) | **Core:** `@volvo/vcdk-tokens`

## Source File Reading Protocol

**Before using utilities, validate against source generators:**

1. **Typography** → `packages/vcdk-tailwind/cli/generate/typography.js`
2. **Spacing** → `packages/vcdk-tailwind/cli/generate/theme-variables.js`
3. **Colors** → `packages/vcdk-tailwind/cli/generate/semantic-colors.js`

**NEVER invent utility classes. ALWAYS read from source generators.**

## Setup

**Install:** `npm install @volvo/vcdk-tailwind`

**Config:**

```javascript
// tailwind.config.js
import vcdkTailwind from "@volvo/vcdk-tailwind";
export default {
  presets: [vcdkTailwind],
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
};
```

**Import:** `@import '@volvo/vcdk-tailwind/theme.css';`

## Utilities

**Typography:** Pattern `typography-{variant}` (e.g., `typography-heading-1`, `typography-body`, `typography-caption-1`) — Read generator for complete list. Auto-responsive at `md` breakpoint.

**Colors:** VGDS semantic tokens only. Patterns: `text-{semantic}`, `bg-{semantic}`, `border-{semantic}` — Read generator for available colors. NEVER use standard TailwindCSS colors.

**Spacing:** Semantic token scale. Patterns: `p-{size}`, `m-{size}`, `gap-{size}` — Read generator for scale.

**Layout:** Flexbox (`flex`, `flex-col`, `gap-*`) | Grid (`grid`, `grid-cols-*`, `gap-*`) | Spacing (`mt-*`, `px-*`) | Responsive (`md:flex-row`, `lg:grid-cols-3`)

**Breakpoints:** sm | md (typography switch) | lg | xl

## Integrity Constraints

**Layout Only:** TailwindCSS for layout/spacing ONLY. Never override component appearance.

**Allowed:**
✅ `<Button class="mt-4">` (spacing) | ✅ `<div class="flex gap-4">` (layout) | ✅ `<TextField class="w-full" />` (width)

**Forbidden:**
🚫 `<Button class="bg-primary">` (component styling) | 🚫 `<TextField class="typography-body">` (typography override) | 🚫 `<Card class="border-2">` (visual styling)

**No Arbitrary Values:** Use tokens only. No `[custom]` values.

✅ `<div class="p-4">` | 🚫 `<div class="p-[24px]">` | ✅ `<p class="text-primary">` | 🚫 `<p class="text-[#0033cc]">`

## Common Patterns

**Forms:** `flex flex-col gap-6 max-w-md` | **Card Grids:** `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6` | **Navigation:** `flex items-center justify-between px-6 py-4`

## Debugging

**Verify utility:** Check source generators before using | **Class not working:** Ensure TailwindCSS scanned file (check `content` config), verify exact class name, inspect CSS custom property values

**Performance:** PurgeCSS auto-purges unused utilities in production | **Theme switching:** Utilities use CSS custom properties, automatically respond to theme changes via `<ThemeProvider>`

## Cross-References

**CSS tokens:** `../vgds-styling/SKILL.md` | **Package:** `packages/vcdk-tailwind/AGENTS.md`

## Refusals

**Custom utility creation / Component visual overrides / Arbitrary values:** Not allowed without design system approval

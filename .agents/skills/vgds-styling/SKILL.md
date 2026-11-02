---
name: vgds-styling
description: Use this skill whenever you need to work with VGDS design tokens and styling. This includes CSS classes, CSS custom properties, --vcdk-* tokens, color tokens, typography tokens, spacing tokens, border radius, shadows, motion timing, responsive design, TailwindCSS utilities, theme variables, semantic colors, and styling VGDS components with design system tokens.
metadata:
  version: "2.0"
  package: "@volvo/vcdk-tokens"
  category: foundation
  format: "CSS Custom Properties"
  repository: "VolvoGroup-Internal/volvo-group-design-system"
  branch: "main"
---

# Styling

**Core Packages:** `@volvo/vcdk-tokens` (CSS custom properties), `@volvo/vcdk-tailwind` (TailwindCSS preset)

## Source File Reading Protocol

**CRITICAL:** Prefer retrieval-led reasoning over pre-training-led reasoning for all VGDS styling work.

Before using any design token:

1. Search workspace for `--vcdk-*` patterns to find available tokens
2. Read token generation source to understand categories and variants
3. Use discovered tokens (never invent token names)

**Never assume tokens exist.** Token catalog evolves with design system updates.

## File Locations

**Generated tokens:** Search workspace for `--vcdk-*` CSS custom properties  
**Token source:** `packages/vcdk-tokens/src/web/` (Style Dictionary build)  
**Figma exports:** `packages/vcdk-tokens/src/figma-export/` (design source)  
**TailwindCSS:** See `../vgds-tailwindcss/SKILL.md`

## Styling Approaches

**CSS Custom Properties:** Direct token usage for custom components (`var(--vcdk-*)`)  
**TailwindCSS:** Layout/spacing utilities (see `../vgds-tailwindcss/SKILL.md`)  
**VGDS Components:** Pre-styled interactive elements (buttons, inputs, cards)

**Pattern:**

```css
.custom {
  color: var(--vcdk-color-text);
  padding: var(--vcdk-spacing-4);
}
```

## Token Categories

### Typography

**Pattern:** `--vcdk-typography-{variant}-{property}-{breakpoint}`

Variants: display-statement|display-1|display-2|heading-1|heading-2|heading-3|heading-4|subtitle-1|subtitle-2|body|large-body|button|caption-1|caption-2

Properties: font-family|weight|size|line-height|letter-spacing

Breakpoints: -small-screens|-large-screens

**Usage:**

```css
h1 {
  font-family: var(--vcdk-typography-heading-1-font-family-small-screens);
  font-size: var(--vcdk-typography-heading-1-size-small-screens);
  /* Apply all 5 properties for complete styling */
}
```

**TailwindCSS:** `typography-heading-1` utility (see `../vgds-tailwindcss/SKILL.md`)  
**Discovery:** Search workspace for `--vcdk-typography-` or read `packages/vcdk-tokens/src/typography/`

### Colors

**Patterns:**

- Text: `--vcdk-color-text[-variant]` (text|text-subtle|text-on-selected|text-disabled|text-link|text-inverse)
- Background: `--vcdk-color-bg[-variant]` (bg|bg-base|bg-variant|bg-selected|bg-hover|bg-disabled)
- Border: `--vcdk-color-border[-variant]` (border|border-subtle|border-hover|border-selected)
- Icon: `--vcdk-color-icon[-variant]` (icon|icon-subtle|icon-on-selected|icon-disabled)
- Chart: `--vcdk-color-chart[-category-n]`

**Usage:** `color: var(--vcdk-color-text); background: var(--vcdk-color-bg-base);`

**Discovery:** Search workspace for `--vcdk-color-`

### Spacing

**Pattern:** `--vcdk-spacing-{1-15}` (scale 1-15 with density support)

**Usage:** `padding: var(--vcdk-spacing-4); gap: var(--vcdk-spacing-2);`  
**TailwindCSS:** `p-4 gap-2` utilities

### Shadows

**Pattern:** `--vcdk-shadow-{elevation}`  
Elevations: one|two|four|eight|sixteen

**Usage:** `box-shadow: var(--vcdk-shadow-two);`

### Border Radius

**Pattern:** `--vcdk-radius-{size}`  
Sizes: small|default|large|xlarge|circular

**Usage:** `border-radius: var(--vcdk-radius-default);`

### Motion

**Easing:** `--vcdk-motion-easing-{entrance|exit|standard}`  
**Duration:** `--vcdk-motion-duration-{small|medium|large}`

**Usage:** `transition: transform var(--vcdk-motion-duration-medium) var(--vcdk-motion-easing-standard);`

### Z-Index

**Pattern:** `--vcdk-z-index-{component}`  
Components: tooltip|modal|dropdown-popover|snackbar

**Usage:** `z-index: var(--vcdk-z-index-modal);`

## Critical Constraints

**Never:**

- ❌ Override VGDS component internal styles - Components are visually complete
- ❌ Use primitive values (hex colors, pixel values) - Use semantic tokens only
- ❌ Create custom `--vcdk-` tokens - Use existing token catalog
- ❌ Apply visual styles to components - Use layout utilities only (mt-4, flex, gap-4)

**Always:**

- ✅ Use semantic tokens (`var(--vcdk-color-text)`) - Theme-aware, accessible
- ✅ Search workspace for tokens - Token catalog is source of truth
- ✅ Layout utilities on components (`<Button class="mt-4">`) - Spacing/layout only
- ✅ Read token source for discovery - Never invent token names

## Usage Decision Matrix

**CSS Tokens:** Custom components, framework-specific styling (Vue scoped, styled-components)  
**TailwindCSS:** Layout/spacing for VGDS components, rapid prototyping (see `../vgds-tailwindcss/SKILL.md`)  
**VGDS Components:** Interactive UI elements, consistent brand, accessibility-critical

## Theming

All tokens auto-adapt to active theme via `<vcdk-theme-provider>`. CSS custom properties update automatically.

```css
.custom {
  background: var(--vcdk-color-bg-base);
} /* Theme-aware */
```

## Related Resources

**TailwindCSS:** `../vgds-tailwindcss/SKILL.md`  
**Tokens package:** `packages/vcdk-tokens/AGENTS.md`  
**Tailwind package:** `packages/vcdk-tailwind/AGENTS.md`

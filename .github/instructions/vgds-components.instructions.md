---
applyTo: "**/*.tsx"
---

# VGDS Component Rules

## Component-First Approach

- **Always prefer VGDS components** over building custom UI elements. Check the available component library before creating anything from scratch.
- When VGDS doesn't cover a specific need, **compose custom components from VGDS primitives** (e.g. combine Card, SystemIcon, and Link into a feature card).
- Custom components are fine when needed, but exhaust VGDS capabilities first — the library covers buttons, inputs, modals, menus, data grids, charts, and more.

## Imports

- **Direct subpath imports only**: `import { Button } from "@volvo/vcdk-react/Button"`
- **Never barrel imports**: `import { Button } from "@volvo/vcdk-react"` ← breaks tree-shaking
- **Never invent props/events**: Read component API from source before using

## Styling

- Use TailwindCSS utilities for **layout and spacing only** (flex, grid, gap, padding, margin, width)
- **Never** override VGDS component visual appearance with Tailwind classes (bg, border, text-color on components)
- Use `--vcdk-*` CSS custom properties for custom-styled elements
- **No arbitrary values**: `p-[24px]` ← forbidden. Use token scale: `p-4`

## ThemeProvider

- App must be wrapped in `<ThemeProvider themeId="volvo-light">` (or other valid theme)
- All VGDS components consume CSS custom properties from ThemeProvider automatically

## Examples

```tsx
// ✅ Correct
import { Button } from "@volvo/vcdk-react/Button";
import { TextField } from "@volvo/vcdk-react/TextField";

<div className="flex flex-col gap-4 p-6">
  <TextField label="Name" />
  <Button><span>Submit</span></Button>
</div>

// ❌ Wrong
import { Button, TextField } from "@volvo/vcdk-react";

<Button className="bg-blue-500 text-white">Submit</Button>
```

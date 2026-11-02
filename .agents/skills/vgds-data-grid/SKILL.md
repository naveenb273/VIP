---
name: vgds-data-grid
description: Use this skill whenever you need to implement data grids or tables with advanced features. This includes vcdk-data-grid component, TanStack Table integration, sorting, filtering, pagination, virtualization, row selection, cell editing, inline editing, column visibility, column pinning, row expansion, custom cell renderers, and working with tabular data.
metadata:
  version: "2.0"
  package: "@volvo/vcdk-x-data-grid"
  element: "vcdk-data-grid"
  category: components
  engine: "TanStack Table v8"
  repository: "VolvoGroup-Internal/volvo-group-design-system"
  branch: "main"
---

# Data Grid

**Package:** `@volvo/vcdk-x-data-grid` | **Element:** `<vcdk-data-grid>` | **Engine:** TanStack Table v8

## Source File Reading Protocol

**Before implementing data grids, read these files:**

1. **Component API** → `packages/vcdk-x-data-grid/src/web-components/data-grid/data-grid.component.ts`
2. **React Examples** → `packages/example-react/src/components/DataGrid/` (all patterns)
3. **Angular Examples** → `packages/example-angular/src/app/data-grid/` (integration)
4. **Vanilla Examples** → `packages/example-vanilla-ts/src/components/data-grid/` (framework-free)

**NEVER assume properties. Read component source for exact API.**

## File Locations

**Component:** `packages/vcdk-x-data-grid/src/web-components/data-grid/` | **Examples:** `packages/example-{react|angular|vanilla-ts}/src/.../data-grid/`

## Key Properties

**Core:** `columns` (ColumnDef[]) | `data` (TData[]) | `state` (Partial<TableState>) | `options` (DataGridOptions) | `api` (getter for TanStack Table instance)

**Configuration:** Most features use `options` property for TanStack Table configuration.

## Features

**Data Management:** Sorting (single/multi) | Filtering (column/global) | Pagination | Virtualization (large datasets)

**Interaction:** Row selection (single/multi) | Cell selection | Inline editing (cell/row/modal) | Column visibility | Column pinning (left/right) | Row pinning (top/bottom)

**Display:** Custom cell renderers | Row expansion | Empty states (no-rows, no-results) | Loading (circular, linear, skeleton) | Custom footer

## Events

**State:** vcdk-data-grid-state-change | vcdk-data-grid-pagination-change | vcdk-data-grid-sorting-change | vcdk-data-grid-row-selection-change | vcdk-data-grid-column-visibility-change | vcdk-data-grid-global-filter-change

**Editing:** vcdk-data-grid-edit-mode-change | vcdk-data-grid-save-edits | vcdk-data-grid-add-rows | vcdk-data-grid-delete-rows

**Navigation:** vcdk-data-grid-focus-changed | vcdk-data-grid-cell-selection-change

## Slots

`title` (grid title) | `footer` (custom footer) | `no-rows` (empty state) | `no-result` (no search results) | `loading` (loading state)

## CSS Properties

`--vcdk-data-grid-height` (fixed height) | `--vcdk-data-grid-row-height` | `--vcdk-data-grid-headers-row-height` | `--vcdk-data-grid-overlay-min-height` | `--vcdk-data-grid-page-options-width`

## TanStack Table Integration

**Access full API via `api` property.** All TanStack Table v8 features available.

**Reference:** [TanStack Table Docs](https://tanstack.com/table/latest)

## Examples

**React** (`packages/example-react/src/components/DataGrid/`):

- Basic grid + sorting/filtering | Editable patterns | Row selection | Custom cell renderers | Virtualization | State management | Actions + toolbar | Styling + theming

**Angular** (`packages/example-angular/src/app/data-grid/`):

- Angular integration | Reactive forms + editing | Observable data | Component composition | Actions + custom cells | Cell selection

**Vanilla** (`packages/example-vanilla-ts/src/components/data-grid/`):

- Framework-free usage | Event handling | Programmatic API | Actions + editing | Custom cells

## Guidelines

**Performance:** Enable virtualization for >1000 rows | Memoize columns + data transforms | Use pagination for large datasets | Avoid sync operations

**Accessibility:** Provide `aria-label` | Keyboard navigation built-in (arrows, Tab, Enter, Space) | Focus management automatic | Screen reader support via ARIA

**Anti-Patterns:** 🚫 DOM manipulation (use CSS parts) | 🚫 Sync blocking operations (use async + loading states) | 🚫 Loading entire large datasets (use virtualization/pagination)

## Cross-References

**Package:** `packages/vcdk-x-data-grid/AGENTS.md` | **TanStack:** [tanstack.com/table/latest](https://tanstack.com/table/latest)

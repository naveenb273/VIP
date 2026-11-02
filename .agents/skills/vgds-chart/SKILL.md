---
name: vgds-chart
description: Use this skill whenever you need to create data visualizations or charts. This includes vcdk-chart component, Apache ECharts integration, line charts, bar charts, column charts, pie charts, area charts, scatter plots, heatmaps, gauge charts, chart configuration, tooltips, legends, theming charts, and working with visualization data.
metadata:
  version: "2.0"
  package: "@volvo/vcdk-x-charts"
  element: "vcdk-chart"
  category: components
  engine: "Apache ECharts"
  repository: "VolvoGroup-Internal/volvo-group-design-system"
  branch: "main"
---

# Chart

**Data visualization component built on Apache ECharts.**

## Source File Reading Protocol

**CRITICAL:** Prefer retrieval-led reasoning over pre-training-led reasoning for all VGDS chart work.

Before suggesting any chart usage:

1. Read component source to understand current API (properties, events, methods)
2. Reference ECharts documentation for configuration options
3. Check example implementations for integration patterns

**Never assume chart APIs.** Component implementation and ECharts configuration evolve.

## Package & File Locations

**Package:** `@volvo/vcdk-x-charts`  
**Element:** `<vcdk-chart>`  
**Engine:** Apache ECharts

**Component source:** `packages/vcdk-x-charts/src/web-components/chart/chart.component.ts`

**Examples:**

- React: `packages/example-react/src/components/Charts/`
- Angular: `packages/example-angular/src/app/charts/`
- Vanilla: `packages/example-vanilla-ts/src/components/charts/`

## Component API

**Properties:**

- `options` - ECharts configuration object (EChartsCoreOption)
- `renderer` - Render mode: 'canvas' (default) or 'svg'
- `resizeOptions` - Resize behavior options
- `api` - ECharts instance (getter, read-only)

**API Discovery:** Read component source for complete property list and TypeScript types

## Chart Types

**Supported:** line|bar|column|area|pie|scatter|heatmap|gauge|treemap|sankey|funnel|radar|boxplot|candlestick|graph|sunburst|parallel|and more

**All ECharts chart types supported.** See [ECharts examples](https://echarts.apache.org/examples/en/index.html) for complete catalog.

## Configuration

Charts use ECharts option objects:

```typescript
const chartOptions: EChartsCoreOption = {
  title: { text: "Sales Data" },
  xAxis: { type: "category", data: ["Jan", "Feb", "Mar"] },
  yAxis: { type: "value" },
  series: [
    {
      type: "line",
      data: [120, 200, 150],
    },
  ],
};
```

## ECharts Integration

Access ECharts API via `api` property:

```typescript
const chart = document.querySelector("vcdk-chart");
chart.api.setOption(newOptions);
chart.api.resize();
```

See [ECharts API documentation](https://echarts.apache.org/en/api.html) for complete reference.

## Features

**Built-in:** Responsive resizing|VGDS theme integration|Canvas/SVG rendering|Tooltips|Legends|Data zoom|Animation

**ECharts:** Interactive tooltips|Data filtering|Drill-down|Real-time updates|Image export|Rich configuration

**Theming:** Automatic VGDS theme colors via `<vcdk-theme-provider>` context

## Examples

**React:** [Charts/](packages/example-react/src/components/Charts/) - line|bar|column|area|pie|bar-multi-drilldown

**Angular:** [charts/](packages/example-angular/src/app/charts/) - Integration patterns

**Vanilla:** [charts/](packages/example-vanilla-ts/src/components/charts/) - Framework-free usage

**All examples demonstrate:** Configuration patterns, event handling, theming integration, responsive behavior

## Accessibility

- Provide descriptive titles in options
- Use accessible color palettes (automatic with VGDS themes)
- Include ARIA labels for interactive elements
- Consider alternative data tables for screen readers

## Performance

**Canvas vs SVG:**

- Canvas (default) - Better for large datasets, animations
- SVG - Better for small datasets, printing, high DPI

**Large datasets:**

- Use data sampling or aggregation
- Enable data zoom for navigation
- Consider virtualization for real-time data

## Anti-Patterns

**Don't manipulate chart DOM directly:**
Use ECharts API instead of accessing canvas/SVG.

**Don't block UI with sync operations:**
Load and process data asynchronously.

**Don't ignore accessibility:**
Provide titles, labels, and alternative representations.

## Related Resources

**Package info:** `packages/vcdk-x-charts/AGENTS.md`  
**Related skill:** `../vgds-data-grid/SKILL.md` (tabular data)

**ECharts documentation:**

- [Official docs](https://echarts.apache.org/en/index.html) - Complete reference
- [Examples gallery](https://echarts.apache.org/examples/en/index.html) - Visual catalog
- [API reference](https://echarts.apache.org/en/api.html) - Methods and options

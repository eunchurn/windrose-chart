# Windrose Chart Component

## Roadmap

- [x] VSCode setup `.vscode`
- [x] Typescript setup `tsconfig.json`
- [x] Rollup setup `rollup.config.js`
- [x] ESLint / Prettier setup `.eslint.json`, `.eslintignore`
- [x] Storybook setup `.storybook/config.tsx`
- [x] Storybook webpack setup `.storybook/webpack.config.js`
- [x] Storybook addon setup:  `.storybook/main.tsx`
- [x] Making entry point `src/index.ts`
- [x] Making default component `src/components/Chart.tsx`
- [x] Making component testing function `src/components/__tests__/Chart.spec.tsx`
- [x] Making Chart component `src/components/Chart.tsx`
- [x] Making Chart storybook component `src/components/Chart.stories.mdx`
- [x] Making Default Props `src/components/Chart.defaultProps.ts`
- [ ] Making Chart Props Type interface `src/components/Chart.types.ts`
- [ ] Making 5-5 WindRose Chart component `src/components/WindRoseChart.tsx`
- [ ] Chart Testing
- [ ] Making github actions `.github/workflows/Deploy.yml`
- [ ] Deploy module

## Features

- INPUT: Professionals respond to survey of how much they use a K-12 core competancy in each subject
- OUTPUT: Interdisciplinarity Badge (ideally with mouseover tooltips). Wind-rose type graphic, displaying survey response magnitudes for each subject area core competency

### Data Type

```typescript
interface DataType {
  subject: string;
  coreCompetency: string;
  survey: number;
}
interface PropType {
  data: DataType[];
  width: number;
  height: number;
}
```

## License

MIT

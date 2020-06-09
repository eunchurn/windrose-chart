# Windrose Chart Component

![Node.js Package](https://github.com/eunchurn/windrose-chart/workflows/Node.js%20Package/badge.svg) [![codecov](https://codecov.io/gh/eunchurn/windrose-chart/branch/master/graph/badge.svg)](https://codecov.io/gh/eunchurn/windrose-chart) [![npm version](https://badge.fury.io/js/%40eunchurn%2Fwindrose-chart.svg)](https://badge.fury.io/js/%40eunchurn%2Fwindrose-chart)

![chart](doc/2020-06-09%2002.59.40.png)

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
- [x] Making Chart Props Type interface `src/components/Chart.types.ts`
- [x] Making 5-5 WindRose Chart component `src/components/WindRoseChart.tsx`
- [x] Mouse over event
- [x] Typescript / Exception check
- [x] Chart Testing
- [x] Making github actions `.github/workflows/Deploy.yml`
- [x] Deploy module

## Features

- INPUT: Professionals respond to survey of how much they use a K-12 core competancy in each subject
- OUTPUT: Interdisciplinarity Badge (ideally with mouseover tooltips). Wind-rose type graphic, displaying survey response magnitudes for each subject area core competency

### Data Type

```typescript
export interface DataType {
  [key: string]: number | null;
}

export interface StackKey {
  key: string;
}
export interface State {
  width: number;
  height: number;
}

export interface PropType extends State {
  /**
   * Professionals respond to survey of how much they use a K-12 core competancy in each subject
   */
  data: DataType[];
  /**
   * Subjects
   */
  columns: string[];
  /**
   * Subjects colors
   */
  columnsColor: string[];
  /**
   * All core competency
   */
  angles: string[];
  /**
   * Max score
   */
  dataMax: number;
  /**
   * Target data keys
   */
  dataKeys: string[];
  /**
   * Mouse over Path color
   */
  mouseOverColor: string;
  /**
   * Mouse over competency text color
   */
  mouseOverTitleColor: string;
  /**
   * Mouseover survey score text color
   */
  mouseOverSurveyColor: string;
}

```

## Default data

```typescript
const data = [
  {
    subject: "Language Arts",
    coreCompetency: "Reading/Verbal Comprehension",
    survey: 1.2,
    color: "#8e44ad",
  },
  {
    subject: "Language Arts",
    coreCompetency: "Writing",
    survey: 2.3,
    color: "#7e44ad",
  },
  {
    subject: "Language Arts",
    coreCompetency: "Textual Analysis",
    survey: 2.4,
    color: "#6e44ad",
  },
  {
    subject: "Language Arts",
    coreCompetency: "Literary Knowledge",
    survey: 3.1,
    color: "#5e44ad",
  },
  {
    subject: "Language Arts",
    coreCompetency: "Foreign Language",
    survey: 1.7,
    color: "#4e44ad",
  },
  {
    subject: "Math",
    coreCompetency: "Arithmetic/ Algebra",
    survey: 4.2,
    color: "#4e54ad",
  },
  {
    subject: "Math",
    coreCompetency: "Geometry/Trig/Spatial Orientation",
    survey: 5.6,
    color: "#4e64ad",
  },
  {
    subject: "Math",
    coreCompetency: "Probability/Statistics/Modeling",
    survey: 1.6,
    color: "#4e74ad",
  },
  {
    subject: "Math",
    coreCompetency: "Calculus/Other advanced math",
    survey: 2.3,
    color: "#4e84ad",
  },
  {
    subject: "Math",
    coreCompetency: "Graphical Literacy",
    survey: 5.6,
    color: "#4e94ad",
  },
  {
    subject: "Science",
    coreCompetency:
      "Application of Scientific method or deductive reasoning",
    survey: 5.8,
    color: "#4e949d",
  },
  {
    subject: "Science",
    coreCompetency: "Experimental/Prototype design and revision",
    survey: 5.2,
    color: "#4e948d",
  },
  {
    subject: "Science",
    coreCompetency:
      "Synthesis or inference based on multiple lines of evidence",
    survey: 5.1,
    color: "#4e947d",
  },
  {
    subject: "Science",
    coreCompetency:
      "Disciplinary Knowledge (Physics, biology, chemistry, medicine, engineering, etc.)",
    survey: 5.7,
    color: "#4e946d",
  },
  {
    subject: "Science",
    coreCompetency: "Data management/visualization",
    survey: 4.2,
    color: "#4e945d",
  },
  {
    subject: "Social Studies",
    coreCompetency:
      "Constructing questions, gathering and synthesizing sources of cultural, geographical, and historical knowledge",
    survey: 1.3,
    color: "#3e945d",
  },
  {
    subject: "Social Studies",
    coreCompetency: "Understanding of government, law, & politics",
    survey: 4.9,
    color: "#2e945d",
  },
  {
    subject: "Social Studies",
    coreCompetency:
      "World history and geography: temporal and spatial views of the world, human-environmental interactions, (changing) spatial patterns and movement",
    survey: 1.2,
    color: "#1e945d",
  },
  {
    subject: "Social Studies",
    coreCompetency:
      "Higher-level analysis: Evaluating sources of cultural and historical knowledge; developing claims from evidence",
    survey: 2.3,
    color: "#10945d",
  },
  {
    subject: "Social Studies",
    coreCompetency:
      "Communicating and critiquing historical, political, economic, or cultural viewpoints",
    survey: 1.1,
    color: "#00945d",
  },
  {
    subject: "21st Century Skills",
    coreCompetency: "Collaboration",
    survey: 5.6,
    color: "#00845d",
  },
  {
    subject: "21st Century Skills",
    coreCompetency: "Communication",
    survey: 5.1,
    color: "#00745d",
  },
  {
    subject: "21st Century Skills",
    coreCompetency: "Creativity",
    survey: 5.3,
    color: "#00645d",
  },
  {
    subject: "21st Century Skills",
    coreCompetency: "Critical Thinking",
    survey: 4.5,
    color: "#00545d",
  },
  {
    subject: "21st Century Skills",
    coreCompetency:
      "Tech Savvy (coding, touch-typing, troubleshooting abilities, software competency)",
    survey: 5.9,
    color: "#00445d",
  },
  {
    subject: "Arts, Crafts & Labor",
    coreCompetency: "Physical Effort",
    survey: 1.9,
    color: "#FFFF00",
  },
  {
    subject: "Arts, Crafts & Labor",
    coreCompetency: "Mental Effort",
    survey: 5.8,
    color: "#FFFF10",
  },
  {
    subject: "Arts, Crafts & Labor",
    coreCompetency: "Emotional Effort",
    survey: 2.1,
    color: "#FFFF20",
  },
  {
    subject: "Arts, Crafts & Labor",
    coreCompetency:
      "Specialized art or craft knowledge (sketching, painting, carpentry, hair cutting, welding, etc)",
    survey: 1.9,
    color: "#FFFF30",
  },
  {
    subject: "Arts, Crafts & Labor",
    coreCompetency: "Appreciation of or critique of art/craft/design",
    survey: 1.7,
    color: "#FFFF40",
  },
];

const angles = data.map((d) => d.coreCompetency);
const maxData = data.reduce((pre, cur) =>
  pre.survey > cur.survey ? pre : cur
);
```

### Default Props

```typescript
export const DefaultProps = {
  width: 800, // Chart Width (px)
  height: 500,  // Chart Height (px)
  dataMax: maxData.survey, // Max data value (5)
  data, // Data
  columns: [
    "Language Arts",
    "Math",
    "Science",
    "Social Studies",
    "21st Century Skills",
    "Arts, Crafts & Labor",
  ], // Columns of group (array string)
    columnsColor: [
    "#8e44ad",
    "#c0392b",
    "#27ae60",
    "#2c3e50",
    "#0984e3",
    "#e84393",
  ],
  angles, // All pie chart angles (array string)
  dataKeys: ["survey"], // target keys of `data` / legnth = 1, no stack data in this time
  mouseOverColor: "#1abc9c",
  mouseOverTitleColor: "#e67e22",
  mouseOverSurveyColor: "#e74c3c",
};
```

## Usage

### Install

- Clone this repo
- install packages

```bash
npm i
```

### Storybook

```bash
npm run storybook
```

### React

```jsx
import { Chart } from "./Chart"

export default function YourApp() {
  return (
    <Chart 
      data={data} 
      width={800} 
      height={500} 
      dataMax={5} 
      columns={columns} 
      angles={angles}
      dataKeys={["survey"]}
    />
  )
};
```

## License

MIT

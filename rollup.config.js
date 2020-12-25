// import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";

import pkg from "./package.json";

export default {
  input: "src/index.tsx",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: "es",
      exports: "named",
      sourcemap: true,
    },
  ],
  plugins: [
    external(),
    resolve({
      customResolveOptions: {
        moduleDirectory: "src",
      },
      extensions: [".js", ".jsx", ".ts", "tsx"],
    }),
    // typescript({
    //   // rollupCommonJSResolveHack: true,
    //   lib: ["es5", "es6", "dom"],
    //   target: "es5",
    //   exclude: ["**/__tests__/**"],
    // }),
    babel({
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      exclude: "node_modules/**",
      babelHelpers: "runtime",
    }),
    commonjs({
      include: ["node_modules/**"],
      // namedExports: {
      //   "node_modules/react/react.js": [
      //     "Children",
      //     "Component",
      //     "PropTypes",
      //     "createElement",
      //   ],
      //   "node_modules/react-dom/index.js": ["render"],
      // },
    }),
  ],
  external: [
    "lodash",
    "react",
    "react-dom",
    "react-tooltip",
    "d3",
    "styled-components",
  ],
};

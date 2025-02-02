import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "dist/index.es.js",
        format: "es",
        exports: "named",
        sourcemap: true,
      },
    ],
    external: ["react", "react-dom", "@mui/material", "@mui/lab"],
    plugins: [
      typescript({ tsconfig: "./tsconfig.json" }),
      commonjs({ include: "node_modules/**" }),
      babel({
        exclude: "node_modules/**",
        presets: ["@babel/preset-react", { runtime: "automatic" }],
        babelHelpers: "runtime",
      }),
      resolve(),
      peerDepsExternal(),
      terser(),
      postcss(),
    ],
  },
];

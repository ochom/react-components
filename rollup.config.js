import babel from "@rollup/plugin-babel";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";

const production = !process.env.ROLLUP_WATCH;

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
        sourcemap: !production,
      },
      {
        file: "dist/index.es.js",
        format: "es",
        exports: "named",
        sourcemap: !production,
      },
    ],
    plugins: [
      babel({
        exclude: "node_modules/**",
        presets: ["@babel/preset-react"],
      }),
      resolve(),
      typescript({ tsconfig: "./tsconfig.json" }),
      peerDepsExternal(),
      terser(),
    ],
  },
];

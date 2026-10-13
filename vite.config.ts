import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import pkg from "./package.json";

export default defineConfig({
  plugins: [
    react(),
    dts({ rollupTypes: true, tsconfigPath: "./tsconfig.json" }),
  ],
  server: {
    open: true, // Opens browser automatically
  },
  build: {
    lib: {
      entry: "src/index.ts",
      name: "ochom-react-components",
      fileName: "index",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: (id) => {
        // Externalize all dependencies and their subpath imports
        const deps = [...Object.keys(pkg.peerDependencies || {})];
        return deps.some((dep) => id === dep || id.startsWith(`${dep}/`));
      },
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "@mui/material": "MaterialUI",
          "@emotion/react": "emotionReact",
          "@emotion/styled": "emotionStyled",
          moment: "moment",
          "react-number-format": "NumberFormat",
          "@mui/x-date-pickers": "MaterialXDatePickers",
        },
      },
    },
  },
});

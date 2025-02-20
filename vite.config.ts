import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [react(), dts()],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "ochom-react-components",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "@emotion/react",
        "@emotion/styled",
        "@iconify/react",
        "@mui/lab",
        "@mui/material",
        "@mui/x-date-pickers",
        "moment",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "@emotion/react": "emotionReact",
          "@emotion/styled": "emotionStyled",
          "@iconify/react": "iconifyReact",
          "@mui/lab": "muiLab",
          "@mui/material": "muiMaterial",
          "@mui/x-date-pickers": "muiXDatePickers",
          moment: "moment",
        },
      },
    },
  },
});

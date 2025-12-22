import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding"
  ],
  "framework": "@storybook/react-vite",
  async viteFinal(config) {
    // Remove vite-plugin-dts and library build config for Storybook
    if (config.plugins) {
      config.plugins = config.plugins.filter(
        (plugin: any) => plugin && plugin.name !== 'vite:dts'
      );
    }

    // Completely override build options to avoid library build settings
    return mergeConfig(config, {
      build: {
        minify: 'esbuild',
        rollupOptions: {
          output: {
            manualChunks: (id) => {
              // Separate vendor chunks to avoid Rollup analysis issues
              if (id.includes('node_modules')) {
                if (id.includes('@mui')) return 'mui';
                if (id.includes('moment')) return 'moment';
                if (id.includes('@emotion')) return 'emotion';
                return 'vendor';
              }
            }
          }
        }
      },
      optimizeDeps: {
        include: ['@mui/material', '@emotion/react', '@emotion/styled', 'moment']
      }
    });
  }
};
export default config;
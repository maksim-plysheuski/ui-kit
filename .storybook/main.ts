import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-themes",
    // In Storybook 10 actions & measure are built into core
    // (former @storybook/addon-actions / @storybook/addon-measure packages are empty stubs)
  ],
  framework: "@storybook/react-vite",
  features: {
    actions: true,
    measure: true,
    outline: true,
  },
};

export default config;

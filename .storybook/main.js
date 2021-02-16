module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "webpackFinal": async (config, { configType }) => {
    config.resolve.alias["react-native"] = "react-native-web";
    config.resolve.alias['react-native-web/dist/exports/Modal'] = 'modal-enhanced-react-native-web';
    return config;
  }
}
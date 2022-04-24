module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  // instructs jest to merge an external configuration

  // settings created by the plugin tells the transformers for babel and vue
  transform: {
    '^.+\\.vue$': 'vue-jest',
  },
};

// configuration is outsourced from the plugin

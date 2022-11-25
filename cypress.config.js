const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'cuh91e',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  historyApiFallback: {
    index: "/index", //与output的publicPath
  },
});

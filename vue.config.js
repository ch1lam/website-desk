const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "/production-sub-path/" : "/",
  outputDir: "dist",
  lintOnSave: true,
  // 是否为生产环境构建生成 source map？
  productionSourceMap: false,
  chainWebpack: config => {
    // alias 配置
    config.resolve.alias.set("@", resolve("src"));
  }
};

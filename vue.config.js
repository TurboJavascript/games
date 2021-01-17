const site = process.env.SITE;
const baseUrl = `/games/${site}`;
const version = require('./package.json').version;
function resolve(dir) {
  return path.join(__dirname, dir)
}

const timestamp = new Date().getTime();
module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      css: {
        camelCase: 'dashesOnly'
      }
    }
  },
  // 当运行 vue-cli-service build 时生成的生产环境构建文件的目录。注意目标目录在构建之前会被清除 (构建时传入 --no-clean 可关闭该行为)。
  outputDir: 'dist',
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: './',
  publicPath: (process.env.NODE_ENV === 'production' ? './' : baseUrl)  ,
  configureWebpack: {
    output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
      filename: `[name].${version}.${timestamp}.js`,
      chunkFilename: `[name].${version}.${timestamp}.js`
    },
  },
};

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
  chainWebpack: (config) => {
    config.plugin("html").tap(([options]) => [
      Object.assign(options, {
        minify: {
          removeComments: true,
          removeCommentsFromCDATA: true,
          collapseWhitespace: true,
          conservativeCollapse: false,
          collapseInlineTagWhitespace: true,
          collapseBooleanAttributes: true,
          removeRedundantAttributes: true,
          removeAttributeQuotes: false,
          removeEmptyAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
          minifyJS: true,
          minifyCSS: true
        },
        cache: true, // 仅在文件被更改时发出文件
        hash: true, // true则将唯一的webpack编译哈希值附加到所有包含的脚本和CSS文件中,这对于清除缓存很有用
        scriptLoading: "defer", // 现代浏览器支持非阻塞javascript加载（'defer'）,以提高页面启动性能。
        inject: true, // true所有javascript资源都将放置在body元素的底部
        chunksSortMode: "none"
      })
    ]);
  }
};

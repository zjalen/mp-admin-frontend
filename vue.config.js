module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  // proxy API requests to Valet during development
  /* webpack-dev-server 相关配置 */
  devServer: {
      /* 自动打开浏览器 */
      open: true,
      /* 设置为0.0.0.0则所有的地址均能访问 */
      host: '0.0.0.0',
      port: 8080,
      https: false,
      hotOnly: false,
      /* 使用代理 */
      proxy: {
          '/mp-admin': {
              /* 目标代理服务器地址 */
              target: 'http://localhost:8000',
              /* 允许跨域 */
              changeOrigin: true,
          },
      },
  },

  publicPath: process.env.NODE_ENV === 'production'
                  ? '/vendor/mp-admin/'
                  : '/',

  // output built static files to Laravel's public dir.
  // note the "build" script in package.json needs to be modified as well.
  outputDir: '../resources/assets/mp-admin',

  // modify the location of the generated HTML file.
  // make sure to do this only in production.
  indexPath: process.env.NODE_ENV === 'production'
    ? '../../views/mp_admin.blade.php'
    : 'index.html',
}

/* eslint-disable @typescript-eslint/no-var-requires */
// const path = require('path')

module.exports = {
  configureWebpack: {
    // resolve: {
    //   alias: {
    //     '@': path.resolve(__dirname, '/src'),
    //   },
    // },
  },
  devServer: {
    proxy: {
      '/api': {
        target: `http://127.0.0.1:3000/api`,
        changeOrigin: true,
        pathRewrite: {
          '/api': '',
        },
      },
    },
  },
}

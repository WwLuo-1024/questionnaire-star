module.exports = {
  webpack: {
    configure(webpackConfig) {
      if (webpackConfig.mode === 'production') {
        //抽离公共代码，只在生产环境
        if (webpackConfig.optimization == null) {
          webpackConfig.optimization = {}
        }
        webpackConfig.optimization.splitChunks = {
          chunks: 'all',
          cacheGroups: {
            antd: {
              name: 'antd-chunk',
              test: /antd/, //匹配antd的都适用该规则
              priority: 100,
            },
            reactDom: {
              name: 'reactDom-chunk',
              test: /react-dom/,
              priority: 99,
            },
            vendors: {
              name: 'vendors-chunk',
              test: /node_modules/,
              priority: 98,
            },
          },
        }
      }
      return webpackConfig
    },
  },

  //common js
  devServer: {
    port: 8000, //business clinet
    proxy: {
      '/api': 'http://localhost:3001', //Mock
    },
  },
}

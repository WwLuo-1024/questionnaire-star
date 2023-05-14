module.exports = {
  //common js
  devServer: {
    port: 8000, //business clinet
    proxy: {
      '/api': 'http://localhost:3001', //Mock
    },
  },
}

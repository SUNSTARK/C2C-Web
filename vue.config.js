module.exports = {
  runtimeCompiler: true,
  publicPath: './', // 设置打包文件相对路径
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: '', //对应自己的接口
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};

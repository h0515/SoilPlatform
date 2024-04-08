const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
         '/api': {
           'target': 'http://swc.cau-iae.cn:8080/',//目标URL
           'changeOrigin': true,
           'pathRewrite': { 
              '^/api' : '' ,
         },
         }
    },
    client: {
      //当出现编译错误或警告时，在浏览器中是否显示全屏覆盖。  示例为只显示错误信息
      overlay: {
        runtimeErrors: false,
      },
    },
    allowedHosts: "all"
  }
})

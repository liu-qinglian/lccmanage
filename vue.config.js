const { defineConfig } = require('@vue/cli-service')

let proxyObj = {}

// proxyObj['/'] = {
//   ws: false,
//   target: 'http://localhost:8081',
//   changeOringin: true,//是否开启跨域
//   pathRewrite: {//重写路径
//     '^/': '' //把/变为空字符
//   }
// }

// 请求作业 前端在8080 后端在8081
proxyObj['/ws'] = {
  ws: true,
  target: 'ws://localhost:8081'
}
module.exports = defineConfig({
  transpileDependencies: true,
  // devServer: {
  //   host: 'localhost',
  //   // https:true,
  //   port: 8080,
  //   proxy: proxyObj
  // }
  // 这里不配会有问题？
  // devServer: {
  //   host: '0.0.0.0',
  //   port: 8081,
  //   client: {
  //     webSocketURL: 'ws://0.0.0.0:8081/ws',
  //   },
  //   headers: {
  //     'Access-Control-Allow-Origin': '*',
  //   }
  // }

})

import axios from 'axios'
// import { config } from 'vue/types/umd'

// 默认代理一个响应类型，就可以通过service写一个拦截器
const service = axios.create({
    // 流是二进制数组
    responseType: 'arraybuffer'
})

// 请求拦截器
service.interceptors.request.use(config => {
    config.headers['Authorization'] = window.sessionStorage.getItem('tokenStr');
    return config;
}, error => {
    console.log(error);
})


// 
service.interceptors.response.use(res => {
    // 先拿响应的头部信息
    const headers = resp.headers;
    // 定义正则表达式  返回可能是流有可能是正常字符串
    let reg = RegExp(/application\/json/);
    // 判断是否匹配
    if (headers['content-type'].match(reg)) {
        //  转成string类型
        res.data = unitToString(res.data);
    } else {
        // 返回的是string流
        let fileDownload = require('js-file-download');
        // 获取名字
        let fileName = header['content-disposition'].split(';')[1].split('filename=')[1];
        let contentType = headers['content-type'];

        //  文件名格式转换  防止中文乱码
        fileName = decodeURIComponent(filename);
        fileDownload(res.data, fileName, contentType);

    }
}, error => {
    console.log(error);
})

// 处理json数据的转换
function unitToString(unitArray) {
    let encodedString = String.fromCharCode.apply(null, new Uint8Array(unitArray));
    let decodedString = decodeURIComponent(escape(encodedString));
    return JSON.parse(decodedString);
}


let base = '';
export const downloadRequest = (url, params) => {
    return service({
        method: 'get',
        url: `${base}${url}`,
        data: params,
    })
}

export default service;
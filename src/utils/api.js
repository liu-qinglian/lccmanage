import axios from 'axios'
// 此时调用方法为 Message(options)。我们也为每个 type 定义了各自的方法，
// 如 Message.success(options) 。并且可以调用 Message.closeAll() 手动关闭所有实例。
import { Message } from 'element-ui';
import router from 'vue-router'

// 请求拦截器
axios.interceptors.request.use(config => {
    //如果存在token.请求携带这个token

    if (window.sessionStorage.getItem('tokenStr')) {
        // 让每个请求携带自定义token  
        config.headers['Authorization'] = window.sessionStorage.getItem('tokenStr');
    }
    return config
}, error => {
    console.log(error);
})




// success表示成功获取到了后端的接口
// 响应的拦截器  碰到请求失败的时候可以进行统一的处理
axios.interceptors.response.use(success => {
    console.log(success);
    // 业务逻辑错误
    if (success.status && success.status == 200) {
        // 响应码，响应信息，对象
        if (success.data.code == 500 || success.data.code == 401 || success.data.code == 403) {
            Message.error({ message: success.data.message })
            return;
        }
        if (success.data.message) {
            Message.success({ options: success.data.message })
        }

    }
    return success.data;
}, error => {
    if (error.response.code == 504 || error.response.code == 404) {
        Message.error({ message: "服务器被吃了~" })
    } else if (error.response.code == 403) {
        Message.error({ message: "权限不足哦~" })
    } else if (error.response.code == 401) {
        Message.error({ message: "没有登陆哦~" })
        router.replace('/').catch(err => {
            console.log('all good')
        });
    } else {
        if (error.response.data.message) {
            Message.error({ message: error.response.data.message })
        } else {
            Message.error({ message: "未知错误！" })
        }
    }
    return;
});

let baseUrl = '';

// 传送json格式的post请求
export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: `${baseUrl}${url}`,
        data: params,
    })
}
export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${baseUrl}${url}`,
        data: params,
    })
}

export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${baseUrl}${url}`,
        data: params,
    })
}
export const delRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: `${baseUrl}${url}`,
        data: params,
    })
}
export const delRequestForRest = (url, params) => {
    return axios({
        method: 'delete',
        url: `${baseUrl}${url}/${params}`,
        data: params,
    })
}
// export default { getRequest, postRequest, delRequest }
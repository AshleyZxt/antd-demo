import axios from 'axios'
 
const request = axios.create({
    timeout: 10000,
    headers: {
        'Authorization': 'Bearer xxxxxx'
    }
})
 
// request 拦截器
request.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.reject(error)
});
 
// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
    response => {
        let res = response.data;
        console.log("request");
        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
         // 当权限验证不通过的时候给出提示
         if (res.code === '401') {
            ElementUI.Message({
                message: res.msg,
                type: 'error'
            });
        }
        return res;
    },
    error => {
        return Promise.reject(error)
    }
)
 
export default request
// Set config defaults when creating the instance
//自定义实例默认值
import axios, {AxiosInstance} from "axios";

const isDev = process.env.NODE_ENV === 'development';
const baseURL= 'http://localhost:8080/api'

const myAxios = axios.create({
    baseURL: isDev ? baseURL : ''
});

// 允许携带cookie
myAxios.defaults.withCredentials = true;

//拦截器
// 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    console.log("请求发送了",config)
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
    // 未登录则跳转到登录页
    if (response?.data?.code === 40100) {
        
        const redirectUrl = window.location.href;
        // 直接字符串剪切到登录页
        // let its = redirectUrl.indexOf('#')+1;
        // window.location.href = redirectUrl.substring(0,its) + '/user/login';

        // 路由是webhistory模式，重定向跳转
        window.location.href = `/user/login?redirect=${redirectUrl}`;
    }
    // 响应数据取data
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default myAxios;
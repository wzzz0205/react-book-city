import axios from 'axios';

let BASE_URL = "101.42.251.12:8080";
let TIMEOUT = 5000;

const AxiosInstance = axios.create({
    baseURL:BASE_URL,
    timeout:TIMEOUT
})

// 添加拦截
AxiosInstance.interceptors.request.use(config => {
    return config
},error => {

})

AxiosInstance.interceptors.response.use(res => {
    return res.data
},error => {
    return error;
})


export default AxiosInstance;

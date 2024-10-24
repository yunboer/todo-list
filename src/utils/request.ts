import axios from 'axios'
import { getToken } from './token'

// 初始化axios实例
const request = axios.create({
    baseURL: 'http://localhost:3002/api',
    timeout: 5000,
})

// 请求拦截器 在请求发送之前做一些处理【参数的处理】
request.interceptors.request.use((config)=>{
    const token = getToken();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
}, (error)=>{
    return Promise.reject(error)
})

// 响应拦截器 在响应之前做一些处理【返回的数据】
request.interceptors.response.use((response)=>{
    return response
}, (error)=>{
    return Promise.reject(error)
})

function testAuth() {
    return request.get('/protected')
}

export {request, testAuth}
import axios from 'axios'
import ElementUI from 'element-ui'
import router from '@/router'
import store from '@/store'

const request1 = axios.create({
    baseURL: "http://127.0.0.1:8819/",
    timeout: 5000
})


// 创建axios实例
const request2 = axios.create({
    baseURL:"http://192.168.1.163:8036/",
    timeout:5000
})

//前置拦截
request1.interceptors.request.use(config => {

    //如果存在token，请求携带token
    if (window.sessionStorage.getItem('token')) {
        config.headers['token'] = window.sessionStorage.getItem('token');
    }
    return config;
    
})

//后置拦截
request1.interceptors.response.use(response => {

    //调到接口了
    if(response.status && response.status == 200){
        if (response.data.code == "Error1002") {
            ElementUI.Message.error({message:'请先登录'})
        }
    }
    return response.data;

},error => {

    if (error.response.code == 504 || error.response.code == 404){
        ElementUI.Message.error({message:'服务器被吃了/(ㄒoㄒ)/~~'})
    }else if (error.response.code == 403) {
        ElementUI.Message.error({message:'权限不足，请联系管理员'})
    }else if(error.response.code === 401) {
        store.commit("removeTokenAndInfo")
        router.push("/login")
        ElementUI.Message.error("请先登录",{duration:2*1000})
    }else {
        if (error.response.data.message) {
            ElementUI.Message.error(error.response.data.message,{duration:2*1000})
        }else {
            ElementUI.Message.error('未知错误',{duration:2*1000})
        }
    }

    return;  //阻止继续执行
    
})

export {
    request1,request2
}
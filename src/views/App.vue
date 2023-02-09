<template>
    <div>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button type="primary" @click="userInfo">获取用户信息</el-button>
        <el-button type="primary" @click="notToken">忽略Token验证测试</el-button>
    </div>
</template>

<script>
import {login, userInfo, notToken} from "@/api/users"
export default {
    data() {
        return {
        };
    },
    methods: {
        userInfo() {
            userInfo({}).then(res => {
                console.log(res);
            })
        },
        notToken() {
            notToken({}).then(res => {
                console.log(res);
            })
        },
        login() {
            login("/front/login",{}).then(res => {
                console.log(res);
                window.sessionStorage.setItem("token", res.response.token)
            })
        }
    },
    created(){
        
    }
}
</script>

<style>

</style>
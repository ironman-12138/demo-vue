<!-- 左边菜单 -->
<template>
    <div class="left-nav">
        <el-menu default-active="system/user" :collapse="collapsed" collapse-transition router :default-active="$route.path" unique-opened
            class="el-menu-vertical-demo" >
            <div class="logobox">
                <img class="logoimg" src="@/assets/logo.png" alt="">
            </div>
            <div style="text-align: center;">
                <el-input
                    v-model="searchStr"
                    suffix-icon="el-icon-search"
                    class="header-search-input"
                    @change="search()"></el-input>
            </div>
            <div v-for="menu in allmenu" style="text-align: center;">
                <!-- 如果当前有子菜单，则显示 el-submenu ，在el-subment 里调用 递归组件 -->
                <el-submenu v-if="menu.children && menu.children.length > 0" :index="'/' + menu.url" :key="menu.id">
                    <template slot="title">
                        <i class="iconfont" :class="menu.icon"></i>
                        <span>{{ menu.menuName }}</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item v-for="chmenu in menu.children" :index="'/' + chmenu.url" :key="chmenu.id">
                            <i class="iconfont" :class="chmenu.icon"></i>
                            <span>{{ chmenu.menuName }}</span>
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <!-- 如果没有子菜单，则显示当前内容 -->
                <el-menu-item v-else :index="'/' + menu.url">
                        <i class="iconfont" :class="menu.icon"></i>
                        <span style="font-size: 16px;">{{ menu.menuName }}</span>
                </el-menu-item>
            </div>
        </el-menu>
    </div>
</template>
<script>
export default {
    name: 'leftnav',
    data() {
        return {
            collapsed: false,
            allmenu: [],
            dataList: [],
            searchStr: ""
        }
    },
    methods: {
        search() {
            this.allmenu = this.dataList;
            this.allmenu = this.allmenu.filter(item=>item.menuName.includes(this.searchStr))
        },
    },
    // 创建完毕状态(里面是操作)
    created() {
        let res = {
            success: true,
            data: [
                {
                    id: 2,
                    icon: 'el-icon-s-cooperation',
                    menuName: '切片上传',
                    url: 'library/oss',
                    children: null
                },
                {
                    id: 3,
                    icon: 'el-icon-s-cooperation',
                    menuName: '滚动加载',
                    url: 'library/rollingLoad',
                    children: null
                },
                {
                    id: 4,
                    icon: 'el-icon-s-cooperation',
                    menuName: '元素拖拽',
                    url: 'library/draggable',
                    children: null
                },
                {
                    id: 5,
                    icon: 'el-icon-s-cooperation',
                    menuName: '选人弹窗',
                    url: 'library/select',
                    children: null
                }
            ],
            msg: 'success'
        }
        this.allmenu = res.data
        this.dataList = res.data

        // userMenuTree().then(res => {
        //     if (res.code == "200") {
        //         this.allmenu = res.data
        //     }
        // })
    }
}
</script>
<style>
    .left-nav {
        height: 100%;
        border-right: 1px solid rgb(46, 46, 46, 0.2);
    }
    .el-menu-vertical-demo {
        height: 100%;
    }

    .el-menu-item-group__title {
        padding: 0px;
    }

    .el-menu-bg {
        background-color: #1f2d3d !important;
    }

    .el-menu {
        border: none;
    }

    .logobox {
        height: 40px;
        line-height: 40px;
        color: #9d9d9d;
        font-size: 20px;
        text-align: center;
        padding: 20px 0px;
    }

    .logoimg {
        height: 40px;
    }

    .header-search-input {
        width: 80%;
    }
</style>
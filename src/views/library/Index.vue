<template>
    <div class="system-index">
        <el-container>
            <el-aside>
                <leftnav></leftnav>
            </el-aside>
            <el-container>
                <el-header>
                    <topnav></topnav>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
    // 导入组件
    import leftnav from '../../components/library/LeftNav.vue'
    import topnav from '../../components/library/TopNav.vue'
    export default {
        name: 'index',
        data() {
            return {
            }
        },
        // 注册组件
        components: {
            leftnav,
            topnav
        },
        methods: {},
        created() {
        },
    }
</script>
<style scoped>
    .system-index {
        width: 100%;
        height: 100%;
        position:fixed;
    }

    .el-container {
       height: 100%;
       width: 100%;
       margin: 0;
       padding: 0;
    }
    .el-main {
       padding: 1.3333rem;
    }

    .el-header {
        padding: 0;
    }
</style>
  
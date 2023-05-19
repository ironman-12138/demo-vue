<!-- 头部菜单 -->
<template>
  <div class="top">
    <el-button class="buttonimg" @click="goReturn()">
      返回
    </el-button>
    <el-dropdown @command="handleCommand" class="dropdown">
        <span class="dropdown-name">超级管理员<i class="el-icon-arrow-down el-icon--right"></i></span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="loginOut" >
                <p>退出登录</p>
            </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  name: 'topnav',
  data() {
    return {
      collapsed: true,
      user: {}
    }
  },
  // 创建完毕状态(里面是操作)
  created() {
    this.user = this.$store.state.userInfo;
  },
  methods: {
    goReturn() {
        this.$router.push({ path: '/index'});
    },
    handleCommand(command) {
        if (command == 'loginOut') {
        }
    }
  }
}
</script>
<style scoped>
    .top {
      background-color: #fafaf6;
      box-shadow: 0 0 5px 0 rgba(0, 0, 0, .25);
      width: 100%;
    }
    .dropdown {
        float: right;
    }
    .buttonimg {
        height: 60px;
        background-color: transparent;
        border: none;
    }

    .dropdown-name {
      cursor: pointer;
      line-height: 60px;
      margin: auto;
      margin-right: 30px;
    }

    .el-dropdown-menu__item {
      line-height: 20px;
    }
</style>
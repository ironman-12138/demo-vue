<template>
    <div id="nav-bar" :class = "navShow ? 'navOn' : 'navOff'">
        <div class="header">
            <div class="header-title">我的地盘</div>
            <div class="header-menu">
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                    <el-menu-item index="/index">首页</el-menu-item>
                    <el-menu-item index="/blogEdit">发布</el-menu-item>
                    <el-menu-item index="/404">个人中心</el-menu-item>
                    <el-menu-item index="/404">消息中心</el-menu-item>
                </el-menu>
            </div>
            <div class="header-search">
                <el-input
                    v-model="searchStr"
                    suffix-icon="el-icon-search"
                    class="header-search-input"
                    @change="search()"></el-input>
            </div>
            <div class="header-user">
                <el-avatar :size="30" :src="user.avatar"></el-avatar>
                <div style="margin-left: 0.5rem;">
                    <el-dropdown @command="handleCommand">
                        <span style="height: 0.5rem; cursor: pointer;">{{ user.username }}</span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="loginOut">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <i class="el-icon-date" style="margin-left: 10px; cursor: pointer;" @click="drawer = true"></i>
            </div>
        </div>
        <el-drawer
            title="代办"
            append-to-body
            :visible.sync="drawer"
            :direction="direction"
            :before-close="handleClose">
            <ToDo></ToDo>
        </el-drawer>
	</div>
</template>

<script>
import ToDo from '../components/ToDo.vue'
export default {
    name: 'Header',
    props: {
        callback: {
            type: Function
        }
    },
    components: {
        ToDo
    },
    data() {
        return {
            user: {
                username: '请先登录',
                avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
            },
            hasLogin: false,
            top: 0,
            navShow: true,
            activeIndex: '/index',
            searchStr: '',
            drawer: false,
            direction: 'rtl'
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            this.$router.push({ path: key});
        },
        search() {
            this.callback(this.searchStr);
        },
        // 获取页面滚动距离
        handleScroll () {
            this.top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        },
        handleCommand(command) {
            if (command == 'loginOut') {
                this.$router.push({ path: '/login'});
            }
        },
        handleClose(done) {
            done();
        }
    },
    // 获取浏览器滚轮
    mounted() {
        window.addEventListener('scroll', this.handleScroll)
    },
    // 滚动重置
    beforeDestroy () {
        window.removeEventListener('scroll', this.handleScroll)
    },
    // 监听top值的变化
	watch:{
		top(newValue, oldValue){
			// 等新值大于100的时候再做变化（优化一下）
			if(newValue > 100){
				if(newValue > oldValue){
					this.navShow = false
				}else{
					this.navShow = true
				}
			}
		}
	},
    created() {
        this.activeIndex = this.$router.history.current.fullPath;
    }
};
</script>

<style>
    #nav-bar {
        width: 100%;
        z-index: 1;
    }
    .header {
        display: flex;
        margin: auto;
        justify-content: space-around;
        background-color: white;
        width: 100%;
        border-bottom: 0.2px solid rgba(0, 0, 0, 0.06);
    }
    .header-title {
        line-height: 3.75rem;
        letter-spacing: 1px; /* 字间距 */
        font-size: 18px;
    }
    .header-user {
        display: flex;
        align-items: center;
        line-height: 3.75rem;  
    }
    .header-search {
        line-height: 3.75rem;
        width: 15rem;
    }
    .header-search .el-input__inner {
        height: 2.1rem;
    }
    /* -------------屏幕滚动上下滑显示隐藏导航栏------------- */
    .navOn {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		transition: all 0.2s ease-in-out 0.2s;
		transform: translateZ(0);
	}
	.navOff {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		transition: all 0.2s ease-in-out 0.2s;
		transform: translate3d(0,-100%,0);
	}
    /* -------------屏幕滚动上下滑显示隐藏导航栏------------- */
</style>
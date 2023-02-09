<template>
  <div id="app">
    <transition :name="transitionName" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

  export default {
    name: 'App',
    components:{
    },
    data() {
      return {
        transitionName: ''
      };
    },
    watch: {
      //使用watch 监听$router的变化
      $route(to, from) {
        //如果to索引大于from索引,判断为前进状态,反之则为后退状态
        console.log(to, "to");
        console.log(from, "from");
        if (to.meta.index > from.meta.index) {
          //设置动画名称
          //this.transitionName = "slide-left";
          this.transitionName = "slide-up";
        }
      },
    },
  }
</script>

<style>
  #app{
    height: 100%;
    overflow: hidden;
  }
  html,body{
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }
  .slide-right-enter-active, .slide-right-leave-active, .slide-left-enter-active, .slide-left-leave-active, .slide-up-enter-active, .slide-up-leave-active {
    will-change: transform;
    transition: all 500ms;
  }
  /* 右滑初始装状态 */
  .slide-right-enter {
    /* // opacity: 0; */
    transform: translate3d(-100%, 0, 0);
  }
  /* 右滑执行状态 */
  .slide-right-leave-active {
    /* // opacity: 0; */
    transform: translate3d(100%, 0, 0);
  }
  /* // 右滑最终状态 */
  .slide-right-enter-to{
    /* // opacity: 1; */
    transform: translate3d(0, 0, 0);
  }
  /* // 左滑初始装状态 */
  .slide-left-enter {
    /* // opacity: 0; */
    transform: translate3d(100%, 0, 0);
  }
  /* // 左滑执行状态 */
  .slide-left-leave-active {
    /* // opacity: 0; */
    transform: translate3d(-100%, 0, 0);
  }
  /* // 左滑最终状态 */
  .slide-right-enter-to{
    /* // opacity: 1; */
    transform: translate3d(0, 0, 0);
  }
  /* // 上滑初始装状态 */
  .slide-up-enter {
    /* opacity: 0; */
    transform: translate3d(0, 100%, 0);
  }
  /* // 上滑执行状态 */
  .slide-up-leave-active {
    /* opacity: 0.5; */
    transform: translate3d(0, -100%, 0);
  }
  /* // 上滑最终状态 */
  .slide-up-enter-to{
    /* opacity: 1; */
    transform: translate3d(0, 0, 0);
  }
</style>

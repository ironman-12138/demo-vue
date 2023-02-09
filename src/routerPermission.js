import router from "./router";

// 路由判断登录 根据路由配置文件的参数
router.beforeEach((to, from, next) => {

  console.log(to.matched.some(record => record.meta.requiresAuth));
  if (to.matched.some(record => record.meta.requiresAuth)) { // 判断该路由是否需要登录权限
    
    const token = localStorage.getItem("token")
    console.log("------------" + token)

    if (token) { // 判断当前的token是否存在 ； 登录存入的token
      if (to.path === '/Login') {

      } else {
        next()
      }
    } else {
      next({
        path: '/Login'
      })
    }
  } else {
    next()
  }
})
 
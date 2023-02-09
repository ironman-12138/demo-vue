<template>
   <div id="app">
     <CircleMenu :menus="menus" />
   </div>
 </template>
 
 <script>
 import CircleMenu from "../components/CircleMenu.vue";
 
 export default {
   name: "menu",
   components: {
      CircleMenu,
   },
   data() {
     return {
       menus: [
         {
           name: "测试菜单1",
           desc:
             "测试菜单1说明测试菜单1说明测试菜单1说明测试菜单1说明测试菜单1说明测试菜单1说明测试菜单1说明测试菜单1说明测试菜单1说明",
         },
         {
           name: "测试菜单2",
           desc: "测试菜单2说明测试菜单2说明测试菜单2说明测试菜单2说明测试菜单2说明测试菜单2说明",
         },
         {
           name: "测试菜单3",
           desc: "测试菜单3说明",
         },
         {
           name: "测试菜单4",
           desc: "测试菜单4说明测试菜单4说明测试菜单4说明",
         },
         { 
            name: "测试菜单5", 
            desc: "测试菜单5说明说明" },
         {
           name: "测试菜单6",
           desc: "测试菜单啦啦啦啦",
         },
         { 
           name: "测试菜单7", 
           desc: "测试菜单7说明" },
       ],
     };
   },
 };
 </script>
 
 <style>
 #app {
   height: 100%;
   margin: 0px;
   padding: 0px;
   font-family: "Avenir", Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   overflow: hidden;
   background-color: #5c6070;
 }
 </style>
 
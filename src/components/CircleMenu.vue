<template>
    <div class="overall">
      <div class="description">
        <h1 class="desc-title">{{ descTitle }}</h1>
        <div class="desc-content">
          <span>{{ descContent }}</span>
        </div>
      </div>
      <div class="circle-box">
        <div class="circle" :style="`width:${circle_w}px;height:${circle_h}px`">
          <div
            class="origin"
            :style="`width:${box_w}px;height:${box_h}px;transform: rotate(${stard}deg);`"
          >
            <div
              :style="`width:${box_w}px;height:${box_h}px;transform: rotate(${-stard}deg);`"
              class="img-box"
              v-for="(item, index) in menus"
              :key="index"
              @click="Turn(index)"
            >
              <div class="box">
                <div class="content">{{ item.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ["menus"], //菜单数据
    data() {
      return {
        circle_w: window.innerHeight, //圆盘的宽
        circle_h: window.innerHeight, //圆盘的高
        box_w: 300, //圆盘上覆盖的小圆点宽
        box_h: 300, //圆盘上覆盖的小圆点高
        PI: 200, //分布角度，默认为360deg
        stard: 90, //起始角度
        stard_s: null, //用来默认储存第一个初始值
        boxNum: 6, //圆盘上覆盖的小圆点个数
        descTitle: "", //模块描述标题
        descContent: "", //模块描述内容
        activeIndex: 0, //默认下标
      };
    },
    created() {
      this.stard_s = this.stard;
    },
  
    mounted() {
      this.init();
      this.Turn(this.activeIndex);
    },
    methods: {
      //初始化小圆点，根据计算使其分布到对应位置
      init() {
        let box = document.querySelectorAll(".img-box");
        let avd = this.PI / box.length; //每一个 img-box 对应的角度
        let ahd = (avd * Math.PI) / 180; //每一个 img-box 对应的弧度
        let radius = this.circle_w / 2; //圆的半径
        for (let i = 0; i < box.length; i++) {
          box[i].style.left = Math.sin(ahd * i) * radius + "px";
          box[i].style.top = Math.cos(ahd * i) * radius + "px";
        }
      },
      //点击相对应小圆点，圆盘进行相对应角度的转动
      Turn(index) {
        let _this = this;
        let bx = document.querySelectorAll(".box");
        _this.stard = index * (_this.PI / _this.menus.length) + _this.stard_s;
        for (let i = 0; i < bx.length; i++) {
          if (i == index) {
            bx[i].classList.add("box-active");
          } else {
            bx[i].classList.remove("box-active");
          }
        }
        this.setDescription(index);
      },
  
      setDescription(index) {
        this.descTitle = this.menus[index].name;
        this.descContent = this.menus[index].desc;
      },
    },
  };
  </script>
  
  <style lang="css">
  .overall {
    width: 100%;
    height: 90%;
    top: 5%;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: #5c6070;
  }
  .description {
    background-color: rgba(119, 137, 125, 0.4);
    width: 60%;
    position: absolute;
    padding: 10px 20px;
    left: 0;
    top: 32%;
    height: 220px;
    z-index: 9999;
    box-shadow: 0 0 10px rgb(0, 0, 0);
    border: 1px solid green;
  }
  .desc-title {
    height: 20%;
    font-size: 32px;
    font-weight: bold;
    text-align: center;
    color: white;
  }
  .desc-content {
    font-size: 18px;
    display: table;
    color: white;
    width: 80%;
    height: 55%;
    margin: auto;
  }
  .desc-content span {
    display: table-cell;
    vertical-align: middle;
    text-indent: 5%;
    line-height: 30px;
  }
  
  .circle-box {
    position: absolute;
    overflow: hidden;
    right: 0;
  }

  .circle {
      transform: scale(0.9);
      width: 100%;
      height: 90%;
      border-radius: 50%;
      box-sizing: border-box;
      border: 1px solid #4d4c4c;
      box-shadow: 0 0 8px #DDD;
      -moz-box-shadow: 0 0 8px #DDD;
      -webkit-box-shadow: 0 0 8px #DDD;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 50%; /**注释----------------此处显示全圆**/
    }

    .origin {
        position: relative;
        transition: 0.5s; /* 控制圆盘的的旋转速率 */
      }

      .img-box {
          user-select: none;
          position: absolute;
          top: 0;
          left: 0;
          transition: none !important;
          pointer-events: none;
          
        }

        .box {
            pointer-events: all !important;
            width: 100%;
            height: 100%;
            transition: 0.3s;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            left: 0;
            top: 0;
            border-radius: 50%;
            transform: scale(0.1);
            cursor: pointer;
            color: white;
            font-size: 40px;
            background: #00b3c7;
            overflow: hidden;
            
          }
          .box-active {
            transition-delay: 0.5s;
            border: 5px solid white;
            transform: scale(1) !important;
            
          }

          .box::before {
              content: "";
              position: absolute;
              top: -2px;
              left: -2px;
              right: -2px;
              bottom: -2px;
              background: #ffffff;
              z-index: -1; /*元素堆叠顺序*/
            }
            /*另一个溢出的盒子，模糊形成光晕效果*/
            .box::after {
              content: "";
              position: absolute;
              top: -2px;
              left: -2px;
              right: -2px;
              bottom: -2px;
              background: #ffffff;
              z-index: -2;
              /*添加模糊滤镜*/
              filter: blur(40px);
            }
            .box::before,
            .box::after {
              /*三色渐变，中间为背景色，融入背景*/
              background: linear-gradient(235deg, #89ff00, #060c21, #00bcd4);
            }
  
            .content {
              opacity: 1;
              font-size: 30px;
              box-sizing: border-box;
              background: #00b3c7 !important;
              color: white;
              text-align: center;
            }

            .box:hover {
              transform: scale(0.3);
            }
            .box:hover .content {
              opacity: 1;
              background: #00b3c7 !important;
              color: white;
            }
            .content {
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              opacity: 0;
            }
  </style>
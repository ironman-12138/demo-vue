<template>
    <div>
      <svg style="background-color: white;" :width='width' :height='height' @mousemove='listener($event)'>
        <a class="fontA" :href="tag.href" v-for='tag in tags'>
          <text :x='tag.x' :y='tag.y' :font-size='20 * (600/(600-tag.z))' :fill-opacity='((400+tag.z)/600)'>{{tag.text}}</text>
        </a>
      </svg>
    </div>
</template>
<script>
    export default {
      name: "word-cloud",
      //数据，宽，高，半径，半径一般位宽高的一半。
      props: ['data','width','height','RADIUS'],
      data() {
        return {
          // width:600,//svg宽度
          // height:600,//svg高度
          tagsNum:0,//标签数量
          // RADIUS:300,//球的半径
          speedX:Math.PI/360/1.5,//球一帧绕x轴旋转的角度
          speedY:Math.PI/360/1.5,//球-帧绕y轴旋转的角度
          tags: []
        }
      },
      computed:{
        CX(){//球心x坐标
          return this.width/2;
        },
        CY(){//球心y坐标
          return this.height/2;
        }
      },
      created(){//初始化标签位置
        let tags=[];
        this.tagsNum = this.data.length
        for(let i =0;i<this.data.length;i++){
          let tag = {};
          let k = -1 + (2 * (i + 1) - 1) / this.tagsNum;
          let a = Math.acos(k);
          let b = a * Math.sqrt(this.tagsNum * Math.PI)//计算标签相对于球心的角度
          tag.text = this.data[i];
          tag.x = this.CX +  this.RADIUS * Math.sin(a) * Math.cos(b);//根据标签角度求出标签的x,y,z坐标
          tag.y = this.CY +  this.RADIUS * Math.sin(a) * Math.sin(b);
          tag.z = this.RADIUS * Math.cos(a);
          // tag.href = 'https://imgss.github.io';//给标签添加链接
          tags.push(tag);
          console.log(tag)
        }
        this.tags = tags;//让vue替我们完成视图更新
      },
      methods:{
        //取消纵向移动，以后可以加在props参数里面
        rotateX(angleX){
          // var cos = Math.cos(angleX);
          // var sin = Math.sin(angleX);
          // for(let tag of this.tags){
          //   var y1 = (tag.y- this.CY) * cos - tag.z * sin  + this.CY;
          //   var z1 = tag.z * cos + (tag.y- this.CY) * sin;
          //   tag.y = y1;
          //   tag.z = z1;
          // }
        },
        rotateY(angleY){
          var cos = Math.cos(angleY);
          var sin = Math.sin(angleY);
          for(let tag of this.tags){
            var x1 = (tag.x - this.CX) * cos - tag.z * sin + this.CX;
            var z1 = tag.z * cos + (tag.x - this.CX) * sin;
            tag.x = x1;
            tag.z = z1;
          }
        },
        listener(e){
          console.log(e, "wwwwww")
        }
      },
      mounted() {
        setInterval(() => {
          this.rotateX(this.speedX);
          this.rotateY(this.speedY);
        }, 17)
      },
    };
</script>
  
  
<style scoped>
    .fontA{
      fill: #2abeec;
      font-weight: bold;
      font-family: Apple LiGothic Medium;
    }
    .fontA:hover{
      fill: rgb(0, 84, 163);
      cursor: pointer;
    }
</style>
  
  
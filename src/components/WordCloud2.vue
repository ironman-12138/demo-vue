<template>
    <div>
        <div
            class="j-word-cloud"
            :style="'min-height:' + height + 'px;width:' + width + 'px;'"
        >
            <span
                v-for="(item, index) in showTextList"
                :key="index"
                :id="'word-' + index"
                :style="getStyle(item, index)"
            >
                {{ item.text }}
            </span>
        </div>
    </div>
</template> 

<script>
export default {
    name: "JWordCloud",
    props: {
        textList: {
            type: Array,
            default: () => {
                return [
                    { text: "单词", freq: 10 },
                    { text: "单词1", freq: 5 },
                    { text: "单词2", freq: 7 },
                    { text: "单词3", freq: 2 },
                    { text: "单词5", freq: 3 },
                    { text: "单词6", freq: 4 },
                    { text: "单词7", freq: 5 },
                    { text: "单词8", freq: 6 },
                    { text: "单词9", freq: 6 },
                    { text: "单词10", freq: 8 },
                    { text: "单词11", freq: 4 },
                    { text: "单词12", freq: 2 },
                    { text: "单词13", freq: 4 },
                    { text: "单词14", freq: 3 },
                    { text: "单词15", freq: 1 },
                    { text: "单词16", freq: 5 }
                ];
            }
        },
        width: {
            type: Number,
            default: 300
        },
        colorList: {
            type: Array,
            default: () => []
        },
        baseSize: {
            type: Number,
            default: 2
        },
        maxSize: {
            type: Number,
            default: 5
        },
        minSize: {
            type: Number,
            default: 1
        },
        transformDeg: {
            type: Array,
            default: () => {
                return [-45, 45];
            }
        }
    },
    data() {
        return {
            maxFreq: 0,
            minFreq: 0,
            showTextList: [],
            pointList: [],
            height: 200
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.initData();
            this.comShowtexList();
            this.getFourPoints();
        },
        //组合样式
        getStyle(item, index) {
            const height = parseFloat(item.size) * 16;
            const width = parseFloat(item.size) * 20 * item.text.length;
            let res = "";
            res += "font-size:" + item.size + ";";
            // res += "position: absolute;";
            res += "float: left;";
            // res +=
            //     "top:" +
            //     Math.max(0, Math.min(item.point.y, this.width - width)) +
            //     "px;";
            // res +=
            //     "left:" +
            //     Math.max(0, Math.min(item.point.x, this.height - height)) +
            //     "px;";
            res += "color:" + item.color + ";";
            // res += "transform:rotate(" + item.deg + "deg);";
            return res;
        },
        //计算旋转后的坐标
        getTransformPoint(x, y, deg) {
            deg = parseFloat(deg);
            let rx = (Math.cos(deg * Math.PI) / 180) * x,
                ry = (Math.sin(deg * Math.PI) / 180) * x;
            return { tx: x + rx, ty: y + ry };
        },
        //随机获取坐标
        getRandomPoint() {
            const width = this.width,
                height = this.height,
                pointList = this.pointList,
                showTextList = this.showTextList;
            const x = this.getRandomNum(0, width - 20),
                y = this.getRandomNum(0, height - 20);
            return { x: x, y: y };
        },
        //随机获取颜色
        getRandomColor() {
            let colorList = ['#ca90e1', '#fdc9a4', '#ae99e5', '#2ab8e6', '#f4605f', '#55cad6', '#5acbd7', '#cfd5df', '#718ff8', '#fd7a31']
            let res = colorList[this.getRandomNum(0, 9)];
            return res;
        },
        //随机获取角度
        getRandomdeg() {
            let res = "";
            res += this.getRandomNum(
                this.transformDeg[0],
                this.transformDeg[1]
            );
            return res;
        },
        //获取随机数
        getRandomNum(minN, maxN) {
            return Math.floor(Math.random() * (maxN - minN + 1) + minN);
        },
        //初始化
        initData() {
            const textList = this.textList;
            let maxF = textList[0].freq,
                minF = textList[0].freq;
            textList.map(item => {
                maxF = Math.max(maxF, item.freq);
                minF = Math.min(minF, item.freq);
            });
            this.maxFreq = maxF;
            this.minFreq = minF;
        },
        //通过词频计算字体大小
        getSize(freq) {
            const baseSize = (this.maxSize + this.minSize) / 2;
            const addSize =
                ((this.maxSize - this.minSize) * (freq - this.minFreq)) /
                (this.maxFreq - this.minFreq);
            return (
                ((this.minSize + addSize) / baseSize) * this.baseSize + "rem"
            );
        },
        //获取四个顶点坐标
        getFourPoints() {
            this.$nextTick(() => {
                let showTextList = this.showTextList;
                let newHeight = 0;
                for (let i = 0; i < showTextList.length; i++) {
                    let id = "word-" + i;
                    let dom = document.getElementById(id);
                    let tl = { x: dom.offsetLeft, y: dom.offsetTop };
                    let tr = {
                        x: dom.offsetLeft + dom.offsetWidth,
                        y: dom.offsetTop
                    };
                    let bl = {
                        x: dom.offsetLeft,
                        y: dom.offsetTop + dom.offsetHeight
                    };
                    let br = {
                        x: dom.offsetLeft + dom.offsetWidth,
                        y: dom.offsetTop
                    };
                    newHeight = Math.max(newHeight, bl.y);
                    showTextList[i].fourPoints = {
                        tl: tl,
                        tr: tr,
                        bl: bl,
                        br: br
                    };
                }
                this.height = newHeight;
            });
        },
        //组装显示列表属性数据
        comShowtexList() {
            let showTextList = [];
            this.textList.map(item => {
                let temp = item;
                temp.size = this.getSize(item.freq);
                const point = this.getRandomPoint();
                const color = this.getRandomColor();
                const deg = this.getRandomdeg();
                this.pointList.push(point);
                temp.point = point;
                temp.color = color;
                temp.deg = deg;
                showTextList.push(temp);
            });
            showTextList = showTextList.sort((a, b) => {
                return 0.5 - Math.random();
            });
            this.showTextList = showTextList;
        }
    }
};
</script>

<style scoped>
    .j-word-cloud {
        /* border: 1px solid black; */
        position: relative;
        
    }
    .j-word-cloud span {
        transform-origin: 0 0;
        padding: 0.1rem;
        margin: 0 auto;
    }
</style>


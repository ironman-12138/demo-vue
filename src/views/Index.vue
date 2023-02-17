<template>
    <div id="app">
        <Header></Header>
        
        <div style="height: 6rem;"></div>

        <div class="index">
            <div class="index-content">
                <div class="index-left">
                    <div v-for="(item, index) in dataList">
                        <div class="data" @click="viewBlog(item.id)">
                            <img :src="item.img" />
                            <div class="article">
                                <div class="article-title">{{ item.title }}</div>
                                <div class="article-content">{{ item.content }}</div>
                                <div class="article-info">
                                    <span>{{ item.createTime }}</span>
                                    <span class="article-info-svg" v-if="!item.praise" @click.stop="praise(item, 1)"><svg-icon iconClass="dianzan"></svg-icon></span>
                                    <span class="article-info-svg" v-else @click.stop="praise(item, 0)"><svg-icon iconClass="dianzan-after"></svg-icon></span>
                                    <span class="article-info-svg" v-if="!item.collect" @click.stop="collect(item, 1)"><svg-icon iconClass="shoucang"></svg-icon></span>
                                    <span class="article-info-svg" v-else @click.stop="collect(item, 0)"><svg-icon iconClass="shoucang-after"></svg-icon></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="index-right">
                    <!-- <WordCloud :data="wordData" :width="wordWidth" :height="wordHeight" :RADIUS="wordRadius"/> -->
                    <div class="index-right-word">
                        <WordCloud2 :textList="wordData" :callback="getWord"/>
                    </div>

                    <div class="index-right-hot">
                        <div class="index-right-hot-title">热点榜</div>
                        <div v-for="(item, index) in hotList" class="index-right-hot-data">
                            <el-tooltip effect="light" placement="bottom">
                                <div slot="content">{{ item.title }}</div>
                                <span class="index-right-hot-data-title">{{ item.title }}</span>
                            </el-tooltip>
                            <span class="index-right-hot-data-num"><i class="el-icon-edit"></i>{{ item.praiseNum }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Header from "../components/Header.vue";
    import WordCloud from "../components/WordCloud.vue";
    import WordCloud2 from "../components/WordCloud2.vue";
    export default {
        name: 'Index',
        components: {
            Header,
            WordCloud,
            WordCloud2
        },
        data() {
            return {
                dataList: [
                    {id: 1, img: 'https://i.postimg.cc/PfRvXRxC/image.png', title: '全自动灰度服务搭建和发布实战 | SpringCloudGateway + Nacos + GitlabRunner', content: '文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容', createTime: '2022-12-06 12:12:32', praise: true, collect: true},
                    {id: 2, img: 'https://i.postimg.cc/PfRvXRxC/image.png', title: '标题2', content: '文章内容。。。。。。。。。。。。。。。。。。。。。。。', createTime: '2022-12-02 12:12:32', praise: true, collect: false},
                    {id: 3, img: 'https://i.postimg.cc/PfRvXRxC/image.png', title: '标题3', content: '文章内容。。。。。。。。。。。。。。。。。。。。。。。', createTime: '2022-12-01 08:12:32', praise: false, collect: false},
                    {id: 4, img: 'https://i.postimg.cc/PfRvXRxC/image.png', title: '标题4', content: '文章内容。。。。。。。。。。。。。。。。。。。。。。。', createTime: '2022-11-22 11:12:32', praise: false, collect: true},
                    {id: 5, img: 'https://i.postimg.cc/PfRvXRxC/image.png', title: '标题5', content: '文章内容。。。。。。。。。。。。。。。。。。。。。。。', createTime: '2022-11-08 12:12:32', praise: false, collect: false},
                    {id: 6, img: 'https://i.postimg.cc/PfRvXRxC/image.png', title: '标题6', content: '文章内容。。。。。。。。。。。。。。。。。。。。。。。', createTime: '2022-11-06 12:12:32', praise: false, collect: false},
                    {id: 7, img: 'https://i.postimg.cc/PfRvXRxC/image.png', title: '标题7', content: '文章内容。。。。。。。。。。。。。。。。。。。。。。。', createTime: '2022-11-01 16:12:32', praise: false, collect: false},
                    {id: 8, img: 'https://i.postimg.cc/PfRvXRxC/image.png', title: '标题8', content: '文章内容。。。。。。。。。。。。。。。。。。。。。。。', createTime: '2022-10-01 12:12:32', praise: false, collect: true},
                    {id: 9, img: 'https://i.postimg.cc/PfRvXRxC/image.png', title: '标题9', content: '文章内容。。。。。。。。。。。。。。。。。。。。。。。', createTime: '2022-09-01 12:12:32', praise: false, collect: false},
                    {id: 10, img: 'https://i.postimg.cc/PfRvXRxC/image.png', title: '标题10', content: '文章内容。。。。。。。。。。。。。。。。。。。。。。。', createTime: '2022-09-01 12:12:32', praise: false, collect: false},
                    {id: 11, img: 'https://i.postimg.cc/PfRvXRxC/image.png', title: '标题11', content: '文章内容。。。。。。。。。。。。。。。。。。。。。。。', createTime: '2022-08-01 12:12:32', praise: false, collect: false},
                    {id: 12, img: 'https://i.postimg.cc/PfRvXRxC/image.png', title: '标题12', content: '文章内容。。。。。。。。。。。。。。。。。。。。。。。', createTime: '2022-07-01 12:12:32', praise: false, collect: false}
                ],
                wordData: [
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
                ],
                hotList: [
                    {title: "前端 UI 组件库有哪些选择", praiseNum: 1203},
                    {title: "全自动灰度服务搭建和发布实战 | SpringCloudGateway + Nacos + GitlabRunner", praiseNum: 1032},
                    {title: "浅谈TheadLocal的使用场景和注意事项", praiseNum: 1029},
                    {title: "前端 UI 组件库有哪些选择", praiseNum: 823},
                    {title: "前端 UI 组件库有哪些选择", praiseNum: 821},
                    {title: "前端 UI 组件库有哪些选择", praiseNum: 736},
                    {title: "前端 UI 组件库有哪些选择", praiseNum: 532},
                    {title: "前端 UI 组件库有哪些选择", praiseNum: 489},
                    {title: "前端 UI 组件库有哪些选择", praiseNum: 423},
                    {title: "前端 UI 组件库有哪些选择", praiseNum: 411},
                ],
                wordWidth: 400,
                wordHeight: 200,
                wordRadius: 60
            }
        },
        methods: {
            /**
             * 子组件传参父组件接收
             * @param {*} childrenData 子组件传递过来的参数
             */
            getWord(childrenData) {
                // childrenData就是子组件传递过来的参数
                console.log(childrenData)
            },

            /**
             * 进入blog详情页
             * @param {*} id blog文章id
             */
            viewBlog(id) {
                this.$router.push({ path: '/blogView', query: {id: id}});
            },

            /**
             * 点赞
             * @param {*} item 数据
             * @param {*} type 1：点赞，0：取消点赞
             */
            praise(item, type) {
                item.praise = (type == 1 ? true : false);
            },

            /**
             * 收藏
             * @param {*} item 数据
             * @param {*} type 1：收藏，0：取消收藏
             */
            collect(item, type) {
                item.collect = (type == 1 ? true : false);
            }
        },
        created() {
        }
    }
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
    }
    .index {
        height: 100%;
        max-width: 960px;
        margin: auto;
    }
    .index-content {
        display: flex;
        justify-content: space-between;
    }
    .index-left {
        width: 80%;
        margin-right: 100px;
    }
    .index-right-word {
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        padding: 10px 10px 10px 10px;
    }
    .index-right-hot {
        margin-top: 20px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 10px;
    }
    .index-right-hot-title {
        font-family: "Lucida Calligraphy", cursive, serif, sans-serif;
        font-size: x-large;
        background-color: rgb(230, 230, 230);
        padding: 10px 10px 10px 10px;
    }
    .index-right-hot-data {
        padding: 10px 10px 10px 10px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        cursor: pointer;
    }
    .index-right-hot-data:hover {
        background-color: rgba(247, 181, 96, 0.5);
    }
    .index-right-hot-data-title {
        display: inline-block;
        width: 200px;
        /* 内容过长显示成省略号（内容显示为一行） */
        white-space: nowrap;/*设置不换行*/
        overflow: hidden; /*设置隐藏*/
        text-overflow: ellipsis; /*设置隐藏部分为省略号*/
    }
    .index-right-hot-data-num {
        float: right;
        right: 1%;
    }
    .data {
        display: flex;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        margin-bottom: 50px;
        cursor: pointer;
    }
    .data:hover {
        box-shadow: 0 5px 5px 0 rgba(0, 0, 0, .25);
        transition: all .2s ease-in-out;
    }
    .article {
        width: 80%;
        height: 150px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 20px;
    }
    .article-title {
        width: 300px;
        font-weight: 600;
        /* 内容过长显示成省略号（内容显示为一行） */
        white-space: nowrap;/*设置不换行*/
        overflow: hidden; /*设置隐藏*/
        text-overflow: ellipsis; /*设置隐藏部分为省略号*/
    }
    .article-content {
        width: 300px;
        /* 内容过长显示成省略号（内容显示为2行） */
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }
    .article-info-svg {
        margin-left: 10px;
        margin-right: 10px;
    }
    .article-info-svg:active {
        animation: beat 1s ease-in-out forwards;
    }
    @keyframes beat {
        0%{
            transform: translate(-50%,-50%) scale(0.5);
            opacity: 0.2;
        }
        50%{
            transform: translate(-50%,-50%) scale(1);
            opacity: 0.8;
        }
        100%{
            transform: translate(-50%,-50%) scale(1.1);
            opacity: 1;
        }
    }
</style>
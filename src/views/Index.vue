<template>
    <div id="app">
        <Header></Header>
        
        <div style="height: 6rem;"></div>

        <div class="index">
            <div class="index-content">
                <div class="index-left">
                    <div v-for="(item, index) in dataList">
                        <div class="data">
                            <img :src="item.img" />
                            <div class="article">
                                <div class="article-title">{{ item.title }}</div>
                                <div class="article-content">{{ item.content }}</div>
                                <div class="article-info">{{ item.createTime }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="index-right">
                    <!-- <WordCloud :data="wordData" :width="wordWidth" :height="wordHeight" :RADIUS="wordRadius"/> -->
                    <WordCloud2 :textList="wordData"/>
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
                    {id: 1, img: 'https://i.postimg.cc/PfRvXRxC/image.png', title: '标题1', content: '文章内容。。。。。。。。。。。。。。。。。。。。。。。', createTime: '2022-12-06 12:12:32'},
                    {id: 2, img: 'https://i.postimg.cc/PfRvXRxC/image.png', title: '标题2', content: '文章内容。。。。。。。。。。。。。。。。。。。。。。。', createTime: '2022-12-02 12:12:32'},
                    {id: 3, img: 'https://i.postimg.cc/PfRvXRxC/image.png', title: '标题3', content: '文章内容。。。。。。。。。。。。。。。。。。。。。。。', createTime: '2022-12-01 08:12:32'},
                    {id: 4, img: 'https://i.postimg.cc/PfRvXRxC/image.png', title: '标题4', content: '文章内容。。。。。。。。。。。。。。。。。。。。。。。', createTime: '2022-11-22 11:12:32'},
                    {id: 5, img: 'https://i.postimg.cc/PfRvXRxC/image.png', title: '标题5', content: '文章内容。。。。。。。。。。。。。。。。。。。。。。。', createTime: '2022-11-08 12:12:32'},
                    {id: 6, img: 'https://i.postimg.cc/PfRvXRxC/image.png', title: '标题6', content: '文章内容。。。。。。。。。。。。。。。。。。。。。。。', createTime: '2022-11-06 12:12:32'},
                    {id: 7, img: 'https://i.postimg.cc/PfRvXRxC/image.png', title: '标题7', content: '文章内容。。。。。。。。。。。。。。。。。。。。。。。', createTime: '2022-11-01 16:12:32'},
                    {id: 8, img: 'https://i.postimg.cc/PfRvXRxC/image.png', title: '标题8', content: '文章内容。。。。。。。。。。。。。。。。。。。。。。。', createTime: '2022-10-01 12:12:32'},
                    {id: 9, img: 'https://i.postimg.cc/PfRvXRxC/image.png', title: '标题9', content: '文章内容。。。。。。。。。。。。。。。。。。。。。。。', createTime: '2022-09-01 12:12:32'},
                    {id: 10, img: 'https://i.postimg.cc/PfRvXRxC/image.png', title: '标题10', content: '文章内容。。。。。。。。。。。。。。。。。。。。。。。', createTime: '2022-09-01 12:12:32'},
                    {id: 11, img: 'https://i.postimg.cc/PfRvXRxC/image.png', title: '标题11', content: '文章内容。。。。。。。。。。。。。。。。。。。。。。。', createTime: '2022-08-01 12:12:32'},
                    {id: 12, img: 'https://i.postimg.cc/PfRvXRxC/image.png', title: '标题12', content: '文章内容。。。。。。。。。。。。。。。。。。。。。。。', createTime: '2022-07-01 12:12:32'}
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
                wordWidth: 400,
                wordHeight: 200,
                wordRadius: 60
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
    .data {
        display: flex;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        margin-bottom: 10px;
    }
    .article {
        width: 80%;
        height: 150px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
</style>
<template>
    <div class="blogView">
        <Header></Header>
        
        <h4>{{ blog.title }}</h4>
        <br>
        <div class="blogView-info">
            <el-avatar :size="35" :src="blog.authorImg"></el-avatar>
            <div class="blogView-info-format">
                <div class="blogView-info-author">{{ blog.author }}</div>
                <div>{{ blog.createTime }}</div>
            </div>
        </div>
        <br>
        <div class="split-line"></div>
        <br>
        <mavon-editor
            v-model="blog.content"
            :ishljs="true"
            default-open="preview"
            :editable="false"
            :subfield="false" 
            :toolbarsFlag="false"
        />
        <!-- <div v-html="blog.content"></div> -->
    </div>
</template>

<script>
    import Header from "../components/Header.vue";
    export default {
        name: 'BlogView',
        components: {
            Header
        },
        data() {
            return {
                blog: {
                    title: "标题",
                    content: "",
                    imgUrl: "",
                    tag: ['标签一', '标签二', '标签三'],
                    open: true,
                    createTime: '2023-2-15 12:21:45',
                    author: 'xCoder',
                    authorImg: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
                },
            };
        },
        methods: {
            readFile(filePath){
                // 创建一个新的xhr对象
                let xhr = null, okStatus = document.location.protocol === 'file' ? 0 : 200
                xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')      
                xhr.open('GET', filePath, false)
                xhr.overrideMimeType('text/html;charset=utf-8')
                xhr.send(null)
                return xhr.status === okStatus ? xhr.responseText : null
            }
        },
        created() {
            if (this.$route.query.id) {
                console.log(this.$route.query.id, "id");
            }
            this.$nextTick(function () {
                this.blog.content = this.readFile('http://develop-static.zhihuipk.com/1676623648712=-=111.txt');
                console.log(this.blog.content);
            })
        }
    }
</script>
<style scoped>
    .blogView {
        max-width: 960px;
        margin: auto;
    }
    .blogView-info {
        display: flex;
        align-items: center;
        color: #3b3b3b;
        opacity: 0.8;
    }
    .blogView-info-author {
        margin-right: 10px;
    }
    .blogView-info-format {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 10px;
    }
    .split-line {
        border: 0;
		border-top: 1px solid #d0d0d5;
    }
</style>
<template>
    <div class="blogEdit">
        <div class="kuang">
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
        </div>

        <Header></Header>

        <div style="height: 6rem;"></div>

        <div class="blogEdit-base">
            <h4 style="width: 50px;">标题:</h4><el-input v-model="blog.title" placeholder="请输入标题"></el-input>
        </div>
        <br>
        <div class="mavonEditor">
            <mavon-editor style="height: 600px" :toolbars="markdownOption" v-model="blog.content" ref="md" @save="$save"/>
        </div>
        <br>
        <div class="blogEdit-base">
            <h4>封面:</h4>
            <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="blog.imgUrl" :src="blog.imgUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </div>
        <br>
        <div class="blogEdit-base">
            <h4>文章标签:</h4>
            <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加文章标签</el-button>
            <el-tag
                :key="tag"
                v-for="tag in blog.tag"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)">
                {{tag}}
            </el-tag>
        </div>
        <br>
        <div class="blogEdit-base">
            <h4>发布形式:</h4>
            <div class="blogEdit-open">
                <el-radio v-model="blog.open" label=ture>公开</el-radio>
                <el-radio v-model="blog.open" label=false>私有</el-radio>
            </div>
        </div>
        <br>
        <div class="blogEdit-button">
            <el-button type="primary" plain round @click="staging">暂存</el-button>
            <el-button type="primary" round @click="release">发布</el-button>
        </div>
    </div>
</template>
<script>
    import { saveAs } from 'file-saver';
    import Header from "../components/Header.vue";
    export default {
        components: {
            Header
        },
        data() {
            return {
                markdownOption: {
                    bold: true, // 粗体
                    italic: true, // 斜体
                    header: true, // 标题
                    underline: true, // 下划线
                    strikethrough: true, // 中划线
                    mark: true, // 标记
                    superscript: true, // 上角标
                    subscript: true, // 下角标
                    quote: true, // 引用
                    ol: true, // 有序列表
                    ul: true, // 无序列表
                    link: true, // 链接
                    imagelink: true, // 图片链接
                    code: true, // code
                    table: true, // 表格
                    fullscreen: true, // 全屏编辑
                    readmodel: true, // 沉浸式阅读
                    htmlcode: true, // 展示html源码
                    help: true, // 帮助
                    /* 1.3.5 */
                    undo: true, // 上一步
                    redo: true, // 下一步
                    trash: true, // 清空
                    save: true, // 保存（触发events中的save事件）
                    /* 1.4.2 */
                    navigation: true, // 导航目录
                    /* 2.1.8 */
                    alignleft: true, // 左对齐
                    aligncenter: true, // 居中
                    alignright: true, // 右对齐
                    /* 2.2.1 */
                    subfield: true, // 单双栏模式
                    preview: true, // 预览
                },
                uploadUrl: "",
                blog: {
                    title: "",
                    content: "",
                    imgUrl: "",
                    tag: ['标签一', '标签二', '标签三'],
                    open: true
                },
                inputVisible: false,
                inputValue: ''
            };
        },
        methods: {
            /**
             * markdown保存
             * @param {*} value 
             * @param {*} render 
             */
            $save(value, render) {
                console.log(value, "value");
                console.log(render, "render");
            },

            /**
             * 封面上传成功
             * @param {*} res 
             * @param {*} file 
             */
            handleAvatarSuccess(res, file) {
                console.log(file);
            },
            /**
             * 封面上传前验证
             * @param {*} file 
             */
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                this.$message.error('上传图片只能是 JPG/PNG 格式!');
                }
                if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            handleClose(tag) {
                this.blog.tag.splice(this.blog.tag.indexOf(tag), 1);
            },

            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.blog.tag.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },

            staging() {
                let strData = new Blob([this.blog.content], { type: 'text/plain;charset=utf-8' });
                saveAs(strData, "blog下载.txt");
                this.$message({
                    message: '暂存成功',
                    type: 'success'
                });
            },
            release() {
                console.log(this.$refs.md.d_render); //html
                console.log(this.blog.content);
                this.$message({
                    message: '发布成功',
                    type: 'success'
                });
                this.$router.push({ path: '/blogView'});
            }
        }
    };
</script>
  
<style scoped>
    .blogEdit {
        max-width: 960px;
        margin: auto;
    }
    .mavonEditor {
        width: 100%;
        height: 100%;
    }
    .blogEdit-base {
        display: flex;
        align-items: center;
    }
    .avatar-uploader {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: 178px;
        height: 88px;
        margin-left: 10px;
    }
    .avatar-uploader:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 88px;
        line-height: 88px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    .blogEdit-open {
        margin-left: 10px;
    }
    .blogEdit-button {
        float: right;
        right: 1%;
        margin-bottom: 20px;
    }
    /* --------------------气泡上浮背景-------------------- */
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .kuang{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -10;
        background-image: linear-gradient(180deg,rgb(255, 255, 255));
    }
    .bubble{
        position: absolute;
        border-radius: 50%;
        border: 2px solid #6abdee;
        box-shadow: inset 0 0 8px  #fff;
        animation: flutter 10s infinite;
        opacity: 0;
    }
    @keyframes flutter {
        0%{
            transform: translateX(0);
            bottom: -100px;
            opacity: 1;
        }
        50%{
            transform: translateX(100px);
            opacity: 0.5;
        }

        
        100%{
            transform: translateX(0px);
            bottom: 100%;
            opacity: 0;

        }
    }
    .bubble:nth-child(1){
        left: -10%;
        width: 50px;
        height: 50px; 
        animation-duration: 9s;
        animation-delay: 0.1s;
    }
    .bubble:nth-child(2){
        left: 15%;
        width: 20px;
        height: 20px;
        animation-duration: 6s;
        animation-delay: 1.5s;

    }
    .bubble:nth-child(3){
        left: 20%;
        width: 60px;
        height: 60px;
        animation-duration: 10s;
        


    }
    .bubble:nth-child(4){
        left: 30%;
        width: 30px;
        height: 30px;
        animation-duration: 5.5s;
        animation-delay: 1.5s;

    }
    .bubble:nth-child(5){
        left: 40%x;
        width: 50px;
        height: 50px;
        animation-duration: 12s;
        


    }
    .bubble:nth-child(6){
        left: 50%;
        width: 20px;
        height: 20px;
        animation-duration: 6s;
        animation-delay: 1s;

    }
    .bubble:nth-child(7){
        left: 60%;
        width: 40px;
        height: 40px;
        animation-duration: 8s;
        animation-delay: 1s;

    }
    .bubble:nth-child(8){
        left: 65%;
        width: 60px;
        height: 60px;
        animation-duration: 15s;
        
    }
    .bubble:nth-child(9){
        left: 80%;
        width: 55px;
        height: 55px;
        animation-duration: 9s;
        animation-delay: 0.5s;
        
    }
    .bubble:nth-child(10){
        left: 100%;
        width: 40px;
        height: 40px;
        animation-duration: 12s;

    }
    /* --------------------气泡上浮背景-------------------- */
    /* --------------------添加文章标签-------------------- */
    .el-tag + .el-tag {
        margin-left: 10px;
    }
    .button-new-tag {
        margin-left: 10px;
        margin-right: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        margin-right: 10px;
        vertical-align: bottom;
    }
    /* --------------------添加文章标签-------------------- */
</style>
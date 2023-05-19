<template>
    <div>
        <el-button type="primary" plain @click="drawer = true">代码</el-button>
        <el-divider></el-divider>
        <el-drawer
            title="代码"
            :size="1000"
            append-to-body
            :visible.sync="drawer"
            :direction="direction"
            :before-close="handleClose">
            <Code :readFileUrl="readFileUrl"></Code>
        </el-drawer>


        <h2>切片上传拖拽</h2>
        <div>
            <Oss @callFatherData="callFatherData"></Oss>
            <div>
                <div v-for="(item, index) in fileList" :key="index">
                    <span class="fileName">{{ item.name }}</span>
                    <i class="el-icon-delete" @click="deleteFile(index)" style="cursor: pointer;"></i>
                </div>
            </div>
        </div>
        <h2>按钮切片上传</h2>
        <div>
            <Oss :drag="false" @callFatherData="callFatherData_V2"></Oss>
            <div>
                <div v-for="(item, index) in fileListV2" :key="index">
                    <span class="fileName">{{ item.name }}</span>
                    <i class="el-icon-delete" @click="deleteFileV2(index)" style="cursor: pointer;"></i>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Oss from "@/components/library/Oss";
    import Code from "@/components/library/Code";
    export default {
        name: 'Test',
        data() {
            return {
                fileList: [
                    {name: "测试.docx", url:"xxxxxxxxxxx"},
                    {name: "xxxxxxxxxxx项目合同2020012911.docx", url:"xxxxxxxxxxx"}
                ],
                fileListV2: [
                    {name: "测试.docx", url:"xxxxxxxxxxx"},
                    {name: "xxxxxxxxxxx项目合同2020012911.docx", url:"xxxxxxxxxxx"}
                ],

                drawer: false,
                direction: 'rtl',
                // readFileUrl: "http://quzhoucity.oss-cn-hangzhou.aliyuncs.com/sliceFile/1684484838619-Oss.vue"
                readFileUrl: "http://quzhoucity.oss-cn-hangzhou.aliyuncs.com/sliceFile/1684488647899-test.txt"
            };
        },
        components: {
            Oss,
            Code
        },
        methods: {
            callFatherData(data) {
                console.log("父组件获取到的数据", data);
                this.fileList.push(data);
            },

            callFatherData_V2(data) {
                this.fileListV2.push(data);
            },

            deleteFile(index) {
                this.fileList.splice(index, 1);
            },

            deleteFileV2(index) {
                this.fileListV2.splice(index, 1);
            },

            handleClose(done) {
                done();
            }
        },
        created() {
        }
    };
</script>
<style scoped>
    .fileName {
        color: #4d4d4d;
    }
</style>
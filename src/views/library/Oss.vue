<template>
    <div>
        <el-button type="primary" plain @click="drawer = true">组件代码</el-button>
        <el-divider></el-divider>
        <el-drawer
            title="组件代码"
            :size="1000"
            append-to-body
            :visible.sync="drawer"
            :direction="direction"
            :before-close="handleClose">
            <Coding :readFileUrl="readFileUrl"></Coding>
        </el-drawer>


        <h3 style="font-weight: 400;">切片上传拖拽</h3>
        <div style="border: 1px solid rgb(0, 0, 0, 0.1); padding: 10px; border-radius: 10px;">
            <Oss @callFatherData="callFatherData"></Oss>
            <div>
                <div v-for="(item, index) in fileList" :key="index">
                    <span class="fileName">{{ item.name }}</span>
                    <i class="el-icon-delete" @click="deleteFile(index)" style="cursor: pointer;"></i>
                </div>
            </div>
        </div>
        <h3 style="font-weight: 400;">按钮切片上传</h3>
        <div style="border: 1px solid rgb(0, 0, 0, 0.1); padding: 10px; border-radius: 10px;">
            <Oss :drag="false" @callFatherData="callFatherData_V2"></Oss>
            <div>
                <div v-for="(item, index) in fileListV2" :key="index">
                    <span class="fileName">{{ item.name }}</span>
                    <i class="el-icon-delete" @click="deleteFileV2(index)" style="cursor: pointer;"></i>
                </div>
            </div>
        </div>

        <el-collapse accordion @change="handleChange" class="codeText">
            <el-collapse-item>
                <template slot="title">
                    <span style="text-align: center; width: 100%; color: #409eff;">{{codeTitle}}</span>
                </template>
                <pre v-highlight><code class="language-html">{{ codeText }}</code></pre>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script>
    import Oss from "@/components/library/Oss";
    import Coding from "@/components/library/Coding";
    export default {
        name: 'Test',
        data() {
            return {
                fileList: [
                    {name: "测试.docx", url:"xxxxxxxxxxx"},
                    {name: "20230501.docx", url:"xxxxxxxxxxx"}
                ],
                fileListV2: [
                    {name: "测试.docx", url:"xxxxxxxxxxx"},
                    {name: "20230501.docx", url:"xxxxxxxxxxx"}
                ],

                drawer: false,
                direction: 'rtl',
                readFileUrl: "http://quzhoucity.oss-cn-hangzhou.aliyuncs.com/sliceFile/1684737383124-Oss.vue",

                codeTitle: "显示代码",
                codeText: `<h3 style="font-weight: 400;">切片上传拖拽</h3>
<div>
    <Oss @callFatherData="callFatherData"></Oss>
    <div>
        <div v-for="(item, index) in fileList" :key="index">
            <span class="fileName">{{ item.name }}</span>
            <i class="el-icon-delete" @click="deleteFile(index)" style="cursor: pointer;"></i>
        </div>
    </div>
</div>
<h3 style="font-weight: 400;">按钮切片上传</h3>
<div>
    <Oss :drag="false" @callFatherData="callFatherData_V2"></Oss>
    <div>
        <div v-for="(item, index) in fileListV2" :key="index">
            <span class="fileName">{{ item.name }}</span>
            <i class="el-icon-delete" @click="deleteFileV2(index)" style="cursor: pointer;"></i>
        </div>
    </div>
</div>
<script>
    export default {
        data() {
            return {
                fileList: [],
                fileListV2: []
            }
        }
        methods: {
            showDialog() {
                this.$refs.select.showDialog()
            },
            callFatherData(data) {
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
            }
        }
    };
<\/script>`
            };
        },
        components: {
            Oss,
            Coding
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
            },

            handleChange(val) {
                this.codeTitle = val > 0 ? "隐藏代码" : "显示代码"
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
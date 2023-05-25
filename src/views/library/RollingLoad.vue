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
            <Coding :readFileUrl="readFileUrl"></Coding>
        </el-drawer>

        <div style="border: 1px solid rgb(0, 0, 0, 0.1); padding: 10px; border-radius: 10px;">
            <RollingLoad></RollingLoad>
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
    import RollingLoad from "@/components/library/RollingLoad";
    import Coding from "@/components/library/Coding";
    export default {
        name: 'Test',
        data() {
            return {
                drawer: false,
                direction: 'rtl',
                readFileUrl: "http://quzhoucity.oss-cn-hangzhou.aliyuncs.com/sliceFile/1684737103190-RollingLoad.vue",

                codeTitle: "显示代码",
                codeText: `<RollingLoad></RollingLoad>`
            };
        },
        components: {
            RollingLoad,
            Coding
        },
        methods: {
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
    
</style>
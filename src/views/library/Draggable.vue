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

        <div>
            <h3 style="font-weight: 400;">拖拽选择</h3>
            <div style="border: 1px solid rgb(0, 0, 0, 0.1); padding: 10px; border-radius: 10px;">
                <Draggable style="width: 300px;" :list="list" :resultList="resultList"></Draggable>
            </div>
            <h3 style="font-weight: 400;">点击选择</h3>
            <div style="border: 1px solid rgb(0, 0, 0, 0.1); padding: 10px; border-radius: 10px;">
                <Draggable style="width: 300px;" :isFisso="true" :list="listV2" :resultList="resultListV2"></Draggable>
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
    import Draggable from "@/components/library/Draggable";
    import Coding from "@/components/library/Coding";
    export default {
        name: 'Test',
        data() {
            return {
                list: [
                    {id: 1, name: "111"},
                    {id: 2, name: "222"},
                    {id: 3, name: "333"},
                    {id: 4, name: "444"},
                    {id: 5, name: "555"},
                    {id: 6, name: "666"},
                    {id: 7, name: "777"},
                    {id: 8, name: "888"},
                    {id: 9, name: "999"},
                    {id: 10, name: "测试"},
                    {id: 11, name: "内容"},
                    {id: 12, name: "五百元"},
                    {id: 13, name: "文本域拖拽"}
                ],
                resultList: [],
                listV2: [
                    {id: 1, name: "111"},
                    {id: 2, name: "222"},
                    {id: 3, name: "333"},
                    {id: 4, name: "444"},
                    {id: 5, name: "555"},
                    {id: 6, name: "666"},
                    {id: 7, name: "777"},
                    {id: 8, name: "888"},
                    {id: 9, name: "999"},
                    {id: 10, name: "测试"},
                    {id: 11, name: "内容"},
                    {id: 12, name: "五百元"},
                    {id: 13, name: "文本域拖拽"}
                ],
                resultListV2: [{id: 10, name: "测试"}],

                drawer: false,
                direction: 'rtl',
                readFileUrl: "http://quzhoucity.oss-cn-hangzhou.aliyuncs.com/sliceFile/1684737319135-Draggable.vue",

                codeTitle: "显示代码",
                codeText: `<h3 style="font-weight: 400;">切片上传拖拽</h3>
<h3 style="font-weight: 400;">拖拽选择</h3>
<Draggable style="width: 300px;" :list="list" :resultList="resultList"></Draggable>
<h3 style="font-weight: 400;">点击选择</h3>
<Draggable style="width: 300px;" :isFisso="true" :list="listV2" :resultList="resultListV2"></Draggable>
<script>
export default {
    data() {
        return {
            list: [
                {id: 1, name: "111"},
                {id: 2, name: "222"},
                {id: 3, name: "333"},
                {id: 4, name: "444"},
                {id: 5, name: "555"},
                {id: 6, name: "666"},
                {id: 7, name: "777"},
                {id: 8, name: "888"},
                {id: 9, name: "999"},
                {id: 10, name: "测试"},
                {id: 11, name: "内容"},
                {id: 12, name: "五百元"},
                {id: 13, name: "文本域拖拽"}
            ],
            resultList: [],
            listV2: [
                {id: 1, name: "111"},
                {id: 2, name: "222"},
                {id: 3, name: "333"},
                {id: 4, name: "444"},
                {id: 5, name: "555"},
                {id: 6, name: "666"},
                {id: 7, name: "777"},
                {id: 8, name: "888"},
                {id: 9, name: "999"},
                {id: 10, name: "测试"},
                {id: 11, name: "内容"},
                {id: 12, name: "五百元"},
                {id: 13, name: "文本域拖拽"}
            ],
            resultListV2: [{id: 10, name: "测试"}],
        }
    }
};
<\/script>`
            };
        },
        components: {
            Draggable,
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
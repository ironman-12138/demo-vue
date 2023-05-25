<template>
    <div>
        
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

        <h3 style="font-weight: 400;">
            用户和部门同时在左侧
            <el-button style="margin-left: 10px;" type="primary" size="mini" plain @click="getCode(1)">组件代码</el-button>
        </h3>
        <div style="border: 1px solid rgb(0, 0, 0, 0.1); padding: 10px; border-radius: 10px;">
            <Select ref="select" @callFatherData="callFatherData"></Select>
            <el-button type="primary" @click="showDialog()">弹窗</el-button>
        </div>
        <el-collapse accordion @change="handleChange($event, 1)" class="codeText">
            <el-collapse-item>
                <template slot="title">
                    <span style="text-align: center; width: 100%; color: #409eff;">{{codeTitle}}</span>
                </template>
                <pre v-highlight><code class="language-html">{{ codeText }}</code></pre>
            </el-collapse-item>
        </el-collapse>

        <h3 style="font-weight: 400;">
            左侧部门右侧选人
            <el-button style="margin-left: 10px;" type="primary" size="mini" plain @click="getCode(2)">组件代码</el-button>
        </h3>
        <div style="border: 1px solid rgb(0, 0, 0, 0.1); padding: 10px; border-radius: 10px;">
            <SelectV2 
                ref="selectV2" 
                :userList="userList" 
                :deptTree="deptTree"
                :pageData="pageData"
                @callFatherCheckedDept="callFatherCheckedDept"
                @callFatherPage="callFatherPage"
                @callFatherData="callFatherData"></SelectV2>
            <el-button type="primary" @click="showDialogV2()">弹窗</el-button>
        </div>
        <el-collapse accordion @change="handleChange($event, 2)" class="codeText">
            <el-collapse-item>
                <template slot="title">
                    <span style="text-align: center; width: 100%; color: #409eff;">{{codeTitleV2}}</span>
                </template>
                <pre v-highlight><code class="language-html">{{ codeTextV2 }}</code></pre>
            </el-collapse-item>
        </el-collapse>

        
    </div>
</template>
<script>
    import Select from "@/components/library/Select";
    import SelectV2 from "@/components/library/SelectV2";
    import Coding from "@/components/library/Coding";
    export default {
        name: 'SelectView',
        data() {
            return {
                drawer: false,
                direction: 'rtl',
                readFileUrl: "http://quzhoucity.oss-cn-hangzhou.aliyuncs.com/sliceFile/1684982834682-Select.vue",

                codeTitle: "显示代码",
                codeTitleV2: "显示代码",
                codeText: `<Select ref="select" @callFatherData="callFatherData"></Select>
<el-button type="primary" @click="showDialog()">弹窗</el-button>
<script>
    export default {
        methods: {
            showDialog() {
                this.$refs.select.showDialog()
            },
            callFatherData(data) {
                console.log(data);
            }
        }
    };
<\/script>`,
                codeTextV2: `<SelectV2 
    ref="selectV2" 
    :userList="userList" 
    :deptTree="deptTree"
    :pageData="pageData"
    @callFatherCheckedDept="callFatherCheckedDept"
    @callFatherPage="callFatherPage"
    @callFatherData="callFatherData"></SelectV2>
<el-button type="primary" @click="showDialogV2()">弹窗</el-button>
<script>
    export default {
        data() {
            return {
                userList: [],
                deptTree: [],
                pageData: {
                    currentPage: 1,
                    pageSize: 10,
                    total: 0
                }
            };
        },
        methods: {
            showDialogV2() {
                this.$refs.selectV2.showDialog()
            },
            callFatherPage(data) {
                console.log(data);
            },
            callFatherCheckedDept(data) {
                console.log(data);
            },
            callFatherData(data) {
                console.log(data);
            }
        }
    };
<\/script>`,

                userList: [],
                deptTree: [{
                    id: 1,
                    label: '测试部门',
                    children: [{
                            id: 4,
                            label: '一组',
                            children: []
                        },{
                            id: 4,
                            label: '二组',
                            children: []
                        }]
                    }, {
                    id: 2,
                    label: '销售部门',
                    children: [{
                            id: 5,
                            label: '杭州办'
                        }, {
                            id: 6,
                            label: '省外办'
                        }]
                    }, {
                    id: 3,
                    label: '产品部门',
                    children: []
                }],
                pageData: {
                    currentPage: 1,
                    pageSize: 10,
                    total: 0
                }
            };
        },
        components: {
            Select,
            SelectV2,
            Coding
        },
        methods: {
            handleClose(done) {
                done();
            },
            showDialog() {
                this.$refs.select.showDialog()
            },
            callFatherData(data) {
                console.log(data);
            },


            showDialogV2() {
                this.$refs.selectV2.showDialog()
            },
            callFatherPage(data) {
                console.log(data);
            },
            callFatherCheckedDept(data) {
                this.getUserListByDept(data.id);
            },
            getUserListByDept(deptId) {
                //调接口，下面是模拟数据
                if (deptId == 1) {
                    this.userList = [
                        {id: 1, name: "张三"},
                        {id: 2, name: "李四"},
                        {id: 3, name: "王五"},
                        {id: 4, name: "赵六"},
                        {id: 5, name: "七七"}
                    ]
                }else if (deptId == 2) {
                    this.userList = [
                        {id: 6, name: "测试"},
                        {id: 7, name: "祁德恕"},
                        {id: 8, name: "双卡王"},
                        {id: 9, name: "零零"},
                        {id: 10, name: "爱登堡"},
                        {id: 11, name: "奥德彪"},
                        {id: 1, name: "张三"},
                        {id: 12, name: "六六"}
                    ]
                }else {
                    this.userList = []
                }
            },


            handleChange(val, index) {
                if (index == 1) {
                    this.codeTitle = val > 0 ? "隐藏代码" : "显示代码"
                }else if (index == 2) {
                    this.codeTitleV2 = val > 0 ? "隐藏代码" : "显示代码"
                }
            },
            getCode(val) {
                this.readFileUrl = val == 1 ? "http://quzhoucity.oss-cn-hangzhou.aliyuncs.com/sliceFile/1684982834682-Select.vue" : "http://quzhoucity.oss-cn-hangzhou.aliyuncs.com/sliceFile/1684982854983-SelectV2.vue";
                this.drawer = true;
            }
        },
        created() {
        }
    };
</script>
<style scoped>
    .codeText /deep/ .el-collapse-item__arrow {
        display: none !important;
    }
</style>
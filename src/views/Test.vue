<template>
    <div>
        <el-button type="primary" @click="test1()">导出接口测试</el-button>
        <el-button type="primary" @click="test2()">资源接口测试</el-button>
        <el-button type="primary" @click="test3()">生命周期导出接口测试</el-button>
        <el-button type="primary" @click="test5()">客户导出接口测试</el-button>
        <el-button v-hasPermission="['home:advertising:save']">新建</el-button>
        <el-button v-hasPermission="['home:advertising:update']">编辑</el-button>
        <el-button v-hasPermission="['home:advertising:delete']">删除</el-button>
        <br>
        <el-table label="表格[开发中]" :data="list">
            <el-table-column label='id' prop='id'>
            </el-table-column>
            <el-table-column label='name' prop='name'>
            </el-table-column>
            <el-table-column label='type' prop='type'>
            </el-table-column>
            <el-table-column label='address' prop='address'>
            </el-table-column>
            <el-table-column label='description' prop='description'>
            </el-table-column>
            <el-table-column label='updateTime' prop='updateTime'>
            </el-table-column>
            <el-table-column label='tagList' prop='tagList'>
            </el-table-column>
        </el-table>
        <div class="div1">
            <div class="div2">111</div>
            <div class="div3">222</div>
        </div>

        <Oss style="width: 300px;" @callFatherData="callFatherData"></Oss>

        <Select ref="select"></Select>
        <el-button type="primary" @click="showDialog()">弹窗</el-button>

        <SelectV2 ref="selectV2"></SelectV2>
        <el-button type="primary" @click="showDialogV2()">弹窗2</el-button>
    </div>
</template>

<script>
    import Oss from "../components/library/Oss";
    import Select from "../components/library/Select";
    import SelectV2 from "../components/library/SelectV2";
    import {excel, typeList, getResourceList, exportList, excelTwo} from "@/api/users"
    export default {
        name: 'Test',
        data() {
            return {
                list:[],
                visible: false
            };
        },
        components: {
            Oss,
            Select,
            SelectV2
        },
        methods: {
            test1() {
                excel(41).then(res => {
                    this.downloadFile(res, "测试", 'xlsx')
                })
            },

            test2() {
                let data = {"pageNum": 1, "pageSize": 10};
                typeList(data).then(res => {
                    console.log(res);
                })
            },

            test3() {
                exportList({}).then(res => {
                    console.log(res);
                    this.downloadFile(res.data, "测试", 'xlsx')
                })
            },

            test4() {
                var message = "[{\"tag_name\":\"标签1\",\"tag_number\":\"111\",\"miss_time\":\"2022-10-27\"},{\"tag_name\":\"标签2\",\"tag_number\":\"222\",\"miss_time\":\"2022-10-26\"}]"
                var data = JSON.parse(message); //报警数据
                for(var k in data) {
                    console.log("标签名称：" + data[k].tag_name);
                    console.log("标签编号：" + data[k].tag_number);
                    console.log("最后移动时间：" + data[k].miss_time);
                }
            },

            test5() {
                excelTwo({}).then(res => {
                    this.downloadFile(res, "客户", 'xlsx')
                })
            },

            // 下载文件
            downloadFile(obj, name, suffix) {
                const url = window.URL.createObjectURL(new Blob([obj]))
                const link = document.createElement('a')
                link.style.display = 'none'
                link.href = url
                const fileName = name + '.' + suffix
                link.setAttribute('download', fileName)
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
            },

            callFatherData(data) {
                console.log("父组件获取到的数据", data);
            },

            showDialog() {
                this.$refs.select.showDialog()
            },

            showDialogV2() {
                this.$refs.selectV2.showDialog()
            }
        },
        created() {
            //this.test4();
        }
    };
</script>
<style>
    .div1 {
        width: 200px;
        height: 200px;
        background-color: aqua;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
</style>
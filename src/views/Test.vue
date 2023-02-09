<template>
    <div>
        <el-button type="primary" @click="test1()">导出接口测试</el-button>
        <el-button type="primary" @click="test2()">资源接口测试</el-button>
        <el-button type="primary" @click="test3()">生命周期导出接口测试</el-button>
        <el-button v-hasPermission="['home:advertising:save']">新建</el-button>
        <el-button v-hasPermission="['home:advertising:update']">编辑</el-button>
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

    </div>
</template>

<script>
    import {excel, typeList, getResourceList, exportList} from "@/api/users"
    export default {
        name: 'Test',
        data() {
            return {
                list:[]
            };
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
            }
        },
        created() {
            //this.test4();
        }
    };
</script>
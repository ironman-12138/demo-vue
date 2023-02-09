<template>
    <div>
        <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
        </el-date-picker>
        <el-button type="primary" @click="text1()">渠道领码统计</el-button>
        <el-date-picker
            v-model="value2"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
        </el-date-picker>
        <el-button type="primary" @click="text2()">场景刷码统计</el-button>
        <el-button type="primary" @click="text3()">导出接口测试</el-button>
        <!-- <el-table height='550' :data="dataBody" border style="width: 100%">
            <el-table-column label="日期" width="120">
                <template slot-scope='scope'>
                    <span>{{scope.row.date}}</span>
                </template>
            </el-table-column>
            <el-table-column label="领码人数" width="120">
                <template slot-scope='scope'>
                    <span>{{scope.row.peoNum}}</span>
                </template>
            </el-table-column>
            <el-table-column label="场景（扫码人数）" align="center">
                <el-table-column :label="item.merchant" :property="item.merchant" min-width='100' v-for="item in dataHeader" :key="item.prop" align="center">
                    <el-table-column label="人数" width="120" :property="item.merchant" align="center">
                        <template slot-scope='scope'>
                            <span>{{scope | getMerchantPeo}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="次数" width="120" :property="item.merchant" align="center">
                        <template slot-scope='scope'>
                            <span>{{scope | getMerchantNum}}</span>
                        </template>
                    </el-table-column>
                </el-table-column>
            </el-table-column>
        </el-table> -->
    </div>
</template>

<script>
    import {excel, text} from "@/api/users"
    export default {
        name: 'Blogs',
        data() {
            return {
                dataHeader: [
                    {"merchant":"良渚遗址公园","merchantId":"yhymt-lzyzgy"},
                    {"merchant":"瓶窑行政服务中心正门","merchantId":"yhymt-pyxzfwzx"},
                    {"merchant":"良渚博物院正门","merchantId":"111"},
                    {"merchant":"对接群测试商户","merchantId":"222"}
                ],
                dataBody: [
                    {
                        "date": "2021-08-05",
                        "peoNum": 1,
                        "scanCodeNum": 10,
                        "scanCodePeoNum": 1,
                        "codePageNum": 0,
                        "oneCodeNum": 0,
                        "sceneList": [
                            {
                            "merchant": "良渚遗址公园",
                            "merchantId": "yhymt-lzyzgy",
                            "peopleCnt": 1,
                            "readCnt": 9
                            },
                            {
                            "merchant": "瓶窑行政服务中心正门",
                            "merchantId": "yhymt-pyxzfwzx",
                            "peopleCnt": 1,
                            "readCnt": 1
                            },
                            {
                            "merchant": "良渚博物院正门",
                            "merchantId": "111",
                            "peopleCnt": 0,
                            "readCnt": 0
                            },
                            {
                            "merchant": "对接群测试商户",
                            "merchantId": "222",
                            "peopleCnt": 0,
                            "readCnt": 0
                            }
                        ]
                    },
                    {
                        "date": "2021-08-06",
                        "peoNum": 2,
                        "scanCodeNum": 38,
                        "scanCodePeoNum": 1,
                        "codePageNum": 0,
                        "oneCodeNum": 0,
                        "sceneList": [
                            {
                            "merchant": "对接群测试商户",
                            "merchantId": "222",
                            "peopleCnt": 1,
                            "readCnt": 12
                            },
                            {
                            "merchant": "瓶窑行政服务中心正门",
                            "merchantId": "yhymt-pyxzfwzx",
                            "peopleCnt": 1,
                            "readCnt": 26
                            },
                            {
                            "merchant": "良渚博物院正门",
                            "merchantId": "111",
                            "peopleCnt": 0,
                            "readCnt": 0
                            },
                            {
                            "merchant": "良渚遗址公园",
                            "merchantId": "yhymt-lzyzgy",
                            "peopleCnt": 0,
                            "readCnt": 0
                            }
                        ]
                    }
                ],
                value1: [],
                value2: []
            };
        },
        filters: {
            getMerchantPeo: function(value) {
                let res = 0;
                for (let i = 0; i < value.row.sceneList.length; i++) {
                    let element = value.row.sceneList[i];
                    if(element.merchant == value.column.property){
                        res = element.peopleCnt;
                        return res;
                    }
                }
                return res;
            },
            getMerchantNum: function(value) {
                let res = 2;
                for (let i = 0; i < value.row.sceneList.length; i++) {
                    let element = value.row.sceneList[i];
                    if(element.merchant == value.column.property){
                        res = element.readCnt;
                        return res;
                    }
                }
                return res;
            }
        },
        methods: {
            text3() {
                const data = {
                    pageNum: 1
                }
                excel(data).then(res => {
                    console.log(res);
                    this.downloadFile(res.data, "测试", 'xlsx')
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
            text1() {
                var data = {
                    "endDate": this.value1[1],
                    "merchantId": "",
                    "pageNum": 1,
                    "pageSize": 10,
                    "startDate": this.value1[0],
                    "year": ""
                }
                text("", data).then(res => {
                    
                })
            },
            text2() {

            }

        },
        created(){
            
        }
    };
</script>
<template>
    <div class="inspect_schedule_page repair_page spotCheck-page" v-cloak>
        <div class="content">
            <div class="do_content">
                <div class="content-top">
                    <div class="search-left">
                        <el-form :model="ruleForm" :rules="rules" ref="ruleFormRef" label-width="100px">
                            <el-col :span="8">
                                <el-form-item label="选择月份" prop="date">
                                    <el-date-picker v-model="ruleForm.date" type="month" format="yyyy-MM"
                                        value-format="yyyy-MM" clearable>
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-form>
                    </div>
                    <el-col :span="8">
                        <div style="text-align:right">
                            <el-button type="primary" @click="search">查询</el-button>
                            <el-button @click="reset('ruleFormRef')">清除</el-button>
                        </div>
                    </el-col>
                </div>
                <div class="content-button">
                    <el-button type="primary" @click="setSchedule">排班设置</el-button>
                    ruleForm - {{ ruleForm }}
                </div>
                <div class="table_wrapper table-wrap">
                    <div class="current-time">
                        {{ currentShowMonthDate }}
                    </div>
                    <div class="btn-wrap">
                        <el-button class="baseBtn" @click="monthChange('prev')">上个月</el-button>
                        <el-button class="baseBtn" @click="monthChange('current')">本月</el-button>
                        <el-button class="baseBtn" @click="monthChange('next')">下个月
                        </el-button>
                    </div>
                    <calendar class="calendar" :width="'100%'"
                        userType="edit"
                        :currentShowMonth="currentShowMonth"
                        :calendarData="currentTableData" 
                        :canSelect="true" 
                        :dutyList="dutyList" 
                        :remarks="remarks" 
                        @calendarSelected="getSelectedDate" 
                        @calendarEdit="editDate">
                    </calendar>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import calendar from '../components/Calendar.vue'
export default {
    components: {
        calendar
    },
    name: 'index',
    data() {
        return {
            ruleForm: {
                date: "",
            },
            rules: {
                date: [
                    { required: true, message: '请选择年月份', trigger: ['blur', 'change'] }
                ]
            },
            groupList: [], // 班组列表 数据
            currentMonth: "2023-03",// 当前月份
            currentShowMonth: "2023-03",// 当前月份的 临时变量
            activeMonth: "current", //当前月份 active
            currentTableData: [], // 默认选中的日期集合
            showSchedule: false, // 是否展示排班
            dutyList: [
                {date: "2023-03-02", person: "张三 李四"},
                {date: "2023-03-08", person: "王五 赵六 赵六 赵六 赵六 赵六 赵六 赵六"}
            ], //值班人员
            remarks: [{date: "2023-03-18", remark: "当日天气很好，适合出外游玩"}]
        };
    },
    computed: {
        currentShowMonthDate() {
            let resMonth = "";
            if (this.currentShowMonth) {
                let tempArr = this.currentShowMonth.split("-");
                resMonth = tempArr[0] + " 年 " + parseInt(tempArr[1]) + " 月"
            } else {
                resMonth = ""
            }
            return resMonth;
        }
    },
    watch: {
    },
    methods: {
        // 上一个月份
        getPreMonth(date) {
            let arr = String(date).split('-');
            let year = arr[0]; //获取当前日期的年份
            let month = arr[1]; //获取当前日期的月份
            let year2 = year;
            let month2 = parseInt(month) - 1;
            if (month2 == 0) {
                year2 = parseInt(year2) - 1;
                month2 = 12;
            }
            if (month2 < 10) {
                month2 = '0' + month2;
            }
            let t2 = year2 + '-' + month2
            return t2;
        },
        // 下一个月份
        getNextMonth(date) {
            var arr = String(date).split('-');
            var year = arr[0]; //获取当前日期的年份
            var month = arr[1]; //获取当前日期的月份
            var year2 = year;
            var month2 = parseInt(month) + 1;
            if (month2 == 13) {
                year2 = parseInt(year2) + 1;
                month2 = 1;
            }
            if (month2 < 10) {
                month2 = '0' + month2;
            }
            var t2 = year2 + '-' + month2;
            return t2;
        },
        // 查询
        search() {
            console.log("查询", this.ruleForm);
            // 校验 班组与年月的必填
            this.$refs.ruleFormRef.validate((valid) => {
                if (valid) {
                    // 控制月份的展示
                    this.currentShowMonth = this.ruleForm.date;
                    this.activeMonth = "current";
                    console.log("currentTableData", this.currentTableData);
                } else {
                    return false;
                }
            });
        },
        // 清除
        reset(formName) {
            // Object.keys(this.ruleForm).forEach(key => { this.ruleForm[key] = '' })
            this.$refs[formName].resetFields();
            this.currentShowMonth = "";
            this.activeMonth = "current"
            console.log("清除", this.ruleForm);
        },
        // 排班设置
        setSchedule() {
            this.showSchedule = true;
        },
        // 关闭 排班设置
        changeScheduleDialog(flag) {
            this.showSchedule = flag;
        },
        // 月份的改变
        monthChange(type) {
            if (type == "prev") {
                this.currentShowMonth = this.getPreMonth(this.currentShowMonth);
            } else if (type == "next") {
                this.currentShowMonth = this.getNextMonth(this.currentShowMonth);
            } else {
                this.currentShowMonth = this.currentMonth
            }
        },
        getSelectedDate(dateList) {
            console.log("选中的日期", dateList);
        },
        editDate(item) {
            console.log("编辑的日期", item);
        }
    },
}
</script>
<style scoped>
.spotCheck-page {
    /* height: calc(100% - 20px); */
    height: 100%;
    width: 100%;
}

.content-top {
    position: relative;
    margin: 10px 0px;
    height: 60px;
    border-bottom: 1px solid #d9d9d9;
}

.content-button {
    position: relative;
    top: -5px;
    margin-bottom: 10px;
}

.current-time {
    font-weight: 900;
    font-size: 18px;
}

.btn-wrap {
    position: relative;
    right: 0;
    margin-bottom: 5px;
    text-align: right;

}

.baseBtn {
    color: #001e48;
    background: #0e91e3;
}
</style>
  
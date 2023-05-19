<!-- 代办组件 -->
<template>
    <div>
        <div class="todo-all">
            <div class="calendar-title-row">
                <div class="current-time">
                    {{ currentShowMonthDate }}
                </div>
                <div class="month-btn-wrap">
                    <i class="el-icon-arrow-left" style="cursor: pointer; margin-right: 10px;" @click="monthChange('prev')"></i>
                    <i class="el-icon-arrow-right" style="cursor: pointer; margin-left: 10px;" @click="monthChange('next')"></i>
                </div>
            </div>
            <calendar class="calendar" :width="'100%'"
                userType="edit"
                :currentShowMonth="currentShowMonth"
                :calendarData="currentTableData" 
                :canSelect="true" 
                :dutyList="dutyList" 
                :remarks="remarks"
                :completedList="completedList"
                :taskList="taskList"
                @calendarSelected="getSelectedDate" 
                @calendarEdit="editDate">
            </calendar>

            <div class="todo-title">TO DO</div>
            <div v-if="!hasTask">
                <div class="todo-text-center">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHwAAABrCAYAAAC1zeadAAAKY0lEQVR4Xu1dXWwcVxX+7qzt9d/au3Gc4E3j9YJShaRxY+zyI4FwJCTUBwQ8tA+VCkQ8REJCbSSQkHhIKlU8gFQVUKVSIfH3AIIHKEK8Jn0pgsZ1G2PTkpaN/3YTJ/au17u217szF50hs2zWY8/vzs7s3pEixTvnnnvu98059865P8MgLt8hsJjJPcU4/z0Hu5SIR19z00DmpjKhyx0EFlfXrzImXeFceSFxYuiqO1r/p0UQ7iaaLukShLsEZFDUCMKDwpRNOzOZrTO7lcoxrbgkKdNaSFcU6br2e3dHx9rISGTBZjUipDsBzq2yRHaZV+bN6uNgU4l4dMasfL2c6MPtIudSuUxma7jCK69wYLhO5TSAqner9zhf6OkKvzg83JexW70g3C5yDSwn+vAGgutH1YJwP7LSQJsE4Q0E14+ql1dz3+SM/5wDlxPx2Mtu2uhpH55aztJABMmTseu1/3ezQa2ii7zc7SwbYeMp4cuZ7BXOcZVyxAz8Z7KMC0R+q5AUhHZ4SjgBUu2fGjAxEATAm22jp4RrZDOGq+TpwsO9p99zwqmJ1DcR+ZQ2FCHdW9I9Jdzbpona9BAQhLfZcyEIF4S3GQJt1lzh4YLwNkOgzZorPFwQ3mYItFlzhYcLwv2DwOxsakyW8HkmYcw/Vh1uCVeQUzrwxifPJt/xo82+9fAb76aeY4z9gIP3+hE4I5sYY3+RKvzZiYlkzkjWy/u+JPzGzdRXAPzx2NEBRAd6Eenr9hITR3Xt7VWwVdzFcnqdc+DNTzw29llHCl0u7E/C51L5aKQ38rFEdam2y81uvLpcfhsfLq5RRV+dGk/+qfE1mqvBd4T/Yz51XpIxe3LkCMjDg3zNzN0G53jhiceTru4Pc4KJ7wh/ay41zTiuPfrRjwQqlOuRQIQz4I3J8aS6tMsPlyC8gSwIwk2AKzzcBEgORISHOwDPqKjwcCOEAAgPNwGSAxHh4Q7AMyoqPNwIIeHhJhByJqLr4epyYklKhKXO7x0/3n/XWRXWSh8W0lfvZFGRlarC3u4uDA9Fqn/X37dWszPpeltIW2A8fCmdvQZguhGHyhjBehjhi6vr+4onTgxVf9O7b1Sfm/drbRGEm0TWCuGSxEAZOe1qJuH1tgjCXSB8PVt4KKSHuzrUyRXtqr9vskpXxOpt8TXhqeX7nwqFQr8DDpl35vhg9ETslCvoHKJEvJY1FmF10La0uvEjMPYdw6q49MzoicHfGso5EBCEOwDPRNHqKF3br01lQiFc0QZt2rFRbhwZZcIekXgxA5IDGd3XMr+O0h20sylFxWuZCdhFSDcBkgMRfQ9f3XgFjH2LA19LxGO/caDfclFBuGXILBXQJfzeveJIpaLEnB7zaMmSB8KCcDuomS8jJk/MY2VZUq8PpyVcIQVfpuXMIQW/8npVa6AID3ouXVuvV31yGPLg+LqXixwDRXiQc+mzs6moHMK7EmMnY9EIkxUFW4VtRZYVic5UDcm4ODGRvG05jFgsEGjCg5RLvzGXehkczw0O9CHc1anSxDnH9k4Jxe1d+nMzJGOs0SE+UIQHNZcuh/A8Lb0moonw+qu0V8ZmvgjGcXny8aSrJy/W1xUowi1Gr6aLa4M2DjbEGM72dHex/r6efXbtlSvIbRYE4UHaYqT3dBHh4FgEQyIUkiDLCjo6Qujr7X4orG/ktqgvL4ZkjIqQ3nQ/tW+ASjiAzs4OxAb7sbO7h+L2DhSFozvcpRK/W6LfdmnDwsXJ8eQv7ddmrqQI6eZwsiWlET4UGwB5uDZQK2zvYmenVPN25t3uFEG4LSqNC63dz2M5s6F6Mf2rv8rUb+eLFPILkszPefFKRjYIwo25syxBW4YXPkiDgeFI7P+LLGsVURhXQ7kHI/PaegXhluk0LkDbhGm78JFoRB2k1V80eNvIbcmc839OjSfPG2t0T0IQ7h6WqiZtX3hvTxh6r2Akk90sgEK6EsKE10eDBIrwZuTS9dabH/SMkOfOvb+i3ibvZmw/vJRZKxR3mrZvPFCENyuXXr/e/CDCtVAeHexHV2fHPjFKpa5v5OmtbGFqfOycy8HFlLpAE+5FLl1vvbkesnSuy7//c0d9vx6I6J9DROlTSqNyhgtPnEs25dMfgSK8Gbl0vfXmeoOwhVtplCsyjh4Z0A3lWr4cDD+eOpd83pQ7mhRaWck/KrPyM2Y+OBAowk2233Mxet+m9+7ambBaIx6Ecq5wvhKSMe52+nQpk/0zOL5kZmuYINzh46GF8oNmwkg9DdJosNaoUG5llbEg3CHhFMpLpTJi0Ug1fVqrUpsJA/D61HiSzp9z/RKEuw6pvsL03Rwyazn1fZveu+svCuUbuQKXZbng5kwYbRqhb4xTfZIkUTX0f3W3r/aboihMr08XHm7z4dje3cO/bqWrM2F6arT0qduH82mfAzMyXa9PF4QboXbAfXoFo/67diasVrRSkSl9SpMVucnxZMxmNbrFhIe7iaYJXUYzYaSCyCbSAfx9ajz5aRNqbYuIPtw2dMYFqzNhjKnpU4NQ7slJjIJwY95sS9xeuQ9KAB02E5bd3EJfT1gN+V4cvSnew23TaVyQ+u7CdgnDQ4O6wtpM2MdPxdVBnReEi0ybMW+2JbTB2rGj0X06tJmwkWNRxI9Hg3OKk200XCjo982EWhq1nvAH6VOEw504cyquIhGY/eEu8GZbhd8J15It1IfTwkTKpNHEyF6pDIVz1B77LQg38Rj4nXB1lH4rDdobVnvRaVJ0oH/tWnpBeAsQTk0g0u+u59WNBdo3WbRlyLVNFIS3COEmmtG6ffhSOss5Y09LnD/FgeHReOyCWUD05Pwe0q20rSU9fHF14yeMsW8TEER8YiT6Byug1Mu22kduGrHCxQm+jidPlu7kXoTCv+8W4aTnxs0Up8EPjXiDemn5dq/2jJnFyTnh6ew1BfJPJYQ+B+C805BOhr9188PLDNJLNCAae+So7sICsw1shhyRnV6jDxLy9yfOjp1uhg0H1emY8EY15u35xVcVWbnUKP2N1hsKSbfKUJ72eqOBUbt8S7jq6XOpaSiYlpi6oiMQF2d4hym43eiTHOyC4WvC7TZKlDsYAUF4mz0dgnBBeJsh0GbNFR4uCG8zBNqsucLD243w+fm1/t6Bzqk2a3fTm1sqVmZOnx7eqjWk9jMk9HvyZOzQLcX18kaNIn1sOZN7k3P+GSNhcd91BGZG47Gqoy2lsy8BuPxQLQoujj4S0z27bSmd+yvAn7RqFdPWNFstKOQdI3C9dt5hMbPxQ8bZd2u1crBLiXj0Nb2altPZX3PgWStWMMb+JvpwK4i1gKwgvAVItNIEQbgVtFpAVhDeAiRaaYIg3ApaLSArCG8BEq00QRBuBa0WkG0a4e+9dy8S7uuYNIPhQK/y9tDQUL5WdjGdm1Rkrr9B24xSD2S8+kCvlaY0jfCllew3IOEXpoxlmB8diT2myWYyW2fKvDJvqmyThTjYVCIenWmyGdXqm0d4ev2LgPTqoR+pf2Bm/eE06+vrA8WS9DqdXOQXIA+wY0Yu4QvJZIyWsPri+i+s1AH8wczSRgAAAABJRU5ErkJggg==" style="width: 100px;">
                    <p>你这一天没有任务</p>
                    <p class="font-size-1">想做点什么？点击 编辑 按钮记下来</p>
                </div>
            </div>
            <div v-else>
                <div class="todo-text-task">
                    <div class="todo-text-task-content">
                        <p>{{ task.content }}</p>
                        <el-button class="task-completed-btn">完成</el-button>
                        <img src="../assets/img/edit.png" class="task-edit-img" @click="innerDrawer = true"/>
                    </div>
                </div>
            </div>

            <!-- 遮罩层 -->
            <div class="mask-show" v-if="innerDrawer" @click="innerDrawer = false" ></div>
            <!-- 抽屉层 -->
            <div class="setbox" :class="{show: innerDrawer}">
                <div class="setbox-content">
                    <p class="setbox-content-font-one">{{ taskDate }}</p>
                    <p class="setbox-content-font-two">任务内容</p>
                    <el-input
                        type="textarea"
                        :rows="6"
                        maxlength="200"
                        placeholder="请输入内容"
                        v-model="taskContent">
                    </el-input>
                    <el-button class="setbox-create-btn" @click="innerDrawer = false">确认创建</el-button>
                    <el-button class="setbox-close-btn" @click="innerDrawer = false">取消</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import calendar from '../components/Calendar.vue'
    import { parseTime } from '../util/calendar.js'
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
                currentMonth: parseTime(new Date(), "{y}-{m}"),// 当前月份
                currentShowMonth: parseTime(new Date(), "{y}-{m}"),// 当前月份的 临时变量
                activeMonth: "current", //当前月份 active
                currentTableData: [], // 默认选中的日期集合
                dutyList: [], //值班人员
                remarks: [],

                innerDrawer: false,
                taskContent: "",
                taskDate: "",
                hasTask: false,
                task: {
                    content: "1:测试\n2.开发"
                },
                completedList: ["2023-04-02"], // 完成任务的日期
                taskList: ["2023-04-04", "2023-04-05"] // 待完成任务的日期
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
                if (this.completedList.includes(dateList[0]) || this.taskList.includes(dateList[0])) {
                    this.hasTask = true;
                }else {
                    this.hasTask = false;
                }
            },
            editDate(item) {
                console.log("编辑的日期", item.date);
                this.taskDate = item.date;
                this.innerDrawer = true;
            },

            /**
             * 关闭抽屉弹窗
             */
            handleClose() {
                this.innerDrawer = false;
            }
        },
    }
</script>
<style scoped>
    .calendar-title-row {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }
    .current-time {
        color: #8a60a5;
        padding-left: 20px;
    }
    .month-btn-wrap {
        padding-right: 20px;
    }
    .calendar {
        padding: 20px;
    }
    .todo-title {
        color: #8a60a5;
        font-size: 14px;
        padding-left: 20px;
    }
    .todo-text-center {
        text-align: center!important;
    }
    .todo-text-task {
        padding: 20px;
    }
    .todo-text-task-content {
        border: 1px rgb(167, 167, 167, 0.3) solid;
        position: relative;
        height: 350px;
    }
    .font-size-1 {
        color: #b8c4ce;
    }
    .todo-all {
        position: absolute;
        overflow: hidden;
        height: 100%;
    }
    .task-edit-img {
        position: absolute;
        top: 0px;
        right: 0px;
        text-align: center;
        line-height: 15px;
        object-fit: cover;  /*图片按原始宽高比例*/
        max-width: 20px;
        max-height: 20px;
        cursor: pointer;
    }
    .task-completed-btn {
        width: 100%;
        position: absolute;
        bottom: 10px;
        background-color: #409eff;
        color: #ffffff;
    }

    /* -----------------------从下向上的抽屉----------------------- */
    .setbox {
        position: absolute;
        z-index:1100;
        top:100%;
        bottom:0px;
        width:100%;
        height:0px;
        background:#FFFFFF;
        border-top: 1px solid #CFD8DC!important;
        box-shadow:0px 1px 3px 2px rgba(0,0,0,0.12);
        border-radius: 2%;
        -webkit-transition: all 1s ease;
        transition: all 1s ease;
        /* 动画（定位从 -32% 变成 0） */
        right: 0px;
    }
    .show {
        height: 100%;
        top: 50%
    }
    .mask-show {
        position:fixed;
        z-index:100;
        top:0px;
        bottom:0px;
        width:100%;
        height:100%;
        background-color: rgba(0, 0, 0, 0.5);
    }
    .setbox-content {
        padding: 10px;
    }
    .setbox-create-btn {
        text-align: center;
        width: 100%;
        margin-top: 10px;
        background-color: #409eff;
        color: #ffffff;
    }
    .setbox-close-btn {
        margin: 0;
        text-align: center;
        width: 100%;
        margin-top: 10px;
        color: #555555;
    }
    .setbox-content-font-one {
        color: #3f3f3f;
    }
    .setbox-content-font-two {
        color: #5e5e5e;
    }
    /* -----------------------从下向上的抽屉----------------------- */
</style>
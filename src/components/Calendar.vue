<template>
    <div class="calendar">
        <table class="calendar-table" :style="{ width }">
            <thead>
                <tr class="calendar-table-tr">
                    <th v-for="(item, i) in weeks" :key="i" class="calendar-table-tr-td">{{ item }}</th>
                </tr>
            </thead>
            <tbody class="tbody">
                <tr v-for="(dates, i) in res" :key="i" :style="{ height: tbodyHeight }">
                    <td v-for="(item, index) in dates" :key="index"
                        :class="{ notCurMonth: !item.isCurMonth, currentDay: item.date === curDate, selectDay: item.isSelected, rangeSelectd: item.isRangeSelected, weekend: item.isWeekend }"
                        @click="handleItemClick(item, i, index)">
                        <!-- 编辑图标 -->
                        <div v-if="item.isCurMonth && !completedList.includes(item.date) && !taskList.includes(item.date)" @click.stop="edit(item)">
                            <img class="edit-img" src="../assets/img/edit.png"/>
                        </div>
                        <!-- 完成图标 -->
                        <div v-if="item.isCurMonth && completedList.includes(item.date)">
                            <img class="completed-img" src="../assets/img/true.png"/>
                        </div>
                        <!-- 待完成图标 -->
                        <div v-if="item.isCurMonth && taskList.includes(item.date)">
                            <img class="warn-img" src="../assets/img/warn.png"/>
                        </div>
                        <!-- 日期 -->
                        <div v-if="item.isCurMonth" class="date-font">{{ parseTime(item.date) }}</div>
                        <!-- 排班人员 -->
                        <div>
                            <div v-for="(duty, index) in dutyList" :key="index">
                                <div v-if="duty.date == item.date && item.isCurMonth" class="person">
                                    <el-tooltip :content="duty.person" placement="top-start" effect="dark" popper-class="atooltip">
                                        <span class="tbody-text">值班人员：{{ duty.person }}</span>
                                    </el-tooltip>
                                </div>
                            </div>
                        </div>
                        <!-- 备注 -->
                        <div>
                            <div v-for="(remark, index) in remarks" :key="index">
                                <div v-if="remark.date == item.date && item.isCurMonth" class="remark">
                                    <el-tooltip :content="remark.remark" placement="top-start" effect="dark" popper-class="atooltip">
                                        <span class="tbody-text">备注：{{ remark.remark }}</span>
                                    </el-tooltip>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
<script>
/**
 * 参数介绍
 * canSelect：是否禁用，点击table高亮； 
 * currentShowMonth：当前展示的月份（例:2022-04）；
 * calendarData：默认选中的日期数组，（当前要展示高亮的日历数据）（数组）
 * startOfWeek：开始第一周的起始位置；
 * dutyList：值班人员，格式[{date: "2023-03-02", person: "张三 李四"}]
 * remarks：日期备注，格式[{date: "2023-03-02", remark: "当日天气很好"}]
 * completedList: [], 完成任务的日期，格式["2023-03-02"]
 * taskList: [] 待完成任务的日期，格式["2023-03-02", "2023-03-06"]
 */
import { getDaysInMonth, handleCrateDate, parseTime } from '../util/calendar.js'
export default {
    props: {
        userType: {
            type: String,
            default: "show"
        },
        canSelect: {
            type: Boolean,
            default: false
        },
        currentShowMonth: {
            type: String,
            default: "",
        },
        calendarData: {
            type: Array,
            default() {
                return []
            }
        },
        startOfWeek: {
            type: Number,
            default: 1
        },
        width: {
            type: String,
            default: '70%'
        },
        tbodyHeight: {
            type: String,
            default: '60px'
        },
        dutyList: {
            type: Array,
            default() {
                return []
            }
        },
        remarks: {
            type: Array,
            default() {
                return []
            }
        },
        completedList: {
            type: Array,
            default() {
                return []
            }
        },
        taskList: {
            type: Array,
            default() {
                return []
            }
        },
    },
    data() {
        return {
            weeks: ['一', '二', '三', '四', '五', '六', '日'],
            days: 0, // 当前月总共天数
            curDate: parseTime(new Date().getTime()), // 当前日期 yyyy-MM-dd 格式，用来匹配是否是当前日期
            showDays: [], // 总共展示的42个日期
            res: [], // 二维数组
            selectedDates: [], // 选中的日期
        }
    },
    watch: {
        // 监听当前月份 更新日历数据
        'currentShowMonth': {
            immediate: true,
            handler(newV) {
                if (this.userType === "show") {
                    let curYear = newV.split('-')[0];
                    let curMonth = newV.split('-')[1] * 1 - 1; // 月份从0开始的 因此要-1
                    console.log(curYear, curMonth, this.startOfWeek);
                    this.handleGetDays(curYear, curMonth, this.startOfWeek) // 渲染月份数据
                    // 默认选中日期 isSelected
                    this.showDays = this.showDays.map(item => {
                      this.calendarData.forEach(it => {
                        if (it == item.date) {
                          item.isSelected = true;
                        }
                      })
                      return item;
                    })
                } else if (this.userType === "edit") {
                    console.log("编辑的", newV);
                    let curYear = newV.split('-')[0];
                    let curMonth = newV.split('-')[1] * 1 - 1; // 月份从0开始的 因此要-1
                    this.handleGetDays(curYear, curMonth, this.startOfWeek) // 渲染月份数据
                    // 默认选中日期 isSelected
                    this.showDays = this.showDays.map(item => {
                      this.calendarData.forEach(it => {
                        if (it == item.date) {
                          item.isSelected = true;
                        }
                      })
                      return item;
                    })
                }
            }
        }
    },
    created() {
        this.weeks.unshift(...this.weeks.splice(this.startOfWeek - 1))
    },
    mounted() {
        // if (localStorage.selectedDates) this.selectedDates = JSON.parse(localStorage.selectedDates)
    },
    methods: {
        // 处理 日期
        handleGetDays(year, month, startOfWeek) {
            this.showDays = []
            this.days = getDaysInMonth(year, month); // 拿到当前月份天数
            let firstDayOfWeek = new Date(`${year}-${month + 1}-01`).getDay() // 开始第一周 从那天排起
            // console.log("开始第一周 从周几排起", firstDayOfWeek);
            // 处理周起始日
            const obj = {
                1: '一',
                2: '二',
                3: '三',
                4: '四',
                5: '五',
                6: '六',
                0: '日'
            }
            const firstDayInCN = obj[firstDayOfWeek]
            const index = this.weeks.indexOf(firstDayInCN)
            // console.log("开始第一周 从周几排起索引", firstDayOfWeek, index)
            if (firstDayOfWeek === 0) { // 星期天为0 星期一为1 ，以此类推
                firstDayOfWeek = 7
            }
            let prevDays = handleCrateDate(year, month - 1, 1, index + 1, 'prev')
            // console.log("上个月prevDays", prevDays);
            let rearDays = handleCrateDate(year, month * 1 + 1, 1, 42 - this.days - (index), 'rear')
            // console.log("下个月rearDays", rearDays);
            let curDays = handleCrateDate(year, month, 1, this.days)
            // console.log("本月curDays", curDays);
            this.showDays.unshift(...prevDays)
            this.showDays.push(...curDays)
            this.showDays.push(...rearDays)
            // console.log(this.showDays, "showDays");
            this.res = this.handleFormatDates(this.showDays)
            //   this.res.splice(5,1)
            // 清除表格的空行
            // let countEmpty=0
            this.res.forEach((item, index) => {
                // console.log(Array.from(item).filter(i=>i.isCurMonth==false))
                if (Array.from(item).filter(i => i.isCurMonth == false).length == 7) {
                    this.res.splice(index, 1)
                }
                // console.log(item,index)
            })
            // console.log('输出日历表二维数组', this.res)
        },
        // 传入长度42的原数组，最终转换成二维数组
        handleFormatDates(arr, size = 7) {
            const arr2 = []
            for (let i = 0; i < size; i++) {
                const temp = arr.slice(i * size, i * size + size)
                arr2.push(temp)
            }
            // console.log(arr2)
            return arr2
        },
        // 处理 日历 头部的展示
        handleTableHead(start) {
            const sliceDates = this.weeks.splice(start - 1)
            this.weeks.unshift(...sliceDates)
        },
        // 日历点击事件 
        handleItemClick(item, i, j) {
            // 若是 为展示状态的 则不可点击触发之，否则可以点击勾选选中日历排班
            if (!this.canSelect) return;
            if (!item.isCurMonth) return;
            // 清除之前选中的日期
            this.res.forEach((item, index) => {
                let selectList = Array.from(item).filter(i => i.isSelected == true);
                selectList.forEach((item2, index) => {
                    item2.isSelected = false;
                })
            })
            this.$nextTick(() => {
                this.res[i][j].isSelected = !this.res[i][j].isSelected
                if (this.res[i][j].isSelected) {
                    this.selectedDates = [this.res[i][j].date] //单选
                    // this.selectedDates.push(this.res[i][j].date)
                    this.selectedDates = Array.from(new Set(this.selectedDates))
                } else {
                    this.selectedDates.splice(this.selectedDates.indexOf(item.date), 1)
                }
                //console.log('选中的selectedDates22', this.selectedDates)
                this.$emit('calendarSelected', this.selectedDates)
            })
        },
        // 点击编辑按钮
        edit(item) {
            this.$emit('calendarEdit', item)
        },

        parseTime(date) {
            return parseTime(date, '{d}');
        }
    }
}
</script>
  
<style scoped>
.calendar {
    display: flex;
    flex-direction: column;
}

.calendar-table {
    table-layout: fixed;
    border-collapse: collapse;
    transition: 0.3s;
    text-align: center;
}

.calendar-table-tr {
    height: 45px;
    line-height: 45px;
}

.calendar-table-tr-td {
    cursor: pointer;
    text-align: center;
    background-color: #f0f3f8;
    color: #8a60a5;
    /* border: 1px solid #e0e6ed; */
}

.tbody>tr>td {
    cursor: pointer;
    /* border: 1px solid #e0e6ed; */
    position: relative;
}

.notCurMonth {
    color: #c0c4cc;
}

.currentDay {
    background-color: #b9e4f5;
    border-radius: 50%;
}

.selectDay {
    background-color: #e1edfa;
    border-radius: 50%;
}

.rangeSelectd {
    color: #606266;
    background-color: #dee2e9;
}

.weekend {
    color: #f73131;
}

.edit-img {
    max-width: 20px;
    max-height: 20px;
    object-fit: cover;  /*图片按原始宽高比例*/
    position: absolute;
    top: 0px;
    right: 0px;
    text-align: center;
    line-height: 15px;
}

.person {
    /* 内容过长显示成省略号（内容显示为1行） */
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
}
.remark {
    /* 内容过长显示成省略号（内容显示为1行） */
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
}

.tbody-text {
    font-size: 10px;
    color: #606266;
}

.date-font {
    font-size: 10px;
    color: #606266;
}

.completed-img {
    max-width: 20px;
    max-height: 20px;
    object-fit: cover;  /*图片按原始宽高比例*/
    position: absolute;
    top: 0px;
    right: 0px;
    text-align: center;
    line-height: 15px;
}

.warn-img {
    max-width: 20px;
    max-height: 20px;
    object-fit: cover;  /*图片按原始宽高比例*/
    position: absolute;
    top: 0px;
    right: 0px;
    text-align: center;
    line-height: 15px;
}
</style>
  
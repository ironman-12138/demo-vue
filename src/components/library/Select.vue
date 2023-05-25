<template>
	<div>
		<el-dialog :visible.sync="dialogVisible" :close-on-click-modal ="false" :z-index="1" append-to-body header="选择直接上级" attach="body" width="672px">
            <div class="toBody">
                <div class="toBody-left">
                    <el-input v-model="searchKey" class="input" placeholder="搜索" @input="onListenSearch(searchKey)">
                    </el-input>
                    <div v-show="!searchKey" class="content">
                        <div class="bcrumb">
                            <span
                                v-for="(levelItem, index) in levelDatas"
                                :key="index"
                                class="bcrumb-item"
                                @click="goOrganiseLevel(levelItem)"
                            >
                                <span class="name line-1">{{ levelItem.name }}</span>
                                <img src="@/assets/img/右箭头.png" class="iconpark-icon" />
                            </span>
                        </div>

                        <div class="group" style="width: auto">
                            <span class="group-item">
                                <el-checkbox v-model="allChecked" :disabled="isOnly" @change="allCheckChange()">全选</el-checkbox>
                            </span>
                        </div>
                        <!-- <t-checkbox-group v-model="value" @change="onChange"> -->
                        <div class="group" style="margin-top: 0; overflow: auto; height: 450px">
                            <span
                                v-for="child in currentMembersAndDepartments.children"
                                :key="child.type == 1 ? child.departmentId : child.id"
                                :class="{ 'group-item': true, disabled: child.isChecked }"
                            >
                                <el-checkbox v-model="child.isChecked" :disabled="isOnly && isCheckedItems.length > 0" @change="setCheckboxChange(child)" class="checkbox-item"></el-checkbox>
                                <div class="dept-item">
                                    <div class="selectLabel">
                                        <img src="@/assets/img/组织.png" class="image" />
                                        <span class="dept-text"> {{ child.name }} </span>  <span class="text">({{ child.staffsCount }})</span>
                                    </div>
                                    <span class="tips" @click="setCurrentChild(child)"> 下级 </span>
                                </div>
                            </span>
                            <span v-for="staff in currentMembersAndDepartments.staffs" :key="staff.id" class="group-staff-item">
                                <el-checkbox v-model="staff.isChecked" :disabled="isOnly && isCheckedItems.length > 0 && isCheckedItems[0].id != staff.id" @change="setCheckboxChange(staff)" class="checkbox-item"></el-checkbox>
                                <div class="selectLabel">
                                    <img v-if="staff.avatar" :src="staff.avatar" class="image" />
                                    <div v-else class="mock">
                                        {{ staff.name.charAt(0) }}
                                    </div>
                                    <span class="text"> {{ staff.name }} </span>
                                </div>
                                <!-- <span class="tips"> 下级 </span> -->
                            </span>
                        </div>
                        <!-- </t-checkbox-group> -->
                    </div>
                    <div v-show="searchKey" class="content">
                        <div class="group" style="margin-top: 0; overflow: auto; height: 450px">
                            <span v-for="staff in searchStaffs" :key="staff.id" class="group-item">
                                <el-checkbox v-model="staff.isChecked" @change="setCheckboxChange(staff)" class="checkbox-item"></el-checkbox>
                                <div class="selectLabel">
                                    <img v-if="staff.avatar" :src="staff.avatar" class="image" />
                                    <div v-else class="mock">
                                        {{ staff.name }}
                                    </div>
                                    <span class="text"> {{ staff.name }} </span>
                                </div>
                            </span>
                        </div>
					</div>
                </div>
                <!-- <div class="toBody-line"></div> -->
                <div class="toBody-right">
                    <div class="behaver">已选：{{ isCheckedItems.length }}</div>
                    <div class="selectGroup">
                        <span
                            v-for="(isCheckedItem, isCheckedItemIndex) in isCheckedItems"
                            :key="isCheckedItemIndex"
                            class="selectGroup-item"
                        >
                            <div class="selectLabel">
                                <span class="text"> {{ isCheckedItem.name }}</span>
                            </div>

                            <div class="close" @click="onRemoveSelectedItem(isCheckedItem, isCheckedItemIndex)">
                                <img src="@/assets/img/关闭.png" class="iconpark-icon" style="width: 16px; height: 16px" />
                            </div>
                        </span>
                    </div>
                </div>
            </div>
            
			<div class="footer">
                <el-button @click="onClose">取消</el-button>
                <el-button type="primary" @click="onSave">确定</el-button>
            </div>
		</el-dialog>
	</div>
</template>

<script>
    export default {
        name: 'Select',
        props: {
            isOnly: {
                // 是否只选择一个，默认不限制
                type: Boolean,
                default: false,
            }
        },
        data() {
            return {
                searchKey: "",
                membersDataObj: [{
                    departmentId: 0,
                    name: "组织架构",
                    type: 1,
                    staffsCount: 2,
                    children: [
                        {
                            departmentId: 4,
                            parentId: 0,
                            name: "测试部门",
                            type: 1,
                            staffsCount: 1,
                            children: [
                                {
                                    departmentId: 5,
                                    parentId: 4,
                                    name: "运营部门",
                                    type: 1,
                                    staffsCount: 2,
                                    children: [],
                                    staffs: [
                                        {
                                            id: 4,
                                            avatar: "",
                                            name: "aaa",
                                            type: 2,
                                            isChecked: false,
                                            departmentId: 5
                                        },
                                        {
                                            id: 5,
                                            avatar: "",
                                            name: "bbb",
                                            type: 2,
                                            isChecked: false,
                                            departmentId: 5
                                        }
                                    ]
                                }
                            ],
                            staffs: [
                                {
                                    id: 3,
                                    avatar: "",
                                    name: "语文",
                                    type: 2,
                                    isChecked: false,
                                    departmentId: 4
                                }
                            ]
                        }
                    ],
                    staffs: [
                        {
                            id: 1,
                            avatar: "",
                            name: "张三",
                            type: 2,
                            isChecked: false,
                            departmentId: 0
                        },
                        {
                            id: 2,
                            avatar: "",
                            name: "历史",
                            type: 2,
                            isChecked: false,
                            departmentId: 0
                        }
                    ]
                }], //存储所有数据
                searchStaffs: [], //通过搜索条件，模糊查询得出结果
                membersDataQueryList: [], //只存储所有人员 用于搜索
                currentMembersAndDepartments: [],
                levelDatas: [], //存储层级菜单面包屑
                isCheckedItems: [], //已选中的对象

                allChecked: false,
                dialogVisible: false
            };
        },
        methods: {
            onListenSearch(searchKey) {
                this.searchStaffs = this.membersDataQueryList.filter((v) => v.name.includes(searchKey));
            },

            goOrganiseLevel(child) {
                const index = this.levelDatas.findIndex((e) => e.departmentId == child.departmentId);
                this.levelDatas = this.levelDatas.splice(0, index + 1);
                this.currentMembersAndDepartments = child;
            },

            setCurrentChild(child) {
                this.currentMembersAndDepartments = child;
                // 设置层级菜单面包屑
                this.levelDatas = [];
                this.getParent(this.membersDataObj, child.departmentId);
                // this.levelDatas.unshift(this.membersDataObj);
            },

            /**
             * 递归获取父级路径
             * @param {*} data 
             * @param {*} nodeID 
             */
            getParent(data, nodeID) {
                for (let i = 0, { length } = data; i < length; i++) {
                    const node = data[i];
                    if (node.departmentId == nodeID && node.type == 1) {
                        this.levelDatas.unshift(node);
                        // 查找到当前id,继续追随父级id
                        this.getParent(this.membersDataObj, node.parentId); // 注意这里是传入的tree，不要写成data了，不然遍历的时候一直都是node.children,不是从最顶层开始遍历的
                        break;
                    } else {
                        // 如果当前节点没有对应id,则追溯该子类是否有匹配项
                        if (node.children && node.children.length > 0) {
                            this.getParent(node.children, nodeID);
                        }
                    }
                }
            },

            setCheckboxChange(child) {
                if (this.isOnly && this.isCheckedItems && this.isCheckedItems.length > 0 && this.isCheckedItems[0].id != child.id) {
                    return;
                }
                if (child.type === 2) {
                    //选中人
                    if (child.isChecked) {
                        this.isCheckedItems.push(child);
                    }else {
                        this.isCheckedItems.splice(this.isCheckedItems.indexOf(child), 1);
                        child.isChecked = false;
                        const node = this.getDept(this.membersDataObj, child.departmentId);
                        if (node) {
                            node.isChecked = false;
                        }
                    }
                }else if (child.type === 1) {
                    //选中部门
                    if (child.isChecked) {
                        let users = [];
                        this.getDeptUser(this.currentMembersAndDepartments.children, child.departmentId, users);
                        users.forEach(item => {
                            item.isChecked = true;
                            this.isCheckedItems.push(item);
                        })
                    }else {
                        let users = [];
                        this.getDeptUser(this.currentMembersAndDepartments.children, child.departmentId, users);
                        users.forEach(item => {
                            let i = this.isCheckedItems.indexOf(item);
                            if (i >= 0) {
                                item.isChecked = false;
                                this.isCheckedItems.splice(i, 1);
                            }
                        })
                    }
                }
            },

            getDeptUser(data, departmentId, users) {
                for (let i = 0, { length } = data; i < length; i++) {
                    const node = data[i];
                    if (node.departmentId == departmentId) {
                        if (node.staffs && node.staffs.length > 0) {
                            for (let index = 0; index < node.staffs.length; index++) {
                                const element = node.staffs[index];
                                users.push(element);
                            }
                        }
                        break;
                    } else {
                        // 如果当前节点没有对应id,则追溯该子类是否有匹配项
                        if (node.children && node.children.length > 0) {
                            this.getDeptUser(node.children, departmentId, users);
                        }
                    }
                }
            },

            getDept(data, departmentId) {
                for (let i = 0, { length } = data; i < length; i++) {
                    const node = data[i];
                    if (node.departmentId == departmentId && node.type == 1) {
                        return node;
                    } else {
                        // 如果当前节点没有对应id,则追溯该子类是否有匹配项
                        if (node.children && node.children.length > 0) {
                            return this.getDept(node.children, departmentId);
                        }
                    }
                }
            },

            onRemoveSelectedItem(child, index) {
                child.isChecked = false;
                let node = this.getDept(this.membersDataObj, child.departmentId);
                this.isCheckedItems.splice(this.isCheckedItems.indexOf(child), 1);
                if (node) {
                    node.isChecked = false;
                }
                this.allChecked = false;
            },

            allCheckChange() {
                let depts = [];
                this.getAllDept(this.membersDataObj, depts);
                if (this.allChecked) {
                    let users = [];
                    this.getAllUser(this.membersDataObj, users);
                    users.forEach(item => {
                        let i = this.isCheckedItems.indexOf(item);
                        if (i < 0) {
                            item.isChecked = true;
                            this.isCheckedItems.push(item);
                        }
                    })
                    
                    depts.forEach(item => {
                        item.isChecked = true;
                    })
                }else {
                    this.isCheckedItems.forEach(item => {
                        item.isChecked = false;
                    })
                    depts.forEach(item => {
                        item.isChecked = false;
                    })
                    this.isCheckedItems = [];
                }
            },

            getAllUser(data, users) {
                for (let i = 0, { length } = data; i < length; i++) {
                    const node = data[i];
                    if (node.staffs && node.staffs.length > 0) {
                        node.staffs.forEach(item => {
                            users.push(item);
                        })
                    }
                    if (node.children && node.children.length > 0) {
                        this.getAllUser(node.children, users);
                    }
                }
            },

            getAllDept(data, depts) {
                for (let i = 0, { length } = data; i < length; i++) {
                    const node = data[i];
                    if (node.type == 1) {
                        depts.push(node);
                    }
                    if (node.children && node.children.length > 0) {
                        this.getAllDept(node.children, depts);
                    }
                }
            },

            showDialog() {
				this.dialogVisible = true
			},

            onClose() {
                this.dialogVisible = false;
            },

            onSave() {
                this.$emit('callFatherData', this.isCheckedItems);
                this.dialogVisible = false;
            }
        },
        created() {
            this.currentMembersAndDepartments = this.membersDataObj[0];
            this.levelDatas.push(this.currentMembersAndDepartments);
            this.getAllUser(this.membersDataObj, this.membersDataQueryList);
        }
    };
</script>

<style scoped>
.toBody {
	border: 1px solid #e3e6eb;
	border-radius: 4px;
	display: flex;
	justify-content: space-between;
	height: 450px;
}
/* ----------------------------左侧样式---------------------------- */
.toBody-left {
    border-right: 1px solid rgb(227, 230, 235, 0.8);
}
.bcrumb {
    margin: 0 16px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}
.bcrumb-item {
    display: flex;
    align-items: center;
    max-width: 140px;
}
.name {
    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    color: #13161b;
    max-width: 100px;
    cursor: pointer;
    user-select: none;
}
.iconpark-icon {
    margin-left: 2px;
    width: 10px;
    height: 10px;
}
.bcrumb-item:last-child > .iconpark-icon{
    display: none;
}
.checkbox-item {
    margin-right: 8px;
}
.group {
    margin-left: 16px;
	margin-top: 9px;
    display: flex;
	flex-direction: column;
    width: 100%;
}
.group-item {
    display: flex;
    padding-top: 8px;
    margin-right: 25px;
	/* justify-content: space-between; */
    cursor: pointer;
}
.image {
    width: 24px;
    height: 24px;
    border-radius: 5px;
}
.group-staff-item {
    display: flex;
    width: 100%;
    cursor: pointer;
    padding-top: 8px;
}
.group-item:hover {
    background: #f0f8ff;
}
.dept-item {
    display: flex;
    justify-content: space-between;
    width: 100%;
}
.selectLabel {
    display: flex;
    align-items: center;
}

.tips {
    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    cursor: pointer;
    user-select: none;
    color: #2069e3;
    display: flex;
    align-items: center;
}
/* ----------------------------左侧样式---------------------------- */
/* ----------------------------右侧样式---------------------------- */
.toBody-right {
    flex: 1;
}
.behaver {
    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    color: #13161b;
    margin: 16px;
}
.selectGroup {
    margin: 0 8px;
    margin-top: 4px;
    overflow-y: auto;
    max-height: 500px;
}
.selectGroup-item {
    display: flex;
    align-items: center;
    padding: 4px 8px;
    border-radius: 4px;
    transition: all 0.25s linear;
    justify-content: space-between;
}
.close {
    cursor: pointer;
}
/* ----------------------------右侧样式---------------------------- */
.text {
    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    color: #13161b;
    margin-left: 2px;
}

.dept-text {
    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    color: #13161b;
    margin-left: 2px;
    width:60px; 
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
}

.mock {
	width: 24px;
	height: 24px;
	background: #0389ff;
	border-radius: 4px;
	color: #ffffff;
	text-align: center;
	line-height: 24px;
	font-size: 10px;
}

.icon {
	width: 24px;
	height: 24px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 4px;
}

.footer {
    margin-top: 20px;
    text-align: right
}
</style>

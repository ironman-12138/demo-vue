<template>
	<div>
		<el-dialog :visible.sync="dialogVisible" :close-on-click-modal ="false" :z-index="1" append-to-body header="选择直接上级" attach="body" width="672px">
            <div class="toBody">
                <div class="toBody-left">
                    <el-input v-model="searchKey" class="input" placeholder="搜索">
                    </el-input>
                    <div class="content">
                        <el-tree
                            class="filter-tree"
                            :data="deptTree"
                            :props="defaultProps"
                            :highlight-current="true"
                            default-expand-all
                            :filter-node-method="filterNode"
                            @node-click="handleNodeClick"
                            ref="tree">
                        </el-tree>
                    </div>
                </div>
                <div class="toBody-right">
                    <el-table :data="userList" height="500px" style="width: 100%" row-key="id" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" reserve-selection align="center" width="65" v-if="!isOnly"></el-table-column>
                        <el-table-column align="center" width="65" v-else>
                            <template v-slot="scope">
                                <el-radio :label="scope.$index" v-model="radio" @change.native="getCurrentRow(scope.row)">&nbsp;</el-radio>
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="姓名"></el-table-column>
                    </el-table>
                    <el-pagination
                        class="page-box"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageData.currentPage"
                        :page-size="10"
                        layout="total, prev, pager, next"
                        :total="pageData.total">
                    </el-pagination>
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
        name: 'SelectV2',
        props: {
            isOnly: {
                // 是否只选择一个，默认不限制
                type: Boolean,
                default: false,
            },
            deptTree: {
                type: Array,
                default() {
                    return []
                }
            },
            userList: {
                type: Array,
                default() {
                    return []
                }
            },
            pageData: {
                type: Object,
                default() {
                    return {
                        currentPage: 1,
                        pageSize: 10,
                        total: 0
                    }
                }
            },
            defaultProps: {
                type: Object,
                default() {
                    return {
                        children: 'children',
                        label: 'label'
                    }
                }
            }
        },
        watch: {
            searchKey(val) {
                this.$refs.tree.filter(val);
            }
        },
        data() {
            return {
                searchKey: "",
                dialogVisible: false,

                pageparm: {
                    currentPage: this.pageData.currentPage,
                    pageSize: this.pageData.pageSize
                },
                radio: false,
                checkedUserList: []
            };
        },
        methods: {
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },

            handleNodeClick(data) {
                this.$emit('callFatherCheckedDept', data);
            },

            

            handleSizeChange(val) {
                this.pageparm.pageSize = val;
                this.$emit('callFatherPage', this.pageparm);
            },
            handleCurrentChange(val) {
                this.pageparm.currentPage = val;
                this.$emit('callFatherPage', this.pageparm);
            },

            handleSelectionChange(val) {
                this.checkedUserList = val;
            },

            getCurrentRow(row) {
                this.checkedUserList.push(row);
            },

            showDialog() {
				this.dialogVisible = true
			},

            onClose() {
                this.dialogVisible = false;
            },

            onSave() {
                this.$emit('callFatherData', this.checkedUserList);
                this.dialogVisible = false;
            }
        },
        created() {
        }
    };
</script>

<style scoped>
.toBody {
	border: 1px solid #e3e6eb;
	border-radius: 4px;
	display: flex;
	justify-content: space-between;
	/* height: 450px; */
    width: 100%;
}
/* ----------------------------左侧样式---------------------------- */
.toBody-left {
    border-right: 1px solid rgb(227, 230, 235, 0.8);
    width: 30%;
}


/* 节点样式 */
.toBody-left /deep/ .el-tree-node__content {
    height: 55px !important;
    border-left: 4px solid #ffffff !important;
}
/* 点击后的样式 */
.toBody-left /deep/ .el-tree-node:focus > .el-tree-node__content {
    background-color: #e4f5ee !important;
    border-left: 4px solid #2cb2d3 !important;
}
/* ----------------------------左侧样式---------------------------- */
/* ----------------------------右侧样式---------------------------- */
.toBody-right {
    width: 70%;
    height: 100%;
}
.page-box {
    float: right;
}

/* ----------------------------右侧样式---------------------------- */

.footer {
    margin-top: 20px;
    text-align: right
}
</style>

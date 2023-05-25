<template>
    <div>
        <div v-show="!isFisso">
            <div class="label">
                <ul>
                    <li v-for="(item, index) in list" 
                        :key="index"
                        draggable
                        @dragstart="dragstart($event, item, index)"
                        >
                        {{ item.name }}
                    </li>
                </ul>
            </div>
            <div style="height: 20px;"></div>
            <div class="label" @drop="dragenter($event)" @dragover.prevent>
                <ul>
                    <li v-for="(item, index) in resultList" 
                        :key="index" 
                        draggable
                        @dragstart="resultDragstart($event, item, index)"
                        @drop="resultDragenter($event, index)"
                        @dragover.prevent
                        >
                        {{ item.name }}
                    </li>
                </ul>
            </div>
        </div>
        <div v-show="isFisso">
            <div class="label">
                <ul>
                    <li v-for="(item, index) in list" 
                        :key="index"
                        @click="selectLabel(item, index)"
                        :class="{ displayClass: item.selected || resultList.some(result => result.name === item.name)}"
                        >
                        {{ item.name }}
                    </li>
                </ul>
            </div>
            <div style="height: 20px;"></div>
            <div class="label" @drop="dragenter($event)" @dragover.prevent>
                <ul>
                    <li v-for="(item, index) in resultList" 
                        :key="index" 
                        draggable
                        @dragstart="resultDragstart($event, item, index)"
                        @drop="resultDragenter($event, index)"
                        @dragover.prevent
                        >
                        {{ item.name }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Draggable',
        props: {
            isFisso: {
                type: Boolean,
                default: false
            },
            list: {
                type: Array,
                default: []
            },
            resultList: {
                type: Array,
                default: []
            },
        },
        data() {
            return {
            };
        },
        methods: {
            dragstart(e, item, index) {
                e.dataTransfer.setData('index', index);
            },
            dragenter(e) {
                let index = e.dataTransfer.getData('index');
                if (index) {
                    let item = this.list[index];
                    this.list.splice(index, 1);
                    this.resultList.push(item);
                }
            },
            resultDragstart(e, item, index) {
                e.dataTransfer.setData('resultIndex', index);
            },
            resultDragenter(e, index) {
                let resultIndex = e.dataTransfer.getData('resultIndex');
                if (resultIndex) {
                    const moving = this.resultList[resultIndex];
                    this.resultList.splice(resultIndex, 1);
                    this.resultList.splice(index, 0, moving);
                }
            },

            selectLabel(item, index) {
                if (!this.list[index].selected && !this.resultList.some(result => result.name === item.name)) {
                    this.resultList.push(item);
                    this.list[index].selected = true;
                }else {
                    let id = this.resultList.findIndex(item2 => {
                        if (item2.id == item.id) {
                            return true
                        }
                    })
                    this.resultList.splice(id, 1);
                    this.list[index].selected = false;
                }
            }
        },
        created() {
        }
    };
</script>
<style scoped>
    .label {
        width: 100%;
        padding: .0667rem;
        border: 1px solid rgba(94, 94, 94, 0.5);
    }
    ul {
        /* list-style-type: none; */
        padding: 0;
    }
    li {
        /* list-style: none; */
        display: inline-block;
        color: #2496ff;
        border: 1px solid rgb(36, 150, 255, 0.5);
        background: #e6f7ff;
        text-align: center;
        cursor: pointer;
        border-radius: 10%;
        margin: 2px;
        padding: 1px 2px 1px 2px;
    }
    .displayClass {
        color: #000000;
        border: 1px solid rgb(102, 102, 102, 0.5);
        background: white;
    }
</style>
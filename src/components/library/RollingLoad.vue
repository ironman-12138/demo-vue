<template>
    <div>
        <div class="rolling-div" @scroll="loadWatch">
            <div v-for="(item, index) in dataList" :key="index">
                <div class="article">
                    <span style="margin: auto; width: 100%; text-align: center;">{{ item.name }}</span>
                </div>
            </div>
            <p v-if="loading" class="end-front">加载中...</p>
            <p v-if="noMore" class="end-front">没有更多了</p>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'RollingLoad',
        data() {
            return {
                loading: false,
                noMore: false,
                total: 0,
                dataList: [
                    {name: "0"},
                    {name: "1"},
                    {name: "2"},
                    {name: "3"},
                    {name: "4"},
                    {name: "5"},
                    {name: "6"},
                    {name: "7"},
                    {name: "8"},
                    {name: "9"},
                ]
            };
        },
        methods: {
            loadWatch(event) {
                let el = event.target;
                if(el.scrollTop + el.clientHeight >= el.scrollHeight) {
                    console.log('到底啦');
                    console.log(this.dataList);
                    let total = 30;
                    if (this.dataList.length >= total) {
                        this.noMore = true;
                        this.loading = false;
                    }else {
                        this.loading = true;
                        let _this = this;
                        let a = [
                            {name: "0"},
                            {name: "1"},
                            {name: "2"},
                            {name: "3"},
                            {name: "4"},
                            {name: "5"},
                            {name: "6"},
                            {name: "7"},
                            {name: "8"},
                            {name: "9"}
                        ]
                        setTimeout(() => {
                            _this.dataList = _this.dataList.concat(a);
                        }, 1000)
                    }
                }
            },
        },
        created() {
        }
    };
</script>
<style>
    .rolling-div {
        width: 23.3333rem; 
        height: 26.6667rem; 
        background-color: #ccf1f3;
        overflow-y: auto;
    }

    .article {
        width: 100%;
        height: 50px;
        border-bottom: 1px solid rgb(46, 46, 46, 0.2);
        text-align: center;
        line-height: 50px;
    }

    .end-front {
        text-align: center;
        font-family: SourceHanSansSC-Regular,SourceHanSansSC;
        font-weight: 400;
        color: rgba(0,0,0,.25);
    }
</style>
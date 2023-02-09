<template>
    <div class="index">
        主页
        <div class="div1">
            <div class="div2">111</div>
            <div class="div3">222</div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Index',
        data() {
            return {

            }
        },
        methods: {
        },
        created() {
        }
    }
</script>
<style>
    .index {
        height: 100%;
        margin: 0px;
        padding: 0px;
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        overflow: hidden;
        background-color: #5c6070;
    }
    .div1 {
        width: 200px;
        height: 200px;
        background-color: aqua;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
</style>
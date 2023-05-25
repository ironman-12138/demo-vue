<template>
    <div class="code">
        <!-- <mavon-editor
            v-model="code"
            :ishljs="true"
            default-open="preview"
            :editable="false"
            :subfield="false" 
            :toolbarsFlag="false"
        /> -->
        <div v-highlight>
            <pre>
                <code class="html">{{ code }}</code>
            </pre>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Code',
        props: {
            readFileUrl: {
                type: String
            }
        },
        data() {
            return {
                code: "",
                fileUrl: ""
            };
        },
        methods: {
            readFile(filePath){
                // 创建一个新的xhr对象
                let xhr = null, okStatus = document.location.protocol === 'file' ? 0 : 200
                xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')      
                xhr.open('GET', filePath, false)
                xhr.overrideMimeType('text/html;charset=utf-8')
                xhr.send(null)
                console.log(xhr);
                return xhr.status === okStatus ? xhr.responseText : null
            },
        },
        created() {
            // this.$nextTick(function () {
            //     this.code = this.readFile('http://develop-static.zhihuipk.com/1676623648712=-=111.txt');
            // })
        },
        watch:{
            readFileUrl: {
                immediate: true,
                handler:function(newVal) {
                    this.code = this.readFile(newVal);
                }
            }
        },
    };
</script>
<style scoped>
    .code {
        /* background-color: #0d1117; */
        /* height: 100%; */
        margin: 0;
        padding: 0;
    }
</style>
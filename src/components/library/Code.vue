<template>
    <div>
        <!-- <mavon-editor
            v-model="code"
            :ishljs="true"
            default-open="preview"
            :editable="false"
            :subfield="false" 
            :toolbarsFlag="false"
        /> -->
        <div class="hljs-code-wrapper">
            <article v-highlight v-html="code"></article>
            <!-- <pre><code class="language-html">{{ code }}</code></pre> -->
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

.hljs-code-wrapper {
  position: relative;
  
  
}
code.hljs {
    padding: 1em 1em 1em 4em
  }
.code-numbering {
    position: absolute;
    top: 1em;
    left: 1em;
    color: #d1d8e6;
    font-size: 14px;
    list-style: none;
    border-right: 1px solid #d1d8e6;
    margin-right: 1em;
    padding-right: 1em;
  }
  i.code-copy {
    position: absolute;
    right: 1em;
    top: 1em;
    display: none;
    cursor: pointer;
    font-size: 18px;
    color: #fff;
    z-index: 999;
  }
  i.code-copy:hover {
    display: block;
  }
</style>
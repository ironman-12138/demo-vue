<template>
  <div class="components-upload">
    <el-upload action :auto-upload="false" :on-change="onChange" :show-file-list="false" :drag="drag"
      :disabled="isDisabled">
      <i class="el-icon-upload" v-if="drag"></i>
      <div class="el-upload__text" v-if="drag">将文件拖到此处，或<em>点击上传</em></div>
      <el-button size="small" type="primary" v-else>点击上传</el-button>
      <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
    </el-upload>
    <el-progress v-show="progressFlag" :percentage="loadProgressCount" :style="{ width: `${progressWidth}px` }"></el-progress>
  </div>
</template>
  
<script>

import md5 from 'js-md5'
import { request1 } from '@/network/request'
export default {
  name: 'upload',
  props: {
    drag: {
      type: Boolean,
      default: true
    },
    progressWidth: {
      type: Number,
      default: 400
    }
  },
  data() {
    return {
      file: '',
      fileMD5: '',
      progressFlag: false,
      loadProgress: 0, // 进行到哪个文件 根据百分比换算loadProgressCount
      loadProgressCount: 0, // 当前进度
      chunkCount: 0, //  分片总数
      chunkSize: 2 * 1024 * 1024, // 2MB一片
      uploadId: '782EF406BFFF421AB10AC3292ABB2ACC', // oss文件标识
      fileName: '',
      realFileName: '',
      isDisabled: false,

      urlData: {
        weikeUploadInitiate: "http://127.0.0.1:8081/myTerritory/file/upload/initiate",
        weikeUpload: "http://127.0.0.1:8081/myTerritory/file/sliceUpload",
        weikeUploadComplete: "http://127.0.0.1:8081/myTerritory/file/sliceUpload/complete"
      }
    }
  },
  methods: {
    onChange(event) {
      // 清空数据
      Object.assign(this.$data, this.$options.data())
      this.file = event.raw;
      if (!this.file) return;
      if (!this.beforeUpload(this.file)) return;
      this.isDisabled = true
      this.loadProgress = 0
      this.fileName = this.file.uid + "-" + this.file.name
      this.realFileName = this.file.name
      this.chunkCount = Math.ceil(this.file.size / this.chunkSize) // 切片数量
      console.log("----------------------文件开始上传，切片总数：" + this.chunkCount);
      let fileRederInstance = new FileReader()
      fileRederInstance.readAsBinaryString(this.file)
      fileRederInstance.addEventListener('load', e => {
        let fileBolb = e.target.result
        this.fileMD5 = md5(fileBolb) // 文件秒传的关键，文件生成的md5是唯一的，如果判断上传的文件和数据库原来上传过的文件md5值相同就可以直接吐出原来的文件地址，达到文件秒传的效果
        // 1、初始化
        request1({
          url: `${this.urlData.weikeUploadInitiate}?fileName=${this.fileName}`,
          method: "get"
        }).then(data => {
          if (data.code == 200) {
            this.uploadId = data.data
            // 2、 执行分片上传
            let num = 0;
            while (num < this.chunkCount) {
              this.readChunkMD5(num);
              num++;
            }
          } else {
            this.$message({
              message: `${data.msg}`,
              type: "error"
            });
          }
          console.log(data)
        }).catch((e) => {
          this.isDisabled = false;
        })
      })
    },
    // 切片
    getChunkInfo(currentChunk) {
      let start = currentChunk * this.chunkSize // 起始位置
      let end = Math.min(this.file.size, start + this.chunkSize) // 结束位置
      let chunk = this.file.slice(start, end) // 切片内容
      console.log(start, end, chunk)
      return { start, end, chunk }
    },
    // 针对每个文件进行chunk处理
    readChunkMD5(num) {
      const { chunk } = this.getChunkInfo(num)

      let fetchForm = new FormData()
      fetchForm.append('chunk', num + 1) // 当前分片数
      fetchForm.append('chunks', this.chunkCount)
      fetchForm.append('file', chunk) // 当前分片文件内容
      fetchForm.append('md5', this.fileMD5)
      fetchForm.append('fileName', this.fileName)
      fetchForm.append('uploadId', this.uploadId)
      fetchForm.append('curPartSize', chunk.size)

      let _this = this;
      setTimeout(function () {
        request1({
          url: _this.urlData.weikeUpload,
          method: "post",
          data: fetchForm
        }).then(data => {
          console.log(data)
          if (data.code == 200) {
            //  每次上传更新进度
            _this.loadProgress++
            // num = num + 1
            console.log("当前分片:" + (num + 1))
            // 如果当前上传的文件小于总数量就执行上传操作，如果大于当前数量走合并操作
            if (_this.loadProgress == _this.chunkCount) {
              // 合并
              request1({
                url: _this.urlData.weikeUploadComplete,
                method: "post",
                params: {
                  uploadId: _this.uploadId,
                  fileName: _this.fileName
                }
              }).then(data => {
                _this.isDisabled = false;
                console.log("----------------------合并完成");
                console.log(data);
                let file = {
                  "url": data.data,
                  "name": _this.realFileName
                }
                _this.$emit('callFatherData', file)
              }).catch((e) => {
                // 如果失败了就再次执行（本地测试会出现上传超时，不知道怎么解决，所以在此上传这个分片）
                console.log("合并接口调用失败");
                // this.readChunkMD5(num)
                _this.isDisabled = false
              })
            }
          } else {
            // 一直失败可能需要判断一个失败数量然后弹出失败
            // this.readChunkMD5(num)
            console.log("失败数据", chunkInfo)
            _this.$message({
              message: `${data.msg}`,
              type: "error"
            });
            _this.isDisabled = false
          }
        }).catch((e) => {
          // 如果失败了就再次执行（本地测试会出现上传超时，不知道怎么解决，所以在此上传这个分片）
          console.log("分片:" + (num + 1) + "上传接口调用失败");
          _this.readChunkMD5(num)
          _this.isDisabled = false
        })
      }, 200 * num);
    },

    /**
     * 文件上传前校验
     * @param {*} file 
     */
    beforeUpload(file) {
      const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1); //截取后缀
      const whiteList = ["doc", "docx", "xls", "pdf", "zip", 'xlsx', 'txt', 'vue'];
      if (whiteList.indexOf(fileSuffix) === -1) {
        this.$message.error('上传文件只能是 .doc, .docx, .xls, .pdf, .zip格式');
        return false;
      }
      return true;
    },

    //请求等待函数
    sleep(n) {
      var start = new Date().getTime();
      while (true) {
        if (new Date().getTime() - start > n) {
          break;
        }
      }
    },
  },
  watch: {
    // 监听进度变化
    loadProgress(newVal, oldVal) {
      console.log("数值发生变化---" + this.loadProgress)
      if (this.loadProgress == 0) {
        this.loadProgressCount = 0
      } else {
        this.loadProgressCount = Math.floor(this.loadProgress / this.chunkCount * 100)
        console.log("loadProgressCount---" + this.loadProgressCount);
        if (this.loadProgressCount == 100) {
          let _this = this;
          setTimeout(() => {
            _this.progressFlag = false;
          }, 500)
        }
      }
    }
  }
}
</script>

<style scoped>
.components-upload .el-upload,
.components-upload .el-upload-dragger {
  width: 100% !important;
  line-height: 100% !important;
}
</style>
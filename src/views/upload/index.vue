<template>
  <div>
    <button>上传文件</button>
    <button>上传视频</button>
    <el-upload
      class="upload-demo"
      :action="UploadUrl"
      :on-preview="handlePreview"
      :on-success="handleSuccess"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :limit="3"
      :on-exceed="handleExceed"
      :file-list="fileList"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传mp4格式的文件</div>
    </el-upload>

  </div>
</template>

<script>
export default {
  data() {
    return {
      UploadUrl: "http://localhost:9999/guest/uploadVideo",
      fileList: []
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(fileList)
    },
    handlePreview(file) {
      console.log(file);
    },
    // elementUI要求要有fileList
    handleSuccess(res, file, fileList) {
      this.fileList.push({
        name: file.name
      });
      console.log(res);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleClick(tab, event) {
        console.log(tab, event);
      }
  }
};
</script>

<style>
</style>
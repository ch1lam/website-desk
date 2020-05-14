<template>
  <div>
    <el-upload
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
      <div>
        <el-button @click="download">下载</el-button>
      </div>
    </el-upload>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
    
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      UploadUrl: "/api/guest/uploadVideo",
      fileList: [],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(fileList);
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
    },
    download(){
      axios.post(
        "http"+""
      )

    }
  }
};
</script>

<style>
</style>
<template>
  <div class="box">
    <el-card shadow="hover">
      <div class="img-container">
        <el-image style="width: 100px; height: 100px" :fit="fit" :src="url" />
      </div>

      <div style="padding:14px">
        <span>《马克思主义原理》</span>
        <div class="bottom">
          <span>主讲人:xxxx</span>
        </div>
      </div>
    </el-card>
    <el-card shadow="hover">
      <img src="@/assets/mao.jpg" class="image" />
      <span>《毛泽东理论概论》</span>
    </el-card>
    <el-card shadow="hover">
      <span>《近代史纲要》</span>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
    };
  }
};
</script>

<style scoped>
.box {
  display: flex;
  justify-content: center;
}
.el-card {
  margin: 20px;
  height: 240px;
  width: 240px;
}
.image {
  object-fit: cover;
}
.el-card >>> .el-card__body {
  padding: 0%;
}
.bottom {
  margin: 14px;
}
</style>
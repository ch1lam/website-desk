<template>
  <el-row class="box">
    <el-col :span="4"></el-col>
    <el-col :span="16" class="board">
      <el-card shadow="hover" @click.native="test" v-for="course in courses" :key="course.id">
        <div class="img-container">
          <el-image style="width: 100px; height: 100px" :src="url" fit="cover" />
        </div>

        <div style="padding:14px">
          <span>《{{ course.courseName }}》</span>
          <div class="bottom">
            <span>主讲人:xxxx</span>
          </div>
        </div>
      </el-card>
      <el-card shadow="hover">
        <div>
          <img src="@/assets/mao.jpg" class="image" style="width:100%" />
        </div>

        <span>《毛泽东理论概论》</span>
      </el-card>
      <el-card shadow="hover">
        <span>《近代史纲要》</span>
      </el-card>
    </el-col>
    <el-col :span="4"></el-col>
  </el-row>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      courses: {
        id: "",
        courseName: ""
      }
    };
  },
  mounted: {},
  methods: {
    test() {
      this.$router.push({ path: "/dashboard/${id}" });
    },
    getAllCourseInfo() {
      axios.post("http://localhost:9999/student/getUserInfo");
    }
  }
};
</script>

<style scoped>
.box {
  display: flex;
  justify-content: center;
}
.board {
  display: flex;
  justify-content: center;
  background: rgba(255, 255, 255, 0.75);
}
.el-card {
  margin: 20px;
  height: 240px;
  width: 240px;
}
/* .image {
  object-fit: none;
} */
.el-card >>> .el-card__body {
  padding: 0%;
}
.bottom {
  margin: 14px;
}
</style>
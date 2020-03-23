<template>
  <div class="box">
    <el-container>
      <el-header>
        <navbar></navbar>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import navbar from "./components/Navbar";

export default {
  components: {
    navbar
  }
};
</script>

<style scoped>
.box,
.el-container {
  padding: 0px;
  margin: 0px;
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
}
.el-main {
  background-color: #e9eef3;
  text-align: center;
  padding: 0px;
  margin: 0px;
}
</style>
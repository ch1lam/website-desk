<!--
 * @Description  : layout
 * @Author       : ch1lam
 * @Date         : 2022-05-20 17:22:10
 * @LastEditTime : 2022-05-23 19:21:39
 * @LastEditors  : chilam
 * @FilePath     : \website-desk\src\layout\index.vue
-->
<template>
  <div class="box">
    <el-container>
      <el-header height="65px">
        <Navbar></Navbar>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
</script>

<style scoped>
.box,
.el-container {
  padding: 0px;
  margin: 0px;
  height: 100%;
}

.el-header {
  padding: 0%;
}

.el-main {
  text-align: center;
  padding: 0px;
  margin: 0px;
}
</style>
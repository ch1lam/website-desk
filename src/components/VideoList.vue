<template>
  <el-menu
    :default-active="activeIndex"
    mode="vertical"
    @select="handleSelect"
  >
    <el-submenu index="1">
      <template slot="title">
        <span>第一章节</span>
      </template>
      <el-menu-item index="1-1">第一课</el-menu-item>
      <el-menu-item index="1-2">第二课</el-menu-item>
      <el-menu-item index="1-3">第三课</el-menu-item>
    </el-submenu>
    <el-menu-item index="2">第二章节</el-menu-item>
    <el-menu-item index="3">第三章节</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "VideoList",
  data() {
    return {
      activeIndex: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped>
.el-menu {
  height: 100%;
}
.el-menu-item {
  height: 30px;
  line-height: 30px;
}
.el-submenu >>> .el-submenu__title {
  height: 30px;
  line-height: 30px;
}
</style>
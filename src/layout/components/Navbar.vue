<template>
  <div class="nvabar">
    <!-- 基本菜单栏 -->
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="2">我的课程</el-menu-item>
      <el-menu-item index="3">数据统计</el-menu-item>
      <el-menu-item index="4">考试</el-menu-item>

      <div class="right-menu">
        <!-- <el-link type="primary">登陆</el-link>
        <el-link>注册</el-link>-->

        <!-- 右上角用户图标 -->
        <el-dropdown>
          <div class="avatar-wrapper">
            <el-avatar>user</el-avatar>
            <i class="el-icon-caret-bottom" />
          </div>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>切换账户</el-dropdown-item>
            <el-dropdown-item>注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-menu>
  </div>
</template>

<script>
export default {
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
.nvabar {
  height: 100%;
  padding: 0%;
  text-align: justify;
}
.el-row {
  height: 100%;
}
.right-menu {
  float: right;
  margin: 10px;
}
</style>
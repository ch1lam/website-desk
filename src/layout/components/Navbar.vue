<template>
  <div class="nvabar">
    <!-- 基本菜单栏 -->
    <el-menu :default-active="this.$route.path" mode="horizontal" router @select="handleSelect">
      <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">{{ item.navItem }}</el-menu-item>

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
      navList: [
        { name: "/", navItem: "首页" },
        { name: "/", navItem: "我的课程" },
        { name: "/", navItem: "数据统计" },
        { name: "/", navItem: "考试" },
        { name: "/upload", navItem: "上传资料" }
      ]
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
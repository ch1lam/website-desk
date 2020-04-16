<template>
  <div class="nvabar">
    <!-- 基本菜单栏 -->
    <el-menu :default-active="this.$route.path" mode="horizontal" router @select="handleSelect">
      <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">{{ item.navItem }}</el-menu-item>

      <div class="right-menu">
        <!-- <el-link type="primary">登陆</el-link>
        <el-link>注册</el-link>-->

        <!-- 右上角用户图标 -->
        <el-dropdown @command="handleCommand">
          <div class="avatar-wrapper">
            <el-avatar :src="src">user</el-avatar>
            <i class="el-icon-caret-bottom" />
          </div>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">个人信息</el-dropdown-item>
            <el-dropdown-item command="b">修改密码</el-dropdown-item>
            <el-dropdown-item command="c">注销</el-dropdown-item>
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
        { name: "/dashboard", navItem: "首页" },
        { name: "/course", navItem: "我的课程" },
        { name: "/statistics", navItem: "数据统计" },
        { name: "/exam", navItem: "考试" },
        { name: "/upload", navItem: "上传资料" }
      ],
      src:"https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleCommand(command) {
      if (command === "a") {
        this.$router.push("/profile");
      } else {
        console.log(command);
      }
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
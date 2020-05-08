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
            <el-dropdown-item command="b">注销</el-dropdown-item>
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
        { name: "/resource", navItem: "课程资源" }
      ],
      src: this.$store.state.avatarUrl
    };
  },
  mounted: function() {
    this.getAvatar();
  },
  watch: {
    "this.$store.state.avatarUrl": function() {
      this.src = this.$store.state.avatarUrl;
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleCommand(command) {
      if (command === "a") {
        this.$router.push("/profile");
      } else if (command === "b") {
        this.$store.dispatch("setUsername", null);
        this.$store.dispatch("setToken", null);
        this.$store.dispatch("setAvatarUrl", null);
        window.sessionStorage.removeItem("username");
        window.sessionStorage.removeItem("token");
        window.sessionStorage.removeItem("avatarUrl");
        this.$router.push({ path: "/" });
        this.$message({
          showClose: true,
          type: "success",
          message: "注销成功",
          center: true
        });
      } else {
        console.log("注销失败");
      }
    },
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
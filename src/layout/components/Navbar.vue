<!--
 * @Description  :
 * @Author       : ch1lam
 * @Date         : 2022-05-23 16:42:35
 * @LastEditTime : 2022-05-28 01:41:15
 * @LastEditors  : chilam
 * @FilePath     : \website-desk\src\layout\components\Navbar.vue
-->
<template>
  <div class="nav-bar">
    <el-menu class="el-menu-demo" :default-active="route.path" mode="horizontal" router @select="handleSelect">
      <el-menu-item v-for="(item, i) in navList" :key="i" :index="item.name">
        {{ item.navItem }}
      </el-menu-item>
    </el-menu>
    <el-dropdown class="right-menu" @command="handleCommand">
      <div class=" avatar-wrapper">
        <el-avatar :src="src">user</el-avatar>
        <i class="el-icon-caret-bottom" />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="a">个人信息</el-dropdown-item>
          <el-dropdown-item command="b">注销</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>


  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "../../store";

const router = useRouter();
const route = useRoute();
const store = useStore();

let { username, token, avatarUrl, role } = storeToRefs(store);

const navList = [
  { name: "/course", navItem: "我的课程" },
  { name: "/resource", navItem: "课程资源" },
  { name: "/courseManager", navItem: "课程管理" },
  { name: "/userManager", navItem: "用户管理" },
];
const src = "";

const getRole = () => {
  // 利用token获取用户信息
  axios.post("/api/getUserInfo", "", { headers: { Token: "kk" } }).then();
};

const handleCommand = (command: string) => {
  switch (command) {
    case "a":
      router.push("/profile");
      break;
    case "b":
      store.$reset();
      router.push({ path: "/" });
      break;
    default:
      console.log("注销失败");
      break;
  }
  if (command === "a") {

  } else if (command === "b") {
    // TODO
    store.$reset();
    // window.sessionStorage.removeItem("username");
    // window.sessionStorage.removeItem("token");
    // window.sessionStorage.removeItem("avatarUrl");
    // window.sessionStorage.removeItem("role");
    router.push({ path: "/" });
    // this.$message({
    //   showClose: true,
    //   type: "success",
    //   message: "注销成功",
    //   center: true
    // });
  } else {
    console.log("注销失败");
  }
};

const handleSelect = (key: any, keyPath: any) => {
  console.log(key, keyPath);
};
</script>

<style scoped>
.nav-bar {
  display: flex;
  height: 100%;
  padding: 0%;
  justify-content: space-between;
}

.el-menu-demo {
  flex-grow: 1
}

.right-menu {
  height: 100%;
  margin: 0 1rem 0 auto;
  align-items: center;
}
</style>

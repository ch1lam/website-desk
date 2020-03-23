<template>
  <div class="nvabar">
    <span>首页</span>
    <div class="right-menu">
      <!-- <el-link type="primary">登陆</el-link>
      <el-link>注册</el-link>-->
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
  </div>
</template>

<script>
export default {};
</script>

<style>
.nvabar {
  text-align: justify;
}
.right-menu {
  float: right;
}
</style>
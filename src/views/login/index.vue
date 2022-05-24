<!--
 * @Description  :
 * @Author       : ch1lam
 * @Date         : 2022-05-20 18:30:59
 * @LastEditTime : 2022-05-24 19:15:35
 * @LastEditors  : chilam
 * @FilePath     : \website-desk\src\views\login\index.vue
-->
<template>
  <div class="login-form-container">
    <el-form>
      <div class="title-container">
        <h3>用户登陆</h3>
      </div>
      <el-form-item>
        <el-input placeholder="请输入用户名" v-model="loginInfo.username">
          <i slot="prefix" class="el-input__icon el-icon-user"></i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="请输入密码" v-model="loginInfo.password" show-password>
          <i slot="prefix" class="el-input__icon el-icon-lock"></i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-divider></el-divider>
        <el-button type="text" @click="resignFormVisible = true">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
const loginInfo = {
  username: "",
  password: "",
}

const login = () => {
  if (loginInfo.username === "" || loginInfo.password === "") {
    alert({
      showClose: true,
      type: "error",
      message: "用户名或密码不能为空",
      center: true
    });
  }
}

let resignFormVisible: boolean;

</script>

<style scoped>
.title-container {
  position: relative;
}

.title-container h3 {
  font-size: 26px;
  margin: 0px auto 40px auto;
  text-align: center;
}

.login-form-container {
  height: 100%;
}

.login-form-container>.el-form {
  position: relative;
  width: 420px;
  top: 20%;
  max-width: 100%;
  padding: 35px 35px 0;
  margin: auto;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 8px;
}

.el-form-item {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  color: #454545;
}

.el-input>>>.el-input__inner {
  border-radius: 30px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.el-form-item .el-button {
  width: 100%;
}

.el-button {
  border-radius: 30px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.el-divider {
  margin: 20px 0;
}

.el-divider>>>.el-divider__text {
  height: 10px;
  line-height: 10px;
  background: rgba(255, 255, 255, 0.7);
}

.el-dialog__wrapper>>>.el-dialog {
  border-radius: 15px;
}
</style>

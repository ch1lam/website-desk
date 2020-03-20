<template>
  <div>
    <el-form>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-input v-model="loginInfo.username" placeholder="请输入用户名">
            <i slot="prefix" class="el-input__icon el-icon-user"></i>
          </el-input>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-input placeholder="请输入密码" v-model="loginInfo.password" show-password>
            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
          </el-input>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button type="primary" @click="login">登录</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      loginInfo: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      axios
        .get("http://localhost:8080/login", {
          params: {
            username: this.loginInfo.username,
            password: this.loginInfo.password
          }
        })
        .then(res => {
          console.log(res.data);
        })
        .catch(error => console.log(error));
    }
  }
};
</script>
<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  min-width: 400px;
}
.el-button {
  width: 100%;
}
</style> 
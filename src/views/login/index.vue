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
        <el-divider>or</el-divider>
        <el-button type="text" @click="resignFormVisible = true">注册</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="账户注册" :visible.sync="resignFormVisible" center>
      <el-form :model="resignInfo" status-icon :rules="rules" ref="resignInfo">
        <el-form-item label="用户名：" :label-width="formLabelWidth">
          <el-input v-model="resignInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="设置密码：" :label-width="formLabelWidth" prop="password">
          <el-input type="password" v-model="resignInfo.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" :label-width="formLabelWidth" prop="verifyPassword">
          <el-input type="password" v-model="resignInfo.verifyPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号码：" :label-width="formLabelWidth">
          <el-input v-model="resignInfo.phoneNum"></el-input>
        </el-form-item>
        <el-form-item label="验证码：" :label-width="formLabelWidth">
          <el-input v-model="resignInfo.code"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名：" :label-width="formLabelWidth">
          <el-input v-model="resignInfo.realName"></el-input>
        </el-form-item>
        <el-form-item label="身份证号：" :label-width="formLabelWidth">
          <el-input v-model="resignInfo.UID"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resignFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="resignFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.resignInfo.verifyPassword !== "") {
          this.$refs.resignInfo.validateField("verifyPassword");
        }
        callback();
      }
    };
    var validatePassword2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.resignInfo.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      loginInfo: {
        username: "",
        password: ""
      },
      resignInfo: {
        username: "",
        password: "",
        verifyPassword: "",
        phoneNum: "",
        code: "",
        realName: "",
        UID: ""
      },
      rules: {
        password: [{ validator: validatePassword, trigger: "blur" }],
        verifyPassword: [{ validator: validatePassword2, trigger: "blur" }]
      },
      resignFormVisible: false,
      formLabelWidth: "150px"
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
.title-container {
  position: relative;
}
.title-container h3 {
  font-size: 26px;
  margin: 0px auto 40px auto;
  text-align: center;
}
.login-form-container > .el-form {
  position: relative;
  width: 520px;
  max-width: 100%;
  padding: 160px 35px 0;
  margin-top: 300px;
  margin: 0 auto;
  overflow: hidden;
}
.el-form-item {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  color: #454545;
}
.el-input >>> .el-input__inner {
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
.el-divider >>> .el-divider__text {
  height: 10px;
  line-height: 10px;
}
.el-dialog__wrapper >>> .el-dialog {
  border-radius: 15px;
}
</style>
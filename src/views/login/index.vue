<!--
 * @Description  :
 * @Author       : ch1lam
 * @Date         : 2022-05-20 18:30:59
 * @LastEditTime : 2022-05-27 00:41:52
 * @LastEditors  : chilam
 * @FilePath     : \website-desk\src\views\login\index.vue
-->
<template>
  <div class="login-form-container">
    <el-form :model="loginInfo">
      <div class="title-container">
        <h3>用户登陆</h3>
      </div>
      <el-form-item label="username">
        <el-input v-model="loginInfo.username" placeholder="请输入用户名" clearable />
        <!-- <i slot="prefix" class="el-input__icon el-icon-user"></i> -->
      </el-form-item>
      <el-form-item label="password">
        <el-input v-model="loginInfo.password" placeholder="请输入密码" clearable show-password />
        <!-- <i slot="prefix" class="el-input__icon el-icon-lock"></i> -->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登 录</el-button>
        <el-divider />
        <el-button type="text" @click="resignFormVisible = true">注 册</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="注册" v-model="resignFormVisible">
      <el-form :model="resignInfo" :rules="rules" ref="ruleFormRef">
        <el-form-item label="用户名：" prop="username">
          <el-input v-model="resignInfo.username" />
        </el-form-item>
        <el-form-item label="设置密码：" prop="password">
          <el-input type="password" v-model="resignInfo.password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="确认密码：" prop="verifyPassword">
          <el-input type="password" v-model="resignInfo.verifyPassword" autocomplete="off" />
        </el-form-item>
        <el-form-item label="手机号码：" prop="phoneNum">
          <el-input v-model="resignInfo.phoneNum" />
        </el-form-item>
        <el-form-item label="真实姓名：" prop="realName">
          <el-input v-model="resignInfo.realName" />
        </el-form-item>
        <el-form-item label="身份证号：" prop="idCard">
          <el-input v-model="resignInfo.idCard" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resign(ruleFormRef)">注册</el-button>
          <el-button type="primary" @click="resetForm(ruleFormRef)">重置</el-button>

        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const loginInfo = reactive(
  {
    username: "",
    password: "",
  }
)

interface ResignInfo {
  username: string,
  password: string,
  verifyPassword: string,
  phoneNum: number | null,
  realName: string,
  idCard: "",
}

const resignInfo = reactive<ResignInfo>(
  {
    username: "",
    password: "",
    verifyPassword: "",
    phoneNum: null,
    realName: "",
    idCard: "",
  }
)

const ruleFormRef = ref<FormInstance>()
const resignFormVisible = ref(false);
const router = useRouter();

const login = () => {
  if (loginInfo.username === "" || loginInfo.password === "") {
    ElMessage({
      showClose: true,
      type: "error",
      message: "用户名或密码不能为空",
      center: true
    });
  } else (
    router.push('/course')
  )
}



const validatePassword = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    if (resignInfo.verifyPassword !== "") {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField("verifyPassword");
    }
    callback();
  }
}
const validatePassword2 = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== resignInfo.password) {
    callback(new Error("两次输入密码不一致!"));
  } else {
    callback();
  }
}

const rules = reactive<FormRules>({
  name: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 4, max: 16, message: "长度在 4 到 16 个字符", trigger: "blur" }
  ],
  password: [
    { required: true, validator: validatePassword, trigger: "blur" }
  ],
  verifyPassword: [
    { required: true, validator: validatePassword2, trigger: "blur" }
  ],
  phoneNum: [
    {
      required: true,
      message: "请输入手机号码",
      trigger: "blur"
    },
    {
      pattern: /^1[123457890]\d{9}$/,
      min: 11,
      message: "请输入正确的手机号码",
      trigger: "blur"
    }
  ],
  realName: [
    { required: true, message: "请输入真实姓名", trigger: "blur" }
  ],
  idCard: [
    { required: true, message: "请输入身份证号码", trigger: "blur" },
    {
      pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
      message: "请输入正确的身份证号",
      trigger: "blur"
    }
  ]
})

const resign = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log("注册成功");
    } else {
      console.log("失败");
      return;
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

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

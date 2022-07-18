<template>
  <el-row type="flex">
    <el-col :span="4" />
    <el-col :span="16" class="board">
      <el-col :span="9">
        <el-upload
          class="avatar-uploader"
          action="/api/student/uploadAvatar"
          accept="image/jpeg, image/jpg, image/png"
          :headers="uploadHeader"
          :data="uploadData"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :on-error="handleAvatarError"
          :before-upload="beforeAvatarUpload"
        >
          <el-image v-if="imageUrl" :src="imageUrl" class="avatar" fit="fill">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

        <!-- <el-image :src="src" class="avatar" :fit="fill">
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
        </el-image>-->
        <div>
          <span>当前头像</span>
        </div>
      </el-col>
      <el-col :span="15">
        <el-tabs v-model="activeName" tab-position="right">
          <el-tab-pane label="用户信息" name="用户信息">
            <div class="pane-wrapper">
              <span>姓名： {{ userInfo.username }}</span>
            </div>
            <el-divider />
            <div class="pane-wrapper">
              <span>性别：</span>
              <el-radio disabled v-model="userInfo.gender" label="男"
                >男</el-radio
              >
              <el-radio disabled v-model="userInfo.gender" label="女"
                >女</el-radio
              >
            </div>
            <el-divider />
            <div class="pane-wrapper">
              <span>身份： {{ userInfo.role }}</span>
            </div>
            <el-divider />
            <div class="pane-wrapper">
              <span>学院名： {{ userInfo.collegeName }}</span>
            </div>
            <el-divider />
            <div class="pane-wrapper">
              <span>手机号： {{ userInfo.phoneNum }}</span>
            </div>
            <el-divider />
            <div class="pane-wrapper">
              <span>学号： {{ userInfo.schoolNum }}</span>
            </div>
            <el-button style="margin: 30px" @click="handleEdit"
              >修改信息</el-button
            >
          </el-tab-pane>
          <el-tab-pane label="修改密码" name="修改密码">
            <el-form :model="putPassword" ref="putPasswordRef" :rules="rules">
              <el-form-item label="请输入当前密码" prop="oldPassword">
                <el-input
                  type="password"
                  v-model="putPassword.oldPassword"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="请输入新的密码" prop="newPassword">
                <el-input
                  type="password"
                  v-model="putPassword.newPassword"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="再次输入新密码" prop="newPassword2">
                <el-input
                  type="password"
                  v-model="putPassword.newPassword2"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <el-button @click="commitPassword(putPasswordRef)"
              >提交修改</el-button
            >
          </el-tab-pane>
          <el-tab-pane label="实名认证" name="实名认证">
            <div class="pane-wrapper">
              <span>身份证号： {{ userInfo.idCard }}</span>
            </div>
            <el-divider />
            <div class="pane-wrapper">
              <span>真实姓名： {{ userInfo.realName }}</span>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>

      <el-dialog title="修改信息" :visible.sync="formVisible" center>
        <el-form :model="editInfo">
          <el-form-item label="用户名：">
            <el-input :disabled="true" v-model="editInfo.username" />
          </el-form-item>
          <el-form-item label="性别">
            <el-radio v-model="editInfo.gender" label="0">男</el-radio>
            <el-radio v-model="editInfo.gender" label="1">女</el-radio>
          </el-form-item>
          <el-form-item label="学院名">
            <el-input v-model="editInfo.collegeName" />
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="editInfo.phoneNum" />
          </el-form-item>
          <el-form-item label="学号">
            <el-input v-model="editInfo.schoolNum" />
          </el-form-item>
        </el-form>
        <template slot="footer" class="dialog-footer">
          <el-button @click="formVisible = false">取消</el-button>
          <el-button type="primary" @click="handleUpdate">确认</el-button>
        </template>
      </el-dialog>
    </el-col>
    <el-col :span="4" />
  </el-row>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage, FormInstance } from "element-plus";
import { useStore } from "../../store";

const route = useRoute();
const router = useRouter();
const store = useStore();
const putPasswordRef = ref<FormInstance>();

const formVisible = ref(false);
const uploadHeader = ref({ token: store.token });
const uploadData = ref({ username: store.username });
const activeName = ref("用户信息");
const imageUrl = ref("/api/student/getAvatar?username=" + store.username);
const userInfo = reactive({
  id: "",
  username: "null",
  gender: "男",
  realName: "null",
  idCard: "null",
  phoneNum: "null",
  collegeName: "null",
  schoolNum: "null",
  role: "null",
});
const editInfo = reactive({
  id: "null",
  username: "null",
  gender: "0",
  phoneNum: "null",
  collegeName: "null",
  schoolNum: "",
});
const putPassword = reactive({
  oldPassword: "",
  newPassword: "",
  newPassword2: "",
});

const validatePassword = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    if (putPassword.newPassword2 !== "") {
      if (!putPasswordRef.value) return;
      putPasswordRef.value.validateField("newPassword2");
    }
    callback();
  }
};

const validatePassword2 = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== putPassword.newPassword) {
    callback(new Error("两次输入密码不一致!"));
  } else {
    callback();
  }
};

const rules = reactive({
  oldPassword: [
    { required: true, validator: validatePassword, trigger: "blur" },
  ],
  newPassword: [
    { required: true, validator: validatePassword, trigger: "blur" },
  ],
  newPassword2: [
    { required: true, validator: validatePassword2, trigger: "blur" },
  ],
});

onMounted(() => {
  getUserInfo();
});

// TODO

const handleUpdate = () => {
  // TODO request
};

const handleEdit = () => {
  editInfo.id = userInfo.id;
  editInfo.username = userInfo.username;
  editInfo.collegeName = userInfo.collegeName;
  editInfo.schoolNum = userInfo.schoolNum;
  editInfo.phoneNum = userInfo.phoneNum;
  formVisible.value = true;
};

const handleAvatarSuccess = (res: any, file: any) => {
  imageUrl.value = URL.createObjectURL(file.raw);
  store.setAvatarUrl("/api/student/getAvatar?username=" + store.username);
};

const handleAvatarError = (err: any) => {
  console.log(err);
};

const beforeAvatarUpload = (file: any) => {
  const isJPG = file.type === "image/jpeg";
  const isPNG = file.type === "image/png";
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJPG && !isPNG) {
    ElMessage({
      message: "上传头像图片只能是 JPG 或 PNG 格式!",
      type: "warning",
    });
    return isJPG && isPNG;
  }
  if (!isLt2M) {
    ElMessage({
      message: "上传头像图片大小不能超过 2MB!",
      type: "warning",
    });
    return isLt2M;
  }
};

const getAvatar = () => {};

const getUserInfo = () => {
  // TODO store & request
};

const commitPassword = (formEl: FormInstance | undefined) => {
  // TODO ref Form
};
</script>

<style scoped>
.el-row {
  height: 100%;
}
.avatar-uploader {
  margin: 30px;
}
.avatar-uploader >>> .el-upload {
  border: 2px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader >>> .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
/* .avatar {
  padding: 30px;
  width: 250px;
  height: 250px;
} */
.pane-wrapper {
  display: flex;
  margin: 40px auto 0px auto;
  padding: 0;
}
.el-radio {
  margin: 4px 10px 0px 10px;
}
.el-divider {
  margin: 12px auto;
}
.board {
  background: rgba(255, 255, 255, 0.75);
  box-shadow: 0 2px 4px rgba (0, 0, 0, 0.12), 0 0 6px rgba (0, 0, 0, 0.04);
}
</style>

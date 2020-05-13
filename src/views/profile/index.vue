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
              <el-radio disabled v-model="userInfo.gender" label="男">男</el-radio>
              <el-radio disabled v-model="userInfo.gender" label="女">女</el-radio>
            </div>
            <el-divider />
            <div class="pane-wrapper">
              <span>身份： {{ userInfo.role }}</span>
            </div>
            <el-divider />
            <div class="pane-wrapper">
              <span>学院名： {{ userInfo.schoolName }}</span>
            </div>
            <el-divider />
            <div class="pane-wrapper">
              <span>手机号： {{ userInfo.phoneNum }}</span>
            </div>
          </el-tab-pane>
          <el-tab-pane label="修改密码" name="修改密码">
            <el-form :model="putPassword" ref="putPassword" :rules="rules">
              <el-form-item label="请输入当前密码" prop="oldPassword">
                <el-input type="password" v-model="putPassword.oldPassword" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="请输入新的密码" prop="newPassword">
                <el-input type="password" v-model="putPassword.newPassword" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="再次输入新密码" prop="newPassword2">
                <el-input type="password" v-model="putPassword.newPassword2" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <el-button @click="commitPassword('putPassword')">提交修改</el-button>
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
    </el-col>
    <el-col :span="4" />
  </el-row>
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  data() {
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.putPassword.newPassword2 !== "") {
          this.$refs.putPassword.validateField("newPassword2");
        }
        callback();
      }
    };
    var validatePassword2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.putPassword.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      uploadHeader: { token: this.$store.state.token },
      uploadData: { username: this.$store.state.username },
      activeName: "用户信息",
      imageUrl: "/api/student/getAvatar?username=" + this.$store.state.username,
      userInfo: {
        username: "null",
        gender: "男",
        realName: "null",
        idCard: "null",
        phoneNum: "null",
        schoolName: "null",
        role: "null"
      },
      putPassword: {
        oldPassword: "",
        newPassword: "",
        newPassword2: ""
      },
      rules: {
        oldPassword: [
          { required: true, validator: validatePassword, trigger: "blur" }
        ],
        newPassword: [
          { required: true, validator: validatePassword, trigger: "blur" }
        ],
        newPassword2: [
          { required: true, validator: validatePassword2, trigger: "blur" }
        ]
      }
    };
  },
  mounted: function() {
    this.getUserInfo();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.$store.dispatch(
        "setAvatarUrl",
        "/api/student/getAvatar?username=" + this.$store.state.username
      );
    },
    handleAvatarError(err) {
      console.log(err);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG) {
        this.$message.error("上传头像图片只能是 JPG 或 PNG 格式!");
        return isJPG && isPNG;
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return isLt2M;
      }
    },
    getAvatar() {
      this.imageUrl =
        "/api/student/getAvatar?username=" + this.$store.state.username;
    },
    getUserInfo() {
      this.userInfo.username = this.$store.state.username;
      axios
        .post(
          "/api/student/getUserInfo",
          qs.stringify({ username: this.userInfo.username }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Token: this.$store.state.token
            }
          }
        )
        .then(res => {
          if (res.data.success === true) {
            if (res.data.data.userInfo.gender === 0) {
              this.userInfo.gender = "男";
            } else if (res.data.data.userInfo.gender === 1) {
              this.userInfo.gender = "女";
            }
            this.userInfo.realName = res.data.data.userInfo.realName;
            this.userInfo.idCard = res.data.data.userInfo.idCard;
            this.userInfo.phoneNum = res.data.data.userInfo.phoneNum;
            this.userInfo.schoolName = res.data.data.userInfo.collegeName;
            this.userInfo.role = res.data.data.userInfo.role;
          }
        });
    },
    commitPassword(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios
            .post(
              "/api/student/putPassword",
              qs.stringify({
                username: this.userInfo.username,
                password: this.putPassword.oldPassword,
                newPassword: this.putPassword.newPassword
              }),
              {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                  token: this.$store.state.token
                }
              }
            )
            .then(res => {
              if (res.data.success === true) {
                this.$store.dispatch("setUsername", null);
                this.$store.dispatch("setToken", null);
                window.sessionStorage.removeItem("username");
                window.sessionStorage.removeItem("token");
                this.$router.push({ path: "/" });
                this.$message({
                  showClose: true,
                  type: "success",
                  message: res.data.data.message,
                  center: true
                });
              } else {
                this.$message({
                  showClose: true,
                  type: "error",
                  message: res.data.data.message,
                  center: true
                });
              }
            });
        }
      });
    }
  }
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
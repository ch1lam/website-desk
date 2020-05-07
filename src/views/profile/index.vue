<template>
  <el-row type="flex">
    <el-col :span="4" />
    <el-col :span="16" class="board">
      <el-col :span="9">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <el-image v-if="imageUrl" :src="imageUrl" class="avatar" fit="fill">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar" /> -->
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
            <div class="pane-wrapper">
              <el-col :span="8">
                <span style="line-height:40px">请输入当前密码：</span>
              </el-col>
              <el-col :span="15">
                <el-input></el-input>
              </el-col>
            </div>
            <div class="pane-wrapper">
              <el-col :span="8">
                <span style="line-height:40px">请输入新的密码：</span>
              </el-col>
              <el-col :span="15">
                <el-input></el-input>
              </el-col>
            </div>
            <div class="pane-wrapper">
              <el-col :span="8">
                <span style="line-height:40px">再次输入新密码：</span>
              </el-col>
              <el-col :span="15">
                <el-input></el-input>
              </el-col>
            </div>
            <el-button>提交修改</el-button>
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
    return {
      activeName: "用户信息",
      imageUrl:
        "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
      // "",
      userInfo: {
        username: "默认名字",
        gender: "男",
        realName: "默认真实姓名",
        idCard: "默认身份证",
        phoneNum: "默认手机号",
        schoolName: "默认学校名",
        role: "默认身份"
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
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    getUserInfo() {
      this.userInfo.username = this.$store.state.username;
      axios
        .post(
          "http://localhost:9999/student/getUserInfo",
          qs.stringify({ username: this.userInfo.username }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              token: this.$store.state.token
            }
          }
        )
        .then(res => {
          if (res.data.success === true) {
            console.log(res.data.data);
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
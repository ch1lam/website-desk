<template>
  <el-row type="flex">
    <el-col :span="4"></el-col>
    <el-col :span="6">
      <el-image :src="src" class="avatar" :fit="fit">
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
      <div>
        <span>当前头像</span>
      </div>
    </el-col>
    <el-col :span="10">
      <el-tabs tab-position="right">
        <el-tab-pane label="用户信息">
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
            <span>学号： {{ userInfo.username }}</span>
          </div>
          <el-divider />
          <div class="pane-wrapper">
            <span>学院名： {{ userInfo.schoolName }}</span>
          </div>
          <el-divider />
          <div class="pane-wrapper">
            <span>手机号： {{ userInfo.phoneNum }}</span>
          </div>
          <el-divider />
          <div class="pane-wrapper">
            <span>身份证号： {{ userInfo.idCard }}</span>
          </div>
          <el-divider />
          <div class="pane-wrapper">
            <span>真实姓名： {{ userInfo.realName }}</span>
          </div>
        </el-tab-pane>
        <el-tab-pane label="修改密码">
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
        <el-tab-pane label="实名认证">实名认证</el-tab-pane>
        <el-tab-pane label="修改邮箱">修改邮箱</el-tab-pane>
        <el-tab-pane label="修改头像">修改头像</el-tab-pane>
      </el-tabs>
    </el-col>
    <el-col :span="4"></el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      src:
        "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
      userInfo: {
        username: "默认名字",
        gender: "男",
        realName: "默认真实姓名",
        idCard: "默认身份证",
        phoneNum: "默认手机号",
        schoolName: "默认学校名"
      }
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style scoped>
.avatar {
  padding: 30px;
  width: 250px;
  height: 250px;
}
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
</style>
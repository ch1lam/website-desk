<template>
  <div>
    <el-table :data="users" style="width: 100%" stripe>
      <el-table-column prop="id" label="用户id" width="80" />

      <el-table-column prop="username" label="用户名" width="120" />

      <el-table-column prop="role" label="用户权限" width="100">
        <template v-slot="scope">
          <el-tag>{{ scope.row.role }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="phoneNum" label="手机号" width="160" />
      <el-table-column prop="realName" label="真实姓名" width="100" />
      <el-table-column prop="idCard" label="身份证号" width="220" />
      <el-table-column
        prop="gender"
        label="性别"
        :formatter="formatGender"
        width="80"
      />
      <el-table-column prop="collegeName" label="学院名" width="220" />
      <el-table-column prop="schoolNum" label="学号" width="220" />
      <el-table-column label="操作" align="right">
        <template v-slot="scope">
          <el-button size="small" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-popconfirm
            confirmButtonText="好的"
            cancelButtonText="取消"
            icon="el-icon-info"
            iconColor="red"
            title="确定删除该用户吗？"
            @onConfirm="handleDelete(scope.row)"
          >
            <el-button
              size="small"
              type="danger"
              style="margin-left: 10px"
              slot="reference"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="编辑用户" v-model="editFormVisible" center>
      <el-form :model="editUserInfo">
        <el-form-item label="用户名称：">
          <el-input v-model="editUserInfo.username" />
        </el-form-item>
        <el-form-item label="用户权限">
          <el-select v-model="editUserInfo.role" placeholder="请选择用户权限">
            <el-option label="超级管理员" value="admin" />
            <el-option label="教师" value="teacher" />
            <el-option label="学生" value="student" />
          </el-select>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="editUserInfo.phoneNum" />
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="editUserInfo.realName" />
        </el-form-item>

        <el-form-item label="身份证号">
          <el-input v-model="editUserInfo.idCard" />
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="editUserInfo.gender" label="0">男</el-radio>
          <el-radio v-model="editUserInfo.gender" label="1">女</el-radio>
        </el-form-item>
        <el-form-item label="学院名称">
          <el-input v-model="editUserInfo.collegeName" />
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="editUserInfo.schoolNum" />
        </el-form-item>
      </el-form>
      <template slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click="commitEdit">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
const users = ref([]);
const editFormVisible = ref(false);
const editUserInfo = reactive({
  id: "",
  username: "",
  role: "",
  phoneNum: "",
  realName: "",
  idCard: "",
  gender: "",
  collegeName: "",
  schoolNum: "",
});
onMounted(() => getAllUserInfo());

const formatGender = (row: any, column: any, cellValue: any, index: number) => {
  return row.gender == 0 ? " 男 " : row.gender == 1 ? " 女 " : " 其他 ";
};

const getAllUserInfo = () => {
  // TODO request
};

const commitEdit = () => {
  // TODO
};

const handleEdit = (row: any) => {
  editUserInfo.id = row.id;
  editUserInfo.username = row.username;
  editUserInfo.role = row.role;
  editUserInfo.phoneNum = row.phoneNum;
  editUserInfo.realName = row.realName;
  editUserInfo.idCard = row.idCard;
  editUserInfo.collegeName = row.collegeName;
  editUserInfo.schoolNum = row.schoolNum;
  editUserInfo.gender = row.gender;
  editFormVisible.value = true;
};

const handleDelete = (row: any) => {
  // TODO request
};
</script>

<style scoped></style>

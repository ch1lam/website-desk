<template>
  <div>
    <el-table :data="courses" style="width: 100%" stripe>
      <el-table-column prop="id" label="课程id" width="80"></el-table-column>
      <el-table-column prop="name" label="课程名" width="600"></el-table-column>
      <el-table-column prop="teacherName" label="讲师" width="100">
        <template v-slot="scope">
          <el-tag>{{ scope.row.teacherName }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="right">
        <template slot="header">
          <el-button size="small" type="primary" @click="handleAddCourse">新增课程</el-button>
        </template>
        <!-- TODO -->
        <!-- <template>
          <el-button size="small" type="info" @click="handleDetail(scope)">详细信息</el-button>
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-popconfirm confirmButtonText="好的" cancelButtonText="取消" icon="el-icon-info" iconColor="red"
            title="确定删除该课程吗？" @onConfirm="handleDelete(scope.$index, scope.row)">
            <el-button size="small" type="danger" style="margin-left: 10px" slot="reference">删除</el-button>
          </el-popconfirm>
        </template> -->
      </el-table-column>
    </el-table>

    <el-dialog title="添加课程" v-model="addFormVisible" center>
      <el-form :model="addCourseInfo">
        <el-form-item label="课程名称：">
          <el-input v-model="addCourseInfo.courseName" />
        </el-form-item>
        <el-form-item label="讲师名称：">
          <el-input v-model="addCourseInfo.teacherName" />
        </el-form-item>
      </el-form>
      <template #footer class="dialog-footer">
        <span class="dialog-footer">
          <el-button @click="addFormVisible = false">取消</el-button>
          <el-button type="primary" @click="handleAdd">确认</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog title="编辑课程" v-model="editFormVisible" center>
      <el-form :model="editCourseInfo">
        <el-form-item label="课程名称：">
          <el-input v-model="editCourseInfo.courseName" />
        </el-form-item>
        <el-form-item label="讲师名称：">
          <el-input v-model="editCourseInfo.teacherName" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editFormVisible = false">取消</el-button>
          <el-button type="primary" @click="commitEdit">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const addCourseInfo = reactive({
  courseName: "",
  teacherName: "",
  sequence: 0,
})

const editCourseInfo = reactive({
  id: "",
  courseName: "",
  teacherName: "",
})

let courses: any[] = [];
const addFormVisible = ref(false);
const editFormVisible = ref(false);
let router = useRouter();
onMounted(() => {
  getAllCourseInfo();
})
const getAllCourseInfo = () => {
  // TODO
  axios.post("/api/student/getAllCourseInfo2", { header: { Token: "test" } }).then(res => {
  })
}

const handleDelete = () => {

}

const handleAdd = () => {
  // TODO
}

const handleEdit = (row:any) => {
  editCourseInfo.id = row.id;
  editCourseInfo.courseName = row.name;
  editCourseInfo.teacherName = row.teacherName;
  editFormVisible.value = true;

}
const handleDetail = (scope: any) => {
  router.push({
    name: "ChapterManager",
    params: { id: scope.row.id, sequence: scope.$index + 1 }
  })
}
const handleAddCourse = () => {
  addCourseInfo.sequence = courses.length + 1;
  addFormVisible.value = true;
}
const commitEdit = () => {
  // TODO
}

</script>

<style scoped>
</style>
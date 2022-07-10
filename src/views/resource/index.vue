<template>
  <div>
    <el-table :data="fileList" style="width: 100%" stripe>
      <el-table-column prop="id" label="id" width="80" />

      <el-table-column prop="name" label="文件名" />

      <el-table-column prop="size" label="文件大小" width="100">
        <template v-slot="scope">
          <el-tag>{{ scope.row.size }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="上传日期" />
      <el-table-column prop="chapterId" label="所属章节id" width="100" />
      <el-table-column prop="url" label="文件路径" />
      <el-table-column label="操作" align="right">
        <template v-slot="scope">
          <el-button size="small">
            <a
              :href="'/api/student/download/' + scope.row.id"
              :download="scope.row.name"
              >下载</a
            >
          </el-button>
          <template v-if="role == 'admin'">
            <el-popconfirm
              confirmButtonText="好的"
              cancelButtonText="取消"
              icon="el-icon-info"
              iconColor="red"
              title="确定删除该文件吗？"
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
          <template v-else-if="role == 'teacher'">
            <el-popconfirm
              confirmButtonText="好的"
              cancelButtonText="取消"
              icon="el-icon-info"
              iconColor="red"
              title="确定删除该文件吗？"
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
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
const uploadUrl = ref("/api/guest/uploadVideo");
const fileList = ref([]);
const role = ref("");

onMounted(() => {
  getAllFileInfo();
});

const getAllFileInfo = () => {
  // TODO request
};

const handleDelete = (row: any) => {
  // TODO request delete
};
</script>

<style scoped></style>

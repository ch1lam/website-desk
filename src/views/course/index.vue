<!--
 * @Description  :
 * @Author       : ch1lam
 * @Date         : 2022-05-20 18:24:12
 * @LastEditTime : 2022-05-29 01:11:16
 * @LastEditors  : chilam
 * @FilePath     : \website-desk\src\views\course\index.vue
-->
<template>
  <div class="container">
    <el-card shadow="hover" @click.native="handleClick(course)" v-for="course in courses" :key="course.id">
      <div class="img-container">
        <el-image style="width: 100%; height: 150px" :src="'/api/student/getPoster?id=' + course.id" fit="cover" />
      </div>

      <div style="padding:14px">
        <span>《 {{ course.name }} 》</span>
        <div class="bottom">
          <span>主讲人：{{ course.teacherName }}</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { useRouter } from "vue-router";

interface Course {
  id: number;
  name: string;
  teacherName: string
}

onMounted(() => {
  getAllCourseInfo();
})

const router = useRouter();

const courses = reactive<Course[]>([])

const getAllCourseInfo = () => {
  console.log("请求后端获取所有的课程信息");
  courses.push(
    {
      id: 1,
      name: "课程A",
      teacherName: "刘老师",
    },
    {
      id: 2,
      name: "课程B",
      teacherName: "张老师",
    },
    {
      id: 3,
      name: "课程C",
      teacherName: "王老师",
    },
    {
      id: 4,
      name: "课程D",
      teacherName: "徐老师",
    },
    {
      id: 5,
      name: "课程E",
      teacherName: "李老师",
    },
    {
      id: 6,
      name: "课程F",
      teacherName: "陈老师",
    },
    {
      id: 7,
      name: "课程G",
      teacherName: "朱老师",
    },
    {
      id: 8,
      name: "课程H",
      teacherName: "梁老师",
    },
    {
      id: 9,
      name: "课程I",
      teacherName: "宋老师",
    }
  )
}


const handleClick = (course: any) => {
  router.push({ path: `/dashboard/${course.id}` });
}
</script>

<style scoped>
.container {
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(28rem, 1fr));
  grid-template-rows: repeat(auto-fill, 1fr);
  grid-gap: 2rem;
}
</style>
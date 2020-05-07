<template>
  <div class="box">
    <el-col :span="20">
      <video-player :options="videoOptions" />
    </el-col>
    <el-col :span="4">
      <video-list />
    </el-col>
  </div>
</template>

<script>
import VideoPlayer from "@/components/VideoPlayer.vue";
import VideoList from "@/components/VideoList.vue";

export default {
  name: "VideoExample",
  components: {
    VideoPlayer,
    VideoList
  },
  data() {
    return {
      videoOptions: {
        autoplay: true,
        controls: true,
        loop: true,
        sources: [
          {
            // src: "https://v-cdn.zjol.com.cn/280443.mp4",
            src: "http://127.0.0.1:9999/guest/video",
            type: "video/mp4"
          }
        ]
      }
    };
  }
};
</script>
<style scoped>
.box {
  height: 100%;
}
.el-col {
  height: 100%;
}
</style>
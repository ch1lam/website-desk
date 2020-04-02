<template>
  <div class="box">
    <video-player :options="videoOptions" />
  </div>
</template>

<script>
import VideoPlayer from "@/components/VideoPlayer.vue";

export default {
  name: "VideoExample",
  components: {
    VideoPlayer
  },
  data() {
    return {
      videoOptions: {
        autoplay: true,
        controls: true,
        sources: [
          {
            // src: "https://v-cdn.zjol.com.cn/280443.mp4",
            src: "../../videos/280443.mp4",
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
</style>
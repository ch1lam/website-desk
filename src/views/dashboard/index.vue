<template>
  <div class="box">
    <el-col :span="18" class="videoBox">
      <video
        id="myVideo"
        class="video-js"
        data-setup='{"height":600,"width":800}'
        ref="video"
        width="800"
        height="600"
        preload="auto"
        autoplay
        controls
      ></video>
    </el-col>
    <el-col :span="6" class="tree_warpper">
      <el-tree
        :data="chapters"
        :props="defaultProps"
        :highlight-current="true"
        :default-expand-all="true"
        :expand-on-click-node="false"
        @node-click="handleNodeClick"
        ref="tree"
      ></el-tree>
      <!-- 
      <video-list :chapters="chapters" />-->
    </el-col>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  name: "VideoExample",

  components: {
    // VideoPlayer
  },
  data() {
    return {
      videoOptions: {
        autoplay: false,
        height: 600,
        width: 800,
        controls: true,
        preload: "auto",
        loop: true,
        sources: [
          {
            // src: "https://v-cdn.zjol.com.cn/280443.mp4",
            src: "",
            type: "video/mp4"
          }
        ]
      },
      defaultProps: {
        id: "id",
        sequence: "sequence",
        children: "children",
        videoId: "videoId",
        label: data => {
          return data.sequence + ". " + data.label;
        }
      },
      chapters: []
    };
  },
  mounted: function() {
    this.getAllChapter();
    this.initVideo();
  },
  methods: {
    initVideo() {
      //初始化视频方法
      let myPlayer = this.$video(myVideo, {
        //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
        controls: true,
        //自动播放属性,muted:静音播放
        autoplay: "muted",
        //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
        preload: "auto",
        //设置视频播放器的显示宽度（以像素为单位）
        width: "800px",
        //设置视频播放器的显示高度（以像素为单位）
        height: "400px"
      });
    },
    getAllChapter() {
      axios
        .post(
          "/api/student/getAllChapter",
          qs.stringify({ id: this.$route.params.id }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Token: this.$store.state.token
            }
          }
        )
        .then(res => {
          if (res.data.success === true) {
            this.chapters = res.data.data.chapters;
          }
        });
    },
    handleNodeClick(data) {
      this.$refs.video.src = "/api/guest/video?id=" + data.id;

      // this.$ref.video11.options = this.videoOptions;
      // console.log(this.$ref.video11.options);
    }
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
.videoBox {
  display: flex;
  justify-content: center;
}
.tree_warpper {
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 30px;
  border-right-style: solid;
  border-width: 1px;
  border-color: gray;
}
.video-js {
  width: 800px;
  height: 600px;
}
</style>
<template>
  <div class="box">
    <el-col :span="18" class="videoBox">
      <video id="myVideo" class="video-js vjs-big-play-centered" ref="video" width="800" height="600" preload="auto"
        autoplay controls></video>
    </el-col>
    <el-col :span="6" class="tree_wrapper">
      <el-tree :data="chapters" :props="defaultProps" :highlight-current="true" :default-expand-all="true"
        :expand-on-click-node="false" @node-click="handleNodeClick" ref="tree"></el-tree>
      <!--
      <video-list :chapters="chapters" />-->
    </el-col>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";


const videoOptions = reactive({
  autoplay: false,
  height: 600,
  width: 800,
  controls: true,
  preload: "auto",
  loop: true,
  sources: [
    {
      src: "",
      type: "video/mp4"
    }
  ]
})

const defaultProps = reactive({
  id: "id",
  sequence: "sequence",
  children: "children",
  videoId: "videoId",
  label: (data: any) => {
    return data.sequence + ". " + data.label;
  }
})
const currentChapterId = ref("");
const chapters = ref([]);

onMounted(() => { getCurrentChapterId() })

const getCurrentChapterId = () => {
  // TODO
}

const getAllChapter = (id:number) => {
  // TODO request
}

const handleNodeClick = () => {
  // TODO change video src
}

</script>

<style scoped>
.box {
  height: 100%;
}
.el-col {
  height: 100%;
}
.el-tree-node > .el-tree-node__children {
  overflow: visible;
}
.el-tree {
  min-width: 100%;
  display: inline-block !important;
}
.videoBox {
  display: flex;
  justify-content: center;
}
.tree_wrapper {
  overflow-y: auto;
  overflow-x: scroll;
  height: 100%;
  background-color: #ffffff;
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
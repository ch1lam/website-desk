<template>
  <div class="box">
    <el-row>
      <el-col :span="10" class="tree_wrapper">
        <div class="header_wrapper">
          <el-page-header @back="goBack" content="详情页面"></el-page-header>
        </div>
        <el-alert
          title="默认添加章节到子章节的最后顺位"
          type="warning"
          show-icon
        ></el-alert>
        <el-alert
          title="删除同级章节时请务必从最后章节删起"
          type="error"
          show-icon
        ></el-alert>
        <el-button
          size="small"
          class="add-btn"
          type="success"
          @click="addBigChapter"
          >添加大章节</el-button
        >
        <div class="tree_box">
          <el-tree
            :data="chapters"
            :props="defaultProps"
            :highlight-current="true"
            :default-expand-all="true"
            :expand-on-click-node="false"
            @node-click="handleNodeClick"
            ref="tree"
          >
            <template v-slot="{ node, data }">
              <span class="custom-tree-node">
                <span>{{ node.label }}</span>
                <span>
                  <el-button
                    type="text"
                    style="margin-right: 10px"
                    size="small"
                    @click="() => append(node)"
                    >添加小节</el-button
                  >
                  <el-popover
                    placement="top"
                    width="160"
                    :ref="'popover-' + data.id"
                  >
                    <p>确定删除吗？</p>
                    <div style="text-align: right; margin: 0">
                      <el-button
                        size="small"
                        type="text"
                        @click="pCancel(data.id)"
                        >取消</el-button
                      >
                      <el-button
                        type="primary"
                        size="small"
                        @click="deleteSubmit(data)"
                        >确定</el-button
                      >
                    </div>
                    <el-button
                      type="text"
                      size="small"
                      slot="reference"
                      @click="pOpen(data.id)"
                      >删除</el-button
                    >
                  </el-popover>
                </span>
              </span>
            </template>
          </el-tree>
        </div>
      </el-col>
      <el-col :span="14" class="detail_wrapper">
        <el-upload
          class="poster-uploader"
          action="/api/teacher/postPoster"
          accept="image/jpeg, image/jpg, image/png"
          :headers="uploadHeader"
          :data="uploadData"
          :show-file-list="false"
          :on-success="handlePosterSuccess"
          :on-error="handleAvatarError"
          :before-upload="beforeAvatarUpload"
        >
          <el-image v-if="imageUrl" :src="imageUrl" class="poster" fit="fill">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <span>更换课程封面</span>

        <el-form :model="detailForm" label-width="100px">
          <el-form-item label="章节名：">
            <el-input v-model="detailForm.name" />
          </el-form-item>
          <el-form-item label="章节排序：">
            <el-input :disabled="true" v-model="detailForm.sequence" />
          </el-form-item>
          <el-form-item label="子章节数：">
            <el-input :disabled="true" v-model="detailForm.countChild" />
          </el-form-item>
          <el-form-item label="叶子章节：">
            <el-switch
              v-model="uploadVisible"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </el-form-item>
          <el-form-item label="视频上传：" v-if="uploadVisible === true">
            <el-upload
              class="upload-wrapper"
              action="/api/teacher/uploadVideo"
              accept="video/mp4"
              :headers="uploadHeader"
              :data="uploadVideoData"
              :show-file-list="false"
              :on-success="videoUploadSuccess"
              :on-progress="videoUploading"
            >
              <el-button class="uploadButton" type="primary"
                >选择视频...</el-button
              >
              <div slot="tip" class="el-upload__tip">
                <el-alert
                  title="务必保证在叶子章节才上传一个视频; 视频数量为1; 视频格式只能为mp4; "
                  type="info"
                  :closable="false"
                  show-icon
                ></el-alert>
              </div>
            </el-upload>
            <el-progress
              v-if="videoFlag == true"
              type="line"
              :percentage="videoUploadPercent"
              style="margin-top: 30px"
            ></el-progress>
          </el-form-item>
          <el-form-item label="文件上传：" v-if="uploadVisible === true">
            <el-upload
              class="upload-wrapper"
              action="/api/teacher/uploadFile"
              :headers="uploadHeader"
              :data="uploadVideoData"
              :show-file-list="false"
              :before-upload="beforeUploadFile"
              :on-progress="fileUploading"
              :on-success="fileUploadSuccess"
            >
              <el-button class="uploadButton" type="primary"
                >选择文件...</el-button
              >
              <div slot="tip" class="el-upload__tip">
                <el-alert
                  title="务必保证在叶子章节才上传课件; 课件数量不限; 课件格式不限"
                  type="info"
                  :closable="false"
                  show-icon
                ></el-alert>
              </div>
              <el-progress
                v-if="progressFlag == true"
                type="line"
                :percentage="fileUploadPercent"
                style="margin-top: 30px"
              ></el-progress>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateSubmit">提交修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-dialog title="添加章节" v-model="addFormVisible" center>
      <el-form :model="appendForm">
        <el-form-item label="课程名称：">
          <el-input v-model="appendForm.chapterName" />
        </el-form-item>
        <el-form-item label="父级课程ID">
          <el-input :disabled="true" v-model="appendForm.parentId" />
        </el-form-item>
        <el-form-item label="当前层级顺序">
          <el-input :disabled="true" v-model="appendForm.sequence" />
        </el-form-item>
      </el-form>
      <template slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click="handleAdd">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const route = useRoute();
const router = useRouter();

const currentChapterId = ref("");
const videoFlag = ref(false);
const videoUploadPercent = ref(0);
const progressFlag = ref(false);
const fileUploadPercent = ref(0);
const uploadVideoData = reactive({ id: "" });
const addFormVisible = ref(false);
const uploadVisible = ref(false);
const imageUrl = ref("/api/student/getPoster?id=" + route.params.id);
// TODO
const uploadHeader = reactive({ Token: "token" });
// const uploadHeader = reactive({ Token: this.$store.state.token });
const uploadData = reactive({
  courseId: route.params.id,
  sequence: route.params.sequence,
});
const chapters = ref([]);
const defaultProps = reactive({
  id: "id",
  sequence: "sequence",
  children: "children",
  videoId: "videoId",
  label: (data: any) => data.sequence + ". " + data.label,
});
const detailForm = reactive({
  id: "",
  name: "",
  sequence: "",
  countChild: "",
});
const appendForm = reactive({
  chapterName: "",
  parentId: "",
  sequence: "",
});

const handleNodeClick = (data: any) => {
  detailForm.id = data.id;
  detailForm.name = data.name;
  detailForm.sequence = data.sequence;
  detailForm.countChild = data.countChild.length;
  uploadVideoData.id = data.id;
};

const goBack = () => {
  router.push("/courseManager");
};

const append = (node: any) => {
  appendForm.parentId = node.data.id;
  appendForm.sequence = node.childNodes.length + 1;
  addFormVisible.value = true;
};

const handlePosterSuccess = (res: any, file: any) => {
  imageUrl.value = URL.createObjectURL(file.raw);
};

const handleAvatarError = (err: Error) => {
  console.log(err);
};

const beforeAvatarUpload = (file: File) => {
  const isJPG = file.type === "image/jpeg";
  const isPNG = file.type === "image/png";
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJPG && !isPNG) {
    ElMessage({
      message: "上传头像图片只能是 JPG 或 PNG 格式!",
      type: "error",
    });
    return isJPG && isPNG;
  }
  if (!isLt2M) {
    ElMessage({
      message: "上传头像图片大小不能超过 2MB!",
      type: "error",
    });
    return isLt2M;
  }
};
const getAllChapter = () => {
  // TODO request
};

const handleAdd = () => {
  // TODO request
};

const addBigChapter = () => {
  // TODO request
};

const getCurrentChapterId = () => {
  // TODO request
};

const deleteSubmit = (data: any) => {
  // TODO request
};

const updateSubmit = () => {
  // TODO request
};

const beforeUploadFile = (file: any) => {
  const isLt100M = file.size / 1024 / 1024 < 100;
  if (!isLt100M) {
    return false;
  }
};

const videoUploadSuccess = (res: any, file: any, fileList: any) => {
  videoFlag.value = false;
  videoUploadPercent.value = 0;
  if (file.status === "success") {
    ElMessage({});
  }
};
const fileUploadSuccess = (res: any, file: any, fileList: any) => {
  progressFlag.value = false;
  fileUploadPercent.value = 0;
  if (file.status == "success") {
    ElMessage({
      message: "上传成功",
      type: "success",
      showClose: true,
      center: true,
    });
  } else {
    ElMessage({
      message: "上传失败",
      type: "error",
      showClose: true,
      center: true,
    });
  }
};

const videoUploading = (event: Event, file: any, fileList: any) => {
  videoFlag.value = true;
  videoUploadPercent.value = Math.abs(file.percentage.toFixed(0));
};
const fileUploading = (event: Event, file: any, fileList: any) => {
  progressFlag.value = true;
  fileUploadPercent.value = Math.abs(file.percentage.toFixed(0));
};
const pCancel = (id: number) => {
  pClose(id);
};

const pClose = (id: number) => {
  // TODO
};

const pOpen = (id: number) => {
  // TODO
};
</script>

<style scoped>
.box {
  display: flex;
  flex-direction: column;
}
.box,
.el-row,
.tree_wrapper,
.detail_wrapper {
  height: 100%;
}

.header_wrapper {
  padding: 16px;
  background-color: white;
}
.tree_wrapper {
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 30px;
  border-right-style: solid;
  border-width: 1px;
  border-color: gray;
}
.detail_wrapper {
  padding: 30px;
  background-color: white;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.poster-uploader {
  margin: 0;
}
.poster-uploader >>> .el-upload {
  border: 2px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.poster-uploader >>> .el-upload:hover {
  border-color: #409eff;
}
.poster-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.poster {
  width: 240px;
  height: 150px;
  display: block;
}
.add-btn {
  flex: none;
  text-align: right;
  align-self: flex-end;
  margin-bottom: 10px;
  margin-right: 9px;
}
.el-form {
  margin-top: 20px;
}
.el-switch {
  width: 100%;
}
.uploadButton {
  width: 100%;
}
.el-alert {
  height: 30px;
}
.upload-wrapper >>> .el-upload {
  width: 100%;
}
.tree_box {
  overflow-y: auto;
  overflow-x: scroll;
  width: auto;
  height: 100%;
}
.el-tree {
  min-width: 100%;
  display: inline-block !important;
}
.el-tree-node > .el-tree-node__children {
  overflow: visible;
}
</style>

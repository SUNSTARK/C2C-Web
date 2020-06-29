<template>

  <div>
<!--    <el-button type="success"-->
<!--               @click="dialogVisible2 = true">点击更换头像-->
<!--    </el-button>-->
    <el-dialog title="上传头像"
               :visible.sync="dialogVisible2"
               width="30%"
               :modal-append-to-body="false"
               @close="closeCallback">
      <el-form :model="form">

        <el-form-item :label-width="formLabelWidth"
                      ref="uploadElement">
          <el-upload ref="upload"
                     action="#"
                     accept="image/png,image/gif,image/jpg,image/jpeg"
                     list-type="picture-card"
                     :limit=limitNum
                     :auto-upload="false"
                     :on-exceed="handleExceed"
                     :before-upload="handleBeforeUpload"
                     :on-preview="handlePictureCardPreview"
                     :on-remove="handleRemove"
                     :on-change="imgChange"
                     :class="{hide:hideUpload}">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" :modal-append-to-body="false">
            <img width="100%"
                 :src="dialogImageUrl"
                 alt="">
          </el-dialog>
        </el-form-item>

        <el-form-item >
          <el-button size="small" type="primary" @click="uploadFile" style="margin-left: 150px">立即上传</el-button>
          <el-button size="small" @click="tocancel">关闭</el-button>
        </el-form-item>

      </el-form>
    </el-dialog>
  </div>


</template>

<script>
  import {fetch_user_icon, fetch_editicon} from "../../../api/user_apis";

  export default {
    name: "icon",
    props: {
      dialogIconVisible: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        hideUpload: false,
        dialogImageUrl: '',
        dialogVisible: false,//图片预览弹窗
        formLabelWidth: '80px',
        limitNum: 1,
        form: {},
        dialogVisible2: this.dialogIconVisible,//弹窗
        iconurl:''
      }
    },
    methods: {
      closeCallback() {
        this.$emit("successIconCallback")
      },
      // 上传文件之前的钩子
      handleBeforeUpload(file) {
        if (!(file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg' || file.type === 'image/jpeg')) {
          this.$notify.warning({
            title: '警告',
            message: '请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片'
          })
        }
        let size = file.size / 1024 / 1024 / 2
        if (size > 2) {
          this.$notify.warning({
            title: '警告',
            message: '图片大小必须小于2M'
          })
        }
        let fd = new FormData();//通过form数据格式来传
        fd.append("image-file", file); //传文件
        console.log(fd.get('picFile'));

        this.$axios.put('/file', fd, {headers: {'Content-Type': 'multipart/form-data'}})
          .then(res => {
            console.log('数据是:', res.data.data);
            if(res.data.msg=="成功！")
            {
             console.log("上传成功");
             this.iconurl=res.data.data;
              this.$message({
                showClose: true,
                message: "上传成功！",
                type: 'success'
              });
            }
          })
          .catch((e) => {
            console.log('获取数据失败');
            this.errmessages();
          })
      },
      // 文件超出个数限制时的钩子
      handleExceed(files, fileList) {

      },
      // 文件列表移除文件时的钩子
      handleRemove(file, fileList) {
        this.hideUpload = fileList.length >= this.limitNum;

      },
      // 点击文件列表中已上传的文件时的钩子
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      uploadFile() {
        this.$refs.upload.submit()

      },
      imgChange(files, fileList) {
        this.hideUpload = fileList.length >= this.limitNum;
        if (fileList) {
          this.$refs.uploadElement.clearValidate();
        }
      },
      tocancel() {
        this.dialogVisible2 = false
      }

    },
    mounted() {
    }

  }
</script>

<style scoped>

</style>

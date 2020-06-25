<template>
  <el-dialog :title="title" width="800px" :visible.sync="visible" destroy-on-close @close="closeCallback">
    <div class="card">
    <p class="title"><i class="fa fa-th-large fa-lg"></i>个人资料</p>
    <el-form :model="ruleForm2" status-icon :rules="rules" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm2.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="ruleForm2.sex">
          <el-radio label="1">男</el-radio>
          <el-radio label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄" prop="age" :rules="[
      { required: true, message: '年龄不能为空'},
      { type: 'number', message: '年龄必须为数字值'}
    ]">
        <el-input v-model="ruleForm2.age" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobilePhone">
        <el-input v-model="ruleForm2.mobilePhone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">确 定</el-button>
        <el-button @click="resetForm('ruleForm2')">重 置</el-button>
      </el-form-item>
    </el-form>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "userInfo",
  props: {
    title: {
      type: String,
      default: "账号信息"
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    userId: {
      type: String,
      default: ""
    }
  },
  data () {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        console.log(reg.test(value));
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error('请输入正确的手机号'));
        }
      }
    }
    return {
      roleName: false,
      roleData: "",
      visible: this.dialogVisible,
      ruleForm2: {
        mobilePhone: "",
        sex: "1",
        age: "",
        name: "",
      },
      rules: {
        mobilePhone:[
          {required: true, validator: checkPhone, trigger: "blur"}
        ],
        sex:[
          {required: true}
        ],
        name:[
          {required: true}
        ]
      }
    }
  },
  methods: {
    closeCallback () {
      this.$emit("successCallback")
    },
    submitForm (formName) {
      let that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let newData = {}
          let fetchFn = this.$request.fetchEditUser
          if (!that.userId) {
            for (let item in that.ruleForm2) {
              if (item !== "checkPass") {
                newData[item] = that.ruleForm2[item]
              }
            }
            fetchFn = this.$request.fetchRegister
          } else {
            for (let item in that.ruleForm2) {
              if (item !== "password" && item !== "checkPass") {
                newData[item] = that.ruleForm2[item]
              }
            }
          }
          fetchFn(newData).then((res) => {
            that.$message({
              showClose: true,
              message: res.data.message,
              type: "success"
            })
          }).catch((err) => {
            console.log(err)
          })
        } else {
          console.log("error submit!!")
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  mounted () {
    // this.getList()
  }
}
</script>
<style scoped>
  .demo-ruleForm {
    width: 460px;
    padding-top: 25px;
  }
  .el-select {
    width: 100%;
  }
  .card {
    width: 560px;
    padding-bottom: 15px;
    margin: 0px auto;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

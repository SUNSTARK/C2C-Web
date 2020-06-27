<template>
  <el-dialog title="修改密码" width="700px" :visible.sync="visible" destroy-on-close :modal-append-to-body="false"
             @close="closeCallback">
    <div class="card">
      <p class="title"><i class="fa fa-th-large fa-lg"></i>修改密码</p>
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="原密码" prop="oldPassword">
          <el-input type="password" v-model="ruleForm2.oldPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm2.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
  import Cookies from "js-cookie"
  import {fetch_editpwd} from "../../api/user_apis";
  export default {
    name: "editPassword",
    props: {
      dialogVisible: {
        type: Boolean,
        default: false
      }
    },
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"))
        } else if (value.toString().length < 6) {
          callback(new Error("密码长度不能低于6位"))
        } else {
          if (this.ruleForm2.checkPass !== "") {
            this.$refs.ruleForm2.validateField("checkPass")
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入密码"))
        } else if (value.toString().length < 6) {
          callback(new Error("密码长度不能低于6位"))
        } else if (value !== this.ruleForm2.password) {
          callback(new Error("两次输入密码不一致!"))
        } else {
          callback()
        }
      }
      return {
        visible: this.dialogVisible,
        ruleForm2: {
          oldPassword: "",
          password: "",
          checkPass: ""
        },
        rules2: {
          oldPassword: [
            {required: true, validator: validatePass, trigger: "blur"}
          ],
          password: [
            {required: true, validator: validatePass, trigger: "blur"}
          ],
          checkPass: [
            {required: true, validator: validatePass2, trigger: "blur"}
          ]
        }
      }
    },
    methods: {
      closeCallback() {
        this.$emit("editPwdCallback")
      },
      submitForm(formName) {
        let that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data={
              user_account:this.$store.getters.account,
              olduser_passwd:that.ruleForm2.oldPassword,
              newuser_passwd:that.ruleForm2.password,

            }
            fetch_editpwd(data)
              .then(res => {
                console.log('数据是:', res);
                if(res.msg=="修改成功")
                {
                  this.messages();
                  Cookies.remove("token")
                  this.$store.dispatch("setRole", '')  // 清空$store内存相关信息
                  this.$store.dispatch("setAccount", '')
                  this.$router.push({path:'/login'})

                }else  if(res.msg=="修改失败，帐号密码不正确")
                {
                  this.unmessages();
                }
              })
          } else {
            console.log("error submit!!")
            return false
          }
        })
      },
      messages()
      {
        this.$message({
          showClose: true,
          message: '修改密码成功，请重新登录',
          type: 'success'
        });
      },
      unmessages()
      {
        this.$message({
          showClose: true,
          message: '修改失败，帐号密码不正确',
          type: 'error'
        });
      },
      errmessages()
      {
        this.$message({
          showClose: true,
          message: '出bug了,联系管理员',
          type: 'warning'
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style scoped>
  .demo-ruleForm {
    width: 460px;
    padding-top: 25px;
  }

  .card {
    width: 560px;
    padding-bottom: 15px;
    margin: 0px auto;
  }
</style>

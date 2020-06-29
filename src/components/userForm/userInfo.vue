<template>
  <el-dialog title="编辑信息" width="800px" :visible.sync="visible" destroy-on-close :modal-append-to-body="false" @close="closeCallback">

      <el-form :model="ruleForm2" status-icon :rules="rules" ref="ruleForm2" label-width="100px" >
      <el-row>
        <el-col style="width: 45%">

          <el-form-item label="昵称" prop="user_account">
            <el-input v-model="ruleForm2.user_name"></el-input>
          </el-form-item>

          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="ruleForm2.gender">
              <el-radio label="1">男</el-radio>
              <el-radio label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="用户名" prop="user_account" >
            <el-input v-model="ruleForm2.user_account" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="手机号" prop="phone">
            <el-input v-model="ruleForm2.phone" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">确 定</el-button>
            <el-button @click="resetForm('ruleForm2')">重 置</el-button>
          </el-form-item>
        </el-col>
        <el-col style="width: 45%" >

          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm2.name" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="生日" prop="birthday">
            <el-date-picker v-model="ruleForm2.birthday" type="date" placeholder="选择日期" style="width: 100%">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="省份" prop="province">
            <el-input v-model="ruleForm2.province" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="地址" prop="address">
            <el-input v-model="ruleForm2.address" autocomplete="off"></el-input>
          </el-form-item>

        </el-col>
      </el-row>
      </el-form>


  </el-dialog>
</template>

<script>
  import {fetch_user_personal,fetch_editinfo} from "../../api/user_apis";
  export default {
    name: "userInfo",
    props: {
      dialogVisible: {
        type: Boolean,
        default: false
      }
    },
    data() {
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
        info_gender:'',
        ifreload:false,
        ruleForm2: {
          user_account:'',
          phone: "",
          gender: "",
          user_name: '',
          name: "",
          address:'',
          birthday:'',
          province:'',
        },
        rules: {
          phone: [
            {required: true, validator: checkPhone, trigger: "blur"}
          ],
          gender: [
            {required: true}
          ],
          name: [
            {required: true,message: '姓名不能为空'}
          ],
          user_name:[
              { required: true, message: '账号不能为空'},
          ],
          birthday:[
            {required: true,message: '生日不能为空'}
          ],
          province: [
            {required: true,message: '省份不能为空'}
          ],
          address: [
            {required: true,message: '地址不能为空'}
          ],
          user_account: [
            {required: true,message: '账号不能为空'}
          ]
        }
      }
    },
    methods: {
      getuser() {
        fetch_user_personal().then(res => {
          console.log(res)
          //console.log(this.userform.address)
          this.ruleForm2.user_account=res.data.user_account;
          this.ruleForm2.phone=res.data.phone;
          if(res.data.gender=="woman")
          {
            this.ruleForm2.gender="2"
          }else if(res.data.gender=="man")
          {
            this.ruleForm2.gender="1"
          }
          this.ruleForm2.user_name=res.data.user_name;
          this.ruleForm2.name=res.data.name;
          this.ruleForm2.address=res.data.address;
          this.ruleForm2.birthday=res.data.birthday;
          this.ruleForm2.province=res.data.province;
        })
      },

      closeCallback() {
        this.$emit("successCallback")
        console.log("关闭");
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              if(this.ruleForm2.gender==1) {
                this.info_gender='man'
              }else {
                this.info_gender='woman'
              }
            let data={
              address: this.ruleForm2.address,
              birthday: this.ruleForm2.birthday,
              gender: this.info_gender,
              name: this.ruleForm2.name,
              phone: this.ruleForm2.phone,
              province:this.ruleForm2.province,
              user_account: this.ruleForm2.user_account,
              user_name: this.ruleForm2.user_name
            }
            fetch_editinfo(data)
              .then(res => {
                console.log('数据是:', res);
                if(res.msg=="修改成功") {
                  console.log("个人信息修改成功");
                  this.messages()
                  this.closeCallback()
                }
              })
              .catch((e) => {
                console.log('获取数据失败');
                this.errmessages();
              })

            //console.log(this.ruleForm2)
          } else {
            console.log("error submit!!")
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      messages()
      {
        this.$message({
          showClose: true,
          message: "个人信息修改成功！",
          type: 'success'
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
    },
    mounted() {
      this.getuser()
    },

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
    width: 100%;
    padding-bottom: 15px;
    margin: 0 auto;
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

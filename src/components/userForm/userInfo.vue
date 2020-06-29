<template>
  <el-dialog title="编辑信息" width="800px" :visible.sync="visible" destroy-on-close :modal-append-to-body="false" @close="closeCallback">

      <el-form :model="ruleForm2" status-icon :rules="rules" ref="ruleForm2" label-width="100px" >
      <el-row>
        <el-col style="width: 45%">

          <el-form-item label="昵称" prop="user_name">
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

        </el-col>
        <el-col style="width: 45%" >

          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm2.name" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="生日" prop="birthday">
            <el-date-picker v-model="ruleForm2.birthday" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width: 100%">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="省份" prop="province">
<!--            <el-input v-model="ruleForm2.province" autocomplete="off"></el-input>-->
            <el-select v-model="ruleForm2.province" filterable placeholder="请选择，支持模糊搜索">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="地址" prop="address">
            <el-input v-model="ruleForm2.address" autocomplete="off"></el-input>
          </el-form-item>

        </el-col>
      </el-row>
      </el-form>
    <el-button type="primary" @click="submitForm('ruleForm2')" style="margin-left: 280px">确定</el-button>
    <el-button @click="resetForm('ruleForm2')">重置</el-button>
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
          // console.log(reg.test(value));
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
          phone: '',
          gender: '',
          user_name: '',
          name: '',
          address:'',
          birthday:'',
          province:'',
        },
        rules: {
          phone: [
            {required: true, validator: checkPhone, trigger: "blur"}
          ],
          gender: [
            {required: true,message:'性别不能为空'}
          ],
          name: [
            {required: true,message: '姓名不能为空'}
          ],
          user_name:[
              { required: true, message: '昵称不能为空'},
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
            {required: true,message: '用户名不能为空'}
          ]
        },
        options: [{
          value: '江苏',
          label: '江苏'
        }, {
          value: '北京',
          label: '北京'
        }, {
          value: '上海',
          label: '上海'
        }, {
          value: '重庆',
          label: '重庆'
        }, {
          value: '河北',
          label: '河北'
        }, {
          value: '河南',
          label: '河南'
        }, {
          value: '云南',
          label: '云南'
        }, {
          value: '辽宁',
          label: '辽宁'
        }, {
          value: '黑龙江',
          label: '黑龙江'
        }, {
          value: '湖南',
          label: '湖南'
        }, {
          value: '安徽',
          label: '安徽'
        }, {
          value: '山东',
          label: '山东'
        }, {
          value: '新疆',
          label: '新疆'
        }, {
          value: '浙江',
          label: '浙江'
        }, {
          value: '江西',
          label: '江西'
        }, {
          value: '湖北',
          label: '湖北'
        }, {
          value: '广西',
          label: '广西'
        }, {
          value: '甘肃',
          label: '甘肃'
        }, {
          value: '山西',
          label: '山西'
        }, {
          value: '内蒙古',
          label: '内蒙古'
        }, {
          value: '陕西',
          label: '陕西'
        }, {
          value: '吉林',
          label: '吉林'
        }, {
          value: '福建',
          label: '福建'
        }, {
          value: '贵州',
          label: '贵州'
        }, {
          value: '广东',
          label: '广东'
        }, {
          value: '青海',
          label: '青海'
        }, {
          value: '西藏',
          label: '西藏'
        }, {
          value: '四川',
          label: '四川'
        }, {
          value: '宁夏',
          label: '宁夏'
        }, {
          value: '海南',
          label: '海南'
        }, {
          value: '台湾',
          label: '台湾'
        }, {
          value: '香港',
          label: '香港'
        }, {
          value: '澳门',
          label: '澳门'
        }, {
          value: '未知',
          label: '未知'
        }]
      }
    },
    methods: {
      getuser() {
        fetch_user_personal().then(res => {
          // console.log(res)
          this.ruleForm2.user_account=res.data.user_account;
          this.ruleForm2.phone=res.data.phone;
          if(res.data.gender=="woman") {
            this.ruleForm2.gender="2"
          }else if(res.data.gender=="man") {
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
            fetch_editinfo(data).then(res => {
              console.log(data)
              console.log(res)
                if(res.msg=="修改成功") {
                  console.log("个人信息修改成功");
                  this.messages()
                  this.closeCallback()
                }
              }).catch((e) => {
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
      messages() {
        this.$message({
          showClose: true,
          message: "个人信息修改成功！",
          type: 'success'
        });
      },
      errmessages() {
        this.$message({
          showClose: true,
          message: '出bug了,联系管理员',
          type: 'warning'
        });
      },
    },
    created() {
      this.getuser()
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

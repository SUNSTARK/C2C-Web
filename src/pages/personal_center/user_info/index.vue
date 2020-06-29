<template>
  <div class="box-card">
    <el-card class="tab-wrap" shadow="never">
      <div slot="header" class="clearfix">
        <b>个人信息</b>
        <el-button type="text" icon="el-icon-edit" style="float:right;" @click="editinfo()">编辑</el-button>
      </div>
      <el-row>
        <el-col :span="10" :offset="1">
          <div class="info">
            <el-table :data="tableData" style="width: 100%" :show-header="false">
              <el-table-column prop="uname" width="100px"></el-table-column>
              <el-table-column prop="udata"></el-table-column>
            </el-table>
          </div>
        </el-col>
        <el-col :span="5" :offset="4">
          <div class="avatar">
            <el-avatar :size="150" :src=usericon></el-avatar>
          </div>
          <el-button type="text" style="margin-left: 30px" @click="editicon()">点击更换头像</el-button>
        </el-col>
      </el-row>
    </el-card>
    <user-info v-if="dialogInfoVisible" :dialogVisible="dialogInfoVisible" @successCallback="successCallback"/>
    <icon ref="chil" v-if="dialogIconVisible" :dialogIconVisible="dialogIconVisible"
          @successIconCallback="successIconCallback"/>
  </div>
</template>

<script>
  import UserInfo from "../../../components/userForm/userInfo"
  import icon from "./icon";
  import {fetch_user_personal, fetch_user_icon, fetch_editicon} from '../../../api/user_apis'

  export default {
    name: "user_info",
    components: {
      UserInfo,
      icon
    },
    data() {
      return {
        userform: {},
        tableData: [],
        usericon: '',
        dialogInfoVisible: false,
        dialogIconVisible: false,
        imageurl: '',
      }
    },
    methods: {
      successCallback() {
        this.dialogInfoVisible = false;
        this.getuser()
      },
      successIconCallback() {
        this.dialogIconVisible = false;
        let chils = this.$refs['chil'];
        this.imageurl = chils.iconurl;
        console.log("图片链接" + this.imageurl);
        let data = {
          headportrait: this.imageurl
        }
        if (this.imageurl != '') {
          fetch_editicon(data).then(res => {
            console.log("头像更改成功" + res)
            this.$message({
              showClose: true,
              message: "头像修改成功！",
              type: 'success'
            });
          })
          this.imageurl = '';
        }
        ;
        setTimeout(this.get_icon,1000)
        //this.get_icon();

      },
      getuser() {
        fetch_user_personal().then(res => {
          // console.log(res)
          this.userform = res.data;
          this.tableData = [
            {
              uname: '昵称：',
              udata: this.userform.user_name
            },
            {
              uname: '姓名：',
              udata: this.userform.name
            },
            {
              uname: '性别：',
              udata: this.userform.gender
            },
            {
              uname: '生日：',
              udata: this.userform.birthday
            },
            {
              uname: '地址：',
              udata: this.userform.address
            },
            {
              uname: '用户名：',
              udata: this.userform.user_account
            },
            {
              uname: '省份：',
              udata: this.userform.province
            },
            {
              uname: '手机号：',
              udata: this.userform.phone
            }
          ]
          if (this.tableData[2].udata === 'woman') {
            this.tableData[2].udata = '女'
          }else if (this.tableData[2].udata === 'man') {
            this.tableData[2].udata = '男'
          }
        })
      },
      get_icon() {
        fetch_user_icon().then(res => {
          // console.log(res)
          this.usericon = res.data.headportrait
        })
      },
      editinfo() {
        console.log("编辑信息")
        this.dialogInfoVisible = true;

      },
      editicon() {
        console.log("更换头像");
        this.dialogIconVisible = true;

      }
    },
    mounted() {
      this.getuser(),
        this.get_icon()
    }
  }
</script>

<style scoped>
  .box-card {
    width: 100%;
    height: 93%;
  }

  .tab-wrap {
    padding: 0 20px;
    margin-left: 20px;
    overflow: inherit;
    height: 100%;
  }

  .info {
    line-height: 40px;
  }
</style>

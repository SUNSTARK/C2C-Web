<template>
 <div class="box-card">
   <el-card class="tab-wrap" shadow="never">
     <div slot="header" class="clearfix">
       <b>个人信息</b>
       <el-button type="text" icon="el-icon-edit" style="float:right;" @click="editinfo()">编辑</el-button>
     </div>

     <el-row>
       <el-col :span="10" style=" max-width: 500px;">
         <div class="info">
           <el-table :data="tableData" style="width: 100%" :show-header="false">
             <el-table-column prop="uname" width="180" ></el-table-column>
             <el-table-column prop="udata" width="230"></el-table-column>
           </el-table>
         </div>
       </el-col>
       <el-col :span="5">
         <div class="avatar">
           <el-avatar :size="150" :src=usericon></el-avatar>
         </div>
       </el-col>
     </el-row>
   </el-card>
   <user-info v-if="dialogInfoVisible" :dialogVisible="dialogInfoVisible" @successCallback="successCallback"/>
 </div>
</template>

<script>
  import UserInfo from "../../../components/userForm/userInfo"
  import {fetch_user_personal,fetch_user_icon} from '../../../api/user_apis'

    export default {
        name: "user_info",
      components: {
        UserInfo
      },
      data() {
        return{
          userform:{},
          tableData:[],
          usericon:'',
          dialogInfoVisible:false,
        }
      },
      methods:{
        successCallback () {
          this.dialogInfoVisible = false;
          this.getuser()
        },
          getuser() {
            fetch_user_personal().then(res => {
              console.log(res)
              this.userform=res.data;
              //console.log(this.userform.address)
              this.tableData=[
                {
                  uname:'用户名：',
                  udata:this.userform.user_name
                },
                {
                  uname:'姓名：',
                  udata:this.userform.name
                },
                {
                  uname:'性别：',
                  udata:this.userform.gender
                },
                {
                  uname:'生日：',
                  udata:this.userform.birthday
                },
                {
                  uname:'地址：',
                  udata:this.userform.address
                },
                {
                  uname:'账号：',
                  udata:this.userform.user_account
                },
                {
                  uname:'省份：',
                  udata:this.userform.province
                },
                {
                  uname:'电话：',
                  udata:this.userform.phone
                },
              ]
            })
          },
          geticon()
          {
            fetch_user_icon().then(res =>{
              console.log(res)
              this.usericon=res.data.headportrait
            })
          },
        editinfo()
        {
          console.log("编辑信息")
          this.dialogInfoVisible=true;

        }
      },
      mounted() {
          this.getuser(),
            this.geticon()
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
    overflow: inherit;
    height: 100%;
  }
  .info{
    line-height: 40px;

  }
</style>

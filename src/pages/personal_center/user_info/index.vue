<template>
 <div class="box-card">
   <el-card class="tab-wrap" style="width: 1000px">
     <div slot="header" class="clearfix">
       <font size="3"><b>个人信息</b></font>
       <el-button type="text" icon="el-icon-edit" style="float:right;">编辑</el-button>
     </div>
     <el-form :model="userinfo">
     <div class="info">
       <b>
       <p>用户名：{{userform.user_name}}</p>
       <p>姓名：{{userform.name}}</p>
       <p>性别：{{userform.gender}}</p>
       <p>生日：{{userform.birthday}}</p>
       <p>地址：{{userform.address}}</p>
       <p>账号：{{userform.user_account}}</p>
       <p>省份：{{userform.province}}</p>
       <p>电话：{{userform.phone}}</p>
       </b>
     </div>
     </el-form>
   </el-card>

 </div>
</template>

<script>
import {fetch_user_personal} from '../../../api/user_apis'
    export default {
        name: "user_info",
      data()
      {
        return{
          userform:[],
        }
      },
      methods:{
          getuser()
          {
            fetch_user_personal().then(res => {
              console.log(res)
              this.userform=res.data;
              //console.log(this.userform.address)
            })
          }
      },
      mounted() {
          this.getuser()
      }
    }
</script>

<style scoped>
  .tab-wrap {
    padding: 0 20px;
    margin: 0 20px;
    overflow: inherit;
    width: 100%;
  }
  .info{
    line-height: 40px;
  }
</style>

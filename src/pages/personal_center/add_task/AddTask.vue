<template>
  <el-row :gutter="20" type="flex">
    <el-col :span="11" :offset="2" >
      <div class="taskbox taskbox2">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm" :label-position="labelPosition" label-width="100px" >

        <el-card >
          <div slot="header">
            <h3 class="card1">基本信息</h3>
          </div>

          <el-form-item prop="task_name" label="任务标题：" style="margin:0px 0px 0px 0px">
            <el-input  v-model="ruleForm.task_name" clearable maxlength="20" show-word-limit></el-input>
          </el-form-item>

          <el-row>
            <el-col :span="16">
              <el-form-item prop="time_limit" label="任务时间：" style="margin:0px 0px 0px 0px" >
                <el-date-picker
                  v-model="ruleForm.time_limit"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="budget" label="薪酬：" style="margin:0px 0px 0px 0px">
                <el-input v-model.number="ruleForm.budget" clearable >
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
          <br>

        <el-card >
          <div slot="header">
            <h3 class="card1">需求信息</h3>
          </div>
          <el-form-item prop="detail" label="任务详情"  style="margin:0px 0px 0px 0px">
            <el-input :rows="8" type="textarea" v-model="ruleForm.detail" maxlength="1000"
                      show-word-limit ></el-input>

          </el-form-item>

          <el-row>
            <el-col :span="16">
              <el-form-item prop="tag" label="添加标签:" style="margin:0px 0px 0px 0px ">
                <el-select
                  v-model="ruleForm.tag"
                  multiple
                  filterable
                  allow-create
                  default-first-option
                  placeholder="请至少添加一个任务标签，可自定义"
                style="min-width: 400px">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" >
              <el-form-item prop="target_num" label="任务人数：" style="margin:0px 0px 0px 0px">
                <el-input v-model.number="ruleForm.target_num" clearable >
                  <template slot="append">人</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row >
            <el-col :span="16">
              <el-form-item prop="location" label="任务地点" style="margin:0px 0px 0px 0px;max-width:400px" >
                <el-input v-model="ruleForm.location" clearable maxlength="35" show-word-limit>

                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="iffile" label="答案是否需要附件" style="margin:0px 0px 0px 0px">
                <el-select v-model="ruleForm.iffile" >
                  <el-option label="需要" value="1"></el-option>
                  <el-option label="不需要" value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
<!--          <el-popover-->
<!--            placement="right"-->
<!--            width="400"-->
<!--            trigger="click">-->
<!--            <addt></addt>-->
<!--            <el-button slot="reference">click 激活</el-button>-->
<!--          </el-popover>-->
          <br>
          <el-row>
            <el-col :offset="8">
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>

        </el-form>
      </div>
    </el-col>
    <el-col :span="5">
      <div class="timeline taskbox">
        <div class="timeline">
          <el-card class="card1">
            <div slot="header">
              <h3 class="card1">发布流程</h3>
            </div>
            <el-timeline >
              <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :icon="activity.icon"
                :type="activity.type"
                :color="activity.color"
                :size="activity.size"
                :timestamp="activity.timestamp">
                {{activity.content}}
              </el-timeline-item>
            </el-timeline>
          </el-card>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import {fetch_addtask, fetch_register} from "../../../api/user_apis";
  import addt from "./add"
    export default {
      name: "Add_Task",
      components:{
        addt,
      },
      data() {
        return {
          time1:[],
          time2:'',
          labelPosition:'top',
          activities: [{
            content: '完善您的任务需求信息', size: 'large', type: 'primary', color: '#0bbd87'
          }, {
            content: '完成发布',
          }, {
            content: '任务审核',
            size: 'large'
          }, {
            content: '挑选解决方案',
          }],
          ruleForm: {
            time_limit: '',
            task_name: '',
            location: '',
            budget: '',
            task_type: '',
            detail: '',
            target_num: '',
            overview: '',
            Lon: '',
            Lat: '',
            tag :[],
            iffile:'',
          },
           rules: {
            task_name: [
              {required: true, message: '请输入任务标题', trigger: 'blur'},
              {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
            ],
            budget: [
              {required: true, message: '请输入任务薪酬', trigger: 'blur'},
              {type: 'number', message: '薪酬必须为数字值'}
            ],
            time_limit: [
              {required: true, message: '请输入任务时间', trigger: 'blur'},
            ],
            detail: [
              {required: true, message: '请填写任务详情', trigger: 'blur'}
            ],
            tag: [
              {required: true, message: '请至少添加一个标签', trigger: 'blur'}
            ],
            target_num: [
              {required: true, message: '请输入任务人数', trigger: 'blur'},
              {type: 'number', message: '人数必须为数字值'}
            ],
            location: [
              {required: true, message: '请填写任务地点', trigger: 'blur'}
            ],
            iffile: [
              {required: true, message: '请选择答案是否需要附件', trigger: 'blur'}
            ],
          },
          options:[
            {
              value:'学习',lable:'学习'
            },
            {
              value:'生活',lable:'生活'
            },
            {
              value:'自习室',lable:'自习室'
            },
            {
              value:'图书馆',lable:'图书馆'
            },
            {
              value:'食堂',lable:'食堂'
            },
          ]
        }
      },
        methods:{
          submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                console.log("提交成功")
                console.log("地址"+this.ruleForm.location);
                console.log("人数"+this.ruleForm.target_num);
                console.log("时间"+this.ruleForm.time_limit);
                console.log("薪酬"+this.ruleForm.budget);
                console.log("标题"+this.ruleForm.task_name);
                console.log("附件"+this.ruleForm.iffile);
                console.log("标签"+this.ruleForm.tag.join("-"));
                console.log("详情"+this.ruleForm.detail);

                let data={
                  'task_name':this.ruleForm.task_name,
                  'detail':this.ruleForm.detail,
                  'Lon':114.123456,
                  'Lat':23.456789,
                  'location':this.ruleForm.location,
                  'target_num':this.ruleForm.target_num,
                  'budget':this.ruleForm.budget,
                  'demand_num':this.ruleForm.target_num,
                  'task_tag':this.ruleForm.tag.join("-"),
                  'release_time':this.ruleForm.time_limit[0],
                  'end_time':this.ruleForm.time_limit[1],
                  'flag':1
                }

                fetch_addtask(data)
                  .then(res => {
                    console.log('数据是:', res);
                    if(res.msg=="成功！")
                    {
                      this.messages();
                    }else  if(res.msg=="写入服务器失败，请重试")
                    {
                      this.unmessages();
                    }
                  })
                  .catch((e) => {
                    console.log('获取数据失败');
                    this.errmessages();
                  })


              } else {
                console.log('error submit!!');
                return false;
              }
            });
          },
          resetForm(formName) {
            this.$refs[formName].resetFields();
          },
          messages()
          {
            this.$message({
              showClose: true,
              message: '发布成功',
              type: 'success'
            });
          },
          unmessages()
          {
            this.$message({
              showClose: true,
              message: '发布失败',
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
          }
        }
      }


</script>

<style scoped>
.taskbox{
  /*background: #ffecec;*/
}
  .taskbox2{
    border-radius: 4px;
    min-height: 1200px;
    /*min-width: 400px;*/
    /*max-width: 800px;*/
    /*min-width: 600px;*/
  }
  .timeline{
    border-radius: 4px;
    min-height: 300px;
  }
  .card1{
    margin-bottom: 0px;
    margin-top: 0px;
  }
  .addform{

  }
.timetitle {
  font-size: 16px;
  font-weight: bolder;

}
</style>

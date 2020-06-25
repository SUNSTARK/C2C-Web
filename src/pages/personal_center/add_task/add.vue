<template>

  <div id='test'>


    <!--发布任务-->
    <el-row :gutter="20">
      <el-col :offset="5" :span="11">
        <el-card>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-row>
              <el-col :span="12"><!--无报错,找到原因了是冒号-->


              </el-col>
              <el-col :span="10">
                <el-form-item prop="target_num">
                  <h3>任务所需答案数：</h3>
                  <el-input v-model.number="ruleForm.target_num" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="22"><!--无报错-->
                <el-form-item prop="task_name">
                  <h3>任务标题：</h3>
                  <el-input v-model="ruleForm.task_name" clearable maxlength="20" show-word-limit></el-input>
                </el-form-item>
                <el-form-item prop="overview">
                  <h3>任务概述：</h3>
                  <el-input v-model="ruleForm.overview" clearable maxlength="50" show-word-limit></el-input>
                </el-form-item>


                <!--问题板块-->

                <el-form-item>
                  <!--                  <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>-->
                  <el-button @click="addDomain" icon="el-icon-circle-plus">新增</el-button>
                  <el-button @click="resetForm('ruleForm')" icon="el-icon-warning">重置</el-button>
                </el-form-item>


                <el-form-item prop="address">
                  <h3>任务地点：</h3>
                  <el-input v-model="ruleForm.address"  clearable maxlength="35"
                            show-word-limit></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item prop="time_limit">
                  <h3>任务时间：</h3>
                  <el-input placeholder="请输入任务时长（分钟）" v-model.number="ruleForm.time_limit" clearable>
                  </el-input>

                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item prop="budget">
                  <h3>任务薪酬：</h3>
                  <el-input v-model.number="ruleForm.budget" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="22">
                <el-form-item prop="detail">
                  <h3>任务详情</h3>
                  <el-input :rows="8" type="textarea" v-model="ruleForm.detail" maxlength="1000"
                            show-word-limit></el-input>
                  <br>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
      <!--流程提示-->
      <el-col :span="4">
        <div class="timeline">
          <el-card>
            <br class="brbr">
            <span class="timetitle">发布流程</span>
            <el-divider></el-divider>

            <el-timeline>
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
      </el-col>
    </el-row>
  </div>
</template>


<script>


  export default {

    name: 'addt',

    data() {
      return {
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
          address: '',
          budget: '',
          task_type: '',
          detail: '',
          target_num: '',
          overview: '',
          Lon: '',
          Lat: '',
        },


        rules: {
          task_name: [
            {required: true, message: '请输入任务标题', trigger: 'blur'},
            {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
          ],
          overview: [
            {required: true, message: '请输入任务概述', trigger: 'blur'},
          ],
          target_num: [
            {required: true, message: '请输入答案数量', trigger: 'blur'},
          ],
          task_type: [
            {required: true, message: '请选择任务类型', trigger: 'blur'},
          ],
          address: [
            {required: true, message: '请输入任务地点', trigger: 'blur'},
            {min: 3, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          budget: [
            {required: true, message: '请输入任务薪酬', trigger: 'blur'},
            {type: 'number', message: '薪酬必须为数字值'}

          ],
          time_limit: [
            {required: true, message: '请输入任务时间', trigger: 'blur'},
            {type: 'number', message: '时长必须为数字值'},
          ],
          detail: [
            {required: true, message: '请填写任务详情', trigger: 'blur'}
          ]
        },

      };
    },
    methods: {//导航栏



      submitForm(FormName) {
        this.$refs[FormName].validate((valid) => {
          if (valid) {
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },



      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      messages() {
        this.$message({
          showClose: true,
          message: '任务发布成功',
          type: 'success'
        });
      },
      unmessages() {
        this.$message({
          showClose: true,
          message: '此任务无法删除',
          type: 'error'
        });
      },

    },
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #login {
    width: 100%;
    height: 100%;
    min-width: auto;
  }

  .timeline {
    width: 280px;
  }

  .timetitle {
    font-size: 17px;
    font-weight: bolder;
  }

  .demo-ruleForm {
    width: 100%;
  }
</style>
<style>
  .el-upload-dragger {
    background-color: #fff;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    box-sizing: border-box;
    width: 480px;
    height: 180px;
    text-align: center;
    position: relative;
    overflow: hidden
  }
</style>

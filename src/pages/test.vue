<template>
  <div>
    <h1 align="center">答案上传测试</h1>
    <el-row>
      <el-col :span="10" :offset="7">
        <el-card>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

            <el-form-item label="任务id" prop="task_id">
              <el-input v-model.number="ruleForm.task_id"></el-input>
            </el-form-item>

            <el-form-item label="答案内容：" prop="ans_body">
              <el-input type="textarea" :rows="5" v-model.number="ruleForm.ans_body"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>

          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style>

</style>
<script>
  import {fetchPost} from "../api/axios";

  export default {
    data() {
      return {
        ruleForm: {
          task_id: '',
          ans_body: '',
        },
        rules: {
          task_id: [
            {required: true, message: '请输入任务id', trigger: 'blur'},
            {type: 'number', message: 'id必须为数字值'}
          ],
          ans_body: [
            {required: true, message: '请输入答案', trigger: 'blur'},
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //alert('submit!');
            let dataS = {
              "task_id": this.ruleForm.task_id,
              "ans_body": this.ruleForm.ans_body
            }
            let data = {
              task_id: this.ruleForm.task_id,
              answerDtos: JSON.stringify(dataS)
            }
            let url = '/task/answer/submitting/?task_id=' + this.ruleForm.task_id
            fetchPost(url, JSON.stringify(data))
              .then(res => {
                if (res.msg == "成功！") {
                  console.log("上传成功！")
                }
              })
              .catch(e => {
                console.log('获取数据失败\n' + e);
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
      }
    }
  }
</script>

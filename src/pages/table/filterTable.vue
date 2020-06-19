<template>
  <div>
    <h3 >待审核任务</h3>
    <template>
      <div class="title">
        <div class="container_table">
          <el-table
            :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            stripe
            style="width: 100%"
            :default-sort = "{prop: 'date', order: 'descending'}"
          >
            <el-table-column
              prop="taskId"
              label="任务ID"
              sortable
              width="180">
            </el-table-column>
            <el-table-column
              prop="intro"
              label="任务简介"
              width="180">
            </el-table-column>
            <el-table-column
              prop="taskContent"
              label="任务内容">
            </el-table-column>
            <el-table-column
              prop="update_date"
              sortable
              label="上传时间">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">下架</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination class="fy"
                         layout="prev, pager, next"
                         @current-change="current_change"
                         :total="total"
                         background
          >
          </el-pagination>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  export default {
    name:'list11',
    data() {
      return {
        total:1000,//默认数据总数
        pagesize:9,//每页的数据条数
        currentPage:1,//默认开始页面
        istag: true,
        input:"",
        input21: '',
        value5: [],
        tableData: [
          {
            taskId: '1123',
            intro: '1介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍',
            type: '3视频直播',
            comp_name: '1广大科技公司',
            taskContent: '1内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
            update_date: '12016-05-02',
            download_num: '123.6'
          },
          {
            taskId: '2123',
            intro: '2介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍',
            type: '2视频直播',
            comp_name: '2广大科技公司',
            taskContent: '2内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
            update_date: '22016-05-02',
            download_num: '223.6'
          },
          {
            taskId: '3123',
            intro: '1介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍',
            type: '3视频直播',
            comp_name: '3广大科技公司',
            taskContent: '3内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
            update_date: '32016-05-02',
            download_num: '323.6'
          },
          {
            taskId: '4123',
            intro: '4介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍',
            type: '4视频直播',
            comp_name: '4广大科技公司',
            taskContent: '4内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
            update_date: '42016-05-02',
            download_num: '423.6'
          },
          {
            taskId: '4123',
            intro: '4介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍',
            type: '4视频直播',
            comp_name: '4广大科技公司',
            taskContent: '4内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
            update_date: '42016-05-02',
            download_num: '423.6'
          },
          {
            taskId: '4123',
            intro: '4介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍',
            type: '4视频直播',
            comp_name: '4广大科技公司',
            taskContent: '4内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
            update_date: '42016-05-02',
            download_num: '423.6'
          },
          {
            taskId: '4123',
            intro: '4介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍',
            type: '4视频直播',
            comp_name: '4广大科技公司',
            taskContent: '4内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
            update_date: '42016-05-02',
            download_num: '423.6'
          },
          {
            taskId: '4123',
            intro: '4介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍',
            type: '4视频直播',
            comp_name: '4广大科技公司',
            taskContent: '4内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
            update_date: '42016-05-02',
            download_num: '423.6'
          },
          {
            taskId: '4123',
            intro: '4介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍',
            type: '4视频直播',
            comp_name: '4广大科技公司',
            taskContent: '4内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
            update_date: '42016-05-02',
            download_num: '423.6'
          },
          {
            taskId: '4123',
            intro: '4介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍',
            type: '4视频直播',
            comp_name: '4广大科技公司',
            taskContent: '4内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
            update_date: '42016-05-02',
            download_num: '423.6'
          },
          {
            taskId: '4123',
            intro: '4介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍',
            type: '4视频直播',
            comp_name: '4广大科技公司',
            taskContent: '4内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
            update_date: '42016-05-02',
            download_num: '423.6'
          },
          {
            taskId: '4123',
            intro: '4介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍',
            type: '4视频直播',
            comp_name: '4广大科技公司',
            taskContent: '4内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
            update_date: '42016-05-02',
            download_num: '423.6'
          },
          {
            taskId: '4123',
            intro: '4介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍',
            type: '4视频直播',
            comp_name: '4广大科技公司',
            taskContent: '4内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
            update_date: '42016-05-02',
            download_num: '423.6'
          },
          {
            taskId: '4123',
            intro: '4介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍',
            type: '4视频直播',
            comp_name: '4广大科技公司',
            taskContent: '4内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
            update_date: '42016-05-02',
            download_num: '423.6'
          },
          {
            taskId: '4123',
            intro: '4介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍',
            type: '4视频直播',
            comp_name: '4广大科技公司',
            taskContent: '4内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
            update_date: '42016-05-02',
            download_num: '423.6'
          },
          {
            taskId: '4123',
            intro: '4介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍',
            type: '4视频直播',
            comp_name: '4广大科技公司',
            taskContent: '4内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
            update_date: '42016-05-02',
            download_num: '423.6'
          },
          {
            taskId: '4123',
            intro: '4介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍',
            type: '4视频直播',
            comp_name: '4广大科技公司',
            taskContent: '4内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
            update_date: '42016-05-02',
            download_num: '423.6'
          },
          {
            taskId: '增加测试',
            intro: '4介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍',
            type: '4视频直播',
            comp_name: '4广大科技公司',
            taskContent: '4内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
            update_date: '42016-05-02',
            download_num: '423.6'
          },
          {
            taskId: '增加测试',
            intro: '4介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍',
            type: '4视频直播',
            comp_name: '4广大科技公司',
            taskContent: '4内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
            update_date: '42016-05-02',
            download_num: '423.6'
          },
          {
            taskId: '增加测试',
            intro: '4介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍',
            type: '4视频直播',
            comp_name: '4广大科技公司',
            taskContent: '4内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
            update_date: '42016-05-02',
            download_num: '423.6'
          },
          {
            taskId: '增加测试',
            intro: '4介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍',
            type: '4视频直播',
            comp_name: '4广大科技公司',
            taskContent: '4内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
            update_date: '42016-05-02',
            download_num: '423.6'
          },
        ]
      };
    } ,
    methods: {
      handleEdit (index, row) {
        console.log(index, row)
        this.$message({
          showClose: true,
          message: index,
          row,
          type: "success"
        })
      },
      handleDelete (index, row) {
        console.log(index, row)
        this.$message({
          showClose: true,
          message: index,
          row,
          type: "success"
        })
      },

      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 0) {
          return 'th';
        }
        return '';
      },

      current_change:function(currentPage){
        this.currentPage = currentPage;
      }
    },
    created:function(){
      this.total=this.tableData.length;
    },
  };
</script>

<style scoped>
  h3{
    margin: 25px 0 20px;
    font-weight: 800;
    color: #409eff;
    font-size: 22px;
  }
  p{
    font-size: 14px;
    color: #5e6d82;
    line-height: 1.5em;
  }
  .block{
    text-align: center;
  }

  .fl{
    float: right;
    margin-right:20px;
  }
  .fy{
    text-align:center;
    margin-top:30px;
  }
  .title{
    height:100%;
  }
</style>

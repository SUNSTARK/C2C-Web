<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="card kjfs">
          <p class="title"><i class="fa fa-th-large"></i>快捷方式</p>
          <ul>
            <li><router-link to="/alljobs" class="kjfs kjfs-bluee">
              <span><i class="fa fa-list-ul fa-2x"></i></span>
              <span class="shortcut-character">任务大厅</span>
            </router-link></li>
            <li><router-link to="/filterTable" class="kjfs kjfs-grennn">
              <span><i class="fa fa-check-square-o fa-2x"></i></span>
              <span class="shortcut-character">任务审核</span>
            </router-link></li>
            <li><router-link to="/display/job_info" class="kjfs kjfs-pinkk">
              <span><i class="fa fa-file-text fa-2x"></i></span>
              <span class="shortcut-character">任务信息</span>
            </router-link></li>
            <li><router-link to="/display/user_info" class="kjfs kjfs-greyy">
              <span><i class="fa fa-user fa-2x"></i></span>
              <span class="shortcut-character">用户信息</span>
            </router-link></li>
          </ul>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="card dbsx">
          <p class="title"><i class="fa fa-info-circle"></i>数据概览</p>
          <ul>
            <li><router-link to="/alljobs"><span class="data-characters">任务总数</span><span class="num">124</span></router-link></li>
            <li><router-link to="/filterTable"><span class="data-characters">待审任务</span><span class="num">8</span></router-link></li>
          </ul>
        </div>
      </el-col>
    </el-row>
      <el-row>
        <el-col :span="24">
          <line-echarts id="lineEcharts" height="300px" ref="mainecharts"></line-echarts>
        </el-col>
      </el-row>
    <el-row>
      <el-col :span="24">
        <maintable id="maintable"></maintable>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import LineEcharts from "../../components/ECharts/lineEcharts"
  import Maintable from "../admin_table/maintable"

  export default {
    name: "mainIndex",
    components: {Maintable, LineEcharts},
    mounted () {
      this.selfAdaption()
    },
    computed: {
      // 用于监听isCollapse值的改变
      get_isCollapse() {
        return this.$store.getters.isCollapse
      }
    },
    watch: {
      get_isCollapse: function () {
        setTimeout(this.echart_resize, 280)
      }
    },
    methods: {
      // echart窗体改变自适应，$refs后为echart标签的ref
      selfAdaption () {
        setTimeout(() => {
          let that = this
          window.onresize = function () {
            if (that.$refs.mainecharts) {
              that.$refs.mainecharts.chart.resize()
            }
          }
        }, 10)
      },
      // echart折叠展开导航自适应
      echart_resize() {
        let that = this
        if (that.$refs.mainecharts){
          that.$refs.mainecharts.chart.resize()
        }
      }
    }
  }
</script>

<style>
  #maintable, #lineEcharts, .card {
    background: #fff;
    -webkit-box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
    border-color: rgba(0, 0, 0, 0.2);
  }
  #maintable .title, #lineEcharts .title, .card .title {
    font-size: 14px;
    padding: 3px;
  }
  #maintable .title i, #lineEcharts .title i, .card .title i {
    margin-right: 5px;
  }

  .card {
    color: #666;
  }
  .card ul {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .card ul li {
    flex: 1;
  }
  .card ul li a {
    color: #666666;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .card ul li a span {
    height: 44px;
  }
  /*数据概览汉字部分*/
  .data-characters {
    font-weight: bold;
    font-size: 15px;
  }
  /*数据概览数字部分*/
  .num {
    line-height: 30px;
    font-size: 42px;
    color: #409eff;
    margin: 0px;
  }
  /*快捷方式文字部分*/
  .shortcut-character {
    font-weight: bold;
    font-size: 15px;
  }
  /*快捷方式图标样式部分*/
  .card ul li .kjfs-bluee {
    color: #409eff;
  }
  .card ul li .kjfs-grennn {
    color: #89dda0;
  }
  .card ul li .kjfs-pinkk{
    color: pink;
  }
  .card ul li .kjfs-greyy{
    color: grey;
  }
  /*快捷方式图标选中的样式*/
  .card ul li:hover .kjfs-bluee {
    color: #ffffff;
    background: #409eff;
  }
  .card ul li:hover .kjfs-grennn {
    color: #ffffff;
    background: #89dda0;
  }
  .card ul li:hover .kjfs-pinkk {
    color: #ffffff;
    background: pink;
  }
  .card ul li:hover .kjfs-greyy {
    color: #ffffff;
    background: grey;
  }
  .card .table p {
    height: 52px;
    line-height: 52px;
    border: 1px solid #cccccc;
    overflow: hidden;
    border-top: none;
    display: flex;
    justify-content: start;
  }
  .card .table p:first-child {
    border-top: 1px solid #cccccc;
  }
  .card .table p .tit {
    width: 90px;
    min-width: 90px;
    height: 100%;
    text-align: center;
    border-right: 1px solid #cccccc;
    margin-right: 18px;
  }
  .card .table p span.gitbox {
    flex: 1;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: start;
  }
  .card .table p span.gitbox a:first-child {
    margin-right: 30px;
  }

  #lineEcharts {
    margin-top: 20px;
    padding-top: 5px;
  }

  #maintable {
    margin-top: 20px;
    padding-top: 5px;
  }
</style>

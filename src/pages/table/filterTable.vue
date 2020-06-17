<template>
  <div>
    <h3>待审核任务</h3>
    <p>对表格进行筛选，可快速查找到自己想看的数据。</p>
    <template>
      <el-table
        :data="tableData5"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          sortable
          width="180"
          :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
          :filter-method="filterHandler"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="任务简介"
          :formatter="formatter">
        </el-table-column>
        <el-table-column
          prop="tag"
          label="标签"
          width="100"
          :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.tag === '家' ? 'primary' : 'success'"
              disable-transitions>{{scope.row.tag}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <div class="block"> <!--分页模块-->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "filterTable",
  data () {
    return {
      tableData5: [{
        date: "2016-05-02",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄",
        tag: "家"
      }, {
        date: "2016-05-04",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1517 弄",
        tag: "公司"
      }, {
        date: "2016-05-01",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1519 弄",
        tag: "家"
      }, {
        date: "2016-05-03",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1516 弄",
        tag: "公司"
      }]
    }
  },
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
    filterHandler (value, row, column) {
      const property = column["property"]
      return row[property] === value
    },
    formatter (row, column) {
      return row.address
    },
    filterTag (value, row) {
      return row.tag === value
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>

<style scoped>
  h3{
    margin: 25px 0 20px;
    font-weight: 400;
    color: #1f2f3d;
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
</style>

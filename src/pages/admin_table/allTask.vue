<template>
    <div>
      <template>
        <el-table
          :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%"
          :row-key="getRowKeys"
          :expand-row-keys="expands"
          @expand-change="expandSelect"
          @row-click="rowClick">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="商品名称">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="所属店铺">
                  <span>{{ props.row.shop }}</span>
                </el-form-item>
                <el-form-item label="商品 ID">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="店铺 ID">
                  <span>{{ props.row.shopId }}</span>
                </el-form-item>
                <el-form-item label="商品分类">
                  <span>{{ props.row.category }}</span>
                </el-form-item>
                <el-form-item label="店铺地址">
                  <span>{{ props.row.address }}</span>
                </el-form-item>
                <el-form-item label="商品描述">
                  <span>{{ props.row.desc }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="商品 ID"
            prop="id">
          </el-table-column>
          <el-table-column
            label="商品名称"
            prop="name">
          </el-table-column>
          <el-table-column
            label="描述"
            prop="desc">
          </el-table-column>
          <el-table-column
            align="center">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                placeholder="输入关键字搜索" clearable/>
            </template>
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click.stop="handleDelete(scope.row)">下架</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <div class="block">
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
    data() {
      return {
        tableData: [{
          id: '12987122',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987123',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987125',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987126',
          name: '滋味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }],
        search: '',
        expands:[] // 要展开的行，元素是row的key值
      }
    },
    methods: {
      getRowKeys:function(row){
        return row.id
      },
      // 折叠面板每次只能展开一行，用于点击按钮操作
      expandSelect:function(row, expandedRows) {
        var that = this
        if (expandedRows.length) {
          that.expands = []
          if (row) {
            that.expands.push(row.id)
          }
        }
        else {
          that.expands = [] // 默认不展开
        }
      },
      // 折叠面板每次只能展开一行，用于点击行操作
      rowClick(row) {
        var that = this
        var firstClick = true // 用于判断是否重复点击该行
        if (that.expands.length === 0) {
          that.expands.push(row.id)
        } else {
          if (that.expands[0] === row.id) {  // 已展开的行和点击的行相同
            that.expands = []
            firstClick = !firstClick
          }
          if (firstClick) {  // 第一次点击该行，则展开
            that.expands = [row.id];
            firstClick = !firstClick
          }else {  // 重复点击该行，则收起所有
            that.expands = []
            firstClick = !firstClick
          }
        }
      },
      handleDelete(row) {
        console.log(row);
        this.$confirm('此操作将下架该任务, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '下架成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: '已取消!'
          });
        });
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      message () {
        const h = this.$createElement
        this.$notify.info({
          title: "任务大厅",
          message: h("i", {style: "color: teal"}, "点击表格的行可展开详情"),
          duration: 4000
        })
      }
    },
    mounted () {
      this.message()
    }
  }
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .block{
    text-align: center;
  }
</style>

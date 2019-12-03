<style >
.clear::after{
  content: '';
  display: block;
  clear: both;
}
.parentbox{
  box-sizing: border-box;
  width: 1400px;
  height: 800px;
  background: #F5F5F5;
  margin: 0 auto;
  border: 1px solid #cccccc;
  padding: 25px;
}
.content{
  position: relative;
  box-sizing: border-box;
  /* margin: 25px auto; */
  width: 1350px;
  height: 750px;
  background: #ffffff;
}
.title{
  line-height: 20px;
  text-align: left;
  float: left;
  font-size: 26px;
}
.block{
  float: right;
  position: relative;
}
.buttompage{
  position: absolute;
  left: 0;right: 0;bottom: 40px;
  margin: auto;

}
.chaxun{
  position: absolute;
  right: 0px;
  top: 0px;
}
</style>
<template>
  <div class="hello">
    <div class="parentbox">
      <div class="content">
        <div class="clear">
            <h1 class="title">用户详情</h1>
            <div class="block clear">
                                <el-input size="mini" v-model="input" placeholder="请输入查询ID"></el-input>
                  <el-button @click="chaxunBtn" class="chaxun" size="mini" type="primary">查询</el-button>
            </div>
            <template>
                <el-table
                  ref="multipleTable"
                  :data="tableData"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="handleSelectionChange">
                  <el-table-column
                    prop="userId"
                    label="用户ID"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="phone"
                    label="手机号码"
                    show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column
                    prop="successNum"
                    label="成功提现次数"
                    show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column
                    prop="successSum"
                    label="已提现金额"
                    show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column
                    prop="failNum"
                    label="失败次数"
                    show-overflow-tooltip>
                  </el-table-column>
                </el-table>
             </template>
        </div>
        <div class="buttompage">
          <el-pagination
            background
            layout="prev, pager, next"
            @current-change='changepage'
            :total="this.total2">
          </el-pagination>
          <p>查询到:<span v-text="this.total2" style="color:red" ></span>条数据</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      input:'',//搜索值
      total2:0,//列表数量
      value1:'',
      dialogVisible: false,
       tableData: [{
          userId:'',
          phone: '',
          successNum:'',//成功提现数量,
          successSum:'',
          failNum:'',
         },
       ]
    }
  },
  methods:{
    //日期
    change(e){
      console.log(11)
      console.log(e)
      console.log(this.value1)
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //翻页
    changepage(page){
      console.log(page)
      this.axios.get('/backstage/withdrawCash/auth/userList',{
        params:{
          page:page,
          pageSize:10
        }
      }).then(data=>{
      this.tableData=data.data.data
      })
    },
    chaxunBtn(){
      console.log(this.input)
      this.axios.get('/backstage/withdrawCash/auth/userList',{
        params:{
          userId:this.input
        }
      }).then(data=>{
        console.log(data)
      this.tableData=data.data.data
      })
    }

  },
  mounted(){
    this.axios.get('/backstage/withdrawCash/auth/userList',{
      params:{
        page:1,
        pageSize:10
      }
    }).then(data=>{
      console.log(data)
      this.tableData=data.data.data
      this.total2=data.data.count
    })
  },
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

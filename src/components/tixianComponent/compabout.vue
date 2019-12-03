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
.inputbox{
  position: absolute;
  top: 0px;
  left: -500px;
}
@keyframes load {
	from {
	transform:rotate(0deg);
	-ms-transform:rotate(0deg);
}
to {
	transform:rotate(360deg);
	-ms-transform:rotate(360deg);
}
}@-webkit-keyframes load {
	from {
	-webkit-transform:rotate(0deg);
}
to {
	-webkit-transform:rotate(360deg);
}
}@-moz-keyframes load {
	from {
	-moz-transform:rotate(0deg);
}
to {
	-moz-transform:rotate(360deg);
}
}@-o-keyframes load {
	from {
	-o-transform:rotate(0deg);
}
to {
	-o-transform:rotate(360deg);
}
}
.loading{
	margin:100px auto;
	width:100px;
	height:100px;
	border:10px solid #333333;
	border-bottom:#aaa 10px solid;
	border-radius:50%;
	animation:load 1.1s infinite linear;
	-webkit-animation:load 1.1s infinite linear;
	-moz-animation:load 1.1s infinite linear;
	-o-animation:load 1.1s infinite linear;
}
.animaloading{
  width: 100%;
  z-index: 9999;
  height: 100%;
  position: fixed;
  background: #cccccc;
  opacity: .4;
}
</style>
<template>
  <div class="hello">
    <div v-show="loadingAnima" class="animaloading" >
      <div class="loading"></div>
      <p style="color:red;">加载中...</p>
    </div>
    <div class="parentbox">
      <div class="content">
        <div class="clear">
            <h1 class="title">审核</h1>
            <div class="block">
              <div>
                <!-- <span>提现类型</span> -->
                
              </div>
              <div class="inputbox clear">
                <el-input
                  style="float:right;"
                  placeholder="搜索ID"
                  v-model="input"
                  size="mini"
                  clearable>
                </el-input>
                <el-button @click="serchBtn" style="float:right;position:absolute;top:0px;left:195px;" size="mini" type="primary" icon="el-icon-search">搜索</el-button>
              </div>
              <a @click="dialogTableVisible  = true" href="javascript:;">批量审核</a>
                <span class="demonstration"> &nbsp;&nbsp;&nbsp; </span>
                开始日期
                <el-date-picker
                  v-model="startData"
                  type="date"
                  size='mini'
                  @change="change"
                  placeholder="选择日期">
                </el-date-picker>
                结束日期
                <el-date-picker
                  v-model="endData"
                  type="date"
                  size='mini'
                  @change="change1"
                  placeholder="选择日期">
                </el-date-picker>
            </div>
            <template>
                <el-table
                  ref="multipleTable"
                  :data="tableData"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="handleSelectionChange">
                  <el-table-column
                    type="selection"
                    width="55">
                  </el-table-column>
                  <el-table-column
                    prop="userId"
                    label="用户ID"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="withdrawCashAccount"
                    label="用户账户"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="withdrawCashName"
                    label="用户名"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="type"
                    label="类型"
                    width="100">
                    <template scope="scope">
                         {{ scope.row.wclType===1 ? '佣金提现' : '红包提现'}}
                     </template>
                  </el-table-column>
                  <el-table-column
                    prop="amount"
                    label="金额"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="createTime"
                    label="申请时间"
                    :formatter="formatDate"
                    show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column
                    prop="withdrawCashTime"
                    :formatter="formatDate2"
                    label="转账时间"
                    show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column
                    prop="status"
                    label="状态"
                    width="120">
                     <template scope="scope">
                         {{ scope.row.status===1 ? '审核中' : scope.row.status===2 ? '失败':'完成'}}
                     </template>
                  </el-table-column>
                  <el-table-column
                    prop="caozuo"
                    label="操作"
                    width="120">
                    <template slot-scope="scope">
                      <el-button v-if="scope.row.status===2||scope.row.status===1" size="mini" @click="infoList_detial(scope.row.id,scope.row.withdrawCashAccount)">审核</el-button>
                    <!-- <a @click="dialogTableVisible(scope.row.id)  = true" href="javascript:;">审核</a> -->
                    </template>
                    <el-dialog @close="closeDialog" title="核对信息" :visible.sync="dialogTableVisible" :append-to-body="true">
                    <div style="height:250px;">
                      <p>用户账户 :
                        <span v-text="this.selectedCount"></span>,
                      </p>
                      <p>商品名称</p>
                      <template @change="test12" >
                        <el-radio @change="sourceFilter" v-model="radio" label="3">审核通过</el-radio>
                        <el-radio @change="sourceFilter" v-model="radio" label="2">审核不通过</el-radio>
                      </template>
                      <p>反馈详情</p>
                      <textarea v-model="addtext" style="width:100%;height:70px;" name="" id="" cols="20" rows="10"></textarea>
                       <el-button  @click="commits" type="primary">提交</el-button>
                    </div>
                    
                  </el-dialog>
                  </el-table-column>
                </el-table>

             </template>
        </div>
        <div class="buttompage">
          <el-pagination
            background
            layout="prev, pager, next"
            @current-change='changepage'
            :total="this.total1"
            >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      loadingAnima:false,//加载动画隐藏
      oneId:'',//单个值获取的ID
      label:'',
      radio: '',//单选框选择
      addtext:"",
      input:"",
      total1:0,//数量
      org_startData:'',//日期开始初始值
      org_endData:'',//日期结束初始值
      // startData:new Date(),
      // endData:new Date(),//结束日期初始值
      startData:'',
      // (new Date().setMonth((new Date().getMonth()-1))),//开始日期初始值
      endData:'',//结束日期初始值
      multipleSelection:[],//选中的值
      dialogVisible: false,//对话框
      dialogTableVisible:false,
      selecItem:{},//存放用户名,账户
      selectedIDs:[],//提交多选ID
      selectedCount:[],//用户账户
      selectedName:[],//用户名
       tableData: [{
          userId:'',
          createTime:0,
          withdrawCashAccount: '',
          withdrawCashName: '',
          amount:"",
          wclType:"",
          withdrawCashTime:"",
          status:'',
          userName:''
         },
       ]
    }
  },
  methods:{
    //单个审核
    infoList_detial(id,withdrawCashAccount){
      let selectedIDs=this.selectedIDs
      let selectedCount=this.selectedCount
      this.oneId=id
      selectedIDs.push(id);
      console.log(selectedIDs)
      selectedCount.push(withdrawCashAccount)
        console.log(selectedIDs);
        console.log(selectedCount);
        this.dialogTableVisible=true;
    },
    //关闭ding回调
    closeDialog(){
      console.log("关闭回调")
      this.selectedCount=[]
      this.selectedIDs=[]
    },
    sourceFilter(e){
      console.log(e)
      this.label=e
      consoel.log(this.label)
    },
    batchrevie(){
      console.log("批量审核")
    },
    //开始日期
    change(e){
      this.startData
      console.log("开始时间")
      console.log(this.startData)
    },
    //时间转换
    getTime(date){
        let self = this;
        let str = date;
        str = str.replace(/-/g, '/');
        let strDate  = new Date(str);
        let Y = strDate.getFullYear() + '-';
        let M = (strDate.getMonth()+1 < 10 ? '0'+(strDate.getMonth()+1) : strDate.getMonth()+1) + '-';
        let D = strDate.getDate();
        let dateAfter = Y+M+D+' '+'23:59:59';
        console.log(dateAfter)
        self.endDate = new Date(dateAfter);
        console.log(self.endDate)
    },
    //结束日期
    change1(e){
      if(!this.startData){
        alert("请输入开始时间,后选择结束时间");
        this.endData='';
        return;
      }
      let startTime=this.startData.getTime();
      let endTime=this.endData.getTime();

      startTime=startTime
      endTime=endTime
      console.log(startTime)
      console.log(endTime)
      this.axios.get('/backstage/withdrawCash/auth/list',{
        params:{
        startTime:startTime,
        endTime:endTime
        }

      }).then(res=>{
        console.log(res)
        this.tableData=res.data.data
      })
    },
    //隐藏的选中按钮
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //复选框
    handleSelectionChange(val) {
      this.multipleSelection = val;
      let ids = []
      this.multipleSelection.map((item)=> {
      ids.push(item.id)
      })
      let account=[]
      this.multipleSelection.map((item)=> {
      account.push(item.withdrawCashAccount)
      })
      let userNames=[]
      this.multipleSelection.map((item)=> {
      userNames.push(item.withdrawCashName)
      })
      this.selectedIDs = ids
      this.selectedCount= account
      this.selectedName=userNames
      console.log('id',this.selectedIDs)
      console.log('账号',this.selectedCount)
      console.log('用户名',this.selectedName)
    },
    //关闭审核
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    //翻页
    changepage(page){
      console.log(page)
     this.axios.get('/backstage/withdrawCash/auth/list',{
       params:{
         page:page,
         pageSize:10
       }
     }).then(data=>{
      this.tableData=data.data.data
    })
    },
    //提交
    commits(){
      this.loadingAnima=true;
      this.axios({
        url:'/backstage/withdrawCash/auth/withdrawCashTransfer',
        method:'post',
        data:{
          ids:this.selectedIDs,
          status:this.label,
          remark:this.addtext
        },
        transformRequest: [function(data) {
          let ret=''
          for(let it in data){
            ret+=encodeURIComponent(it)+ '=' + encodeURIComponent(data[it])+'&'
          }
            return ret
        }],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res=>{
      this.loadingAnima=false;
        console.log(res)
        alert(res.data.message)
        this.dialogTableVisible=false;
        location.reload()
      })
    },
    //时间戳转换
    formatDate(row, column) {
        if(!row.createTime)return
        // row.createTime
        let date = new Date(parseInt(row.createTime) );
        let Y = date.getFullYear() + '-';
        let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
        let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
        let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
        let m = date.getMinutes()  < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
        let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return Y + M + D + h + m + s;
    },
    formatDate2(row, column) {
        if(!row.withdrawCashTime)return
        let date = new Date(parseInt(row.withdrawCashTime) );
        let Y = date.getFullYear() + '-';
        let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
        let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
        let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
        let m = date.getMinutes()  < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
        let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return Y + M + D + h + m + s;
    },
    //搜索按钮
    serchBtn(){
      console.log(this.input)
      this.axios.get('/backstage/withdrawCash/auth/list',{
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
  this.axios.get('/backstage/withdrawCash/auth/list').then(data=>{
    console.log(data)
      this.tableData=data.data.data
      this.total1=data.data.count
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

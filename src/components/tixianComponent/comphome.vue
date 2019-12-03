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
  box-sizing: border-box;
  /* margin: 25px auto; */
  width: 1350px;
  height: 750px;
  background: #ffffff;
  padding: 40px;
}
.title{
  line-height: 20px;
  text-align: left;
  float: left;
  font-size: 26px;
}
.block{
  float: right;
}
</style>
<template>
  <div class="hello">
    <div class="parentbox">
      <div class="content">
        <div class="clear">
            <h1 class="title">活动详情</h1>
            <div class="block">
                <span class="demonstration">选择日期</span>
                <el-date-picker
                  v-model="newdata"
                  type="date"
                  size='mini'
                  @change="change"
                  placeholder="选择日期">
                </el-date-picker>
            </div>
            <template>
                <el-table
                  :data="tableData"
                  stripe
                  style="width: 100%">
                  <el-table-column
                    prop="title"
                    label="事件"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="toDayClickNum"
                    label="当天点击次数"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="toDay"
                    label="统计日期"
                    width="180">
                  </el-table-column>

                  <el-table-column
                    prop="countClickNum"
                    label="总计点击"
                    >
                  </el-table-column>
                </el-table>
            </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      newdata:new Date(),//选择日期初始值
      tableData: 
      [{
          countClickNum: '',//总数点击
          toDayClickNum:'',//当天点击
          title: '',//事件
          toDay: '',//统计日期
        },
      ]
    }
  },
  methods:{
    //日期转换
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
    change(e){
      console.log(e)
      console.log(this.newdata)
      let newdata=this.newdata.getTime();
      console.log(newdata)
      this.axios.get('/backstage/count/auth/countBargain',{
        params:{
          plateId:11,
          time:newdata
        }
      }).then(data=>{
        console.log(data)
      this.tableData=data.data.data
      })
    },
    //日期转换
    
  },
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted(){
    this.axios.get('/backstage/count/auth/countBargain',{
      params:{
        plateId:11
      }
    }).then(data=>{
      console.log(data)
      this.tableData=data.data.data
    })
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

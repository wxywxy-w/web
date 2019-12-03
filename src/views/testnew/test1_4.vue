<style lang="less">
ul {
  list-style: none;
}
li {
  list-style: none;
}
.clear::after {
  content: "";
  display: block;
  clear: both;
}
.xiala {
  display: block;
  border: 1px solid #cccccc;
  width: 200px;
  // text-align: center;
  padding-left: 14px;
  font-size: 14px;
  color: #515a6e;
}
.xiala2 {
  display: block;
  border: 1px solid #cccccc;
  width: 120px;
  padding-left: 14px;
  font-size: 14px;
  color: #515a6e;
  line-height: 22px;
}
.btnPiliang {
  position: relative;
}
.btnPiliang > li {
  margin: 20px 0px;
  float: left;
  text-align: center;
  line-height: 28px;
  width: 80px;
  border: 1px solid #0177d5;
  color: #0177d5;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;

  // height: 36px;
}
.红色 {
  width: 100%;
  height: 2px;
  background: red;
}
.FormNode {
  margin-top: 2px;
}
.formHead ul {
  overflow: hidden;
  box-sizing: border-box;
  height: 100px;
  width: 100%;
  line-height: 100px;
  border-right: 1px solid #e8e8e8;
  border-left: 1px solid #e8e8e8;
  border-bottom: 1px solid #e8e8e8;
  background: #ffffff;
}
.formHead > ul > li {
  margin-right: 0px;
  overflow: hidden;
  // background: #cccccc;
  padding-left: 5px;
  margin-left: 15px;
  text-align: left;
  font-size: 16px;
}
.formHead > ul > li:nth-child(1) {
  width: 70px;
}
.formHead > ul > li:nth-child(2) {
  width: 220px;
}
.formHead > ul > li:nth-child(3) {
  width: 100px;
  height: 100px;
}
.formHead > ul > li:nth-child(4) {
  width: 220px;
}
.formHead > ul > li:nth-child(5) {
  width: 160px;
}
.formHead > ul > li:nth-child(6) {
  width: 160px;
}
.formHead > ul > li:nth-child(7) {
  width: 160px;
}
.formHead > ul > li:nth-child(8) {
  width: 160px;
}
.formHead > ul > li:nth-child(9) {
  width: 120px;
}
.pageList {
  position: relative;
  width: 100%;
  height: 70px;
}
.pageitem {
  position: absolute;
  top: 30px;
  left: 550px;
  margin: auto;
}

</style>

<template>
  <div>
    <div class="headTop">
      <h1 style="font-size:18px;">数据列表</h1>
      <div class="clear" style="padding-top:20px;">
        <div class="clear">
          <Input
            style="width:500px;float:left;"
            search
            enter-button="查询"
            placeholder="Enter something..."
          />
          <div style="float:right;">
            <span style="font-size:14px;">内容分类:</span>

            <Dropdown trigger="click" style="margin-left: 20px">
              <a class="xiala" href="javascript:void(0)">
                全部
                <Icon style="float:right" type="ios-arrow-down"></Icon>
              </a>
              <DropdownMenu style="width:200px;float:right;" slot="list">
                <DropdownItem>驴打滚</DropdownItem>
                <DropdownItem>炸酱面</DropdownItem>
                <DropdownItem>冰糖葫芦</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div>
          <ul class="btnPiliang clear">
            <span style="float:left;padding-top:24px;font-size:16px;line-height:20px;font-weight:500">内容分类 :</span>
            <li style="float:left;width:268px;text-align:left;padding-left:10px;">
              <Dropdown
              trigger="click"
            >
              <a style="padding-top:10px;color:black" href="javascript:void(0)">
                 <span style="padding-right;">全部</span>
                <Icon style="float:right;line-height:28px;font-size:18px;padding-left:190px;" type="ios-arrow-down"></Icon>
              </a>
              <DropdownMenu style="width:268px;float:left;position:relative;left:10px;" slot="list">
                <DropdownItem>已完成</DropdownItem>
                <DropdownItem>已支付</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            </li>
            <li
              style="float:right;width:100px;color:#808695;border:1px solid #DCDEE2;background:#F8F8F9;margin-right:160px;"
            >批量发货</li>
            <Dropdown
              style="position:absolute;top:24px;right:0px;height:28px;width:120px;"
              trigger="click"
            >
              <a class="xiala2" href="javascript:void(0)">
                时间由远到进
                <Icon style="float:right" type="ios-arrow-down"></Icon>
              </a>
              <DropdownMenu style="width:100px;float:right;" slot="list">
                <DropdownItem>驴打滚</DropdownItem>
                <DropdownItem>炸酱面</DropdownItem>
                <DropdownItem>冰糖葫芦</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </ul>
        </div>
      </div>
    </div>
    <div class="红色"></div>
     <div style="background:#cccccc;" class="FormNode">
      <ul class="clear">
        <div class="formHead">
          <ul
            class="clear"
            style="background:#FAFAFA;border-top:1px solid #E8E8E8;height:58px;line-height:58px;"
          >
            <li>
              <Checkbox
                style="padding-left:18px;width:50px;"
                v-model="single"
                @on-change="changeGouzi"
              ></Checkbox>
            </li>
            <li>订单编号</li>
            <li>商品图片</li>
            <li>支付时间</li>
            <li>订单金额</li>
            <li>支付方式</li>
            <li>订单状态</li>
            <li>用户账户</li>
            <li>操作</li>
          </ul>
          <ul v-for="(item,index) in OrderList" :key="item.title" class="clear">
            <li>
              <Checkbox
                style="padding-left:18px;width:50px;"
                v-model="single"
                @on-change="changeGouzi(index)"
              ></Checkbox>
            </li>
            <li v-text="item.id"></li>
            <li v-for="arr in item.payOrderDetailList" :key="arr.title">
              <img v-bind:src="arr.goodsImg" style="width:80px;height:80px;margin-top:10px;" alt />
            </li>
            <li >{{item.payTime | formatDate}}</li>
            <li v-text="item.orderAmount"></li>
            <li>
            <span v-if="item.payType==1">支付宝</span>
            <span v-if="item.payType==2">微信</span>
            </li>
            <li>
              <span v-if="item.orderStatus==1">未支付</span>
              <span @click="paycom" style="color:green" v-if="item.orderStatus==2">已支付</span>
              <span style="color:red" v-if="item.orderStatus==3">失效</span>
              <span v-if="item.orderStatus==4">完成</span>
            </li>
            <li v-text="item.deliveryName"></li>
            <li>
              <p>
                <a @click="editor" href="javascript:;">查看订单</a>
              </p>
            </li>
          </ul>

        </div>
        <li></li>
      </ul>
    </div>

    <div class="pageList">
      <Page
        :total="pages.total"
        :current="pages.index"
        :page-size="pages.size"
        @on-change="pageChange"
        @on-page-size-change="pSizeChange"
        class="pageitem"
      />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      single: false,
      pages: {
        index: 1,
        size: 5,
        total: 0
      },
      OrderList: []
    }
  },
  filters: {
    formatDate: function (value) {
      let date = new Date(value)
      let y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? ('0' + MM) : MM
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      let h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      let m = date.getMinutes()
      m = m < 10 ? ('0' + m) : m
      let s = date.getSeconds()
      s = s < 10 ? ('0' + s) : s
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
    }
  },
  methods: {
    btn1: function () {
      console.log(1)
      al
    },
    changeGouzi (index) {
      console.log('选中' + index + this.single)
    },
    editor () {
      console.log('编辑')
    },
    deleted () {
      console.log('删除')
    },
    pageChange (i) {
      this.pages.index = i
      console.log(this.pages.index)
      this.axios.get('/backstage/payOrder/auth/getList', {
        page: this.pages.index,
        pageSize: 4
      })
        .then((response) => {
          console.log(response.data)
          this.OrderList = response.data
        })
    },
    pSizeChange (s) {
      console.log(s)
      this.pages.size = s
      // console.log(this.pages.size);
      this.query()
      // this.,query();
    },
    paycom () {

    }
  },
  mounted () {
    this.axios.get('/backstage/payOrder/auth/getList', {
      page: 1,
      pageSize: 4
    })
      .then((response) => {
        // console.log(response.data)
        this.pages.total = response.count
        this.OrderList = response.data
      })
  }
}
</script>

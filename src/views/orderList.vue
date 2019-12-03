<!--订单列表-->
<template>
  <div class="orderList">
    <Card style="width:100%;margin-top:23px" :bordered="false" class="contentlist">
      <p slot="title" style="font-size:22px;color:rgba(23,35,61,1);">数据列表</p>
      <div class="SRK">
        <Input
          slot="extra"
          class="search"
          placeholder="请输入订单编号"
          style="width:300px"
          v-model="queryInput"
        />
        <Button type="primary" @click="search" style="margin-left: 0.6rem;">查询</Button>
      </div>
      <div class="PX">
        <div class="nrfl">
          <span>内容分类</span>
          <Select v-model="queryType" style="width:200px;margin-left:10px;">
            <Option v-for="item in status" :value="item.value" :key="item.value">{{ item.label }}</Option>
            <!-- <p>{{contentCategory}}</p> -->
          </Select>
        </div>
        <div class="tjnr">
          <i-button @click="toPromo" style="height: 2.0rem;">批量发货</i-button>
          <i-col span="6">
            <Cascader :data="createTime" placeholder="时间有远到近" style="width:150px;margin-left:10px;"></Cascader>
          </i-col>
        </div>
      </div>
      <Table ref="dataTable" :columns="columns4" :data="newlist"></Table>
      <Page
        :total="pages.total"
        :current="pages.index"
        :page-size="pages.size"
        @on-change="pageChange"
        @on-page-size-change="pSizeChange"
        show-elevator
        style="text-align: center;margin-top: 50px;"
      />
    </Card>
  </div>
</template>
<script>
import { formatDate } from "@/view/views/common/date.js";
export default {
  data() {
    return {
      pages: {
        index: 1, //默认当前值
        size: 7, //默认个数
        total: 100 //总数
      },
      to: {
        path: "/2_2"
      },

      queryType: "", //查询类型
      queryInput: "", //查询输入
      datalist: [],
      newlist: [],
      createTime: [
        {
          value: "0",
          label2: "由远到近" //升序
        },
        {
          value: "1",
          label2: "由近到远" //降序
        }
      ],
      status: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "未支付"
        },
        {
          value: "2",
          label: "已支付"
        },
        {
          value: "3",
          label: "失效"
        },
        {
          value: "4",
          label: "完成"
        }
      ],
      money: [
        {
          value: "1",
          label1: "支付宝"
        },
        {
          value: "2",
          label1: "微信"
        }
      ],
      selectedCardStatus: "",
      modal1: false,
      columns4: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "订单编号",
          key: "id",
          render: (h, params) => {
            return h("div", [
              h("Icon", {
                props: {
                  type: "person"
                }
              }),
              h("strong", params.row.id)
            ]);
          }
        },
        {
          title: "商品图片",
          key: "payOrderDetailList",
          render: (h, params) => {
            console.log(params.row.payOrderDetailList[0].goodsImg);
            return h("div", [
              h("img", {
                props: {
                  type: "primary",
                  size: "small"
                },
                attrs: {
                  src: params.row.payOrderDetailList[0].goodsImg,
                  style: "width: 40px;height: 40px;"
                }
              })
            ]);
          }
        },
        {
          title: "支付时间",
          key: "payTime",
          render: (h, params) => {
            return h(
              "div",
              // hh:mm
              formatDate(new Date(params.row.payTime), "yyyy-MM-dd")
            );
          }
        },
        {
          title: "订单金额",
          key: "orderAmount"
        },
        {
          title: "支付方式",
          key: "payType",
          render: (h, params) => {
            return h("span", this.money[params.row.payType].label1);
          }
        },
        {
          title: "订单状态",
          key: "orderStatus",
          render: (h, params) => {
            return h("span", this.status[params.row.orderStatus].label);
          }
        },
        {
          title: "用户账号",
          key: "userId"
        },
        {
          title: "操作",
          key: "action",
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    display: "flow-root"
                  },
                  on: {
                    click: () => {
                      this.toDetails(params.row);
                    }
                  }
                },
                "查看订单"
              )
            ]);
          }
        }
      ],
      data1: [
        {
          id: "",
          payOrderDetailList: "",
          payTime: "",
          orderAmount: "",
          payType: "",
          orderStatus: "",
          userId: "",
          action: ""
        }
      ]
    };
  },
  components: {},
  props: {},
  computed: {},
  watch: {},
  methods: {
    //表格选中事件，保存 id 到数组 selectRelease
    // select(selection){
    //   var ids = []; //勾选的id
    //   for (let i in selection) {
    //     ids.push(selection[i].id);//循环
    //   }
    //   this.selectIds = ids;//数组保存到to
    //   console.log("选中："+ this.selectIds);
    // },

    //点击批量发布跳转
    toPromo() {
      var ids = []; //勾选的id
      let selection = this.$refs.dataTable.getSelection(); //获取列表中选中的记录
      for (let i in selection) {
        ids.push(selection[i].id); //循环
      }

      this.$router.push({
        path: "/2_2",
        name: "promotionContents",
        params: {
          selectIds: ids //参数是选中的编号
        }
      });
    },

    pageChange(i) {
      console.log(i);
      this.pages.index = i;
      // console.log(this.pages.index);
      this.axios
        .get("/backstage/payOrder/auth/getList", {
          params: {
            page: this.pages.index,
            pageSize: this.pages.size
          }
        })
        .then(data => {
          console.log(data.data);
          this.datalist = data.data.data;
          this.newlist = this.datalist;
        });
    },
    pSizeChange(s) {
      console.log(2 + s);
      this.pages.size = s;
    },
    toDetails(row) {
      //参数是表格里某一行的
      console.log("发送：" + row);
      this.$router.push({
        path: "/2_1_1",
        name: "orderdetails",
        params: row
      });
    },
    search() {
      var type = this.queryType; //查询的类型
      var input = this.queryInput; //查询的编号
      let len = this.datalist; //初始数据列表
      var arr = []; //缓存查到的数据

      if (input != "") {
        //查询条件不为空才执行查询
        for (let i in len) {
          //循环初始数据
          if (len[i].id.indexOf(input) != -1) {
            //如果查询条件在 id 中
            arr.push(len[i]);
          }
        }
        this.newlist = arr; //将查到的数据放到要显示的列表
        console.log(
          "---查询条件：" + input + "，查得数据：" + this.newlist.length
        );
      }
    },
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    }
  },
  created() {},
  mounted() {
    this.axios
      .get("/backstage/payOrder/auth/getList", {
        params: {
          page: this.pages.index,
          pageSize: this.pages.size
        }
      })
      .then(data => {
        //原来的请求
        this.datalist = data.data.data;
        this.newlist = data.data.data;
        console.log(this.datalist);
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  destroyed() {}
};
</script>

<style scoped lang='less'>
.orderList {
  .PX {
    display: flex;
    justify-content: space-between;
    margin-top: 0.5rem;
  }
  .tjnr {
    display: flex;
    margin-bottom: 0.5rem;
  }
}
</style>

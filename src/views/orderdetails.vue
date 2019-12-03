<!--订单详情-->
<template>
  <div class="orderdetails">
    <div>
      <Card style="width:100%;margin-top:23px" :bordered="false" class="contentlist">
        <p slot="title" style="font-size:22px;color:rgba(23,35,61,1);">订单详情</p>
        <div
          style="display: flex;
    justify-content: space-between;
    align-items: center; margin-bottom: 1.5rem"
        >
          <!-- params.row.orderStatus -->
          <span>当前状态:{{this.info.orderStatus}}</span>
          <span>订单编号:{{this.info.id}}</span>
        </div>
        <div class="shhrxx" style="margin-bottom: 1.5rem">
          <p>收货人信息</p>
          <Table :columns="columns1" :data="data1"></Table>
        </div>
        <div class="spxx" style="margin-bottom: 1.5rem">
          <p>商品信息</p>
          <Table :columns="columns2" :data="data2"></Table>
        </div>
      </Card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    // orderStatus: [
    //   {
    //     value: "0",
    //     label: "全部"
    //   },
    //   {
    //     value: "1",
    //     label: "未支付"
    //   },
    //   {
    //     value: "2",
    //     label: "已支付"
    //   },
    //   {
    //     value: "3",
    //     label: "失效"
    //   },
    //   {
    //     value: "4",
    //     label: "完成"
    //   }
    // ];
    let infoGet = this.$route.params;
    console.log("获取参数:", infoGet);
    return {
      info: infoGet, //保存数据显示在状态和编号
      data1: [
        {
          deliveryName: infoGet.deliveryName,
          deliveryPhone: infoGet.deliveryPhone,
          deliveryAddress: infoGet.deliveryAddress
        }
      ],
      data2: infoGet.payOrderDetailList, //商品列表
      columns1: [
        {
          title: "收货人",
          key: "deliveryName",
          align: "center"
        },
        {
          title: "手机号",
          key: "deliveryPhone",
          align: "center"
        },
        {
          title: "收货地址",
          key: "deliveryAddress",
          align: "center"
        }
      ],

      columns2: [
        {
          title: "序号",
          key: "id",
          align: "center"
        },
        {
          title: "商品名称",
          key: "goodsName",
          align: "center"
        },
        {
          title: "商品图片",
          key: "goodsImg",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("img", {
                attrs: {
                  src: params.row.goodsImg,
                  style: "width: 40px;height: 40px;"
                }
              })
            ]);
          }
        },
        {
          title: "价格",
          key: "goodsPrice",
          align: "center"
        },
        // {
        //   title: "属性",
        //   key: "exl",
        //   align: "center",
        //   render: (h, params) => {
        //     let a = JSON.parse(params.row.exl); // 将json字符串转换成json对象
        //     // console.log(a);
        //     return h(
        //       "span",
        //       {
        //         style: {
        //           display: "inline-block",
        //           width: params.column._width * 0.9 + "px",
        //           overflow: "hidden",
        //           textOverflow: "ellipsis",
        //           whiteSpace: "nowrap"
        //         }
        //       },
        //       a.memberType
        //     );
        //   }
        // },
        {
          title: "数量",
          key: "goodsNum",
          align: "center"
        },
        {
          title: "小计",
          key: "Totalprice",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("span", params.row.goodsNum * params.row.goodsPrice)
            ]);
          }
        },
        {
          title: "运单信息",
          key: "waybillNo",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  on: {
                    click: () => {
                      this.toViewLogistics(params.row); //前往详情，传递当前行数据
                    }
                  }
                },
                params.row.waybillNo
              )
            ]);
          }
        }
      ]
    };
  },
  mounted() {
    // this.getInfo();//页面加载时获取先获取信息
  },
  methods: {
    toViewLogistics(row) {
      //参数是表格里某一行的
      console.log("发送：" + row);
      this.$router.push({
        path: "/2_1_2",
        name: "viewLogistics",
        params: row
      });
    },

    search() {
      var len = this.datalist;
      var arr = [];
      for (var i in len) {
        if (len[i].name == this.companyName) {
          arr.push(len[i]);
        } else if (this.companyName == "") {
          this.datalist = this.datalist;
          return;
        }
      }

      this.datalist = arr;
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>
<style lang="less">
.SPZT {
  line-height: 2.5rem;
}
.SPZT > p,
.SPZT > div {
  margin-left: 3.4rem;
}
.SPXQ {
  display: flex;
  align-items: center;
}
.ckyl {
  margin-top: 1rem;
}
</style>

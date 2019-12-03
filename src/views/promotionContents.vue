<!--订单发货-->
<template>
  <!-- enter-button="查询" -->
  <div class="ListofGoods">
    <Card style="width:100%;margin-top:23px" :bordered="false" class="contentlist">
      <p slot="title" style="font-size:22px;color:rgba(23,35,61,1);">数据列表</p>
      <div
        class="SRK"
        style="display: flex; justify-content: space-between;  align-items: center; margin-bottom: 2.4rem;"
      >
        <Input
          slot="extra"
          v-model="queryInput"
          search
          placeholder="请输入商品名或商品ID"
          style="width:200px"
        />
        <Button type="primary" @click="search" style="margin-right: 30.4rem;">查询</Button>
        <Row style="width:150px;">
          <i-col>
            <Button type="solid" long @click="handleAdd()" icon="plus-round">+添加物流信息</Button>
          </i-col>
        </Row>
      </div>
    </Card>

    <!--商品选择表格-->
    <div>
      <Table ref="dataTable" :columns="columns_promos" :data="newList"></Table>
      <Page :total="200" show-elevator style="text-align: center;margin-top: 50px;" />
    </div>

    <!--商品选择表格-->
    <Modal title="商品信息" v-model="handleCancel" :footer-hide="true" :mask-closable="false">
      <Table border ref="goodsTable" :columns="columns_goods" :data="goodsList"></Table>
      <div align="right">
        <Button @click="handleCancel=false" style="margin: 1.2rem;margin-bottom:0">取消</Button>
        <Button
          type="primary"
          @click="handleSubmit('formValidate')"
          style="margin:1.2rem;margin-bottom:0"
        >确认</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { insertOrderDetailPost } from "@/api/OrderLogistics.js";

export default {
  data() {
    let infoGet = this.$route.params;
    console.log("获取参数:", infoGet.selectIds);
    return {
      selectIDs: "", //确认发货的id
      datalist: [], //初始数据
      queryInput: "", //查询条件
      newList: [], //查询得到的数据

      selectIds: infoGet.selectIds, //orderlist选中批量发货

      handleCancel: false, //是否打开商品列表
      goodsList: [], //订单的商品信息列表
      goodsNames: [], //商品名

      //商品列
      columns_goods: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "商品名称",
          key: "goodsName",
          align: "center"
        }
      ],

      columns_promos: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "订单编号",
          key: "id",
          render: (h, params) => {
            return h("div", [h("Icon", {}), h("strong", params.row.id)]);
          }
        },
        {
          title: "收货人",
          key: "deliveryName"
        },
        {
          title: "用户ID",
          key: "userId"
        },
        {
          title: "手机号码",
          key: "deliveryPhone"
        },
        {
          title: "收货地址",
          key: "deliveryAddress"
        },
        {
          title: "商品信息",
          key: "payOrderDetailList",
          render: (h, params) => {
            return h(
              "Select",
              {
                props: {
                  placeholder: this.goodsNames[params.index]
                }
              },
              [
                h(
                  "Button",
                  {
                    props: {
                      value: params.row.comInfo
                    },
                    style: {
                      width: 100,
                      align: "center"
                    },
                    on: {
                      "on-change": event => {
                        console.log(event);
                        console.log(this.data2[params.index]);
                      },
                      click: () => {
                        this.showModal(params.row, params.index);
                      }
                    }
                  },
                  "请选择商品信息"
                )
              ]
            );
          }
        },
        {
          title: "物流单号",
          key: "waybillNo",
          render: (h, params) => {
            return h("Input", {
              props: {
                placeholder: "请输入物流单号",
                size: "small"
              },
              style: {
                width: "100%"
              },
              on: {
                Input: val => {
                  this.data[params.index]; //.actualTime = val;
                }
              }
            });
          }
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("selection", [
              h(
                "a",
                {
                  props: {
                    size: "small",
                    align: "center"
                  },
                  on: {
                    click: () => {
                      this.confirm(params.index);
                    }
                  }
                },
                "确认"
              )
            ]);
          }
        }
      ]
    };
  },
  components: {},
  props: {},
  computed: {},
  watch: {
    //newList渲染完成之后调用勾选方法
    newList: function() {
      this.$nextTick(() => {
        this.defaultSelect();
      });
    }
  },
  methods: {
    //根据id数组，选中列表行
    defaultSelect() {
      let objData = this.$refs.dataTable.objData; //表格数据
      for (let i in objData) {
        if (this.selectIds.indexOf(objData[i].id) != -1) {
          //判断表格记录的id是否在selectIds中
          console.log("执行默认选中：" + i);
          objData[i]._isChecked = true; //勾选记录
        }
      }
    },
    search() {
      var input = this.queryInput; //查询的类型
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
        this.newList = arr; //将查到的数据放到要显示的列表
        console.log(
          "---查询条件：" + input + "，查得数据：" + this.newList.length
        );
      }
    },

    //添加物流信息
    handleAdd() {
      let promos = this.$refs.dataTable.getSelection()[0]; //获取列表选中的一条记录
      console.log(promos);
      insertOrderDetailPost({
        method: "post",
        data: {
          ids: `${promos.id}`,
          willboNos: `${promos.payOrderDetailList[0].waybillNo}`,
          bisType: `${1}`
        },
        qs: true
      }).then(res => {
        console.log(res);
        if (res.success) {
          //拼接表格
          let list = this.datalist;
          for (let i in list) {
            if (list[i].id == promos.id) {
              //找到选中行
              let tempList = list.slice(0, parseInt(i) + 1); //得到选中之前的行
              let endList = list.slice(parseInt(i) + 1, list.length); //选中行之后的行

              tempList.push({
                //添加一行到前部分后面
                payOrderDetailList: promos.payOrderDetailList,
                waybillNo: promos.waybillNo
              });

              this.datalist = tempList.concat(endList); //拼接后半部分，保存到datalist
              this.newList = this.datalist; //渲染到页面表格
              this.$Message.success("添加成功!");
            }
          }
        } else {
          this.$Message.error("请求异常!");
        }
      });
    },

    //显示商品信息列表
    showModal(item, index) {
      this.handleCancel = true;
      this.goodsList = item.payOrderDetailList; //将选中行的商品保存到商品列表
      this.itemIndex = index; //商品按钮列表的下标
      this.formValidate = JSON.parse(JSON.stringify(item)); //商品按钮的列表元素

      let select = this.$refs.goodsTable;
      console.log("列" + select.columns);
    },
    //提交选中商品
    handleSubmit(name) {
      let self = this;
      let names = this.goodsNames.slice(0); //复制已有名称数组到暂存数组
      let goodsSelect = this.$refs.goodsTable.getSelection(); //获取商品信息中勾选的商品
      let namesStr = "";
      for (let i in goodsSelect) {
        namesStr += goodsSelect[i].goodsName; //保存商品名称到暂存数组
      }
      names[this.itemIndex] = namesStr;
      this.goodsNames = names; //暂存数组保存为goodsNames
      self.$Message.success("提交成功");
      this.handleCancel = false; //关闭弹窗
    },

    //确认发货
    //      confirm(index) {
    //         console.log(id);
    //       var ids = []; //勾选的id
    //       this.selectIDs = ids; //保存选中的行的数据
    //       for (let i in dataTable) {
    //         if (this.selectIDs.indexOf(dataTable[i].id) != -1) {
    //           dataTable[i].selectid = true;
    //         }
    //         this.$Modal.confirm({
    //           title: `你确定要发货吗?`,
    //           onOk() {
    //               Submission({
    //                    data: {
    //                     ids: `${promos.id}`,
    //                     willboNos: `${promos.payOrderDetailList[0].waybillNo}`,
    //                     bisType: `${1}`
    //                      goodsName:${promos.name}
    //         },
    //         qs: true
    //               }).then(res=>{
    //                   console.log(res);
    //                   alert(res.message);
    //               })
    //           }
    //         });
    //         this.datalist.splice(index, 1);
    //       }
    //      }
    //   },
    confirm(index) {
      //   var ids = []; //勾选的id
      //   this.selectIDs = ids; //保存选中的行的数据
      //   for (let i in dataTable) {
      //     if (this.selectIDs.indexOf(dataTable[i].id) != -1) {
      //       dataTable[i].selectid = true; //勾选记录
      //     }
      //   }
      this.$Modal.confirm({
        title: `你确定要发货吗?`,
        onOk() {
          this.datalist.splice(index, 1);
        }
      });
      this.datalist.splice(index, 1);
    }
  },
  mounted() {
    this.axios
      .get("/backstage/payOrder/auth/getList", {})
      .then(data => {
        //原来的请求
        this.datalist = data.data.data;
        this.newList = data.data.data;
        //console.log(this.datalist);
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  handleSelectAll(status) {
    this.$refs.selection.selectAll(status);
  }
};
</script>

<style scoped lang='less'>
.ListofGoods {
  .SRK_a {
    display: flex;
    justify-content: flex-end;
    align-content: center;
  }
  .selectGroup {
    margin-top: 1.6rem;
    margin-bottom: 1.4rem;
  }
  .btn > button {
    margin-right: 0.3rem;
  }

  .tjnr {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: -1.9rem;
  }
  .anniu {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>

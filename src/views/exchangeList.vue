<!--兑换列表-->
<template>
  <div class="exchangList">
    <Card style="width:100%;margin-top:23px" :bordered="false" class="contentlist">
      <p slot="title" style="font-size:22px;color:rgba(23,35,61,1);">数据列表</p>
      <div class="SRK" style="margin-bottom: 20px;">
        <Input
          slot="extra"
          class="search"
          placeholder="请输入banner名称"
          style="width:300px"
          v-model="queryInput"
        />
        <Button type="primary" @click="search" style="margin-left: 0.6rem;">查询</Button>
      </div>
      <div class="nrfl">
        <span>内容分类</span>
        <Select v-model="selectedCardStatus" style="width:200px;margin-left:10px;">
          <Option v-for="item in orderstatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <i-col span="6" class="time">
          <Cascader :data="switchTime" placeholder="时间有远到近" style="width:150px;margin-left:10px;"></Cascader>
        </i-col>
      </div>
      <Table :columns="columns4" :data="data1"></Table>
      <Page :total="200" show-elevator style="text-align: center;margin-top: 50px;" />
    </Card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sels: [], //选中显示的值
      disabled: true,
      datalist: [], //初始列表，保存请求后台得来的数据
      newList: [], //显示到表格中的列表，查询会修改这个列表
      selectIds: [], //选中的id
      queryType: "", //查询类型
      queryInput: "", //查询输入
      sortTime: "", //时间排序
      createTime: [
        {
          value: "0",
          label: "由远到近" //升序
        },
        {
          value: "1",
          label: "由近到远" //降序
        }
      ],
      orderstatus: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "已支付"
        },
        {
          value: "2",
          label: "已完成"
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
          title: "商品名称",
          key: "username"
        },
        {
          title: "支付时间",
          key: "payTime"
        },
        {
          title: "消费金额",
          key: "releasetime",
          render: (h, params) => {
            return h("div", [h("p", `金币` + `100`), h("p", `do米` + `0`)]);
          }
        },
        {
          title: "订单状态",
          key: "orderstatus"
          //   render: function(h, params) {
          //     var orderstatus = params.row[params.column.key];
          //     var status;
          //     if (orderstatus === "1") {
          //       status = "已支付";
          //     } else if (orderstatus === "2") {
          //       status = "已完成";
          //     }
          //     return h("span", status);
          //   }
        },
        {
          title: "用户账号",
          key: "userAccount"
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
                      this.show(params.index);
                      //   let argu = { numberID: params.row.numberID };
                      //   this.$router.push({
                      //     name: "vieworders",
                      //     params: argu
                      //   });
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
          id: "12345678",
          username: "0元购",
          payTime: "2016-10-03",
          releasetime: "¥99",
          paymentmethod: "支付宝",
          orderstatus: "已支付",
          userAccount: "4546",
          action: ""
        },
        {
          id: "12345678",
          username: "小绿蓝",
          payTime: "2016-10-03",
          releasetime: "¥99",
          paymentmethod: "支付宝",
          orderstatus: "已支付",
          userAccount: "4546",
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
    //根据选择的时间排序方式排序
    switchTime() {
      //   document.getElementsByClassName("ivu-table-cell-sort")[0].click();
      let list = this.newList; //显示的列表
      let sort = this.sortTime; //选中的排序方式，0升序由远到近，1降序由近到远
      if (sort == 0) {
        //升序
        for (let i = 0; i < list.length; i++) {
          //外层循环每一次找到一个最大值
          for (let j = 0; j < list.length - i - 1; j++) {
            //内层循环控制比较的次数，并且判断两个数的大小
            console.log(
              "升序[" +
                j +
                "]" +
                list[j].createTime +
                "/" +
                list[j + 1].createTime
            );
            if (list[j].createTime > list[j + 1].createTime) {
              //排序
              let temp = list[j];
              list[j] = list[j + 1];
              list[j + 1] = temp;
            }
          }
        }
      } else {
        //降序
        for (let i = 0; i < list.length; i++) {
          //外层
          for (let j = 0; j < list.length - i - 1; j++) {
            //内层
            console.log(
              "降序[" +
                j +
                "]" +
                list[j].createTime +
                "/" +
                list[j + 1].createTime
            );
            if (list[j].createTime < list[j + 1].createTime) {
              //排序
              let temp = list[j];
              list[j] = list[j + 1];
              list[j + 1] = temp;
            }
          }
        }
      }
      list.splice(0, 0);
      //冒泡排序测试用
      // let arr = [5,7,6,8,1,3,9,2,0];
      // for (let i = 0; i < arr.length; i++) {
      //   for (let j = 0; j < arr.length-i-1; j++) {
      //     if (arr[j] > arr[j+1]) { //排序
      //       let temp = arr[j];
      //       arr[j] = arr[j+1];
      //       arr[j+1] = temp;
      //     }
      //   }
      // }
      // console.log(arr);
    },
    search() {
      var input = this.queryInput; //查询的类型
      let len = this.data1; //初始数据列表
      var arr = []; //缓存查到的数据

      if (input != "") {
        //查询条件不为空才执行查询
        for (let i in len) {
          //循环初始数据
          if (len[i].username.indexOf(input) != -1) {
            //如果查询条件在 id 中
            arr.push(len[i]);
          }
        }
        this.data1 = arr; //将查到的数据放到要显示的列表
        console.log(
          "---查询条件：" + input + "，查得数据：" + this.data1.length
        );
      }
    },
    show(index) {
      this.$router.push({
        path: "/vieworders",
        query: {
          info: index
        }
      });
      //   this.$Modal.info({
      //     title: "添加banner",
      //     content: `banner分类：<select><optio>全部</option><select><br>banner名称：<input></input>新人专区<br>文件上传： <Upload action="//jsonplaceholder.typicode.com/posts/">
      //     <Button icon="ios-cloud-upload-outline">Upload files</Button>
      // </Upload><br>跳转方式：<Select><Option></Option><Select><br>跳转地址：<Checkbox v-model="single">Checkbox</Checkbox><br>目标内容：<input></input>`
      //   });
    },
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    }
  },
  created() {},
  mounted() {},
  destroyed() {}
};
</script>

<style lang='less'>
.nrfl {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}
.time {
  display: flex;
  margin-left: 21rem;
}
</style>
  
<!--提现审核-->
<template>
  <!-- enter-button="查询" -->
  <div class="about">
    <Card style="width:100%;margin-top:23px" :bordered="false" class="contentlist">
      <p slot="title" style="font-size:22px;color:rgba(23,35,61,1);">数据列表</p>
      <div class="SRK_a">
        <div class="SRK">
          <Input
            slot="extra"
            class="search"
            placeholder="请输入banner名称"
            style="width:300px"
            v-model="queryInput"
          />
          <Button type="primary" @click="search" style="margin-left: 0.6rem;">查询</Button>
        </div>
      </div>
      <div class="tjnr">
        <i-button>审核通过</i-button>
        <i-col span="6">
          <Cascader :data="cityList" placeholder="时间有远到近" style="width:150px;margin-left:10px;"></Cascader>
        </i-col>
      </div>
    </Card>

    <div>
      <Table border ref="selection" :columns="columns4" :data="newList"></Table>
      <Page :total="200" show-elevator style="text-align: center;margin-top: 50px;" />
    </div>

    <Modal
      :title="modalTitle"
      v-model="handleModal"
      :footer-hide="true"
      :mask-closable="false"
      @on-visible-change="handleReset('formValidate')"
    >
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="用户账户" prop="content">{{id}}</FormItem>
        <FormItem label="审核详情" prop="cardstate">
          <RadioGroup v-model="formValidate.cardstate">
            <Radio label="审核通过"></Radio>
            <Radio label="审核不通过"></Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="反馈详情" prop="content">
          <Input v-model="value6" type="textarea" :rows="4" placeholder="请输入反馈内容" />
        </FormItem>
        <FormItem style="display: flex;justify-content: flex-end;">
          <Button @click="handleReset('formValidate')" style="margin-right:10px;">取消</Button>
          <Button type="primary" @click="handleSubmit('formValidate')">确认</Button>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import { formatDate } from "@/views/common/date.js";

export default {
  data() {
    return {
      //   modal3: false,
      //   contentCategory: "",
      //[(page = ""), (pageSize = ""), (plateld = 5), (optld = 563)]

      datalist: [], //初始列表，保存请求后台得来的数据
      newList: [], //显示到表格中的列表，查询会修改这个列表

      queryInput: "", //查询输入

      cityList: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "每日爆款"
        },
        {
          value: "2",
          label: "朋友圈"
        },
        {
          value: "3",
          label: "文章"
        }
      ],
      handleModal: false,

      modalTitle: "",

      // data1: [],
      formValidate: {
        name: "",

        carNumber: ""
      },

      ruleValidate: {
        name: [
          {
            required: true,

            message: "banner名不能为空",

            trigger: "blur"
          }
        ]
      },
      modal1: false,
      columns4: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "用户账号",
          key: "id"
        },
        {
          title: "手机号",
          key: "iphon"
        },
        {
          title: "支付账号",
          key: "ZFid"
        },
        {
          title: "提现金额",
          key: "TXmoney",
          render: (h, params) => {
            return h("div", [h("p", `86645金币`), h("p", `约¥866.45`)]);
          }
        },
        {
          title: "提现申请时间",
          // key: "createTime",
          render: (h, params) => {
            return h(
              "span",
              formatDate(new Date(params.row.createTime), "yyyy-MM-dd")
            );
          }
        },
        {
          title: "审核状态",
          key: "type",
          render: (h, params) => {
            return h("span", this.cityList[params.row.type].label);
          }
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
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
                      //   this.show(params.row, params.index);
                      this.editBus(params.row, params.index);
                    }
                  }
                },
                "审核"
              )
            ]);
          }
        }
      ],
      newList: [
        {
          id: "4546",
          iphon: "12345678",
          ZFid: "15867189876",
          TXmoney: "0",
          createTime: "0",
          type: "2",
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
    search() {
      var type = this.queryType; //查询的类型
      var input = this.queryInput; //查询的类型
      let len = this.datalist; //初始数据列表
      var arr = []; //缓存查到的数据

      if (type != "" && input != "") {
        //两个条件都有
        console.log("--ti查询类型：" + type + "---查询输入：" + input);
        for (var i in len) {
          //循环初始数据
          let a = JSON.parse(JSON.stringify(len[i]));
          var shareText = JSON.parse(a.jsonText).shareText; //获取内容
          if (
            (type == 0 || len[i].type == type) &&
            shareText.indexOf(input) != -1
          ) {
            arr.push(len[i]);
          }
        }
      } else if (type != "" && input == "") {
        //类型不空，输入空
        console.log("--t查询类型：" + type + "---查询输入：" + input);
        for (var i in len) {
          //循环初始数据
          if (len[i].type == type || type == 0) {
            arr.push(len[i]);
          }
        }
      } else if (type == "" && input != "") {
        //类型空，输入不空
        console.log("--i查询类型：" + type + "---查询输入：" + input);
        for (var i in len) {
          //循环初始数据

          let a = JSON.parse(JSON.stringify(len[i]));
          //   console.log("--i查询：" + a);

          var shareText = JSON.parse(a.jsonText).shareText; //获取字段内容
          //
          if (shareText.indexOf(input) != -1) {
            arr.push(len[i]);
          }
        }
      } else {
        //两个条件都没有
        this.newList = this.datalist;
        return;
      }
      this.newList = arr; //将查到的数据放到要显示的列表
    },

    // 增加用户时使用push方法，把用户的信息添加到list数组的最后
    // addBus() {
    //   this.handleModal = true;
    //   this.modalTitle = "新增";
    // },

    editBus(item, index) {
      this.handleModal = true;
      this.modalTitle = "动态审核";
      this.itemIndex = index;
      this.formValidate = JSON.parse(JSON.stringify(item));
    },
    // show(index) {
    //   this.$Modal.info({
    //     title: "添加banner",
    //     content: `banner分类：<select><optio>全部</option><select><br>banner名称：<input></input>新人专区<br>文件上传： <Upload action="//jsonplaceholder.typicode.com/posts/">
    //     <Button icon="ios-cloud-upload-outline">Upload files</Button>
    // </Upload><br>跳转方式：<Select><Option></Option><Select><br>跳转地址：<Checkbox v-model="single">Checkbox</Checkbox><br>目标内容：<input></input>`
    //   });
    // },
    remove(index) {
      this.$Modal.info({
        content: `你确定要删除吗?`
      });
      this.data1.splice(index, 1);
    },
    handleSubmit(name) {
      var self = this;

      self.$refs[name].validate(valid => {
        if (valid) {
          var params = JSON.parse(JSON.stringify(self.formValidate));

          if (self.modalTitle === "新增") {
            // 获取需要渲染到页面中的数据

            self.$Message.success("新增成功!");

            self.data1.push(params);
          } else {
            // 获取需要渲染到页面中的数据

            this.$set(self.data1, self.itemIndex, params);

            self.$Message.success("修改成功!");
          }

          self.handleModal = false;
        }
      });
    },

    handleReset(name) {
      this.$refs[name].resetFields();
    }

    //删除用户时，通过splice(index, 1)，可以删除index位置的数据，页面上的数据自动就会更新
    // remove(index) {
    //   this.data1.splice(index, 1);
    // }
  },
  mounted() {
    // this.axios
    //   .get("/backstage/community/auth/getList")
    //   .then(data => {
    //     //原来的请求
    //     this.datalist = data.data.data;
    //     this.newList = this.datalist;
    //     // console.log("---");
    //     // console.log( this.datalist );
    //     // console.log("---");
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });
  },
  handleSelectAll(status) {
    this.$refs.selection.selectAll(status);
  }
  //   created() {},
  //   mounted() {},
  //   destroyed() {}
};
</script>

<style scoped lang='less'>
.about {
  // > .contentlist{

  // }
  .SRK_a {
    display: flex;
    justify-content: space-between;
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
}
</style>

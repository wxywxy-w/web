<!--添加自营商品-->
<template>
  <div class="adverList">
    <div>
      <Card style="width:100%;margin-top:23px" :bordered="false" class="contentlist">
        <p slot="title" style="font-size:22px;color:rgba(23,35,61,1);">订单详情</p>
        <div style="display: flex;
    justify-content: space-between;
    align-items: center;">
          <span>当前状态:</span>
          <span>订单编号:</span>
        </div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <p>收货人信息</p>
          <FormItem prop="GUIGE" ref="search">
            <Table :columns="columns1" :data="datalist"></Table>
          </FormItem>

          <p>商品信息</p>
          <FormItem prop="GUIGE" ref="search">
            <Table :columns="columns2" :data="data1List"></Table>
          </FormItem>
        </Form>
      </Card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    infoGet: this.$route.query.info;
    console.log("this.infoGet", this.infoGet);
    return {
      datalist: [],
      value6: "",
      value5: "",
      modal3: false,
      formValidate: {
        name: "",
        GUIGE: "",
        city: "",
        gender: "",
        interest: [],
        date: "",
        time: "",
        desc: ""
      },
      columns1: [
        {
          title: "收货人",
          key: "stock",
          align: "center"
        },
        {
          title: "手机号",
          key: "minNormalPrice",
          align: "center"
        },
        {
          title: "收货地址",
          key: "minGroupPrice",
          align: "center"
        }
      ],
      data1: [
        {
          stock: "",
          minNormalPrice: "",
          minGroupPrice: ""
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
          key: "username",
          align: "center"
        },
        {
          title: "商品图片",
          key: "userimg",
          align: "center"
        },
        {
          title: "价格",
          key: "price",
          align: "center"
        },
        {
          title: "属性",
          key: "shuxing",
          align: "center"
        },
        {
          title: "数量",
          key: "numbre",
          align: "center"
        },
        {
          title: "小计",
          key: "xiaoji",
          align: "center"
        },
        {
          title: "运单信息",
          key: "yundanxinxi",
          align: "center"
        }
      ],
      data2: [
        {
          id: "",
          username: "",
          userimg: "",
          username: "",
          price: "",
          shuxing: "",
          number: "",
          xiaoji: "",
          yundanxinxi: ""
        }
      ]
    };
  },
  mounted() {
    // this.data1 = this.data1;
    //     this.axios
    //       .post("/backstage/auth/addCustomizeGoods", {})
    //       .then(data => {
    //         //原来的请求
    //         this.datalist = data.data.data;
    //         console.log(this.datalist);
    //       })
    //       .catch(function(error) {
    //         console.log(error);
    //       });
  },
  methods: {
    showSubmit() {},
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
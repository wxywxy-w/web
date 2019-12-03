<!--订单跟踪-->
<template>
  <div class="viewLogistics">
    <Card style="width:100%;height:100%">
      <p slot="title">
        <Icon type="ios-film-outline"></Icon>订单跟踪
      </p>
      <a href="#" slot="extra" @click.prevent="closeInfo">
        <Icon type="ios-loop-strong"></Icon>关闭
      </a>
      <div style="text-align:left">
        <Steps current="0" status="finish" direction="vertical">
          <Step status="finish" :title="post[0].remark" :content="post[0].acceptTime"></Step>
          <Step status="finish" :title="post[1].remark" :content="post[1].acceptTime"></Step>
          <Step status="finish" :title="post[2].remark" :content="post[2].acceptTime"></Step>
          <Step status="finish" :title="post[3].remark" :content="post[3].acceptTime"></Step>
          <Step status="finish" :title="post[4].remark" :content="post[4].acceptTime"></Step>
          <Step status="finish" :title="post[5].remark" :content="post[5].acceptTime"></Step>
          <Step status="finish" :title="post[6].remark" :content="post[6].acceptTime"></Step>
          <Step status="finish" :title="post[7].remark" :content="post[7].acceptTime"></Step>
        </Steps>
      </div>
    </Card>
  </div>
</template>

<script>
export default {
  data() {
    let infoGet = this.$route.params;
    console.log("获取参数:", infoGet);
    return {
      info: infoGet, //保存数据显示在状态和编号
      data: [], //查询到的运单信息
      post: [], //订单的显示信息,
      data1: [
        {
          acceptAddress: infoGet.acceptAddress,
          acceptTime: infoGet.acceptTime,
          remark: infoGet.remark
        }
      ],
      post_Type: [
        {
          value: "0",
          label: "百世"
        },
        {
          value: "1",
          label: "中通"
        },
        {
          value: "2",
          label: "圆通"
        }
      ],
      post_Status: [
        {
          value: "0",
          label: "收件"
        },
        {
          value: "1",
          label: "发件"
        },
        {
          value: "2",
          label: "到件"
        },
        {
          value: "3",
          label: "派件"
        },
        {
          value: "4",
          label: "入库"
        },
        {
          value: "5",
          label: "签收"
        }
      ]
    };
  },
  components: {},
  props: {},
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    closeInfo() {}
  },
  created() {},
  mounted() {
    this.axios
      .get("/backstage/delivery/auth/getDelivery", {
        params: { waybillNo: this.info.waybillNo }
      })
      .then(data => {
        this.data = data.data.data[0]; //保存查询数据
        this.post = JSON.parse(this.data.postJson); //转换运单信息为JSON对象
        // console.log("运单信息（运单过程）："+ this.postJson.length);
        console.log(this.post[0]);
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  destroyed() {}
};
</script>

<style scoped lang='less'>
</style>

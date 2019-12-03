<!--分类管理-->
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
            placeholder="请搜索分类标题"
            style="width:300px"
            v-model="queryInput"
          />
          <Button type="primary" @click="search" style="margin-left: 0.6rem;">查询</Button>
        </div>
      </div>
      <div class="HB" style="display: flex;justify-content: space-between;">
        <div class="btn">
          <Button type="primary" ghost class="plsj" @click="editBus">新增</Button>
          <Button type="primary" ghost class="plsj" @click="editBINji">编辑</Button>
          <Button type="primary" ghost class="plsj">删除</Button>
          <Button type="primary" ghost class="plsj">展开折叠</Button>
        </div>
        <div class="PX">
          <span>内容类别:</span>
          <Select v-model="queryType" placeholder="全部" style="width:200px;margin-left:20px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            <!-- <p>{{contentCategory}}</p> -->
          </Select>
        </div>
      </div>
    </Card>

    <div>
      <Table @on-selection-change="onSelect" :columns="columns4" :data="newList"></Table>
      <Page :total="200" show-elevator style="text-align: center;margin-top: 50px;" />
    </div>
    <!--新增-->
    <Modal
      :title="modalTitle"
      v-model="handleModal"
      :footer-hide="true"
      :mask-closable="false"
      @on-visible-change="handleReset('formValidate')"
    >
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="分类名称:" prop="cardstate">
          <Input style="width: 200px;margin-left: 1.3rem;"></Input>
        </FormItem>

        <FormItem label="上级分类:" prop="content">
          <!-- <Input v-model="formValidate.content" placeholder="banner"></Input> -->
          <Select v-model="queryType" placeholder="请选择分类" style="width:200px;margin-left:20px">
            <Option v-for="item in city_List" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>

        <FormItem label="文件上传:" prop="content">
          <Upload
            style="margin-left: 1.3rem;width:168px;"
            multiple
            type="drag"
            action="//jsonplaceholder.typicode.com/posts/"
          >
            <div>
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点击或拖拽上传</p>
            </div>
          </Upload>
        </FormItem>

        <FormItem label="添加标签:" prop="cardstate">
          <Input style="width: 200px;margin-left: 1.3rem;"></Input>
          <Button style="margin-left: 1.3rem;">新增</Button>
          <RadioGroup>
            <Radio label="经验"></Radio>
            <Radio label="必看"></Radio>
            <Radio label="进阶"></Radio>
            <Radio label="地推"></Radio>
          </RadioGroup>
        </FormItem>

        <FormItem label="开始时间:">
          <Row>
            <Col span="12">
              <DatePicker type="date" style="width: 200px"></DatePicker>
            </Col>
          </Row>
        </FormItem>

        <FormItem label="结束时间:">
          <Row>
            <Col span="12">
              <DatePicker type="daterange" style="width: 200px"></DatePicker>
            </Col>
          </Row>
        </FormItem>

        <FormItem style="display: flex;justify-content: flex-end;">
          <Button @click="handleReset('formValidate')" style="margin-right: 8px">取消</Button>
          <Button type="primary" @click="handleSubmit('formValidate')">确认</Button>
        </FormItem>
      </Form>
    </Modal>

    <!--编辑-->
    <Modal
      :title="Title"
      v-model="handle_Modal"
      :footer-hide="true"
      :mask-closable="false"
      @on-visible-change="handleReset('Validate')"
    >
      <Form ref="Validate" :model="Validate" :rules="ruleValidate" :label-width="80">
        <FormItem label="分类名称:" prop="cardstate">
          <Input style="width: 200px;margin-left: 1.3rem;" placeholder="banner名称"></Input>
        </FormItem>

        <FormItem label="上级分类:" prop="content">
          <!-- <Input v-model="formValidate.content" placeholder="banner"></Input> -->
          <Select v-model="queryType" placeholder="请选择分类" style="width:200px;margin-left:20px">
            <Option v-for="item in city_List" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>

        <FormItem label="文件上传:" prop="content">
          <Upload
            style="margin-left: 1.3rem;width:168px;"
            multiple
            type="drag"
            action="//jsonplaceholder.typicode.com/posts/"
          >
            <div>
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点击或拖拽上传</p>
            </div>
          </Upload>
        </FormItem>

        <FormItem label="添加标签:" prop="cardstate">
          <Input style="width: 200px;margin-left: 1.3rem;"></Input>
          <Button style="margin-left: 1.3rem;">新增</Button>
          <RadioGroup v-model="phone">
            <Radio label="经验"></Radio>
            <Radio label="必看"></Radio>
            <Radio label="进阶"></Radio>
            <Radio label="地推"></Radio>
          </RadioGroup>
        </FormItem>

        <FormItem label="开始时间:">
          <Row>
            <Col span="12">
              <DatePicker type="date" placeholder="2019-2 11:11" style="width: 200px"></DatePicker>
            </Col>
          </Row>
        </FormItem>

        <FormItem label="结束时间:">
          <Row>
            <Col span="12">
              <DatePicker type="daterange" placeholder="2019-2 11:11" style="width: 200px"></DatePicker>
            </Col>
          </Row>
        </FormItem>

        <FormItem style="display: flex;justify-content: flex-end;">
          <Button @click="handleReset('Validate')" style="margin-right: 8px">取消</Button>
          <Button type="primary" @click="handleSubmit('Validate')">确认</Button>
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
      phone: "经验",
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
          label: "内容活动"
        },
        {
          value: "2",
          label: "订单物流"
        },
        {
          value: "3",
          label: "商品库"
        },
        {
          value: "4",
          label: "审核"
        },
        {
          value: "5",
          label: "权限管理"
        },
        {
          value: "6",
          label: "系统管理"
        }
      ],
      city_List: [
        {
          value: "0",
          label: "请选择分类"
        },
        {
          value: "1",
          label: "服饰鞋包"
        },
        {
          value: "2",
          label: "手机数码"
        },
        {
          value: "3",
          label: "家用加电"
        },
        {
          value: "4",
          label: "美妆饰品"
        },
        {
          value: "5",
          label: "母婴用品"
        },
        {
          value: "6",
          label: "家居建材"
        },
        {
          value: "7",
          label: "家居建材"
        },
        {
          value: "8",
          label: "百货食品"
        },
        {
          value: "9",
          label: "户外运动"
        },
        {
          value: "10",
          label: "文化玩乐"
        },
        {
          value: "11",
          label: "生活服务"
        },
        {
          value: "12",
          label: "其他商品"
        },
        {
          value: "13",
          label: "汽配摩托"
        }
      ],
      handleModal: false,
      handle_Modal: false,
      modalTitle: "",
      Title: "",
      // data1: [],
      formValidate: {
        name: "",

        carNumber: ""
      },
      Validate: {
        name: "",

        carNumber: ""
      },
      modal1: false,
      columns4: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "标题",
          key: "optName"
        },
        {
          title: "分类图片",
          key: "picUrl",
          render: (h, params) => {
            console.log(params.row);
            return h(
              "div",
              {
                attrs: {
                  style: "width: 40px;height: 40px;"
                }
              },
              [
                h("img", {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  attrs: {
                    src: params.row.picUrl,
                    style: "width: 40px;height: 40px;"
                  },
                  style: {}
                })
              ]
            );
          }
        },
        {
          title: "排序值",
          key: "level"
        },
        {
          title: "开始时间",
          // key: "createTime",
          render: (h, params) => {
            return h(
              "span",
              formatDate(new Date(params.row.startTime), "yyyy-MM-dd")
            );
          }
        },
        {
          title: "结束时间",
          // key: "overTime",
          render: (h, params) => {
            return h(
              "span",
              formatDate(new Date(params.row.endTime), "yyyy-MM-dd")
            );
          }
        },
        {
          title: "标签",
          key: "plateId"
        }
      ],
      newList: [
        {
          optName: "",
          picUrl: "",
          level: "",
          createTime: "0",
          overTime: "0",
          plateId: ""
        }
      ]
    };
  },
  components: {},
  props: {},
  computed: {},
  watch: {},
  methods: {},
  mounted() {
    // this.data1 = this.data1;
    this.axios
      .get("/backstage/goodsOpts/auth/getList", {})
      .then(data => {
        //原来的请求
        this.newList = data.data.data;
        console.log(this.newList);
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    editBus(item, index) {
      this.handleModal = true;

      this.modalTitle = "添加板块";

      this.itemIndex = index;

      this.formValidate = JSON.parse(JSON.stringify(item));
    },
    editBINji(item, index) {
      this.handle_Modal = true;

      this.Title = "编辑板块";

      this.itemIndex = index;

      this.Validate = JSON.parse(JSON.stringify(item));
    }
  }
};
</script>

<style scoped lang='less'>
.plsj {
  margin: 0.4rem;
}
</style>

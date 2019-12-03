<!--板块管理-->
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
      <div class="HB" style="display: flex;justify-content: space-between;">
        <div class="btn">
          <Button type="primary" ghost class="plsj" @click="editBus">新增</Button>
          <Button type="primary" ghost class="plsj" @click="editBINji">编辑</Button>
          <Button type="primary" ghost class="plsj" @click="removeBatch()">删除</Button>
          <Button type="primary" ghost class="plsj">展开折叠</Button>
        </div>
        <div class="PX">
          <span>板块分类</span>
          <Select v-model="queryType" placeholder="全部" style="width:200px;margin-left:20px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            <!-- <p>{{contentCategory}}</p> -->
          </Select>
        </div>
      </div>
    </Card>

    <div>
      <Table ref="selection" @on-selection-change="selectList" :columns="columns4" :data="newList"></Table>
      <!-- <Page :total="200" show-elevator style="text-align: center;margin-top: 50px;" /> -->
    </div>
    <!--新增-->
    <Modal
      :title="modalTitle"
      v-model="handleReset"
      :footer-hide="true"
      :mask-closable="false"
      @on-visible-change="handleReset('formValidate')"
    >
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="上级菜单:" prop="content">
          <!-- <Input v-model="formValidate.content" placeholder="banner"></Input> -->
          <span>板块分类</span>
          <Select v-model="queryType" placeholder="全部" style="width:200px;margin-left:20px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>

        <FormItem label="菜单名称:" prop="cardstate">
          <Input v-model="formValidate.cardstate"></Input>
        </FormItem>

        <FormItem label="菜单状态:" prop="cardstate">
          <RadioGroup v-model="formValidate.cardstate">
            <Radio label="显示"></Radio>
            <Radio label="隐藏"></Radio>
          </RadioGroup>
        </FormItem>

        <FormItem style="display: flex;justify-content: flex-end;align-items: center;">
          <!--@click="handle_Modal=false"-->
          <Button @click="handleReset=false" style="margin-right: 1.3rem;">取消</Button>
          <Button type="primary" @click="handleSubmit('formValidate')">确认</Button>
        </FormItem>
      </Form>
    </Modal>

    <!--编辑-->
    <Modal
      :title="Title"
      v-model="handle_Reset"
      :footer-hide="true"
      :mask-closable="false"
      @on-visible-change="handle_Reset('Validate')"
    >
      <Form ref="Validate" :model="Validate" :rules="ruleValidate" :label-width="80">
        <FormItem label="上级菜单:" prop="content">
          <span>板块分类</span>
          <Select v-model="queryType" placeholder="内容活动" style="width:200px;margin-left:20px">
            <Option v-for="item in optsType" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>

        <FormItem label="菜单名称:" prop="cardstate">
          <Input v-model="Validate.cardstate" placeholder="板块名称"></Input>
        </FormItem>

        <FormItem label="菜单状态:" prop="cardstate">
          <RadioGroup v-model="Validate.cardstate">
            <Radio label="显示"></Radio>
            <Radio label="隐藏"></Radio>
          </RadioGroup>
        </FormItem>

        <FormItem style="display: flex;justify-content: flex-end;align-items: center;">
          <Button @click="handle_Reset=false" style="margin-right: 1.3rem;">取消</Button>
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
      sels: [], //选中显示的值
      disabled: true,
      datalist: [], //初始列表，保存请求后台得来的数据
      newList: [], //显示到表格中的列表，查询会修改这个列表
      selectIds: [], //选中的id
      cityList: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "时间分类"
        }
      ],
      handle_Reset: false,
      handleReset: false,
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
          key: "title"
          //   render: (h, params) => {
          //     return h("Dropdown", [
          //       h("p"),
          //       h(
          //         "DropdownMenu",
          //         {
          //           slot: "list"
          //         },
          //         [
          //           h(
          //             "DropdownItem",
          //             "Icon",
          //             {
          //               props: {
          //                 type: "ios-arrow-down"
          //               },
          //               naticeOn: {
          //                 click: name => {
          //                   this.show(params.index);
          //                 }
          //               }
          //             },
          //             "推广内容"
          //           ),
          //           h("DropdownItem", "添加内容"),
          //           h("DropdownItem", "广告列表")
          //         ]
          //       )
          //     ]);
          //   }
        },
        {
          title: "创建时间",
          // key: "createTime",
          render: (h, params) => {
            return h(
              "span",
              formatDate(new Date(params.row.createTime), "yyyy-MM-dd")
            );
          }
        }
      ],
      newList: [
        {
          title: "",
          createTime: "0"
        }
      ]
    };
  },
  components: {},
  props: {},
  computed: {},
  watch: {},
  mounted() {
    // this.data1 = this.data1;
    this.axios
      .get("/backstage/plate/auth/getList", {})
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
    selectList() {
      let selection = this.$refs.selection.getSelection(); //获取当前选中的
      console.log(selection);
      if (selection.length > 0) {
        //如果有选中的就保存选中数据
        this.selectIds = selection;
      } else {
        this.selectIds = []; //没有选中就清空上一次保存的数据
      }
    },
    removeBatch: function() {
      let list = this.newList; //显示的
      let ids = this.selectIds; //选中的
      if (ids.length > 0) {
        //有选中的才执行删除
        this.$Modal.confirm({
          title: "确定删除？",
          onOk() {
            //开始删除
            for (let i = 0; i < list.length; i++) {
              //循环显示列表
              for (let j = 0; j < ids.length; j++) {
                //循环选中列表
                if (list[i].id == ids[j].id) {
                  //如果显示列表中的数据 在 选中列表中，则删除显示数据
                  console.log("删除[" + i + "]:" + list[i].id);
                  list.splice(i, 1); //删除
                }
              }
            }
          }
        });
      } else {
        alert("未选中要删除的数据！"); //没有勾选点击批量删除数据给出提示
      }
    },

    editBus(item, index) {
      this.handleReset = true;

      this.modalTitle = "添加板块";

      this.itemIndex = index;

      this.formValidate = JSON.parse(JSON.stringify(item));
      //   this.axios
      //     .get("/backstage/plate/auth/add", {})
      //     .then(data => {
      //       //原来的请求
      //       this.newList = data.data.data;
      //       console.log(this.newList);
      //     })
      //     .catch(function(error) {
      //       console.log(error);
      //     });
    },
    editBINji(item, index) {
      this.handle_Reset = true;

      this.Title = "编辑板块";

      this.itemIndex = index;

      this.Validate = JSON.parse(JSON.stringify(item));
      //   this.axios
      //     .get("/backstage/plate/auth/update", {})
      //     .then(data => {
      //       //原来的请求
      //       this.newList = data.data.data;
      //       console.log(this.newList);
      //     })
      //     .catch(function(error) {
      //       console.log(error);
      //     });
    }
  }
};
</script>

<style scoped lang='less'>
.plsj {
  margin: 0.4rem;
}
</style>

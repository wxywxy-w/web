<!---系统管理-->
<template>
  <div class="PrivilegManagAccount">
    <p slot="title" style="font-size:22px;color:rgba(23,35,61,1);margin-bottom: 10px;">数据列表</p>
    <div class="selectGroup">
      <div class="btn" style="margin-bottom: 20px;">
        <Button type="primary" @click="Enable(1)" ghost class="plsj">批量启用</Button>
        <Button type="primary" @click="Enable(0)" ghost class="plxj">批量禁用</Button>
        <Button type="primary" @click="removeBatch()" ghost class="plxj">批量删除</Button>
        <Button type="primary" @click="addedit()" ghost class="tjzh" style="float: right;">+添加账号</Button>
      </div>
    </div>

    <div>
      <Table
        border
        ref="selection"
        @on-selection-change="selectList"
        :columns="columns1"
        :data="newList"
      ></Table>
      <Page :total="200" show-elevator style="text-align: center;margin-top: 50px;" />
    </div>
    <Modal
      :title="modalTitle"
      v-model="addNumber"
      :footer-hide="true"
      :mask-closable="false"
      @on-visible-change="addNumber('formValidate')"
    >
      <Form
        ref="formValidate"
        :model="formValidate"
        style="margin-top:2.0rem;"
        :rules="ruleValidate"
        :label-width="80"
      >
        <FormItem label="账户名:" prop="userid">
          <Input v-model="formValidate.userid"></Input>
        </FormItem>

        <FormItem label="用户昵称:" prop="username">
          <Input v-model="formValidate.username"></Input>
        </FormItem>

        <FormItem label="手机号码:" prop="phone">
          <Input v-model="formValidate.phone"></Input>
        </FormItem>

        <FormItem label="登录密码:" prop="cts">
          <Input v-model="formValidate.cts"></Input>
        </FormItem>

        <FormItem style="display: flex;justify-content: flex-end;align-items: center;">
          <!--@click="handle_Modal=false"-->
          <Button @click="addNumber=false" style="margin-right: 1.3rem;">取消</Button>
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
      sels: [], //选中显示的值
      disabled: true,
      addNumber: false,
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
      datalist: [], //初始列表，保存请求后台得来的数据
      newList: [], //显示到表格中的列表，查询会修改这个列表
      selectIds: [], //选中的id
      columns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "账户名",
          key: "userid",
          align: "center"
        },
        {
          title: "账户昵称",
          key: "username",
          align: "center"
        },
        {
          title: "创建时间",
          key: "time",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              // hh:mm
              formatDate(new Date(params.row.time), "yyyy-MM-dd")
            );
          }
        },
        {
          title: "手机号",
          key: "iphon",
          align: "center"
        },
        {
          title: "是否启用",
          key: "isEnable",
          align: "center",
          render: (h, params) =>
            h("i-switch", {
              props: {
                type: "primary",
                value: params.row.isEnable === 1
              },
              on: {
                "on-change": value => {
                  this.switch(params.index);
                }
              }
            })
        },
        {
          title: "操作",
          key: "Action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    display: "flow-root"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                      confirm("你确定删除选中账号吗?");
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      newList: [
        {
          userid: "1234",
          username: "小绿蓝",
          time: "0",
          iphon: "15267980192",
          isSF: "0",
          Action: ""
        }
      ]
    };
  },
  methods: {
    //选中事件触发此方法
    selectList() {
      let selection = this.$refs.selection.getSelection(); //获取当前选中的
      console.log(selection);
      if (selection.length > 0) {
        //如果有选中的就保存选中的数据
        this.selectIds = selection;
      } else {
        this.selectIds = []; //没有选中就清空上一次保存的数据
      }
    },
    //批量删除
    removeBatch: function() {
      let list = this.newList; //显示的
      let ids = this.selectIds; //选中的
      if (ids.length > 0) {
        //有选中的就执行删除
        this.$Modal.confirm({
          title: "确定删除？",
          onOk() {
            //开始删除
            for (let i = 0; i < list.length; i++) {
              //循环显示列表
              for (let j = 0; j < ids.length; j++) {
                //循环选中列表
                if (list[i].id == ids[j].id) {
                  //如果列表中的数据在选中de列表中，则删除显示数据
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
    //批量上下架
    Enable: function(num) {
      let list = this.newList; //显示的
      let ids = this.selectIds; //选中的
      let title = "确认要启用吗？"; //启用提示
      if (num == 0) {
        title = "确认要禁用吗？"; //判断禁用提示
      }
      if (ids.length > 0) {
        //有选中的就执行
        this.$Modal.confirm({
          title: title,
          onOk() {
            //开始启用禁用
            for (let i = 0; i < list.length; i++) {
              //循环显示列表
              for (let j = 0; j < ids.length; j++) {
                //循环选中的列表
                if (list[i].id == ids[j].id) {
                  //如果显示列表中的数据在选中的列表中，执行操作
                  if (num == 1) {
                    console.log("启用[" + i + "]:" + list[i].id);
                    list[i].isEnable = 1; //启用
                  } else {
                    console.log("禁用[" + i + "]:" + list[i].id);
                    list[i].isEnable = 0; //禁用
                  }
                }
              }
            }
          }
        });
      } else {
        alert("未选中要上下架的数据！"); //没有勾选，点击上下架数据给出提示
      }
    },
    //删除用户时，通过splice(index, 1)，可以删除index位置的数据，页面上的数据自动就会更新
    remove(index) {
      this.newList.splice(index, 1);
    },
    addedit(item, index) {
      this.addNumber = true;

      this.Title = "添加成员";

      this.itemIndex = index;

      this.Validate = JSON.parse(JSON.stringify(item));
    }
  }
};
</script>
<style lang="less" scoped>
.plxj {
  margin-left: 0.4rem;
}
</style>
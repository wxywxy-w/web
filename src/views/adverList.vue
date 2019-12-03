<!--广告列表-->
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
        <div class="PX">
          <span>内容分类</span>
          <Select v-model="queryType" style="width:200px;margin-left:20px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            <!-- <p>{{contentCategory}}</p> -->
          </Select>
        </div>
      </div>
      <div class="selectGroup">
        <div class="btn">
          <Button type="primary" @click="upDown(1)" ghost class="plsj">批量上架</Button>
          <Button type="primary" @click="upDown(0)" ghost class="plxj">批量下架</Button>
          <Button type="primary" @click="removeBatch()" ghost class="plsc">批量删除</Button>
        </div>
        <div class="tjnr">
          <i-button @click="addbanner">发布banner</i-button>
          <i-col span="6">
            <Cascader :data="createTime" placeholder="时间由远到近" style="width:150px;margin-left:10px;"></Cascader>
          </i-col>
        </div>
      </div>
    </Card>

    <div>
      <Table ref="selection" @on-selection-change="selectList" :columns="columns4" :data="newList"></Table>
      <Page :total="200" show-elevator style="text-align: center;margin-top: 50px;" />
    </div>

    <!--发布banner-->
    <Modal
      :title="Title"
      v-model="handle_Modal"
      :footer-hide="true"
      :mask-closable="false"
      @on-visible-change="handleReset('Validate')"
    >
      <Form ref="Validate" :model="Validate" :rules="ruleValidate" :label-width="120">
        <FormItem label="上架版本:" prop="cardstate">
          <input style="width: 200px;margin-left: 1.3rem;" readonly="readonly" type="text" value="1.3.4">
        </FormItem>
        <FormItem label="banner分类:" prop="content">
          <!-- <Input v-model="formValidate.content" placeholder="banner"></Input> -->
          <Select v-model="queryType" placeholder="banner" style="width:200px;margin-left:20px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>

        <FormItem label="banner名称:" prop="cardstate">
          <Input style="width: 200px;margin-left: 1.3rem;"></Input>
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

        <FormItem label="跳转方式:" prop="content">
          <Select v-model="queryType" placeholder="banner" style="width:200px;margin-left:20px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>

        <FormItem label="跳转地址:" prop="cardstate">
          <RadioGroup  @on-change='selectURL' v-model="phone">
            <Radio label="商品"></Radio>
            <Radio label="URL链接"></Radio>
          </RadioGroup>
        </FormItem>

        <FormItem label="目标内容:" prop="cardstate">
          <Input style="width: 200px;margin-left: 1.3rem;"></Input>
        </FormItem>
        <template>
          <FormItem v-show="inputURL" label="过滤参数:" prop="cardstate">
              <Input style="width: 200px;margin-left: 1.3rem;"></Input>
          </FormItem>
          <FormItem v-show="inputURL" label="额外参数:" prop="cardstate">
              <Input style="width: 200px;margin-left: 1.3rem;"></Input>
          </FormItem>
          <FormItem v-show="inputURL" label="额外url:" prop="cardstate">
              <Input style="width: 200px;margin-left: 1.3rem;"></Input>
          </FormItem>
        </template>

        <FormItem style="display: flex;justify-content: flex-end;">
          <Button @click="handle_Modal=false" style="margin-right: 8px">取消</Button>
          <Button type="primary" @click="handleSubmit('Validate')">确认</Button>
        </FormItem>
      </Form>
    </Modal>

    <Modal
      :title="modalTitle"
      v-model="handleModal"
      :footer-hide="true"
      :mask-closable="false"
      @on-visible-change="handleReset('formValidate')"
    >
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <FormItem label="banner分类:" prop="content">
          <Select v-model="queryType" placeholder="banner" style="width:200px;margin-left:20px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>

        <FormItem label="banner名称:" prop="cardstate">
          <Input style="width: 200px;margin-left: 1.3rem;" placeholder="banner名称"></Input>
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

        <FormItem label="跳转方式:" prop="content">
          <Select v-model="queryType" placeholder="banner" style="width:200px;margin-left:20px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>

        <FormItem label="跳转地址:" prop="cardstate">

          <RadioGroup @on-change='selectURL' v-model="phone">
            <Radio label="商品"></Radio>
            <Radio label="URL链接"></Radio>
          </RadioGroup>
          <span v-text="phone"></span>
        </FormItem>

        <FormItem label="目标内容:" prop="cardstate">
          <Input style="width: 200px;margin-left: 1.3rem;" placeholder="12345678912"></Input>
        </FormItem>

        <FormItem style="display: flex;justify-content: flex-end;">
          <Button @click="handleModal=false" style="margin-right: 8px">取消</Button>
          <Button type="primary" @click="handleSubmit('formValidate')">确认</Button>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import { formatDate } from "@/views/common/date.js";
import { bannerList,deleteBanner } from "@/api/index.js";

export default {
  data() {
    return {
      phone: "商品",
      inputURL:false,
      sels: [], //选中显示的值
      disabled: true,
      datalist: [], //初始列表，保存请求后台得来的数据
      newList: [], //显示到表格中的列表，查询会修改这个列表
      selectIds: [], //选中的id
      queryType: "", //查询类型
      queryInput: "", //查询输入
      createTime: [
        {
          value: "0",
          label: "由远到近"
        },
        {
          value: "1",
          label: "由近到远"
        }
      ],

      //   modal3: false,
      //   contentCategory: "",
      //[(page = ""), (pageSize = ""), (plateld = 5), (optld = 563)]

      datalist: [], //初始列表，保存请求后台得来的数据
      newList: [], //显示到表格中的列表，查询会修改这个列表

      queryType: "", //查询类型
      queryInput: "", //查询输入

      cityList: [
        // {
        //   value: "0",
        //   label: "全部"
        // },
        {
          value: "1",
          label: "商品详情"
        },
        {
          value: "2",
          label: "顶部图片"
        },
        {
          value: "3",
          label: "单列商品"
        },
        {
          value: "4",
          label: "快速分享"
        },
        {
          value: "5",
          label: "自己的H5"
        },
        {
          value: "6",
          label: "第三方H5"
        },
        {
          value: "7",
          label: "加油页面"
        },
        {
          value: "8",
          label: "标签列表"
        }
      ],
      handleModal: false,

      modalTitle: "",
      handle_Modal: false,

      Title: "",
      Validate: {
        name: "",

        carNumber: ""
      },
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
        ],

        carNumber: [
          {
            required: true,

            message: "内容分类不能为空",

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
          title: "编号",
          width:80,
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
          title: "banner图片",
          key: "picUrl",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("img", {
                props: {
                  type: "primary",
                  size: "small"
                },
                attrs: {
                  src: params.row.picUrl,
                  style: "width: 40px;height: 40px;"
                }
              })
            ]);
          }
        },
        {
          title: "banner名称",
          key: "name",
          align: "center"
        },
        {
          title: "板块分类",
          key: "jumpType",
          render: (h, params) => {
            return h("span", this.cityList[params.row.jumpType].label);
          }
        },
        {
          title: "排序值",
          key: "orderIndex",
          // render: (h, params) => {
          //   return h("span", this.cityList[params.row.jumpType].label);
          // }
        },
        {
          title: "发布时间",
          key: "creatTime",
          render: (h, params) => {
            return h(
              "span",
              formatDate(new Date(params.row.creatTime), "yyyy-MM-dd")
            );
          }
        },
        {
          title: "上下架",
          key: "isShelf",
          align: "center",
          render: (h, params) =>
            h("i-switch", {
              props: {
                type: "primary",
                value: params.row.isShelf === 1
              },
              on: {
                "on-change": value => {
                  this.switch(params.index);
                }
              }
            })
        },
        {
          title: "更新时间",
          key: "updateTime",
          render: (h, params) => {
            return h(
              "span",
              formatDate(new Date(params.row.updateTime), "yyyy-MM-dd")
            );
          }
        },
        // {
        //   title: "关联内容",
        //   key: "linkUrl",
        //   width:240,
        //   align: "center"
        // },
        {
          title:"额外链接",
          key:'linkUrl',
          width:240,
          aligin:'center',
          // render:(h,params)=>
          // h(
            // "a"
            // {
              // style:{
              //   color:red
              // },
              // on:{
              //   chick:()=>{
              //     alert('1')
              //   }
              // }
            // }
          // )
        },
        // {
        //   title:"关联内容",
        //   key:'linkUrl',
        //   render:(h,params)=>{
        //    return h('a', {
        //     attrs:{
        //       href:params.row.linkUrl,
        //     },
        //     props: {
        //       type: 'info',
        //       size: 'small',
        //     },
        //      style: {
        //        width:'20px',
        //        marginRight: '5px',
        //        marginBottom: '5px',
        //        backgroundColor:'#f39800',
        //        color:'#fff',
        //        padding:'4.5px',
        //        borderRadius: '10%',
        //        marginTop:'0px',
        //        border:'1px solid #f39800'
        //      },
        //      on: {
        //        click: () => {
        //          this.daochu(params.row);
        //        }
        //      }
        //     } )
        //   }

        // },
        {
          title: "操作",
          key: "action",
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
                    display: "flow-root",
                  },
                  on: {
                    click: () => {
                      this.editBus(params.row, params.index);
                    }
                  }
                },
                "编辑"
              ),
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
                      let that=this
                        this.$Modal.confirm({
                              title:"你确定要删除id:"+params.row.id+"吗?",
                              // title:"你确定要删除id:吗?",
    													cancelText:'取消',
                              okText:'确认',
                              onOk:function(){
                                  that.remove(params.index,params.row.id);
                              }
                            }
                          );
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        },
        {
          title: "发布账号",
          key: "adminId"
        }
      ]
    };
  },
  components: {},
  props: {},
  computed: {},
  watch: {},
  methods: {
    selectURL(){
      if(this.phone=='URL链接'){
        this.inputURL=true
      }else{
        this.inputURL=false
        console.log('11')
      }
      // alert("1")
    },
    //选中事件触发此方法
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
    //批量删除
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
    //批量上下架
    //批量上架下架
    upDown: function(num) {
      let list = this.newList; //显示的
      let ids = this.selectIds; //选中的
      let title = "确认要上架吗？"; //标题
      if (num == 0) {
        title = "确认要下架吗？"; //判断标题
      }
      if (ids.length > 0) {
        //有选中的才执行删除
        this.$Modal.confirm({
          title: title,
          onOk() {
            //开始上下架
            for (let i = 0; i < list.length; i++) {
              //循环显示列表
              for (let j = 0; j < ids.length; j++) {
                //循环选中列表
                if (list[i].id == ids[j].id) {
                  //如果显示列表中的数据 在 选中列表中，执行操作
                  if (num == 1) {
                    //上架
                    console.log("上架[" + i + "]:" + list[i].id);
                    list[i].isUpShelf = 1; //上架
                  } else { 
                    //下架
                    console.log("下架[" + i + "]:" + list[i].id);
                    list[i].isUpShelf = 0; //下架
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
      this.modalTitle = "添加banner";
      this.itemIndex = index;
      this.formValidate = JSON.parse(JSON.stringify(item));
    },
    addbanner(item, index) { 
      this.handle_Modal = true;
      this.Title = "添加banner";
      this.itemIndex = index;
      this.Validate = JSON.parse(JSON.stringify(item));
    },

    remove(index,id) {
      // alert(id)
      this.datalist.splice(id, 1);
      deleteBanner({
        method:'post',
        data:id,
        qs:true
      }).then(res=>{
        console.log(res)
        this.$Notice.open({
                title:res.message
        });
      }).catch(error=>{
        console.log(error)
      })
      // this.$Modal.info({
      //   content: `你确定要删除id{{id}}吗?`
      // });
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
          self.handle_Modal = false;
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
    this.axios
      .get("/backstage/banner/auth/getList",{
        params:{
          // verCode:'',//版本类型,不填获取全部版本
          // plateId:'2',//	不填获取全部版块版块id()版块id(1.首页10个模块，2banner,3:中间广告位。101：\h5的首页banner)
        }
      })
      .then(data => {
        //原来的请求
        console.log(data)
        this.datalist = data.data.data;
        this.newList = this.datalist;
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
  .tjnr .ivu-col{
    width:11%
  }
  // .ivu-menu-item-active{
  //   width: 100%;
  //   height: 100%;
  // }
}
</style>
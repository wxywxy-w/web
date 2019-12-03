<!--推广内容-->
<template>
  <!-- enter-button="查询" -->
  <div class="about">
    {{$store.state.session}}
    <Card style="width:100%;margin-top:0px" :bordered="false" class="contentlist">
      <h2 slot="title" style="font-size:22px;color:rgba(23,35,61,1);">数据列表</h2>
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
          <Button :to="{path:'/1_2'}" style="margin-right: 1.0rem;">添加内容</Button>
          <Col span="6">
            <Select v-model="sortTime" @on-change="switchTime">
              <Option
                v-for="item in createTime"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </Col>
        </div>
      </div>
    </Card>

    <div>
      <Table
        ref="selection"
        @on-selection-change="selectList"
        class="table"
        :columns="columns4"
        :data="newList"
      ></Table>
      <Page
        :total="pages.total"
        :current="pages.index"
        :page-size="pages.size"
        @on-change="pageChange"
        @on-page-size-change="pSizeChange"
        show-elevator
        style="text-align: center;margin-top: 50px;"
      />
    </div>
    <!--确认是否批量删除-->
    <Modal
      v-model="del_handleModal"
      :footer-hide="true"
      :mask-closable="false"
      @on-visible-change="del_handleReset('del_formValidate')"
    >
      <Form ref="del_formValidate" :model="del_formValidate">
        <FormItem style="display: flex;justify-content: center;">
          <div>确认删除选中的文件吗?</div>
          <Button
            class="btn_css"
            @click="del_handleReset('del_formValidate')"
            style="margin-right: 8px"
          >取消</Button>
          <Button class="btn_css" type="primary" @click="handleSubmit('del_formValidate')">确认</Button>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import { formatDate } from "@/views/common/date.js";
import { community } from "@/api/index.js";
import { deleteComm } from "@/api/index.js";
import { toContent } from "@/api/index.js";
export default {
  data() {
    return {
      //
      pages: {
        index: 1, // 默认当前值
        size: 9, // 默认个数
        total: 100 // 总数
      },
      selectListItem:[],
      deleteId:[],
      idss:'',//装选择好了的id wwwwwwwwwwwwwwwwww
      to: {
        path: "/1_2"
      },
      sels: [], // 选中显示的值
      disabled: true,
      datalist: [], // 初始列表，保存请求后台得来的数据
      newList: [], // 显示到表格中的列表，查询会修改这个列表
      selectIds: [], // 选中的id
      queryType: "", // 查询类型
      queryInput: "", // 查询输入
      sortTime: "", // 时间排序

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
      del_handleModal: false,

      // data1: [],
      del_formValidate: {},

      modal1: false,
      columns4: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "编号",
          key: "id",
          //   sortType: "asc",
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
          title: "内容",
          key: "jsonText",
          align: "center",
          render: (h, params) => {
            let a = JSON.parse(params.row.jsonText); // 将json字符串转换成json对象
            // console.log(a);
            return h(
              "span",
              {
                style: {
                  display: "inline-block",
                  width: params.column._width * 0.9 + "px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                }
              },
              a.shareText
            );
          }
        },
        {
          title: "内容类别",
          key: "type",
          render: (h, params) => {
            return h("span", this.cityList[params.row.type].label);
          }
        },
        {
          title: "发布时间",
          // key: "createTime",
          //   sortable: true,
          render: (h, params) => {
            return h(
              "span",
              formatDate(new Date(params.row.createTime), "yyyy-MM-dd")
            );
          }
        },
        {
          title: "上下架",
          key: "isUpShelf",
          align: "center",
          render: (h, params) =>
            h("i-switch", {
              props: {
                type: "primary",
                value: params.row.isUpShelf === 1
                // "true-value": "1",
                // "false-value": "0"
              },
              on: {
                "on-change": value => {
                  //   console.log("isUpShelf:" + params.row.isUpShelf);
                  this.switch(params.row.id,params.row.isUpShelf);
                  //   params.row.isUpShelf = true - value;
                }
              }
            })
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
                    type: "error",
                    size: "small"
                  },
                  style: {
                    display: "flow-root"
                  },
                  on: {
                    click: () => {
                      this.remove(params.row.id);
                      //   confirm("你确定要删除吗?");
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
    pageChange(i) {
      // this.axios
      // .get("/backstage/community/auth/getList", {
      //   params: {
      //     page: this.pages.index,
      //     pageSize: this.pages.size
      //   }
      // })
      // .then(data => {
      //   console.log(data.data.data);
      //   this.datalist = data.data.data;
      //   this.newList = this.datalist;
      // });
      ////////////////////
      console.log(i);
      this.pages.index = i;
      // console.log(this.pages.index);
      // toContent({
      //   method:'get',
      //   data:{
      //       page: this.pages.index,
      //       pageSize: this.pages.size
      //   }
      // }).then(data=>{
      //     console.log(data.data);
      //     this.datalist = data.data.data;
      //     this.newList = this.datalist;
      // })
      this.axios
        .get("/backstage/community/auth/getList", {
          params: {
            page: this.pages.index,
            pageSize: this.pages.size
          }
        })
        .then(data => { 
          console.log(data.data);
          this.datalist = data.data.data;
          this.newList = this.datalist;
        });
    },
    pSizeChange(s) {
      // window.history.go(-1)
      console.log(2 + s);
      this.pages.size = s;
    },
    //上下架
    switch(id,isUpShelf){
      //   document.getElementsByClassName("ivu-table-cell-sort")[0].click();
      //isUpShelf	是否上架 0.否 1.是

      let newisUpShelf
      //isUpShelf
      console.log(id,isUpShelf)
      if(isUpShelf==1){
        // isUpShelf==0;
        newisUpShelf=0
      }else if(isUpShelf==0){
        newisUpShelf=1
      }
      console.log(id,newisUpShelf)
      community({
          method:"post",
          data:{
            isUpShelf:newisUpShelf,
            ids:id,
          },
          qs:true
        }).then(res=>{
          console.log(res)
          this.$Notice.open({
              title: res.message,
          });
          this.$router.replace({
            path: '/refresh',
            query: {
              t: Date.now()
            }
          })
        })
    },
    // 根据选择的时间排序方式排序
    switchTime() {
      //   document.getElementsByClassName("ivu-table-cell-sort")[0].click();
      let list = this.newList; // 显示的列表
      let sort = this.sortTime; // 选中的排序方式，0升序由远到近，1降序由近到远
      if (sort == 0) {
        // 升序
        for (let i = 0; i < list.length; i++) {
          // 外层循环每一次找到一个最大值
          for (let j = 0; j < list.length - i - 1; j++) {
            // 内层循环控制比较的次数，并且判断两个数的大小
            console.log(
              "升序[" +
                j +
                "]" +
                list[j].createTime +
                "/" +
                list[j + 1].createTime
            );
            if (list[j].createTime > list[j + 1].createTime) {
              // 排序
              let temp = list[j];
              list[j] = list[j + 1];
              list[j + 1] = temp;
            }
          }
        }
      } else {
        // 降序
        for (let i = 0; i < list.length; i++) {
          // 外层
          for (let j = 0; j < list.length - i - 1; j++) {
            // 内层
            console.log(
              "降序[" +
                j +
                "]" +
                list[j].createTime +
                "/" +
                list[j + 1].createTime
            );
            if (list[j].createTime < list[j + 1].createTime) {
              // 排序
              let temp = list[j];
              list[j] = list[j + 1];
              list[j + 1] = temp;
            }
          }
        }
      }
      list.splice(0, 0);
      // 冒泡排序测试用
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
    // 选中事件触发此方法 wwwwwwwwwwwwwwww
    selectList(val) {
      // console.log(val)
      this.selectListItem=val
      let idss=[]
      this.selectListItem.map((item)=>{
        idss.push(item.id)
      })
      // b = a.join("-");
      this.idss=idss.join(",")
      // this.idss=idss
      console.log(this.idss)
      console.log(11111111111)
      // let selection = this.$refs.selection.getSelection(); // 获取当前选中的
      // console.log(selection);
      // if (selection.length > 0) {
      //   // 如果有选中的就保存选中数据
      //   this.selectIds = selection;
      // } else {
      //   this.selectIds = []; // 没有选中就清空上一次保存的数据
      // }
    },
    // 批量删除
    removeBatch: function() {
      if(!this.idss){
        alert("¿¿¿¿¿")
        return
      }
      deleteComm({
        method:"post",
        data:{
          ids:this.idss
        },
        qs:true
      }).then(res=>{
        console.log(res)
        this.$Notice.open({
              title: res.message,
        });
        this.$router.replace({
          path:'/refresh',
          query:{
            t: Date.now()
          }
        })
      })
    },
        //删除
    remove(id) {
      console.log(id)
      let router=this.$router
      this.$Modal.confirm({
        title: `你确定要删除吗?`,
        onOk() {
          deleteComm({
            method:"post",
            data:{
              ids:id
            },
            qs:true
          }).then(res=>{
            console.log(res)
            this.$Notice.open({
              title: res.message,
          });
            router.replace({
              path:'/refresh',
              query:{
                t: Date.now()
              }
            })
          })
          // this.datalist.splice(index, 1);
        }
      });
      // this.datalist.splice(index, 1);

      // this.$Modal.confirm({
      //   title: `你确定要删除吗?`,
      //   onOk() {
      //     this.datalist.splice(index, 1);
      //   }
      // });
      // this.datalist.splice(index, 1);
    },
    // 批量上下架
    upDown: function(num) {
      //isUpShelf	是否上架 0.否 1.是

      //要上架
      if(!this.idss){
        alert("???")
        return
      }
      else if(num==1){

        community({
          method:"post",
          data:{
            isUpShelf:1,
            ids:this.idss,
          },
          qs:true
        }).then(res=>{
          console.log(res)
           this.$Notice.open({
              title: res.message,
          });
          this.$router.replace({
            path: '/refresh',
            query: {
              t: Date.now()
            }
          })
        })
      }else if(num==0){
        community({
          method:"post",
          data:{
            isUpShelf:0,
            ids:this.idss,
          },
          qs:true
        }).then(res=>{
          console.log(res)
          this.$Notice.open({
              title: res.message,
          });
          this.$router.replace({
            path: '/refresh',
            query: {
              t: Date.now()
            }
          })
        })
      }
    },

    search() {
      var type = this.queryType; // 查询的类型
      var input = this.queryInput; // 查询的类型
      let len = this.datalist; // 初始数据列表
      var arr = []; // 缓存查到的数据

      if (type != "" && input != "") {
        // 两个条件都有
        console.log("--ti查询类型：" + type + "---查询输入：" + input);
        for (var i in len) {
          // 循环初始数据
          let a = JSON.parse(JSON.stringify(len[i]));
          var shareText = JSON.parse(a.jsonText).shareText; // 获取内容
          if (
            (type == 0 || len[i].type == type) &&
            shareText.indexOf(input) != -1
          ) {
            arr.push(len[i]);
          }
        }
      } else if (type != "" && input == "") {
        // 类型不空，输入空
        console.log("--t查询类型：" + type + "---查询输入：" + input);
        for (var i in len) {
          // 循环初始数据
          if (len[i].type == type || type == 0) {
            arr.push(len[i]);
          }
        }
      } else if (type == "" && input != "") {
        // 类型空，输入不空
        console.log("--i查询类型：" + type + "---查询输入：" + input);
        for (var i in len) {
          // 循环初始数据

          let a = JSON.parse(JSON.stringify(len[i]));
          //   console.log("--i查询：" + a);
          var shareText = JSON.parse(a.jsonText).shareText; // 获取字段内容
          //
          if (shareText.indexOf(input) != -1) {
            arr.push(len[i]);
          }
        }
      } else {
        // 两个条件都没有
        this.newList = this.datalist;
        return;
      }
      this.newList = arr; // 将查到的数据放到要显示的列表
    },

    //b编辑推广内容列表
    toComeditor(row) {
      console.log("发送：" + row);
      this.$router.push({
        path: "/1_1_1",
        name: "contenteditor",
        params: row
      });
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
  },
  mounted() {
      // toContent({
      //   method:'get',
      //   data:{
      //       page: this.pages.index,
      //       pageSize: this.pages.size
      //   }
      // }).then(data=>{
      //     console.log(data.data);
      //     this.datalist = data.data;
      //     this.newList = this.datalist;
      // }).catch(error=>{
      //   console.log(error+'错误新信息')
      // })

    this.axios
      .get("/backstage/community/auth/getList", {
        params: {
          page: this.pages.index,
          pageSize: this.pages.sizes
        }
      })
      .then(data => {
        console.log(data.data.data);
        this.datalist = data.data.data;
        this.newList = this.datalist;
      });
  },
  handleSelectAll(status) {
    this.$refs.selection.selectAll(status);
  },
  handleSelectRow(selection, index) {
    // console.log(this.$refs.selection.getSelection());
  },
  created() {
    // select中初始化会是空白的，默认选中就无法实现
    this.sortTime = this.createTime[0].value; // 时间选择默认第一个
  }
  //   mounted() {},
  //   destroyed() {}
};
</script>

<style scoped lang='less'>
.about {
  .table table {
    // table-layout: auto;
    width: 100% !important;
  }
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

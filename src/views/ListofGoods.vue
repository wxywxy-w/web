<!--商品列表 goodsThumbnailUrl-->
<template>
  <!-- enter-button="查询" -->
  <div class="ListofGoods">
    <Card style="width:100%;margin-top:23px" :bordered="false" class="contentlist">
      <p slot="title" style="font-size:22px;color:rgba(23,35,61,1);">数据列表</p>
      <div class="SRK_a">
        <div class="SRK">
          <Input slot="extra" class="search" placeholder="请输入banner名称" style="width:300px" />
          <Button type="primary" @click="search" style="margin-left: 0.6rem;">查询</Button>
        </div>
      </div>
      <div class="selectGroup">
        <div class="btn">
          <Button type="primary" @click="upDown(1)" ghost class="plsj">批量上架</Button>
          <Button type="primary" @click="upDown(0)" ghost class="plxj">批量下架</Button>
          <Button type="primary" @click="removeBatch()" ghost class="plsc">批量删除</Button>
        </div>
        <div class="tjnr">
          <Button :to="{path:'/3_1_2'}" type="updata" @click="handleUpdate()">商品批量修改</Button>
          <!-- <i-col span="6">
            <Cascader :data="createTime" placeholder="时间有远到近" style="width:150px;margin-left:10px;"></Cascader>
            class="ivu-icon ivu-icon-ios-checkmark"
          </i-col>-->
          <!--<Dropdown  @on-click="handleOpen" trigger="click" style="margin-left: 20px;border: 1px solid #D9D9D9;padding: 4px;border-radius: 3px;color: #515a6e">-->
            <!--<a href="javascript:void(0)" style="color: #515a6e;font-size: 12px">-->
              <!--{{timeNmae}}-->
              <!--<Icon type="ios-arrow-down"></Icon>-->
            <!--</a>-->
            <!--<DropdownMenu slot="list" >-->
              <!--<DropdownItem name="desc">时间由远到近</DropdownItem>-->
              <!--<DropdownItem name="asc">时间由近到远</DropdownItem>-->
            <!--</DropdownMenu>-->
          <!--</Dropdown>-->
          <!--<Button @click="timeSorting()">时间由远到近</Button>-->
        </div>
      </div>
    </Card>
    <div>
      <Table
        ref="selection"
        width="752px"
        @on-selection-change="selectList"
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
  </div>
</template>
<script>
  import {goodsBank,shelves,del} from '@/api/LibraryGoods.js'
export default {
  data() {
    return {
      // timeNmae:'时间由远到近',
      pages: {
        index: 1, //默认当前值
        size: 7, //默认个数
        total: 100 //总数
      },
      to: {
        path: "/3_1_2"
      },
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
      newList: [],
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

      data1: [],

      companyName: "",

      formValidate: {
        name: "",

        carNumber: ""
      },

      ruleValidate: {
        name: [
          {
            required: true,

            message: "企业名称不能为空",

            trigger: "blur"
          }
        ],

        carNumber: [
          {
            required: true,

            message: "车牌号码不能为空",

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
          key: "id",
          align: "center",
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
          title: "商品图片",
          key: "goodsThumbnailUrl",
          // align: "center",
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
                    src: params.row.goodsThumbnailUrl,
                    style: "width: 40px;height: 40px;"
                  },
                  style: {}
                })
              ]
            );
          }
        },
        {
          title: "商品名称",
          key: "goodsName",
          ellipsis: true,
          width: "120",
          align: "center"
        },
        {
          title: "原价/折扣价",
          //   key: "minNormalPrice",
          render: (h, params) => {
            return h("div", [
              h("p", `折扣价¥` + params.row.minGroupPrice / 100),
              h("p", `原价¥` + params.row.minNormalPrice / 100)
            ]);
          }
        },
        {
          title: "上下架",
          key: "isShelves",
          align: "center",
          render: (h, params) =>
            h("i-switch", {
              props: {
                type: "primary",
                value: params.row.isShelves === 1
              },
              on: {
                "on-change": value => {
                  this.switch(params.index,params);
                }
              }
            })
        },
        {
          title: "补贴金额",
          key: "promotionRate",
          align: "center",
          render: (h, params) => {
            return h("div", [h("p", +params.row.promotionRate / 100)]);
          }
        },
        {
          title: "库存",
          key: "stock",
          align: "center"
        },
        {
          title: "平台类型",
          key: "platformType",
          align: "center",
          render: (h, params) => {
            let texts = "";
            if (params.row.platformType === 0) {
              texts = "淘宝";
            } else if (params.row.platformType === 1) {
              texts = "天猫";
            } else if (params.row.platformType === 2) {
              texts = "拼多多";
            } else if (params.row.platformType === 3) {
              texts = "自营";
            }
            return h(
              "div",
              {
                props: {}
              },
              texts
            );
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
                      this.toComeditor(params.row);
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
                      this.remove(params.index,params);
                      //   confirm("你确定要删除吗?");
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data1: [
        {
          id: "",
          goodsImageUrl: "",
          goodsName: "",
          minNormalPrice: "",
          isShelves: "",
          promotionRate: "",
          stock: "",
          platformType: "",
          action: ""
        },
      ]
    };
  },
    
  components: {},
  props: {},
  computed: {},
  watch: {},
  methods: {
      //单个上架下架商品
	  switch(index,params){
	  	console.log(params.row.id)
	  	console.log(params.row.isShelves)

          let data = {
	          ids:`${params.row.id}`,
	          isShelves:''
          }
          //如果是下架状态更改为上架
          if(params.row.isShelves == 0){
	          data.isShelves = 1
	          params.row.isShelves = 1
          }else if(params.row.isShelves == 1){
	          data.isShelves = 0
	          params.row.isShelves = 0
          }

		  shelves({
			  method:"post",
			  data:data,
			  qs:true
		  })
      },
    pageChange(i) {
      this.pages.index = i;
      // console.log(this.pages.index);
      this.axios
      .get("/backstage/goodsBank/auth/getList", {
        params: {
          page: this.pages.index,
          pageSize: this.pages.size
        }
      })
      .then(data => {
        //原来的请求
        this.newList = data.data.data;
        console.log(this.newList);
      })
      .catch(function(error) {
        console.log(error);
      });
      
	    console.log("表单数据id：" + JSON.stringify(this.formValidate));
	    // goodsBank({
		  //   method: "get",
		  //   data:{
			//     page: this.pages.index,
			//     pageSize: this.pages.size
		  //   },
		  //   qs:false
	    // }).then(res=>{
		  //     console.log(res.data);
		  //     this.datalist = res.data;
		  //     this.newList = this.datalist;
	    // })
    },
    pSizeChange(s) {
      console.log(2 + s);
      this.pages.size = s;
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
          	let data = {
          		ids:[]
            }
            //开始删除
            for (let i = 0; i < list.length; i++) {
              //循环显示列表
              for (let j = 0; j < ids.length; j++) {
                //循环选中列表
                if (list[i].id == ids[j].id) {
                  //如果显示列表中的数据 在 选中列表中，则删除显示数据
                  console.log("删除[" + i + "]:" + list[i].id);

	              data.ids.push(list[i].id)
                  list.splice(i, 1); //删除

                }
              }
            }
	          data.ids = data.ids.join(',')
	          del({
	            method:"post",
	            data:data,
	            qs:true
            }).then(res=>{
            	console.log(res)
                  if(res.code == '0'){
	                  this.$Notice.success({
		                  title: '批量删除成功！',
	                  });
	                  //初始化
	                  data.ids = []
                  }else{
	                  //初始化
	                  data.ids = []
	                  this.$Notice.success({
		                  title:res.message,
	                  });
                  }


              })
          }
        });
      } else {
        alert("未选中要删除的数据！"); //没有勾选点击批量删除数据给出提示
      }
    },
    //批量上下架
    upDown: function(num) {
      let list = this.newList; //显示的
      let ids = this.selectIds; //选中的
      let title = "确认要上架吗？"; //标题
      if (num == 0) {
        title = "确认要下架吗？"; //判断标题
      }
      if (ids.length > 0) {
        //有选中的才执行删除没有改
        this.$Modal.confirm({
          title: title,
          onOk() {
          	// 请求数据
              let data = {
              	ids:[],
                isShelves:''
              }
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
	                  data.ids.push(list[i].id)
	                  data.isShelves = 1
                    list[i].isShelves = 1; //上架
                  } else {
                    //下架
	                  data.ids.push(list[i].id)
	                  data.isShelves = 0
	                  console.log("下架[" + i + "]:" + list[i].id);
                    list[i].isShelves = 0; //下架

                  }
                }
              }
            }
	          data.ids = data.ids.join(',')
	          shelves({
		        method:"post",
                data:data,
                qs:true
              }).then(res=>{
              	if(data.isShelves == 0){
	                if(res.code == '0'){
		                this.$Notice.success({
			                title: '商品已批量下架',
		                });
		                //初始化
		                data.ids = []
	                }else{
		                //初始化
		                data.ids = []
		                this.$Notice.success({
			                title:res.message,
		                });
	                }
                }else if(data.isShelves == 1){
	                if(res.code == '0'){
		                this.$Notice.success({
			                title: '商品已批量上架',
		                });
		                //初始化
		                data.ids = []
	                }else{
		                //初始化
		                data.ids = []
		                this.$Notice.success({
			                title:res.message,
		                });
	                }
                }

              })
          }
        });
      } else {
        alert("未选中要上下架的数据！"); //没有勾选，点击上下架数据给出提示
      }
    },

    search() {
      var len = this.newList;
      var arr = [];
      for (var i in len) {
        if (len[i].name == this.companyName) {
          arr.push(len[i]);
        } else if (this.companyName == "") {
          this.newList = this.newList;
          return;
        }
      }

      this.newList = arr;
    },

    //编辑商品列表
    toComeditor(row) {
      // row=JSON.stringify(row)
      console.log(row);//发送
      // console.log(typeof(row));//发送
      alert("1")
      this.$store.commit('commitMedium', row)
      this.$router.push({
        path: "/3_1_1",
        name: "comeditor",
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
    },
    //删除用户时，通过splice(index, 1)，可以删除index位置的数据，页面上的数据自动就会更新
    remove(index,params) {
        let data = {
        	ids:`${params.row.id}`
        }
	    del({
		    method:"post",
		    data:data,
		    qs:true
	    }).then(res=>{
            if(res.code == '0'){
	            this.$Notice.success({
		            title: '删除成功！',
	            });
            }
        })
      this.newList.splice(index, 1);

    }
  },

  mounted() {
    // this.data1 = this.data1;
    this.axios
      .get("/backstage/goodsBank/auth/getList", {
        params: {
          page: this.pages.index,
          pageSize: this.pages.size
        }
      })
      .then(data => {
        //原来的请求
        this.newList = data.data.data;
        console.log(this.newList);
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
}
</style>

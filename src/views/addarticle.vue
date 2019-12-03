<!--添加文章-->
<template>
  <div class="adverList">
    <div>
      <Card style="width:100%;margin-top:23px" :bordered="false" class="contentlist">
        <p slot="title" style="font-size:22px;color:rgba(23,35,61,1);">添加内容信息</p>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <FormItem label="选择分类" prop="name">
            <Select v-model="queryType" style="width:200px;margin-left:20px">
              <Option
                v-for="item in cityList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
              <!-- <p>{{contentCategory}}</p> -->
            </Select>
          </FormItem>
          <FormItem label="文章类别" prop="name">
            <Select v-model="queryType" style="width:200px;margin-left:20px">
              <Option
                v-for="item in city1List"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
              <!-- <p>{{contentCategory}}</p> -->
            </Select>
          </FormItem>
          <FormItem label="标签内容" prop="name">
            <i-button>必看</i-button>
            <i-button style="margin-left: 1.3rem;">经验</i-button>
            <i-button style="margin-left: 1.3rem;">进阶</i-button>
            <i-button style="margin-left: 1.3rem;">地推</i-button>
          </FormItem>
          <FormItem label="主标题" prop="name">
            <Input v-model="formValidate.name" placeholder="请输入标题内容"></Input>
          </FormItem>
          <FormItem label="副标题" prop="name">
            <Input v-model="formValidate.name" placeholder="请输入副标题内容"></Input>
          </FormItem>
          <FormItem label="添加主图" prop="name">
            <p>建议尺寸148*148px</p>
            <div style="display:flex;flex-wrap:wrap;">
              <Upload
                style="margin-right:30px;width:168px;height:168px;"
                multiple
                type="drag"
                action="//jsonplaceholder.typicode.com/posts/"
              >
                <div style="padding: 20px 0">
                  <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                  <p>点击或拖拽上传</p>
                </div>
              </Upload>
            </div>
          </FormItem>
          <FormItem label="编辑内容" prop="name">
            <Input v-model="value6" type="textarea" :rows="4" placeholder="请输入合适的商品文案" />
          </FormItem>
        </Form>
        <i-button
          type="primary"
          style="width:200px;display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 18.5rem;"
          @click="handleSubmit('formValidate')"
        >提交</i-button>
      </Card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      datalist: [],
      cityList: [
        {
          value: "0",
          label: "每日爆款"
        },
        {
          value: "1",
          label: "朋友圈"
        },
        {
          value: "2",
          label: "文章"
        }
      ],
      city1List: [
        {
          value: "0",
          label: "淘宝天猫"
        },
        {
          value: "1",
          label: "自营"
        },
        {
          value: "2",
          label: "拼多多"
        }
      ],
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
          title: "库存数量",
          key: "stock",
          align: "center"
        },
        {
          title: "原价",
          key: "minNormalPrice",
          align: "center"
        },
        {
          title: "折扣价",
          key: "minGroupPrice",
          align: "center"
        },
        {
          title: "补贴金额",
          key: "promotionRate",
          align: "center"
        }
      ],
      data1: [
        {
          stock: "",
          minNormalPrice: "",
          minGroupPrice: "",
          promotionRate: ""
        }
      ],
      ruleValidate: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        GUIGE: [
          {
            required: true,
            message: "Mailbox cannot be empty",
            trigger: "blur"
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" }
        ],
        city: [
          {
            required: true,
            message: "Please select the city",
            trigger: "change"
          }
        ],
        gender: [
          { required: true, message: "Please select gender", trigger: "change" }
        ],
        interest: [
          {
            required: true,
            type: "array",
            min: 1,
            message: "Choose at least one hobby",
            trigger: "change"
          },
          {
            type: "array",
            max: 2,
            message: "Choose two hobbies at best",
            trigger: "change"
          }
        ],
        date: [
          {
            required: true,
            type: "date",
            message: "Please select the date",
            trigger: "change"
          }
        ],
        time: [
          {
            required: true,
            type: "string",
            message: "Please select time",
            trigger: "change"
          }
        ],
        desc: [
          {
            required: true,
            message: "Please enter a personal introduction",
            trigger: "blur"
          },
          {
            type: "string",
            min: 20,
            message: "Introduce no less than 20 words",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    // this.data1 = this.data1;
    this.axios
      .post("/backstage/community/auth/add", {})
      .then(data => {
        //原来的请求
        this.datalist = data.data.data;
        console.log(this.datalist);
      })
      .catch(function(error) {
        console.log(error);
      });
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



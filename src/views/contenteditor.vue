<!--内容编辑-->
<template>
  <div class="adverList">
    <div>
      <Card style="width:100%;margin-top:23px" :bordered="false" class="contentlist">
        <p slot="title" style="font-size:22px;color:rgba(23,35,61,1);">添加内容信息</p>
        <Alert v-show="isshow" type="error" show-icon closable>
          提交错误
          <span slot="desc">{{ e }}</span>
        </Alert>

        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <FormItem label="选择分类" prop="type">
            <Select v-model="showInfo.type" style="width:200px;margin-left:20px">
              <Option v-for="item in newList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem label="选择平台" prop="platformType">
            <Select
              v-model="formValidate.jsonParam.platformType"
              style="width:200px;margin-left:20px"
            >
              <Option v-for="item in numList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem label="商品ID" prop="goodsId">
            <Input v-model="formValidate.jsonParam.goodsId" placeholder="请输入商品ID"></Input>
          </FormItem>
          <FormItem label="内容文案" prop="shareText">
            <Input
              v-model="formValidate.jsonParam.shareText"
              type="textarea"
              :rows="4"
              placeholder="请输入合适的商品文案"
            />
          </FormItem>

          <FormItem label="宣传图片" prop="img">
            <p>按住ctrl可同时批量选择多张图片上传，最多可以上传9张图片，建议尺寸800*800px</p>
            <div style="display:flex;flex-wrap:wrap;">
              <Upload
                v-model="formValidate.jsonParam.customImg[0]"
                style="margin-right:30px;width:168px;height:168px;"
                multiple
                type="drag"
                action="//jsonplaceholder.typicode.com/posts/"
              >
                <div style="padding: 20px 0">
                  <Icon type="md-images" size="52" style="color: #3399ff"></Icon>
                  <p>点击或拖拽上传</p>
                </div>
              </Upload>
              <Upload
                v-model="formValidate.jsonParam.customImg[1]"
                style="margin-right:30px;width:168px;height:168px;"
                multiple
                type="drag"
                action="//jsonplaceholder.typicode.com/posts/"
              >
                <div style="padding: 20px 0">
                  <Icon type="md-images" size="52" style="color: #3399ff"></Icon>
                  <p>点击或拖拽上传</p>
                </div>
              </Upload>
              <Upload
                v-model="formValidate.jsonParam.customImg[2]"
                style="margin-right:30px;width:168px;height:168px;"
                multiple
                type="drag"
                action="//jsonplaceholder.typicode.com/posts/"
              >
                <div style="padding: 20px 0">
                  <Icon type="md-images" size="52" style="color: #3399ff"></Icon>
                  <p>点击或拖拽上传</p>
                </div>
              </Upload>
              <Upload
                v-model="formValidate.jsonParam.customImg[3]"
                style="margin-right:30px;width:168px;height:168px;"
                multiple
                type="drag"
                action="//jsonplaceholder.typicode.com/posts/"
              >
                <div style="padding: 20px 0">
                  <Icon type="md-images" size="52" style="color: #3399ff"></Icon>
                  <p>点击或拖拽上传</p>
                </div>
              </Upload>
              <Upload
                v-model="formValidate.jsonParam.customImg[4]"
                style="margin-right:30px;width:168px;height:168px;"
                multiple
                type="drag"
                action="//jsonplaceholder.typicode.com/posts/"
              >
                <div style="padding: 20px 0">
                  <Icon type="md-images" size="52" style="color: #3399ff"></Icon>
                  <p>点击或拖拽上传</p>
                </div>
              </Upload>
              <Upload
                v-model="formValidate.jsonParam.customImg[5]"
                style="margin-right:30px;width:168px;height:168px;"
                multiple
                type="drag"
                action="//jsonplaceholder.typicode.com/posts/"
              >
                <div style="padding: 20px 0">
                  <Icon type="md-images" size="52" style="color: #3399ff"></Icon>
                  <p>点击或拖拽上传</p>
                </div>
              </Upload>
            </div>
          </FormItem>
        </Form>
        <i-button
          type="primary"
          style="width:200px;display: flex;  justify-content: center;  align-items: center; margin-left: 18.5rem;"
          @click="handleSubmit('formValidate')"
        >提交</i-button>
      </Card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    let infoGet = this.$route.params; //保存数据显示
    console.log("获取参数:", infoGet);
    return {
      info: infoGet, //保存数据显示
      modal3: false,
      showInfo: {
        //存放列表显示的数据
        type: infoGet.type,
        platformType: infoGet.platformType,
        goodsId: infoGet.goodsId,
        shareText: infoGet.shareText
      },
      newList: [
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
      datalist: [],
      queryType: "",
      numList: [
        {
          value: "1",
          label: "淘宝天猫"
        },
        {
          value: "2",
          label: "拼多多"
        },
        {
          value: "3",
          label: "自营"
        }
      ],
      value6: "",
      value5: "",
      modal3: false,
      formValidate: {
        type: "1", //1.商品分享 2.元素分享 3.文章分享
        optId: "563", //分类id
        jsonParam: {
          // type 为1【goodsId/商品内容,shareText/分享内容,platformType/平台类型,customImg/图片列表（可以不传，数组类型）】
          // type 为2【shareText/分享内容,customImg/图片列表（数组类型）】
          goodsId: "",
          shareText: "",
          platformType: "0",
          customImg: [],

          title: "", // type 为3【title/文章标题，titleImg/文章主题，titleLabel/文章标签（可以不传），subTitle/副标题，htmlUrl/文章地址】
          titleImg: "",
          titleLabel: "",
          subTitle: "",
          htmlUrl: ""
        }
      },
      ruleValidate: {
        //表单校验规则
        type: [
          //每个属性名 是 prop 的值
          {
            required: true,
            message: "请选择类型",
            trigger: "change"
          }
        ],
        jsonParam: {
          platformType: [
            {
              required: true,
              message: "请选择平台",
              trigger: "change"
            }
          ],
          goodsId: [
            {
              required: true,
              message: "请输入编号",
              trigger: "blur"
            }
          ],
          shareText: [
            {
              required: true,
              message: "请输入内容",
              trigger: "blur"
            }
          ]
        }
      },
      e: "", //错误信息
      isshow: false
    };
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
    handleSubmit(formValidate) {
      this.$refs[formValidate].validate(valid => {
        if (valid) {
          console.log("表单数据id：" + JSON.stringify(this.formValidate));
          this.axios
            .post(
              "/backstage/community/auth/add",
              this.qs.stringify(this.formValidate)
            )
            .then(response => {
              if (response.data.success) {
                this.$Message.success("提交成功");
                this.isshow = false;
              } else {
                console.log(response.data);
                this.$Message.error(response.data.message);
              }
            })
            .catch(error => {
              this.isshow = true;
              this.$Message.error(error.data.message);
            });
        } else {
          this.$Message.error("请确认输入信息！");
        }
      });
    },
    mounted() {},
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

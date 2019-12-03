<!--添加拼多多商品-->
<template>
  <div class="together">
    <div style="border: 1px solid #CCCCCC;height:30px;padding:4px;background:rgba(251,251,251,1);">
      <span>选择平台:</span>
      <Select v-model="model" size="small" style="width:100px;margin-left:10px;margin-top:-2px;">
        <Option
          v-for="item in cityList"
          placeholder="拼多多"
          :value="item.value"
          :key="item.value"
        >{{ item.label }}</Option>
      </Select>
      <p style="margin-top:1.0rem">商品ID 请输入正确的商品ID</p>
      <i-form v-ref:form-dynamic :model="formDynamic" :label-width="80">
        <Form-item>
          <Row>
            <i-col span="18" style="width:200px;margin-top:0.5rem">
              <i-input type="text" placeholder="请输入商品ID"></i-input>
            </i-col>
            <i-col span="12">
              <i-button
                type="dashed"
                long
                @click="handleAdd"
                style="background: #808080; color:#ffffff;width:100px;margin-left:20px;"
                icon="plus-round"
              >添加</i-button>
            </i-col>
          </Row>
        </Form-item>
        <Form-item>
          <Row>
            <i-col span="18" style="width:200px;">
              <i-input type="text" :value.sync="item.value"></i-input>
            </i-col>
            <i-col span="2" offset="1">
              <i-button style="background: #808080;" type="ghost" @click="handleRemove(item)">删除</i-button>
            </i-col>
          </Row>
        </Form-item>
        <Form-item>
          <i-button
            type="primary"
            style="width:200px;margin-left: 15rem;margin-top: 15rem;"
            @click="handleSubmit('formDynamic')"
          >提交</i-button>
        </Form-item>
      </i-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formDynamic: {
        items: [
          {
            value: ""
          }
        ]
      },
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
  methods: {
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
    },
    handleAdd() {
      this.formDynamic.items.push({
        value: ""
      });
    },
    handleRemove(item) {
      this.formDynamic.items.$remove(item);
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
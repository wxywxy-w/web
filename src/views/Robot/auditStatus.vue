<template>
  <div class="auditStatus">
    <h3>数据列表</h3>
    <br />
    <div class="cont">
      <!--新增-->
      <div class="xAdd" :style="{top:top + 'px'}" v-show="addShow">
        <div class="header">
          <p>
            审核详情
            <img
              @click="addShow = false;commonly = '通过';textVal=''"
              src="@/assets/imges/off.png"
              alt
            />
          </p>
          <p>
            审核：
            <Radio-group v-model="commonly" @on-change="shenhe">
              <Radio label="通过"></Radio>
              <Radio label="不通过"></Radio>
            </Radio-group>
          </p>
          <div class="error" v-show="commonly == '不通过'">
            不通过原因：
            <textarea
              v-model="textVal"
              style="outline:none;border: 1px solid #ccc;width: 100%;height: 100px;box-sizing: border-box;padding: 10px"
              name
              id
              cols="30"
              rows="10"
            ></textarea>
          </div>
          <p style="text-align: right">
            <i-button type="dashed" @click="addShow = false;commonly = '通过';textVal=''">取消</i-button>&nbsp;&nbsp;&nbsp;
            <i-button @click="UpdataList" type="primary">确定</i-button>
          </p>
        </div>
      </div>
      <p>
        <i-input v-model="getPage.phone" placeholder="请输入手机号" style="width: 300px"></i-input>&nbsp;&nbsp;
        <i-button class="header_button" type="primary" @click="selPhone">查询</i-button>
        <Select v-model="addType" @on-change="selStatus" style="width:100px;float: right">
          <Option value="5">全部</Option>
          <Option value="1">审核中</Option>
          <Option value="2">通过审核</Option>
          <Option value="0">未审核</Option>
          <Option value="3">审核失败</Option>
        </Select>
      </p>
      <br />
      <i-table border :content="self" :columns="header" :data="data"></i-table>
    </div>
    <div class="page">
      <Page
        :total="total"
        :current="getPage.page"
        :page-size="getPage.pageSize"
        @on-change="customPage"
        show-elevator
      ></Page>
    </div>
  </div>
</template>

<script>
import { getRobotList, updateRobotManager } from "@/api/index.js";
export default {
  name: "auditStatus",
  data() {
    return {
      //审核数据ID 临时存储
      id: "",
      //不通过原因
      textVal: "",
      addShow: false,
      addType: "5",
      top: "0",
      commonly: "通过",
      //数据总数
      total: "",
      // 分页请求数据
      getPage: {
        page: 1,
        pageSize: 10,
        phone: "",
        applyStatus: ""
      },
      self: this,
      header: [
        {
          title: "手机账号",
          key: "phone"
        },
        {
          title: "联系方式",
          key: "contactInformation"
        },
        {
          title: "申请时间",
          key: "createTime"
        },
        {
          title: "审核状态",
          key: "applyStatus"
        },
        {
          title: "审核详情",
          key: "applyContent",
          width: "300",
          ellipsis: true
        },

        {
          title: "操作",
          key: "action",
          align: "center",
          width: "80",
          render: (h, params) => {
            let that = this;
            let btns = [];
            params.row.applyStatus == "未审核" &&
              btns.push(
                h(
                  "a",
                  {
                    props: {
                      size: "small"
                    },
                    style: {
                      display: "flow-root"
                    },
                    on: {
                      click: () => {
                        this.addShow = true;
                        that.top = 100 + 42 * (parseInt(params.index) + 1);
                        this.id = params.row.id;
                      }
                    }
                  },
                  "审核"
                )
              );
            btns.push(
              h(
                "a",
                {
                  props: {
                    size: "small"
                  },
                  style: {
                    display: "flow-root"
                  },
                  on: {
                    click: () => {
                      let that = this;
                      this.$Modal.confirm({
                        title: "确认删除该条内容吗",
                        cancelText: "取消",
                        okText: "确认",
                        onOk: function() {
                          that.isDelete(params.row.id, params.index);
                        }
                      });
                    }
                  }
                },
                "删除"
              )
            );
            return h("div", btns);
          }
        }
      ],
      //数据
      data: []
    };
  },
  created() {
    this.gitInit();
  },
  methods: {
    gitInit() {
      getRobotList({
        method: "get",
        data: this.getPage,
        qs: false
      }).then(res => {
        if (res.code == "0") {
          this.$Notice.success({
            title: "查询成功"
          });
          //申请状态（0：未审核，1：审核中，2：通过审核，3：审核失败）
          // private Short applyStatus;
          for (let i in res.data) {
            res.data[i].createTime = this.timeString(res.data[i].createTime);
            //平台
            switch (res.data[i].applyStatus) {
              case 0:
                res.data[i].applyStatus = "未审核";
                break;
              case 1:
                res.data[i].applyStatus = "审核中";
                break;
              case 2:
                res.data[i].applyStatus = "通过审核";
                break;
              case 3:
                res.data[i].applyStatus = "审核失败";
                break;
            }
          }
          this.total = res.count;
          this.data = res.data;
        } else {
          this.$Notice.error({
            title: "查询失败，请联系管理员"
          });
        }
      });
    },
    // 时间转时间戳
    Times(time) {
      var date = time;
      date = date.substring(0, 19);
      date = date.replace(/-/g, "/");
      var timestamp = new Date(date).getTime();
      return timestamp;
    },
    //时间戳转字符串
    timeString(timestamp) {
      var d = new Date(timestamp * 1000); //根据时间戳生成的时间对象
      var date =
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1) +
        "-" +
        d.getDate() +
        " " +
        d.getHours() +
        ":" +
        d.getMinutes() +
        ":" +
        d.getSeconds();
      return date;
    },
    //手机号筛选
    selPhone() {
      this.addType = "5";
      this.getPage.applyStatus = "";
      this.gitInit();
    },
    selStatus(index) {
      if (index != 5) {
        //index申请状态（0：未审核，1：审核中，2：通过审核，3：审核失败）
        this.getPage.applyStatus = index;
      } else {
        //查询全部
        this.getPage.applyStatus = "";
      }
      this.getPage.phone = "";
      this.gitInit();
    },
    isDelete(id, index) {
      let data = {
        id: id,
        isDelete: "1"
      };
      updateRobotManager({
        method: "post",
        data: data,
        qs: false
      }).then(res => {
        if (res.code == "0") {
          this.$Notice.success({
            title: "删除成功"
          });
          this.data.splice(index, 1);
        } else {
          this.$Notice.error({
            title: "删除失败，请重试！"
          });
        }
      });
    },
    //分页查询
    customPage(index) {
      this.getPage.page = index;
      this.gitInit();
    },
    shenhe() {
      this.textVal = "";
    },
    UpdataList() {
      let data = {
        id: this.id,
        applyStatus: "",
        applyContent: this.textVal
      };
      if (this.commonly == "不通过") {
        data.applyStatus = "3";
      } else {
        data.applyStatus = "2";
      }
      updateRobotManager({
        method: "post",
        data: data,
        qs: false
      }).then(res => {
        if (res.code == "0") {
          this.addShow = false;
          this.shenhe();
          this.$Notice.success({
            title: "提交审核成功"
          });
          this.getPage.page = 1;
          this.gitInit();
        }
      });
    }
  }
};
</script>
<style>
/*清楚浮动*/
.clearfix {
  overflow: hidden;
  zoom: 1;
}
</style>
<style scoped lang="scss">
.auditStatus {
  .cont {
    position: relative;
    height: 574px;
    .xAdd {
      font-size: 15px;
      position: absolute;
      right: 80px;
      /*top: 130px;*/
      z-index: 999;
      width: 400px;
      /*height: 260px;*/
      background: rgba(255, 255, 255, 1);
      border-radius: 4px;
      box-shadow: 2px 2px 10px #909090;
      box-sizing: border-box;
      padding: 0 15px;
      .header {
        font-size: 16px;
        padding: 20px;
        p {
          height: 40px;
          line-height: 40px;
          position: relative;
          img {
            position: absolute;
            top: 5px;
            right: 0;
            width: 20px;
            height: 20px;
          }
        }
      }
    }
  }
  .page {
    text-align: center;
    margin-top: 20px;
  }
}
</style>

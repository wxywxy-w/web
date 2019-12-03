<style lang="less">
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
  }

  .layout-logo {
    width: 279px;
    height: 64px;
    line-height: 60px;
    text-align: center;
    color: #f5f7f9;
    font-size: 20px;
    background: #0177d5;
    float: left;
    position: relative;
  }

  .layout-nav {
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
  }

  .MenuTop {
    float: left;
    background: #ffff;
    width: 280px;
    height: 72px;
    border-right: 1px solid #dcdee2;
  }

  .MenuTop > img {
    margin-left: 1.5rem;
  }

  .SiderTop {
    float: right;
    background: #ffffff;
    height: 71px;
  }

  .clear::before {
    content: "";
    display: block;
    clear: both;
  }

  .widthList {
    height: 80px !important;
  }

  .addpadding {
    padding-top: 10px;
    padding-left: 66px;
    padding-bottom: 10px;
    font-size: 22px;
    position: relative;
  }

  .addpadding img {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 16px;
    left: 32px;
  }

  .itemList {
    font-size: 20px;
  }

  .users {
    float: right;
    padding-right: 130px;
    padding-top: 12px;
    position: relative;
  }

  .usersImg img {
    display: block;
    width: 40px;
    height: 40px;
  }

  .users span {
    font-size: 18px;
    padding-left: 10px;
    color: #ffff;
    float: right;
    line-height: 40px;
  }

  .usersImg {
    float: left;
    line-height: 40px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
  }

  .sonName {
    position: absolute;
    top: 20px;
    left: 350px;
    font-size: 20px;
    font-weight: 600;
  }

  .sonBox {
    height: 30px;
    width: 2px;
    position: absolute;
    left: 322px;
    top: 20px;
    background: #5ba7e4;
  }

  .refresh {
    text-align: center;
    line-height: 26px;
    margin-top: 20px;
    text-decoration: none;
    display: block;
    width: 60px;
    height: 26px;
    font-size: 16px;
    border: 1px solid #0177d5;
    color: #0177d5;
    float: right;
    margin-right: 60px;
    border-radius: 3px;
  }

  button:focus {
    border: none;
    outline: none;
  }
  .ivu-menu{
    color: #526FA5;
  }
  .ivu-menu a{
    color: #ffffff;
  }
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
    color: #ffffff;
    background: #5B5F69;
    z-index: 2;
}

</style>

<template>
  <div id="app1">
    <div class="layout">
      <Layout>
        <Header style="padding:0px">
          <!-- <div style="height:72px;color:red"></div> -->
          <Menu mode="horizontal" theme="dark" active-name="1-1">
            <div class="layout-logo">小绿蓝后台管理系统</div>
            <div class="users">
              <div class="usersImg">
                <!-- 获取的头像，现在为空 -->
                <!-- <img v-bind:src="this.$store.state.session.headImg" alt="妈的，图片失效了" title="狗头"/> -->
                <img src="@/imges/slices/me.jpg" alt="妈的，图片失效了" title="狗头"/>
              </div>
              <Submenu name="1">
                <template class="widthList" slot="title">
                  <span class="addpadding" v-text="username"></span>
                </template>
                <MenuItem to="/info">基本信息</MenuItem>
                <MenuItem to='/login'>退出登录</MenuItem>
              </Submenu>
            </div>
          </Menu>
        </Header>
        <div class="clear" style="height:58px;background:#ffffff;position:relative">
          <div class="MenuTop" style="background: #282B33;">
            <img style="position:absolute;left:10px;top:16px;"
                 src="@/imges/slices/leftbar_icon_classification.png" alt/>
          </div>
          <div class="sonBox"></div>
          <span v-text="ssonName" class="sonName">广告列表</span>
          
         <Select @on-change='selectOpt' v-model="model3" style="width:10%;position:absolute;top: 18px;
    right: 10%;">
             <!-- <Option v-for="item in cityList3" :value="item.value" :key="item.value">{{ item.label }}</Option> -->
             <!-- <option :value="1">{{所有版本}}</option> -->
             <Option v-for="(item,index) in cityList3" :value="item" :key="index">{{ item+' 版本' }}</Option>
          </Select>

          <a class="refresh" href="javaScript:;" @click="refresh">刷新</a>
        </div>
        <Layout style="height:880px;">
          <Sider
                  hide-trigger
                  style="background:#282B33;max-width:297px;flex:0 0 297px;overflow-y:scroll;"
          >
            <Menu
                    style="background: #282B33;"
                    active-name="1-1"
                    theme="light"
                    width="auto"
                    :open-names="['1']"
            >
              <Submenu name="1">
                <template class="widthList" slot="title">
                  <div class="addpadding">
                    <img src="@/imges/slices/leftbar_icon_content.png" alt="内容活动"/>
                    内容活动
                  </div>
                </template>

                <MenuItem
                        @click.native="ssonName='推广内容'"
                        to="/home"
                        style="height:80px;line-height:50px;font-size:20px;padding-left:100px;"
                        name="1-1"
                >推广内容
                </MenuItem>
                <MenuItem
                        @click.native="ssonName='添加内容'"
                        to="/1_2"
                        style="height:80px;line-height:50px;font-size:20px;padding-left:100px;"
                        name="1-2"
                >添加内容
                </MenuItem>
                <MenuItem
                        @click.native="ssonName='广告列表'"
                        to="/1_3"
                        style="height:80px;line-height:50px;font-size:20px;padding-left:100px;"
                        name="1-3"
                >广告列表
                </MenuItem>
              </Submenu>
              <Submenu name="7">
                <template class="widthList" slot="title">
                  <div class="addpadding">
                    <img src="@/imges/slices/leftbar_icon_content.png" alt="营销中心"/>
                    营销中心
                  </div>
                </template>
                <MenuItem
                        @click.native="ssonName='零元购'"
                        to="7_1"
                        style="height:80px;line-height:50px;font-size:20px;padding-left:100px;"
                        name="7-1"
                >零元购
                </MenuItem>
              </Submenu>
              <Submenu name="8">
                <template class="widthList" slot="title">
                  <div class="addpadding">
                    <img src="@/imges/slices/leftbar_icon_robot_system@2x.png" alt="营销中心"/>
                    机器人系统
                  </div>
                </template>
                <MenuItem
                        @click.native="ssonName='用户列表'"
                        to="8_1"
                        style="height:80px;line-height:50px;font-size:20px;padding-left:100px;"
                        name="8-1"
                >用户列表
                </MenuItem>
                <MenuItem
                        @click.native="ssonName='审核列表'"
                        to="8_2"
                        style="height:80px;line-height:50px;font-size:20px;padding-left:100px;"
                        name="8-2"
                >审核列表
                </MenuItem>
              </Submenu>
              <Submenu name="2">
                <template slot="title">
                  <div class="addpadding">
                    <img src="@/imges/slices/leftbar_icon_logistics.png" alt="订单物流"/>
                    订单物流
                  </div>
                </template>
                <MenuItem
                        @click.native="ssonName='订单列表'"
                        to="2_1"
                        style="height:80px;line-height:50px;font-size:20px;padding-left:100px;"
                        name="2-1"
                >订单列表
                </MenuItem>
                <MenuItem
                        @click.native="ssonName='订单发货'"
                        to="2_2"
                        style="height:80px;line-height:50px;font-size:20px;padding-left:100px;"
                        name="2-2"
                >订单发货
                </MenuItem>
                <MenuItem
                        @click.native="ssonName='兑换列表'"
                        to="2_3"
                        style="height:80px;line-height:50px;font-size:20px;padding-left:100px;"
                        name="2-3"
                >兑换列表
                </MenuItem>
              </Submenu>
              <Submenu name="3">
                <template slot="title">
                  <div class="addpadding">
                    <img src="@/imges/slices/leftbar_icon_goods.png" alt="商品库"/>
                    商品库
                  </div>
                </template>
                <MenuItem
                        @click.native="ssonName='商品列表'"
                        to="3_1"
                        style="height:80px;line-height:50px;font-size:20px;padding-left:100px;"
                        name="3-1"
                >商品列表
                </MenuItem>
                <MenuItem
                        @click.native="ssonName='添加商品'"
                        to="3_2"
                        style="height:80px;line-height:50px;font-size:20px;padding-left:100px;"
                        name="3-2"
                >添加商品
                </MenuItem>
              </Submenu>
              <Submenu name="4">
                <template slot="title">
                  <div class="addpadding">
                    <img src="@/imges/slices/leftbar_icon_audit.png" alt="审核"/>
                    审核
                  </div>
                </template>
                <MenuItem
                        @click.native="ssonName='提现审核'"
                        to="4_1"
                        style="height:80px;line-height:50px;font-size:20px;padding-left:100px;"
                        name="4-1"
                >提现审核
                </MenuItem>
                <MenuItem
                        to="index"
                        style="height:80px;line-height:50px;font-size:20px;padding-left:100px;"
                        name="4-2"
                >提现
                </MenuItem>
              </Submenu>
              <Submenu name="5">
                <template slot="title">
                  <div class="addpadding">
                    <img src="@/imges/slices/leftbar_icon_permissions.png" alt="权限管理"/>
                    权限管理
                  </div>
                </template>
                <MenuItem
                        @click.native="ssonName='系统管理'"
                        to="5_1"
                        style="height:80px;line-height:50px;font-size:20px;padding-left:100px;"
                        name="5-1"
                >系统管理
                </MenuItem>
              </Submenu>
              <Submenu name="6">
                <template slot="title">
                  <div class="addpadding">
                    <img src="@/imges/slices/leftbar_icon_system.png" alt="系统管理"/>
                    系统管理
                  </div>
                </template>
                <MenuItem
                        @click.native="ssonName='版块管理'"
                        to="6_1"
                        style="height:80px;line-height:50px;font-size:20px;padding-left:100px;"
                        name="5-1"
                >版块管理
                </MenuItem>
                <MenuItem
                        @click.native="ssonName='分类管理'"
                        to="6_2"
                        style="height:80px;line-height:50px;font-size:20px;padding-left:100px;"
                        name="5-2"
                >分类管理
                </MenuItem>
              </Submenu>

            </Menu>
          </Sider>

          <Layout :style="{padding: '0 24px 24px'}">
            <Breadcrumb :style="{margin: '14px 0'}"></Breadcrumb>
            <Content :style="{padding: '24px', background: '#fff'}">
              <router-view></router-view>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
    <!-- <router-view/> -->
  </div>
</template>

<script>
	import axios from "axios";
	import {questLoginOut} from "@/api/index";

	export default {
		data() {
			return {
				to: {
					path: "/info"
        },
        //版本列表 
      cityList3:[],
       model3:'1',//默认选择版本


        ssonName:"推广内容",
				title: "ss",
				account: "admini",
				password: "password",
				username: "可乐呀",
				datalist: []
			};
		},
		methods: {
      //选择版本  value版本号
      selectOpt(value){
        alert(value)
      },
			//刷新
			refresh() {
				this.$router.replace({
					path: '/refresh',
					query: {
						t: Date.now()
					}
				})
			},
			sonNamer: function () {
				//   console.log("chengong")
				alert(1);
			},
			test() {
				console.log(this.datalist);
			},
			outLogin() {
				console.log("???ww")
				questLoginOut({
					method: "post",
					data: this.$store.state.saveSession
				})
					.then(response => {
						console.log(response.message)
					}).catch(error => {
					console.log(error)
				})
			},
		},
		mounted() {
        this.axios.get('/backstage/banner/auth/getVersionList').then(res=>{
          console.log(res.data.data)
          this.cityList3=res.data.data
        })
    }
	};
</script>

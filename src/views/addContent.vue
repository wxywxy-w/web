<style>
  h1{
    font-size: 22px;
  }
  .xinxin{
    position: relative;
    font-size: 17px;
    color: #000000;
    display: block;
  }
  .xinxin::before{
    position: absolute;
    left: -12px;top: 2px;
    display: block;
    margin-top: 5px;
    content: "";
    width: 8px;height: 8px;
    /* background: url('../../imges/slices/addcontent_icon_mandatory.png'); */
    background: url('../imges/slices/addcontent_icon_mandatory.png');
    /* background-image: url(@/imges/slices/addcontent_icon_mandatory.png); */
  }
  .mainbox{
    padding-left: 44px;
  }
  .selectAbtn{
    border:1px solid #D3D3D3;width:300px;height:30px;display:block;
    text-align: left;
    line-height: 30px;
    border-radius: 2px;
    color: #000000;
  }
  .imgesbox{
    margin-left: 75px;
    width: 520px;
    height: 420px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    /* align-items:stretch; */
  }


  .demo-upload-list{
        display: inline-block;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
    /* #wangeditor .gf{
        margin-left:100px;
        width: 80px;
        height: 30px;
        background: #2D8CF0;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        border-radius: 3px;
        margin: 5px 0;
        cursor:pointer;
    }
    #wangeditor.text {
        /* height: 200px; */
        /* margin-left: 100px; */
    /* }  */ 
    #wangeditor{
      width: 60%;
      /* height:300px; */
    }
    /* .editor{
      height:200px;
    } */
    .text {
      height:200px;
    }
</style>
<template>
  <div>
    <h1>添加内容信息</h1>
        <!-- {{defaultList}} -->
        <!-- {{editor}}
        {{uploadList}} -->
    <div class="mainbox">
      <p style="margin-top:30px;position:relative"><span class="xinxin">选择分类</span>
         <Select  @on-change='selectChange' v-model="model2" style="width:300px;position:absolute;left:75px;top:0px">
           <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
           <!-- <Option>{{cityList2.id}}</Option>
           <Option>{{cityList2.id}}</Option>
           <Option>{{cityList2.id}}</Option>  -->
        </Select>
      </p>
      <!-- 爆款 -->
      <div v-show="model2==1">
      <p style="margin-top:30px;position:relative"><span class="xinxin">选择平台</span>
         <Select  v-model="model1" style="width:300px;position:absolute;left:75px;top:0px">
           <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </p>
      <p style="margin-top:30px;position:relative"><span class="xinxin"> &nbsp;&nbsp;&nbsp; 商品ID</span>
      <Input v-model="goodvalue" v-on:input="IDchange" placeholder="Enter something..." style="width: 500px;position:absolute;left:75px;top:0px" />
      </p>
      <p style="margin-top:30px;position:relative"><span class="xinxin">内容文案</span>
      <textarea v-model="contentValue1" placeholder="enter everything..." style="width:550px;height:200px;border:1px solid #CCCCCC;;position:absolute;left:75px;top:0px;" name="ss" id="" cols="30" rows="10"></textarea>
      </p>
      <p style="margin-top:230px;position:relative"><span class="xinxin">宣传图片</span>
        <span style="position:absolute;left:75px;top:6px">按住ctrl可同时批量选择多张图片上传，最多可以上传9张图片，建议尺寸800*800px</span>
                  <div style="display:flex;flex-wrap:wrap;margin-left: 75px;marginTop:20px;">
                        <div class="demo-upload-list" v-for="item in uploadList" :key="item">
                          
                            <template v-if="item.status == 'finished'">
                                <img :src="item.url">
                                <div class="demo-upload-list-cover">
                                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                                </div>
                            </template>
                            <template v-else>
                                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                            </template>
                        </div>
                        <Upload
                                ref="upload"
                                :show-upload-list="false"
                                :default-file-list="defaultList"
                                :on-success="handleSuccess"
                                :format="['jpg','jpeg','png']"
                                :max-size="2048"
                                :on-format-error="handleFormatError"
                                :on-exceeded-size="handleMaxSize"
                                :before-upload="handleBeforeUpload"
                                :on-progress="addUpload"
                                multiple
                                type="drag"
                                :action="imgUrl"
                                :data="pathId"
                                style="display: inline-block;width:100px;">
                            <div style="width: 100px;height:100px;line-height: 100px;">
                                <Icon type="ios-camera" size="20"></Icon>
                            </div>
                        </Upload>
                    </div>
      </p>
      <!-- 提交 -->
        <Button style="margin:50px auto;display:block;width:100px;" type="primary" :loading="loading" @click="toLoading(1)">
          <span v-if="!loading">提交</span>
          <span v-else>Loading...</span>
        </Button>
      </div>
      <!-- 朋友圈 -->
      <div v-show="model2==2">
      <p style="margin-top:30px;position:relative"><span class="xinxin">内容文案</span>
      <textarea v-model="contentValue2" placeholder="enter everything..." style="width:550px;height:200px;border:1px solid #CCCCCC;;position:absolute;left:75px;top:0px;" name="ss" id="" cols="30" rows="10"></textarea>
      </p>
      <p style="margin-top:230px;position:relative"><span class="xinxin">宣传图片</span>
        <span style="position:absolute;left:75px;top:6px">按住ctrl可同时批量选择多张图片上传，最多可以上传9张图片，建议尺寸800*800px</span>
                  <div style="display:flex;flex-wrap:wrap;margin-left: 75px;marginTop:20px;">
                                            <div class="demo-upload-list" v-for="item in uploadList2" :key="item">
                            <template v-if="item.status == 'finished'">
                                <img :src="item.url">
                                <div class="demo-upload-list-cover">
                                    <Icon type="ios-trash-outline" @click.native="handleRemove2(item)"></Icon>
                                </div>
                            </template>
                            <template v-else>
                                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                            </template>
                        </div>
                        <Upload
                                ref="uploadd"
                                :show-upload-list="false"
                                :default-file-list="defaultList"
                                :on-success="handleSuccess"
                                :format="['jpg','jpeg','png']"
                                :max-size="2048"
                                :on-format-error="handleFormatError"
                                :on-exceeded-size="handleMaxSize"
                                :before-upload="handleBeforeUpload2"
                                :on-progress="addUpload"
                                multiple
                                type="drag"
                                :action=imgUrl
                                :data="pathId"
                                style="display: inline-block;width:100px;">
                            <div style="width: 100px;height:100px;line-height: 100px;">
                                <Icon type="ios-camera" size="20"></Icon>
                            </div>
                        </Upload>

                  </div> 
      </p>
      <!-- 提交 -->
        <Button style="margin:50px auto;display:block;width:100px;" type="primary" :loading="loading" @click="toLoading(2)">
          <span v-if="!loading">提交</span>
          <span v-else>Loading...</span>
        </Button>
      </div>
       <!-- 文章 -->
      <div v-show="model2==3">
           <p style="margin-top:30px;position:relative"><span class="xinxin">文章类别</span>
        <Select v-model="model3" style="width:300px;position:absolute;left:75px;top:0px">
           <Option v-for="item in cityList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </p>
      <p style="margin-top:30px;position:relative"><span class="xinxin">标签内容</span>
        <RadioGroup style="position:absolute;left:75px;top:0px" v-model="border"  type="button" size="large">
            <Radio label="必看" ></Radio>
            <Radio label="经验" ></Radio>
            <Radio label="进阶" ></Radio>
            <Radio label="地推" ></Radio>
        </RadioGroup>
      </p>
      <p style="margin-top:30px;position:relative"><span class="xinxin"> &nbsp;&nbsp;&nbsp; 主标题</span>
      <Input v-model="Rttvalue" placeholder="Enter something..." style="width: 500px;position:absolute;left:75px;top:0px" />
      </p>
      <p style="margin-top:30px;position:relative"><span class="xinxin"> &nbsp;&nbsp;&nbsp; 副标题</span>
      <Input v-model="Lttvalue" placeholder="Enter something..." style="width: 500px;position:absolute;left:75px;top:0px" />
      </p>
      <p style="margin-top:30px;position:relative"><span class="xinxin">添加主图</span>
        <span style="position:absolute;left:75px;top:6px">建议尺寸148*148px</span>
                  <div style="display:flex;flex-wrap:wrap;margin-left: 75px;marginTop:20px;">
                        <div class="demo-upload-list" v-for="item in uploadList3" :key="item">
                          
                            <template v-if="item.status == 'finished'">
                                <img :src="item.url">
                                <div class="demo-upload-list-cover">
                                    <Icon type="ios-trash-outline" @click.native="handleRemove3(item)"></Icon>
                                </div>
                            </template>
                            <template v-else>
                                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                            </template>
                        </div>
                        <Upload
                                ref="uploaddd"
                                :show-upload-list="false"
                                :default-file-list="defaultList"
                                :on-success="handleSuccess"
                                :format="['jpg','jpeg','png']"
                                :max-size="2048"
                                :on-format-error="handleFormatError"
                                :on-exceeded-size="handleMaxSize"
                                :before-upload="handleBeforeUpload3"
                                :on-progress="addUpload"
                                multiple
                                type="drag"
                                :action=imgUrl
                                :data="pathId"
                                style="display: inline-block;width:100px;">
                            <div style="width: 100px;height:100px;line-height: 100px;">
                                <Icon type="ios-camera" size="20"></Icon>
                            </div>
                        </Upload>
                    </div>
      </p>
      <div style="margin-top:30px;position:relative"><span class="xinxin">编辑内容</span>
      <div style="position:absolute;left:-10px;top:0px;height:200px;" id="wangeditor">
                <editor-bar v-model="editor.info" :isClear="isClear"></editor-bar>
            </div>
      </div>
      
      <!-- 提交 -->
        <Button style="margin: 244px auto 10px;display:block;width:100px;" type="primary" :loading="loading" @click="toLoading(3)">
          <span v-if="!loading">提交</span>
          <span v-else>Loading...</span>
        </Button>


      </div>
    </div>
    
   
  </div>
</template>
<script>
import qs from 'qs'
import { addComm,goodsOptsList } from "@/api/index.js";
import EditorBar from '@/views/components/zhen/wangeditor.vue'
export default {
  		name: "wangEditor",
		  components: {
			EditorBar
		},
  data(){
    return{

      datass:{
        ss:"1d",
        da:22,
        proam:{
          id:11,
          ss:2,
          ds:["url","url"]
        },
      },
      goodsList:{
        id:'',
        optName:''
      },
      
        border: '',//文章标签
        loading: false,
        editor: {//富文本URl
					info: ''
				},
        Rttvalue:'',//主标题
        Lttvalue:'',//副标题
        contentValue1:'',//爆款内容
        contentValue2:'',//朋友圈内容
        uploadList: [],
        uploadList2: [],
        uploadList3: [],
        EEuploadList:[],
        defaultList: [],//图片存放
        imgUrl:'http://49.234.229.202:7088/backstage/upload/auth/uploadOSS',
        pathId:'',//path+商品id
        goodvalue:'',//input 商品ID
       cityList:
       [
        {
            value: '1',
            label: '淘宝天猫'
        },
        {
            value: '2',
            label: '拼多多'
        },
        {
            value: '3',
            label: '自营'
        },
       ],
        model1: '1',//平台类型默认选择值
        cityList2:
       [
        // {
            // id: '',
            // optName: ''
        // },
        {
            value: '1',
            label: '每日爆款'
        },
        {
            value: '2',
            label: '朋友圈'
        },
        {
            value: '3',
            label: '文章'
        },
       ],
        model2: '1',//默认选择
        cityList3:
       [
        {
            value: '1',
            label: '新手必看'
        },
        {
            value: '2',
            label: '经验分享'
        },
        {
            value: '3',
            label: '高手进阶'
        },
        {
            value: '3',
            label: '地推手册'
        },
       ],
       model3:'1',//默认选择新手必看
    }
  },

  methods:{
    IDchange() {
      
      var myDate = new Date();
      var yue=myDate.getMonth()+1;
      var ri=myDate.getDate();
      var ddian='/'
      let ttpath=yue+ddian+ri+ddian+this.goodvalue
      // console.log("1111--------------------")
      // console.log(typeof(ttpath))
      this.pathId = {
           path:ttpath
      }
      // this.goodvalue
      // let stringId = toSring(this.goodvalue)
      // this.pathId=stringId
    },
    //提交商品分享
    toLoading (value) {


      //type 为1【goodsId/商品内容,shareText/分享内容,platformType/平台类型,customImg/图片列表（可以不传，数组类型）】
      // type 为2 【shareText/分享内容,customImg/图片列表（数组类型）】 

      //type 	1.商品分享(每日爆款) 2.元素分享(朋友圈) 3.文章分享(文章)
      //按钮loading
        this.loading = true;
        console.log(value)
        let type=value;
      if(value==1){
        let params = qs.stringify({
            type:type,
            optId:573,
        });
        
        let jsonParam= JSON.stringify({
        goodsId:this.goodvalue,
        shareText:this.contentValue1,
        platformType:this.model1,
        customImg:this.defaultList//图片路径数组
        })
        console.log(this.defaultList)
        this.axios.post("backstage/community/auth/add",qs.stringify({
          type:type,
          optId:573,
          // params,
          jsonParam
        })
        // ,{
        //   headers: {
        //     JSESSIONID:window.cookie
        // }
        // }
        ).then(res=>{
          this.loading = false;
          this.$Notice.info({
            title: res.data.message,
            // desc: nodesc ? '' : res.message
	        });
          console.log(res.data)
        })
      }
      if(value==2){
        let jsonParam= JSON.stringify({
        shareText:this.contentValue2,
        customImg:this.defaultList//图片路径数组
        })
        
        this.axios.post("backstage/community/auth/add",qs.stringify({
          type:type,
          optId:574,
          jsonParam
        }),{
          headers: {
            JSESSIONID:window.cookie
        }
        }
        ).then(res=>{
          this.loading = false;
          this.$Notice.info({
            title: res.data.message,
            // desc: nodesc ? '' : res.message
	        });
          console.log(res);
        })
      }
      //type为3【title/文章标题，titleImg/文章主题，titleLabel/文章标签（可以不传），subTitle/副标题，htmlUrl/文章地址】
      if(value==3){

        let jsonParam= JSON.stringify({
          title:this.Rttvalue,
          titleImg:this.defaultList,
          titleLabel:this.model3,
          subTitle:this.Lttvalue,
          htmlUrl:this.editor
        })

        this.axios.post("backstage/community/auth/add",qs.stringify({
          type:type,
          optId:575,
          jsonParam
        })).then(res=>{
          this.loading = false;
          this.$Notice.info({
            title: res.data.message,
            // desc: nodesc ? '' : res.message
	        });
          console.log(res);
        })
      }
    },
    selectChange(value){
      // alert(value)
      // console.log("选择")
      console.log(this.uploadList)
      this.uploadList=[]
      console.log(this.uploadList)
    },

    handleBeforeUpload(){
      if(this.goodvalue==''){
      alert("先填商品ID再传图片,OK?")
        this.$router.replace({
			  		path: '/refresh',
			  		query: {
			  			t: Date.now()
			  		}
				})
      }
      // alert(this.pathId)
      console.log(this.pathId)
			const check = this.uploadList.length < 9;
			if (!check) {
				this.$Notice.warning({
					title: '最多可以上传九张图片'
				});
			}
			return check;
    },
    handleBeforeUpload2(){
			const check = this.uploadList2.length < 9;
			if (!check) {
				this.$Notice.warning({
					title: '最多可以上传九张图片'
				});
			}
			return check;
    },
    handleBeforeUpload3(){
			const check = this.uploadList3.length < 9;
			if (!check) {
				this.$Notice.warning({
					title: '最多可以上传九张图片'
				});
			}
			return check;
    },
    //删除
    handleRemove (file) {
				const fileList = this.$refs.upload.fileList;
				this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleRemove2 (file) {
				const fileList = this.$refs.uploadd.fileList;
				this.$refs.uploadd.fileList.splice(fileList.indexOf(file), 1);
    },
    handleRemove3 (file) {
				const fileList = this.$refs.uploaddd.fileList;
				this.$refs.uploaddd.fileList.splice(fileList.indexOf(file), 1);
    },
    //删除
    // handleRemove2 (file) {
		// 		console.log(1)
		// 		const fileList = this.$refs.upload.fileList;
		// 		this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    // },
    // 文件上传成功时的钩子，返回字段为 response, file, fileList
		handleSuccess (res, file) {
			if(res.code == '0'){
				file.url = res.data;
            this.defaultList.push(res.data)
        }
        // console.log("res11111----------------")
        // console.log(res.data)
    },
    // 文件格式验证失败时的钩子，返回字段为 file, fileList
		handleFormatError (file) {
			this.$Notice.warning({
				title: '图片格式不正确',
				desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
			});
    },
    // 文件超出指定大小限制时的钩子，返回字段为 file, fileList
		handleMaxSize (file) {
			console.log('文件超出指定大小限制时的钩子')
			this.$Notice.warning({
				title: '超过档案大小限制',
				desc: 'File  ' + file.name + ' is too large, no more than 2M.'
			});
    },
    addUpload(){

    },
  },

  mounted(){
    this.pathId = this.goodvalue
    console.log(this.$refs.upload.fileList)
    this.uploadList = this.$refs.upload.fileList;
    this.uploadList2 = this.$refs.uploadd.fileList;
    this.uploadList3 = this.$refs.uploaddd.fileList;
    // this.EEuploadList = 
    // let getPage={
    //   page:1,
    //   pageSize:0
    // }
    // console.log("res1--------------------------------11")
    this.axios.get("backstage/goodsOpts/auth/getList",{
      params:{
        page:1,
        pageSize:0
      }
    }).then(res=>{
      console.log(res.data.data)
      for(let i in res.data.data){
        // console.log(res.data.data[i])
        // this.cityList2=res.data.data[i]
      }
      // console.log(res.data.data.id)
      // this.cityList2=res.data
    })
    // goodsOptsList({
		//     method: 'get',
		//     data: this.getPage,
		//     qs:false
    // }).then(res=>{
    //   console.log(res)
    //   console.log(res)
    // })
  }
}
</script>
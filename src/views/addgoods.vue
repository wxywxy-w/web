<!--添加自营商品-->
<template>
    <div class="addgoods">
        <!-- 图片路径 -->
        <!--  {{defaultList}} -->
        <!-- {{uploadList}} -->
        <!-- 文本框路劲 -->
        <!-- {{editor}} --> 
        <p class="title">请选择平台：
            <Select v-model="model6" style="width:200px">
                <Option value="3">自营</Option>
                <Option value="1">拼多多</Option>
                <Option value="2">淘宝</Option>
            </Select>
        </p>
        <!--自营商品-->
        <div v-show="model6 == 3">
            <h2 style="margin: 10px 0">基础信息</h2>
            <div style="margin: 15px 0">
                <span class="divTitle"><sup>*</sup>商品标题</span> <Input v-model="goodsTitle"
                    placeholder="最多可以输入30个汉字（60个字符）"
                    style="width: 300px"/>
            </div>
            <div class="clearfix">
                <span style="float: left" class="divTitle"><sup>*</sup>商品销售规格</span>
                <div style="float: left">
                    <Row style="height: 50px;">
                        <Col span="5">
                            <span class="expand-key">库存数量</span>
                        </Col>
                        <Col span="5">
                            <span class="expand-key">原价（元）</span>
                        </Col>
                        <Col span="5">
                            <span class="expand-key">折扣价</span>
                        </Col>
                        <Col span="5">
                            <span class="expand-key">补贴金额（元）</span>
                        </Col>
                    </Row>
                    <Row class="bg" style="height: 50px;">
                        <Col span="5">
                            <input v-model="mountValue" type="text">
                        </Col>
                        <Col span="5">
                            <input v-model="yuanValue" type="text">
                        </Col>
                        <Col span="5">
                            <input v-model="zheValue" type="text">
                        </Col>
                        <Col span="5">
                            <input v-model="buValue" type="text">
                        </Col>
                    </Row>
                </div>
            </div>
            <!--图文描述-->
            <div style="width: 100%">
                <h2 style="margin: 10px 0">图片描述</h2>
                <div style="margin: 15px 0">
                    <p style="margin-left: 20px"><sup>*</sup>商品主图 主图大小不能超过500KB；上传尺寸为800*800 。</p>
                    <div style="display:flex;flex-wrap:wrap;margin-left: 100px;">
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
                                :action=imgUrl
                                style="display: inline-block;width:100px;">
                            <div style="width: 100px;height:100px;line-height: 100px;">
                                <Icon type="ios-camera" size="20"></Icon>
                            </div>
                        </Upload>
                    </div>

                </div>
            </div>
            <!--商品文案-->
            <div class="goodsText">
                <span style="float: left" class="divTitle"><sup>*</sup>商品文案</span>
                <textarea maxlength="170" v-model="Goodscopy">
                    在w3school，你可以找到你所需要的所有的网站建设教程。
                </textarea>
                <span style="position: relative;right: 50px;top: -10px">{{Goodscopy.length}}/170</span>
            </div>
            <!--富文本编译器-->
            <div id="wangeditor">
                <span style="float: left" class="divTitle"><sup>*</sup>商品详情</span>
                <div @click="fncgfshow" class="gf">发布规范
                    <div v-show="gfshow" class="gfTop">
                           <p>1、基本要求</p>
                           <p>
                                （1）手机详情总体大小：图片+文字+音频应小于等于1.5M，图片仅支持JPG、GIF、PNG格式。（建议：所有图片都是本宝贝相关的
                                图片。）
                           </p>
                           <p>
                                2、图片大小要求
                           </p>
                            <p>
                            （1）宽度480 – 620像素
                            </p>
                            <p>
                            （2）高度小于等于960像素
                            </p>
                            <p>
                            （3）格式为：JPG\GIF\PNG
                            </p>
                            <p>
                                举例：亲可以上传一张宽度为480，高度为960像素，格式为JPG的图片。
                            </p>
                            <p>
                            3、文字要求：
                            </p>
                            <p>
                                （1）当需要在图片上添加文字时，中文字体大于等于30号字，英文和阿拉伯数字大于等于20号字。
                            </p>
                            <p>
                                （2）当需要添加的文字太多时，建议使用纯文本的方式编辑，这样看起来更清晰
                            </p>
                    </div>
                </div>
                <editor-bar v-model="editor.info" :isClear="isClear"></editor-bar>
            </div>
            <Button style="margin-left: 100px;margin-top: 20px" class="ckyl" type="primary">查看预览</Button>

            <div class="addtime">
                <span style="float: left" class="divTitle"><sup>*</sup>上架时间</span> <Checkbox @on-change="a()" v-model="single">立即上架</Checkbox>
            </div>

            <p style="text-align: center"><Button @click="zycommitBtn" :loading="loading" type="primary">提交</Button></p>
        </div>
        <!--拼多多-->
        <div v-show="model6 ==1" class="pinduoduo">
            <div class="cont">
                <p>商品ID <span class="The">请输入正确的商品ID <span style="color:red">(每次加一个)</span> </span></p>
                <br>
                <p><Input style="width: 81%" v-model="pddValue" enter-button="添加" placeholder="请输入商品ID" /><Button @click="pddAdd" type="primary">添加</Button></p>
                <ul>
                    <li v-for="(item,index) in pddLIst" :key="index">
                        <p>{{item.id}} <button class="but" @click="delPdd(index)" type="primary">删除</button></p>
                    </li>
                </ul>
            </div>
            <p style="text-align: center"><Button @click="commitBtn(2)" :loading='loading' type="primary">提交</Button></p>
        </div>
        <!--淘宝-->
        <div v-show="model6 ==2" class="taobao">
            <div class="cont">
                <p>商品ID <span class="The">请输入正确的商品ID</span></p>
                <br>
                <p><Input style="width: 81%" v-model="tbValue" enter-button="添加" placeholder="请输入商品ID" /><Button @click="tbAdd" type="primary">添加</Button></p>
                <ul>
                    <li v-for="(item,index) in tbList" :key="index">
                        <p>{{item.id}} <button class="but" @click="delTb(index)" type="primary">删除</button></p>
                    </li>
                </ul>
            </div>
            <p style="text-align: center"><Button @click="commitBtn(0)" :loading='loading' type="primary">提交</Button></p>
        </div>
    </div>
</template>
<script>
    import EditorBar from '@/views/components/zhen/wangeditor.vue'
    import { addGoodlist_ZIYING,addPlatList } from '@/api/index.js'
	export default {
		name: "wangEditor",
		components: {
			EditorBar
		},
		data() {
			return {
				imgUrl:'http://49.234.229.202:7088/backstage/upload/auth/uploadOSS',
				model6: '3',//0:自营 1：拼多多 2：淘宝 //3自营
                goodsTitle:'',//商品标题
                mountValue:'0',//库存数量
                yuanValue:'0',//原价
                zheValue:'1',//折扣价
                buValue:"0",//补贴金额
                //已上传图片
				defaultList: [],
				uploadList: [],
				Goodscopy:"",//商品销售规则aret
				editor: {
					info: ''
                },
                gfshow:false,
				isClear: false,
                single: false,
                loading:false,
                //拼多多
                pddLIst:[
                    {
                        id:''
                    }
                ],
                //淘宝
                tbList:[
                    {
                        id:''
                    }
                ],
                pddValue:"",
                tbValue:'',
                //接口数据
				goodsData: {
					//商品名
					goodsName: '',
					// 商品介绍
					goodsDesc: '',
					// 缩略图
					goodsThumbnailUrl: '',
					// 主图
					goodsImageUrl: '',
					// 商品列表图 ，多个逗号隔开
					introduceImgs: '',
					// 库存
					stock: ''
				}
			};
		},
		created(){
		},
		computed: {

		},
		methods: {
            a(){
                console.log(1)
            },
            //自营提交
            zycommitBtn(){
                this.loading=true
                setTimeout(() => {
                   this.loading=false
                   this.$Notice.open({
                        title:"服务器错误 status:500"
                    });
                }, 2000);
                addGoodlist_ZIYING({
                    method:'post',
                    data:{
                        goodsName:this.goodsTitle,
                        goodsDesc:"",
                        goodsThumbnailUrl:this.defaultList,
                        goodsImageUrl:this.defaultList[1],
                        goodsGalleryUrls:this.defaultList,
                        minGroupPrice:this.zheValue,
                        minNormalPrice:this.yuanValue,
                        promotionRate:this.buValue,
                        introduceImgs:this.defaultList,
                        stock:this.mountValue
                    },
                    qs:true
                }).then(response=>{
                    this.$Notice.open({
                        title: response.message,
                    });
                    console.log(response)
                })
            },
            //淘宝/并夕夕提交
            commitBtn(value){
                console.log(typeof (this.pddLIst))
                console.log(this.pddLIst[1].id)
                // let pddarr="";//多个提交，提取每个id
                // let tbarr="";
                // for(var j=0;j<this.pddLIst.length;j++){
                //     pddarr=pddarr+this.pddLIst[j].id+","
                // }
                // for(var j=0;j<this.tbList.length;j++){
                //     tbarr=tbarr+this.tbList[j].id+","
                // }
                // console.log(pddarr)
                // alert(value)
                let data=""
                if(value==2){
                    // data=pddarr
                    data=this.pddLIst[1].id
                    console.log(data)
                }else if(value==0){
                    // data=tbarr
                    data=this.tbList[1].id//提交多个情况此时为数组
                }
                // data=JSON.stringify(data)
                console.log(typeof(data))

                this.loading=true
                addPlatList({
                    method:'post',
                    data:{
                        goodsId:data,
                        platformType:value
                    },
                    qs:true
                }).then(res=>{
                    this.loading=false
                    this.$Notice.open({
                    title:res.message,
                    });
                    console.log(res)
                })
                // alert("提交成功")
            },
            //拼吸吸提交
            pxxcommitBtn(){

            },
            //显示隐藏
            fncgfshow(){
                this.gfshow=!this.gfshow
            },
            //删除
			handleRemove (file) {
				console.log(1)
				const fileList = this.$refs.upload.fileList;
				this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
			},
			// 文件上传成功时的钩子，返回字段为 response, file, fileList
			handleSuccess (res, file) {
				if(res.code == '0'){
					file.url = res.data;
                    this.defaultList.push(res.data)
                }
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
			handleBeforeUpload(){
				const check = this.uploadList.length < 5;
				if (!check) {
					this.$Notice.warning({
						title: '最多可以上传五张图片'
					});
				}
				return check;
            },
            // 拼多多添加
			pddAdd(){
                this.pddLIst.push({id:this.pddValue})
				this.pddValue = ''
            },
			// 拼多多删除
			delPdd(index){
                console.log(index)
				this.pddLIst.splice(index,1)
            },
			// 淘宝添加
			tbAdd(){
				this.tbList.push({id:this.tbValue})
				this.tbValue = ''
			},
			// 淘宝删除
			delTb(index){
				console.log(index)
				this.tbList.splice(index,1)
			}
		},
		mounted () {
			console.log(this.$refs.upload.fileList)
			this.uploadList = this.$refs.upload.fileList;
		}
	};
</script>
<style>
    .clearfix{
        overflow: hidden;
        zoom: 1;
    }
</style>
<style lang="scss">
.addgoods{
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
    sup{
        color: red;
        position: relative;
        top: 1px;
    }
    .title{
        padding: 10px;
        background: #FBFBFB;
    }
    .divTitle{
        display: inline-block;
        width: 100px;
        text-align: right;
        box-sizing: border-box;
        padding-right: 15px;
    }
    .ivu-row{
        text-align: center;
        height: 50px;
        line-height: 50px;
        .ivu-col-span-5{
            border-top: 1px solid #ccc;
            border-left: 1px solid #ccc;
            border-bottom:1px solid #ccc;
            background: #FAFAFA;
            input{
                font-size: 16px;
                text-align: center;
                outline: none;
                width: 70%;
                height: 30px;
                border: 1px solid #ccc;
            }
        }
        .ivu-col-span-5:nth-child(4){
            border-right:1px solid #ccc;
        }
        }
    .goodsText{
        textarea{
            width: 450px;
            height: 150px;
            border: 1px solid #ccc;
            outline: none;
            box-sizing: border-box;
            padding: 10px;
        }
    }
    .pinduoduo,.taobao{
        height: 300px;
        .cont{
            width: 300px;
            ul{
                width: 243px;
                max-height: 300px;
                border: 1px solid #ccc;
                overflow: auto;
                li{
                    height: 36px;
                    line-height: 36px;
                    box-sizing: border-box;
                    padding-left: 10px;
                    border-bottom: 1px solid #ccc;
                    p{
                        .but{
                            height: 20px;
                            width: 44px;
                            line-height: 10px;
                            text-align: center;
                            float: right;
                            background: #2D8CF0;
                            color: #fff;
                            border-radius: 2px;
                            margin-top: 7px;
                            margin-right: 5px;
                        }
                    }
                }
            }
        }
        margin-top: 30px;
        color: #515A6E;
        .The{
           color: #808695;
        }
    }
    #wangeditor{
        .gf{
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
            position: relative;
            .gfTop{
                position: absolute;
                top: -342px;
                left: 0px;
                width: 480px;
                height: 340px;
                background: #ffffff;
                border: 1px solid #ccc;
                box-shadow: 0px 3px 20px 5px #888888;
                z-index: 99;
                color:#1A1A1A;
                padding: 15px;
            }
        }
        .text {
            height: 400px;
            /*margin-left: 100px;*/
        }
    }
    .addtime{
        margin: 30px 0;
    }
    .bg{
        .ivu-col-span-5{
            background: #fff;
            border-top: 0;
        }
    }
}
</style>

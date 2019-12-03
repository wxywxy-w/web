<template>
    <div class="zeroPurchase">
        <p slot="title" style="font-size:22px;color:rgba(23,35,61,1);margin-bottom: 10px;">数据列表</p>
        <div class="header">
            <div class="time clearfix">
                <Date-picker :value="value2" @on-change="handleChange" format="yyyy/MM/dd" type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 200px"></Date-picker>
                <i-button class="header_button" type="primary" @click="addShow = true">新增</i-button>
            </div>
        </div>
        <div class="cont">
            <!--新增-->
            <div class="xAdd" v-show="addShow">
                <div class="header">
                    <p>新增 <img @click="addShow = false" src="@/assets/imges/off.png" alt=""><p/>
                    <p>开始时间：<Date-picker format="yyyy/MM/dd HH:mm" type="datetime" @on-change="startTime" placeholder="选择开始日期和时间" style="width: 200px"></Date-picker></p>
                    <p>结束时间：<Date-picker format="yyyy/MM/dd HH:mm" type="datetime" @on-change="endTime" placeholder="选择结束日期和时间" style="width: 200px"></Date-picker></p>
                    <p>上下架：<i-Switch size="large" @on-change="addchange"></i-Switch></p>
                    <p style="text-align: right"><i-button type="dashed"  @click="addShow = false">取消</i-button>&nbsp;&nbsp;&nbsp;<i-button @click="addList" type="primary">确定</i-button> </p>
                </div>
            </div>
            <i-table border :content=self :columns=header :data=data></i-table>
        </div>
        <div class="page">
            <Page :total="total" :current="getPage.page" :page-size="getPage.pageSize" @on-change="customPage" show-elevator></Page>
        </div>

    </div>
</template>

<script>
    import {getRushTimeList,backstageUpdate,addActiveData} from '@/api/index.js'
	export default {
		name: "zeroPurchase",
		data () {
			return {
				modal1:false,
				addShow:false,
				self: this,
                addTime:['',''],
				value2: ['', ''],
				header:[
                    {
	                    type: 'index',
	                    align: 'center',
	                    title: '编号',
                        width:70
                    },
					{
						title: '开始时间',
						key: 'startTime',
					},
					{
						title: '结束时间',
						key: 'endTime'
					},
					{
						title: '商品个数',
						key: 'goodsNum'
					},
					{
						title: '状态',
						key: 'isShelf',
                        width:100,
						render: (h, params) =>
							h("i-switch", {

								props: {
									value: params.row.isShelf
								},
								on: {
									"on-change": value => {
										if(params.row.isShelf == true){
											this.change(0,params.row.id)
                                        }else{
											this.change(1,params.row.id)
										}

									}
								}
							})
					},
					{
						title: '操作',
						key: 'action',
						align: 'center',
						render: (h, params) => {
							return h("div", [
								h(
									"a",
									{
										props: {
											size: "small"
										},
										style: {
											display: "flow-root",
										},
										on: {
											click: () => {

												localStorage.setItem('purchaseListId', params.row.id);
                                                this.$router.push({
                                                    path:'/7_2',
	                                                // query: {
		                                            //     id:params.row.id
	                                                // }
                                                })
											}
										}
									},
									"商品列表"
								),
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
											click:() => {
												let that = this
												this.$Modal.confirm({
                                                    title:'确认删除该条内容吗',
													cancelText:'取消',
													okText:'确认',
													onOk:function () {
														that.isDelete(params.row.id,params.index)
													}
                                                })
											}
										}
									},
									"删除"
								)
							]);
						}
					},
					{
						title: '发布账号',
						key: 'Release',
						align: 'center',
					}
                ],
                //数据
                data:[],
                // 分页请求数据
                getPage:{
	                page:1,
	                pageSize:10,
	                startTime:'',
	                endTime:''
                },
                //数据总数
				total:'',
                addData:{
	                startTime:'',
	                endTime:'',
	                isShelf:0
                },
			}
		},
        created(){
	        this.gitInit();
        },
		methods: {
			show (index) {
				this.$Modal.info({
					title: '用户信息',
				})
			},
			remove (index) {
			},
            //上架下架             // 更新上架下架
			change (status,id) {
				console.log(status,id)
				backstageUpdate({
					method: 'post',
					data: {
						id:id,
						isShelf:status
                    },
					qs:false
				}).then(res=>{
					console.log(res)
                })
			},
            // 时间组件
			handleChange(time){
                this.getPage.startTime = this.Times(time[0])
                this.getPage.endTime = this.Times(time[1])
                this.gitInit();
			},
            // 时间转时间戳
            Times(time){
	            var date = time;
	            date = date.substring(0,19);
	            date = date.replace(/-/g,'/');
	            var timestamp = new Date(date).getTime();
	            return timestamp
            },
            //时间戳转字符串
            timeString(timestamp){
	            var d = new Date(timestamp);    //根据时间戳生成的时间对象
	            var date = (d.getFullYear()) + "-" +
		            (d.getMonth() + 1) + "-" +
		            (d.getDate()) + " " +
		            (d.getHours()) + ":" +
		            (d.getMinutes()) + ":" +
		            (d.getSeconds());
	            return date
            },
            gitInit(){
				// this.axios.get('backstage/goodsRush/auth/getRushTimeList',{
				// 	params:{
				// 		data:this.getPage
				// 	}
				// }).then(res=>{
                // 	//处理数据
                // 	for(let i  in res.data){
                //         res.data[i].endTime = this.timeString(res.data[i].endTime)
		        //         res.data[i].startTime = this.timeString(res.data[i].startTime)
                //         res.data[i].Release = 'admin'
                //         this.total = res.count
		        //         if(res.data[i].isShelf == 0){
	            //             res.data[i].isShelf = false
                //         }else{
	            //             res.data[i].isShelf = true
                //         }
                //     }
                //     this.data = res.data
				// })
				

	            getRushTimeList({
		            method: 'get',
		            data: this.getPage,
		            qs:false
                }).then(res=>{
                	//处理数据
                	for(let i  in res.data){
                        res.data[i].endTime = this.timeString(res.data[i].endTime)
		                res.data[i].startTime = this.timeString(res.data[i].startTime)
                        res.data[i].Release = 'admin'
                        this.total = res.count
		                if(res.data[i].isShelf == 0){
	                        res.data[i].isShelf = false
                        }else{
	                        res.data[i].isShelf = true
                        }
                    }
                    this.data = res.data
                })
            },
            //分页查询数据
			customPage(index){
                this.getPage.page = index
                this.gitInit();
            },
            //添加开始时间
			startTime(time){
              this.addData.startTime = this.Times(time)
            },
            // 添加结束时间
			endTime(time){
               this.addData.endTime =  this.Times(time)
            },
            //添加数据是否上下架
			addchange(status){
                if(status){
                	this.addData.isShelf = 1
                }else{
	                this.addData.isShelf = 0
                }
            },
			addList(){
                if(this.addData.startTime != ''){
                	if(this.addData.endTime != ''){
		                // this.addData.startTime / 1000
		                // this.addData.endTime / 1000
		                addActiveData({
			                method: 'post',
			                data: this.addData,
			                qs:false
		                }).then(res=>{
			                this.addShow = false
			                this.addData.isShelf = 0
                            this.addData.startTime = ''
			                this.addData.endTime = ''
			                this.$Notice.success({
				                title: '活动添加成功',
			                });
			                this.gitInit()
			                console.log(res)
		                })
                    }else{
		                this.$Notice.error({
			                title: '请选择结束时间',
		                });
                    }
                }else{
	                this.$Notice.error({
		                title: '请选择开始时间',
	                });
                }
            },
			isDelete(id,index){
                console.log(id,index)
				backstageUpdate({
					method: 'post',
					data: {
						id:id,
						isDelete:1
					},
					qs:true
                }).then(res=>{
                	if(res.code == '0'){
		                this.data.splice(index, 1);
	                }
                })
            }
		}
	}
</script>
<style>
    button{
        outline:none;
    }
</style>
<style scoped lang="scss">
.zeroPurchase{
    /*清楚浮动*/
    .clearfix{
        overflow: hidden;
        zoom: 1;
    }

    .header{
        margin: 10px 0;
        .ivu-date-picker,.header_button{
            float: right;
            margin-right: 20px;
        }
    }
    .cont{
        position: relative;
        height: 522px;
        .xAdd{
            position: absolute;
            right: 250px;
            top: 0;
            z-index: 999;
            width: 400px;
            height: 260px;
            background:rgba(255,255,255,1);
            border-radius:4px;
            box-shadow:2px 2px 10px #909090;
            box-sizing: border-box;
            padding:0 15px;
            .header{
                height: 40px;
                line-height: 40px;
                font-size: 16px;
                p{
                    position: relative;
                    img{
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
    .page{
        text-align: center;
        margin-top: 20px;
    }

}
</style>

<template>
    <div class="robotUserList">
        <h3>数据列表</h3>
        <br>
        <div class="cont">
            <p><i-input v-model="getPage.phone" placeholder="请输入手机号" style="width: 300px"></i-input>&nbsp;&nbsp;<i-button class="header_button" type="primary" @click="getInit">查询</i-button></p>
            <br>
            <i-table border :content=self :columns=header :data=data></i-table>
        </div>
        <div class="page">
            <Page :total="total" :current="getPage.page" :page-size="getPage.pageSize" @on-change="customPage" show-elevator></Page>
        </div>
    </div>
</template>

<script>
	import {getUserList,updateUser} from '@/api/index.js'

	export default {
		name: "userList",
        data(){
		    return{
			    //数据总数
			    total:'',
			    // 分页请求数据
			    getPage:{
				    page:1,
				    pageSize:10,
				    phone:'',
			    },
			    self: this,
                // 表格header
			    header:[
				    {
					    title: '手机账号',
					    key: 'phone',
				    },
				    {
					    title: '联系方式',
					    key: 'contactInformation'
				    },
				    {
					    title: '注册时常（天）',
					    key: 'gapTime'
				    },
				    {
					    title: '账户启用状态',
					    key: 'enable',
					    width:150,
					    render: (h, params) =>
						    h("i-switch", {

							    props: {
								    value: params.row.enable
							    },
							    on: {
								    "on-change": value => {
								    	console.log()
									    if(params.row.enable == true){
										    this.change(false,params.row.id,params.index)
									    }else{
										    this.change(true,params.row.id,params.index)
									    }

								    }
							    }
						    })
				    },
				    // {
					//     title: '操作',
					//     key: 'action',
					//     align: 'center',
                    //     width:'80',
					//     render: (h, params) => {
					// 	    return h("div", [
					// 		    h(
					// 			    "a",
					// 			    {
					// 				    props: {
					// 					    size: "small"
					// 				    },
					// 				    style: {
					// 					    display: "flow-root"
					// 				    },
					// 				    on: {
					// 					    click:() => {
					// 						    let that = this
					// 						    this.$Modal.confirm({
					// 							    title:'确认删除该条内容吗',
					// 							    cancelText:'取消',
					// 							    okText:'确认',
					// 							    onOk:function () {
					// 								    that.isDelete(params.row.id,params.index)
					// 							    }
					// 						    })
					// 					    }
					// 				    }
					// 			    },
					// 			    "删除"
					// 		    )
					// 	    ]);
					//     }
				    // }
			    ],
			    //数据
			    data:[],
		    }
        },
        created(){
		    this.getInit();
        },
        methods:{
	        //时间戳转字符串
	        timeString(timestamp){
		        var d = new Date(timestamp * 1000);    //根据时间戳生成的时间对象
		        var date = (d.getFullYear()) + "-" +
			        (d.getMonth() + 1) + "-" +
			        (d.getDate()) + " " +
			        (d.getHours()) + ":" +
			        (d.getMinutes()) + ":" +
			        (d.getSeconds());
		        return date
	        },
	        getInit(){
		        getUserList({
			        method: 'get',
			        data:this.getPage,
			        qs:false
                }).then(res=>{
                	if(res.code == '0'){
		                for(let i in res.data) {
			                // res.data[i].createTime = this.timeString(res.data[i].createTime)
		                }
			                this.total = res.count
		                this.data = res.data
                    }
                })
            },
	        change(actic,id,index){
                console.log(actic)
                let data = {
                	id:id,
	                enable:actic
                }
		        updateUser({
			        method: 'post',
			        data:data,
			        qs:false
                }).then(res=>{
                    if(res.code == '0'){
                        this.data[index].enable = actic
	                    this.$Notice.success({
		                    title: '操作成功',
	                    });
                    }else{
	                    this.$Notice.success({
		                    title: '操作失败，请联系管理员',
	                    });
                    }
                })


            },
	        customPage(index){
		        this.getPage.page = index
		        this.gitInit();
            },
        }
	}
</script>


<style scoped lang="scss">
    .robotUserList{
        .cont{
            position: relative;
            height: 522px;
        }
        .page{
            text-align: center;
            margin-top: 20px;
        }
    }
</style>
<style>
    button{outline:none !important;}
    input{outline:none !important;}
</style>

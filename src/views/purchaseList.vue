<template>
    <div class="purchaseList">
        <div class="header">
            <p>
                <!--<i-button class="header_button" type="primary">批量编辑</i-button>-->
                <!--<i-button class="header_button" type="primary">批量删除</i-button>-->
                <i-button class="header_button" type="primary" @click="addShow = true">添加</i-button>
            </p>
        </div>
        <div class="cont">
            <i-table border :content=self :columns=header :data=data></i-table>
            <!--添加商品-->
            <div class="add" v-show="addShow">
                <p>新增<img @click="addShow = false" src="@/assets/imges/off.png" alt=""></p>
                <p>
                    商品类型：<Select v-model="addType" style="width:200px">
                    <Option value="1">普通商品</Option>
                    <Option value="0">淘礼金商品</Option>
                </Select>
                </p>
                <!--普通商品-->
                <div class="commonly" v-show="addType == 1">
                    <p>请输入商品ID:
                        <i-input v-model="commonly.id" placeholder="请输入商品ID" style="width: 200px"></i-input>
                    </p>
                    <p>状态：
                        <Radio-group v-model="commonly.commonly">
                            <Radio label="已抢购"></Radio>
                            <Radio label="可抢购"></Radio>
                        </Radio-group>
                    </p>
                    <p style="text-align: right">
                        <i-button type="dashed" @click="addShow = false">取消</i-button>&nbsp;&nbsp;&nbsp;<i-button
                            @click="addList" type="primary">确定
                    </i-button>
                    </p>
                </div>


                <!--淘领金商品-->
                <div class="commonly" v-show="addType == 0">
                    <p>请输入商品ID:
                        <i-input v-model="taolingjin.id" placeholder="请输入商品ID" style="width: 200px"></i-input>
                    </p>
                    <p>设置淘礼金金额：
                        <i-input v-model="taolingjin.money" type= "number" placeholder="请输入商品ID" style="width: 200px"></i-input>
                    </p>
                    <p>淘礼金实际数量：
                        <i-input v-model="taolingjin.Number" type= "number" placeholder="请输入商品ID" style="width: 200px"></i-input>
                    </p>
                    <p>设置淘礼金数量：
                        <i-input v-model="taolingjin.setNumber" type= "number" placeholder="请输入商品ID" style="width: 200px"></i-input>
                    </p>
                    <p>状态：
                        <Radio-group v-model="commonly.commonly">
                            <Radio label="已抢购"></Radio>
                            <Radio label="可抢购"></Radio>
                        </Radio-group>
                    </p>
                    <p style="text-align: right">
                        <i-button type="dashed" @click="addShow = false">取消</i-button>&nbsp;&nbsp;&nbsp;<i-button
                            @click="addList" type="primary">确定
                    </i-button>
                    </p>
                </div>
            </div>

            <!--编辑状态-->
            <div class="upData" v-show="upData">
                <p>编辑状态<img @click="upData = false" src="@/assets/imges/off.png" alt=""></p>
                <p>设置淘礼金金额：
                    <i-input v-model="bianjiData.money" type= "number" placeholder="请输入商品ID" style="width: 200px"></i-input>
                </p>
                <p>淘礼金实际数量：
                    <i-input v-model="bianjiData.Number" type= "number" placeholder="请输入商品ID" style="width: 200px"></i-input>
                </p>
                <p>设置淘礼金数量：
                    <i-input v-model="bianjiData.setNumber" type= "number" placeholder="请输入商品ID" style="width: 200px"></i-input>
                </p>
                <p>状态：
                    <Radio-group v-model="bianjiData.bianjiData">
                        <Radio label="已抢完"></Radio>
                        <Radio label="可抢购"></Radio>
                    </Radio-group>
                </p>


                <p style="text-align: right;margin-top: 30px">
                    <i-button type="dashed" @click="upData = false">取消</i-button>&nbsp;&nbsp;&nbsp;<i-button
                        @click="uptype" type="primary">确定
                </i-button>
                </p>
            </div>

        </div>

    </div>
</template>

<script>
	import {getGoodsById, addGoodsById, updateGoods} from '@/api/index.js'

	export default {
		name: "purchaseList",
		data() {
			return {
				id: '',
				self: this,
				addShow: false,
				upData: false,
				UpID: '',
				//头部
				header: [
					// {
					// 	type: 'selection',
					// 	width: 60,
					// 	align: 'center'
					// },
					{
						type: 'index',
						align: 'center',
						title: '编号',
						width: 70
					},
					{
						title: '商品名称',
						key: 'goodsName',
						width: '200',
						ellipsis: true
					},
					{
						title: '平台类型',
						key: 'platformType',
					},
					{
						title: '商品价格（劵后价）',
						key: 'minNormalPrice',
						width: '200'
					},
					{
						title: '淘礼金金额',
						key: 'tljPrice',
					},
					{
						title: '实付金额',
						key: 'real',
					},
					{
						title: '总数量',
						key: 'storeNum',
					},
					{
						title: '抢购数量',
						key: 'remainNum',
					},
					{
						title: '状态',
						key: 'gradStatus',
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
												this.upData = true
												this.UpID = params.row.id
												this.bianjiData.Number = params.row.storeNum
												this.bianjiData.money = params.row.tljPrice.split('¥')[1]
												this.bianjiData.setNumber = params.row.remainNum
											}
										}
									},
									"编辑状态"
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
											click: () => {
												let that = this
												this.$Modal.confirm({
													title: '确认删除该条内容吗',
													cancelText: '取消',
													okText: '确认',
													onOk: function () {
														that.isDelete(params.row.id, params.index)
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


				],
				// 数据
				data: [],
				addType: '1',
				// 普通商品
				commonly: {
					id: '',
					commonly: ''
				},
				bianjiData: {
					bianjiData: '',
					money: '',
					Number: '',
					setNumber: ''
				},
				taolingjin: {
					id: '',
					money: '',
					Number: '',
					setNumber: '',
					commonly: ''
				}
			}
		},
		created() {

			this.id = localStorage.getItem('purchaseListId');
			this.gitInit()
		},
		methods: {

			gitInit() {
				getGoodsById({
					method: 'get',
					data: {
						id: this.id,
					},
					qs: false
				}).then(res => {
					for (let i in res.data) {
						//平台
						switch (res.data[i].platformType) {
							case 3:
								res.data[i].platformType = '自营'
								break;
							case 2:
								res.data[i].platformType = '拼多多'
								break;
							case 1:
								res.data[i].platformType = '天猫'
								break;
							case 0:
								res.data[i].platformType = '淘宝'
								break
						}
						if (res.data[i].gradStatus == 0) {
							res.data[i].gradStatus = '已抢完'
						} else {
							res.data[i].gradStatus = '可抢购'
						}

						// if(res.data[i].goodsName.length >= 8){
						//
						// }
						//商品价格

						//原价  minGroupPrice
						//优惠卷 couponDiscount
						//淘领巾 tljPrice


						res.data[i].tljPrice = parseInt(res.data[i].tljPrice * 100)
						res.data[i].real = '¥' + (parseInt(res.data[i].minGroupPrice) - parseInt(res.data[i].tljPrice)) / 100
						if (res.data[i].real <= 0) {
							res.data[i].real = 0
						}
						res.data[i].minNormalPrice = '¥' + (parseInt(res.data[i].minGroupPrice) / 100)
						if (res.data[i].minNormalPrice <= 0) {
							res.data[i].minNormalPrice = 0
						}
						res.data[i].tljPrice = '¥' + parseInt(res.data[i].tljPrice) / 100
					}
					this.data = res.data

				})
			},
			addList() {
				let data = {}
				if (this.addType == 1) {
					data.id = this.id
					data.goodsIds = this.commonly.id
					if (this.commonly.commonly == '可抢购') {
						data.gradStatus = 1
					} else {
						data.gradStatus = 0
					}
					data.goodsType = this.addType
				} else {
					data.id = this.id
					data.goodsIds = this.taolingjin.id
					data.goodsTimes = this.taolingjin.Number
					data.tljPrices = this.taolingjin.money
					data.remainNum = this.taolingjin.setNumber
					if (this.commonly.commonly == '可抢购') {
						data.gradStatus = 1
					} else {
						data.gradStatus = 0
					}
					data.goodsType = this.addType
				}
				console.log(data)
				addGoodsById({
					method: 'post',
					data: data,
					qs: true
				}).then(res => {
					if (res.code == '0') {
						this.addShow = false
						this.gitInit();
					}
				}).catch(err => {
					this.$Notice.error({
						title: '请联系管理员+商品id',
					});
				})
			},
			isDelete(id, index) {
				let data = {
					id: id,
					isDelete: '1'
				}
				updateGoods({
					method: 'post',
					data: data,
					qs: false,
				}).then(res => {
					this.data.splice(index, 1);
				})
			},
			uptype() {
				if (this.bianjiData.bianjiData == '') {
					this.$Notice.error({
						title: '请选择修改状态！',
					});
				} else {
					let data = {
						id: this.UpID,
						storeNum: this.bianjiData.Number,
						tljPrice: this.bianjiData.money,
						remainNum: this.bianjiData.setNumber
					}
					if (this.bianjiData.bianjiData == '已抢完') {
						data.gradStatus = 0
					} else {
						data.gradStatus = 1
					}
					updateGoods({
						method: 'post',
						data: data,
						qs: true
					}).then(res => {
						if (res.code == '0') {
							this.$Notice.success({
								title: '已更新！！！',
							});
							this.gitInit();
							this.upData = false
							this.UpID = ''
							this.bianjiData.Number = ''
							this.bianjiData.money = ''
							this.bianjiData.setNumber = ''
						}
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
    .purchaseList {
        .header {
            p {
                text-align: right;
                button {
                    margin: 0 10px;
                }
            }
        }
        .cont {
            margin-top: 20px;
            position: relative;
            .add {
                z-index: 999;
                position: absolute;
                right: 0;
                top: 0;
                width: 400px;
                background: rgba(255, 255, 255, 1);
                border-radius: 4px;
                box-shadow: 2px 2px 10px #909090;
                box-sizing: border-box;
                padding: 10px 15px;
                .commonly {
                }
                p {
                    height: 40px;
                    line-height: 40px;
                    font-size: 16px;
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
            .upData {
                z-index: 999;
                position: absolute;
                right: calc(50% - 100px);
                top: 0;
                background: rgba(255, 255, 255, 1);
                box-shadow: 2px 2px 10px #909090;
                box-sizing: border-box;
                padding: 10px 15px;
                p {
                    height: 40px;
                    line-height: 40px;
                    font-size: 16px;
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
</style>

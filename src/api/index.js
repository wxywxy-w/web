import request from "@/libs/request.js";
//接口地址
const api = {
	backstage:'community/auth/add',
	community:'community/auth/upShelf',
	deleteComm:'community/auth/del',
	addComm:'community/auth/add',
	handleLogin:'login/login',
	bannerList:'banner/auth/getList',
	questLoginOut:'login/logOut',
	loginTest:'login/test',
	toContent:'community/auth/getList',
	addGoodlist_ZIYING:'goodsBank/auth/addCustomizeGoods',
	addPlatList: 'goodsBank/auth/addPlatformGoods',
	getRushTimeList:"/goodsRush/auth/getRushTimeList",   //获取活动的列表
	backstageUpdate:"/goodsRush/auth/update",      //更新活动上架下架
	addActiveData:"/goodsRush/auth/addActiveData",  //添加活动
	getGoodsById:"/goodsRush/auth/getGoodsById",   //获取该id下的商品列表
	addGoodsById:"/goodsRush/auth/addGoodsById", //添加商品
	updateGoods:"/goodsRush/auth/updateGoods", //更新商品信息
	getRobotList:"/robotManager/auth/getRobotList", //获取事情列表
	updateRobotManager:"/robotManager/auth/updateRobotManager",   //修改事情列表
	getUserList:"/robotManager/auth/getUserList",    //获取用户列表
	updateUser:"/robotManager/auth/updateUser", //修改用户列表
	deleteBanner:"/banner/auth/del",//删除banner
	goodsOptsList:'goodsOpts/auth/getList'//分类列表

}
export function backstage(obj){
	return request({
		url: api.backstage,
		method: obj.method,
		data: obj.data,
		qs:obj.qs
	});
}
//上下架
export function community(obj){
	return request({
		url: api.community,
		method: obj.method,
		data: obj.data,
		qs:obj.qs
	});
}
//删除发现
export function deleteComm(obj){
	return request({
		url: api.deleteComm,
		method: obj.method,
		data: obj.data,
		qs:obj.qs
	});
}
//添加发现
export function addComm(obj){
	return request({
		url: api.addComm,
		method: obj.method,
		data: obj.data,
		qs:obj.qs
	});
}
//登录
export function handleLogin(obj){
	console.log(obj+"indexobj")
	console.log(obj.qs+"indexobj")
	return request({
		url: api.handleLogin,
		method: obj.method,
		data: obj.data,
		qs:obj.qs
	});
}
//获取banner列表
export function bannerList(obj){
	return request({
		url: api.bannerList,
		method: obj.method,
		data: obj.data,
		qs:obj.qs
	});
}
//登出
export function questLoginOut(obj){
	return request({
		url: api.questLoginOut,
		method: obj.method,
		data: obj.data,
		qs:obj.qs
	});
}
//测试
export function loginTest(obj){
	return request({
		url: api.loginTest,
		method: obj.method,
		data: obj.data,
		qs:obj.qs
	});
}
//home列表
export function toContent(obj){
	return request({
		url: api.toContent,
		method: obj.method,
		data: obj.data,
		qs:obj.qs
	});
}
//商品库添加自营提交
export function addGoodlist_ZIYING(obj){
	return request({
		url: api.addGoodlist_ZIYING,
		method: obj.method,
		data: obj.data,
		qs:obj.qs
	});
}

//添加平台商品
export function addPlatList(obj){
	return request({
		url: api.addPlatList,
		method: obj.method,
		data: obj.data,
		qs:obj.qs
	});
}

//获取活动的列表
export function getRushTimeList(obj){
	return request({
		url: api.getRushTimeList,
		method: obj.method,
		data: obj.data,
		qs:obj.qs
	});
}
//更新活动上架下架
export function backstageUpdate(obj){
	return request({
		url: api.backstageUpdate,
		method: obj.method,
		data: obj.data,
		qs:obj.qs
	});
}
//添加活动
export function addActiveData(obj){
	return request({
		url: api.addActiveData,
		method: obj.method,
		data: obj.data,
		qs:obj.qs
	});
}
// 获取该id下的商品列表
export function getGoodsById(obj){
	return request({
		url: api.getGoodsById,
		method: obj.method,
		data: obj.data,
		qs:obj.qs
	});
}
//添加商品
export function addGoodsById(obj){
	return request({
		url: api.addGoodsById,
		method: obj.method,
		data: obj.data,
		qs:obj.qs
	});
}
//更新商品信息
export function updateGoods(obj){
	return request({
		url: api.updateGoods,
		method: obj.method,
		data: obj.data,
		qs:obj.qs
	});
}

//获取事情列表
export function getRobotList(obj){
	return request({
		url: api.getRobotList,
		method: obj.method,
		data: obj.data,
		qs:obj.qs
	});
}
//修改事情列表
export function updateRobotManager(obj){
	return request({
		url: api.updateRobotManager,
		method: obj.method,
		data: obj.data,
		qs:obj.qs
	});
}
//获取用户列表
export function getUserList(obj){
	return request({
		url: api.getUserList,
		method: obj.method,
		data: obj.data,
		qs:obj.qs
	});
}
//修改用户列表
export function updateUser(obj){
	return request({
		url: api.updateUser,
		method: obj.method,
		data: obj.data,
		qs:obj.qs
	});
}
//删除banner
export function deleteBanner(obj){
	return request({
		url: api.deleteBanner,
		method: obj.method,
		data: obj.data,
		qs:obj.qs
	});
}

//分类列表
export function goodsOptsList(obj){
	return request({
		url: api.goodsOptsList,
		method: obj.method,
		data: obj.data,
		qs:obj.qs
	});
}
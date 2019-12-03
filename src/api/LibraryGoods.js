import request from "@/libs/request.js";
//接口地址
const api = {
	goodsBank:'/backstage/goodsBank/auth/getList',
	shelves:"/goodsBank/auth/shelves",     //上下架商品库商品
	del:"goodsBank/auth/del",         //删除商品库商品
	addCustomizeGoods:"goodsBank/auth/addCustomizeGoods", //上传添加自定义商品

}
export function goodsBank(obj){
	return request({
		url: api.goodsBank,
		method: obj.method,
		data: obj.data,
		qs:obj.qs
	});
}

export function shelves(obj){
	return request({
		url: api.shelves,
		method: obj.method,
		data: obj.data,
		qs:obj.qs
	});
}
export function del(obj){
	return request({
		url: api.del,
		method: obj.method,
		data: obj.data,
		qs:obj.qs
	});
}

export function addCustomizeGoods(obj){
	return request({
		url: api.addCustomizeGoods,
		method: obj.method,
		data: obj.data,
		qs:obj.qs
	});
}


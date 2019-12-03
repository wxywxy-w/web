import axios from "axios";
import qs from 'qs'
axios.defaults.withCredentials = true

console.log("拦截")
var service = axios.create({
	// baseURL: 'http://7y8jfb.natappfree.cc/',
	baseURL: 'http://49.234.229.202:7088/backstage/',//测试
	// baseURL: 'http://47.98.106.35:17088/backstage/',//正式
	headers: {
		"Content-Type":"application/x-www-form-urlencoded"
	},
	timeout: 10000
});
//git请求过滤数据
function http_builder_url(url, data) {
	if(typeof(url) == 'undefined' || url == null || url == '') {
		return '';
	}
	if(typeof(data) == 'undefined' || data == null || typeof(data) != 'object') {
		return '';
	}
	url += (url.indexOf("?") != -1) ? "" : "?";
	for(var k in data) {
		url += ((url.indexOf("=") != -1) ? "&" : "") + k + "=" + encodeURI(data[k]);
	}
	return url;
}


service.interceptors.request.use(
	config => {
		axios.defaults.withCredentials = true

		config.headers['jesse']=document.cookie
		// console.log(document.cookie)
		// config.headers="03C7B7FDFE84ACC8E9053243B059550F"
		// git接口
		if(config.method == 'get'){
			config.url = http_builder_url(config.url,config.data)
		}
		else if(config.method == 'post'){
			config.data = qs.stringify(config.data)
		}
		//判断是否转换fromData的请求方式
		if(config.qs == true){
			config.data = qs.stringify(config.data)
		}
		return config;
	},
	error => {
			return Promise.reject(error);
	}
);
service.interceptors.response.use(
	success => {
		return success.data;
	},
	error => {
		return Promise.reject("daError=====" + error);
	}
);
export default service;

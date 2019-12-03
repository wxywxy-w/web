import request from "@/libs/request.js";
//接口地址
const api = {
    insertOrderDetailPost: '/post/auth/insertOrderDetailPost',  //添加物流信息


}
export function insertOrderDetailPost(obj) {
    return request({
        url: api.insertOrderDetailPost,
        method: obj.method,
        data: obj.data,
        qs: obj.qs
    });
}




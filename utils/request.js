import apiList from './apiList'   //  引入apiList.js文件

const apiRequest = (url, method, data, header) => {     //接收所需要的参数，如果不够还可以自己自定义参数
    let promise = new Promise(function (resolve, reject) {
        wx.request({
            url: url,
            data: data ? data : null,
            method: method,
            header: header ? header : { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (res) {
                //接口调用成功
                resolve(res);    //根据业务需要resolve接口返回的json的数据
            },
            fail: function (res) {
                // fail调用接口失败
                reject({ errormsg: '网络错误,请稍后重试', code: -1 });
            }
        })
    });
    return promise;  //注意，这里返回的是promise对象
}

//登录接口的调用
let login = (data, header) => {
    return new Promise((resolve, reject) => {
        resolve(apiRequest(apiList.login, 'post', data, header))
    })
}
//轮播图
let wheels = (data) => {
    return new Promise((resolve, reject) => {
        resolve(apiRequest(apiList.wheels, 'get', data))
    })
}
// 总分类
let category = (data) => {
    return new Promise((resolve, reject) => {
        resolve(apiRequest(apiList.category, 'get', data))
    })
}
// 分类=>商品列表
let getGoods = (data) => {
    return new Promise((resolve, reject) => {
        resolve(apiRequest(apiList.getGoods, 'get', data))
    })
}
//最后需要将具体调用的函数暴露出，给具体业务调用

export default {
    login: login,
    wheels: wheels,
    category: category,
    getGoods:getGoods
}

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
// 分类=>商品详情
let getGoodDetail = (data) => {
    return new Promise((resolve, reject) => {
        resolve(apiRequest(apiList.getGoodDetail, 'get', data))
    })
}
// 搜索
let search = (data) => {
    return new Promise((resolve, reject) => {
        resolve(apiRequest(apiList.search, 'get', data))
    })
}
// 精品推荐
let recommend = (data) => {
    return new Promise((resolve, reject) => {
        resolve(apiRequest(apiList.recommend, 'get', data))
    })
}
// 为你推荐/猜你喜欢
let guess = (data) => {
    return new Promise((resolve, reject) => {
        resolve(apiRequest(apiList.guess, 'get', data))
    })
}
// 商家信息
let shopInfo = (data) => {
    return new Promise((resolve, reject) => {
        resolve(apiRequest(apiList.shopInfo, 'get', data))
    })
}
// 添加到购物车
let addShop = (data, header) => {
    return new Promise((resolve, reject) => {
        resolve(apiRequest(apiList.addShop, 'post', data, header))
    })
}
//购物车 增加  减少  删除
let actionShop = (data, header) => {
    return new Promise((resolve, reject) => {
        resolve(apiRequest(apiList.actionShop, 'post', data, header))
    })
}
// 购物车查询
let getShop = (data, header) => {
    return new Promise((resolve, reject) => {
        resolve(apiRequest(apiList.getShop, 'get', data, header))
    })
}
// 购物车计算价格
let createPrice = (data, header) => {
    return new Promise((resolve, reject) => {
        resolve(apiRequest(apiList.createPrice, 'post', data, header))
    })
}
// 预约商家信息及餐桌列表
let subscribeIndex = (data) => {
    return new Promise((resolve, reject) => {
        resolve(apiRequest(apiList.subscribeIndex, 'get', data))
    })
}
// 断时间段是否在预约中
let subscribeTime = (data) => {
    return new Promise((resolve, reject) => {
        resolve(apiRequest(apiList.subscribeTime, 'get', data))
    })
}
// 预约动作
let subscribeAction = (data, header) => {
    return new Promise((resolve, reject) => {
        resolve(apiRequest(apiList.subscribeAction, 'post', data, header))
    })
}
// 获取优惠券
let getCoupon = (data, header) => {
    return new Promise((resolve, reject) => {
        resolve(apiRequest(apiList.getCoupon, 'get', data, header))
    })
}
// 领取优惠券
let doCoupon = (data, header) => {
    return new Promise((resolve, reject) => {
        resolve(apiRequest(apiList.doCoupon, 'post', data, header))
    })
}
// 我的优惠券

let myCoupon = (data, header) => {
    return new Promise((resolve, reject) => {
        resolve(apiRequest(apiList.myCoupon, 'post', data, header))
    })
}
// 订单页 预约生成订单
let orderCreat = (data, header) => {
    return new Promise((resolve, reject) => {
        resolve(apiRequest(apiList.orderCreat, 'post', data, header))
    })
}
// 订单页 线上支付生成订单
let orderPay = (data, header) => {
    return new Promise((resolve, reject) => {
        resolve(apiRequest(apiList.orderPay, 'post', data, header))
    })
}
// 订单状态
let orderStatus = (data, header) => {
    return new Promise((resolve, reject) => {
        resolve(apiRequest(apiList.orderStatus, 'get', data, header))
    })
}
// 预约状态
let myReserve = (data, header) => {
    return new Promise((resolve, reject) => {
        resolve(apiRequest(apiList.myReserve, 'get', data, header))
    })
}
// 呼叫店小二
let ylyCall = (data) => {
    return new Promise((resolve, reject) => {
        resolve(apiRequest(apiList.ylyCall, 'get', data))
    })
}
//最后需要将具体调用的函数暴露出，给具体业务调用
export default {
    login: login,
    wheels: wheels,
    category: category,
    getGoods: getGoods,
    getGoodDetail: getGoodDetail,
    search: search,
    recommend: recommend,
    guess: guess,
    shopInfo: shopInfo,
    addShop: addShop,
    actionShop: actionShop,
    getShop: getShop,
    createPrice: createPrice,
    subscribeIndex: subscribeIndex,
    subscribeTime: subscribeTime,
    subscribeAction: subscribeAction,
    getCoupon: getCoupon,
    doCoupon: doCoupon,
    myCoupon: myCoupon,
    orderCreat: orderCreat,
    orderPay: orderPay,
    orderStatus: orderStatus,
    myReserve: myReserve,
    ylyCall: ylyCall
}

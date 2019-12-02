
let host = 'https://saoma.jishanhengrui.com'   // 设置API接口的ip地址和端口
let apiList = {
    login: host + '/api/wxapp/public/login',     //用户登录的API
    wheels:host+"/api/goods/shop/wheels",//轮播图
    category:host+"/api/goods/category",//总分类
    getGoods:host+"/api/goods/goods/get_goods"
}

module.exports = apiList;    //暴露出来


let host = 'https://saoma.jishanhengrui.com'   // 设置API接口的ip地址和端口
let apiList = {
    login: host + '/api/wxapp/public/login',     //用户登录的API
    wheels: host + "/api/goods/shop/wheels_content",//轮播图和商家介绍
    category: host + "/api/goods/category",//总分类
    getGoods: host + "/api/goods/goods/get_goods",//分类=>商品列表
    getGoodDetail: host + "/api/goods/goods/goods_detail",//分类=>商品详情
    search: host + "/api/goods/goods/search",//搜索
    recommend: host + "/api/goods/goods/good_goods",//精品推荐
    guess: host + "/api/goods/goods",// 为你推荐/猜你喜欢
    shopInfo: host + "/api/goods/shop/shop_info",//商家信息
    addShop: host + "/api/goods/goods/add_shopcar",//添加到购物车 
    actionShop: host + "/api/goods/goods/action_shopcar",//购物车 增加  减少  删除  
    getShop: host + "/api/goods/goods/shopcar",//购物车查询
}

module.exports = apiList;    //暴露出来

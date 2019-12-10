
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
    createPrice: host + "/api/goods/order/create_price",// 购物车计算价格
    subscribeIndex: host + "/api/goods/reserve",//预约商家信息及餐桌列表
    subscribeTime: host + "/api/goods/reserve/isset_reserve_time",//断时间段是否在预约中
    subscribeAction: host + "/api/goods/reserve/do_reserve",//预约动作
    getCoupon: host + "/api/goods/coupon",//获取优惠券
    doCoupon: host + "/api/goods/coupon/do_coupon",// 领取优惠券
}

module.exports = apiList;    //暴露出来

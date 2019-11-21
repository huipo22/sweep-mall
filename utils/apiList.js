
let host = 'http://127.0.0.1:3001'   // 设置API接口的ip地址和端口
let apiList = {
    login: host + '/user/login',     //用户登录的API
    register: host + '/user/register',   //用户注册的API
    //...

}

module.exports = apiList;    //暴露出来

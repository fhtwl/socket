// http异常
class HttpException extends Error{
    // constructor 是一种用于创建和初始化class创建的对象的特殊方法。
    constructor(msg='服务器异常，请联系管理员',errorCode=10000,code=400) {
        super()
        this.message = msg
        this.errorCode = errorCode
        this.code = code
        this.success = false
    }
}
// http参数异常
class ParameterException extends HttpException {
    constructor(msg,errorCode) {
        super()
        this.code = 400
        this.message = msg || '参数错误'
        this.errorCode = errorCode || 10000
        this.success = false
    }
}

// http请求成功
class Success extends HttpException {
    constructor(msg,errorCode,data) {
        super()
        this.code = 200//200查询成功，201操作成功
        this.message = msg || 'ok'
        this.errorCode = errorCode || 0
        this.success = true
        this.data = data
    }
}
// 404
class NotFount extends HttpException {
    constructor(msg,errorCode) {
        super()
        this.code = 404
        this.message = msg || '资源未找到'
        this.errorCode = errorCode || 10001
        this.success = false
    }
}
// 授权失败
class AuthFailed extends HttpException {
    constructor(msg,errorCode) {
        super()
        this.code = 401
        this.message = msg || '授权失败'
        this.errorCode = errorCode || 10002
        this.success = false
    }
}
// 禁止访问
class Forbbiden extends HttpException {
    constructor(msg,errorCode) {
        super()
        this.code = 403
        this.message = msg || '禁止访问'
        this.errorCode = errorCode || 100006
        this.success = false
    }
}
// 登录过期
class LoginExpired extends HttpException {
    constructor(msg,errorCode) {
        super()
        this.code = 402
        this.message = msg || '登录已过期，请重新登录'
        this.errorCode = errorCode || 100007
        this.success = false
    }
}

// 查询失败
class QueryFailed extends HttpException {
    constructor(msg,errorCode) {
        super()
        this.code = 500
        this.message = msg || '未查到匹配的数据'
        this.errorCode = errorCode || 100006
        this.success = false
    }
}

module.exports = {
    HttpException,
    ParameterException,
    Success,
    NotFount,
    AuthFailed,
    Forbbiden,
    QueryFailed,
    LoginExpired 
}
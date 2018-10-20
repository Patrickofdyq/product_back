let encryptUtil = require("../utils/encryptUtil");
let config = require("../config");
let userService = require("../service/user");

function checkUrl(url) {
    let ignoreUrls = [
        /\/user\/regist/,
        /\/user\/login/
    ]

    let isNeedCheck = true

    for (let i = 0; i < ignoreUrls.length; i++) {
        let ignoreUrl = ignoreUrls[i]
        if (ignoreUrl.test(url)) {
            isNeedCheck = false
            break
        }
    }
    return isNeedCheck
}

module.exports = async (request, response, next) => {
    let url = request.url

    if (checkUrl(url)) {
        let token = request.get("token")
        if (!token) {
            throw Error("请求头中没有token数据，请重新登录")
        }

        let tokenDecrypted = null
        try {
            tokenDecrypted = encryptUtil.aesDecrypt(token, config.TOKEN_KEY)
        } catch (e) {
            throw Error("token解密失败，请重新登录")
        }

        let tokenJS = JSON.parse(tokenDecrypted)
        let expire = tokenJS.expire
        if (expire < Date.now()) {
            throw Error("token已过期，请重新登录")
        }

        let username = tokenJS.username
        let user = await userService.findUserByUsername(username)
        if (!user) {
            throw Error("token中的用户名无效，请重新登录")
        }
        // 把查询到的用户存储到request对象身上
        request.user = user
    }
    //最后别忘了放行，因为是中间件
    next()
}
let permissions = [{
    role: 0,
    urls: [
        /\/category.*/,
        /\/order.*/,
        /\/product.*/
    ]
}, {
    role: 100,
    urls: [
        /.*/
    ]
}]


module.exports = (request, response, next) => {
    let reqUrl = request.url
    let user = request.user
    if (user) {
        let isGo = false
        outter:for (let i = 0; i < permissions.length; i++) {
            let permission = permissions[i]
            if (user.role === permission.role) {
                let urls = permission.urls
                for (let j = 0; j < urls.length; j++) {
                    let url = urls[j]
                    if (url.test(reqUrl)) {
                        isGo = true
                        break outter
                    }
                }
            }
        }
        if (!isGo) {
            throw Error("您没有权限访问该url！")
        }
    }
    next()
}
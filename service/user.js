let User = require("../modle/user");
let encryptUtil = require("../utils/encryptUtil");
let config = require("../config");


async function regist(user) {
    if (await findUserByUsername(user.username)) {
        throw Error(`用户名为${user.username}的用户已经存在！`)
    }
    user.password = encryptUtil.md5Hmac(user.password, user.username)
    user.role = 0
    let result = await User.create(user);
    result.password = ""
    return result
}

async function isExistByUsername(username) {
    if (!await User.findOne({username: username})) {
        throw Error(`用户名为${username}的用户不存在！`)
    }
}

async function deleteUserByUsername(username) {
    await isExistByUsername(username)
    let result = await User.deleteOne({username: username});
    if (result.n != 1) {
        throw Error('删除失败')
    }
}

async function login(user) {
    await isExistByUsername(user.username)
    if (user.password == null || user.password.trim().length == 0) {
        throw Error("密码不能为空")
    }
    user.password = encryptUtil.md5Hmac(user.password, user.username)
    let result = await User.findOne(user)
    if (!result) {
        throw Error("用户名或者密码错误")
    }
    let token = {
        username: user.username,
        expire: Date.now() + config.TOKEN_EXPIRE
    }

    let encryptToken = encryptUtil.aesEncrypt(JSON.stringify(token), config.TOKEN_KEY)

    return encryptToken
}

async function findUserByUsername(username) {
    //TODO  应该是查询结果不展示密码----selete("password")
    return await User.findOne({username: username}).select("-password")
}

module.exports = {
    regist,
    deleteUserByUsername,
    login,
    findUserByUsername
}

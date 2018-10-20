let userService = require("../service/user");
let router = require("express").Router();

router.post("/regist", async (request, response) => {
    let result = await userService.regist(request.body)
    response.success(result)
})

router.get("/findUser/:username", async (request, response) => {
    let result = await userService.findUserByUsername(request.params.username)
    response.success(result)
})

router.post("/login", async (request, response) => {
    let result = await userService.login(request.body)
    response.success(result)
})

router.delete("/delete/:username", async (request, response) => {
    await userService.deleteUserByUsername(request.params.username)
    response.success()//删除和更新一般不返回值
})

module.exports = router

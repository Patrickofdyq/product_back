let orderService = require("../service/order");
let router = require("express").Router();

router.post("/addOrder", async (request, response) => {
    let result = await orderService.addOrder(request.body)
    response.success(result)
})

router.get("/findOrder", async (request, response) => {
    let result = await orderService.findOrder(request.query.page)
    response.success(result)
})

module.exports = router
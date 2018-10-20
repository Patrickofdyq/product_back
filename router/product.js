let productService = require("../service/product");
let router = require("express").Router();

router.post("/addProduct", async (request, response) => {
    let result = await productService.addProduct(request.body)
    response.success(result)
})

router.delete("/deleteProduct/:id", async (request, response) => {
    await productService.deleteProduct(request.params.id)
    response.success()
})

router.put("/updateProduct/:id", async (requset, response) => {
    await productService.updateProduct(requset.params.id, requset.body)
    response.success()
})

router.get("/findProduct", async (request, response) => {
    let result = await productService.findProduct(request.query.page)
    response.success(result)
})

module.exports = router
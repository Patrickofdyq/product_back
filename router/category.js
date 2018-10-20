let categoryService = require("../service/category");
let router = require("express").Router();

router.post("/addCategory", async (request, response) => {
    let result = await categoryService.addCategory(request.body)
    response.success(result)
})

router.get("/findCategory", async (request, response) => {
    let result = await categoryService.findCategory(request.query.page)
    response.success(result)
})

router.delete("/deleteCategory/:id", async (request, response) => {
    await categoryService.deleteCategory(request.params.id)
    response.success()
})

//居然是右边括号的位置错误，以后要注意！
router.put("/updateCategory/:id", async (request, response) => {
    await categoryService.updateCategory(request.params.id, request.body)
    response.success()
})

/*router.put("/updateCategory/:id", async (request, response) => {
    await categoryService.updateCategory(request.params.id, request.body);
    response.success();
})*/

module.exports = router
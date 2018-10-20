let Category = require("../modle/category");
let config = require("../config");

async function addCategory(category) {
    if (await Category.findOne({name: category.name})) {
        throw Error(`名字为${category.name}的商品类别已经存在！`)
    }
    return await Category.create(category)
}

async function deleteCategory(id) {
    if (!await Category.findOne({_id: id})) {
        throw Error(`id为${id}的商品类别不存在！`)
    }
    let result = await Category.deleteOne({_id: id})
    if (result.n !== 1) {
        throw Error("删除失败")
    }
}

async function updateCategory(id, category) {
    if (!await Category.findOne({_id: id})) {
        throw Error(`id为${id}的商品类别不存在！`)
    }
    let result = await Category.updateOne({_id: id}, category)

    if (result.n !== 1) {
        throw Error("更新失败")
    }
}

async function findCategory(page = 1) {
    let offset = (page - 1) * config.PAGE_SIZE
    return await Category.find().skip(offset).limit(config.PAGE_SIZE)
}

module.exports = {
    addCategory,
    deleteCategory,
    updateCategory,
    findCategory
}
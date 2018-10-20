let Product = require("../modle/product");
let config = require("../config");

async function addProduct(product) {
    if (await Product.findOne({name: product.name})) {
        throw Error(`${product.name}的商品名称已经存在！`)
    }
    return await Product.create(product)
}

async function deleteProduct(id) {
    await isExistById(id)
    let result = await Product.deleteOne({_id: id})
    if (result.n !== 1) {
        throw Error("删除失败")
    }
}

async function isExistById(id) {
    if (!await Product.findOne({_id: id})) {
        throw Error(`id为${id}的商品不存在！`)
    }
}

async function updateProduct(id, product) {
    await isExistById(id)
    let result = await Product.updateOne({_id: id}, product)
    if (result.n !== 1) {
        throw Error("更新失败")
    }
}

async function findProduct(page = 1) {
    return await Product.find().skip((page - 1) * config.PAGE_SIZE).limit(config.PAGE_SIZE)
}

async function findProductById(id) {
    return await Product.findOne({_id: id})
}

module.exports = {
    addProduct,
    deleteProduct,
    updateProduct,
    findProduct,
    findProductById
}
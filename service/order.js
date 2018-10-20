let Order = require("../modle/order");
let productService = require("./product");
let Big = require("big.js");
let config = require("../config");

async function addOrder(order) {
    let product = await productService.findProductById({_id: order.productId})
    if (!product) {
        throw Error(`id为${order.productId}的商品不存在`)
    }
    order.productName = product.name
    order.productPrice = product.price
    if (order.productStock > product.stock) {
        throw Error("库存不足，请修改购买数量")
    }
    order.total = Big(product.price).times(order.productStock)
    let result = await Order.create(order)
    await productService.updateProduct({_id: product.id}, {stock: product.stock - order.productStock})
    return result
}


async function findOrder(page = 1) {
    return await Order.find().skip((page - 1) * config.PAGE_SIZE).limit(config.PAGE_SIZE)
}

module.exports = {
    findOrder,
    addOrder
}
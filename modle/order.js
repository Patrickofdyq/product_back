let mongoose = require("mongoose");
let orderSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        require: [true, "商品id不能为空"]
    },
    productName: {
        type: String,
        require: [true, "商品名称不能为空"]
    },
    productPrice: {
        type: String,
        require: [true, "商品价格不能为空"]
    },
    productStock: {
        type: Number,
        require: [true, "商品数量不能为空"]
    },
    total: String,
    status: {
        type: String,
        default: "unpay"
    },
    createtime: {
        type: Date,
        default: Date.now()
    },
    canceltime: Date,
    paytime: Date
})

module.exports = mongoose.model("order", orderSchema)
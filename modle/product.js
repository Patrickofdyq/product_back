let mongoose = require("mongoose");
let productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "商品名称不能为空"],
        unique: true
    },
    price: {
        type: String,
        require: [true, "商品价格不能为空"],
    },
    stock: {
        type: Number,
        require: true,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        require: [true, "商品类别不能为空"]
    },
    createtime: {
        type: Date,
        default: Date.now()
    },
    description: {
        type: String,
    },
    isOnSale: {
        type: Boolean,
        default: true
    }
})
module.exports = mongoose.model("product", productSchema)
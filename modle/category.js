let mongoose = require("mongoose");
let categorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "类别不能为空"],
        unique: [true, "类别不能重复"]
    },
    createtime: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("category", categorySchema)
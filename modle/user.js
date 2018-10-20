let mongoose = require("mongoose");


let userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, "用户名不能为空"],
        unique: [true, "用户名不能重复"]
    },
    password: {
        type: String,
        require: [true, "密码不能为空"]
    },
    role: {
        type: Number,
        default: 0
    },
    createdtime: {
        type: Date,
        default: Date.now()
    },
    age: {
        type: Number,
        min: [0, "年龄不能小于0"],
        max: [120, "年龄不能大于120"]
    }
})

module.exports = mongoose.model("user", userSchema)
let mongoose = require("mongoose");
let config = require("./config");
mongoose.connect("mongodb://localhost/" + config.DB, {useNewUrlParser: true})


let connection = mongoose.connection;

connection.on("error", err => {
    console.log("数据库连接失败：" + err.toString())
})

connection.on("open", () => {
    console.log("数据库连接成功")
})
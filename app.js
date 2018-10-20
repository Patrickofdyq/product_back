require("express-async-errors")
require("./db")
let config = require("./config");

let express = require("express");
let morgan = require("morgan");
let app = express();
app.use(require("./middleware/resmiddle"))
app.use(require("./middleware/tokenmiddle"))
app.use(require("./middleware/permissionmiddle"))
app.use(express.json())
app.use("/user", require("./router/user"))
app.use("/category", require("./router/category"))
app.use("/product", require("./router/product"))
app.use("/order", require("./router/order"))
app.use(morgan("combined"))

app.use((err, request, response, next) => {
    response.fail(err)
})
app.listen(config.PORT)

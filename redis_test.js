let redis = require("redis");
require("./db")
let client = redis.createClient();
let util = require("util");
//restful转异步方法需要绑定client对象，如下
let promisifyGet = util.promisify(client.get).bind(client);
let promisifyLrange = util.promisify(client.lrange).bind(client);
let promisifyLlen = util.promisify(client.llen).bind(client);
client.on("error", err => {
    console.log("redis连接失败:" + err.toString())
})

async function testSetAndGet() {
    // client.set("abc","床前明月光，疑是地上霜")
    console.log(await promisifyGet("abc"))
}

// testSetAndGet()
async function testlist() {
    client.rpush("aaa", "a")
    client.rpush("aaa", "b")
    client.rpush("aaa", "c")
}

// testlist()
async function testGetList() {
    let result = await promisifyLrange("aaa", "0", "-1")
    console.log(result)
}

// testGetList()
let Product = require("./modle/product");
let key = "products"

async function prepareProduct() {
    let products = await Product.find();
    products.forEach(p => {
        client.rpush(key, JSON.stringify(p))
    })
}

// prepareProduct()

async function getByPage(page = 1) {

    if (await promisifyLlen("products") > 0) {
        let pagesize = 3
        let skip = (page - 1) * pagesize
        let stop = skip + pagesize - 1
        console.log(await promisifyLrange(key, skip, stop))
    }
}

getByPage(1)
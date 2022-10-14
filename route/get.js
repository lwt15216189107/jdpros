const express = require('express')
const get = express.Router()
const { db } = require('../db/db')

get.get('/login', (req, res) => {
    res.send('ok')
})
get.get("/index", (req, res) => {
    const sql = `select * from goods`
    db.query(sql, (err, data) => {
        if (err) return console.log(err);
        res.send(data)
    })
})
// 按销量排
get.get("/sales", (req, res) => {
    const sql = `select * from goods order by ranking asc`
    db.query(sql, (err, data) => {
        if (err) return console.log(err);
        res.send(data)
    })
})
// 按好评排
get.get("/good", (req, res) => {
    const sql = `select * from goods order by good desc`
    db.query(sql, (err, data) => {
        if (err) return console.log(err);
        res.send(data)
    })
})
// 按价格排
// 升序
get.get("/pricea", (req, res) => {
    const sql = `select * from goods order by price asc`
    db.query(sql, (err, data) => {
        if (err) return console.log(err);
        res.send(data)
    })
})
// 降序
get.get("/priced", (req, res) => {
    const sql = `select * from goods order by price desc`
    db.query(sql, (err, data) => {
        if (err) return console.log(err);
        res.send(data)
    })
})
get.get("/decoration", (req, res) => {
    const sql = `select * from goods order by good desc limit 3 `
    db.query(sql, (err, data1) => {
        if (err) return console.log(err);
        const sql = `select * from goods where classfy = '电吹风' order by ranking desc limit 3 `
        db.query(sql, (err, data2) => {
            if (err) return console.log(err);
            const sql = `select * from goods`
            db.query(sql, (err, data3) => {
                if (err) return console.log(err);
                const data = [data1, data2, data3]
                res.send(data)
            })
        })
    })
})
get.get("/details/:id", (req, res) => {
    let { id } = req.params;
    id = id.slice(1)
    const sql = `select * from goods where id = ${id}`
    db.query(sql, (err, data1) => {
        if (err) return console.log(err);
        const sql = `select img1,img2,img3,img4 from goods where id = ${id}`
        db.query(sql, (err, data2) => {
            if (err) return console.log(err);
            const sql = `select img5,img6,img7,img8 from goods where id = ${id}`
            db.query(sql, (err, data3) => {
                if (err) return console.log(err);
                const data = [data1, data2, data3]
                res.send(data)
            })
        })
    })
})
// 获取规格数据
get.get("/getdata/:id", (req, res) => {
    let { id } = req.params;
    const sql = `select * from goods where id = ${id}`
    db.query(sql, (err, data) => {
        res.send(data)
    })
})
// 获取购物车商品数据
get.get("/getshopping", (req, res) => {
    const sql = `select * from shopping where num >0`
    db.query(sql, (err, data) => {
        res.send(data)
    })
})
// 购物车商品数量增加
get.get("/add/:id/:size", (req, res) => {
    let { id, size } = req.params;
    const sql = `select * from shopping where id = ${id} and size = "${size}"`
    db.query(sql, (err, data) => {
        let { num } = data[0]
        num += 1
        const sql1 = `update shopping set num=${num} where id=${id} and size = "${size}"`
        db.query(sql1, (err, data1) => {
            res.send(data)
        })
    })
})
// 购物车商品数量减少
get.get("/reduce/:id/:size", (req, res) => {
    let { id, size } = req.params;
    const sql = `select * from shopping where id = ${id} and size = "${size}"`
    db.query(sql, (err, data) => {
        let { num } = data[0]
        num -= 1
        const sql1 = `update shopping set num=${num} where id=${id} and size = "${size}"`
        db.query(sql1, (err, data1) => {
            res.send(data)
        })
    })
})
// 购物车商品数量删除
get.get("/delete/:id/:size", (req, res) => {
    let { id, size } = req.params;
    const sql = `select * from shopping where id = ${id} and size = "${size}"`
    db.query(sql, (err, data) => {
        let { num } = data[0]
        num = 0
        const sql1 = `update shopping set num=${num} where id=${id} and size = "${size}"`
        db.query(sql1, (err, data1) => {
            res.send(data)
        })
    })
})
// // 将点击结算商品加入数据库
get.get("/addbuy/:id/:size", (req, res) => {
    let { id, size } = req.params;
    const sql = `select * from shopping where id = ${id} and size = "${size}"`
    db.query(sql, (err, data) => {
        let { num } = data[0]
        console.log(num);
        const sql1 = `update shopping set num2=${num},num3=${num} where id=${id} and size = "${size}"`
        db.query(sql1, (err, data1) => {
            res.send(data)
        })
    })
})
// 购物车商品数据清空
get.get("/empty", (req, res) => {
    const sql = `update shopping set num = 0 where num2>0`
    db.query(sql, (err, data) => {
        res.send(data)
    })
})
// 结算商品数据清空
get.get("/empty1", (req, res) => {
    const sql = `update shopping set num2 = 0 where num2>0`
    db.query(sql, (err, data) => {
        res.send(data)
    })
})
// 获取结算商品数据
get.get("/getbuy", (req, res) => {
    const sql = `select * from shopping where num2 >0`
    db.query(sql, (err, data) => {
        res.send(data)
    })
})
//将不同状态存入
get.get("/state/:id", (req, res) => {
    let { id } = req.params;
    const sql = `update shopping set state = ${id} where num2>0`
    db.query(sql, (err, data) => {
        res.send(data)
    })
})
// 获取订单商品数据
get.get("/getstate/:num", (req, res) => {
    let { num } = req.params;
    if (num == 0) {
        const sql = `select * from shopping where state >0`
        db.query(sql, (err, data) => {
            res.send(data)
        })
    } else {
        const sql = `select * from shopping where state =${num}`
        db.query(sql, (err, data) => {
            res.send(data)
        })
    }
})
//切换状态
get.get("/switch/:id/:state/:size", (req, res) => {
    let { id, state,size } = req.params;
    console.log(size);
    const sql = `update shopping set state = ${state} where id=${id} and size = "${size}"`
    db.query(sql, (err, data) => {
        res.send(data)
    })
})
module.exports = { get }
const express = require('express')
const jwt = require('jsonwebtoken')
const { db } = require('../db/db')
const bcrypt = require('bcryptjs')
const post = express.Router()
const salt = bcrypt.genSaltSync(10);
const secretKey = 'lwt123456'
post.use(express.json())

post.post('/login', (req, res) => {
    const date = new Date()
    let { username, password } = req.body;
    const sql = `select * from users where username="${username}"`
    db.query(sql, (err, data) => {
        if (err) return console.log(err);
        if (data[0]) {
            const sql1 = `select password from users where username="${username}"`
            db.query(sql1, (err, data) => {
                const date = new Date()
                if (err) return console.log(err)
                if (bcrypt.compareSync(password, data[0].password)) {
                    const time = `update users set login_time= now() where username="${username}"`
                    db.query(time, (err, data) => {
                        // res.send('登录成功')
                        const tokenStr = jwt.sign({ username: username }, secretKey, { expiresIn: '1h' })
                        res.send({
                            token: 'Bearer ' + tokenStr
                        })
                    })

                } else {
                    console.log(data[0].password);
                    res.send('密码错误')
                }
            })

        } else {
            console.log(data.username);
            res.send('账户不存在')
        }
    })
})

post.post('/rej', (req, res) => {
    const date = new Date()
    let { username, password } = req.body;
    const hc = bcrypt.hashSync(password, salt)
    const sql = `select * from users where username="${username}"`
    db.query(sql, (err, data) => {
        if (err) return console.log(err);
        if (data[0]) {
            console.log(data);
            res.send('注册失败，已有账号')
        } else {
            const time = `insert into users (username,password,rej_time) values ("${username}","${hc}",now()) `
            db.query(time, (err, data) => {
                if (err) return console.log(err)
                data.affectedRows == 1 ? res.send('注册成功') : res.send('因网络问题，注册失败，请重新注册')
                console.log(data);
            })
        }
    })
})

post.post("/classfy", (req, res) => {
    const arr = ['所有商品', '电吹风', '电动牙刷', '剃须刀', '修足器', '夹发器']
    let { index } = req.body
    index = arr[index]
    console.log(index);
    let sql;
    if (index == '所有商品') {
        sql = `select * from goods`
    } else {
        sql = `select * from goods where classfy = "${index}"`
    }
    db.query(sql, (err, data) => {
        if (err) return console.log(err);
        console.log(data);
        res.send(data)
    })
})
// 加入购物车
post.post("/addshopping", (req, res) => {
    let { title, price, img, size, num, id } = req.body;
    sql = `select * from shopping where id = ${id} and size = "${size}"`
    db.query(sql, (err, data) => {
        if (err) return console.log(err);
        if (data.length == 0) {
            const sql1 = `insert into shopping (id,title,price,img,size,num) values (${id},"${title}",${price},"${img}","${size}",${num})`
            db.query(sql1, (err, data) => {
                if (err) return console.log(err);
                res.send()
            })
        } else {
            let n = data[0].num + num
            const sql1 = `update shopping set num = ${n} where id =${id} and size = "${size}" `
            db.query(sql1, (err, data) => {
                if (err) return console.log(err);
                res.send()
            })
        }
    })
})
// 立即购买
post.post("/addacounts", (req, res) => {
    let { title, price, img, lsize, lnum, id } = req.body;
    sql = `select * from shopping where id = ${id} and size = "${lsize}"`
    db.query(sql, (err, data) => {
        if (err) return console.log(err);
        if (data.length == 0) {
            const sql1 = `insert into shopping (id,title,price,img,size,num2,num3) values (${id},"${title}",${price},"${img}","${lsize}",${lnum},${lnum})`
            db.query(sql1, (err, data) => {
                if (err) return console.log(err);
                res.send()
            })
        } 
        else {
            console.log(data.length);
            console.log(lnum);
            const sql1 = `update shopping set num2 = ${lnum} where id =${id} and size = "${lsize}" `
            db.query(sql1, (err, data) => {
                if (err) return console.log(err);
                res.send()
            })
        }

    })
})
module.exports = { post }
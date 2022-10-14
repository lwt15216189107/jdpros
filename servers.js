const express = require('express')
const { post } = require('./route/post')
const { get } = require('./route/get')
const { expressjwt:expressJWT } = require('express-jwt')
const app = express()
const path = require('path')

// app.set("view engine", "ejs");
// app.set("views", `${path.join(__dirname + '/static')}`)
app.use(express.urlencoded({ extended: false }))
app.use(express.static('./static'))
// app.engine('html', require('ejs').__express);


const secretKey = 'lwt123456'
app.use(expressJWT({ secret: secretKey, algorithms: ['HS256'] }).unless({ path: [/^\/login/] }))
app.use(post)
app.use(get)
// 错误中间件
app.use((err, req, res, next)=> {
    if (err.name === 'UnauthorizedError') {
        return res.send({
            status: 1,
            message:'身份认证失败'
        })
    }
    res.send({
        status: 500,
        message:'未知的错误'
    })
})

app.listen(3000, () => {
    console.log('服务器创建成功');
})
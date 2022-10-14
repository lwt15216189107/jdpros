const mysql = require('mysql')
const db =mysql.createPool({
    host:'localhost',
    user:'root',
    password:'lwt123',
    database:'jdpro'
})
db.getConnection((err,data)=>{
    if(err) console.log(err);
    console.log('数据库连接成功');
})
module.exports = {db};
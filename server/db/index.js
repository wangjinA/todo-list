const mysql = require('mysql');
const conf = require('./config');

function getConnection(sql) {
  const pool = mysql.createPool(conf.mysql);
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err);
        return reject('连接数据库出错')
      }
      connection.query(sql, (err, result) => {
        // console.log(result);
        // console.log(sql);
        if (err) {
          console.log(err);
          return reject('SQL查询出错' + err.toString())
        }
        resolve(result)
        pool.end();
      })
    })
  })
}

function isRes(res) {
  return res && res.length
}

module.exports = {
  // 登录
  login({ userName, password }) {
    let loginSql = `select * FROM  users WHERE userName='${userName}' AND password='${password}'`
    return getConnection(loginSql)
  },
  // 注册
  register({ userName, password }) {
    let judgeSql = `select userName from users WHERE userName='${userName}'`
    return getConnection(judgeSql).then(res => {
      if (isRes(res)) {
        return ''
      } else {
        let registerSql = `insert into users (userName, password) VALUES ('${userName}', '${password}')`
        return getConnection(registerSql)
      }
    })
  },
  // 获取所有用户
  getAllUser() {
    let sql = `select * from users`
    return getConnection(sql)
  },
  getTodoList() {
    let sql = `select * from todoList`
    return getConnection(sql)
  },
  addTodoList({name, content, status, createTime, id}) {
    let currentTime = new Date().toLocaleString()
    let sql = `insert into todoList(name, content, status, createTime, updateTime) values (${name, content, status, currentTime, currentTime})`
    if (id) {
      console.log(id);
      sql = `UPDATE todoList set name='${name}',content='${content}', status=${status}, updateTime=${currentTime} WHERE id=${id}`
    }
    return getConnection(sql)
  }
}
/*
* @Author: 汪锦
* @Date: 2020-06-19 09:54:14
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-09-14 15:25:45
* @Description: node-server
*/
const express = require('express')
const app = express()
const routes = require("./router");
const path = require('path')
const logger = require('./models/logger')
global.bus = new (require('events'))
const { initUsers } = require('./models/globalVariable')
// 缓存用户表
initUsers()

// body解析中间件---------------------start
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json(); // 创建application/json解析
var urlencodedParser = bodyParser.urlencoded({ extended: false }); // 创建application/x-www-form-urlencoded

app.use(jsonParser)
app.use(urlencodedParser)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// body解析中间件---------------------end


// 日志中间件-------------------------start
app.use((req, res, next) => {
  console.log(req.body);
  let paramsStr
  switch (req.method) {
    case 'GET':
      paramsStr = req.query
      break;
    case 'POST':
      paramsStr = req.body
      break;
    default:
      paramsStr = {}
      break;
  }
  logger.info(` ${req.method} - ${req.url} - ${JSON.stringify(paramsStr)} `)
  next()
})
// 日志中间件-------------------------end

// 静态资源缓存
const staticConfig = {
  maxAge: '2h'
}

app.use('/', express.static(path.join(__dirname, '/public'), staticConfig))
app.use('/node_modules', express.static(path.join(__dirname, '/node_modules'), staticConfig))
app.use(routes)


const PORT = 3000
let server = app.listen(PORT, () => {
  console.log(`running http://localhost:${PORT} ...`);
})
// 初始化socket.io
const initSocket = require('./models/socket')
initSocket(server)
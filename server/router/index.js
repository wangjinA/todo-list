const { SuccessModel, ErrorModel } = require('../models/resModel')
const express = require('express');
const router = express.Router()
const db = require('../db')
const { sign, verify } = require('../models/token')
const compressing = require('compressing');
const { setUsers } = require('../models/globalVariable')

/**
 * @api {post} /api/login 用户登录
 * @apiDescription 用户登录
 * @apiName login
 * @apiGroup User
 * @apiParam {string} userName 用户名
 * @apiParam {string} password 密码
 * @apiSuccess {json} data 数据
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "status" : 1,
 *      "data" : {
 *          "name" : "loginName",
 *          "password" : "loginPass"
 *      }
 *  }
 * @apiSampleRequest http://localhost:3000/api/login
 * @apiVersion 1.0.0
 */
router.post('/api/login', (req, res) => {
  if (!req.body.userName || !req.body.password) {
    res.send({
      msg: '用户名或密码不能为空',
      status: 0
    })
  } else {
    db.login(req.body).then(result => {
      if (result && result.length)
        res.send(new SuccessModel({
          userInfo: result[0],
          ...sign(req)
        }, '登陆成功',
        ))
      else
        res.send(new ErrorModel('用户名或密码错误'))
    }).catch(err => {
      res.send(new ErrorModel(err))
    })
  }
})

// 注册
router.post('/api/register', (req, res) => {
  if (!req.body.userName || !req.body.password) {
    res.send(new ErrorModel('用户名和密码不能为空'))
  } else {
    db.register(req.body).then(result => {
      if (result && result.affectedRows) {
        res.send(new SuccessModel({}, '注册成功'))
        login(req.body).then(result => {
          if (result && result.length)
            setUsers(result[0]) // 创建用户之后更新一下用户表缓存
        })
      }
      else
        res.send(new ErrorModel('注册失败，用户已存在'))
    }).catch(err => {
      res.send(new ErrorModel('注册失败，多半是后台崩了'))
    })
  }
})
// 验证token中间件
// router.use('/api*', (req, res, next) => {
//   console.log('checkToken');
//   verify(req.headers.token).
//     then(code => {
//       next();
//     }).catch(err => {
//       console.log(err);
//       res.status(304).send(new ErrorModel(err)).end()
//     })
// });

// 获取socket在线成员
router.get('/api/socketOnline', (req, res) => {
  res.send(new SuccessModel(
    Object.keys(global.arrAllSocket).map(userId => global.users[userId])
  ))
})

router.get('/api/getTodoList', (req, res) => {
  db.getTodoList()
  .then(list => res.send(new SuccessModel(list)))
})
router.post('/api/addTodoList', (req, res) => {
  db.addTodoList(req.body)
    .then(result => {
      if (result && result.affectedRows)
        res.send(new SuccessModel({}, '保存成功'))
      else
        res.send(new ErrorModel('保存失败'))
    }).catch(err => {
      res.send(new ErrorModel(err.toString()))
    })
})

module.exports = router
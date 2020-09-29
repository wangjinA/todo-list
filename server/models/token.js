const jwt = require('jsonwebtoken');  //用来生成token

const secretOrPrivateKey = "jwt";// 这是加密的key（密钥）
const expiresIn = 60 * 60 * 1// 1小时过期
const sign = req => {
  let content = { userName: req.body.userName }; // 要生成token的主题信息
  let token = jwt.sign(content, secretOrPrivateKey, {
    expiresIn
  });
  return {
    token,
    expiresIn
  }
}

const verify = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretOrPrivateKey, (err, decode) => {
      if (err) {  //  时间失效的时候 || 伪造的token
        reject(err)
      } else {
        resolve(decode)
      }
    })
  })
}
module.exports = {
  sign,
  verify
}
// 缓存user
const { getAllUser } = require('../db/index')

const initUsers = () => {
  getAllUser()
    .then(users => {
      global.users = global.users || {}
      users.forEach(user => {
        global.users[user.userId] = user
      })
    })
}

const setUsers = user => {
  global.users[user.userId] = user
}

module.exports = {
  initUsers,
  setUsers
}
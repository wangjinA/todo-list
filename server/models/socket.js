const io = require("socket.io");
global.arrAllSocket = global.arrAllSocket || {}

const getAllSocket = () => {
  return Object.keys(arrAllSocket).map(key => arrAllSocket[key])
}
const emitAll = (emitName, data) => {
  getAllSocket().forEach(socket => {
    socket.emit(emitName, data)
  })
}
// beUserId = 接收信息对象
// userId = 发送信息对象
// 发送信息
const sendChatByUser = data => {
  console.log(data);
  let socketIds = Object.keys(arrAllSocket).filter(id => [data.beUserId, data.userId].filter(_id => _id == id).length)
  if (socketIds.length) {
    // if (typeof data === 'object') {
    //   data = JSON.stringify(data)
    // }
    console.log(global.users);
    console.log(data.userId);
    socketIds.forEach(socketId => {
      arrAllSocket[socketId].emit('sendChatByUser', {
        ...data,
        userInfo: global.users[data.userId],
        beUserInfo: global.users[data.beUserId]
      }, res => {
        console.log(res);
        console.log('发送消息成功');
      })
    })
  } else {
    console.log(Object.keys(arrAllSocket));
    console.log(data.beUserId, data.userId);
    console.log('未找到socket');
  }
}
// 用户加入
const join = (userId, socket) => {
  arrAllSocket[userId] = socket; // 把socket存到全局数组里面去
  console.log(`新加入成员：${userId}`);
  console.log(Object.keys(arrAllSocket));
  emitAll('newEnter', global.users[userId])
}
// 用户离开
const leave = userId => {
  console.log(userId);
  console.log(global.users[userId]);
  emitAll('leave', global.users[userId])
  delete arrAllSocket[userId]
}
// 初始化
const initSocket = server => {
  const sockets = io(server, {
    path: '/socket',
  }); // 监听server
  sockets.of('chat').on("connection", socket => {
    console.log(socket === sockets);
    console.log("初始化成功！");
    socket.on('join', userId => {
      join(userId, socket)

      socket.on('disconnect', () => {
        //连接断开
        leave(userId)
      });
    });
    socket.on("sendChatByUser", sendChatByUser, res => {
      console.log(res);
    })
  });
  sockets.on('disconnect', function (data) {
    //连接断开
    console.log('连接断开666');
  });
}
module.exports = initSocket





// 这篇文章不错：https://www.cnblogs.com/yesu/p/8425491.html
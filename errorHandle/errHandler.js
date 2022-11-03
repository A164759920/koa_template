//err的结构见errorType.js
// status 为响应头的状态，默认为500 服务器错误
// status 可根据需求在对应的switch语句中修改
module.exports = (err, ctx) => {
  let status = 500;
  switch (err.code) {
    case "1001":
      status = 500;
  }
  // 将错误返回给客户端
  ctx.status = status;
  ctx.body = err;
};

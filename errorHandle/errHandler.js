const { logger } = require("../logs/index.js");

module.exports = (err, ctx) => {
  const { name, message } = err;
  ctx.body = {
    code: 2,
    msg: "系统错误",
    error: `${name}:${message}`,
  };
  logger.errorLogger(ctx, err);

  // 考虑如何优雅返回
  console.log("错误处理执行了");
};

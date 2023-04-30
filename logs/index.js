const { log4js } = require("./config.default.js");
let logger = {};

/**
 * @description 定义错误日志的格式
 */
const formatError = (ctx, err) => {
  const { method, url } = ctx;
  let body = ctx.request.body;
  const user = ctx.state.user;
  return { method, url, body, user, err };
};

const formatRes = (ctx) => {
  const {
    method,
    url,
    response: {
      status,
      message,
      body: { code },
    },
    // request: {
    //   header: { authorization },
    // },
  } = ctx;
  let body = ctx.request.body;
  const user = ctx.state.user;
  return {
    method,
    url,
    user,
    body,
    // authorization,
    response: { status, message, body: { code } },
  };
};

// 取出logger实例
let errorLogger = log4js.getLogger("error");
let resLogger = log4js.getLogger("response");

// 封装
logger.errorLogger = (ctx, error) => {
  if (ctx && error) {
    errorLogger.error(formatError(ctx, error));
  }
};

logger.resLogger = (ctx) => {
  if (ctx) {
    resLogger.info(formatRes(ctx));
  }
};

module.exports = {
  logger,
};

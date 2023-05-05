const { log4js } = require("./config.default.js");
let logger = {};

/**
 * @description 定义错误日志的格式
 */
const formatError = (ctx, err) => {
  const { method, url } = ctx;
  let request_query = ctx.request.query;
  let request_body = ctx.request.body;
  return { method, url, request_body, request_query, err };
};
/**
 *
 * @param {Object} ctx 上下文
 * @param {Number} cosTime 耗费时间
 * @returns
 */
const formatRes = (ctx, cosTime) => {
  const {
    method,
    url,
    response: { status, message, body },
    // request: {
    //   header: { authorization },
    // },
  } = ctx;

  let request_body = ctx.request.body;
  let request_query = ctx.request.query;
  return {
    method,
    url,
    cosTime: `${cosTime}ms`,
    request_body,
    request_query,
    response: { status, message, body },
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

logger.resLogger = (ctx, cosTime) => {
  if (ctx) {
    resLogger.info(formatRes(ctx, cosTime));
  }
};

module.exports = {
  logger,
};

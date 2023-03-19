const { verifyToken } = require("./index");

async function AuthToken(ctx, next) {
  const { authorization } = ctx.req.headers;
  const token = authorization.slice(7) || "";
  try {
    const { data } = await verifyToken(token);
    ctx.tokenData = data; // 将token数据挂载至tokenData
    await next();
  } catch (error) {
    ctx.status = 401;
    ctx.body = {
      msg: "access_denied",
    };
  }
}

module.exports = {
  AuthToken,
};

const { verifyToken } = require("./index");

async function AuthToken(ctx, next) {
  const { authorization } = ctx.req.headers;
  const token = authorization.slice(7)||"";
  try {
    const { data } = await verifyToken(token);
    /**
     * 可将有用的信息进行挂载
     */
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

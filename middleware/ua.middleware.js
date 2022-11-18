const UAparser = require("ua-parser-js");

//导入service
async function setUA(ctx, next) {
  // 将parser后的UA挂载到ctx下
  const rawUA = ctx.req.headers["user-agent"];
  ctx.ua = UAparser(rawUA);

  await next();
}
module.exports = { setUA };

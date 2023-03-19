const { refreshToken } = require("./index");

function refreshTokenController(ctx) {
  const { tokenData } = ctx;
  const res = refreshToken(tokenData);
  ctx.body = {
    code: res ? 0 : 1,
    msg: res ? "刷新token成功" : "无需刷新token",
    token: res || "",
  };
}

module.exports = {
  refreshTokenController,
};

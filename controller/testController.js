// 导入错误类型errorType
const { testError } = require("../errorHandle/errorType.js");

function test_ErrorController(ctx) {
  // 上报错误
  return ctx.app.emit("error", testError, ctx);
}
function test_ConnectController(ctx) {
    ctx.body = {
        code: 1,
        msg:"服务器正常响应"
    }
}
module.exports = {
    test_ErrorController,
    test_ConnectController
};

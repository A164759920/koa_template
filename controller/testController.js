// 导入错误类型errorType
const { testError } = require("../errorHandle/errorType.js");

//导入service层服务
const {
  deleteFile,
  changeFilenameAndSave,
  scanFilesByDirName,
} = require("../service/Files.service.js");

const { translateErrorCode } = require("../service/error.service.js");

function test_ErrorController(ctx) {
  // 上报错误
  return ctx.app.emit("error", testError, ctx);
}
function test_ConnectController(ctx) {
  ctx.body = {
    code: 1,
    msg: "服务器正常响应",
  };
}
async function test_DeleteController(ctx) {
  deleArray = ["1.txt", "22.txt", "3.txt"];
  const res = await deleteFile(deleArray, "static");
  const { errorType } = res;
  if (errorType) {
    Object.assign(res, { errorType: translateErrorCode(errorType) });
  }
  ctx.body = {
    data: res,
  };
}
async function test_ChangeController(ctx) {
  const res = await changeFilenameAndSave("22.txt", "789.txt", "stawtic");
  const { errorType } = res;
  if (errorType) {
    Object.assign(res, { errorType: translateErrorCode(errorType) });
  }
  ctx.body = {
    data: res,
  };
}
async function test_scanController(ctx) {
  const res = await scanFilesByDirName("service");
  const { errorType } = res;
  if (errorType) {
    Object.assign(res, { errorType: translateErrorCode(errorType) });
  }

  ctx.body = {
    data: res,
  };
}
module.exports = {
  test_ErrorController,
  test_ConnectController,
  test_DeleteController,
  test_ChangeController,
  test_scanController,
};

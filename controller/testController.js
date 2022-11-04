// 导入错误类型errorType
const { testError } = require("../errorHandle/errorType.js");

//导入service层服务
const {
  deleteFile,
  changeFilenameAndSave,
  scanFilesByDirName,
} = require("../service/Files.service.js");

const { translateErrorCode } = require("../service/error.service.js");
const errorType = require("../errorHandle/errorType.js");

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
  let { oldname, newname, dirname } = ctx.query;
  oldname = oldname || "test.txt";
  newname = newname || "reName.txt";
  if (dirname) {
    const res = await changeFilenameAndSave(oldname, newname, dirname);
    const { errorType } = res;
    if (errorType) {
      Object.assign(res, { errorType: translateErrorCode(errorType) });
    }
    ctx.body = {
      data: res,
    };
  } else {
    ctx.body = {
      data: {
        code: 1,
        msg: "重命名失败",
        errorType: "参数解析错误",
      },
    };
  }
}
async function test_scanController(ctx) {
  let { dirname } = ctx.query;
  dirname = dirname || "static";
  if (dirname) {
    console.log("解析的参数", dirname);
    const res = await scanFilesByDirName(dirname);
    const { errorType } = res;
    if (errorType) {
      Object.assign(res, { errorType: translateErrorCode(errorType) });
    }

    ctx.body = {
      data: res,
    };
  } else {
    ctx.body = {
      data: {
        code: 1,
        msg: "扫描失败",
        errorType: "参数解析错误",
      },
    };
  }
}
module.exports = {
  test_ErrorController,
  test_ConnectController,
  test_DeleteController,
  test_ChangeController,
  test_scanController,
};

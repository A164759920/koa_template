//导入service层服务
// 文件层service
const {
  deleteFile,
  changeFilenameAndSave,
  scanFilesByDirName,
  mergeMultiFile,
} = require("../service/Files.service.js");
// 错误层service
const { translateErrorCode } = require("../service/error.service.js");
const errorType = require("../errorHandle/errorType.js");
const { testError } = require("../errorHandle/errorType.js");
// ua层service
const { setUAtoTABLE } = require("../service/ua.service.js");
// email层service
const { throttleSendMail } = require("../service/email.service.js");
function test_ErrorController(ctx) {
  return ctx.app.emit("error", testError, ctx);
}

async function test_ConnectController(ctx) {
  // 原本应该在此进行UA和IP信息进数据库，IP写得早不进行重构了
  // 以存储UA数据到数据库为例
  // console.log("挂载数据查询", ctx.parser_ip, ctx.ua);
  try {
    // const res = await setUAtoTABLE(ctx.parser_ip, ctx.ua);
    const res = await Promise.allSettled([
      setUAtoTABLE(ctx.parser_ip, ctx.ua),
      throttleSendMail("web", ctx.data_ip, ctx.ua),
    ]);
    //res为数组
    if (res) {
      let flag1 = res[0].status === "fulfilled" ? true : false;
      let flag2 = res[1].status === "fulfilled" ? true : false;
      ctx.body = {
        code: 0,
        msg: "接口正常调用",
        data: {
          UA: flag1 ? "UA存储正常" : "UA存储失败",
          Email: flag2 ? "[Throttle]Email发送正常(2min/次)" : "Email发送失败",
        },
      };
    }
  } catch (error) {
    ctx.body = {
      code: 2,
      msg: "系统错误",
      error,
    };
  }
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
async function test_uploadController(ctx) {
  const oldFilename = ctx.request.files.chunk.newFilename;
  const newFilename = ctx.request.files.chunk.originalFilename;
  const res = await changeFilenameAndSave(oldFilename, newFilename, "static");
  ctx.body = {
    res,
  };
}
async function test_mergeController(ctx) {
  console.log("merge执行");
  const { hash, fileType, fileLength } = ctx.query;
  // FIXME:ctx.body的异步逻辑有问题，已在mergeMutiFile中返回
  const res = await mergeMultiFile(hash, fileType, fileLength, "static", ctx);
}

module.exports = {
  test_ErrorController,
  test_ConnectController,
  test_DeleteController,
  test_ChangeController,
  test_scanController,
  test_mergeController,
  test_uploadController,
};

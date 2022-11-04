// system require
const Path = require("path");
const http = require("http");
const https = require("https");

// node_module require
const Koa = require("koa");
const cors = require("koa2-cors");
const koaBody = require("koa-body");
const static = require("koa-static");
const mount = require("koa-mount");

// custom require
const errHandler = require("./errorHandle/errHandler.js");
const {
  HTTP_PORT,
  HTTPS_PORT,
  IS_HTTPS,
  MOUNT_NAME,
} = require("./config.default.js");
const { router } = require("./router/index");

const server = new Koa();
server
  .use(mount(MOUNT_NAME, static(Path.join(__dirname, "./static"))))
  .use(cors())
  .use(
    koaBody({
      multipart: true,
      encoding: "utf-8",
      formidable: {
        uploadDir: Path.join(__dirname, "./static"), //上传目录，默认放置在启动目录
        keepExtensions: true, //保存文件后缀
        maxFieldsSize: 10485760, //默认文件大小
      },
    })
  )
  .use(router.routes())
  .use(router.allowedMethods());
// 开启错误上报
server.on("error", errHandler);

if (IS_HTTPS === "on") {
  const { options } = require("./ssl/index.js");
  https.createServer(options, server.callback()).listen(HTTPS_PORT, () => {
    console.log(`HTTPS server is running on: ${HTTPS_PORT}`);
  });
} else {
  http.createServer(server.callback()).listen(HTTP_PORT, () => {
    console.log(`HTTP server is running on: ${HTTP_PORT}`);
  });
}

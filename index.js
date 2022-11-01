//引入自定义环境变量
const { APP_PORT } = require("./config.default.js");
const Koa = require("koa");
const cors = require("koa2-cors");
const koaBody = require("koa-body");
const server = new Koa();
const { router } = require("./router/index");
const Path = require("path");
const static = require("koa-static");
const mount = require("koa-mount");
server
  // .use(mount('/likePic', static(Path.join(__dirname, './public'))))
  .use(cors())
  .use(
    koaBody({
      multipart: true,
      encoding: "utf-8",
      formidable: {
        uploadDir: Path.join(__dirname, "./public"), //上传目录，默认放置在启动目录
        keepExtensions: true, //保存文件后缀
        maxFieldsSize: 10485760, //默认文件大小
      },
    })
  )
  .use(router.routes())
  .use(router.allowedMethods());
server.listen(APP_PORT, () => {
  console.log(`'server is running on ${APP_PORT}`);
});

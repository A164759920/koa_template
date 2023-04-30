const log4js = require("log4js");
const Path = require("path");
log4js.configure({
  appenders: {
    error: {
      type: "file",
      category: "errLogger",
      filename: Path.join("logs/", "error/error.log"),
      maxLogSize: 104800,
      backups: 100,
    },
    response: {
      type: "file",
      category: "resLogger",
      filename: Path.join("logs/", "responses/responses.log"),
      pattern: "yyyy-MM-dd.log", //日志输出模式
      alwaysIncludePattern: true,
      maxLogSize: 104800,
      backups: 100,
    },
  },
  categories: {
    error: { appenders: ["error"], level: "info" },
    response: { appenders: ["response"], level: "info" },
    default: { appenders: ["response"], level: "info" },
  },
  replaceConsole: true,
});

module.exports = {
  log4js,
};

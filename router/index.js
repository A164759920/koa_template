// system require
const Path = require("path");
const fs = require("fs");

const Router = require("koa-router");
const router = new Router();

// 导入 controller
const {
  test_ErrorController,
  test_ConnectController,
  test_DeleteController,
  test_ChangeController,
  test_scanController,
} = require("../controller/testController.js");

// 测试路由
router.get("/errTest", test_ErrorController);
router.get("/test", test_ConnectController);
router.get("/delete", test_DeleteController);
router.get("/change", test_ChangeController);
router.get("/scan", test_scanController);
module.exports = {
  router,
};

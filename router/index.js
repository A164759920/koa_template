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
  test_uploadController,
  test_mergeController,
} = require("../controller/testController.js");

// 测试路由
router.get("/test_errTest", test_ErrorController);
router.get("/test_test", test_ConnectController);
router.get("/test_delete", test_DeleteController);
router.get("/test_change", test_ChangeController);
router.get("/test_scan", test_scanController);
router.post("/upload", test_uploadController);
router.get("/merge", test_mergeController);
module.exports = {
  router,
};

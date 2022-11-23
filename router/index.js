const Router = require("koa-router");
const router = new Router();

// 导入 网页controller
const {
  test_ErrorController,
  test_ConnectController,
  test_DeleteController,
  test_ChangeController,
  test_scanController,
  test_uploadController,
  test_mergeController,
} = require("../controller/testController.js");
const { cosBucketController } = require("../controller/cosBucketController.js");

//导入后台controller
const {
  backed_ipController,
  backed_uaController,
} = require("../controller/backedController.js");

// 导入 middleware
const { setIP } = require("../middleware/ip.middleware.js");
const { setUA } = require("../middleware/ua.middleware.js");

// 网页接口
// 测试API
router.get("/test_errTest", test_ErrorController);
router.get("/test_test", setUA, setIP, test_ConnectController);
router.get("/test_delete", test_DeleteController);
router.get("/test_change", test_ChangeController);
router.get("/test_scan", test_scanController);
// 文件API
router.post("/upload", test_uploadController);
router.get("/merge", test_mergeController);
// 存储桶API
router.all("/sts", cosBucketController);

// 后台接口
router.get("/back_ip", backed_ipController);
router.get("/back_ua", backed_uaController);

module.exports = {
  router,
};

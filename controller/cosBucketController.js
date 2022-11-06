const STS = require("qcloud-cos-sts/sdk/sts.js");
async function cosBucketController(ctx) {
  const { config, action } = require("../qcloud-cos/config.default.js");
  var shortBucketName = config.bucket.substr(0, config.bucket.lastIndexOf("-"));
  var appId = config.bucket.substr(1 + config.bucket.lastIndexOf("-"));
  var policy = {
    version: "2.0",
    statement: [
      {
        action, // 请在qcloud-cos/config.default.js中配置action
        effect: "allow",
        principal: { qcs: ["*"] },
        resource: [
          "qcs::cos:" +
            config.region +
            ":uid/" +
            appId +
            ":prefix//" +
            appId +
            "/" +
            shortBucketName +
            "/" +
            config.allowPrefix,
        ],
      },
    ],
  };
  try {
    const res = await new Promise((resolve, reject) => {
      STS.getCredential(
        {
          secretId: config.secretId,
          secretKey: config.secretKey,
          proxy: config.proxy,
          durationSeconds: config.durationSeconds,
          policy: policy,
        },
        function (err, tempKeys) {
          if (err) {
            resolve(err);
          } else {
            // var result = JSON.stringify(err || tempKeys) || "";
            // resolve(result);
            var result = err || tempKeys || "";
            resolve(result);
          }
        }
      );
    });
    console.log(res);
    ctx.body = {
      data: res,
    };
  } catch (error) {
    ctx.body = {
      code: 1,
      msg: "sts调用失败",
      errorType: err,
    };
  }
}

module.exports = {
  cosBucketController,
};

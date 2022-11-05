const config = {
  secretId: "", // 固定密钥
  secretKey: "", // 固定密钥
  proxy: "",
  host: "http://127.0.0.1:8888", // 域名，非必须，默认为 sts.tencentcloudapi.com
  durationSeconds: 1800, // 密钥有效期
  // 放行判断相关参数
  bucket: "test-1313270013", // 换成你的 bucket
  region: "ap-nanjing", // 换成 bucket 所在地区
  allowPrefix: "*", // 这里改成允许的路径前缀，可以根据自己网站的用户登录态判断允许上传的具体路径，例子： a.jpg 或者 a/* 或者 * (使用通配符*存在重大安全风险, 请谨慎评估使用)
};

module.exports = {
  config,
};

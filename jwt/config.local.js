/**
 * expiresIn 不加单位默认为s
 */
module.exports = {
  algorithm: "HS256", // 加密算法类型
  secretKey: "12345", // 私钥
  expiresTime: 60, // token过期时间
  refreshTime: 30,
};

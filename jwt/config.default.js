/**
 * expiresIn 不加单位默认为s
 */
module.exports = {
  algorithm: "HS256", // 加密算法类型
  secretKey: "", // 私钥
  expiresIn: "30", // token过期时间
  refreshTime: 60 * 2,
};

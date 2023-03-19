const jwt = require("jsonwebtoken");
const { reject } = require("lodash");

const {
  algorithm,
  secretKey,
  expiresTime,
  refreshTime,
} = require("./config.local.js");
/**
 * @description 创建 Token
 * @param { Object } data 用于加密的数据
 * @param { String } time token 有效期
 * @return {String} Token 成功返回token，失败返回 ""
 */
function createToken(data, time) {
  let token = jwt.sign(data, secretKey, {
    expiresIn: time || expiresTime,
  });
  return token || "";
}

/**
 * @description 验证 token Promise风格
 * @param {String} token
 * @return {Promise} 验证结果
 * @example
 * await verifyToken(token)
 * =>
 * Promise.reslove({
 *  code:0,
 *  msg:"token-valid",
 *  data: Payload + iat + exp
 * })
 */
async function verifyToken(token) {
  return new Promise((reslove, reject) => {
    jwt.verify(token, secretKey, function (err, decoded) {
      if (err) {
        reject({
          code: 1,
          msg: {
            errorName: err.name,
            errorMessage: err.message,
          },
          data: null,
        });
      } else {
        reslove({
          code: 0,
          msg: "token-valid",
          data: decoded,
        });
      }
    });
  });
}
/**
 * @description 自动刷新 token
 * @param {Object} data token的Payload
 * @return { String |null} 成功返回Token,失败返回null
 * @example
 * refreshToken({username:XXX,password:XXXX})
 * =>
 * token | 空串
 */
function refreshToken(data) {
  const { iat, exp, ...payLoadData } = data; // iat 签发时间 exp 过期时间
  const nowTmp = Math.floor(Date.now() / 1000); // 当前时间戳
  const leftSecond = exp - nowTmp;
  console.log("剩余秒数", leftSecond, typeof leftSecond);
  if (leftSecond >= 0 && leftSecond <= refreshTime) {
    const newToken = createToken(payLoadData);
    return newToken;
  } else {
    return null;
  }
}

module.exports = {
  createToken,
  verifyToken,
  refreshToken,
};

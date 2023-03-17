const jwt = require("jsonwebtoken");
const { reject } = require("lodash");

const { algorithm, secretKey, expiresTime } = require("./config.local.js");
/**
 * 创建Token
 * @param { Object } data 用于加密的数据
 * @param {String} time token 有效期
 * @returns {String} Token
 */
function createToken(data, time) {
  let token = jwt.sign(data, secretKey, {
    expiresIn: time || expiresTime,
  });
  return token || "";
}
/**
 * Promise风格 验证token
 * @param {String} token
 * @returns {Promise} 验证结果
 * decoded 数据包括
 * {
 *    Payload
 *    iat 颁布时间戳
 *    exp 到期时间戳
 * }
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

module.exports = {
  createToken,
  verifyToken,
};

// 根据常见的系统error.CODE 翻译error原因
/**
 * @param {String} code 系统的错误码
 * @returns {Object} errorType 错误原因[reason] 错误码code
 */
function translateErrorCode(code) {
  const errorType = {};
  if (code === "ENOENT") {
    errorType.reason = "no such file or dictionary";
    errorType.code = code;
  }
  return errorType || code;
}

module.exports = {
  translateErrorCode,
};

const axios = require("axios");

//导入servince
const setIptoTABLE = require("../service/ip.service.js");
async function setIP(ctx, next) {
  // 获取IPv4地址
  const getUserIp = (req) => {
    return (
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress
    );
  };
  const ip = getUserIp(ctx.req);
  // 解析ipv4地址信息
  try {
    const res = await axios.get(`https://ip.useragentinfo.com/json?ip=${ip}`);
    if (res) {
      console.log("查询数据", res.data);
      setIptoTABLE(res.data);
    }
  } catch (error) {
    console.log("查询失败", error);
  }
  await next();
}

module.exports = {
  setIP,
};

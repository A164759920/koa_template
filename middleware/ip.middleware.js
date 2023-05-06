const axios = require("axios");

//导入servince
const { setIptoTABLE, inet_aton } = require("../service/ip.service.js");
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
  const ip = getUserIp(ctx.req); // ipv4地址
  ctx.parser_ip = inet_aton(ip); // 挂载到ctx下
  // 解析ipv4地址信息
  try {
    const res = await axios.get(`https://ip.useragentinfo.com/jsonp?ip=${ip}`);
    if (res) {
      const ipObj = JSON.parse(res.data.match(/\(([^)]+)\)/)[1]);
      setIptoTABLE(ipObj);
      ctx.data_ip = ipObj; // 挂载到ctx下
    }
  } catch (error) {
    console.log("查询失败", error);
  }
  await next();
}

module.exports = {
  setIP,
};

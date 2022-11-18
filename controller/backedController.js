// ip层service
const {
  getInfoFromTABLE,
  getTop5Province,
} = require("../service/ip.service.js");
// ua层service
const { getUAFromTABLE, getUAtop5 } = require("../service/ua.service.js");

// 后台接口
async function backed_ipController(ctx) {
  const query = ctx.query.type || "";
  switch (query) {
    case "all":
      const attributes = ["ipv4", "province", "city", "area", "count"];
      let res1 = await getInfoFromTABLE(attributes);
      ctx.body = res1;
      break;
    case "top5":
      let res2 = await getTop5Province();
      ctx.body = res2;
      break;
    default:
      ctx.body = {
        code: 1,
        msg: "查询失败",
        error: "参数解析失败",
      };
      break;
  }
}
async function backed_uaController(ctx) {
  const { limit, offset, type } = ctx.query;
  switch (type) {
    case "all":
      try {
        const res = await getUAFromTABLE(limit, offset - 1);
        if (res) {
          ctx.body = res;
        }
      } catch (error) {
        ctx.body = {
          code: 2,
          msg: "[UA]系统错误",
          error,
        };
      }
      break;
    case "top5":
      try {
        const res = await getUAtop5();
        if (res) {
          ctx.body = res;
        }
      } catch (error) {
        ctx.body = {
          code: 2,
          msg: "[UA]top5系统错误",
          error,
        };
      }
      break;
    default:
      ctx.body = {
        code: 1,
        msg: "查询失败",
        error: "参数解析失败",
      };
      break;
  }
  // 假定前端页码(offset)从1开始
}
module.exports = {
  backed_ipController,
  backed_uaController,
};

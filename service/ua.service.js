//导入IP模型
const UA = require("../model/ua.model.js");
//导入当前连接数据库
const seq = require("../database/mySQL.js");
//导入操作符
const { Op } = require("sequelize");

/**
 * 将ua信息存入uainfo表
 * @param {Number} ip ipv4 32位形式
 * @param {Object } uaObj ua信息对象
 * @return {Object} 返回函数执行结果态
 */
async function setUAtoTABLE(ip, uaObj) {
  // 将组织好的数据存储表中
  const { os, browser, device } = uaObj;
  try {
    const res = await UA.create({
      ipv4: ip || 0,
      // os: `${os.name} v${os.version}` || "",
      os: `${os.name}` || "",
      browser: `${browser.name}` || "",
      device:
        // device格式单独处理，防止存入undefined_undefined_undefined
        (device.vendor ? `${device.vendor}_` : "") +
        (device.model ? `${device.model}_ ` : "") +
        (device.type ? `${device.type}` : ""),
    });
    if (res) {
      return {
        code: 0,
        msg: "UA存储成功",
        data: res.dataValues,
      };
    }
  } catch (error) {
    return {
      code: 1,
      msg: "UA存储失败",
      error,
    };
  }
}
/**
 *  ## FIXME:limit 和 offset需先转为数字
 * @param {String} limit 分页数
 * @param {String} offset 偏移量
 * @return {Object} 返回函数执行结果
 */
async function getUAFromTABLE(limit, offset) {
  try {
    const res = await UA.findAll({
      attributes: {
        exclude: ["id"],
      },
      offset: Number(limit * offset),
      limit: Number(limit),
    });
    if (res) {
      return {
        code: 0,
        msg: "ua查询成功",
        data: res,
      };
    }
  } catch (error) {
    return {
      code: 1,
      msg: "ua查询失败",
      error,
    };
  }
}

async function getUAtop5() {
  const querySQL =
    "SELECT ipv4,os,browser,device,COUNT(os) as count FROM `uainfo` GROUP BY os";
  try {
    const res = await seq.query(querySQL);
    if (res) {
      return {
        code: 0,
        msg: "uaTop5查询成功",
        data: res[0],
      };
    }
  } catch (error) {
    return {
      code: 1,
      msg: "uaTop5查询失败",
      error
    };
  }
}
module.exports = { setUAtoTABLE, getUAFromTABLE, getUAtop5 };

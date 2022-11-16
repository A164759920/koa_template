//导入IP模型
const IP = require("../model/ip.model.js");
//导入当前连接数据库
const seq = require("../database/mySQL.js");
//导入操作符
const { Op } = require("sequelize");
/**
 * ipv4 转 32位形式
 * @param {String} ip
 * @returns {getUint32} ipv4 32位二进制形式
 */
function inet_aton(ip) {
  // split into octets
  var a = ip.split(".");
  var buffer = new ArrayBuffer(4);
  var dv = new DataView(buffer);
  for (var i = 0; i < 4; i++) {
    dv.setUint8(i, a[i]);
  }
  return dv.getUint32(0);
}

/**
 * 32位转ipv4形式
 * @param {Number} num
 * @returns {String} ipv4地址
 */
function inet_ntoa(num) {
  var nbuffer = new ArrayBuffer(4);
  var ndv = new DataView(nbuffer);
  ndv.setUint32(0, num);

  var a = new Array();
  for (var i = 0; i < 4; i++) {
    a[i] = ndv.getUint8(i);
  }
  return a.join(".");
}
/**
 *  根据param将数据存入数据库表中
 * @param {Object} ipObj 传入ip查询结果对象
 */
function setIptoTABLE(ipObj) {
  const { ip, province, city, area } = ipObj;
  console.log("传入数据", ipObj);
  const num_ip = inet_aton(ip) || inet_aton("0.0.0.0");
  IP.findOrCreate({
    where: {
      ipv4: inet_aton(ip), // ip string -> num(32)
    },
    defaults: {
      ipv4: num_ip,
      province: province || "",
      city: city || "",
      area: area || "",
      count: 1, // 没有新建一个 count为1
    },
  })
    .then((value) => {
      const [IP_model, isCreated] = value;
      if (!isCreated) {
        //非首次创建，需自增1
        return IP_model.increment("count", { by: 1 });
      } else {
        //首次创建中断promise链
        return Promise.resolve(false);
      }
    })
    .then((value) => {
      if (value) {
        //自增成功，走到这里
        console.log("自增成功");
      } else {
        //首次创建，走到这里
        console.log("首次创建成功");
      }
    });
}

module.exports = setIptoTABLE;

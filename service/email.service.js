// lodash节流函数引入
const throttle = require("lodash/throttle");
// 邮件发送器
const nodemailer = require("nodemailer");

//使用throttle封装发送函数
var throttleSendMail = throttle(MysendMail, 1000 * 60, {
  leading: true,
  trailing: false, // 关闭节流后的一次调用
});

/**
 * 邮件发送函数，外层需做throttle处理
 * @param {String} ip ipv4 32位形式
 * @param {Object} ua  ua对象
 * @returns {Object} 邮件发送状态
 */
async function MysendMail(ipObj, ua) {
  // 解构参数
  const { os, browser, device } = ua;
  //创建transporter
  let transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    secureConnection: true, // use SSL
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
      user: "",
      pass: "", // QQ邮箱需要使用授权码
    },
  });
  // 邮件内容 HTML编写
  let mailOptions = {
    from: '"Node-Server" <XXXXXXX@qq.com>',
    to: "XXXXXXX@qq.com",
    subject: "🏁ROADRUNNER 网站有新访客",
    text: "NODE SERVER ",
    html: `<br><b>访客ip:${ipObj.ip}</b></br>
    <br><b>访客归属地:</b>
      ${ipObj.province ? ipObj.province : "-"}
      ${ipObj.city ? ipObj.city : "-"}
      ${ipObj.area ? ipObj.area : ""}</br>
    <br><b🔊系统os:</b>${os.name ? os.name + " v" + os.version : ""}</br>
    <br><b>🔊浏览器:</b>${
      browser.name ? browser.name + browser.version : ""
    }</br>
    <br><b>🔊设备:</b>${
      device.vendor ? device.vendor + device.model + device.type : "Computer"
    }</br>
    <br><b>⭐进入后台查看<b>:https://sls-website-ap-nanjing-xw8eu3mu-1313270013.cos-website.ap-nanjing.myqcloud.com/</br>`,
  };
  //封装sendMail函数
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, data) => {
      if (error) {
        reject({
          code: 1,
          msg: "邮件发送失败",
          error,
        });
      } else {
        resolve({
          code: 0,
          msg: "邮件发送成功",
          data,
        });
      }
    });
  });
}

module.exports = {
  throttleSendMail,
};

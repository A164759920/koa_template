// system require
const fs = require("fs");
const Path = require("path");

// custom require
const {
  HOST,
  HTTP_PORT,
  HTTPS_PORT,
  IS_HTTPS,
} = require("../config.default.js"); // 引入env中的环境变量

// 服务器根路径
const rootPath = Path.resolve(__dirname, "..");
/**
 *  用于删除指定文件
 * @param {Array} filenames  需删除的文件名数组
 * @param {string} rel_aimPath 删除文件所在的文件夹相对根文件夹的路径
 * @returns {Array} reses 文件的删除情况，promise风格
 */
async function deleteFile(filenames, rel_aimPath) {
  if (filenames.length > 0) {
    const asyncTask = [];
    filenames.forEach((filename, index) => {
      const abs_aimPath = Path.resolve(rootPath, rel_aimPath, filename);
      console.log(abs_aimPath);
      const aTask = new Promise((resolve, reject) => {
        fs.unlink(abs_aimPath, (err) => {
          if (err) {
            reject({
              code: 1,
              msg: "第" + index + "个文件" + filename + "删除成功",
              errorType: err.code,
            });
          } else {
            resolve({
              code: 0,
              msg: "第" + index + "个文件" + filename + "删除成功",
            });
          }
        });
      });
      asyncTask.push(aTask);
    });
    try {
      const reses = await Promise.allSettled(asyncTask);
      console.log("结果", reses);
      return reses;
    } catch (error) {
      console.log("错误", error);
      return error;
    }
  }
}
/**
 * 根据给定文件夹和新老文件名重命名文件
 * @param {String} oldFilename 旧文件名
 * @param {String} newFilename 新文件名
 * @param {String} rel_aimPath 相对根路径的文件夹名称
 */
async function changeFilenameAndSave(oldFilename, newFilename, rel_aimPath) {
  const abs_aimDirPath = Path.resolve(rootPath, rel_aimPath);
  const old_aimFilePath = Path.resolve(abs_aimDirPath, oldFilename);
  const new_aimFilePath = Path.resolve(abs_aimDirPath, newFilename);
  try {
    const res = await new Promise((resolve, reject) => {
      fs.rename(old_aimFilePath, new_aimFilePath, (err) => {
        if (err) {
          reject({
            code: 1,
            msg: "重命名失败",
            errorType: err.code,
          });
        }
        resolve({
          code: 0,
          msg: "重命名成功",
        });
      });
    });
    console.log("结果", res);
    return res;
  } catch (error) {
    console.log("错误", error);
    return error;
  }
}

/** 封装异步 读取文件夹
 * @param {String} rel_path 文件相对根目录的路径
 * @returns {Array} files 成功返回files数组， 失败返回失败原因
 */
function asyncReadDir(rel_path) {
  return new Promise((resolve, reject) => {
    fs.readdir(rel_path, (err, files) => {
      if (err) {
        reject({
          code: 1,
          msg: "扫描失败",
          errorType: err.code,
        });
      } else {
        resolve(files);
      }
    });
  });
}
/**
 * 封装异步 判断该文件是否为文件夹
 * @param {String} abs_path 文件绝对路径
 * @returns {Boolean} 是文件夹 true 否则为false 失败返回失败原因
 */
function asyncReadStat(abs_path) {
  return new Promise((resolve, reject) => {
    fs.stat(abs_path, (err, stat) => {
      if (err) {
        reject(err);
      } else {
        var isDir = stat.isDirectory();
        if (isDir) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    });
  });
}
/**
 * 封装异步 递归读取文件夹
 * @param {String} rel_path  文件相对根目录的路径
 * @returns {Array} 返回扫描文件夹的结果，文件夹层级关系用数组嵌套表示
 */
async function dfsFileNames(rel_path) {
  const files = await asyncReadDir(rel_path);
  const res = [];
  for (const fileName of files) {
    const abs_FilePath = Path.resolve(rootPath, rel_path, fileName);
    res.push(abs_FilePath);
    const isDir = await asyncReadStat(abs_FilePath);
    if (isDir) {
      res.push(await dfsFileNames(`${rel_path}/${fileName}`));
    }
  }
  return res;
}
/**
 * 通过给定文件夹名称扫描其中的文件
 * @param {String} rel_aimDirName 相对根目录的文件夹路径
 * @returns {Object} 返回此次扫描的状态及结果
 */
async function scanFilesByDirName(rel_aimDirName) {
  try {
    const abs_aimDirPath = Path.resolve(rootPath, rel_aimDirName);
    const result = await dfsFileNames(abs_aimDirPath);
    returnObj = {
      code: 0,
      msg: "扫描成功",
      data: result,
    };
    return returnObj;
  } catch (error) {
    return error;
  }
}

/**
 * 根据文件路径上次前端可访问的URL
 * @param {String} rel_filePath  相对根目录的路径
 * @returns {String} URLtoFronted
 */
function createFrontedUrl(rel_filePath) {
  //   const res = `${HOST}:${APP_PORT}${filePath}`;
  if (IS_HTTPS === "on") {
    return `${HOST}:${HTTPS_PORT}${rel_filePath}`;
  } else {
    return `${HOST}:${HTTP_PORT}${rel_filePath}`;
  }
}
module.exports = {
  changeFilenameAndSave,
  deleteFile,
  scanFilesByDirName,
  createFrontedUrl,
};

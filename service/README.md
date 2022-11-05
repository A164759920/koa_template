# Files.service 服务层预置的功能

    ## Param Prefix
     - rel_  : relative 相对(路径)的缩写
     - abs_  : absolute 绝对(路径)的缩写

    ## deleteFile(filenames,rel_aimPath)
    /**
        *  用于删除指定文件
        * @param {Array} filenames  需删除的文件名数组
        * @param {string} rel_aimPath 删除文件所在的文件夹相对根文件夹的路径
        * @returns {Array} reses 文件的删除情况，promise风格
    */

    ## changeFilenameAndSave(oldFilename, newFilename, rel_aimPath)
    /**
        * 根据给定文件夹和新老文件名重命名文件
        * @param {String} oldFilename 旧文件名
        * @param {String} newFilename 新文件名
        * @param {String} rel_aimPath 相对根路径的文件夹名称
        * @returns {Object} {【code】:0/1,【msg】:"重命名成功/失败",【errorType】:err.code}
    */

    ## scanFilesByDirName(rel_aimDirName)
    /**
        * 通过给定文件夹名称扫描其中的文件
        * @param {String} rel_aimDirName 相对根目录的文件夹路径
        * @returns {Object} 返回此次扫描的状态及结果
    */

    ## mergeMultiFile(hash, fileType, fileLength, rel_aimDirPath, ctx)
    【自用】
    ***请配合对应前端js使用***
    <https://github.com/A164759920/Fronted_Utils_JS/blob/main/chunkFileUpload.js>
    /**
        * 基于hash的merge切片上传的文件
        * @param {String} hash 文件hash值
        * @param {String} fileType 文件类型
        * @param {Number} fileLength 切片总数
        * @param {String} rel_aimDirPath 文件保存的位置
        * @param {Object} ctx 上下文对象
    */

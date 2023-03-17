# 🔥RR_koa 框架

## 基于 koa 开发的 MVC 模式轻量后端框架【自用】

## 基于 2022/11/16 版本改造的各**实践版本**请到分支查看

# 使用步骤

- ① git clone
- ② npm install pm2 -g [非必须，持久部署建议安装]
- ③ npm install
- ④ node index.js 或者 npm run dev **_🔊develop 模式，dev 启动 HMR_**
- ⑤ npm run build **_🔊production 模式，build 启动 pm2_**

# .env

- 在.env 中定义你的环境变量
- default
  - HTTP_PORT HTTP 服务器启动端口 [default:8888]
  - HTTPS_PORT HTTPS 服务器启动端口 [defult:8899]
  - IS_HTTPS 是否开启 HTTPS 服务器 on 为开启 [default:off]
  - MOUNT_NAME 静态资源文件夹挂载名称 [defalut:/static]

# 【2023/03/17】 JWT 模块

**该模块提供如的功能详见**
https://github.com/A164759920/koa_template/tree/main/jwt

# 【2022/11/16】 sequelize + mysql2 + 更新 middleware 层 + 更新 service 层

## 📄1.sequelize + mysql2 实现数据库连接

🔨**使用数据库前需先在.env 中进行配置**

- MYSQL_HOST = 数据库域名
- MYSQL_PORT = 数据库端口号
- MYSQL_USER = 数据库登录用户
- MYSQL_PWD = 登录用户密码
- MYSQL_DB = 连接数据库名称

**数据库在 ORM 中抽象以下两层**

- ①.database 层
  - 该层每个 js 文件导出数据库数据库实例
- ②.model 层
  - 该层每个 js 文件定义并导出数据库**_每张表_**的元组模型（每一行）

## 📄2.ip 查询 middleware

**⭐ 获取调用接口者的 ip 地址，并根据 ip 地址查询归属地信息**

- 导出:**_setIP 函数_**
- 接口:目前该中间件用于 **http(s)://域名:端口/test_test**

## 📄3.ip 查询 service

具体实现将 **_ip middleware 层_** 查询的内容保存到**_数据库_**的操作</br>
详见 **service/ip.service.js**

# 【2022/11/12】 使用 pm2 持久化守护服务器 + bug 修复

- **_环境配置-在服务器运行环境下安装 PM2_**
- ①.安装: **npm install pm2 -g**
- ②. 使用:
  - 开发调试情况下建议使用: **npm run dev** 或 **node index.js** 不启用 pm2
  - 持久化部署情况下: **npm run build** 或 **pm2 start index.js** 启用 pm2 守护 服务器。
- ③.pm2 官网:https://pm2.keymetrics.io/docs/usage/quick-start/

- ④.修复了 sts 接口鉴权失败时错误上报的 bug

# 【2022/11/3】自动配置 HTTPS 证书 + 服务器

- ① .env 中设置 IS_HTTPS = on
- ② 将 .key 和 .pem 文件放入 ssl 文件夹下
- ③ npm run dev 开启 HTTPS 服务器

# 【2022/11/5】支持腾讯云存储桶 sts 鉴权接口

- **_【注意】_**:
  使用时将/controller/cosBucketController 中<br>
  const { config, action } = require("../qcloud-cos/config.local.js");<br>
  替换为:<br>
  const { config, action } = require("../qcloud-cos/config.default.js");<br>
  并在 config.default.js 中配置你的存储桶信息<br>
- 详见 qcloud-cos 文件夹下 README.md

# 测试 API

- 测试连通性
- http:// 域名:端口/test_test

  - Method: get

- 错误上报测试
- http:// 域名:端口/test_errTest

  - Method: get

- 删除文件测试
- http:// 域名:端口/test_delete

  - Method: get

- 修改文件名称测试
- http:// 域名:端口/test_change

  - Method: get
  - queryParam:
    - oldname : 旧文件名 [defaut: test.txt] 必填
    - newname : 新文件名 [defalut: reName] 必填
    - dirname ：所在文件夹 [default : 无] 必填

- 扫描指定文件夹文件
- http:// 域名:端口/test_scan

  - Method: get
  - queryParam:
    - dirname : 文件名名称 [default: static] 必填

- 切片文件上传 【自用】

  - http:// 域名: 端口/upload

    - Method : post

  - http:// 域名: 端口/merge
    - Method ：get
    - queryParam:
      - hash : 文件 hash 值
      - fileType ：文件类型
      - fileLength ：文件切片总数

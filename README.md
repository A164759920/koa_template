# 🔥RR_koa 框架

## 基于主分支开发的网站服务器

**⚡ 该版本目前可供网站前端/后台共同使用**

- **_🔥 前端_**：https://www.roadrunner2002.top/
  - **_前端仓库_**：https://github.com/A164759920/roadrunner
- **_👀 后台_**：https://sls-website-ap-nanjing-xw8eu3mu-1313270013.cos-website.ap-nanjing.myqcloud.com/
  - **_后台仓库_**：https://github.com/A164759920/roadrunner_backed

# 【2023/5/6】

## 1.📣 新增 workflow

- **自动将当前文件夹推送至远端**</br>
- **使用方法:** **_npm run push_**

## 2.📄 日志系统 v1.0

- **响应日志**
- **错误日志**

## 3.部分代码重构

- **email.service** 数据脱敏处理 + 多种场景复用
- **环境变量** 脱敏处理
- **Event** 发布订阅模块 v1.0

# 【2022/11/23】邮件提示功能 + 接口调整

## ①. 更新 service 层

**⚡ 主站被访问时将自动发送邮件提醒**
**详见 service 层 email.service.js 文件**

- **nodemailer**： 实现邮件发送
- **lodash/throttle**： 实现**节流发送(2min/次)**

## ②. 接口调整

- **ip.middleware** 将会挂载**data_ip**和**parse_ip**两项数据
  - **data_ip**：查询的 ip 归属地信息
  - **parse_ip**：ipv4 的 32 位形式
- **test_test** 接口返回值优化
  - **UA 状态** + **Email 状态** 同时返回

# 【2022/11/16】重要更新

## ① 重构部分 Controller

- testController 供前端使用
- backedController 供后台使用

## ② 更新 middleware 层

- 新增 ua.middleware
  - 将 UA 经 parser 后挂载至 ctx.ua 下

## ③ 更新 service 层

- 新增 ua.service
  - 提供包括但不限于存储 ua 数据，获取 ua 数据等功能

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

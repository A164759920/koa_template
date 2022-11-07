# koa_template

- git clone
- npm install
- node index.js 或者 npm run dev

# .env

- 在.env 中定义你的环境变量
- default
  - HTTP_PORT HTTP 服务器启动端口 [default:8888]
  - HTTPS_PORT HTTPS 服务器启动端口 [defult:8899]
  - IS_HTTPS 是否开启 HTTPS 服务器 on 为开启 [default:off]
  - HOST 配置域名 [default:http://127.0.0.1]
  - MOUNT_NAME 静态资源文件夹挂载名称 [defalut:/static]

# 【2022/11/3】自动配置 HTTPS 证书 + 服务器

- ① .env 中设置 IS_HTTPS = on
- ② 将 .key 和 .pem 文件放入 ssl 文件夹下
- ③ npm run dev 开启 HTTPS 服务器

# 【2022/11/5】支持腾讯云存储桶 sts 鉴权接口

- 【注意】: 使用时将/controller/cosBucketController中
    const { config, action } = require("../qcloud-cos/config.local.js");
    替换为:
    const { config, action } = require("../qcloud-cos/config.default.js");
    并在config.default.js中配置你的存储桶信息
- 详见 qcloud-cos 文件夹下 README.md

# 测试 API

- 测试连通性
- http:// 域名:APP_PORT/test_test

  - Method: get

- 错误上报测试
- http:// 域名:APP_PORT/test_errTest

  - Method: get

- 删除文件测试
- http:// 域名:APP_PORT/test_delete

  - Method: get

- 修改文件名称测试
- http:// 域名:APP_PORT/test_change

  - Method: get
  - queryParam:
    - oldname : 旧文件名 [defaut: test.txt] 必填
    - newname : 新文件名 [defalut: reName] 必填
    - dirname ：所在文件夹 [default : 无] 必填

- 扫描指定文件夹文件
- http:// 域名:APP_PORT/test_scan

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

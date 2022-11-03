# koa_template

- git clone
- npm install
- node index.js 或者 npm run dev

# .env

- 在.env 中定义你的环境变量
- default
  - APP_PORT 服务器启动端口
  - MOUNT_NAME 静态资源文件夹挂载名称

# 测试 API

    - http:// 域名:APP_PORT/test
        - Method: get
        - 测试连通性

    - http:// 域名:APP_PORT/errTest
        - Method: get
        - 错误上报测试

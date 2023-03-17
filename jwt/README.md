# JWT 模块

## index.js 入口文件

- **createToken**:创建 token 函数
- **verifyToken**:验证 token 函数

## authToken.middle.js Koa 鉴权中间件

- 导出中间件**AuthToken**

## config.default 配置文件

- **algorithm**:生成 token 的加密算法类型
- **secretKey**:用于前面的私钥
- **expiresIN**:token 过期默认过期时间

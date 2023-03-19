# JWT 模块 v1.1 23/03/19

## 🔨 配置文件 config.default.js

- **algorithm**:生成 token 的加密算法类型
- **secretKey**:用于 SIGN 的私钥
- **expiresTime**:**_{Number}_** token 默认过期时间
- **refreshTime**:**_{Number}_** token 刷新最大时间

## index.js 入口文件

**📄 生成 JSDOC 文档** **_npm run docs-jwt_**

- **createToken**:创建 token 函数
- **verifyToken**:验证 token 函数
- **refreshToken**:刷新 token 函数

## tokenController 控制器集合

### ①.refreshTokenController 用于刷新 token

- ⭐ 使用前先用 authToken 鉴权，无效 token 无需 refresh
- 可用于 refreshtoken 接口的 controller

## authToken.middle.js Koa 鉴权中间件

- 导出中间件**AuthToken**

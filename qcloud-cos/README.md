# 配置腾讯云存储桶

    功能：获取临时鉴权key和ID

## 方法

### ①.在 config.default.js 中进行如下配置

    secretId:"",
    secretKey:""
    host:""
    bucket:"" 存储桶名称
    region:"" 地域
    allowPrefix:"" default:* 不安全

    id和key获取地址: https://console.cloud.tencent.com/cam/capi
    存储桶地址：https://console.cloud.tencent.com/cos/bucket

### ②. 调用 API 接口 返回供前端鉴权的 Object

- URL : http://域名:端口号/sts [默认]
- Method: GET
- 返回值 ：参考 https://cloud.tencent.com/document/product/436/11459#.E9.85.8D.E7.BD.AE.E9.A1.B9

- 该接口请配合前端使用 参考：https://github.com/A164759920/Fronted_Utils_JS/blob/main/cosBucket.js

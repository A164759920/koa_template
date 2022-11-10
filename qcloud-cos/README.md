# 配置腾讯云存储桶

    功能：获取临时鉴权key和ID

## 方法

### ①.在 config.default.js 中进行如下配置

#### config 配置

    secretId:"",
    secretKey:""
    host:""
    bucket:"" 存储桶名称
    region:"" 地域
    allowPrefix:"" default:* 不安全

    id和key获取地址: https://console.cloud.tencent.com/cam/capi
    存储桶地址：https://console.cloud.tencent.com/cos/bucket

#### action 授权配置
    *示例*
    const action = [
        "name/cos:PutObject",
        "name/cos:PostObject"
    ]

### ②. 调用 API 接口 返回供前端鉴权的 Object

- URL : http://域名:端口号/sts [默认]
- Method: GET
- 返回值 ：参考 https://cloud.tencent.com/document/product/436/11459#.E9.85.8D.E7.BD.AE.E9.A1.B9

- 该接口请配合前端使用 参考：https://github.com/A164759920/Fronted_Utils_JS/tree/main/COS_Bucket

## 授权前端操作

在 cosBucketController的policy对象中需对前端的每一项操作进行授权
后方可使用对应功能，否则 ***前端报错403 Forbidden***

权限表：https://cloud.tencent.com/document/product/436/31923#.E6.A3.80.E7.B4.A2.E5.AD.98.E5.82.A8.E6.A1.B6.E5.8F.8A.E5.85.B6.E6.9D.83.E9.99.90

例如 name/cos:PutObject 对应前端 PubObject 方法

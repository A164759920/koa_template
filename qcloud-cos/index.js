// // 存储桶示例文件
// const STS = require("qcloud-cos-sts/sdk/sts.js");

// const { config } = require("./config.default.js")

// var shortBucketName = config.bucket.substr(0 , config.bucket.lastIndexOf('-'));
// var appId = config.bucket.substr(1 + config.bucket.lastIndexOf('-'));
// var policy = {
//     'version': '2.0',
//     'statement': [{
//         'action': [
//             // 简单上传
//             'name/cos:PutObject',
//             'name/cos:PostObject',
//             // 分片上传
//             'name/cos:InitiateMultipartUpload',
//             'name/cos:ListMultipartUploads',
//             'name/cos:ListParts',
//             'name/cos:UploadPart',
//             'name/cos:CompleteMultipartUpload',
//         ],
//         'effect': 'allow',
//         'principal': {'qcs': ['*']},
//         'resource': [
//             'qcs::cos:' + config.region + ':uid/' + appId + ':prefix//' + appId + '/' + shortBucketName + '/' + config.allowPrefix,
//         ],
//     }],
// };

// // getPolicy
// // 获取临时密钥
// (function () {
//     var scope = [{
//         action: 'name/cos:PutObject',
//         bucket: config.bucket,
//         region: config.region,
//         prefix: 'exampleobject',
//     }];
//     var policy = STS.getPolicy(scope);
//     STS.getCredential({
//         secretId: config.secretId,
//         secretKey: config.secretKey,
//         proxy: config.proxy,
//         policy: policy,
//         durationSeconds: config.durationSeconds,
//     }, function (err, credential) {
//         console.log('getPolicy,getCredential:');
//         console.log(JSON.stringify(policy, null, '    '));
//         console.log(err || credential);
        
//     });
// })();
# 错误处理模块

    - erroHandler 用于设置ctx.status和上报的错误信息
    - errorType 用于custom你自己的错误类型
    - 用法：
        在需要错误处理的地方：
         ctx.app.emit("error",yourCustomErrorType,ctx)
         参考 ./controller/testController.js/function test_ErrorController(ctx)

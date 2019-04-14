//1.导包
const express = require('express');
//导入路由模块
const router = require('./router');
//2.配置
const app = express();
//3.使用路由
app.use(router);
//4.使用端口
app.listen(7000,()=>{
  console.log('run it at 7000');
});
//路由配置文件

//导包
const express = require('express');
const router = express.Router();
//导入函数处理
const c_user = require("./controllers/c_user")

//配置路由
router.get('/',c_user.showSignin);

//导出路由
module.exports = router;

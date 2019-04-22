//1.导包
const express = require('express');
//导入路由模块
const router = require('./router');
//为req增加一个请求对象body
const bodyParser = require('body-parser');
//session包保存用户信息
const session = require('express-session');
//时间包导入
const moment = require('moment');
//请求日志包导入
const morgan = require('morgan');



//2.配置

const app = express();
//配置静态资源
app.use("/public", express.static("./public"));
//配置第三方资源
app.use("/node_modules", express.static("./node_modules"));
//配置模板引擎，为res增加一个render方法渲染页面
app.engine('html', require('express-art-template'));
//配置bodyparser包
app.use(bodyParser.urlencoded({ extended: false }));
//配置session包，给req增加一个session属性
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
//配置morgan 包
app.use(morgan('tiny'));
//公共成员的使用
//放在session的前面路由的后面
app.use((req, res, next) => {
  //app对象有一个自带的属性，叫locals,并且locals是对象
  //app.locals中的成员可以在页面html文件中通过模板引擎来查找并渲染
  //请求一改变就将session的值赋值给locals.sessionUser
  app.locals.sessionUser = req.session.user;
  next();
})


//3.使用路由
app.use(router);
//渲染404页面
app.use((req, res, next) => {
  res.render('404.html');
})
//同意处理错误的中间件
app.use((error, req, res, next) => {
  res.send({
    code: 500,
    msg: error.message
  })
})
//4.使用端口
app.listen(7000, () => {
  console.log('run it at 7000');
});
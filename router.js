//路由配置文件

//导包
const express = require('express');
const router = express.Router();
//导入函数处理
const C_user = require("./controllers/c_user");
const C_topic = require("./controllers/c_topic");




//配置路由

//渲染登陆页面
router.get('/signin',C_user.showSignin)
      .post('/signin',C_user.handleForm)
      .get('/',C_topic.showTopicList)
      .get('/topic/create',C_topic.showTopicEdit)
      .post('/createTopic',C_topic.createTopic)
      .get('/signout',C_user.userSigninOut)
      .get('/showDetail/:topicId',C_topic.showDetail)
      .get('/topic/:topicId/delete',C_topic.deleteTopic)
      .get('/topic/:topicId/edit', C_topic.showEditTopic)
      .post('/topic/edit/:topicId',C_topic.editTopic)
      .get('/signup', C_user.showSingup)
      .post('/signUp',C_user.signUp)


      

//导出路由
module.exports = router;

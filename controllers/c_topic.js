const moment = require('moment');
const M_topic = require('../model/m_topic');

//渲染列表页,并携带数据
exports.showTopicList = (req, res,next) => {
  M_topic.selectAllTopics((error, data) => {
    if (error) {
      return next(error);
    }
    //console.log(data);    
    res.render('index.html', {
      topics: data,
      // user: req.session.user
    });
  });
};
//渲染列表编辑页
exports.showTopicEdit = (req, res,next) => {
  res.render('topic/create.html');
}
//列表数据添加
exports.createTopic = (req, res,next) => {
  //给body添加日期时间
  req.body.createdAt = moment().format();
  // console.log(req.body);
  req.body.userId = req.session.user.id;
  M_topic.createTopic(req.body, (error, results) => {
    if (error) {
      return next(error);
    }
    //console.log(results);
    res.send({
      code: 200,
      msg: "添加成功！"
    })
  })
}

//显示列表详情页
exports.showDetail = (req, res,next) => {
  //获取动态路由的参数
  var topicId = req.params.topicId;
  //console.log(req.params);
  M_topic.showDetailTopic(topicId, (error, results) => {
    if (error) {
      return next(error);
    };
    //console.log(req.session.user);
    //console.log(results[0].userId);
    res.render('topic/show.html', {
      code: 200,
      topic: results[0],
      //sessionUserID: req.session.user.id
    });
  });
};
//删除文章话题
exports.deleteTopic = (req, res,next) => {
  var topicId = req.params.topicId;
  M_topic.deleteTopic(topicId, (error, results) => {
    if (error) {
      return next(error);
    };
    res.redirect('/');
  })
};

//编辑修改文章话题
exports.showEditTopic = (req, res,next) => {
  var topicId = req.params.topicId;
  M_topic.showDetailTopic(topicId, (error, results) => {
    if (error) {
      return next(error);
    };
    // res.redirect('/');
    res.render('topic/edit.html', {
      code: 200,
      topic: results[0]
    })
  })
};

//编辑表单数据
exports.editTopic = (req, res,next) => {
  var topicId = req.params.topicId;
  var formData = req.body;
  M_topic.editTopic([formData.title,formData.content,topicId], (error, results) => {
    if (error) {
      //console.log(error);
      return next(error);
    };
    res.send({
      code:200,
      msg:'修改成功！'
    })
  })
}
//connection 连接
const connection = require("../config/db_config");

//数据库查询语句
exports.selectAllTopics = (callback) => {
  connection.query('select * from `topics` order by id desc', (err, data) => {
    if (err) {
      callback(err);
    }
    callback(null, data);
  })
};
//添加表单数据
exports.createTopic = (formData, callback) => {
  connection.query('insert into `topics` set ?', formData, (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  })
};

//获取文章详情页数据
exports.showDetailTopic = (topicId, callback) => {
  //console.log(topicId);
  connection.query('select * from `topics` where id=?', topicId, (error, results) => {
    if (error) {
      return callback(error, null);
    } else {
      //console.log(results);
      callback(null, results);
    }
  })
}
//删除文章
exports.deleteTopic = (topicId, callback) => {
  connection.query('delete from `topics` where id=?', topicId, (error, results) => {
    if (error) {
      //console.log(error);
      return callback(error, null);
    } else {
      callback(null, results);
    }
  })
};

//编辑更新文章
exports.editTopic = ([title, content, topicId], callback) => {
  connection.query('update `topics`  set title=?, content=? where id=?', [title, content, topicId], (err, results) => {
    if (err) {
      return callback(err, null);
    } else {
      callback(null, results);
    }
  })
}
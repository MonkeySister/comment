const connection = require('../config/db_config');

//验证邮箱是否存在
exports.checkEmail = (email,callback) => {
  connection.query('select * from `users` where email=?', email, (error, results) => {
    if (error) {
      callback(error, null);
    }else{
      callback(null,results);
    }
  });
}

//验证昵称是否存在
exports.checkNickName = (nickName,callback) => {
  connection.query('select * from `users` where nickname=?',nickName,(err,results)=>{
    if(err){
      return callback(err,null);
    }else{
      callback(null,results);
    }
  })
}

//为用户进行注册
exports.signUp = (formData,callback) =>{
  connection.query('insert into `users` set ?',formData,(err,results)=>{
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      callback(null, results);
    }
  })
}
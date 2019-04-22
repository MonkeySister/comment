const M_user = require("../model/m_user");
const moment = require('moment');
exports.showSignin = (req, res, next) => {
  //render会自动找到views文件夹
  res.render("signin.html");
};

//表单处理
exports.handleForm = (req, res, next) => {
  //1.获取表单数据
  const body = req.body;
  //console.log(body);
  //2.验证邮箱(数据库)
  M_user.checkEmail(body.email, (error, results) => {
    //查询结果有两种情况，空数组或包含一个元素的数组
    if (error) {
      return next(error);
    }
    if (results.length === 0) {
      return res.send({
        code: 1,
        msg: "邮箱不存在！"
      })
    }
    //3.验证密码
    if (body.password != results[0].password) {
      return res.send({
        code: 400,
        msg: "密码错误！"
      });
    }
    //登录成功保存正确的用户信息
    req.session.user = results[0];
    //console.log(req.session.user);
    return res.send({
      //4.返回200的响应
      code: 200,
      msg: "登录成功！"
    })
  })
};

//处理用户退出
exports.userSigninOut = (req, res, next) => {
  //1.删除session信息
  delete req.session.user;
  //2.重定向到列表页
  res.redirect('/signin');
}
//用户注册
exports.showSingup = (req, res, next) => {
  res.render('signup.html');
}
//用户注册表单提交
exports.signUp = (req, res, next) => {
  var formData = req.body;
  // formData.createAt = moment().format();
  //验证邮箱是否存在
  M_user.checkEmail(formData.email, (error, results1) => {
    //查询结果有两种情况，空数组或包含一个元素的数组
    if (error) {
      return next(error);
    };
    if (results1.length != 0) {
      return res.send({
        code: 202,
        msg: "邮箱已经存在!"
      })
    };
    //如果邮箱不存在验证昵称是否存在
    M_user.checkNickName(formData.nickname, (error, results2) => {
      if (error) {
        return next(error);
      };
      if (results2.length != 0) {
        return res.send({
          code: 202,
          msg: "昵称已经被占用!"
        })
      };
      //昵称邮箱都不存在，为用户进行注册
      M_user.signUp(formData, (error, results) => {
        if (error) {
          return next(error);
        };
        res.send({
          code: 200,
          msg: "注册成功！"
        })
      });
    });
  });
}

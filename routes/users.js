var express = require("express");
var router = express.Router();

const userModel = require("../models/userModel");

router.get("/", function(req, res, next) {
  userModel.create(
    [
      { name: "test1", age: 8 },
      { name: "test2", age: 18 },
      { name: "test3", age: 28 }
    ],
    function(error, docs) {
      if (error) {
        res.json({
          errorCode: 400,
          message: "添加失败"
        });
      } else {
        res.json({
          errorCode: 0,
          message: "添加成功"
        });
      }
    }
  );
});

router.post("/saveUser", function(req, res, next) {
  // 创建一个 userModel 模型的实例
  let user_instance = new userModel({
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    phone: req.body.phone
  });

  // 传递回调以保存这个新建的模型实例
  user_instance.save(function(err, docs) {
    if (err) {
      res.json({
        errorCode: 400,
        message: "添加失败"
      });
    } else {
      res.json({
        errorCode: 0,
        message: "添加成功"
      });
    }
  });
});

router.post("/getUser", function(req, res, next) {
  userModel.find({ phone: req.body.phone }, function(err, user) {
    if (err) {
      return handleError(err);
    } else {
      res.json(user);
    }
  });
});

router.post("/updateUser", function(req, res, next) {
  userModel.update(
    {
      phone: req.body.phone
    },
    {
      age: req.body.age,
      email: req.body.email
    },
    function(err, docs) {
      if (err) {
        res.json({
          errorCode: 400,
          message: "修改失败"
        });
      } else {
        res.json({
          errorCode: 0,
          message: "修改成功"
        });
      }
    }
  );
});

router.post("/delUser", function(req, res, next) {
  userModel.remove({ phone: req.body.phone }, function(err, docs) {
    if (err) {
      res.json({
        errorCode: 400,
        message: "删除失败"
      });
    } else {
      res.json({
        errorCode: 0,
        message: "删除成功"
      });
    }
  });
});

module.exports = router;

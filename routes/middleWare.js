var express = require("express");
var router = express.Router();

// logger middleWare
router.use(function(req, res, next) {
  console.log("LOGGED");
  next();
});

// time middleWare
router.use(function(req, res, next) {
  req.requestTime = Date.now();
  console.log("TIME:", req.requestTime);
  next();
});

router.get("/", function(req, res, next) {
  var responseText = "Hello World!<br>";
  responseText += "<small>Requested at: " + req.requestTime + "</small>";
  res.send(responseText);
});

router.get(
  "/user/:id",
  function(req, res, next) {
    console.log("ID:", req.params.id);
    if (req.params.id % 2 === 0) {
      // next("route"); 从路由器中间件堆栈中跳过其余的中间件功能，调用next('route')将控制权传递给下一个路由
      next("route");
    } else {
      next();
    }
  },
  function(req, res, next) {
    res.send("奇数");
  }
);

// handler for the /user/:id path, which prints the user ID
router.get("/user/:id", function(req, res, next) {
  res.send("偶数");
});

module.exports = router;

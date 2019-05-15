var express = require("express");
var router = express.Router();

// 托管静态文件
router.use(express.static("public"));

module.exports = router;

var mongoose = require("mongoose");
var config = require("./config.js");

module.exports = function() {
  mongoose.connect(config.mongodb, { useNewUrlParser: true });
  // 让 mongoose 使用全局 Promise 库
  mongoose.Promise = global.Promise;
  // 取得默认连接
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "连接错误："));
  db.once("open", callback => {
    console.log("MongoDB连接成功！！");
  });
  return db;
};

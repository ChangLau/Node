var mongoose = require("mongoose");

// 模式
var userSchema = new mongoose.Schema({
  name: { type: String }, //属性name,类型为String
  age: { type: Number, default: 0, min: 0, max: 150 }, //属性age,类型为Number,默认为0
  time: { type: Date, default: Date.now },
  email: { type: String, default: "" },
  living: { type: Boolean, default: true },
  phone: { type: Number, unique: true, dropDups: true, required: true } //电话号码唯一性
});

// 根据模式创建模型
var userModel = mongoose.model("user", userSchema);

module.exports = userModel;

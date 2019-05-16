var axios = require("axios");
var express = require("express");
var router = express.Router();
var querystring = require("querystring");

// logger middleWare
router.use(function(req, res, next) {
  console.log("LOGGED");
  next();
});

router.get("/getMyBlog", function(req, res, next) {
  axios
    .post(
      "https://www.coffeecola.cn/api/blog/login",
      querystring.stringify({ username: "ChangLau", password: "wff1993lc" })
    )
    .then(function(response) {
      console.log(response.data);
      axios({
        method: "POST",
        headers: {
          "content-type": "application/json",
          Cookie: "JSESSIONID=" + response.data
        },
        data: {
          pageNum: 1,
          pageSize: 10
        },
        url: "https://www.coffeecola.cn/api/blog/getMyBlog"
      })
        .then(function(response) {
          res.json(response.data);
        })
        .catch(function(error) {
          res.json(error.config);
        });
    });
});

module.exports = router;

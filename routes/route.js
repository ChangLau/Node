var express = require("express");
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("-----");
  console.log("Time: ", Date.now());
  next();
});

// GET method route
router.get("/", function(req, res) {
  console.log(req.query);
  //   res.send("GET request to the homepage");
  res.send(req.query);
});

// POST method route
router.post("/", function(req, res) {
  console.log(req.body);
  //   res.send("GET request to the homepage");
  res.send(req.body);
  //   res.send("POST request to the homepage");
});

router.all("/secret", function(req, res, next) {
  console.log("Accessing the secret section ...");
  next(); // pass control to the next handler
});

router.get("/secret", function(req, res) {
  res.send("get secret");
});

router.get("/secret/a", function(req, res) {
  res.send("get secret a");
});

// random.text
router.get("/random.text", function(req, res) {
  res.send("random.text");
});

// acd和abcd
router.get("/ab?cd", function(req, res) {
  res.send("ab?cd");
});

// abcd、abbcd、abbbcd等
router.get("/ab+cd", function(req, res) {
  res.send("ab+cd");
});

// abcd，abxcd，abRANDOMcd，ab123cd，等
router.get("/ab*cd", function(req, res) {
  res.send("ab*cd");
});

// abe和abcde
router.get("/ab(cd)?e", function(req, res) {
  res.send("ab(cd)?e");
});

// 包含“a”的任何内容
router.get(/a/, function(req, res, next) {
  //   res.send("/a/");
  console.log("/a/");
  next("route");
});

// 匹配butterfly和dragonfly
router.get(/.*fly$/, function(req, res) {
  res.send("/.*fly$/");
});

router.get("/users/:userId/books/:bookId", function(req, res) {
  res.send(req.params);
});

router.get("/example/a", function(req, res) {
  res.send("Hello from A!");
});

router.get(
  "/example/b",
  function(req, res, next) {
    console.log("the response will be sent by the next function ...");
    next();
  },
  function(req, res) {
    res.send("Hello from B!");
  }
);

var cb0 = function(req, res, next) {
  console.log("CB0");
  next();
};

var cb1 = function(req, res, next) {
  console.log("CB1");
  next();
};

var cb2 = function(req, res) {
  res.send("Hello from C!");
};

router.get("/example/c", [cb0, cb1, cb2]);

router.get(
  "/example/d",
  [cb0, cb1],
  function(req, res, next) {
    console.log("the response will be sent by the next function ...");
    next();
  },
  function(req, res) {
    res.send("Hello from D!");
  }
);

router
  .route("/book")
  .get(function(req, res) {
    res.send("Get a random book");
  })
  .post(function(req, res) {
    res.send("Add a book");
  })
  .put(function(req, res) {
    res.send("Update the book");
  });

module.exports = router;

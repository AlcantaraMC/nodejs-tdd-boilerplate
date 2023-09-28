var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/login", async (req, res, next) => {
  const testLoginDetails = {
    userid: 12345,
    username: "admin",
    password: "admin",
  };

  if (req.body.username === "admin" && req.body.password === "admin") {
    // request is ok
    res.status(200).json({
      status: 200,
      message: "Login OK",
      sessionKey: "some-random-key-here",
      userid: testLoginDetails.userid,
    });
  } else {
    res.status(401).json({
      status: 401,
      message: "Login Unauthorized",
      sessionKey: null,
      userid: null,
    });
  }
});

module.exports = router;

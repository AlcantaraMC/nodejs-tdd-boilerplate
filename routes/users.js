var express = require("express");
const { type } = require("os");
var router = express.Router();

let mockUserList = [
  {
    userid: 2023000001,
    data: "Lorem Ipsum",
  },
];

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

router.post("/new", async (req, res, next) => {
  let hasEmptyFlag = false;

  let k = Object.keys(req.body);
  k.forEach((key) => {
    if (req.body[key] === "" || typeof req.body[key] === "undefined") {
      /** missing values on object */
      hasEmptyFlag = true;
    }
  });

  if (hasEmptyFlag) {
    res.status(422).json({
      status: 422,
      message: "Incomplete registration data",
    });
  } else {
    res.status(201).json({
      status: 201,
      message: "Registration successful",
      userid: 2023000001,
    });
  }
});

router.get("/info/:userid", async (req, res, next) => {
  const matchingUsers = mockUserList.filter((user) => {
    return user.userid === Number(req.params.userid);
  });

  if (matchingUsers.length !== 0) {
    res.status(200).json({
      status: 200,
      message: "User data found",
      data: matchingUsers,
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "Record with given key not found",
    });
  }
});

module.exports = router;

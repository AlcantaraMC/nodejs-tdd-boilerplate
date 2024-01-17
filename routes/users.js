var express = require("express");
const { type } = require("os");
var router = express.Router();

/* GET users listing. */
router.get("/", async (req, res, next) => {
  res.send("respond with a resource");
});

/**
 * Put your additional routes here...
 */


module.exports = router;

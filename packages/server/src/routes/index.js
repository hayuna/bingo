"use strict";
exports.__esModule = true;
var express = require("express");
var router = express.Router();
router.get('/', function (req, res, next) {
    res.send('Hello Boy!!');
});
module.exports = router;

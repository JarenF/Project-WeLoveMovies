var router = require("express").Router();
var controller = require("./theaters.controller");
var methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(controller.list).all(methodNotAllowed);

module.exports = router;
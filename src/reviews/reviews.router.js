var router = require("express").Router();
var controller = require("./reviews.controller");
var methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/:reviewId").put(controller.update).delete(controller.delete).all(methodNotAllowed);

module.exports = router;
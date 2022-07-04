var express = require("express");
var router = express.Router();

const {register, signup, login, signin, logout} = require("../controllers/auth");

router.get("/register", register);
router.get("/login", login);
router.get("/logout", logout);
router.post("/signup", signup);
router.post("/signin", signin);

module.exports = router;
var express = require("express");
var router = express.Router();
const {isLoggedIn, isAdmin} = require("../controllers/auth")
const {view, profile, apply, check, update, order} = require("../controllers/user");

router.get("/view", isLoggedIn, view);
router.get("/profile", isLoggedIn, profile);
router.get("/apply/:jobid", isLoggedIn, apply);
router.post("/check", isLoggedIn, check);
router.post("/update", isLoggedIn, update);

module.exports = router;
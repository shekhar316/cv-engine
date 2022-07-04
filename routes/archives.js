var express = require("express");
var router = express.Router();
const {isLoggedIn, isAdmin} = require("../controllers/auth")
const {view, manage, add, addNew, update, updateA, remove} = require("../controllers/archives");

router.get("/view", isLoggedIn, view);
router.get("/manage", isLoggedIn, isAdmin, manage);
router.get("/add", isLoggedIn, isAdmin, add);
router.post("/add", isLoggedIn, isAdmin, addNew);
router.get("/update/:id", isLoggedIn, isAdmin, update);
router.get("/delete/:id", isLoggedIn, isAdmin, remove);
router.post("/update/update", isLoggedIn, isAdmin, updateA);

module.exports = router;
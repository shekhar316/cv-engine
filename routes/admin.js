var express = require("express");
var router = express.Router();
const {isLoggedIn, isAdmin} = require("../controllers/auth")
const {addjobget, viewjobdata,addjob, deletefromlib, updateQuantity, updateDetailsPost, register, signup, addStudentsFromCSVPost} = require("../controllers/admin");

router.get("/addjob", isLoggedIn, isAdmin, addjobget);
router.post("/addjob", isLoggedIn, isAdmin, addjob);


router.get("/register", isLoggedIn, isAdmin,register);
router.post("/signup", isLoggedIn, isAdmin,signup);
router.post("/addBulkStudents", isLoggedIn, isAdmin,addStudentsFromCSVPost);

router.get("/delete/:id", isLoggedIn, isAdmin, deletefromlib);
router.get("/viewjobdata/:id", isLoggedIn, isAdmin, viewjobdata);
router.get("/update/:id/:ldate/:xth/:xii/:curr", isLoggedIn, isAdmin, updateQuantity);
router.post("/updateDetails", isLoggedIn, isAdmin, updateDetailsPost);


module.exports = router;
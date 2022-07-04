var express = require("express");
var router = express.Router();
const {isLoggedIn} = require("../controllers/auth")
const {viewjobs, viewjobbyid, lastDates} = require("../controllers/job");

router.get("/view", isLoggedIn, viewjobs);
router.post("/lastDates", isLoggedIn, lastDates);
router.get("/lastDates", isLoggedIn, (req, res) => {
    res.render("calender");
});

router.get('/viewbyid/:id', isLoggedIn, viewjobbyid)

module.exports = router;
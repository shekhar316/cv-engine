var express = require("express");
var router = express.Router();
const notice = require("../controllers/notice")
const {isLoggedIn, isAdmin} = require("../controllers/auth")

router.get("/all", notice.viewAllNotices);
router.get('/view/:id', notice.viewById)
router.post('/update',isAdmin, notice.updateNotice)
router.post('/delete', isAdmin,notice.deleteNotice)
router.get('/create', isAdmin, notice.createNotice)
router.post('/create', isAdmin ,notice.createNoticePost)


module.exports = router;